import React from 'react';
import { Link } from 'react-router-dom';
import { Train, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Train className="h-6 w-6" />
              <span className="font-bold text-xl">RailwayGo</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/bookings" className="hover:text-indigo-200">My Bookings</Link>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 hover:text-indigo-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-50"
              >
                Login
              </Link>
      
            )}
             <Link
                to="/login"
                className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-50"
              >
                Register
              </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
}