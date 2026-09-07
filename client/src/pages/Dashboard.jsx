import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  Zap, BookOpen, Mic, FileCheck,
  CheckCircle2, ArrowRight, Play, ChevronLeft,
  ChevronRight, Trophy, Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_DATA } from '../data/mockData';

/* ─────────────────────────────────────────────────────────────
   ANIMATED COUNT-UP HOOK
───────────────────────────────────────────────────────────── */
function useCountUp(target, duration = 1200, start = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─────────────────────────────────────────────────────────────
   SKELETON CARD
───────────────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-card animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-800" />
      <div className="flex-1">
        <div className="h-7 w-20 bg-gray-100 dark:bg-slate-800 rounded-lg mb-2" />
        <div className="h-3 w-28 bg-gray-100 dark:bg-slate-800 rounded" />
      </div>
    </div>
    <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full" />
  </div>
);

/* ─────────────────────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, value, suffix = '', label, sublabel, color, bgColor, barColor, progress, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const displayCount = useCountUp(value, 1000, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-default group"
    >
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: bgColor }}
        >
          <Icon size={22} strokeWidth={2} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-[2rem] font-bold text-slate-900 dark:text-white leading-none font-display tabular-nums">
              {displayCount}
            </span>
            {suffix && (
              <span className="text-lg font-semibold text-slate-400 dark:text-slate-500">{suffix}</span>
            )}
          </div>
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mt-1">{label}</p>
        </div>
      </div>

      {/* Mini progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-gray-400 dark:text-slate-500">
          <span>{sublabel}</span>
          <span style={{ color }}>{progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: barColor || color }}
            initial={{ width: 0 }}
            animate={{ width: visible ? `${progress}%` : 0 }}
            transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CUSTOM TOOLTIP for recharts
───────────────────────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.stroke }} className="font-medium">
          {p.name}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CONFETTI BURST (simple CSS)
───────────────────────────────────────────────────────────── */
const ConfettiBurst = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-sm"
        style={{
          left: `${Math.random() * 100}%`,
          top: '50%',
          backgroundColor: ['#0D9488', '#14B8A6', '#F59E0B', '#3B82F6', '#10B981'][i % 5],
        }}
        initial={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
        animate={{
          y: [0, -(40 + Math.random() * 60)],
          x: [(Math.random() - 0.5) * 60],
          opacity: [1, 1, 0],
          scale: [1, 0.8, 0],
          rotate: [0, Math.random() * 360],
        }}
        transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
      />
    ))}
  </div>
);

/* ─────────────────────────────────────────────────────────────
   COURSE CATEGORY COLORS
───────────────────────────────────────────────────────────── */
const COURSE_COLORS = {
  'DSA':        { bg: '#F0FDFA', text: '#0D9488', dot: '#0D9488' },
  'Web Dev':    { bg: '#EFF6FF', text: '#3B82F6', dot: '#3B82F6' },
  'Sys Design': { bg: '#F5F3FF', text: '#8B5CF6', dot: '#8B5CF6' },
  'DevOps':     { bg: '#FFFBEB', text: '#F59E0B', dot: '#F59E0B' },
  'AI/ML':      { bg: '#FFF1F2', text: '#F43F5E', dot: '#F43F5E' },
};

