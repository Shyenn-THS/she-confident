from flask import Flask, render_template, request, jsonify, redirect
from emotionRecognition import process_frames
import speech_recognition as sr
from flask_cors import CORS
from flask_ngrok import run_with_ngrok
import difflib
import base64

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000','https://she-confident.vercel.app'])
app.config['CORS_HEADERS'] = 'Content-Type'
run_with_ngrok(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process-video', methods=['POST'])
def process_video():
    # Get the video data from the request body
    video = request.files['video']
    video.save('./video/video.webm')

    image_bytes = process_frames()
    if not image_bytes == None:
        # Encode the image bytes as a base64 string
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')
        # Send the image as the response
        response = {'image': image_base64}
        return jsonify(response)
    else:
        response = {'error': 'No happy moment found'}
        return jsonify(response)

@app.route('/speech-to-text', methods=['POST', 'GET'])
def speech_to_text():
    # Get the audio file from the request
    if "audio" not in request.files:
            return redirect(request.url)

    if "phrase" not in request.form:
            return redirect(request.url)

    file = request.files["audio"]
    phrase = request.form['phrase']

    if file.filename == "":
        return redirect(request.url)

    # Create a SpeechRecognition Recognizer object
    recognizer = sr.Recognizer()

    # Recognize the speech in the audio file
    if file:
        audioFile = sr.AudioFile(file)
        with audioFile as source:
                audio_data = recognizer.record(source)
        try:
            text = recognizer.recognize_google(audio_data, key=None)
        except sr.UnknownValueError:
            return jsonify({'error': 'Unable to recognize speech'})
        except sr.RequestError as e:
            return jsonify({'error': 'Error while accessing the service: {}'.format(e)})

        similarity = difflib.SequenceMatcher(None, text, phrase).ratio()

    response = jsonify({"text": text, "similarity": similarity})
    return response

if __name__ == '__main__':
    app.run()