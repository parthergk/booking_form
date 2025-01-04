"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import BookingConfirmation from "./BookingConf";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [guest, setGuest] = useState("");
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const reservationTime = [
    "1:30 AM",
    "3:30 AM",
    "5:30 AM",
    "7:30 PM",
    "9:30 PM",
    "11:30 PM",
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      number === "" ||
      guest === "" ||
      !selectedTime
    ) {
      return setError("All fields are required");
    }

    try {
      const response = await fetch("http://localhost:3000/api/book/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          number,
          guest,
          date,
          time: selectedTime,
        }),
      });
      if (response.ok) {
        setBookingDetails({
          name,
          email,
          number,
          guest,
          date: date.toISOString(),
          time: selectedTime,
        });
        setShowConfirmation(true);

        setName("");
        setNumber("");
        setEmail("");
        setGuest("");
        setSelectedTime("");
        setError("");
      } else {
        const { message } = await response.json();
        setError(message || "Failed to book. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      {showConfirmation && (
        <BookingConfirmation
          booking={bookingDetails}
          onClose={() => setShowConfirmation(false)}
        />
      )}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Table Booking Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:border-emerald-500 outline-none transition-colors bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:border-emerald-500 outline-none transition-colors bg-white"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:border-emerald-500 outline-none transition-colors bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Number of Guests
            </label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg  hover:border-emerald-500 outline-none transition-colors bg-white"
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Select Date
            </h2>
            <Calendar
              value={date}
              onChange={setDate}
              className="w-full border border-gray-200 rounded-xl shadow-lg bg-white p-4 hover:shadow-xl transition-shadow"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Select Time
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {reservationTime.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 
                    ${
                      selectedTime === time
                        ? "bg-emerald-500 shadow-custom-green text-white shadow-lg transform scale-105"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-500 hover:text-emerald-500 hover:shadow-md"
                    }`}
                  onClick={() => setSelectedTime(time)}
                  aria-label={`Select time ${time}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full md:w-auto px-8 py-4 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Book
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
