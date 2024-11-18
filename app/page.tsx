'use client';

import { useState, useEffect } from 'react';
import { DashboardData, initialData } from '@/types/dashboard';
import { kv } from '@vercel/kv';
import { ArrowUp, Youtube, Instagram, Target, Award } from 'lucide-react';

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
    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const daysLeft = 20 - data.currentSales;
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Sales Progress */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-4xl font-bold text-center mb-6">
            Sales Progress: {data.currentSales} / 20
          </h1>
          <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-green-500 transition-all duration-500"
              style={{ width: `${(data.currentSales / 20) * 100}%` }}
            />
          </div>
          <p className="text-center mt-4 text-xl font-semibold text-gray-600">
            {daysLeft} {daysLeft === 1 ? 'sale' : 'sales'} to go!
          </p>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* YouTube Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Youtube className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-bold">YouTube Performance</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">New Leads</p>
              <p className="text-3xl font-bold">{data.channels.youtube.leads}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Conversions</p>
              <p className="text-3xl font-bold">{data.channels.youtube.conversions}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Conversion Rate</span>
              <span className="font-bold">
                {data.channels.youtube.leads ? 
                  ((data.channels.youtube.conversions / data.channels.youtube.leads) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Instagram Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Instagram className="w-8 h-8 text-pink-600" />
            <h2 className="text-2xl font-bold">Instagram Performance</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">New Leads</p>
              <p className="text-3xl font-bold">{data.channels.instagram.leads}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Conversions</p>
              <p className="text-3xl font-bold">{data.channels.instagram.conversions}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Conversion Rate</span>
              <span className="font-bold">
                {data.channels.instagram.leads ? 
                  ((data.channels.instagram.conversions / data.channels.instagram.leads) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Goals Section */}
      <div className="mt-12 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Team Goals
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">YouTube Episodes</h3>
              <p className="text-2xl font-bold">2 / week</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Instagram Reels</h3>
              <p className="text-2xl font-bold">5 / week</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Stories/Posts</h3>
              <p className="text-2xl font-bold">Daily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}