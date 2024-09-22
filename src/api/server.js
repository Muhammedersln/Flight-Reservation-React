const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const FLIGHT_API_URL  = "https://api.schiphol.nl/public-flights/flights";
const AIRLINE_API_URL = "https://api.schiphol.nl/public-flights/airlines";
const APP_ID = "15b605ca";
const APP_KEY = "e5e586b5f58f7fc69de6a90e1b0e0215";


app.get('/api/flights', async (req, res) => {
    try {
      const response = await axios.get(FLIGHT_API_URL, {
        headers: {
          'ResourceVersion': 'v4',
          'app_id': APP_ID,
          'app_key': APP_KEY
        }
      });
      res.json(response.data);  // Uçuş verilerini frontend'e geri döndürüyoruz
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'API Error' });
    }
  });
  // Hava yolu bilgilerini getiren endpoint
app.get('/api/airlines', async (req, res) => {
  try {
    const response = await axios.get(`${AIRLINE_API_URL}?page=0&sort=%2Biata`, {
      headers: {
        'ResourceVersion': 'v4',
        'app_id': APP_ID,
        'app_key': APP_KEY
      }
    });
    res.json(response.data);  // Hava yolu verilerini frontend'e geri döndürüyoruz
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'API Error' });
  }
});
  
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


// server.js dosyanıza ekleyin
const mongoose = require('mongoose');

// MongoDB Bağlantısı
mongoose.connect('mongodb://localhost:27017/flightsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Uçuş Modeli
const flightSchema = new mongoose.Schema({
  flightName: String,
  flightNumber: Number,
  scheduleDate: String,
  route: [String],
});

const Flight = mongoose.model('Flight', flightSchema);

// Uçuş Kaydetme Endpoint'i
app.post('/api/flights', async (req, res) => {
  const flight = new Flight(req.body);
  try {
    await flight.save();
    res.status(201).send({ message: 'Flight saved successfully!' });
  } catch (error) {
    console.error('Error saving flight:', error);
    res.status(500).send({ error: 'Failed to save flight.' });
  }
});
