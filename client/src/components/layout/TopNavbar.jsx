import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, Bell, Settings, LogOut, User, ChevronDown, Command } from 'lucide-react';

const TopNavbar = ({ isSidebarCollapsed, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ⌘K shortcut to focus search
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarWidth = isSidebarCollapsed ? 72 : 260;

  return (
    <header
      className="fixed top-0 right-0 h-16 z-[200] flex items-center justify-between px-4 md:px-6 transition-all duration-300"
      style={{ left: sidebarWidth }}
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800" />

      {/* ── Left ── */}
      <div className="relative flex items-center gap-3 z-10">
        {/* Sidebar toggle */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-gray-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-150"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} strokeWidth={1.75} />
        </button>

        {/* Search */}
        <div className={`relative flex items-center transition-all duration-200 ${searchFocused ? 'w-72' : 'w-56'}`}>
          <Search
            size={15}
            strokeWidth={1.75}
            className="absolute left-3 text-gray-400 dark:text-slate-500 pointer-events-none"
          />
          <input
            id="global-search"
            type="text"
            placeholder="Search courses, problems..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="
              w-full pl-9 pr-16 py-2 text-sm rounded-xl
              bg-gray-50 dark:bg-slate-800
              border border-gray-200 dark:border-slate-700
              text-slate-900 dark:text-slate-100
              placeholder:text-gray-400 dark:placeholder:text-slate-500
              focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500
              transition-all duration-200
            "
          />
          <div className="absolute right-3 flex items-center gap-0.5">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded text-gray-400 dark:text-slate-400 shadow-sm">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* ── Right ── */}
      <div className="relative flex items-center gap-2 z-10">
        {/* Streak badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold shadow-sm select-none">
          🔥 <span>12</span>
          <span className="opacity-80 font-normal hidden md:inline">day streak</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-gray-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-150">
          <Bell size={19} strokeWidth={1.75} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-150 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <ChevronDown
              size={14}
              strokeWidth={2}
              className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="
                  absolute right-0 mt-2 w-52 origin-top-right
                  bg-white dark:bg-slate-900 rounded-2xl
                  border border-gray-100 dark:border-slate-800
                  shadow-lg dark:shadow-slate-900/50
                  overflow-hidden z-50
                "
              >
                {/* User info header */}
                <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 truncate">{user?.email || 'student@learnhub.io'}</p>
                </div>

                <div className="p-1.5">
                  <button
                    onClick={() => { setIsDropdownOpen(false); navigate('/profile'); }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-teal-600 transition-all"
                  >
                    <User size={15} strokeWidth={1.75} /> Profile
                  </button>
                  <button
                    onClick={() => { setIsDropdownOpen(false); navigate('/settings'); }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-teal-600 transition-all"
                  >
                    <Settings size={15} strokeWidth={1.75} /> Settings
                  </button>
                </div>

                <div className="p-1.5 border-t border-gray-100 dark:border-slate-800">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    <LogOut size={15} strokeWidth={1.75} /> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
