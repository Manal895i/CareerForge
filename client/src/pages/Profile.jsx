import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import { useAuth } from '../context/AuthContext';
import { MOCK_DATA } from '../data/mockData';
import { FiUser, FiMail, FiBriefcase, FiCalendar, FiAward, FiBookOpen, FiCode } from 'react-icons/fi';

const Profile = () => {
  const { user } = useAuth();
  const data = MOCK_DATA;

  return (
    <div className="pb-12 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-text-muted">Manage your personal info and track placement readiness.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <GlassCard className="md:col-span-1 flex flex-col items-center text-center p-6">
          <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-white text-3xl shadow-lg mb-4">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{user?.name || 'Student Name'}</h2>
          <p className="text-xs bg-surface-3 px-3 py-1 rounded-full text-accent-primary font-semibold mb-4 uppercase tracking-wider">
            {user?.role || 'Aspirant'}
          </p>
          
          <div className="w-full space-y-4 text-left border-t border-glass-border pt-4 mt-2">
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <FiMail className="text-accent-primary shrink-0" />
              <span className="truncate">{user?.email || 'student@learnhub.com'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <FiBriefcase className="text-accent-primary shrink-0" />
              <span>Target: SDE 1</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <FiCalendar className="text-accent-primary shrink-0" />
              <span>Graduation: 2026</span>
            </div>
          </div>
        </GlassCard>

        {/* Preparation Stats & Highlights */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <GlassCard className="text-center p-4">
              <FiCode className="text-2xl text-accent-primary mx-auto mb-2" />
              <div className="text-2xl font-black text-white">{data.user.dsaProgress}%</div>
              <div className="text-xs text-text-muted mt-1">DSA Rank</div>
            </GlassCard>
            <GlassCard className="text-center p-4">
              <FiBookOpen className="text-2xl text-accent-secondary mx-auto mb-2" />
              <div className="text-2xl font-black text-white">{data.user.courseProgress}%</div>
              <div className="text-xs text-text-muted mt-1">Courses Done</div>
            </GlassCard>
            <GlassCard className="text-center p-4">
              <FiAward className="text-2xl text-color-success mx-auto mb-2" />
              <div className="text-2xl font-black text-white">{data.user.mockScore}/10</div>
              <div className="text-xs text-text-muted mt-1">Mock Interview</div>
            </GlassCard>
          </div>

          {/* Placement Goals */}
          <GlassCard>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              🎯 Placement Targets & Goals
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1 text-text-secondary">
                  <span>Target Company Match (Amazon)</span>
                  <span className="font-bold text-white">78%</span>
                </div>
                <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1 text-text-secondary">
                  <span>Target Company Match (Google)</span>
                  <span className="font-bold text-white">65%</span>
                </div>
                <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1 text-text-secondary">
                  <span>Resume (ATS Score)</span>
                  <span className="font-bold text-white">85%</span>
                </div>
                <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Recent Achievements */}
          <GlassCard>
            <h3 className="font-bold text-white mb-3">🏆 Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-surface-2 rounded-lg border border-glass-border flex items-center gap-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <div className="font-bold text-sm text-white">Streak Master</div>
                  <div className="text-xs text-text-muted">12 Days Active Prep</div>
                </div>
              </div>
              <div className="p-3 bg-surface-2 rounded-lg border border-glass-border flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <div className="font-bold text-sm text-white">Problem Solver</div>
                  <div className="text-xs text-text-muted">Solved 10+ Hard Problems</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
