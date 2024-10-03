import React, { useState } from 'react';
import axios from 'axios';
import './Contacts.css';
import Form from './img/Form.png';
import TimeSlotPopup from './TimeSlotPopup';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    roomType: '',
    phone: '',
  });
  const [showTimeSlotPopup, setShowTimeSlotPopup] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingData(formData);
    setShowTimeSlotPopup(true);
  };

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleBookingSubmit = async (timeSlots) => {
    const bookingDetails = {
      procedure: 'book_place',
      params: {
        name: formData.name,
        phone: formData.phone,
        hallName: formData.roomType,
        bookingDate: formData.date,
        slotIds: timeSlots
      }
    };

    try {
      const response = await axios.post('http://localhost:5000/api/procedure', bookingDetails);
      alert('Booking created successfully with Booking ID: ' + response.data.bookingId);
      setFormData({ ...formData, bookingId: response.data.bookingId });
      return response.data.bookingId;
    } catch (error) {
      console.error('Error creating booking', error);
      alert('Failed to create booking');
      return null;
    }
  };

  return (
    <div className="booking-form-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Имя:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Телефон:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Дата:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={getTomorrowDate()}
            />
          </label>
          <label>
            Тип помещения:
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required>
              <option value="Дизайн и архитектура">Дизайн и архитектура</option>
              <option value="IT технологии">IT технологии</option>
              <option value="Гуманитарные науки">Гуманитарные науки</option>
              </select>
          </label>
          <button type="submit">Записаться</button>
        </form>
      </div>
      <div className="image-container">
        <img src={Form} alt="Пример помещения" />
      </div>
      {showTimeSlotPopup && (
        <TimeSlotPopup
          show={showTimeSlotPopup}
          onClose={() => setShowTimeSlotPopup(false)}
          formData={bookingData}
          onBookingSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default BookingForm;
