import React from 'react';
import { motion } from 'framer-motion';

const companies = [
  { name: 'Google', color: '#4285F4' },
  { name: 'Microsoft', color: '#00A4EF' },
  { name: 'Amazon', color: '#FF9900' },
  { name: 'Meta', color: '#1877F2' },
  { name: 'Adobe', color: '#FF0000' },
  { name: 'Netflix', color: '#E50914' },
  { name: 'Flipkart', color: '#2874F0' },
  { name: 'Salesforce', color: '#00A1E0' },
  { name: 'Oracle', color: '#F80000' },
  { name: 'Infosys', color: '#007CC3' },
  { name: 'Wipro', color: '#44167E' },
  { name: 'TCS', color: '#2D2D89' },
];

const CompanyCarousel = () => {
  const doubled = [...companies, ...companies];

  return (
    <section style={{ padding: '4rem 0', background: '#FFFFFF', borderTop: '1px solid #F3F4F6' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '0.85rem', fontWeight: 700,
          color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.12em'
        }}>
          Our students are placed at top companies
        </p>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Gradient fades */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to right, #FFFFFF, transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to left, #FFFFFF, transparent)', zIndex: 10, pointerEvents: 'none' }} />

        <div className="animate-shimmer" style={{ display: 'flex', width: 'max-content', gap: '1.5rem', alignItems: 'center' }}>
          {doubled.map((company, i) => (
            <div key={i} style={{
              flexShrink: 0, padding: '0.75rem 2rem',
              background: 'white',
              border: '1.5px solid #E5E7EB', borderRadius: 12,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700, fontSize: '1rem',
              color: '#9CA3AF',
              cursor: 'default', transition: 'all 0.25s',
              whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 10,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = company.color;
                e.currentTarget.style.color = company.color;
                e.currentTarget.style.background = `${company.color}08`;
                e.currentTarget.style.boxShadow = `0 4px 20px ${company.color}15`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.color = '#9CA3AF';
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: `linear-gradient(135deg, ${company.color}18, ${company.color}08)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: '0.75rem',
                color: company.color, flexShrink: 0,
              }}>
                {company.name.charAt(0)}
              </div>
              {company.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyCarousel;
