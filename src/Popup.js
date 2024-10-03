import React, { useState } from 'react';
import axios from 'axios'; // Импортируем axios для отправки запросов на сервер
import QRCodePopup from './QRCodePopup';
import './Popup.css';

const Popup = ({ show, onClose, content }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [qrData, setQrData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Функция для отправки данных регистрации на сервер
  const registerEvent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/registerEvent', {
        eventName: content,
        userName: formData.name,
        userContact: formData.phone
      });
      if (response.status === 200) {
        alert('Registration successful!');
      } else {
        alert('Failed to register. Please try again later.');
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('Failed to register. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Вызываем функцию регистрации события перед открытием QR-кода
    await registerEvent();
    const qrString = ` Мероприятие:${content} \n Имя: ${formData.name} \n Телефон: ${formData.phone}`;
    setQrData(qrString);
    setShowQrPopup(true);
    onClose();
  };

  return (
    <>
      {show && (
        <div className="popup-overlay">
          <div className="form-popup">
            <h2>Зеленая инициатива</h2>
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
              <button className='qrButton' type="submit">ЗАПИСАТЬСЯ</button>
              <button type="button" onClick={onClose}>ЗАКРЫТЬ</button>
            </form>
          </div>
        </div>
      )}
      <QRCodePopup
        show={showQrPopup}
        onClose={() => setShowQrPopup(false)}
        qrData={qrData}
        content={content}
      />
    </>
  );
};

export default Popup;

