import React, { useState } from 'react'

export default function Dashboard({ user }) {
  const [nestedPath, setNestedPath] = useState('profile')

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '40px', minHeight: '100vh', maxWidth: '900px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <h2 style={{ color: '#093f48' }}>🔒 Secure Traveler Dashboard</h2>
      <p>Welcome back, <strong>{user?.username}</strong>!</p>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* Dynamic Nested Sidebar Tabs */}
        <div style={{ width: '200px', background: '#e0fdf4', padding: '15px', borderRadius: '10px', height: 'fit-content' }}>
          <a onClick={() => setNestedPath('profile')} style={{ display: 'block', marginBottom: '10px', cursor: 'pointer', color: '#093f48', fontWeight: nestedPath === 'profile' ? '800' : '400', textDecoration: 'none' }}>👤 My Profile</a>
          <a onClick={() => setNestedPath('settings')} style={{ display: 'block', cursor: 'pointer', color: '#093f48', fontWeight: nestedPath === 'settings' ? '800' : '400', textDecoration: 'none' }}>⚙️ App Settings</a>
        </div>

        {/* Nested Routing Content Subpanel Output container placeholder */}
        <div style={{ flex: 1, padding: '20px', background: '#fff', border: '1px solid #cce8e0', borderRadius: '10px' }}>
          {nestedPath === 'profile' && (
            <div>
              <h3>User Profile Account Data</h3>
              <p style={{ marginTop: '10px' }}><strong>Username Identifier:</strong> {user?.username}</p>
              <p><strong>Account Tier:</strong> Premium Global Explorer Status</p>
            </div>
          )}
          
          {nestedPath === 'settings' && (
            <div>
              <h3>Account Configurations</h3>
              <p style={{ marginTop: '10px' }}>
                <label><input type="checkbox" defaultChecked /> Enable instant email booking tracking updates</label>
              </p>
              <p>
                <label><input type="checkbox" defaultChecked /> SMS alerts for dynamic package price changes</label>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}