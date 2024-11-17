'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
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

  // Countdown Timer Logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date('2024-12-07T23:59:59');
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60)
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const correctPassword = 'SailingVirgins2024';

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
        
        {/* Countdown Timer */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Campaign Timer</h2>
          <div className="text-2xl font-bold text-blue-600">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m remaining
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Daily target: {((20 - salesData.currentSales) / (timeLeft.days || 1)).toFixed(1)} sales
          </div>
        </div>
        
        {/* Sales Update */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Update Sales</h2>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={salesData.currentSales}
              onChange={(e) => setSalesData({
                ...salesData,
                currentSales: parseInt(e.target.value) || 0
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
                          leads: parseInt(e.target.value) || 0
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
                          conversions: parseInt(e.target.value) || 0
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