// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightCard from "../components/FlightCard";
import BookBar from '../components/BookBar';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';
import FilterSidebar from '../components/FilterSidebar';
import FlightBooking from '../components/FlightBooking';

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const priceArray  = [200,400,600,800,1000];
  const routeDest = ["Milano - Madrid" , "İstanbul - Roma", "Paris - Berlin", "Moskova - Londra", "Barselona - Atina", "Lizbon - Budapeşte", "Prag - Viyana", "Varşova - Stockholm", "Oslo - Helsinki", "Kopenhag - Dublin"];
  const airline = ["Delta Air Lines", "United Airlines", "American Airlines", "Lufthansa", "Air France", "British Airways", "Turkish Airlines", "Emirates", "Qatar Airways", "Singapore Airlines"];

  useEffect(() => {
    // API'den verileri çekmek için GET isteği
    const fetchFlightsFromAPI = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flights/api-flights'); 
        setFlights(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightsFromAPI(); 
  }, []); 

  useEffect(() => {
    if (filterDate) {
      const filtered = flights.filter(flight => flight.scheduleDate && flight.scheduleDate.includes(filterDate));
      setFilteredFlights(filtered);
    } else {
      setFilteredFlights(flights);
    }
  }, [filterDate, flights]);

  console.log(flights);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='container mx-auto'>
      <div><Navbar></Navbar></div>
      <div className='flex container gap-5'>
        <div className=' w-4/5'>
          {/* BookBar */}
          <div className='w-full'><BookBar></BookBar></div>
          <div className='flex mt-9'>
            {/* FlightCard */}
            <div className='w-3/4 '>
              {flights.length === 0 ? (
                <p>Loading...</p>
              ) : (
                flights.flights.slice(0,3).map((flight) => (
                  <FlightCard key={flight.id} flight={flight}  priceArray={priceArray} routeDest={routeDest} airline={airline} />
                ))
              )}
            </div>
            {/* FilterSide */}
            <div className='w-1/4 bg-blue'>
              <FilterSidebar></FilterSidebar>
            </div>
          </div>

        </div>
        <div className=' w-1/5 '><SideBar></SideBar></div>
      </div>


    </div>
  );
};

export default Home;