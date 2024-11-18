'use client';

import { Calendar, Target, TrendingUp } from 'lucide-react';

export default function CampaignDashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm font-medium">Campaign Days Left</p>
              <h2 className="text-3xl font-bold text-gray-900">20</h2>
            </div>
            <Calendar className="text-blue-500 h-8 w-8" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm font-medium">Sales</p>
              <h2 className="text-3xl font-bold text-gray-900">0/20</h2>
            </div>
            <Target className="text-green-500 h-8 w-8" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm font-medium">Daily Target</p>
              <h2 className="text-3xl font-bold text-gray-900">1.0</h2>
            </div>
            <TrendingUp className="text-purple-500 h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}