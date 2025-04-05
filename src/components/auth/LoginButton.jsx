import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './LoginButton.css';

const LoginButton = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (user) {
      // Se l'utente è loggato, effettua il logout
      await signOut();
    } else {
      // Se l'utente non è loggato, vai alla pagina di login
      navigate('/');
    }
  };

  return (
    <div className="login-button-container">
      <button 
        className={`login-logout-button ${user ? 'logout' : 'login'}`}
        onClick={handleClick}
      >
        {user ? 'Logout' : 'Accedi'}
      </button>
    </div>
  );
};

export default LoginButton;