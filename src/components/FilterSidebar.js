import React, { useState } from 'react';


import "../../src/css/checkbox.css"; 

const FilterSidebar = () => {
  const [sortBy, setSortBy] = useState('Lowest Price');
  const [arrivalTime, setArrivalTime] = useState([]);
  const [stops, setStops] = useState([]);
  const [airlines, setAirlines] = useState([]);

  const handleCheckboxChange = (filterType, value) => {
    if (filterType === 'arrivalTime') {
      setArrivalTime(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else if (filterType === 'stops') {
      setStops(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else if (filterType === 'airlines') {
      setAirlines(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    }
  };

  return (
    <div className="p-4 space-y-4 bg-gray-100 w-full md:w-64 md:rounded-lg">
      {/* Sort By */}
      <div className="space-y-2">
        <h3 className="font-semibold">Sort by:</h3>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="Lowest Price">Lowest Price</option>
          <option value="Highest Price">Highest Price</option>
          <option value="Earliest Arrival">Earliest Arrival</option>
          <option value="Latest Arrival">Latest Arrival</option>
        </select>
      </div>

      {/* Arrival Time */}
      <div className="space-y-2">
        <h3 className="font-semibold">Arrival Time</h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            value="5:00 AM - 11:59 AM"
            checked={arrivalTime.includes('5:00 AM - 11:59 AM')}
            onChange={() => handleCheckboxChange('arrivalTime', '5:00 AM - 11:59 AM')}
            className="custom-checkbox"
          />
          <span>5:00 AM - 11:59 AM</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            value="12:00 PM - 5:59 PM"
            checked={arrivalTime.includes('12:00 PM - 5:59 PM')}
            onChange={() => handleCheckboxChange('arrivalTime', '12:00 PM - 5:59 PM')}
            className="custom-checkbox"
          />
          <span>12:00 PM - 5:59 PM</span>
        </label>
      </div>

      {/* Stops */}
      <div className="space-y-2">
        <h3 className="font-semibold">Stops</h3>
        <label className="flex items-center justify-between gap-2.5">
          <input
            type="checkbox"
            value="Nonstop"
            checked={stops.includes('Nonstop')}
            onChange={() => handleCheckboxChange('stops', 'Nonstop')}
            className="custom-checkbox"
          />
          <span>Nonstop</span>
          <span className="ml-auto">$230</span>
        </label>
        <label className="flex items-center justify-between gap-2.5">
          <input
            type="checkbox"
            value="1 Stop"
            checked={stops.includes('1 Stop')}
            onChange={() => handleCheckboxChange('stops', '1 Stop')}
            className="custom-checkbox"
          />
          <span>1 Stop</span>
          <span className="ml-auto">$230</span>
        </label>
        <label className="flex items-center justify-between gap-2.5">
          <input
            type="checkbox"
            value="2+ Stops"
            checked={stops.includes('2+ Stops')}
            onChange={() => handleCheckboxChange('stops', '2+ Stops')}
            className="custom-checkbox"
          />
          <span>2+ Stops</span>
          <span className="ml-auto">$230</span>
        </label>
      </div>

      {/* Airlines Included */}
      <div className="space-y-2">
        <h3 className="font-semibold">Airlines Included</h3>
        <label className="flex items-center justify-between gap-2.5">
          <input
            type="checkbox"
            value="Alitalia"
            checked={airlines.includes('Alitalia')}
            onChange={() => handleCheckboxChange('airlines', 'Alitalia')}
            className="custom-checkbox"
          />
          <span>Alitalia</span>
          <span className="ml-auto">$230</span>
        </label>
        <label className="flex items-center justify-between gap-2.5">
          <input
            type="checkbox"
            value="Lufthansa"
            checked={airlines.includes('Lufthansa')}
            onChange={() => handleCheckboxChange('airlines', 'Lufthansa')}
            className="custom-checkbox"
          />
          <span>Lufthansa</span>
          <span className="ml-auto">$230</span>
        </label>
        <label className="flex items-center justify-between gap-2.5">
          <input
            type="checkbox"
            value="Air France"
            checked={airlines.includes('Air France')}
            onChange={() => handleCheckboxChange('airlines', 'Air France')}
            className="custom-checkbox"
          />
          <span>Air France</span>
          <span className="ml-auto">$230</span>
        </label>
        <label className="flex items-center justify-between gap-2.5">
          <input
            type="checkbox"
            value="Brussels Airlines"
            checked={airlines.includes('Brussels Airlines')}
            onChange={() => handleCheckboxChange('airlines', 'Brussels Airlines')}
            className="custom-checkbox"
          />
          <span>Brussels Airlines</span>
          <span className="ml-auto">$230</span>
        </label>
        <label className="flex items-center justify-between gap-2.5">
          <input
            type="checkbox"
            value="Air Italy"
            checked={airlines.includes('Air Italy')}
            onChange={() => handleCheckboxChange('airlines', 'Air Italy')}
            className="custom-checkbox"
          />
          <span>Air Italy</span>
          <span className="ml-auto">$230</span>
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;
