import React from 'react';
import { LayoutDashboard, LineChart, Info, Settings, Wind, Menu } from 'lucide-react';

const Sidebar = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'analysis', icon: LineChart, label: 'Analytics' },
    { id: 'about', icon: Info, label: 'About' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
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
            onClick={() => onTabChange(item.id)}
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
            <span style={{ color: '#fff' }}>Local Server Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
