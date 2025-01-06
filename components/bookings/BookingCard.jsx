"use client"
import { Calendar, Clock, Users, Phone, Mail, Trash2 } from 'lucide-react';

const BookingCard = ({ booking, onDeleteClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 relative">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-lg text-gray-800">
              {booking.customerName}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{booking.contactNumber}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{booking.emailAddress}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span>{booking.guestCount} guests</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(booking.bookingTime).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{new Date(booking.bookingTime).toLocaleTimeString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
              Confirmed
            </div>
            
            <button
              onClick={() => onDeleteClick(booking._id)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;