export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Train {
  id: string;
  name: string;
  source: string;
  destination: string;
  availableSeats: number;
  departureTime: string;
  arrivalTime: string;
  price: number;
}

export interface Booking {
  id: string;
  trainId: string;
  trainName: string;
  source: string;
  destination: string;
  seatNumber: number;
  bookingDate: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  status: 'confirmed' | 'cancelled';
}