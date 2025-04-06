import { useState } from 'react'
import './App.css'
import WineTastingForm from './components/WineTastingForm'
import './components/WineTasting.css'
import { AuthProvider } from './contexts/AuthContext'
import AuthPage from './components/auth/AuthPage'
import UserIconButton from './components/auth/UserIconButton'
import HomeButton from './components/auth/HomeButton'
import WineList from './components/WineList'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/tasting" element={<WineTastingForm />} />
            <Route path="/lista-vini" element={<WineList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <HomeButton />
          <UserIconButton />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
