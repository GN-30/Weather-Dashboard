import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'
import Sidebar from './components/Sidebar'
import DynamicBackground from './components/DynamicBackground'
import './index.css'

function App() {
  const [view, setView] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');

  if (view === 'landing') {
    return (
      <div className="App">
        <Landing onStart={() => setView('dashboard')} />
      </div>
    );
  }

  return (
    <div className="app-layout">
      <DynamicBackground />
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'dashboard' ? (
          <Dashboard />
        ) : (
          <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
              <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h2>
              <p style={{ color: 'var(--text-dim)' }}>This feature is currently under development to ensure the highest quality experience.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
