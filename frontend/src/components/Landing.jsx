import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Landing = ({ onStart }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isLightning, setIsLightning] = useState(false);
  const [boltPos, setBoltPos] = useState({ left: '50%' });

  useEffect(() => {
    const triggerLightning = () => {
      setBoltPos({ left: `${Math.random() * 80 + 10}%` });
      setIsLightning(true);
      setTimeout(() => setIsLightning(false), 150);
      
      // Randomly chain a second bolt
      if (Math.random() > 0.6) {
        setTimeout(() => {
          setBoltPos({ left: `${Math.random() * 80 + 10}%` });
          setIsLightning(true);
          setTimeout(() => setIsLightning(false), 100);
        }, 300);
      }
      
      const nextStrike = Math.random() * 8000 + 4000;
      setTimeout(triggerLightning, nextStrike);
    };

    const initialTimeout = setTimeout(triggerLightning, 5000);
    return () => clearTimeout(initialTimeout);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="landing-container" onMouseMove={handleMouseMove}>
      <div className={`lightning-flash ${isLightning ? 'active' : ''}`}></div>
      {isLightning && (
        <svg className="lightning-bolt" style={{ left: boltPos.left }} viewBox="0 0 100 600">
          <path d={`M 50 0 L ${40 + Math.random() * 20} 100 L ${60 + Math.random() * 20} 200 L ${30 + Math.random() * 20} 350 L ${70 + Math.random() * 20} 500 L 50 600`} fill="none" stroke="#fff" strokeWidth="4" filter="url(#glow)" />
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      )}
      <div className="landing-bg"></div>
      <div className="aurora-container">
        <div className="aurora-beam beam-1"></div>
        <div className="aurora-beam beam-2"></div>
        <div className="aurora-beam beam-3"></div>
      </div>
      <div 
        className="lighting-spotlight" 
        style={{ 
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.08) 0%, transparent 60%)` 
        }}
      ></div>
      
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
          Initialize Climate Analytics <ArrowRight size={20} />
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
