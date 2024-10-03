import React, { useState, useEffect } from 'react';
import QRCodeDataPopup from './QRCodeDataPopup';
import axios from 'axios';
import './Popup.css';
import './TimeSlotPopup.css';

const TimeSlotPopup = ({ show, onClose, formData, onBookingSubmit }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showQRCodePopup, setShowQRCodePopup] = useState(false);
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/availableSlots', {
          params: {
            roomType: formData.roomType,
            date: formData.date,
          },
        });
        setAvailableSlots(response.data);
      } catch (error) {
        console.error('Error fetching available slots:', error);
      }
    };

    fetchAvailableSlots();
  }, [formData]);

  const toggleSlot = (slotId) => {
    setSelectedSlots((prevSelectedSlots) =>
      prevSelectedSlots.includes(slotId)
        ? prevSelectedSlots.filter((s) => s !== slotId)
        : [...prevSelectedSlots, slotId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingId = await onBookingSubmit(selectedSlots);
    const selectedSlotTimes = selectedSlots.map((id) => {
      const slot = availableSlots.find((slot) => slot.slotid === id);
      return `${slot.starttime.split(':').slice(0, 2).join(':')}-${slot.endtime.split(':').slice(0, 2).join(':')}`;
    });
    setQrData({
      ...formData,
      slots: selectedSlotTimes,
      bookingId,
    });
    setShowQRCodePopup(true);
  };

  if (!show) {
    return null;
  }

  if (showQRCodePopup) {
    return (
      <QRCodeDataPopup
        show={showQRCodePopup}
        onClose={() => {
          setShowQRCodePopup(false);
          onClose();
        }}
        qrData={qrData}
      />
    );
  }

  return (
    <div className="popup-overlay">
      <div className="form-popup">
        <h2>Выберите время</h2>
        <form onSubmit={handleSubmit}>
          <div className="slots-container">
            {availableSlots.map((slot) => (
              <button
                key={slot.slotid}
                type="button"
                className={selectedSlots.includes(slot.slotid) ? "selected" : ""}
                onClick={() => toggleSlot(slot.slotid)}
              >
                {`${slot.starttime.split(':').slice(0, 2).join(':')}-${slot.endtime.split(':').slice(0, 2).join(':')}`}
              </button>
            ))}
          </div>
          </form>
          <form>
          <button className="qrButton" type="submit">Подтвердить</button>
          <button type="button" onClick={onClose}>Отмена</button>
        </form>
      </div>
    </div>
  );
};

export default TimeSlotPopup;
