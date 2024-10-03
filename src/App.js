import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomeContent from './Home';
import AboutContent from './About';
import ContactsContent from './Contacts';
import Rules from './Rules';
import logo_Dark from './img/White.svg';
import logo_Lite from './img/Logo.svg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <Router>
      <div className="app">
        <nav className="desktop-menu">
          <div className="logo">
            <img src={logo_Lite} alt="Логотип" />
          </div>
          <ul>
            <li><Link to="/">ГЛАВНОЕ</Link></li>
            <li><Link to="/about">МЕРОПРИЯТИЯ</Link></li>
            <li><Link to="/contacts">ЗАПИСЬ НА ПОСЕЩЕНИЕ</Link></li>
          </ul>
        </nav>

        <div className="burger-menu" onClick={toggleMenu}>
          <div className={`burger-icon ${isMenuOpen ? 'open' : ''}`}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <nav className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><Link to="/" onClick={toggleMenu}>ГЛАВНОЕ</Link></li>
              <li><Link to="/about" onClick={toggleMenu}>МЕРОПРИЯТИЯ</Link></li>
              <li><Link to="/contacts" onClick={toggleMenu}>ЗАПИСЬ НА ПОСЕЩЕНИЕ</Link></li>
            </ul>
          </nav>
        </div>
        
        <main className="content">
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/about" element={<AboutContent />} />
            <Route path="/contacts" element={<ContactsContent />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-logo">
            <img src={logo_Dark} alt="Логотип" />
          </div>
          <div className="footer-down">
            <ul className="footer-menu">
              <li><Link to="/">ГЛАВНОЕ</Link></li>
              <li><Link to="/about">МЕРОПРИЯТИЯ</Link></li>
              <li><Link to="/contacts">ЗАПИСЬ НА ПОСЕЩЕНИЕ</Link></li>
            </ul>
            <ul className="footer-menu">
              <li onClick={handlePopupOpen}>ПРАВИЛА ПОСЕЩЕНИЯ</li>
            </ul>
          </div>
        </footer>
        
        <Rules show={isPopupOpen} onClose={handlePopupClose} content="Правила посещения" />
      </div>
    </Router>
  );
}

export default App;