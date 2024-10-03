import React from 'react';
import QRCode from 'qrcode.react';
import CryptoJS from 'crypto-js'; 
import './Popup.css';

const QRCodePopup = ({ show, onClose, qrData, content}) => {
  if (!show) {
    return null;
  }

  // Функция для шифрования данных с использованием AES
  //Необходимо переместить на сервер!!!
  const encryptData = (data) => {
    const secretKey = '75as567';
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };

  // Шифруем данные перед созданием QR-кода
  const encryptedQRData = encryptData(qrData);

  return (
    <div className="popup-overlay">
      <div className="qr-popup">
        <h2>Сохраните QR-код до входа{content}</h2>
        {}
        <QRCode value={encryptedQRData} />
        <button className="qrButton" onClick={onClose}>ЗАКРЫТЬ</button>
      </div>
    </div>
  );
};

export default QRCodePopup;


