const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    scheduleDateTime: { type: Date, required: true }, // Uçuşun planlanan tarih ve saati
    prefixIATA: { type: String, required: true }, // IATA kodu
    expectedTimeOnBelt: { type: Date, required: true }, // Beklenen varış zamanı
    
  });

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
