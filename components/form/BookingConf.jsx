import React from 'react';
import { Calendar, Clock, Users, User, Phone, Mail } from 'lucide-react';

const BookingConfirmation = ({ booking, onClose }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Booking Confirmed!</h2>
              <p className="text-emerald-500 font-medium mt-1">Thank you for your reservation</p>
            </div>
            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg 
                className="h-6 w-6 text-emerald-500" 
                fill="none" 
                strokeWidth="2" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center space-x-3 text-gray-700">
              <Calendar className="h-5 w-5 text-emerald-500" />
              <span className="font-medium">{formatDate(booking.date)}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Clock className="h-5 w-5 text-emerald-500" />
              <span className="font-medium">{booking.time}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Users className="h-5 w-5 text-emerald-500" />
              <span className="font-medium">{booking.guest} Guests</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center space-x-3 text-gray-700">
              <User className="h-5 w-5 text-emerald-500" />
              <span className="font-medium">{booking.name}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Phone className="h-5 w-5 text-emerald-500" />
              <span className="font-medium">{booking.number}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Mail className="h-5 w-5 text-emerald-500" />
              <span className="font-medium">{booking.email}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors duration-200"
            >
              Print Details
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;