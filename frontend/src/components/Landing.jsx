import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Landing = ({ onStart }) => {
  return (
    <div className="landing-container">
      <div className="landing-bg"></div>
      
      <div className="hero-content">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '0.75rem 1.5rem', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size={18} color="#22d3ee" />
            <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#22d3ee' }}>Advanced Climate Analytics</span>
          </div>
        </div>
        
        <h1 className="hero-title">
          The Future of <br />
          Meteorological Data
        </h1>
        
        <p className="hero-subtitle">
          Unleash the power of real-time environmental intelligence. 
          Analyze complex weather patterns with precision and clarity.
        </p>
        
        <button className="cta-button" onClick={onStart}>
          Begin Journey <ArrowRight size={20} />
        </button>
      </div>

      {/* Decorative Floating Cards */}
      <div className="glass-card" style={{ position: 'absolute', top: '15%', left: '10%', transform: 'rotate(-10deg)', opacity: '0.6', pointerEvents: 'none' }}>
        <div style={{ width: '120px', height: '60px', borderRadius: '8px', background: 'linear-gradient(90deg, var(--primary), transparent)' }}></div>
      </div>
      <div className="glass-card" style={{ position: 'absolute', bottom: '15%', right: '10%', transform: 'rotate(15deg)', opacity: '0.6', pointerEvents: 'none' }}>
        <div style={{ width: '150px', height: '80px', borderRadius: '8px', background: 'linear-gradient(90deg, var(--secondary), transparent)' }}></div>
      </div>
    </div>
  );
};

export default Landing;
