import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const PLACES = [
  { id: 0, name: 'Paris, France',    tag: 'Europe',      rating: 4.9, days: 5, adult: 1711, child: 1475, img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=75' },
  { id: 1, name: 'Santorini, Greece', tag: 'Europe',      rating: 4.8, days: 6, adult: 2850, child: 2200, img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=75' },
  { id: 2, name: 'Kyoto, Japan',      tag: 'Asia',        rating: 4.9, days: 7, adult: 2400, child: 1900, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=75' },
  { id: 3, name: 'Maldives',            tag: 'Ocean',       rating: 5.0, days: 5, adult: 3800, child: 3100, img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=75' },
  { id: 4, name: 'New York, USA',     tag: 'Americas',    rating: 4.7, days: 6, adult: 3200, child: 2500, img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&q=75' },
  { id: 5, name: 'Dubai, UAE',        tag: 'Middle East', rating: 4.8, days: 4, adult: 2700, child: 2100, img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=75' },
  { id: 6, name: 'Bali, Indonesia',   tag: 'Asia',        rating: 4.8, days: 7, adult: 1900, child: 1500, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=75' },
  { id: 7, name: 'Swiss Alps',        tag: 'Europe',      rating: 4.9, days: 6, adult: 4200, child: 3300, img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&q=75' },
]

const TABS = ['All', 'Europe', 'Asia', 'Ocean', 'Americas', 'Middle East']

export default function Places({ onBook }) {
  const [tab, setTab] = useState('All')
  const [wishlist, setWishlist] = useState([])
  const [toastMessage, setToastMessage] = useState('')
  const navigate = useNavigate()

  const filtered = tab === 'All' ? PLACES : PLACES.filter(p => p.tag === tab)

  const toggleWishlist = (name) => {
    if (wishlist.includes(name)) {
      setWishlist(wishlist.filter(n => n !== name))
      setToastMessage(`Removed ${name} from Wishlist`)
    } else {
      setWishlist([...wishlist, name])
      setToastMessage(`Added ${name} to Wishlist! ❤️`)
    }
  }

  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(''), 3000)
    return () => clearTimeout(timer)
  }, [toastMessage])

  return (
    <section id="tours" style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {toastMessage && <div className="success-msg" style={{ position: 'fixed', top: '80px', right: '20px', zIndex: 1000, boxShadow: '0 4px 15px rgba(0,0,0,0.2)', marginTop: 0 }}>{toastMessage}</div>}

      <div className="section-head">
        <h2>Popular Destinations</h2>
        <p>Pick your next adventure from our top destinations</p>
      </div>

      <div className="tab-bar">
        {TABS.map(t => (
          <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <div className="container">
        {filtered.map((p) => {
          const isWishlisted = wishlist.includes(p.name)
          return (
            <div className="card" key={p.id}>
              <div className="card-img-wrap">
                <img className="pimg" src={p.img} alt={p.name} loading="lazy" style={{ cursor: 'pointer' }} onClick={() => navigate(`/explore/detail/${p.id}`)} />
                <button className="wish-btn" onClick={() => toggleWishlist(p.name)}>
                  {isWishlisted ? '❤️' : '🤍'}
                </button>
                <span className="card-tag">{p.tag}</span>
              </div>
              <div className="details">
                <h2 style={{ cursor: 'pointer' }} onClick={() => navigate(`/explore/detail/${p.id}`)}>{p.name}</h2>
                <div className="card-meta">
                  <span>⭐ {p.rating}</span>
                  <span>🗓 {p.days} Days</span>
                </div>
                <div className="price">
                  <p className="label">Price</p>
                  <p>₹{p.adult.toLocaleString()} <span>(Adult)</span></p>
                </div>
                <button className="btn" onClick={() => onBook(p)}>Book Now</button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}