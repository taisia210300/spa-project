import React from 'react';
import QRCode from 'qrcode.react';
import './Popup.css';

const QRCodeDataPopup = ({ show, onClose, qrData, bookingId }) => {
  if (!show) {
    return null;
  }

  // Формируем строку для отображения в QR-коде
  const qrString = `Name: ${qrData.name}, Date: ${qrData.date}, Room: ${qrData.roomType}, Time: ${qrData.slots.join(', ')}`;

  return (
    <div className="popup-overlay">
      <div className="qr-popup">
        <h2>Ваш QR-код</h2>
        <QRCode value={qrString} /> {}
        <button className="qrButton" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default QRCodeDataPopup;

