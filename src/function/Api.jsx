// api.js

import axios from "axios";
import Cookies from "js-cookie";
import { displayToast } from "../views/layouts/displayToast";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
const csrfToken = csrfTokenMeta ? csrfTokenMeta.content : "";

// Fungsi untuk melakukan GET request
export const getApiData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      withXSRFToken: true,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    // Handle error, misalnya log atau tampilkan pesan kesalahan
    console.error("Error in API request:", error);
    throw error; // Rethrow error agar dapat ditangkap oleh pemanggil fungsi
  }
};

// Fungsi untuk melakukan POST request
export const postApiData = async (endpoint, data) => { 
  // try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}${endpoint}`,
      data,
      {
        withXSRFToken: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    displayToast({
      icon: "success",
      title: response.data.message,
    });
    return response.data;
  // } catch (error) {
  //   displayToast({
  //     icon: "error",
  //     title: response.data.message,
  //   });
  //   throw error;
  // }
};

// Fungsi untuk melakukan POST request denngan file
export const postApiDataAndFile = async (endpoint, data) => {
  // try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}${endpoint}`,
      data,
      {
        withXSRFToken: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    displayToast({
      icon: "success",
      title: response.data.message,
    });
    return response.data;
  // } catch (error) {
  //   displayToast({
  //     icon: "error",
  //     title: response.data.message,
  //   });
  //   throw error;
  // }
};

export const putApiData = async (endpoint, data) => {
  // try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}${endpoint}`,
      data,
      {
        withXSRFToken: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    displayToast({
      icon: "success",
      title: response.data.message,
    });
    return response.data;
  // } catch (error) {
  //   displayToast({
  //     icon: "error",
  //     title: response.data.message,
  //   });
  //   throw error;
  // }
};

export const putApiDataAndFile = async (endpoint, data) => {
  // Membuat objek FormData
  const formData = new FormData();

  // Menambahkan semua bidang ke FormData
  Object.entries(data).forEach(([key, value]) => {
    // Jika nilai adalah objek File, tambahkan dengan kunci yang benar
    if (value instanceof File) {
      formData.append('image_product', value, value.name); // Pastikan nama bidang untuk gambar benar
    } else {
      // Sesuaikan kunci yang diharapkan oleh server untuk properti non-file
      formData.append(key, value);
    }
  }); 

  console.log(data);
  console.log(formData);

  // Mengirim permintaan PUT tanpa try-catch
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}${endpoint}`,
    formData,
    {
      withXSRFToken: true,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  displayToast({
    icon: "success",
    title: response.data.message,
  });

  return response.data;
};



export const deleteApiData = async (endpoint) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}${endpoint}`,
      {
        withXSRFToken: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    displayToast({
      icon: "success",
      title: response.data.message,
    });
    return response.data;
  } catch (error) {
    displayToast({
      icon: "error",
      title: response.data.message,
    });
    throw error;
  }
};
