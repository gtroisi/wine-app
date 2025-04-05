import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) return null;

  return (
    <div className="user-profile">
      <div className="user-info">
        <span>{user.email}</span>
      </div>
      <button onClick={handleSignOut} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default UserProfile;