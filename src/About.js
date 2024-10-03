import './About.css';
import React, { useState } from 'react';
import axios from 'axios';
import Popup from './Popup';
import about2 from './img/about2.png';
import about1 from './img/about1.png';
import new1 from './img/Image.png';
import new2 from './img/new2.png';
import new3 from './img/new3.png';

function AboutContent() {
    return (
<React.StrictMode>
      <div>
        <AboutElementContainer1 />
        <AboutElementContainer2 />
      </div>
    </React.StrictMode>
    );
  }

  function AboutElementContainer1() {
    return (
   <div className="custom-block-container">
      <div className="left-column">
        <div className="blue-box">Организуем <br />крутые проекты, присоединяйся!</div>
        <div className="left-image">
          <img src={about2} alt="Левая картинка" />
        </div>
      </div>
      <div className="right-column">
        <img src={about1} alt="Правая картинка" />
      </div>
    </div>
    );}

    function AboutElementContainer2() {
      const [showPopup, setShowPopup] = useState(false);
      const [popupContent, setPopupContent] = useState('');
  
      const handleButtonClick = (eventName) => {
          // Отправляем запрос на сервер для обновления информации о мероприятии
          axios.put(`http://localhost:5000/api/events/${eventName}`, { /* данные для обновления */ })
              .then(() => {
                  // Обновление прошло успешно
                  setPopupContent('Мероприятие успешно обновлено.');
                  setShowPopup(true);
              })
              .catch(err => {
                  console.error(err);
                  // В случае ошибки показываем сообщение об ошибке
                  setPopupContent('Произошла ошибка при обновлении мероприятия.');
                  setShowPopup(true);
              });
      };
  
      const handleClosePopup = () => {
          setShowPopup(false);
          setPopupContent('');
      };
  return (
    <>
      <div className="split-block-container">
        <div className="left-column2">
          <h2>Квиз, плиз</h2>
          <p>Классическая игра с вопросами на всевозможные темы. Здесь реально может пригодиться любое знание, которое вы получали в жизни! Повтор вопросов.</p>
          <p>Дата: 12.07.2024
            <br />
            Время: 18:00</p>
          <button onClick={() => handleButtonClick('Хакатон Инноваций')}>ЗАПИСАТЬСЯ</button>
        </div>
        <div className="right-column2">
          <img src={new1} alt="Описание изображения" />
        </div>
      </div>
      <div className="split-block-container">
        <div className="left-column2">
          <h2>Зелёная Инициатива</h2>
          <p>Соревнование, где команды студентов разрабатывают инновационные решения на заданную тему, используя технологии и креативный подход</p>
          <p>Дата: 05.20.2024
            <br />
            Время: 12:00</p>
          <button onClick={() => handleButtonClick('Зелёная Инициатива')}>ЗАПИСАТЬСЯ</button>
        </div>
        <div className="right-column2">
          <img src={new2} alt="Описание изображения" />
        </div>
      </div>
      <div className="split-block-container">
        <div className="left-column2">
          <h2>Гуманитарный батл</h2>
          <p>Дебаты на актуальные социальные и философские темы, где команды студентов защищают свою позицию перед жюри из приглашенных экспертов</p>
          <p>Дата: 05.20.2024
            <br />
            Время: 12:00</p>
          <button onClick={() => handleButtonClick('Гуманитарный батл')}>ЗАПИСАТЬСЯ</button>
        </div>
        <div className="right-column2">
          <img src={new3} alt="Описание изображения" />
        </div>
      </div>
      <Popup show={showPopup} onClose={handleClosePopup} content={popupContent} />
    </>
  );
};
    

  export default AboutContent;