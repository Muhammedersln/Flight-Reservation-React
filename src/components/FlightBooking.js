// src/components/FlightBooking.js
import React, { useState } from 'react';
import axios from 'axios';

const FlightBooking = () => {
  const [flightName, setFlightName] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [route, setRoute] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/flights', {
        flightName,
        flightNumber,
        scheduleDate,
        route: route.split(','),
      });
      alert('Flight booked successfully!');
    } catch (error) {
      console.error('Booking Error:', error);
      alert('Failed to book flight');
    }
  };

  return (
    <form onSubmit={handleBooking}>
      <input
        type="text"
        placeholder="Flight Name"
        value={flightName}
        onChange={(e) => setFlightName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Flight Number"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Schedule Date"
        value={scheduleDate}
        onChange={(e) => setScheduleDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Route (comma separated)"
        value={route}
        onChange={(e) => setRoute(e.target.value)}
        required
      />
      <button type="submit">Book Flight</button>
    </form>
  );
};

export default FlightBooking;
