"use client"
import { useState, useEffect } from 'react';
import BookingCard from '@/components/bookings/BookingCard';
import DeleteConfirmationModal from '@/components/bookings/DeleteConfirmationModal';
import LoadingState from '@/components/bookings/LoadingState';
import ErrorState from '@/components/bookings/ErrorState';

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

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      {showConfirmation && (
        <DeleteConfirmationModal
          onClose={closeDeleteConfirmation}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      <h1 className="text-3xl font-bold mb-8 text-gray-800">All Bookings</h1>
      
      <div className="space-y-6">
        {bookings.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No bookings found
          </div>
        ) : (
          bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onDeleteClick={openDeleteConfirmation}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BookingsList;