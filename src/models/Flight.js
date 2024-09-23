const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    scheduleDateTime: { type: Date, required: true }, // Uçuşun planlanan tarih ve saati
    prefixICAO: { type: String, required: true }, // ICAO kodu
    actualLandingTime: { type: Date, required: true }, // Beklenen varış zamanı
    flightName: { type: String, required: true }, // Uçuş adı
    route : { type: String, required: true }, // Uçuş rotası
    price : { type: Number, required: true }, // Uçuş fiyatı
    airline : { type: String, required: true } // Havayolu
  });

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
