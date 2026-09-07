import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Code2, Briefcase, Map, FileText,
  Bot, Users, ChevronLeft, ChevronRight, LogOut, Settings, User,
  Zap
} from 'lucide-react';

const NAV_GROUPS = [
  {
    label: 'MAIN',
    links: [
      { path: '/dashboard', label: 'Dashboard',  icon: LayoutDashboard },
      { path: '/courses',   label: 'Courses',    icon: BookOpen },
      { path: '/practice',  label: 'Practice',   icon: Code2 },
    ],
  },
  {
    label: 'PLACEMENT',
    links: [
      { path: '/companies', label: 'Companies',      icon: Briefcase },
      { path: '/roadmaps',  label: 'Roadmaps',       icon: Map },
      { path: '/resume',    label: 'Resume Builder',  icon: FileText },
    ],
  },
  {
    label: 'COMMUNITY',
    links: [
      { path: '/ai-mentor',  label: 'AI Mentor',  icon: Bot },
      { path: '/community',  label: 'Community',  icon: Users },
    ],
  },
];

const Sidebar = ({ isCollapsed, setMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen z-[100] flex flex-col
        bg-white dark:bg-slate-900
        border-r border-gray-100 dark:border-slate-800
        shadow-[4px_0_20px_rgba(0,0,0,0.04)]
        transition-all duration-300 ease-in-out overflow-hidden
        ${isCollapsed ? 'w-[72px]' : 'w-[260px]'}
      `}
      id="main-sidebar"
    >
      {/* ── Brand ── */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-100 dark:border-slate-800 flex-shrink-0">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center shadow-teal flex-shrink-0">
          <Zap size={18} className="text-white" strokeWidth={2.5} />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="font-display font-bold text-lg text-slate-900 dark:text-white whitespace-nowrap"
            >
              LearnHub
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-6 scrollbar-thin">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-slate-600 px-3 mb-2 uppercase"
                >
                  {group.label}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-0.5">
              {group.links.map(({ path, label, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen && setMobileOpen(false)}
                  className={({ isActive }) => `
                    relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                    text-sm font-medium transition-all duration-150
                    group
                    ${isActive
                      ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-semibold'
                      : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400'}
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                  title={isCollapsed ? label : undefined}
                >
                  {({ isActive }) => (
                    <>
                      {/* Active left bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-teal-600 dark:bg-teal-400 rounded-r-full" />
                      )}
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2.5 : 1.75}
                        className={`flex-shrink-0 transition-colors duration-150 ${
                          isActive ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400 dark:text-slate-500 group-hover:text-teal-500'
                        }`}
                      />
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.18 }}
                            className="whitespace-nowrap"
                          >
                            {label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── User card ── */}
      {user && (
        <div className={`border-t border-gray-100 dark:border-slate-800 p-3 flex-shrink-0 ${isCollapsed ? 'flex justify-center' : ''}`}>
          {isCollapsed ? (
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold cursor-pointer"
              title={user.name}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-400 dark:text-slate-500 truncate">{user.role || 'Student'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="Logout"
              >
                <LogOut size={15} strokeWidth={1.75} />
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
