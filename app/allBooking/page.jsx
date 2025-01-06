"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Mail, Trash2, X } from 'lucide-react';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

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

  const openDeleteConfirmation = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowConfirmation(false);
    setSelectedBookingId(null);
  };

  const handleDelete = async () => {
    if (!selectedBookingId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`https://booking-server-azure-psi.vercel.app/api/book/${selectedBookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBookings(bookings.filter(booking => booking._id !== selectedBookingId));
        closeDeleteConfirmation();
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      setError("Failed to delete booking. Please try again.");
    } finally {
      setIsDeleting(false);
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
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
              <button
                onClick={closeDeleteConfirmation}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this booking? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteConfirmation}
                className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

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
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 relative"
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
                  
                  <div className="flex items-center justify-between">
                    <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                      Confirmed
                    </div>
                    
                    <button
                      onClick={() => openDeleteConfirmation(booking._id)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
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