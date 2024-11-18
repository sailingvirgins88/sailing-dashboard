'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const CORRECT_PASSWORD = 'sv2024';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Login attempt:');
    console.log('Entered password:', password);
    console.log('Expected password:', CORRECT_PASSWORD);
    console.log('Password length:', password.length);
    console.log('Expected length:', CORRECT_PASSWORD.length);
    console.log('Exact match?:', password === CORRECT_PASSWORD);
    
    const trimmedPassword = password.trim();
    
    if (trimmedPassword === CORRECT_PASSWORD) {
      console.log('SUCCESS: Password correct!');
      setIsAuthenticated(true);
    } else {
      console.log('FAIL: Password incorrect');
      alert(`Password incorrect. Please make sure you're using exactly: ${CORRECT_PASSWORD}`);
    }
    
    setIsLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h2>
          <p className="text-sm text-gray-600 mb-4">Password: sv2024</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter: sv2024"
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
              disabled={isLoading}
            />
            <button 
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      {/* Your admin dashboard content */}
    </div>
  );
}