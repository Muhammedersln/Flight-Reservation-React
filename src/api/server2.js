const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flightRoutes = require('../routes/flights'); // Uçuş rotalarını ekleyin

const app = express();
app.use(cors());
app.use(express.json()); // JSON verisini işlemek için

const PORT = 5000;

// MongoDB Bağlantısı
mongoose.connect('mongodb://localhost:27017/FlyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB bağlantısı kuruldu'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Rotaları ekleyin
app.use('/api/flights', flightRoutes); // Uçuşlar için rotayı kullan

// Hata yakalama middleware'i
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
