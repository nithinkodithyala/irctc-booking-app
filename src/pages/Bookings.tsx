import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Booking } from '../types';

const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    trainId: '1',
    trainName: 'Express 101',
    source: 'New York',
    destination: 'Boston',
    seatNumber: 23,
    bookingDate: '2024-03-19T15:30:00',
    departureTime: '2024-03-20T10:00:00',
    arrivalTime: '2024-03-20T14:00:00',
    price: 89,
    status: 'confirmed'
  }
];

export function Bookings() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>
      <div className="space-y-4">
        {MOCK_BOOKINGS.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="text-lg font-semibold">{booking.trainName}</h3>
                <p className="text-gray-600">
                  {booking.source} → {booking.destination}
                </p>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(booking.departureTime).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>
                      {new Date(booking.departureTime).toLocaleTimeString()} - 
                      {new Date(booking.arrivalTime).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-end">
                <div className="text-sm">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="ml-2 font-medium">{booking.id}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Seat Number:</span>
                  <span className="ml-2 font-medium">{booking.seatNumber}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="ml-2 font-medium">${booking.price}</span>
                </div>
                <span className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}