import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Thermometer, Droplets, CloudRain, Wind, TrendingUp, Calendar, ChevronDown } from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('all'); // 'all', 'temp', 'humidity', 'rainfall'
  const [timeScale, setTimeScale] = useState('daily'); // 'daily', 'weekly'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const scrollElements = document.querySelectorAll('.reveal-on-scroll');
    scrollElements.forEach(el => observer.observe(el));

    return () => scrollElements.forEach(el => observer.unobserve(el));
  }, [loading, selectedMetric, data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/weather');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <TrendingUp className="animate-pulse" size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ color: '#fff' }}>Synchronizing Intelligence...</h2>
          <p style={{ color: 'var(--text-dim)', marginTop: '0.5rem' }}>Optimizing data streams for your view.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="dashboard-container">
        <div className="glass-card">
          <h2 style={{ color: '#fff' }}>Data Connection Lost</h2>
          <p style={{ color: 'var(--text-dim)' }}>Ensure the backend server is active on port 5000.</p>
        </div>
      </div>
    );
  }

  const chartData = timeScale === 'daily' ? data.daily : data.weekly;
  const xAxisKey = timeScale === 'daily' ? 'date_str' : 'week_label';

  const renderMetricToggle = () => (
    <div className="tab-group">
      <button 
        className={`tab-btn ${selectedMetric === 'all' ? 'active' : ''}`}
        onClick={() => setSelectedMetric('all')}
      >
        All Overview
      </button>
      <button 
        className={`tab-btn ${selectedMetric === 'temp' ? 'active' : ''}`}
        onClick={() => setSelectedMetric('temp')}
      >
        Temperature
      </button>
      <button 
        className={`tab-btn ${selectedMetric === 'humidity' ? 'active' : ''}`}
        onClick={() => setSelectedMetric('humidity')}
      >
        Humidity
      </button>
      <button 
        className={`tab-btn ${selectedMetric === 'rainfall' ? 'active' : ''}`}
        onClick={() => setSelectedMetric('rainfall')}
      >
        Rainfall
      </button>
    </div>
  );

  const renderTimeScaleToggle = () => (
    <div className="custom-dropdown">
      <div className="dropdown-header" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={16} color="var(--primary)" />
          {timeScale === 'daily' ? 'Daily View' : 'Weekly Aggregation'}
        </span>
        <ChevronDown size={16} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' , transition: '0.3s' }} />
      </div>
      {isDropdownOpen && (
        <div className="dropdown-list">
          <div 
            className={`dropdown-item ${timeScale === 'daily' ? 'selected' : ''}`}
            onClick={() => { setTimeScale('daily'); setIsDropdownOpen(false); }}
          >
            Daily View
          </div>
          <div 
            className={`dropdown-item ${timeScale === 'weekly' ? 'selected' : ''}`}
            onClick={() => { setTimeScale('weekly'); setIsDropdownOpen(false); }}
          >
            Weekly Aggregation
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard-container">
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
          <TrendingUp size={16} />
          <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Insights Explorer</span>
        </div>
        <h1>Climate Analysis Dashboard</h1>
        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Precision monitoring and predictive trend analysis.</p>
      </header>

      {/* Controls Bar */}
      <div className="controls-bar">
        {renderMetricToggle()}
        {renderTimeScaleToggle()}
      </div>

      {/* Summary Stats */}
      <div className="stat-grid">
        <div className="glass-card stat-card reveal-on-scroll">
          <div className="stat-label"><Thermometer size={14} style={{ marginRight: '6px' }}/> Avg Temperature</div>
          <div className="stat-value">{data.summary.avg_temp}°C</div>
        </div>
        <div className="glass-card stat-card reveal-on-scroll" style={{ borderLeftColor: 'var(--secondary)' }}>
          <div className="stat-label"><Droplets size={14} style={{ marginRight: '6px' }}/> Avg Humidity</div>
          <div className="stat-value">{data.summary.avg_humidity}%</div>
        </div>
        <div className="glass-card stat-card reveal-on-scroll" style={{ borderLeftColor: 'var(--accent)' }}>
          <div className="stat-label"><CloudRain size={14} style={{ marginRight: '6px' }}/> Total Rainfall</div>
          <div className="stat-value">{data.summary.total_rainfall}mm</div>
        </div>
        <div className="glass-card stat-card reveal-on-scroll" style={{ borderLeftColor: '#f59e0b' }}>
          <div className="stat-label"><TrendingUp size={14} style={{ marginRight: '6px' }}/> Peak Reading</div>
          <div className="stat-value">{data.summary.max_temp}°C</div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Temperature Trend */}
        {(selectedMetric === 'all' || selectedMetric === 'temp') && (
          <div className="glass-card reveal-on-scroll" style={selectedMetric === 'temp' ? { gridColumn: '1 / -1' } : {}}>
            <div className="chart-header">
              <h3 className="chart-title">Temperature Variations</h3>
            </div>
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey={xAxisKey} stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="temperature" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Humidity Trend */}
        {(selectedMetric === 'all' || selectedMetric === 'humidity') && (
          <div className="glass-card reveal-on-scroll" style={selectedMetric === 'humidity' ? { gridColumn: '1 / -1' } : {}}>
            <div className="chart-header">
              <h3 className="chart-title">Saturation Levels</h3>
            </div>
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey={xAxisKey} stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                  />
                  <Line type="monotone" dataKey="humidity" stroke="#9333ea" strokeWidth={3} dot={{ fill: '#9333ea', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Rainfall Trend */}
        {(selectedMetric === 'all' || selectedMetric === 'rainfall') && (
          <div className="glass-card reveal-on-scroll" style={{ gridColumn: (selectedMetric === 'all' ? '1 / -1' : '1 / -1') }}>
            <div className="chart-header">
              <h3 className="chart-title">Atmospheric Precipitation</h3>
            </div>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey={xAxisKey} stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                  />
                  <Bar dataKey="rainfall" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Climate Distribution (Donut Chart) */}
        {selectedMetric === 'all' && (() => {
          const distribution = [
            { name: 'Warm (22°C+)', value: data.daily.filter(d => d.temperature >= 22).length, color: '#f59e0b' },
            { name: 'Moderate (18-22°C)', value: data.daily.filter(d => d.temperature >= 18 && d.temperature < 22).length, color: '#6366f1' },
            { name: 'Cool (<18°C)', value: data.daily.filter(d => d.temperature < 18).length, color: '#22d3ee' }
          ].filter(i => i.value > 0);

          return (
            <div className="glass-card donut-card reveal-on-scroll" style={{ gridColumn: '1 / -1' }}>
              <div className="chart-header" style={{ width: '100%' }}>
                <h3 className="chart-title">Ecological Temperature Spectrum</h3>
              </div>
              <div style={{ width: '100%', height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '50%', height: '100%' }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={distribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {distribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="donut-legend" style={{ width: '40%', gridTemplateColumns: '1fr' }}>
                  {distribution.map((item, idx) => (
                    <div key={idx} className="legend-item" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                      <div className="legend-color" style={{ backgroundColor: item.color, width: '12px', height: '12px' }}></div>
                      <span style={{ fontWeight: '600', color: '#fff' }}>{item.name}</span>
                      <span style={{ color: 'var(--text-dim)', marginLeft: 'auto' }}>{item.value} Days</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default Dashboard;
