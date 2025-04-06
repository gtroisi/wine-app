import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeButton.css';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Naviga alla pagina principale
    navigate('/tasting');
  };

  return (
    <button 
      className="home-icon-button" 
      onClick={handleClick}
      aria-label="Home"
    >
      <div className="home-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </div>
    </button>
  );
};

export default HomeButton;