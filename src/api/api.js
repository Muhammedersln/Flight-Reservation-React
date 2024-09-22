import axios from 'axios';

const API_URL = 'https://api.schiphol.nl/public-flights/flights';
const APP_ID = '15b605ca';  // Schiphol'dan aldığın Application ID'yi buraya ekle
const APP_KEY = 'fd5e3299a2e176b2e9304b2efa986a76';  // Schiphol'dan aldığın Application Key'i buraya ekle

export const fetchFlights = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'ResourceVersion': 'v4',
        'app_id': APP_ID,
        'app_key': APP_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
