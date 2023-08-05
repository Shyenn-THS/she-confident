import { Phrase } from '../interfaces/typings';

const fetchTextFromSpeech = async (audioBlob: Blob, phrase: Phrase) => {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'audio.wav');
  formData.append('phrase', phrase?.phrase!);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FLASK_ENDPOINT}/speech-to-text`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const transcribedText = await res.json();
    return transcribedText;
  } catch (error) {
    return 'Sorry, we were unable to transcribe your speech.';
  }
};

export default fetchTextFromSpeech;
