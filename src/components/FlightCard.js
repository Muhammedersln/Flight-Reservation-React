// src/components/FlightCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from 'react-icons/fa';
import { TbPlaneArrival, TbPlaneDeparture } from "react-icons/tb";
import axios from 'axios';
import { IoAirplane } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';

const FlightCard = ({ flight, bookFlight, priceArray, routeDest, airline }) => {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const navigate = useNavigate();

  const {
    scheduleDateTime,
    actualLandingTime,
    prefixIATA,
    prefixICAO,
  } = flight;

  const departureTime = new Date(scheduleDateTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const arrivalTime = new Date(actualLandingTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const departureDate = new Date(scheduleDateTime);
  const arrivalDate = new Date(actualLandingTime);
  const durationInMilliseconds = arrivalDate - departureDate;
  const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  const flightDuration = `${hours}h ${minutes}m`;

  const saveFlight = async (flightData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/flights', flightData);
      console.log('Uçuş başarıyla kaydedildi:', response.data.flights);
      setBookingConfirmed(true);

      // Rezervasyon başarılı olduğunda toast mesajı göster
      toast.success('Reservation Successful!', {
        duration: 3000, // Toast mesajının gösterim süresi
        position: 'top-right', // Toast pozisyonu
      });

      // 2 saniye sonra yönlendirme yapın
      setTimeout(() => {
        navigate('/myflight');
      }, 2000);
    } catch (error) {
      console.error('Uçuş kaydedilirken hata oluştu:', error);

      // Hata durumunda toast mesajı göster
      toast.error('Reservation failed. Please try again!', {
        duration: 3000, // Toast mesajının gösterim süresi
        position: 'top-right', // Toast pozisyonu
      });
    }
  };

  const randomPrice = priceArray[Math.floor(Math.random() * priceArray.length)];
  const randomRoute = routeDest[Math.floor(Math.random() * routeDest.length)];
  const randomAirline = airline[Math.floor(Math.random() * airline.length)];

  const handleSaveFlight = (flight) => {
    const flightData = {
      scheduleDateTime: flight.scheduleDateTime,
      prefixICAO: flight.prefixICAO,
      actualLandingTime: flight.actualLandingTime,
      flightName: flight.flightName,
      route: flight.route.destinations[0],
      price: randomPrice,
      airline: randomAirline,
    };

    console.log(flightData);

    if (!flightData.scheduleDateTime || !flightData.prefixICAO || !flightData.actualLandingTime) {
      console.error("Gerekli alanlardan biri eksik:", flightData);
      return;
    }

    saveFlight(flightData);
  };

  return (
    <div className="bg-white p-5 rounded-[10px] shadow-md flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mb-7">
      <div className='w-full'>
        <div className=''>
          <span className="text-lg font-semibold">{randomRoute}</span>
          <div className="flex  justify-between items-start ">
            <div className='flex flex-col'>
              <span className="text-sm text-gray-500 flex items-center gap-2"> <TbPlaneDeparture />Departure</span>
              <span className='text-lg font-bold'>{departureTime}</span>
              <span className='text-sm'>Airport :  </span>
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
              <span className='text-lg font-bold'>{arrivalTime}</span>
              <span className='text-sm'>Airport : {prefixICAO}</span>
            </div>
          </div>
        </div>

        <div className='flex justify-between mt-5 relative'>
          <div className="flex flex-col items">
            <span className="text-lg font-bold text-purple ">Price: ${randomPrice}</span>
            <span className="text-sm text-gray-500 text">Round Trip</span>
          </div>
          <button
            onClick={() => handleSaveFlight(flight)}
            className="bg-purple text-white px-4 py-2 rounded-md transition absolute top-0 right-0"
          >
            {bookingConfirmed ? 'Reservation Confirmed!' : 'Book Flight'}
          </button>
        </div>
      </div>
      <div><Toaster
        position="top-right"
        reverseOrder={false}
      /></div>

    </div>
  );
};

export default FlightCard;
