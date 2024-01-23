// api.js

import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
const csrfToken = csrfTokenMeta ? csrfTokenMeta.content : '';

// Fungsi untuk melakukan GET request
export const getApiData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      withXSRFToken: true,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    // Handle error, misalnya log atau tampilkan pesan kesalahan
    console.error('Error in API request:', error);
    throw error; // Rethrow error agar dapat ditangkap oleh pemanggil fungsi
  }
};

// Fungsi untuk melakukan POST request
export const postApiData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}${endpoint}`, data, {
      withXSRFToken: true,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.log('Error in API request:', error);
    throw error;
  }
};

export const putApiData = async (endpoint, data) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}${endpoint}`, data, {
      withXSRFToken: true,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.log('Error in API request:', error);
    throw error;
  }
};


export const deleteApiData = async (endpoint) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      withXSRFToken: true,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.log('Error in DELETE API request:', error);
    throw error;
  }
};


