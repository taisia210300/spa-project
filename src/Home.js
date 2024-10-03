import student from './img/student.png';
import Irkutsk from './img/Irkutsk.png';
import Image1 from './img/image1.png';
import Image2 from './img/image_2.png';
import Image3 from './img/image_3.png';
import Frame1 from './img/Frame1.png';
import Frame2 from './img/Frame2.png';
import Frame3 from './img/Frame3.png';
import new1 from './img/Image.png';

import './Home.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HomeContent({ handleTabClick }) {
  return (
    <React.StrictMode>
      <div>
        <PageElementContainer1 handleTabClick={handleTabClick} />
        <PageElementContainer2 />
        <PageElementContainer2mobile />
        <PageElementContainer3 />
        <PageElementContainer5 handleTabClick={handleTabClick}/>
        <PageElementContainer4 handleTabClick={handleTabClick}/>
      </div>
    </React.StrictMode>
  );
}

function PageElementContainer1({ handleTabClick }) {
  return (
    <div className="pageElementContainer1">
      <div className="leftBlock">
        <div className="textContainer">
          <p>Рабочее пространство, в котором каждый найдет место для знаний</p>
        </div>
        <div>
          <Link to="/contacts" className="button-link">
            <button className="button">ЗАПИСЬ НА ПОСЕЩЕНИЕ</button>
          </Link>
        </div>
      </div>
      <div className="rightBlock">
        <img src={student} alt="Студенты" />
      </div>
    </div>
  );
}

function PageElementContainer2() {
  return (
    <div className="pageElementContainer2">
      <div className="leftPart">
        <img src={Irkutsk} alt="Иркутск" className="image" />
      </div>
      <div className="rightPart">
        <h2 className="title">Учебный уголок — проект Правительства Иркутска</h2>
        <div className="textColumns">
          <div className="column">
            <p>Цель Учебного уголка — создание условий для успешной реализации молодёжи и раскрытие её потенциала для дальнейшего развития Иркутска</p>
          </div>
          <div className="column">
            <p>А также содействие успешной интеграции молодёжи в общество и повышению её роли в жизни города и страны</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageElementContainer2mobile() {
  return (
    <div className="PageElementContainer2mobile">
      <div className="leftPart">
        <img src={Irkutsk} alt="Иркутск" className="image" />
        <h2 className="title">Учебный уголок — проект Правительства Иркутска</h2>
      </div>
      <div className="rightPart">
        <div className="textColumns">
          <div className="column">
            <p>Цель Учебного уголка — создание условий для успешной реализации молодёжи и раскрытие её потенциала для дальнейшего развития Иркутска</p>
          </div>
          <div className="column">
            <p>А также содействие успешной интеграции молодёжи в общество и повышению её роли в жизни города и страны</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const PageElementContainer3 = () => {
  const [selectedContent, setSelectedContent] = useState('content1');

  const renderContent = () => {
    switch (selectedContent) {
      case 'content1':
        return (
          <div className="content-container">
  <div className="image-container">
    <img src={Image3} alt="rfhnbyrf" />
    <div className="text-overlay">
      <h3>Студия для рисования</h3>
      <p>C мольбертами, холстами, красками, предметами для натюрмортов и другими материалами для творчества</p>
    </div>
  </div>
  <div className="image-container desktop-only">
    <img src={Frame1} alt="wcecf 6" />
  </div>
</div>
        );
      case 'content2':
        return (
          <div className="content-container">
            <div className="image-container">
              <img src={Image1} alt="eggr 3" />
              <div>
              <div className="text-overlay">
              <h3>Компьютерный класс</h3>
      <p>С высокопроизводительными ПК и предустановленным программным обеспечением для программирования, моделирования и мат. расчетов</p>
    </div> </div>
            </div>
            <div className="image-container desktop-only">
            <div className="desktop-only">
              <img src={Frame2} alt="wcecf 6" />
            </div>
            </div>
          </div>
        );
      case 'content3':
        return (
          <div className="content-container">
            <div className="image-container">
              <img src={Image2} alt="ujny 5" />
              <div className="text-overlay"><div>
              <h3>Библиотека с широким выбором литературы</h3>
      <p>Включая классические и современные произведения, научные работы и журналы по гуманитарным дисциплинам</p>
    </div></div>
            </div>
            <div className="image-container desktop-only">
            <div className="desktop-only">
              <img src={Frame3} alt="wcecf 6" />
            </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-element-container">
      <h1>Выбери свое пространство</h1>
      <div className="button-container">
        <button
          className={selectedContent === 'content1' ? 'active' : ''}
          onClick={() => setSelectedContent('content1')}
        >
          ДИЗАЙН И АРХИТЕКТУРА
        </button>
        <button
          className={selectedContent === 'content2' ? 'active' : ''}
          onClick={() => setSelectedContent('content2')}
        >
          IT-ТЕХНОЛОГИИ
        </button>
        <button
          className={selectedContent === 'content3' ? 'active' : ''}
          onClick={() => setSelectedContent('content3')}
        >
          ГУМАНИТАРНЫЕ НАУКИ
        </button>
      </div>
      <div className="dropdown-container">
        <select
          onChange={(e) => setSelectedContent(e.target.value)}
          value={selectedContent}
        >
          <option value="content1">ДИЗАЙН И АРХИТЕКТУРА</option>
          <option value="content2">IT-ТЕХНОЛОГИИ</option>
          <option value="content3">ГУМАНИТАРНЫЕ НАУКИ</option>
        </select>
      </div>
      <div className="content-container">
        {renderContent()}
      </div>
    </div>
  );
};

function PageElementContainer5({handleTabClick}) {
  return (
    <div className="pageElementContainer5">
      <h2>Учебный уголок – не только про учебу, загляни на страницу мероприятий</h2>
  <div className="split-block-container">
  <div className="left-column2">
    <h2>Хакатон Инноваций</h2>
    <p>Соревнование, где команды студентов разрабатывают инновационные решения на заданную тему, используя технологии и креативный подход</p>
    <p>Дата: 05.20.2024
    <br />
    Время: 12:00</p>
    <Link to="/about" className="button-link">
            <button className="button_blue">ПОСМОТРЕТЬ МЕРОПРИЯТИЯ</button>
          </Link>
  </div>
  <div className="right-column2">
    <img src={new1} alt="Описание изображения" />
  </div>
</div>
</div>
  );
}

const PageElementContainer4 = ({handleTabClick}) => {
  return (
    <div className="page-element-container4">
      <div className="map-container desktop-only">
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A6fbc5d25eed9aa94f04f0a462bc0cda8967d2a56da8f99ec6aba836caad8b924&amp;source=constructor" width="700" height="360" frameBorder="0"></iframe>
      </div>
      <div className="mobile-only"><iframe1 src="https://yandex.ru/map-widget/v1/?um=constructor%3A6fbc5d25eed9aa94f04f0a462bc0cda8967d2a56da8f99ec6aba836caad8b924&amp;source=constructor" width="320" height="240" frameBorder="0"></iframe1></div>
      <div className="contact-container">
        <h2>Локация в центре города, в 15 минутах от университетов</h2>
        <p>Телефон: +7 (921) 570-14-52</p>
        <p>Эл. почта:  UchebUgolok@mail.ru</p>
        <Link to="/contacts" className="button-link">
            <button className="button_blue">ЗАПИСАТЬСЯ В КОВОРКИНГ</button>
          </Link>
      </div>
    </div>
  );
};

export default HomeContent;