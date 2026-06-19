import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <div className="hero" id="home">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>Explore the World</h1>
        <p>Your journey begins here — discover amazing destinations</p>
        <div className="hero-btns">
          <button style={{ cursor: 'pointer' }} onClick={() => navigate('/explore')}>Explore Tours</button>
          <button className="outline-btn" style={{ cursor: 'pointer' }} onClick={() => navigate('/about')}>Learn More</button>
        </div>
      </div>
    </div>
  )
}