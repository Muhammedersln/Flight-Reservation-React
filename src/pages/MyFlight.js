import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyFlight = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // MongoDB'den uçuş verilerini çekmek için GET isteği yapıyoruz
    axios.get('/flights')
      .then(response => {
        setFlights(response.data); // Gelen verileri flights state'ine kaydediyoruz
      })
      .catch(error => {
        console.error('Veriler getirilemedi:', error);
      });
  }, []);

  return (
    <div className='flex text-purple'>
      <h1>Flight List</h1>
      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            <p>Schedule Date & Time: {new Date(flight.scheduleDateTime).toLocaleString()}</p>
            <p>Prefix IATA: {flight.prefixIATA}</p>
            <p>Expected Time On Belt: {new Date(flight.expectedTimeOnBelt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyFlight;
