import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Controlla se c'è una sessione attiva
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();

    // Ascolta i cambiamenti di autenticazione
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Funzione per registrare un nuovo utente
  const signUp = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Funzione per effettuare il login
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Funzione per effettuare il logout
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Funzione per salvare i dati del vino nel database
  const saveWineData = async (wineData) => {
    if (!user) {
      return { error: { message: 'Utente non autenticato' } };
    }

    try {
      const { data, error } = await supabase
        .from('wine_tastings')
        .insert([{ ...wineData, user_id: user.id }]);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Funzione per recuperare i vini salvati dall'utente
  const getUserWines = async (sortBy = 'saved_at', ascending = false) => {
    if (!user) {
      return { error: { message: 'Utente non autenticato' } };
    }

    try {
      const { data, error } = await supabase
        .from('wine_tastings')
        .select('*')
        .eq('user_id', user.id)
        .order(sortBy, { ascending });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    saveWineData,
    getUserWines
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}