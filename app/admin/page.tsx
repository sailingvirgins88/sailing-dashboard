'use client';

import { useState, useEffect } from 'react';
import { Lock, Save, Youtube, Instagram, Mail, DollarSign } from 'lucide-react';
import { DashboardData, initialData } from '@/types/dashboard';

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
          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500">
            <div className="flex justify-center mb-6">
              <Lock className="h-12 w-12 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Dashboard Controls</h2>
            <p className="text-center text-gray-500 mb-6">Enter password to continue</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
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
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Controls</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          <Save className="h-5 w-5" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Current Sales */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
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
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Channel Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* YouTube */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
          <div className="flex items-center gap-3 mb-6">
            <Youtube className="h-6 w-6 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900">YouTube</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Leads</label>
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
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Conversions</label>
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
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Instagram */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-pink-500">
          <div className="flex items-center gap-3 mb-6">
            <Instagram className="h-6 w-6 text-pink-500" />
            <h2 className="text-lg font-semibold text-gray-900">Instagram</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Leads</label>
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
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Conversions</label>
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
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="h-6 w-6 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Email</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Leads</label>
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
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Conversions</label>
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
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* PPC */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="h-6 w-6 text-green-500" />
            <h2 className="text-lg font-semibold text-gray-900">PPC</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Leads</label>
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
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Conversions</label>
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
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}