/* ─────────────────────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────────────────────── */
const Dashboard = () => {
  const { user } = useAuth();
  const data = MOCK_DATA;

  // Chart period toggle
  const [period, setPeriod] = useState('week');
  const chartData = period === 'week'
    ? data.weeklyActivity
    : period === 'month' ? data.monthlyActivity : data.yearlyActivity;

  // Tasks state
  const [tasks, setTasks] = useState(data.tasks);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevAllDone = useRef(false);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  useEffect(() => {
    const allDone = tasks.every(t => t.completed);
    if (allDone && !prevAllDone.current) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }
    prevAllDone.current = allDone;
  }, [tasks]);

  // Donut chart data
  const pieData = [
    { name: 'Easy',   value: data.problems.easy.solved,   color: '#10B981' },
    { name: 'Medium', value: data.problems.medium.solved, color: '#F59E0B' },
    { name: 'Hard',   value: data.problems.hard.solved,   color: '#EF4444' },
  ];
  const totalSolved = pieData.reduce((a, b) => a + b.value, 0);

  // Generate heatmap data (90 cells = ~3 months)
  const heatmapData = React.useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 89; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      // Simulate activity: recent days more active
      let level = Math.floor(Math.random() * 3);
      if (i < 14) level = Math.max(level, 1);
      if (i < 7)  level = Math.max(level, 2);
      if (i === 0) level = 4;
      const count = level === 0 ? 0 : level * 3 + Math.floor(Math.random() * 5);
      days.push({ level, date: dateStr, count });
    }
    return days;
  }, []);

  // Continue learning carousel
  const carouselRef = useRef(null);
  const scrollCarousel = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
    }
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const taskPercent = Math.round((completedTasks / tasks.length) * 100);

  return (
    <div className="pb-12 space-y-6">

      {/* ── 1. Hero Welcome Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0D9488 0%, #0891B2 55%, #0284C7 100%)' }}
      >
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translateY(40%)' }} />

        <div className="relative z-10 px-6 sm:px-8 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">👋</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Welcome back, {user?.name?.split(' ')[0] || 'Student'}!
              </h1>
            </div>
            <p className="text-teal-100 text-sm sm:text-base mt-1 max-w-md">
              You're on a <strong className="text-white">12-day streak</strong> — keep the momentum going! 🔥
              <br className="hidden sm:block" />
              <span className="text-teal-200 text-xs mt-0.5 block sm:inline sm:ml-2">
                3 tasks left today · 70 problems solved this month
              </span>
            </p>
          </div>

          {/* Right — Glass stat chips */}
          <div className="flex gap-3 flex-shrink-0">
            <div className="px-5 py-4 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.13)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.22)' }}>
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <Flame size={18} className="text-orange-300" strokeWidth={2} />
                <span className="text-2xl font-bold text-white font-display">{data.user.streak}</span>
              </div>
              <p className="text-[11px] font-semibold text-teal-200 uppercase tracking-wider">Day Streak</p>
            </div>
            <div className="hidden sm:block px-5 py-4 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.13)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.22)' }}>
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <Trophy size={18} className="text-yellow-300" strokeWidth={2} />
                <span className="text-2xl font-bold text-white font-display">
                  #{data.user.rank?.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-teal-200 uppercase tracking-wider">Global Rank</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 2. Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Zap}
          value={data.user.dsaProgress}
          suffix="%"
          label="DSA Progress"
          sublabel="Keep solving!"
          color="#0D9488"
          bgColor="rgba(13,148,136,0.10)"
          progress={data.user.dsaProgress}
          delay={0.05}
        />
        <StatCard
          icon={BookOpen}
          value={data.user.courseProgress}
          suffix="%"
          label="Course Progress"
          sublabel="3 courses enrolled"
          color="#3B82F6"
          bgColor="rgba(59,130,246,0.10)"
          progress={data.user.courseProgress}
          delay={0.10}
        />
        <StatCard
          icon={Mic}
          value={data.user.mockScore * 10}
          suffix="%"
          label="Mock Interview"
          sublabel="Top 5% globally"
          color="#8B5CF6"
          bgColor="rgba(139,92,246,0.10)"
          progress={data.user.mockScore * 10}
          delay={0.15}
        />
        <StatCard
          icon={FileCheck}
          value={data.user.resumeScore}
          suffix="%"
          label="ATS Resume Score"
          sublabel="Good standing"
          color="#F59E0B"
          bgColor="rgba(245,158,11,0.10)"
          progress={data.user.resumeScore}
          delay={0.20}
        />
      </div>

      {/* ── 3. Analytics Row — Area Chart + Donut ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">

        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Weekly Progress</h3>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Problems solved & hours studied</p>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 dark:bg-slate-800 rounded-xl p-1">
              {['week', 'month', 'year'].map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 capitalize ${
                    period === p
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-gray-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-4 text-xs">
            {[['#0D9488','Problems'], ['#3B82F6','Hours']].map(([c, lbl]) => (
              <span key={lbl} className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c }} />
                {lbl}
              </span>
            ))}
          </div>

          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gProblems" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0D9488" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#0D9488" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.16} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="day" stroke="#CBD5E1" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#CBD5E1" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="problems" name="Problems" stroke="#0D9488" strokeWidth={2.5} fill="url(#gProblems)" strokeLinejoin="round" dot={false} activeDot={{ r: 5, fill: '#0D9488', strokeWidth: 2, stroke: '#fff' }} />
                <Area type="monotone" dataKey="hours" name="Hours" stroke="#3B82F6" strokeWidth={2.5} fill="url(#gHours)" strokeLinejoin="round" dot={false} activeDot={{ r: 5, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-card flex flex-col"
        >
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Problems Solved</h3>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Difficulty breakdown</p>
          </div>

          <div className="relative flex-1" style={{ minHeight: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%" cy="50%"
                  innerRadius={58} outerRadius={82}
                  paddingAngle={4} dataKey="value"
                  stroke="none"
                  startAngle={90} endAngle={-270}
                  animationBegin={400} animationDuration={900}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center total */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-900 dark:text-white font-display">{totalSolved}</span>
              <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">Solved</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 space-y-2.5">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-sm text-gray-500 dark:text-slate-400">{d.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(d.value / totalSolved) * 100}%`, backgroundColor: d.color }} />
                  </div>
                  <span className="text-sm font-bold w-6 text-right" style={{ color: d.color }}>{d.value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── 4. Daily Tasks ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-card relative overflow-hidden"
        >
          {showConfetti && <ConfettiBurst />}

          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Daily Tasks</h3>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Earn XP for completing tasks</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400">
              {completedTasks}/{tasks.length} done
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
                animate={{ width: `${taskPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <motion.button
                key={task.id}
                layout
                onClick={() => toggleTask(task.id)}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                  border transition-all duration-200 group
                  ${task.completed
                    ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800/30'
                    : 'bg-gray-50 dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-700 hover:bg-teal-50/40 dark:hover:bg-teal-900/10'
                  }
                `}
              >
                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200
                  ${task.completed ? 'bg-green-500' : 'border-2 border-gray-300 dark:border-slate-600 group-hover:border-teal-400'}`}>
                  {task.completed && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <CheckCircle2 size={14} strokeWidth={3} className="text-white" />
                    </motion.div>
                  )}
                </div>
                <span className={`flex-1 text-sm font-medium transition-all duration-200
                  ${task.completed ? 'line-through text-gray-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}`}>
                  {task.title}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0
                  ${task.completed ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'}`}>
                  +{task.points} XP
                </span>
              </motion.button>
            ))}
          </div>

          {tasks.every(t => t.completed) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 text-center py-3 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl border border-teal-100 dark:border-teal-800/30"
            >
              <span className="text-lg">🎉</span>
              <p className="text-sm font-bold text-teal-700 dark:text-teal-400 mt-0.5">All tasks done!</p>
              <p className="text-xs text-teal-500 dark:text-teal-500">+{tasks.reduce((a, t) => a + t.points, 0)} XP earned today</p>
            </motion.div>
          )}
        </motion.div>

      {/* ── 5. Continue Learning Carousel ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-card"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <Play size={16} strokeWidth={2} className="text-teal-600" />
              Continue Learning
            </h3>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Pick up where you left off</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scrollCarousel(-1)}
              className="p-2 rounded-xl border border-gray-100 dark:border-slate-700 text-gray-400 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-150"
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            <button
              onClick={() => scrollCarousel(1)}
              className="p-2 rounded-xl border border-gray-100 dark:border-slate-700 text-gray-400 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-150"
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data.continueLearning.map((course, idx) => {
            const colors = COURSE_COLORS[course.category] || COURSE_COLORS['DSA'];
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.08, duration: 0.4 }}
                className="flex-shrink-0 w-64 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Thumbnail */}
                <div
                  className="h-28 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${course.color}22, ${course.color}44)` }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: course.color }}
                  >
                    <BookOpen size={26} className="text-white" strokeWidth={1.75} />
                  </div>
                  {/* Category badge */}
                  <span
                    className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {course.category}
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1 mb-0.5">{course.title}</p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mb-3">{course.instructor}</p>

                  {/* Progress bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400 dark:text-slate-500">Progress</span>
                      <span className="font-semibold" style={{ color: course.color }}>{course.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${course.progress}%`, backgroundColor: course.color }}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/courses/${course.id}`}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-150 active:scale-95"
                    style={{ backgroundColor: course.color }}
                  >
                    <Play size={13} strokeWidth={2.5} />
                    Resume
                  </Link>
                </div>
              </motion.div>
            );
          })}

          {/* View all card */}
          <Link
            to="/courses"
            className="flex-shrink-0 w-52 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 hover:border-teal-400 hover:bg-teal-50/30 dark:hover:bg-teal-900/10 transition-all duration-200 group min-h-[220px]"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
              <ArrowRight size={18} className="text-gray-400 group-hover:text-teal-600 transition-colors" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold text-gray-400 dark:text-slate-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              View all courses
            </span>
          </Link>
        </div>
      </motion.div>

    </div>
  );
};

export default Dashboard;
