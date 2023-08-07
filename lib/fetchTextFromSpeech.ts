import { Phrase, Transcribed } from '../interfaces/typings';

const fetchTextFromSpeech = async (
  audioBlob: Blob,
  phrase: Phrase
): Promise<Transcribed> => {
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

    if (!transcribedText.similarity) {
      throw new Error("Sorry, we couldn't transcribe your speech.");
    }

    return transcribedText;
  } catch (error: any) {
    return {
      text: error.message,
      similarity: '0',
    };
  }
};

export default fetchTextFromSpeech;
