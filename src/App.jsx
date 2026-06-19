import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Places from './components/Places'
import TourDetail from './components/TourDetail'
import { AboutView, ContactView } from './components/Sections'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'

export default function App() {
  const [modalData, setModalData] = useState(null)
  const [user, setUser] = useState(null) // Auth controller state

  // Route protection guard clause wrapper component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} setUser={setUser} />
        
        {/* Real URL Router Switchboard */}
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/explore" element={<Places onBook={setModalData} />} />
            
            {/* Dynamic URL Route Parameter matching tour ID and nested layouts */}
            <Route path="/explore/detail/:id" element={<TourDetail onBook={setModalData} />} />
            
            <Route path="/contact" element={<ContactView modalData={modalData} setModalData={setModalData} />} />
            
            <Route path="/login" element={<Login onLogin={(loggedInUser) => setUser(loggedInUser)} />} />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard user={user} />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback routing back to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}