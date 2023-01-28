import axios from "axios";

export const uploadImage = async (file) => {
  if (!file) return;
  try {
    // fijate que piden crear un FormData con las dos keys siguientes
    const formData = new FormData();
    formData.append("upload_preset", "vue-daybook-fh");
    formData.append("file", file);

    const url = `https://api.cloudinary.com/v1_1/oscargm40/image/upload`;
    const { data } = await axios.post(url, formData);
    // la url viene en esta propiedad
    return data.secure_url;
  } catch (error) {
    console.log("Error al cargar la imagen");
    console.log(error);
    return null;
  }
};
