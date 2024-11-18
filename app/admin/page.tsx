// Admin page updated 2024
'use client';

import { useState, useEffect } from 'react';
import { DashboardData, initialData } from '@/types/dashboard';
import { kv } from '@vercel/kv';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialData);

  // Load current data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      const data = await kv.get<DashboardData>('dashboardData') || initialData;
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {
      await kv.set('dashboardData', dashboardData);
      alert('Dashboard data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sv2024') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button 
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Sales</h2>
        <input
          type="number"
          min="0"
          max="20"
          value={dashboardData.currentSales}
          onChange={(e) => setDashboardData({
            ...dashboardData,
            currentSales: parseInt(e.target.value) || 0
          })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-6">
        {Object.entries(dashboardData.channels).map(([channel, metrics]) => (
          <div key={channel} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 capitalize">{channel}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Leads</label>
                <input
                  type="number"
                  min="0"
                  value={metrics.leads}
                  onChange={(e) => setDashboardData({
                    ...dashboardData,
                    channels: {
                      ...dashboardData.channels,
                      [channel]: {
                        ...metrics,
                        leads: parseInt(e.target.value) || 0
                      }
                    }
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Conversions</label>
                <input
                  type="number"
                  min="0"
                  value={metrics.conversions}
                  onChange={(e) => setDashboardData({
                    ...dashboardData,
                    channels: {
                      ...dashboardData.channels,
                      [channel]: {
                        ...metrics,
                        conversions: parseInt(e.target.value) || 0
                      }
                    }
                  })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-8 w-full p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
      >
        Save Changes
      </button>
    </div>
  );
}