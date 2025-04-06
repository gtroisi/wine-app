import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import UserProfile from './UserProfile';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const AuthPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Reindirizza l'utente alla pagina di degustazione quando è autenticato
  useEffect(() => {
    if (user) {
      navigate('/tasting');
    }
  }, [user, navigate]);

  const handleContinueWithoutRegistration = () => {
    navigate('/tasting');
  };

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="text-center">Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page-container">
      <div className="auth-page-content">
        <h1 className="auth-page-title">Wine Tasting</h1>
        {user ? (
          <UserProfile />
        ) : (
          <>
            <AuthForm />
            <div className="continue-without-registration">
              <button 
                className="continue-button"
                onClick={handleContinueWithoutRegistration}
              >
                Procedi senza registrazione
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;