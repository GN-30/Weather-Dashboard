import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'
import Sidebar from './components/Sidebar'
import DynamicBackground from './components/DynamicBackground'
import Analysis from './components/Analysis'
import About from './components/About'
import Settings from './components/Settings'
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
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'analysis' && <Analysis />}
        {activeTab === 'about' && <About />}
        {activeTab === 'settings' && <Settings />}
      </main>
    </div>
  )
}

export default App
