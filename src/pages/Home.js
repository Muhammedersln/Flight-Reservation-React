import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightCard from "../components/FlightCard";
import BookBar from '../components/BookBar';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';
import FilterSidebar from '../components/FilterSidebar';

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const priceArray = [200, 400, 600, 800, 1000];
  const routeDest = ["Milano - Madrid", "İstanbul - Roma", "Paris - Berlin", "Moskova - Londra", "Barselona - Atina", "Lizbon - Budapeşte", "Prag - Viyana", "Varşova - Stockholm", "Oslo - Helsinki", "Kopenhag - Dublin"];
  const airline = ["Delta Air Lines", "United Airlines", "American Airlines", "Lufthansa", "Air France", "British Airways", "Turkish Airlines", "Emirates", "Qatar Airways", "Singapore Airlines"];

  useEffect(() => {
    // API'den verileri çekmek için GET isteği
    const fetchFlightsFromAPI = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flights/api-flights');
        setFlights(response.data);
        setFilteredFlights(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightsFromAPI();
  }, []);

  const handleFilter = ({ to, departureDate }) => {
    const filtered = flights.flights.filter((flight) => {
      const matchTo = to ? flight.route.destinations[0] : true;
      const matchDate = departureDate ? flight.departureDate === departureDate : true;
      return matchTo;
    });
    setFilteredFlights({ flights: filtered });
  };

  console.log(filteredFlights);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='container mx-auto px-4'>
      <Navbar />
      <div className='flex flex-col md:flex-row gap-5'>
        {/* Ana İçerik Alanı */}
        <div className='md:w-4/5 w-full order-2 md:order-1'>
          {/* BookBar */}
          <div className='w-full mb-5'>
            <BookBar onFilter={handleFilter} />
          </div>
          {/* Uçuş Kartları ve Filtre */}
          <div className='flex flex-col md:flex-row gap-5'>
            {/* FlightCard */}
            <div className='md:w-3/4 w-full'>
              {filteredFlights.length === 0 ? (
                <p>No flights found...</p>
              ) : (
                filteredFlights.flights.slice(0, 3).map((flight) => (
                  <FlightCard key={flight.id} flight={flight} priceArray={priceArray} routeDest={routeDest} airline={airline} />
                ))
              )}
            </div>
            {/* FilterSide */}
            <div className='md:w-1/4 w-full'>
              <FilterSidebar />
            </div>
          </div>
        </div>
        {/* Yan Menü */}
        <div className='md:w-1/5 w-full order-1 md:order-2'>
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default Home;
