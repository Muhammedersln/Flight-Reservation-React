import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyFlight = () => {
  const [flights, setFlights] = useState([]); // Uçuş verilerini tutmak için state

  useEffect(() => {
    // MongoDB'den verileri almak için GET isteği
    const fetchFlightsFromMongoDB = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flights/mongodb-flights'); // MongoDB verilerini çeken endpoint
        setFlights(response.data); // Gelen veriyi state'e kaydediyoruz
      } catch (error) {
        console.error('Veriler getirilemedi:', error);
      }
    };

    fetchFlightsFromMongoDB(); // useEffect içinde fetchFlights fonksiyonunu çağırıyoruz
  }, []); // Boş dizi, component mount edildiğinde sadece bir kez çalışmasını sağlar

  return (
    <div>
      <h1>My Flights</h1>
      <table>
        <thead>
          <tr>
            <th>Schedule DateTime</th>
            <th>Prefix IATA</th>
            <th>Expected Time On Belt</th>
          </tr>
        </thead>
        <tbody>
          {flights.length > 0 ? (
            flights.map((flight) => (
              <tr key={flight._id}>
                <td>{new Date(flight.scheduleDateTime).toLocaleString()}</td>
                <td>{flight.prefixIATA}</td>
                <td>{new Date(flight.expectedTimeOnBelt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No flight data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyFlight;
