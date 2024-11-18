'use client';

import { useState, useEffect } from 'react';
import { DashboardData, initialData } from '@/types/dashboard';
import { kv } from '@vercel/kv';
import { Calendar, Target, TrendingUp, Youtube, Instagram, Mail, DollarSign } from 'lucide-react';

export default function Dashboard() {
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
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const daysLeft = 20 - data.currentSales;
  const dailyTarget = daysLeft > 0 ? ((20 - data.currentSales) / daysLeft).toFixed(1) : '0';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">Campaign Dashboard</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Days Remaining</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold text-gray-900">{daysLeft}</h3>
              <span className="text-gray-600">days</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Sales Progress</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold text-gray-900">{data.currentSales}</h3>
              <span className="text-gray-600">/ 20 sales</span>
            </div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${(data.currentSales / 20) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Daily Target</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold text-gray-900">{dailyTarget}</h3>
              <span className="text-gray-600">sales/day</span>
            </div>
          </div>
        </div>

        {/* Channel Performance */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Channel Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ChannelCard
              icon={<Youtube className="h-5 w-5 text-red-500" />}
              name="YouTube"
              data={data.channels.youtube}
            />
            <ChannelCard
              icon={<Instagram className="h-5 w-5 text-pink-500" />}
              name="Instagram"
              data={data.channels.instagram}
            />
            <ChannelCard
              icon={<Mail className="h-5 w-5 text-blue-500" />}
              name="Email"
              data={data.channels.email}
            />
            <ChannelCard
              icon={<DollarSign className="h-5 w-5 text-green-500" />}
              name="PPC"
              data={data.channels.ppc}
            />
          </div>
        </div>

        {/* Conversion Rates */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Conversion Rates</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Object.entries(data.channels).map(([channel, metrics]) => {
              const rate = metrics.leads ? ((metrics.conversions / metrics.leads) * 100).toFixed(1) : '0';
              return (
                <div key={channel} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-1 capitalize">{channel}</p>
                  <p className="text-2xl font-bold text-gray-900">{rate}%</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

function ChannelCard({ icon, name, data }: { 
  icon: React.ReactNode; 
  name: string; 
  data: { leads: number; conversions: number; }; 
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        {icon}
        <h3 className="font-medium text-gray-900">{name}</h3>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Leads</span>
          <span className="font-medium text-gray-900">{data.leads}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Conversions</span>
          <span className="font-medium text-gray-900">{data.conversions}</span>
        </div>
      </div>
    </div>
  );
}