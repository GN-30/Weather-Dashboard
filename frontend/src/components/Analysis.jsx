import React, { useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, ZAxis, Legend
} from 'recharts';
import { 
  TrendingDown, TrendingUp, Zap, Wind, 
  Activity, BarChart3, PieChart as PieChartIcon, 
  Globe, Info, AlertTriangle
} from 'lucide-react';

const Analysis = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });

    const scrollElements = document.querySelectorAll('.reveal-on-scroll');
    scrollElements.forEach(el => observer.observe(el));

    return () => scrollElements.forEach(el => observer.unobserve(el));
  }, []);

  const radarData = [
    { subject: 'Temp', A: 120, fullMark: 150 },
    { subject: 'Humidity', A: 98, fullMark: 150 },
    { subject: 'Rainfall', A: 86, fullMark: 150 },
    { subject: 'Wind', A: 99, fullMark: 150 },
    { subject: 'Pressure', A: 85, fullMark: 150 },
  ];

  const scatterData = [
    { x: 18, y: 70, z: 200 }, { x: 20, y: 65, z: 260 },
    { x: 22, y: 60, z: 400 }, { x: 25, y: 55, z: 280 },
    { x: 27, y: 50, z: 500 }, { x: 30, y: 45, z: 200 },
    { x: 32, y: 42, z: 300 }, { x: 28, y: 48, z: 450 },
  ];

  const trendData = [
    { time: '00:00', temp: 18, hum: 75 },
    { time: '04:00', temp: 16, hum: 80 },
    { time: '08:00', temp: 21, hum: 65 },
    { time: '12:00', temp: 28, hum: 45 },
    { time: '16:00', temp: 30, hum: 40 },
    { time: '20:00', temp: 24, hum: 55 },
    { time: '23:59', temp: 20, hum: 68 },
  ];

  return (
    <div className="dashboard-container">
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
          <Activity size={16} />
          <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Advanced Metrics</span>
        </div>
        <h1>Statistical Insights</h1>
        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Detailed breakdown of environmental variables and distribution patterns.</p>
      </header>

      {/* Insight Highlight Cards */}
      <div className="stat-grid" style={{ marginBottom: '2rem' }}>
        <div className="glass-card reveal-on-scroll" style={{ borderLeftColor: 'var(--accent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent)', marginBottom: '10px' }}>
            <Zap size={18} />
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Predictive Node</span>
          </div>
          <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '5px' }}>Rising Pressure</h4>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Atmospheric stability likely for next 48 hours.</p>
        </div>
        <div className="glass-card reveal-on-scroll" style={{ borderLeftColor: 'var(--secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)', marginBottom: '10px' }}>
            <Globe size={18} />
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Eco Index</span>
          </div>
          <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '5px' }}>Optimal AQI</h4>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Air quality remains within healthy parameters.</p>
        </div>
        <div className="glass-card reveal-on-scroll" style={{ borderLeftColor: '#f59e0b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f59e0b', marginBottom: '10px' }}>
            <AlertTriangle size={18} />
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Anomaly Detection</span>
          </div>
          <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '5px' }}>Voltage Spikes</h4>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Minor fluctuations detected in sensor matrix.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Radar Chart Variable Distribution */}
        <div className="glass-card reveal-on-scroll">
          <div className="chart-header">
            <h3 className="chart-title">Variable Correlation Matrix</h3>
            <PieChartIcon size={18} color="var(--primary)" />
          </div>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="subject" stroke="var(--text-dim)" fontSize={12} />
                <PolarRadiusAxis stroke="rgba(255,255,255,0.05)" />
                <Radar name="Climate" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scatter Plot Correlation */}
        <div className="glass-card reveal-on-scroll">
          <div className="chart-header">
            <h3 className="chart-title">Temp vs Humidity Clustering</h3>
            <BarChart3 size={18} color="var(--accent)" />
          </div>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" dataKey="x" name="Temp" unit="°C" stroke="var(--text-dim)" fontSize={12} />
                <YAxis type="number" dataKey="y" name="Humidity" unit="%" stroke="var(--text-dim)" fontSize={12} />
                <ZAxis type="number" dataKey="z" range={[60, 400]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Legend verticalAlign="top" height={36} />
                <Scatter name="Sensor Clusters" data={scatterData} fill="var(--accent)" fillOpacity={0.6} stroke="var(--accent)" strokeWidth={1} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparative Trend Area Chart */}
        <div className="glass-card reveal-on-scroll" style={{ gridColumn: '1 / -1' }}>
          <div className="chart-header">
            <h3 className="chart-title">Diurnal Environment Divergence</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)' }}></div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Thermal</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)' }}></div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Humidity</span>
                </div>
            </div>
          </div>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorTempAnal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHumAnal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="var(--text-dim)" fontSize={12} />
                <YAxis stroke="var(--text-dim)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', backdropFilter: 'blur(10px)' }} />
                <Area type="monotone" dataKey="temp" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorTempAnal)" />
                <Area type="monotone" dataKey="hum" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorHumAnal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
