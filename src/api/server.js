const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flightRoutes = require('../routes/flights'); 

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;


mongoose.connect('mongodb://localhost:27017/FlyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB bağlantısı kuruldu'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));


app.use('/api/flights', flightRoutes); 

// Hata yakalama middleware'i
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
