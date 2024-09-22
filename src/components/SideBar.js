import React from 'react';
import { FaCar, FaHotel, FaSuitcaseRolling } from 'react-icons/fa';
import carImage from '../images/carrentals.jpg';
import hotelImage from '../images/hotels.jpg';
import travelImage from '../images/packages.jpg';

const SideBar = () => {
  return (
    <div className="space-y-4 h-full w-full p-0"> {/* max-w-sm ve padding kaldırıldı */}
      {/* Car Rentals */}
      <div className="relative h-1/3 rounded-lg overflow-hidden bg-fuchsia-400">
        <img
          src={carImage}
          alt="Car Rentals"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
          <FaCar className="text-white text-3xl" />
          <h2 className="text-white text-xl font-bold">CAR RENTALS</h2>
        </div>
      </div>

      {/* Hotels */}
      <div className="relative h-1/3 rounded-lg overflow-hidden">
        <img
          src={hotelImage}
          alt="Hotels"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
          <FaHotel className="text-white text-3xl" />
          <h2 className="text-white text-xl font-bold">HOTELS</h2>
        </div>
      </div>

      {/* Travel Packages */}
      <div className="relative h-1/3 rounded-lg overflow-hidden">
        <img
          src={travelImage}
          alt="Travel Packages"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
          <FaSuitcaseRolling className="text-white text-3xl" />
          <h2 className="text-white text-xl font-bold">TRAVEL PACKAGES</h2>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
