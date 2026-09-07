import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiCheckCircle } from 'react-icons/fi';
import { MOCK_DATA } from '../data/mockData';
import Tabs from '../components/ui/Tabs';
import GlassCard from '../components/ui/GlassCard';

const CompanyDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('oa');
  const [openFaq, setOpenFaq] = useState(null);
  
  const company = MOCK_DATA.companies.find(c => c.id === id) || MOCK_DATA.companies[0];
  
  const tabs = [
    { id: 'oa', label: 'Online Assessment' },
    { id: 'experiences', label: 'Interview Experiences' },
    { id: 'faqs', label: 'FAQs' }
  ];

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      <Link to="/companies" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-6 transition-colors">
        <FiChevronLeft /> Back to Companies
      </Link>
      
      <div className="glass-card-accent p-8 rounded-2xl mb-8 flex items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-surface-2 border border-glass-border flex items-center justify-center font-black text-4xl shadow-lg">
          {company.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{company.name} Preparation</h1>
          <p className="text-text-muted">Targeted practice questions and interview experiences for {company.name}.</p>
        </div>
      </div>

      <GlassCard className="p-0 overflow-hidden">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="p-4 border-b border-glass-border" />
        
        <div className="p-6">
          {activeTab === 'oa' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold mb-4 text-white">Frequently Asked OA Questions</h3>
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-center justify-between p-4 bg-surface-2 rounded-lg border border-glass-border hover:border-accent-primary transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <FiCheckCircle className="text-text-muted" />
                    <div>
                      <h4 className="font-medium text-white hover:text-accent-primary transition-colors">{company.name} Specific Problem {num}</h4>
                      <p className="text-xs text-text-muted mt-1">Asked in 2025 • Array, Hash Table</p>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm">Solve</button>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'experiences' && (
            <div className="space-y-6">
              {[
                { author: 'Siddharth Roy', role: 'SDE Intern', date: 'Jan 2025', text: `Online assessment for ${company.name} had 2 coding problems (Medium difficulty, focused on Graphs and Trie). Technical interviews had 3 rounds: Round 1 DSA (DP & Binary Tree), Round 2 LLD (Design a parking lot), and Round 3 HM (Managerial).` },
                { author: 'Neha Gupta', role: 'Full Time SDE', date: 'Nov 2024', text: `Applied off-campus to ${company.name}. Resume was shortlisted via referral. OA was challenging, with 3 questions. Tech rounds focused heavily on system design and clean code principles. Highly recommend mastering tree traversals and database optimization.` }
              ].map((exp, idx) => (
                <div key={idx} className="p-5 bg-surface-2 rounded-xl border border-glass-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-white text-sm">{exp.author} ({exp.role})</span>
                    <span className="text-xs text-text-muted">{exp.date}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{exp.text}</p>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'faqs' && (
            <div className="space-y-3">
              {[
                { q: `What is the recruitment process for ${company.name}?`, a: `The typical process for ${company.name} consists of a resume screening, an online coding assessment (2-3 questions), followed by 3-4 rounds of technical and behavioral interviews.` },
                { q: `Are there specific topics ${company.name} focuses on?`, a: 'Yes, they focus heavily on Data Structures & Algorithms (Trees, Graphs, Dynamic Programming), Object-Oriented Design, and System Architecture.' },
                { q: `What is the difficulty level of the coding questions at ${company.name}?`, a: 'Coding questions generally range from Medium to Hard Leetcode equivalents. Prioritizing array manipulations, graph traversals, and dynamic programming is recommended.' }
              ].map((faq, idx) => (
                <div key={idx} className="border border-glass-border rounded-lg overflow-hidden">
                  <div 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="p-4 bg-surface-2 font-semibold text-white flex justify-between items-center cursor-pointer hover:bg-surface-3 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span>{openFaq === idx ? '▲' : '▼'}</span>
                  </div>
                  {openFaq === idx && (
                    <div className="p-4 text-sm text-text-secondary bg-surface-2/50 border-t border-glass-border">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default CompanyDetail;
