'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sv2024') {
      setIsAuthenticated(true);
    } else {
      alert('Wrong password - try sv2024');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-200">
          <h1 className="text-3xl font-bold text-red-500 mb-4">TEST CHANGE</h1>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Try: sv2024"
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
            />
            <button 
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
    </div>
  );
}