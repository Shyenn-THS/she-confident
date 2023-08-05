import fallbackPhrases from '../constants/fallbackPhrases.json';

const fetchPhrase = async () => {
  try {
    const res = await fetch('/api/phrases/get-phrase', {
      method: 'GET',
    });

    const phrase = await res.json();
    return phrase;
  } catch (error) {
    return fallbackPhrases[Math.floor(Math.random() * fallbackPhrases.length)];
  }
};

export default fetchPhrase;
