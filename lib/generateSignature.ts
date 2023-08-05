const generateSignature = async (
  image: File,
  address: string,
  description: string,
  name: string
) => {
  const formData = new FormData();
  formData.append('address', address);
  formData.append('image', image);
  formData.append('description', description);
  formData.append('name', name);

  try {
    const res = await fetch('/api/generate-signature', {
      method: 'POST',
      body: formData,
    });

    const { signature } = await res.json();
    return signature;
  } catch (error) {
    console.error(error);
  }
};

export default generateSignature;
