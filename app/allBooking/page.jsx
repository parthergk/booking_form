"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Mail } from 'lucide-react';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('https://booking-server-azure-psi.vercel.app/api/book');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        setError("Failed to fetch bookings");
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError("Something went wrong while fetching bookings");
    } finally {
      setLoading(false);
    }
  };  

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 flex justify-center items-center min-h-[200px]">
        <div className="text-emerald-500">Loading bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="text-red-500 bg-red-50 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">All Bookings</h1>
      
      <div className="space-y-6">
        {bookings.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No bookings found
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
            >
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
                  
                  <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                    Confirmed
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingsList;