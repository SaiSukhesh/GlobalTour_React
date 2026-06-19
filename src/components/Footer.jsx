import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-col">
          <h3>🌍 GlobalTour</h3>
          <p>Crafting unforgettable journeys since 2010.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <a onClick={() => navigate('/')}>Home</a>
          <a onClick={() => navigate('/explore')}>Explore</a>
          <a onClick={() => navigate('/about')}>About</a>
          <a onClick={() => navigate('/contact')}>Contact</a>
        </div>
        <div className="footer-col">
          <h4>Top Destinations</h4>
          <a onClick={() => navigate('/explore')}>Paris</a>
          <a onClick={() => navigate('/explore')}>Maldives</a>
          <a onClick={() => navigate('/explore')}>Kyoto</a>
          <a onClick={() => navigate('/explore')}>Dubai</a>
        </div>
      </div>
    </footer>
  )
}