import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FAQS = [
  { q: 'Can I customise my package?',        a: 'Yes! Every package can be customised based on your dates, group size and preferences.' },
  { q: 'What is the cancellation policy?',   a: 'Free cancellation up to 7 days before departure. 50% refund within 7 days.' },
  { q: 'Are flights included?',              a: 'Land-only by default. Flights can be added on request.' },
  { q: 'Do you offer group discounts?',      a: 'Yes — groups of 6+ get 10% off and groups of 12+ get 18% off.' },
]

const DESTS = ['Paris, France','Santorini, Greece','Kyoto, Japan','Maldives','New York, USA','Dubai, UAE','Bali, Indonesia','Swiss Alps']

const isEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

/* ── BOOKING MODAL ── */
function Modal({ data, onClose }) {
  const [f,  setF]  = useState({ name: '', email: '', travelers: '' })
  const [e,  setE]  = useState({})
  const [ok, setOk] = useState(false)

  const ch = ev => {
    setF({ ...f, [ev.target.name]: ev.target.value })
    setE({ ...e, [ev.target.name]: '' })
  }

  const confirm = () => {
    const errs = {}
    if (!f.name)                         errs.name      = 'Name is required'
    if (!isEmail(f.email))               errs.email     = 'Enter a valid email'
    if (!f.travelers || f.travelers < 1) errs.travelers = 'Enter no. of travelers'
    if (Object.keys(errs).length) { setE(errs); return }
    setOk(true)
  }

  return (
    <div className="modal-bg" onClick={ev => ev.target.className === 'modal-bg' && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>Book — {data.name}</h3>
        <p className="modal-price">Adult: ₹{data.adult.toLocaleString()} · Child: ₹{data.child.toLocaleString()}</p>

        <div className="form-group">
          <label>Your Name</label>
          <input name="name" value={f.name} onChange={ch} placeholder="Full name" className={e.name ? 'err' : ''} />
          {e.name && <div className="err-msg">{e.name}</div>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" value={f.email} onChange={ch} placeholder="you@email.com" className={e.email ? 'err' : ''} />
          {e.email && <div className="err-msg">{e.email}</div>}
        </div>
        <div className="form-group">
          <label>No. of Travelers</label>
          <input name="travelers" type="number" min="1" value={f.travelers} onChange={ch} placeholder="2" className={e.travelers ? 'err' : ''} />
          {e.travelers && <div className="err-msg">{e.travelers}</div>}
        </div>

        <button className="submit-btn" onClick={confirm}>Confirm Booking</button>
        {ok && <div className="success-msg">🎉 Booking confirmed! Check your email.</div>}
      </div>
    </div>
  )
}

/* ── INDIVIDUAL ROUTE VIEWS ── */

export function AboutView() {
  const navigate = useNavigate()
  return (
    <section id="about" className="about-section" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="section-head" style={{ textAlign: 'center' }}>
        <h2>About Us</h2>
        <p>Who we are and why we travel</p>
      </div>
      <div className="about-inner">
        <div className="about-text">
          <p>Since 2010, GlobalTour has been connecting travelers with the world's most extraordinary destinations. We make every journey seamless and memorable.</p>
          <p>From iconic landmarks to hidden gems, our expert guides and curated packages bring out the true heart of every destination.</p>
          <div className="about-stats">
            <div className="stat-box"><strong>50+</strong><span>Countries</span></div>
            <div className="stat-box"><strong>12K+</strong><span>Travelers</span></div>
            <div className="stat-box"><strong>98%</strong><span>Satisfaction</span></div>
          </div>
          <button className="book-btn" style={{ marginTop: '1rem' }} onClick={() => navigate('/contact')}>
            Contact Us
          </button>
        </div>
        <div className="about-img">
          <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80" alt="Travel" />
        </div>
      </div>
    </section>
  )
}

export function ContactView({ modalData, setModalData }) {
  const [openFaq, setOpenFaq] = useState(null)
  const [f,  setF]  = useState({ fname: '', lname: '', email: '', dest: '', msg: '' })
  const [e,  setE]  = useState({})
  const [ok, setOk] = useState(false)

  const ch = ev => {
    setF({ ...f, [ev.target.name]: ev.target.value })
    setE({ ...e, [ev.target.name]: '' })
  }

  const submit = () => {
    const errs = {}
    if (!f.fname)          errs.fname = 'Enter first name'
    if (!f.lname)          errs.lname = 'Enter last name'
    if (!isEmail(f.email)) errs.email = 'Enter a valid email'
    if (!f.dest)           errs.dest  = 'Select a destination'
    if (!f.msg)            errs.msg   = 'Write a message'
    if (Object.keys(errs).length) { setE(errs); return }
    setOk(true)
  }

  return (
    <>
      {/* FAQ */}
      <section id="faq" className="faq-section" style={{ paddingTop: '100px' }}>
        <div className="section-head">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know before booking</p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={i}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q} <span>{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && <p className="faq-a">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section" style={{ minHeight: '100vh' }}>
        <div className="section-head">
          <h2>Contact Us</h2>
          <p>Get in touch and we'll plan your perfect trip</p>
        </div>
        <div className="contact-wrapper">
          <div className="contact-info">
            <p>We respond within 24 hours. Reach out with any questions about your upcoming trip!</p>
            <p>📍 42 Explorer Street, Mumbai</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ hello@globaltour.in</p>
            <p>🕐 Mon – Sat, 9am – 7pm IST</p>
          </div>

          <div className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input name="fname" value={f.fname} onChange={ch} placeholder="Arjun" className={e.fname ? 'err' : ''} />
                {e.fname && <div className="err-msg">{e.fname}</div>}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input name="lname" value={f.lname} onChange={ch} placeholder="Sharma" className={e.lname ? 'err' : ''} />
                {e.lname && <div className="err-msg">{e.lname}</div>}
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={f.email} onChange={ch} placeholder="arjun@email.com" className={e.email ? 'err' : ''} />
              {e.email && <div className="err-msg">{e.email}</div>}
            </div>
            <div className="form-group">
              <label>Destination</label>
              <select name="dest" value={f.dest} onChange={ch} className={e.dest ? 'err' : ''}>
                <option value="">Select destination…</option>
                {DESTS.map(d => <option key={d} value={d}> {d} </option>)}
              </select>
              {e.dest && <div className="err-msg">{e.dest}</div>}
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="msg" value={f.msg} onChange={ch} placeholder="Your travel dates, group size…" className={e.msg ? 'err' : ''} />
              {e.msg && <div className="err-msg">{e.msg}</div>}
            </div>
            <button className="submit-btn" onClick={submit}>Send Message</button>
            {ok && <div className="success-msg">✔ Message sent! We'll get back to you soon.</div>}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalData && <Modal data={modalData} onClose={() => setModalData(null)} />}
    </>
  )
}