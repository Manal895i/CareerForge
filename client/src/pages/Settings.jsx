import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { FiSettings, FiBell, FiShield, FiSliders, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('teal');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="pb-12 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-text-muted">Configure your placement workspace settings.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="md:col-span-1 space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent-primary text-white font-medium cursor-pointer">
            <FiSliders />
            <span>General Settings</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-surface-2 hover:text-white transition-all cursor-pointer" onClick={() => toast('Notification details coming soon!')}>
            <FiBell />
            <span>Notifications</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-surface-2 hover:text-white transition-all cursor-pointer" onClick={() => toast('Privacy settings coming soon!')}>
            <FiShield />
            <span>Privacy & Security</span>
          </div>
        </div>

        {/* Settings Forms */}
        <div className="md:col-span-2 space-y-6">
          <GlassCard>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2 border-b border-glass-border pb-3">
              <FiSettings className="text-accent-primary" /> Preferences
            </h3>

            <div className="space-y-6">
              {/* Theme Settings */}
              <div>
                <label className="form-label mb-2 block text-white">Interface Theme Color</label>
                <div className="flex gap-4">
                  <div 
                    onClick={() => setCurrentTheme('teal')}
                    className={`flex-1 flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      currentTheme === 'teal' ? 'border-accent-primary bg-surface-2 text-white' : 'border-glass-border bg-transparent text-text-secondary'
                    }`}
                  >
                    <span>Ocean Teal & Cyan (Active)</span>
                    {currentTheme === 'teal' && <FiCheck className="text-accent-primary" />}
                  </div>
                </div>
              </div>

              {/* Notification Toggles */}
              <div className="flex items-center justify-between border-t border-glass-border pt-4">
                <div>
                  <div className="font-bold text-white text-sm">Email Notifications</div>
                  <div className="text-xs text-text-secondary mt-0.5">Receive daily tasks, rank updates, and company news.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifications} 
                  onChange={(e) => setNotifications(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
              </div>

              {/* Profile Privacy Toggles */}
              <div className="flex items-center justify-between border-t border-glass-border pt-4">
                <div>
                  <div className="font-bold text-white text-sm">Public Profile Visibility</div>
                  <div className="text-xs text-text-secondary mt-0.5">Allow recruiters and other students to search for you.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={profileVisible} 
                  onChange={(e) => setProfileVisible(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2 border-b border-glass-border pb-3">
              🔑 Change Password
            </h3>
            
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-white">Current Password</label>
                <input type="password" placeholder="••••••••" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label text-white">New Password</label>
                <input type="password" placeholder="••••••••" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label text-white">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="form-input" />
              </div>
            </div>
          </GlassCard>

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Save Preferences
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
