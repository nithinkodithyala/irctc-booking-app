import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Train as TrainIcon } from 'lucide-react';
import { Train } from '../types';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const MOCK_TRAINS: Train[] = [
  {
    id: '1',
    name: 'Express 101',
    source: 'New York',
    destination: 'Boston',
    availableSeats: 45,
    departureTime: '2024-03-20T10:00:00',
    arrivalTime: '2024-03-20T14:00:00',
    price: 89
  },
  {
    id: '2',
    name: 'Bullet 202',
    source: 'Boston',
    destination: 'Washington DC',
    availableSeats: 32,
    departureTime: '2024-03-20T12:00:00',
    arrivalTime: '2024-03-20T16:00:00',
    price: 120
  }
];

export function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [searchResults, setSearchResults] = useState<Train[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchResults(MOCK_TRAINS);
    setHasSearched(true);
  };

  const handleBooking = async (trainId: string) => {
    if (!user) {
      toast.error('Please login to book tickets');
      navigate('/login');
      return;
    }

    try {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Booking confirmed successfully!');
      navigate('/bookings');
    } catch (error) {
      toast.error('Failed to book ticket. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Search Trains</h1>
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter source station"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">To</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter destination station"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Search Trains</span>
            </button>
          </div>
        </form>
      </div>

      {hasSearched && (
        <div className="space-y-4">
          {searchResults.length > 0 ? (
            searchResults.map((train) => (
              <div
                key={train.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
              >
                <div className="flex items-center space-x-4">
                  <TrainIcon className="h-8 w-8 text-indigo-600" />
                  <div>
                    <h3 className="text-lg font-semibold">{train.name}</h3>
                    <p className="text-gray-600">
                      {train.source} → {train.destination}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Departure</p>
                  <p className="font-semibold">
                    {new Date(train.departureTime).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Arrival</p>
                  <p className="font-semibold">
                    {new Date(train.arrivalTime).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Available Seats</p>
                  <p className="font-semibold">{train.availableSeats}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="font-semibold">${train.price}</p>
                </div>
                <button
                  onClick={() => handleBooking(train.id)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                >
                  Book Now
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No trains found for this route.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}