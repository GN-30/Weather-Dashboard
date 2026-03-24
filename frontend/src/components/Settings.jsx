import React from 'react';

const Settings = () => {
  return (
    <div className="dashboard-container">
      <header>
        <h1>Preferences</h1>
        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Tailor your dashboard experience.</p>
      </header>

      <div className="dashboard-grid">
        <div className="glass-card">
          <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>Visual Effects</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Rainfall Animation</span>
              <div style={{ width: '40px', height: '20px', background: 'var(--primary)', borderRadius: '10px' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Water Ripples</span>
              <div style={{ width: '40px', height: '20px', background: 'var(--primary)', borderRadius: '10px' }}></div>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>Data Management</h3>
          <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>Automatic refresh interval:</p>
          <select style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', color: '#fff', borderRadius: '8px' }}>
            <option>Every 5 Minutes</option>
            <option>Every 1 Hour</option>
            <option>Manual Refresh Only</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
