import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiUsers, FiBookOpen, FiCode, FiMap } from 'react-icons/fi';

const stats = [
  { icon: <FiUsers />, value: 10000, suffix: '+', label: 'Active Students', desc: 'And growing every day' },
  { icon: <FiBookOpen />, value: 500, suffix: '+', label: 'Expert Courses', desc: 'Across all tech domains' },
  { icon: <FiCode />, value: 3000, suffix: '+', label: 'Coding Problems', desc: 'With editorial solutions' },
  { icon: <FiMap />, value: 100, suffix: '+', label: 'Career Roadmaps', desc: 'Curated by industry experts' },
];

const AnimatedCounter = ({ value, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(value / (duration * 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsBar = () => {
  return (
    <section style={{
      padding: '5rem 0',
      background: 'linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%)',
      borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem'
        }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                textAlign: 'center',
                padding: '1.5rem 1rem',
                borderRadius: 16,
                background: 'white',
                border: '1px solid #F3F4F6',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'all 0.3s'
              }}
              whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(13, 148, 136, 0.08)' }}
            >
              <div style={{
                width: 56, height: 56, margin: '0 auto 1rem',
                background: 'linear-gradient(135deg, #0D9488, #06B6D4)',
                borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', color: 'white',
                boxShadow: '0 8px 20px rgba(13, 148, 136, 0.25)'
              }}>
                {s.icon}
              </div>
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 800, color: '#1E1E1E', lineHeight: 1,
                marginBottom: '0.4rem'
              }}>
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontWeight: 700, color: '#1E1E1E', fontSize: '1rem', marginBottom: '0.25rem', fontFamily: "'Poppins', sans-serif" }}>
                {s.label}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Responsive styles via media query hack */}
      <style>{`
        @media (max-width: 768px) {
          .stats-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default StatsBar;
