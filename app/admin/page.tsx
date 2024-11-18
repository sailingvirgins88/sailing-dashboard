'use client';

import { useState, useEffect } from 'react';
import { Lock, Save, Youtube, Instagram, Mail, Users } from 'lucide-react';
import './styles.css';

type DashboardData = {
  currentSales: number;
  channels: {
    instagram: {
      stories: number;
      posts: number;
      reels: number;
      comments: number;
    };
    youtube: {
      episodes: number;
      comments: number;
    };
    email: {
      contacted: number;
      responses: number;
    };
  };
  pipeline: {
    leads: number;
    conversations: number;
    proposals: number;
    closed: number;
  };
};

const initialData: DashboardData = {
  currentSales: 0,
  channels: {
    instagram: { stories: 0, posts: 0, reels: 0, comments: 0 },
    youtube: { episodes: 0, comments: 0 },
    email: { contacted: 0, responses: 0 }
  },
  pipeline: {
    leads: 0,
    conversations: 0,
    proposals: 0,
    closed: 0
  }
};

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
      // Ensure we have all required properties
      setDashboardData({
        currentSales: data?.currentSales ?? 0,
        channels: {
          instagram: {
            stories: data?.channels?.instagram?.stories ?? 0,
            posts: data?.channels?.instagram?.posts ?? 0,
            reels: data?.channels?.instagram?.reels ?? 0,
            comments: data?.channels?.instagram?.comments ?? 0
          },
          youtube: {
            episodes: data?.channels?.youtube?.episodes ?? 0,
            comments: data?.channels?.youtube?.comments ?? 0
          },
          email: {
            contacted: data?.channels?.email?.contacted ?? 0,
            responses: data?.channels?.email?.responses ?? 0
          }
        },
        pipeline: {
          leads: data?.pipeline?.leads ?? 0,
          conversations: data?.pipeline?.conversations ?? 0,
          proposals: data?.pipeline?.proposals ?? 0,
          closed: data?.pipeline?.closed ?? 0
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setDashboardData(initialData);
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
      <div className="login-container">
        <div className="login-card">
          <Lock className="login-icon" />
          <h2 className="login-title">Dashboard Controls</h2>
          <p className="login-subtitle">Enter password to continue</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Enter password"
            />
            <button type="submit" className="login-button">
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>Dashboard Controls</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="save-button"
        >
          <Save className="channel-icon" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Sales Progress */}
      <div className="admin-section">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Sales Progress</h2>
        <div className="input-group">
          <label className="input-label">Current Sales (out of 20)</label>
          <input
            type="number"
            min="0"
            max="20"
            value={dashboardData.currentSales}
            onChange={(e) => setDashboardData({
              ...dashboardData,
              currentSales: parseInt(e.target.value) || 0
            })}
            className="admin-input"
          />
        </div>
      </div>

      {/* Channel Metrics */}
      <div className="admin-section">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Channel Activity</h2>
        <div className="admin-grid channels-grid">
          {/* Instagram */}
          <div className="channel-card instagram">
            <div className="channel-header">
              <Instagram className="channel-icon instagram" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Instagram</h3>
            </div>
            <div className="input-group">
              <label className="input-label">Stories Posted</label>
              <input
                type="number"
                min="0"
                value={dashboardData.channels.instagram.stories}
                onChange={(e) => setDashboardData({
                  ...dashboardData,
                  channels: {
                    ...dashboardData.channels,
                    instagram: {
                      ...dashboardData.channels.instagram,
                      stories: parseInt(e.target.value) || 0
                    }
                  }
                })}
                className="admin-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Posts Created</label>
              <input
                type="number"
                min="0"
                value={dashboardData.channels.instagram.posts}
                onChange={(e) => setDashboardData({
                  ...dashboardData,
                  channels: {
                    ...dashboardData.channels,
                    instagram: {
                      ...dashboardData.channels.instagram,
                      posts: parseInt(e.target.value) || 0
                    }
                  }
                })}
                className="admin-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Reels Published</label>
              <input
                type="number"
                min="0"
                value={dashboardData.channels.instagram.reels}
                onChange={(e) => setDashboardData({
                  ...dashboardData,
                  channels: {
                    ...dashboardData.channels,
                    instagram: {
                      ...dashboardData.channels.instagram,
                      reels: parseInt(e.target.value) || 0
                    }
                  }
                })}
                className="admin-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Comments Replied</label>
              <input
                type="number"
                min="0"
                value={dashboardData.channels.instagram.comments}
                onChange={(e) => setDashboardData({
                  ...dashboardData,
                  channels: {
                    ...dashboardData.channels,
                    instagram: {
                      ...dashboardData.channels.instagram,
                      comments: parseInt(e.target.value) || 0
                    }
                  }
                })}
                className="admin-input"
              />
            </div>
          </div>

          {/* YouTube */}
          <div className="channel-card youtube">
            <div className="channel-header">
              <Youtube className="channel-icon youtube" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>YouTube</h3>
            </div>
            <div className="input-group">
              <label className="input-label">Episodes Published</label>
              <input
                type="number"
                min="0"
                value={dashboardData.channels.youtube.episodes}
                onChange={(e) => setDashboardData({
                  ...dashboardData,
                  channels: {
                    ...dashboardData.channels,
                    youtube: {
                      ...dashboardData.channels.youtube,
                      episodes: parseInt(e.target.value) || 0
                    }
                  }
                })}
                className="admin-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Comments Replied</label>
              <input
                type="number"
                min="0"
                value={dashboardData.channels.youtube.comments}
                onChange={(e) => setDashboardData({
                  ...dashboardData,
                  channels: {
                    ...dashboardData.channels,
                    youtube: {
                      ...dashboardData.channels.youtube,
                      comments: parseInt(e.target.value) || 0
                    }
                  }
                })}
                className="admin-input"
              />
            </div>
          </div>

          {/* Email */}
          <div className="channel-card email">
            <div className="channel-header">
              <Mail className="channel-icon email" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Email</h3>
            </div>
            <div className="input-group">
              <label className="input-label">People Contacted</label>
              <input
                type="number"
                min="0"
                value={dashboardData.channels.email.contacted}
                onChange={(e) => setDashboardData({
                  ...dashboardData,
                  channels: {
                    ...dashboardData.channels,
                    email: {
                      ...dashboardData.channels.email,
                      contacted: parseInt(e.target.value) || 0
                    }
                  }
                })}
                className="admin-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Responses Received</label>
              <input
                type="number"
                min="0"
                value={dashboardData.channels.email.responses}
                onChange={(e) => setDashboardData({
                  ...dashboardData,
                  channels: {
                    ...dashboardData.channels,
                    email: {
                      ...dashboardData.channels.email,
                      responses: parseInt(e.target.value) || 0
                    }
                  }
                })}
                className="admin-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sales Pipeline */}
      <div className="admin-section">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Sales Pipeline</h2>
        <div className="admin-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="input-group">
            <label className="input-label">New Leads</label>
            <input
              type="number"
              min="0"
              value={dashboardData.pipeline.leads}
              onChange={(e) => setDashboardData({
                ...dashboardData,
                pipeline: {
                  ...dashboardData.pipeline,
                  leads: parseInt(e.target.value) || 0
                }
              })}
              className="admin-input"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Active Conversations</label>
            <input
              type="number"
              min="0"
              value={dashboardData.pipeline.conversations}
              onChange={(e) => setDashboardData({
                ...dashboardData,
                pipeline: {
                  ...dashboardData.pipeline,
                  conversations: parseInt(e.target.value) || 0
                }
              })}
              className="admin-input"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Proposals Sent</label>
            <input
              type="number"
              min="0"
              value={dashboardData.pipeline.proposals}
              onChange={(e) => setDashboardData({
                ...dashboardData,
                pipeline: {
                  ...dashboardData.pipeline,
                  proposals: parseInt(e.target.value) || 0
                }
              })}
              className="admin-input"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Sales Closed</label>
            <input
              type="number"
              min="0"
              value={dashboardData.pipeline.closed}
              onChange={(e) => setDashboardData({
                ...dashboardData,
                pipeline: {
                  ...dashboardData.pipeline,
                  closed: parseInt(e.target.value) || 0
                }
              })}
              className="admin-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}