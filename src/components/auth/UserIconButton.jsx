import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './UserIconButton.css';

const UserIconButton = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  // Gestisce il click fuori dal popup per chiuderlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLogin = () => {
    navigate('/');
    setShowPopup(false);
  };

  const handleMyWines = () => {
    navigate('/lista-vini');
    setShowPopup(false);
  };

  const handleLogout = async () => {
    await signOut();
    setShowPopup(false);
  };

  return (
    <div className="user-icon-container">
      <button 
        className="user-icon-button" 
        onClick={togglePopup}
        ref={buttonRef}
        aria-label={user ? "Menu utente" : "Accedi"}
      >
        <div className="user-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </button>
      
      {showPopup && (
        <div className="user-popup" ref={popupRef}>
          {!user ? (
            <button className="popup-item login" onClick={handleLogin}>
              Esegui l'accesso
            </button>
          ) : (
            <>
              <button className="popup-item my-wines" onClick={handleMyWines}>
                I miei vini
              </button>
              <button className="popup-item logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserIconButton;