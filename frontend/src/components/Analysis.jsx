import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const Analysis = () => {
  const radarData = [
    { subject: 'Temp', A: 120, fullMark: 150 },
    { subject: 'Humidity', A: 98, fullMark: 150 },
    { subject: 'Rainfall', A: 86, fullMark: 150 },
    { subject: 'Wind', A: 99, fullMark: 150 },
    { subject: 'Pressure', A: 85, fullMark: 150 },
  ];

  return (
    <div className="dashboard-container">
      <header>
        <h1>Statistical Insights</h1>
        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Detailed breakdown of environmental variables and distribution patterns.</p>
      </header>

      <div className="dashboard-grid">
        <div className="glass-card" style={{ gridColumn: '1 / -1' }}>
          <h3 className="chart-title">Relative Variable Distribution</h3>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="var(--text-dim)" />
                <PolarRadiusAxis stroke="rgba(255,255,255,0.1)" />
                <Radar name="Climate Data" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
