import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark]         = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  const toggleDark = () => {
    setDark(d => !d)
    document.body.classList.toggle('dark')
  }

  const handleLink = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => handleLink('/')}>🌍 GlobalTour</h2>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a className={currentPath === '/' ? 'active' : ''} onClick={() => handleLink('/')}>Home</a>
        <a className={currentPath === '/explore' ? 'active' : ''} onClick={() => handleLink('/explore')}>Explore</a>
        <a className={currentPath === '/about' ? 'active' : ''} onClick={() => handleLink('/about')}>About</a>
        <a className={currentPath === '/contact' ? 'active' : ''} onClick={() => handleLink('/contact')}>Contact</a>
        
        {user ? (
          <>
            <a className={currentPath === '/dashboard' ? 'active' : ''} onClick={() => handleLink('/dashboard')}>Dashboard</a>
            <button className="book-btn" style={{ background: '#e24b4a' }} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="book-btn" onClick={() => handleLink('/login')}>Login</button>
        )}

        <button className="dark-btn" onClick={toggleDark}>
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(m => !m)}>☰</button>
    </nav>
  )
}