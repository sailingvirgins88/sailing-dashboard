'use client';

import { useState, useEffect } from 'react';
import { DashboardData, initialData } from '@/types/dashboard';
import { kv } from '@vercel/kv';
import { Calendar, Target, TrendingUp, Youtube, Instagram, Mail, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function CampaignDashboard() {
  const [data, setData] = useState<DashboardData>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await kv.get<DashboardData>('dashboardData') || initialData;
        setData(dashboardData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const daysLeft = 20 - data.currentSales;
  const dailyTarget = daysLeft > 0 ? ((20 - data.currentSales) / daysLeft).toFixed(1) : '0';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Dashboard</h1>
          <p className="text-gray-500">Track your campaign performance and metrics</p>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 rounded-lg p-2">
                <Calendar className="text-blue-500 h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-400">Campaign Progress</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-bold text-gray-900">{daysLeft}</h2>
              <span className="text-gray-500">days left</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-green-50 rounded-lg p-2">
                <Target className="text-green-500 h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-400">Sales Progress</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-bold text-gray-900">{data.currentSales}</h2>
              <span className="text-gray-500">/ 20 sales</span>
            </div>
            <div className="mt-4 bg-gray-100 rounded-full h-1.5">
              <div 
                className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(data.currentSales / 20) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-purple-50 rounded-lg p-2">
                <TrendingUp className="text-purple-500 h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-400">Daily Target</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-bold text-gray-900">{dailyTarget}</h2>
              <span className="text-gray-500">sales/day</span>
            </div>
          </div>
        </div>

        {/* Channel Performance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">Channel Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* YouTube */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Youtube className="text-red-500 h-5 w-5" />
                  <span className="font-medium">YouTube</span>
                </div>
                {data.channels.youtube.conversions > 0 && (
                  <div className="flex items-center gap-1 text-green-500 text-sm">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>Active</span>
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500 text-sm">Leads</span>
                  <span className="font-semibold">{data.channels.youtube.leads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Conversions</span>
                  <span className="font-semibold">{data.channels.youtube.conversions}</span>
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Instagram className="text-pink-500 h-5 w-5" />
                  <span className="font-medium">Instagram</span>
                </div>
                {data.channels.instagram.conversions > 0 && (
                  <div className="flex items-center gap-1 text-green-500 text-sm">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>Active</span>
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500 text-sm">Leads</span>
                  <span className="font-semibold">{data.channels.instagram.leads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Conversions</span>
                  <span className="font-semibold">{data.channels.instagram.conversions}</span>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-500 h-5 w-5" />
                  <span className="font-medium">Email</span>
                </div>
                {data.channels.email.conversions > 0 && (
                  <div className="flex items-center gap-1 text-green-500 text-sm">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>Active</span>
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500 text-sm">Leads</span>
                  <span className="font-semibold">{data.channels.email.leads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Conversions</span>
                  <span className="font-semibold">{data.channels.email.conversions}</span>
                </div>
              </div>
            </div>

            {/* PPC */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DollarSign className="text-green-500 h-5 w-5" />
                  <span className="font-medium">PPC</span>
                </div>
                {data.channels.ppc.conversions > 0 && (
                  <div className="flex items-center gap-1 text-green-500 text-sm">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>Active</span>
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500 text-sm">Leads</span>
                  <span className="font-semibold">{data.channels.ppc.leads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Conversions</span>
                  <span className="font-semibold">{data.channels.ppc.conversions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Rates */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">Conversion Rates</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {Object.entries(data.channels).map(([channel, metrics]) => {
              const rate = metrics.leads ? ((metrics.conversions / metrics.leads) * 100).toFixed(1) : '0';
              return (
                <div key={channel} className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
                  <span className="text-gray-500 text-sm mb-2 capitalize">{channel}</span>
                  <span className="text-3xl font-bold text-gray-900">{rate}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}