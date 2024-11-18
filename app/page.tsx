'use client';

import { Calendar, Target, TrendingUp } from 'lucide-react';
import './styles.css';

export default function CampaignDashboard() {
  return (
    <div style={{ padding: '1.5rem', maxWidth: '72rem', margin: '0 auto' }}>
      {/* Main Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '1.5rem' 
      }}>
        <div className="metric-card blue">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>Campaign Days Left</p>
              <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>20</h2>
            </div>
            <Calendar className="metric-icon blue" />
          </div>
        </div>
        
        <div className="metric-card green">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>Sales</p>
              <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>0/20</h2>
            </div>
            <Target className="metric-icon green" />
          </div>
        </div>
        
        <div className="metric-card purple">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>Daily Target</p>
              <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>1.0</h2>
            </div>
            <TrendingUp className="metric-icon purple" />
          </div>
        </div>
      </div>
    </div>
  );
}