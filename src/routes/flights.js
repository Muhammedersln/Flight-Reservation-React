const express = require('express');
const axios = require('axios');
const Flight = require('../models/Flight'); // Uçuş modelini ekleyin

const router = express.Router();

const FLIGHT_API_URL = "https://api.schiphol.nl/public-flights/flights";
const APP_ID = "15b605ca";
const APP_KEY = "e5e586b5f58f7fc69de6a90e1b0e0215";

// API'den uçuş bilgilerini getiren endpoint
router.get('/api-flights', async (req, res) => {
  try {
    const response = await axios.get(FLIGHT_API_URL, {
      headers: {
        'ResourceVersion': 'v4',
        'app_id': APP_ID,
        'app_key': APP_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'API Error' });
  }
});

// MongoDB'den kayıtlı uçuş verilerini getiren endpoint
router.get('/mongodb-flights', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    console.error('MongoDB Error:', error);
    res.status(500).json({ error: 'Veriler getirilemedi.' });
  }
});

  
// Uçuş verilerini kaydetme endpoint'i
router.post('/', async (req, res) => {
  const flight = new Flight(req.body);
  try {
    await flight.save();
    res.status(201).send({ message: 'Flight saved successfully!' });
  } catch (error) {
    console.error('Error saving flight:', error);
    res.status(500).send({ error: 'Failed to save flight.' });
  }
});
module.exports = router;