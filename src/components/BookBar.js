import React, { useState } from 'react';
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from 'react-icons/fa';
import { IoAirplane } from "react-icons/io5";

const BookBar = ({ onFilter }) => {
  const [tripType, setTripType] = useState('round');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  const handleFilter = () => {
    onFilter({ to, departureDate });
  };

  return (
    <div className='bg-white p-5 rounded-lg shadow-md max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row justify-between items-center md:items-start'>
        <h3 className='flex items-center gap-2 font-medium text-xl mb-4 md:mb-0'>
          <span><IoAirplane /></span>
          BOOK YOUR FLIGHT
        </h3>
        <div className="flex bg-gray-200 rounded-full p-1">
          <button
            onClick={() => setTripType('round')}
            className={`px-4 py-1 rounded-full focus:outline-none transition-colors duration-200 
            ${tripType === 'round' ? 'bg-purple text-white' : 'text-purple'}`}
          >
            Round trip
          </button>
          <button
            onClick={() => setTripType('oneway')}
            className={`px-4 py-1 rounded-full focus:outline-none transition-colors duration-200 
            ${tripType === 'oneway' ? 'bg-purple text-white' : 'text-purple'}`}
          >
            One way
          </button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-3 mt-5'>
        {/* Kalkış */}
        <div className='flex items-center border rounded-lg p-2.5 flex-1'>
          <FaPlaneDeparture className='mr-2.5' />
          <input 
            type="text" 
            placeholder="From" 
            disabled
            style={{ border: 'none', outline: 'none', flex: 1 }} 
          />
        </div>
        {/* Varış */}
        <div className='flex items-center border rounded-lg p-2.5 flex-1'>
          <FaPlaneArrival className='mr-2.5' />
          <input 
            type="text" 
            placeholder="To" 
            value={to} 
            onChange={(e) => setTo(e.target.value)} 
            style={{ border: 'none', outline: 'none', flex: 1 }} 
          />
        </div>
        {/* Kalkış Tarihi */}
        <div className='flex items-center border rounded-lg p-2.5 flex-1'>
          <FaCalendarAlt className='mr-2.5'/>
          <input 
            type="date" 
            value={departureDate} 
            onChange={(e) => setDepartureDate(e.target.value)} 
            style={{ border: 'none', outline: 'none', flex: 1 }} 
          />
        </div>
        {/* Dönüş Tarihi */}
        <div className='flex items-center border rounded-lg p-2.5 flex-1'>
          <FaCalendarAlt className='mr-2.5'/>
          <input 
            type="date" 
            style={{ border: 'none', outline: 'none', flex: 1 }} 
            disabled={tripType === 'oneway'} 
          />
        </div>
      </div>

      {/* Uçuş Arama Butonu */}
      <button
        className='mt-5 p-2.5 bg-purple text-white rounded-lg px-5 w-full md:w-auto'
        onClick={handleFilter}
      >
        Show flights
      </button>
    </div>
  );
};

export default BookBar;
