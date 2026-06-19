import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PLACES } from './Places'

export default function TourDetail({ onBook }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nestedPath, setNestedPath] = useState('related')

  const tour = PLACES.find(p => p.id === parseInt(id))

  if (tour === undefined) {
    return (
      <div style={{ paddingTop: '120px', textAlign: 'center', minHeight: '100vh' }}>
        <h3>Destination details route configuration mismatch.</h3>
        <button className="btn" onClick={() => navigate('/explore')}>Return to Explore</button>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '100vh', maxWidth: '800px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <a onClick={() => navigate('/explore')} style={{ cursor: 'pointer', color: 'rgb(15, 226, 142)', fontWeight: 'bold', textDecoration: 'none' }}>← Back to Explore</a>
      
      <div style={{ marginTop: '20px' }}>
        <img src={tour.img} alt={tour.name} style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px' }} />
        <h1 style={{ marginTop: '20px', color: '#093f48' }}>{tour.name} (ID Param View: {tour.id})</h1>
        <p style={{ fontSize: '18px', color: '#555' }}>Experience an unforgettable {tour.days}-day tour tracking across beautiful {tour.tag} regions. (Rating: ⭐ {tour.rating})</p>
        <button className="submit-btn" style={{ maxWidth: '200px', marginTop: '15px' }} onClick={() => onBook(tour)}>Book This Package</button>
      </div>

      {/* Lab Nested Routing Panel Triggers */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '40px', borderBottom: '2px solid #cce8e0', paddingBottom: '10px' }}>
        <a onClick={() => setNestedPath('related')} style={{ cursor: 'pointer', color: '#093f48', fontWeight: nestedPath === 'related' ? '800' : '400', textDecoration: 'none' }}>🔄 Related Itineraries</a>
        <a onClick={() => setNestedPath('comments')} style={{ cursor: 'pointer', color: '#093f48', fontWeight: nestedPath === 'comments' ? '800' : '400', textDecoration: 'none' }}>💬 Traveler Reviews</a>
      </div>

      {/* Outlet simulator area mapping sub-route components */}
      <div style={{ marginTop: '20px', background: '#f6fffe', padding: '15px', borderRadius: '8px' }}>
        {nestedPath === 'related' && (
          <div>
            <h4>Explore Similar Tours</h4>
            <ul>
              <li>Alternative {tour.days + 2}-Day Extended Custom Premium Packages</li>
              <li>Off-Season Explorer Group Discount Packages for {tour.tag}</li>
            </ul>
          </div>
        )}
        
        {nestedPath === 'comments' && (
          <div>
            <h4>Traveler Reviews (2)</h4>
            <p style={{ fontSize: '13px', margin: '5px 0' }}><strong>Rahul S.</strong>: "Absolutely brilliant organization. Highly recommended!"</p>
            <p style={{ fontSize: '13px', margin: '5px 0' }}><strong>Sneha M.</strong>: "Beautiful views and friendly guides."</p>
          </div>
        )}
      </div>
    </div>
  )
}