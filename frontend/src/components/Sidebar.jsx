import React, { useState } from 'react';
import { LayoutDashboard, LineChart, Info, Wind, Menu, X } from 'lucide-react';

const Sidebar = ({ activeTab, onTabChange, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'analysis', icon: LineChart, label: 'Analytics' },
    { id: 'about', icon: Info, label: 'About' }
  ];

  const handleLogoClick = () => {
    setView('landing');
    setIsMenuOpen(false);
  };

  const handleTabClick = (id) => {
    onTabChange(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-logo" onClick={handleLogoClick} style={{ cursor: 'var(--cursor-pointer)' }}>
          <div className="logo-icon">
            <Wind color="white" size={24} />
          </div>
          <span className="logo-text">ClimateDS</span>
        </div>

        <nav className="nav-links">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleTabClick(item.id)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="glass-card" style={{ padding: '1rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
            <p style={{ color: 'var(--text-dim)' }}>System Status</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
              <span style={{ color: '#fff' }}>Cloud Infrastructure Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </>
  );
};

export default Sidebar;
