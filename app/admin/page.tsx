'use client';

import { useState, useEffect } from 'react';
import { DashboardData, initialData } from '@/types/dashboard';
import { kv } from '@vercel/kv';
import { Lock, Save, Youtube, Instagram, Mail, DollarSign, RefreshCw, ArrowRight } from 'lucide-react';

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
      const response = await fetch('/api/kv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dashboardData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.success) {
        alert('Dashboard data saved successfully!');
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Save error:', error);
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
      alert('Invalid password');
    }
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-50 rounded-xl p-3">
                <Lock className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Admin Access</h2>
            <p className="text-center text-gray-500 mb-8">Enter your password to continue</p>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Controls</h1>
            <p className="text-gray-500">Update campaign metrics and performance data</p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Changes
              </>
            )}
          </button>
        </div>

        {/* Sales Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Sales</h2>
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
              className="w-32 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <span className="text-gray-500">out of 20 total sales target</span>
          </div>
        </div>

        {/* Channel Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* YouTube */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-red-50 rounded-lg p-2">
                <Youtube className="h-5 w-5 text-red-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">YouTube</h2>
            </div>
            <div className="space-y-6">
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
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-pink-50 rounded-lg p-2">
                <Instagram className="h-5 w-5 text-pink-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Instagram</h2>
            </div>
            <div className="space-y-6">
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
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-50 rounded-lg p-2">
                <Mail className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Email</h2>
            </div>
            <div className="space-y-6">
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
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* PPC */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-green-50 rounded-lg p-2">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">PPC</h2>
            </div>
            <div className="space-y-6">
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
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}