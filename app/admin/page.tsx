'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [salesData, setSalesData] = useState({
    currentSales: 0,
    channels: {
      youtube: { leads: 0, conversions: 0 },
      instagram: { leads: 0, conversions: 0 },
      email: { leads: 0, conversions: 0 },
      ppc: { leads: 0, conversions: 0 }
    },
    recentActivity: []
  });

  const correctPassword = 'SailingVirgins2024'; // We'll move this to env variables later

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter password"
          />
          <button
            onClick={handleLogin}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>
        
        {/* Sales Update */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Update Sales</h2>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={salesData.currentSales}
              onChange={(e) => setSalesData({
                ...salesData,
                currentSales: parseInt(e.target.value)
              })}
              className="p-2 border rounded"
            />
            <span className="text-gray-500">/ 20 total sales</span>
          </div>
        </div>

        {/* Channel Updates */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Channel Performance</h2>
          {Object.entries(salesData.channels).map(([channel, data]) => (
            <div key={channel} className="mb-4">
              <h3 className="capitalize mb-2">{channel}</h3>
              <div className="flex gap-4">
                <div>
                  <label className="text-sm text-gray-500">Leads</label>
                  <input
                    type="number"
                    value={data.leads}
                    onChange={(e) => setSalesData({
                      ...salesData,
                      channels: {
                        ...salesData.channels,
                        [channel]: {
                          ...data,
                          leads: parseInt(e.target.value)
                        }
                      }
                    })}
                    className="p-2 border rounded block w-24"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Conversions</label>
                  <input
                    type="number"
                    value={data.conversions}
                    onChange={(e) => setSalesData({
                      ...salesData,
                      channels: {
                        ...salesData.channels,
                        [channel]: {
                          ...data,
                          conversions: parseInt(e.target.value)
                        }
                      }
                    })}
                    className="p-2 border rounded block w-24"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={() => {
            // Save data (we'll implement this next)
            alert('Changes saved!');
          }}
          className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}