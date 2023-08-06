const fetchConfidentFace = async (videoBlob: Blob) => {
  const formData = new FormData();
  formData.append('video', videoBlob);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FLASK_ENDPOINT}/process-video`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const { image } = await res.json();

    if (!image)
      throw new Error(
        'Sorry we were unable to find your confident face. Try being more happy while talking 😃'
      );

    const image_bytes = atob(image);
    const byteNumbers = new Array(image_bytes.length);
    for (let i = 0; i < image_bytes.length; i++) {
      byteNumbers[i] = image_bytes.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    let imageConverted = new Blob([byteArray], { type: 'image/jpeg' });

    return imageConverted;
  } catch (error) {
    return 'Sorry, we were unable to transcribe your speech.';
  }
};

export default fetchConfidentFace;
