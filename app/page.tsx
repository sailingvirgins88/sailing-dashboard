'use client';

import { useState } from 'react';
import { Calendar, Target, Users, DollarSign, TrendingUp, Youtube, Instagram, Mail } from 'lucide-react';

export default function CampaignDashboard() {
  const [daysLeft] = useState(20);
  const [salesTarget] = useState(20);
  const [currentSales] = useState(0);
  
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Campaign Days Left</p>
                <h2 className="text-3xl font-bold text-gray-900">{daysLeft}</h2>
              </div>
              <Calendar className="text-blue-500 h-8 w-8" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Sales</p>
                <h2 className="text-3xl font-bold text-gray-900">{currentSales}/{salesTarget}</h2>
              </div>
              <Target className="text-green-500 h-8 w-8" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Daily Target</p>
                <h2 className="text-3xl font-bold text-gray-900">{((salesTarget - currentSales) / daysLeft).toFixed(1)}</h2>
              </div>
              <TrendingUp className="text-purple-500 h-8 w-8" />
            </div>
          </div>
        </div>

        {/* Channel Performance */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Channel Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">YouTube</p>
                  <p className="text-lg font-semibold">0 leads</p>
                </div>
                <Youtube className="text-red-500 h-6 w-6" />
              </div>
              <p className="text-xs text-gray-500 mt-2">0 conversions</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Instagram</p>
                  <p className="text-lg font-semibold">0 leads</p>
                </div>
                <Instagram className="text-pink-500 h-6 w-6" />
              </div>
              <p className="text-xs text-gray-500 mt-2">0 conversions</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-semibold">0 leads</p>
                </div>
                <Mail className="text-blue-500 h-6 w-6" />
              </div>
              <p className="text-xs text-gray-500 mt-2">0 conversions</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">PPC</p>
                  <p className="text-lg font-semibold">0 leads</p>
                </div>
                <DollarSign className="text-green-500 h-6 w-6" />
              </div>
              <p className="text-xs text-gray-500 mt-2">0 conversions</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <Users className="text-gray-400 h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">New Lead</p>
                  <p className="text-xs text-gray-500">via Instagram</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">2m ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-3">
                <Mail className="text-gray-400 h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Email Opened</p>
                  <p className="text-xs text-gray-500">Campaign: Winter Escape</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">5m ago</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}