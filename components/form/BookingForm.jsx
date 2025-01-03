"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [guest, setGuest] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const timeArr = [
    "1:30 AM",
    "3:30 AM",
    "5:30 AM",
    "7:30 PM",
    "9:30 PM",
    "11:30 PM",
  ];

  console.log("Date", date);

  async function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || email === "" || number === "" || guest === "") {
      return setError("All fields are required");
    }

    try {
      const response = await fetch("/api/book", {
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
        setName("");
        setNumber("");
        setEmail("");
        setGuest("");
        setError("");
        alert("Booking successful!");
      } else {
        setError("Failed to book. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <div>
          <label>Full Name</label>
          <input
            type="text"
            required
            className="border text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Contact Number</label>
          <input
            type="tel"
            required
            className="border text-black"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            className="border text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Number of Guests</label>
          <input
            type="number"
            required
            className="border text-black"
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
          />
        </div>

        <div>
          <Calendar
            value={date}
            onChange={setDate}
            className="w-full max-w-xl border border-gray-300 p-4 rounded-lg shadow-md bg-white space-y-5"
          />
        </div>

        <div className="flex flex-wrap gap-5 max-w-xl">
          {timeArr.map((time) => (
            <span
              key={time}
              className={` cursor-pointer w-40 border rounded-sm px-1 py-3 text-black ${
                selectedTime === time ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </span>
          ))}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2">
          Book
        </button>
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </form>
  );
};

export default BookingForm;
