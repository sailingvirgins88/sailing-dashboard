'use client';

import { useState, useEffect } from 'react';
import { Lock, Save, Youtube, Instagram, Mail, DollarSign } from 'lucide-react';

type DashboardData = {
  currentSales: number;
  channels: {
    youtube: { leads: number; conversions: number; };
    instagram: { leads: number; conversions: number; };
    email: { leads: number; conversions: number; };
    ppc: { leads: number; conversions: number; };
  };
};

const initialData: DashboardData = {
  currentSales: 0,
  channels: {
    youtube: { leads: 0, conversions: 0 },
    instagram: { leads: 0, conversions: 0 },
    email: { leads: 0, conversions: 0 },
    ppc: { leads: 0, conversions: 0 }
  }
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/kv');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setDashboardData(data || initialData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/kv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dashboardData)
      });
      
      if (!response.ok) throw new Error('Failed to save');
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sv2024') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-50 rounded-full p-3">
                <Lock className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Dashboard Controls</h2>
            <p className="text-center text-gray-500 mb-6">Enter password to continue</p>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                placeholder="Enter password"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Controls</h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-white
              ${isSaving ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            `}
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Current Sales */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Sales</h2>
          <input
            type="number"
            min="0"
            max="20"
            value={dashboardData.currentSales}
            onChange={(e) => setDashboardData({
              ...dashboardData,
              currentSales: parseInt(e.target.value) || 0
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Channel Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* YouTube */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Youtube className="h-6 w-6 text-red-500" />
              <h2 className="text-lg font-semibold text-gray-900">YouTube</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leads</label>
                <input
                  type="number"
                  min="0"
                  value={dashboardData.channels.youtube.leads}
                  onChange={(e) => setDashboardData({
                    ...dashboardData,
                    channels: {
                      ...dashboardData.channels,
                      youtube: {
                        ...dashboardData.channels.youtube,
                        leads: parseInt(e.target.value) || 0
                      }
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conversions</label>
                <input
                  type="number"
                  min="0"
                  value={dashboardData.channels.youtube.conversions}
                  onChange={(e) => setDashboardData({
                    ...dashboardData,
                    channels: {
                      ...dashboardData.channels,
                      youtube: {
                        ...dashboardData.channels.youtube,
                        conversions: parseInt(e.target.value) || 0
                      }
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Instagram className="h-6 w-6 text-pink-500" />
              <h2 className="text-lg font-semibold text-gray-900">Instagram</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leads</label>
                <input
                  type="number"
                  min="0"
                  value={dashboardData.channels.instagram.leads}
                  onChange={(e) => setDashboardData({
                    ...dashboardData,
                    channels: {
                      ...dashboardData.channels,
                      instagram: {
                        ...dashboardData.channels.instagram,
                        leads: parseInt(e.target.value) || 0
                      }
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conversions</label>
                <input
                  type="number"
                  min="0"
                  value={dashboardData.channels.instagram.conversions}
                  onChange={(e) => setDashboardData({
                    ...dashboardData,
                    channels: {
                      ...dashboardData.channels,
                      instagram: {
                        ...dashboardData.channels.instagram,
                        conversions: parseInt(e.target.value) || 0
                      }
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-6 w-6 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Email</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leads</label>
                <input
                  type="number"
                  min="0"
                  value={dashboardData.channels.email.leads}
                  onChange={(e) => setDashboardData({
                    ...dashboardData,
                    channels: {
                      ...dashboardData.channels,
                      email: {
                        ...dashboardData.channels.email,
                        leads: parseInt(e.target.value) || 0
                      }
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conversions</label>
                <input
                  type="number"
                  min="0"
                  value={dashboardData.channels.email.conversions}
                  onChange={(e) => setDashboardData({
                    ...dashboardData,
                    channels: {
                      ...dashboardData.channels,
                      email: {
                        ...dashboardData.channels.email,
                        conversions: parseInt(e.target.value) || 0
                      }
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* PPC */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="h-6 w-6 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-900">PPC</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leads</label>
                <input
                  type="number"
                  min="0"
                  value={dashboardData.channels.ppc.leads}
                  onChange={(e) => setDashboardData({
                    ...dashboardData,
                    channels: {
                      ...dashboardData.channels,
                      ppc: {
                        ...dashboardData.channels.ppc,
                        leads: parseInt(e.target.value) || 0
                      }
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conversions</label>
                <input
                  type="number"
                  min="0"
                  value={dashboardData.channels.ppc.conversions}
                  onChange={(e) => setDashboardData({
                    ...dashboardData,
                    channels: {
                      ...dashboardData.channels,
                      ppc: {
                        ...dashboardData.channels.ppc,
                        conversions: parseInt(e.target.value) || 0
                      }
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}