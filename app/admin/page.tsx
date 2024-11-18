'use client';

import { useState, useEffect } from 'react';
import { DashboardData, initialData } from '@/types/dashboard';
import { kv } from '@vercel/kv';
import { Lock, Save, Youtube, Instagram, Mail, DollarSign, RefreshCw } from 'lucide-react';

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
      const data = await kv.get<DashboardData>('dashboardData') || initialData;
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await kv.set('dashboardData', dashboardData);
      alert('Dashboard data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sv2024') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
    setPassword(''); // Clear password after attempt
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Lock className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button 
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Controls</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Sales Progress */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Sales</h2>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="0"
            max="20"
            value={dashboardData.currentSales}
            onChange={(e) => setDashboardData({
              ...dashboardData,
              currentSales: parseInt(e.target.value) || 0
            })}
            className="w-32 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-gray-500">/ 20 total sales target</span>
        </div>
      </div>

      {/* Channel Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* YouTube */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Youtube className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">YouTube</h2>
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
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Instagram */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Instagram className="h-6 w-6 text-pink-500" />
            <h2 className="text-xl font-semibold text-gray-800">Instagram</h2>
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
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800">Email</h2>
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
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* PPC */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-6 w-6 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-800">PPC</h2>
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
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}