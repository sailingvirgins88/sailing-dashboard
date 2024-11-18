'use client';

import { useState, useEffect } from 'react';
import { Calendar, Target, TrendingUp, Youtube, Instagram, Mail, DollarSign } from 'lucide-react';

const initialData = {
  currentSales: 0,
  channels: {
    youtube: { leads: 0, conversions: 0 },
    instagram: { leads: 0, conversions: 0 },
    email: { leads: 0, conversions: 0 },
    ppc: { leads: 0, conversions: 0 }
  }
};

export default function Dashboard() {
  const [data, setData] = useState(initialData);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/kv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: '#f0f2f5', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <StatCard 
            title="Days Left" 
            value={20 - data.currentSales} 
            icon={<Calendar size={24} color="#2563eb" />}
            borderColor="#2563eb"
          />
          <StatCard 
            title="Sales" 
            value={`${data.currentSales}/20`} 
            icon={<Target size={24} color="#16a34a" />}
            borderColor="#16a34a"
          />
          <StatCard 
            title="Daily Target" 
            value={((20 - data.currentSales) / Math.max(1, 20 - data.currentSales)).toFixed(1)} 
            icon={<TrendingUp size={24} color="#9333ea" />}
            borderColor="#9333ea"
          />
        </div>

        {/* Channel Stats */}
        <div style={{ 
          background: 'white', 
          borderRadius: '0.5rem', 
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1rem' 
          }}>
            Channel Performance
          </h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <ChannelCard 
              name="YouTube" 
              data={data.channels.youtube}
              icon={<Youtube size={20} color="#ef4444" />}
            />
            <ChannelCard 
              name="Instagram" 
              data={data.channels.instagram}
              icon={<Instagram size={20} color="#ec4899" />}
            />
            <ChannelCard 
              name="Email" 
              data={data.channels.email}
              icon={<Mail size={20} color="#3b82f6" />}
            />
            <ChannelCard 
              name="PPC" 
              data={data.channels.ppc}
              icon={<DollarSign size={20} color="#22c55e" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, borderColor }) {
  return (
    <div style={{ 
      background: 'white',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      borderLeft: `4px solid ${borderColor}`,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{title}</p>
          <h3 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>{value}</h3>
        </div>
        {icon}
      </div>
    </div>
  );
}

function ChannelCard({ name, data, icon }) {
  return (
    <div style={{ 
      background: '#f9fafb',
      borderRadius: '0.5rem',
      padding: '1rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{name}</p>
          <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>{data.leads} leads</p>
        </div>
        {icon}
      </div>
      <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>{data.conversions} conversions</p>
    </div>
  );
}