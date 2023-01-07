import cv2
import numpy as np
import dlib
from keras.models import load_model
from rembg import remove

emotion_offsets = (20, 40)
emotions = {
    0: {
        "emotion": "Angry",
        "color": (193, 69, 42)
    },
    1: {
        "emotion": "Disgust",
        "color": (164, 175, 49)
    },
    2: {
        "emotion": "Fear",
        "color": (40, 52, 155)
    },
    3: {
        "emotion": "Happy",
        "color": (23, 164, 28)
    },
    4: {
        "emotion": "Sad",
        "color": (164, 93, 23)
    },
    5: {
        "emotion": "Suprise",
        "color": (218, 229, 97)
    },
    6: {
        "emotion": "Neutral",
        "color": (108, 72, 200)
    }
}

def shapePoints(shape):
    coords = np.zeros((68, 2), dtype="int")
    for i in range(0, 68):
        coords[i] = (shape.part(i).x, shape.part(i).y)
    return coords

def rectPoints(rect):
    x = rect.left()
    y = rect.top()
    w = rect.right() - x
    h = rect.bottom() - y
    return (x, y, w, h)

# Face Prediction
faceLandmarks = "faceDetection/models/dlib/shape_predictor_68_face_landmarks.dat"
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(faceLandmarks)

# Emotion Prediction 
emotionModelPath = 'models/emotionModel.hdf5'  # fer2013_mini_XCEPTION.110-0.65
emotionClassifier = load_model(emotionModelPath, compile=False)
emotionTargetSize = emotionClassifier.input_shape[1:3]

def process_frames():
    cap = cv2.VideoCapture('./video/video.webm')

    most_probable_happy_moment = None
    current_max_probablity = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        try:
            frame = cv2.resize(frame, (720, 480))
        except Exception as e:
            # print(str(e))
            continue

        grayFrame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        rects = detector(grayFrame, 0)

        for rect in rects:
            shape = predictor(grayFrame, rect)
            points = shapePoints(shape)
            (x, y, w, h) = rectPoints(rect)
            grayFace = grayFrame[y:y + h, x:x + w]
            try:
                grayFace = cv2.resize(grayFace, (emotionTargetSize))
            except:
                continue

            grayFace = grayFace.astype('float32')
            grayFace = grayFace / 255.0
            grayFace = (grayFace - 0.5) * 2.0
            grayFace = np.expand_dims(grayFace, 0)
            grayFace = np.expand_dims(grayFace, -1)
            emotion_prediction = emotionClassifier.predict(grayFace)
            emotion_probability = np.max(emotion_prediction)

            if (emotion_probability > 0.30):
                emotion_label_arg = np.argmax(emotion_prediction)
                label = emotions[emotion_label_arg]['emotion']
                print(f"Probablity: {emotion_probability} | Emotion: {label}")
                if label == 'Happy' and emotion_probability > current_max_probablity:
                    ret,jpg = cv2.imencode('.jpg', frame)


                    most_probable_happy_moment = remove(jpg.tobytes())
                    current_max_probablity = emotion_probability
                else:
                    continue
            else:
                continue

    cap.release()
    cv2.destroyAllWindows()
    return most_probable_happy_moment