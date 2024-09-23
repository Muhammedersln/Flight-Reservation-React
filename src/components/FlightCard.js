// src/components/FlightCard.js
import React from 'react';
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from 'react-icons/fa';
import { TbPlaneArrival, TbPlaneDeparture } from "react-icons/tb";
import axios from 'axios';


import { IoAirplane } from "react-icons/io5";



const FlightCard = ({ flight, bookFlight }) => {
  const {
    flightName,
    scheduleDateTime,
    actualLandingTime,
    route,
    serviceType,
    prefixIATA,
    expectedTimeOnBelt
  } = flight;
  
  const departureTime = new Date(scheduleDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const arrivalTime = new Date(expectedTimeOnBelt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Kalkış ve varış zamanlarını Date nesnelerine çevirme
  const departureDate = new Date(scheduleDateTime);
  const arrivalDate = new Date(expectedTimeOnBelt);
  const durationInMilliseconds = arrivalDate - departureDate;
  const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  const flightDuration = `${hours}h ${minutes}m`;

  // Uçuş verilerini kaydetme fonksiyonu
  const saveFlight = async (flightData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/flights', flightData);
      console.log('Uçuş başarıyla kaydedildi:', response.data);
    } catch (error) {
      console.error('Uçuş kaydedilirken hata oluştu:', error);
    }
  };

  // Uçuş verilerini frontend'de listeleme ve kaydetme
  const handleSaveFlight = (flight) => {
    // Gerekli uçuş verilerini flight objesinden ayıklayın
    const flightData = {
      scheduleDateTime: flight.scheduleDateTime,
      prefixIATA: flight.prefixIATA,
      expectedTimeOnBelt: flight.expectedTimeOnBelt,
    };
  
    // flightData'nın içeriğini kontrol edin
    console.log(flightData);
  
    // Eksik alanları kontrol edin
    if (!flightData.scheduleDateTime || !flightData.prefixIATA || !flightData.expectedTimeOnBelt) {
      console.error("Gerekli alanlardan biri eksik:", flightData);
      return;
    }
  
    saveFlight(flightData);
  };
  

  return (
    <div className="bg-white p-5 rounded-[10px] shadow-md flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mb-7">
      <div className='w-full'>
        <div className=''>
          <span className="text-lg font-semibold">Milano - Madrid</span>
          <div className="flex  justify-between items-start ">
            <div className='flex flex-col'>
              <span className="text-sm text-gray-500 flex items-center gap-2"> <TbPlaneDeparture />Departure</span>
              <span className='text-lg font-bold'>{departureTime} AM</span>
              <span className='text-sm'>Airport : SSS</span>
            </div>
            <div className=" border-t-4 border-gray-300 w-20  items-center mt-5"></div>
            <div className='flex flex-col items-center justify-center '>
              <span className="text-sm font-semibold">{prefixIATA}</span>
              <span className='text-purple text-xl'><IoAirplane></IoAirplane></span>
              <span className='text-sm'>{flightDuration}</span>
            </div>
            <div className=" border-t-4 border-gray-300 w-20  items-center mt-5"></div>
            <div className='flex flex-col text-en'>
              <span className="text-sm text-gray-500 flex items-center gap-2"> <TbPlaneArrival></TbPlaneArrival> Arrival</span>
              <span className='text-lg font-bold'>{arrivalTime} AM</span>
              <span className='text-sm'>Airport : SSS</span>
            </div>
          </div>
        </div>

        <div className='flex justify-between mt-5 relative'>
          <div className="flex flex-col items">
            <span className="text-lg font-bold text-purple ">Price: $200</span>
            <span className="text-sm text-gray-500 text">Round Trip</span>
          </div>
          <button
            onClick={() => handleSaveFlight(flight)}
            className="bg-purple text-white px-4 py-2 rounded-md transition absolute top-0 right-0"
          >
            Book Flight
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
