'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [dashboardData, setDashboardData] = useState({
    currentSales: 0,
    channels: {
      youtube: { leads: 0, conversions: 0 },
      instagram: { leads: 0, conversions: 0 },
      email: { leads: 0, conversions: 0 },
      ppc: { leads: 0, conversions: 0 }
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Entered password:', password);
    console.log('Password length:', password.length);
    console.log('Password comparison:', password === 'sv2024');
    
    if (password === 'sv2024') {
      setIsAuthenticated(true);
    } else {
      alert(`Incorrect password. You entered: ${password}`);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dashboardData)
      });

      if (response.ok) {
        alert('Dashboard updated successfully!');
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Error updating dashboard:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
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
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Dashboard</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Current Sales (0-20)</label>
              <input
                type="number"
                min="0"
                max="20"
                value={dashboardData.currentSales}
                onChange={(e) => setDashboardData({
                  ...dashboardData,
                  currentSales: Math.min(20, Math.max(0, parseInt(e.target.value) || 0))
                })}
                className="p-3 border border-gray-300 rounded-lg w-32"
              />
            </div>

            {Object.entries(dashboardData.channels).map(([channel, metrics]) => (
              <div key={channel} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold capitalize mb-3 text-gray-800">{channel}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Leads</label>
                    <input
                      type="number"
                      min="0"
                      value={metrics.leads}
                      onChange={(e) => setDashboardData({
                        ...dashboardData,
                        channels: {
                          ...dashboardData.channels,
                          [channel]: { ...metrics, leads: parseInt(e.target.value) || 0 }
                        }
                      })}
                      className="p-3 border border-gray-300 rounded-lg w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Conversions</label>
                    <input
                      type="number"
                      min="0"
                      value={metrics.conversions}
                      onChange={(e) => setDashboardData({
                        ...dashboardData,
                        channels: {
                          ...dashboardData.channels,
                          [channel]: { ...metrics, conversions: parseInt(e.target.value) || 0 }
                        }
                      })}
                      className="p-3 border border-gray-300 rounded-lg w-full"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={handleSave}
              className="w-full p-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}