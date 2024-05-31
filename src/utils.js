import imageCompression from 'browser-image-compression';
import * as yup from 'yup';

// src/config.js
export const config = {
    apiBaseUrl: 'http://192.168.0.109:3001' // Reemplaza con la IP y puerto correctos
  };

export function fechaActual(){
  const actual = new Date();
  const dia = actual.getDate();
  const mes = `0${actual.getMonth() + 1}`;
  const anio = actual.getFullYear();

  return `${anio}-${mes}-${dia}`
}


export function imgToBase64(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export async function compressImg(file, maxSize, WorH){
  // Opciones para la compresión de la imagen
  const options = {
    maxSizeMB: maxSize,
    maxWidthOrHeight: WorH,
    useWebWorker: true
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error al comprimir la imagen:', error);
  }  
}


export const validateForm = async (schema, formData) => {
  try {
      await schema.validate(formData, { abortEarly: false });
      return { isValid: true, errors: {} };
  } catch (err) {
      if (err instanceof yup.ValidationError) {
          const errors = err.inner.reduce((acc, error) => {
              acc[error.path] = error.message;
              return acc;
          }, {});
          return { isValid: false, errors };
      }
      throw err;
  }
};