const fetchConfidentFace = async (videoBlob: Blob): Promise<Blob | string> => {
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

    const { image }: { image: string } = await res.json();

    if (!image) {
      throw new Error(
        'Sorry we were unable to find your confident face. Try being more happy while talking 😃'
      );
    }

    const imageBlob = await base64ToBlob(image, 'image/jpeg');

    return imageBlob;
  } catch (error) {
    return 'Sorry, we were unable to transcribe your speech.';
  }
};

async function base64ToBlob(
  base64String: string,
  mimeType: string
): Promise<Blob> {
  const response = await fetch(`data:${mimeType};base64,${base64String}`);
  return await response.blob();
}

export default fetchConfidentFace;
