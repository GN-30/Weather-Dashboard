import React from 'react';

const About = () => {
  return (
    <div className="dashboard-container">
      <header>
        <h1>About ClimateDS</h1>
        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Pioneering the future of climate intelligence.</p>
      </header>

      <div className="glass-card" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Our Mission</h3>
        <p style={{ color: '#fff', marginBottom: '2rem' }}>
          ClimateDS was built to bridge the gap between raw meteorological data and actionable human intelligence. 
          By combining advanced data processing with modern visual aesthetics, we empower individuals and 
          organizations to understand the world around them with unprecedented clarity.
        </p>

        <h3 style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>Core Technologies</h3>
        <ul style={{ color: 'var(--text-dim)', listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '1rem' }}>• <strong>Backend:</strong> Python / Flask Engine</li>
          <li style={{ marginBottom: '1rem' }}>• <strong>Data Layer:</strong> Pandas Analytics</li>
          <li style={{ marginBottom: '1rem' }}>• <strong>Frontend:</strong> React / Vite Visualizer</li>
          <li style={{ marginBottom: '1rem' }}>• <strong>Visuals:</strong> Custom HTML5 Canvas / Recharts</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
