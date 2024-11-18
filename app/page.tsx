'use client';

import { useState, useEffect } from 'react';
import { Calendar, Target, Users, DollarSign, TrendingUp, Youtube, Instagram, Mail, MessageCircle, Send } from 'lucide-react';
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
  campaignStartDate: string;
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
  },
  campaignStartDate: new Date().toISOString()
};

export default function CampaignDashboard() {
  const [data, setData] = useState<DashboardData>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/kv');
        if (!response.ok) throw new Error('Failed to fetch');
        const dashboardData = await response.json();
        setData({
          currentSales: dashboardData?.currentSales ?? 0,
          channels: {
            instagram: {
              stories: dashboardData?.channels?.instagram?.stories ?? 0,
              posts: dashboardData?.channels?.instagram?.posts ?? 0,
              reels: dashboardData?.channels?.instagram?.reels ?? 0,
              comments: dashboardData?.channels?.instagram?.comments ?? 0
            },
            youtube: {
              episodes: dashboardData?.channels?.youtube?.episodes ?? 0,
              comments: dashboardData?.channels?.youtube?.comments ?? 0
            },
            email: {
              contacted: dashboardData?.channels?.email?.contacted ?? 0,
              responses: dashboardData?.channels?.email?.responses ?? 0
            }
          },
          pipeline: {
            leads: dashboardData?.pipeline?.leads ?? 0,
            conversations: dashboardData?.pipeline?.conversations ?? 0,
            proposals: dashboardData?.pipeline?.proposals ?? 0,
            closed: dashboardData?.pipeline?.closed ?? 0
          },
          campaignStartDate: dashboardData?.campaignStartDate ?? new Date().toISOString()
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(initialData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const calculateDaysLeft = () => {
    const startDate = new Date(data.campaignStartDate);
    const today = new Date();
    const campaignLength = 20; // 20 days total
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysLeft = Math.max(0, campaignLength - daysPassed);
    return daysLeft;
  };

  const daysLeft = calculateDaysLeft();
  const salesTarget = 20;
  const dailyTarget = ((salesTarget - data.currentSales) / daysLeft).toFixed(1);
  const progressPercentage = (data.currentSales / salesTarget) * 100;

  return (
    <div className="dashboard-container">
      {/* Main Metrics */}
      <div className="grid-container metrics-grid">
        <div className="metric-card blue">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p className="stat-label">Campaign Days Left</p>
              <h2 className="stat-value">{daysLeft}</h2>
            </div>
            <Calendar className="metric-icon blue" />
          </div>
        </div>
        
        <div className="metric-card green">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p className="stat-label">Sales Progress</p>
              <h2 className="stat-value">{data.currentSales}/{salesTarget}</h2>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }} />
              </div>
            </div>
            <Target className="metric-icon green" />
          </div>
        </div>
        
        <div className="metric-card purple">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p className="stat-label">Daily Target</p>
              <h2 className="stat-value">{dailyTarget}</h2>
              <p className="stat-subtext">sales needed per day</p>
            </div>
            <TrendingUp className="metric-icon purple" />
          </div>
        </div>
      </div>

      {/* Channel Activity */}
      <div className="section-card">
        <h2 className="section-title">Today&apos;s Channel Activity</h2>
        <div className="grid-container channels-grid">
          <div className="metric-card pink">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Instagram</h3>
              <Instagram className="metric-icon pink" />
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="stat-label">Stories</span>
                <span>{data.channels.instagram.stories}/5</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="stat-label">Posts</span>
                <span>{data.channels.instagram.posts}/2</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="stat-label">Reels</span>
                <span>{data.channels.instagram.reels}/1</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="stat-label">Comments</span>
                <span>{data.channels.instagram.comments}/30</span>
              </div>
            </div>
          </div>

          <div className="metric-card red">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>YouTube</h3>
              <Youtube className="metric-icon red" />
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="stat-label">Episodes</span>
                <span>{data.channels.youtube.episodes}/1</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="stat-label">Comments</span>
                <span>{data.channels.youtube.comments}/20</span>
              </div>
            </div>
          </div>

          <div className="metric-card blue">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Email</h3>
              <Mail className="metric-icon blue" />
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="stat-label">Contacted</span>
                <span>{data.channels.email.contacted}/100</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="stat-label">Responses</span>
                <span>{data.channels.email.responses}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Pipeline */}
      <div className="section-card">
        <h2 className="section-title">Sales Pipeline</h2>
        <div className="grid-container pipeline-grid">
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <Users className="metric-icon blue" style={{ margin: '0 auto 0.5rem' }} />
            <div className="stat-value" style={{ fontSize: '1.5rem' }}>{data.pipeline.leads}</div>
            <div className="stat-label">New Leads</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <MessageCircle className="metric-icon purple" style={{ margin: '0 auto 0.5rem' }} />
            <div className="stat-value" style={{ fontSize: '1.5rem' }}>{data.pipeline.conversations}</div>
            <div className="stat-label">In Conversation</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <Send className="metric-icon pink" style={{ margin: '0 auto 0.5rem' }} />
            <div className="stat-value" style={{ fontSize: '1.5rem' }}>{data.pipeline.proposals}</div>
            <div className="stat-label">Proposals Sent</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <Target className="metric-icon green" style={{ margin: '0 auto 0.5rem' }} />
            <div className="stat-value" style={{ fontSize: '1.5rem' }}>{data.pipeline.closed}</div>
            <div className="stat-label">Sales Closed</div>
          </div>
        </div>
      </div>
    </div>
  );
}