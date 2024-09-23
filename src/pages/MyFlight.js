import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoRemoveOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiCircleInfo } from "react-icons/ci";

const MyFlight = () => {
  const [flights, setFlights] = useState([]);
  const [avgFare, setAvgFare] = useState(0); // State to store average fare
  const filters = ["Times", "Stops", "Airlines", "Airports", "Amenities"];
  const ratings = [
    [true, true, false, false, false],
    [true, true, true, false, false],
    [true, true, true, true, false],
    [true, true, true, true, true],
  ];

  useEffect(() => {
    const fetchFlightsFromMongoDB = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flights/mongodb-flights');
        setFlights(response.data);
        calculateAvgFare(response.data); // Calculate average fare after fetching data
      } catch (error) {
        console.error('Veriler getirilemedi:', error);
      }
    };

    fetchFlightsFromMongoDB();
  }, []);

  // Function to calculate average fare
  const calculateAvgFare = (flightsData) => {
    if (flightsData.length > 0) {
      const totalFare = flightsData.reduce((total, flight) => total + flight.price, 0);
      const averageFare = totalFare / flightsData.length;
      setAvgFare(averageFare.toFixed(2)); // Update state with average fare
    }
  };

  console.log(flights);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between space-y-4 md:space-y-0 space-x-0 md:space-x-4 p-4 bg-white shadow-lg">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              className="bg-white border px-4 py-2 rounded-md hover:bg-gray-200"
            >
              {filter}
            </button>
          ))}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full md:w-auto">
            Edit Search
          </button>
        </div>

        {/* Star Rating Filters */}
        <div className="flex space-x-2 justify-center md:ml-auto">
          {ratings.map((stars, index) => (
            <div key={index} className="flex items-center space-x-1">
              {stars.map((filled, idx) => (
                <span key={idx} className={filled ? "text-black" : "text-gray-300"}>
                  ★
                </span>
              ))}
              {index !== ratings.length - 1 && (
                <span className="text-gray-300 px-1 hidden md:inline-block">|</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-between items-center my-9'>
        <div className='flex items-center font-normal'>
          Sort by:
          <span className='font-bold ml-1'> Recommended</span>
          <span><RiArrowDropDownLine /></span>
        </div>
        <div className='flex items-center justify-center mt-4 md:mt-0'>
          <span className='text-xl text-blue-700 items-center justify-center'><CiCircleInfo /></span>
          <span className='font-normal'>Avg Fare: </span>
          <span className='font-semibold ml-1'>${avgFare}</span> {/* Display the average fare */}
        </div>
      </div>
      
      <div className="space-y-6">
        {flights.map((flight, index) => {
          const departureDateTime = new Date(flight.scheduleDateTime);
          const arrivalDateTime = new Date(flight.actualLandingTime);

          const departureTime = departureDateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const arrivalTime = arrivalDateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          // Calculate duration in minutes
          const durationInMilliseconds = arrivalDateTime - departureDateTime;
          const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));
          const hours = Math.floor(durationInMinutes / 60);
          const minutes = durationInMinutes % 60;

          const flightDuration = `${hours}h ${minutes}m`;

          return (
            <div key={index} className="bg-white p-6 mb-6 shadow-md rounded-md flex flex-wrap md:flex-nowrap items-center justify-between space-y-4 md:space-y-0 space-x-0 md:space-x-4 mx-auto">
              {/* 2.kısım */}
              <div className='w-full md:w-1/2 flex flex-wrap md:flex-nowrap items-center space-y-4 md:space-y-0'>
                <div className='w-1/12 flex text-start'>
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">
                    {/* Logo buraya eklenecek */}
                  </div>
                </div>
                <div className='w-11/12'>
                  <div className='text-lg md:text-3xl mb-3 flex items-center justify-between md:justify-start'>
                    <span>{departureTime}</span>
                    <span className='flex items-center mx-2'><IoRemoveOutline /></span>
                    <span>{arrivalTime}</span>
                  </div>
                  <div className='flex flex-wrap md:flex-nowrap justify-between'>
                    <div className='flex flex-col w-full md:w-1/3'>
                      <span className='text-sm font-medium'>{flight.airline}</span>
                      <span className='text-xs text-blue-500'>Flight Details</span>
                    </div>
                    <div className='flex flex-col w-full md:w-1/3'>
                      <span className='text-sm font-medium'>Nonstop</span>
                      <span className='text-xs text-gray-500'>{flightDuration}</span>
                    </div>
                    <div className='flex flex-col w-full md:w-1/3'>
                      <span className='text-sm font-medium'>X to {flight.prefixICAO}</span>
                      <span className='text-xs text-gray-500'>{flight.flightName}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 3. kısım fiyat */}
              <div className='w-full md:w-1/2 flex flex-wrap md:flex-nowrap justify-between'>
                <div className='flex flex-col items-center border p-3 rounded-md w-full md:w-auto mb-4 md:mb-0'>
                  <span className='text-2xl font-semibold mb-2'>${flight.price}</span>
                  <span className='text-sm text-gray-500'>main</span>
                </div>
                <div className='flex flex-col items-center border p-3 rounded-md w-full md:w-auto mb-4 md:mb-0'>
                  <span className='text-2xl font-semibold mb-2'>${flight.price + 156}</span>
                  <span className='text-sm text-gray-500'>comfort</span>
                </div>
                <div className='flex flex-col items-center border p-3 rounded-md w-full md:w-auto mb-4 md:mb-0'>
                  <span className='text-2xl font-semibold mb-2'>$156</span>
                  <span className='text-sm text-gray-500'>economy</span>
                </div>
                <div className='flex flex-col items-center border p-3 rounded-md w-full md:w-auto mb-4 md:mb-0'>
                  <span className='text-2xl font-semibold mb-2'>$156</span>
                  <span className='text-sm text-gray-500'>premium</span>
                </div>
                <div className='flex flex-col items-center border p-3 rounded-md w-full md:w-auto'>
                  <span className='text-2xl font-semibold mb-2'>$156</span>
                  <span className='text-sm text-gray-500'>business</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyFlight;
