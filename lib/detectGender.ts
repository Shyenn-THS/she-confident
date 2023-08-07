const detectGender = async (image: File): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FLASK_ENDPOINT}/detect-gender`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const { gender } = await res.json();
    return gender;
  } catch (error) {
    console.error(error);
  }
};

export default detectGender;
