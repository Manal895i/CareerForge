import React, { useState, useRef } from 'react';
import { FiCheckCircle, FiTrendingUp, FiBarChart2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MOCK_DATA } from '../data/mockData';
import ProblemTable from '../components/practice/ProblemTable';
import SearchBar from '../components/ui/SearchBar';
import GlassCard from '../components/ui/GlassCard';
import Tabs from '../components/ui/Tabs';

const Practice = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active filter states
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [tagFilter, setTagFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('All');
  
  const sliderRef = useRef(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };
  
  // Create mock problems list with companies for active filtering
  const problemsList = [
    { id: 1, title: 'Two Sum', acceptance: '52.3%', difficulty: 'Easy', status: 'solved', tags: ['Array', 'Hash Table'], companies: ['Google', 'Amazon'] },
    { id: 2, title: 'Add Two Numbers', acceptance: '41.8%', difficulty: 'Medium', status: 'unsolved', tags: ['Linked List', 'Math'], companies: ['Amazon', 'Microsoft'] },
    { id: 3, title: 'Longest Substring Without Repeating Characters', acceptance: '34.5%', difficulty: 'Medium', status: 'attempted', tags: ['Hash Table', 'String', 'Sliding Window'], companies: ['Google'] },
    { id: 4, title: 'Median of Two Sorted Arrays', acceptance: '39.4%', difficulty: 'Hard', status: 'unsolved', tags: ['Array', 'Binary Search', 'Divide and Conquer'], companies: ['Google', 'Microsoft'] },
    { id: 5, title: 'Longest Palindromic Substring', acceptance: '33.7%', difficulty: 'Medium', status: 'solved', tags: ['String', 'Dynamic Programming'], companies: ['Amazon'] },
    { id: 6, title: 'Zigzag Conversion', acceptance: '47.1%', difficulty: 'Medium', status: 'unsolved', tags: ['String'], companies: ['Google'] },
    { id: 7, title: 'Reverse Integer', acceptance: '28.3%', difficulty: 'Medium', status: 'unsolved', tags: ['Math'], companies: ['Microsoft'] },
    { id: 8, title: 'String to Integer (atoi)', acceptance: '17.4%', difficulty: 'Medium', status: 'unsolved', tags: ['String'], companies: ['Amazon'] },
    { id: 9, title: 'Palindrome Number', acceptance: '55.6%', difficulty: 'Easy', status: 'solved', tags: ['Math'], companies: ['Google', 'Amazon'] },
    { id: 10, title: 'Regular Expression Matching', acceptance: '28.5%', difficulty: 'Hard', status: 'unsolved', tags: ['String', 'Dynamic Programming', 'Recursion'], companies: ['Microsoft'] },
  ];

  const tabs = [
    { id: 'all', label: 'All Topics' },
    { id: 'algorithms', label: 'Algorithms' },
    { id: 'database', label: 'Database' },
    { id: 'shell', label: 'Shell' },
    { id: 'concurrency', label: 'Concurrency' },
  ];

  const filteredProblems = problemsList.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Check if matching algorithms/other tab tags
    const matchesTab = activeTab === 'all' || 
                       p.tags.some(tag => tag.toLowerCase() === activeTab.toLowerCase()) ||
                       (activeTab === 'algorithms' && p.tags.includes('Dynamic Programming'));
                       
    const matchesDifficulty = difficultyFilter === 'All' || p.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    const matchesStatus = statusFilter === 'All' || p.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesTag = tagFilter === 'All' || p.tags.some(tag => tag.toLowerCase() === tagFilter.toLowerCase());
    const matchesCompany = companyFilter === 'All' || (p.companies && p.companies.includes(companyFilter));
    
    return matchesSearch && matchesTab && matchesDifficulty && matchesStatus && matchesTag && matchesCompany;
  });

  return (
    <div className="container section-sm">
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #0F766E)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-8)' }}>
        {/* Horizontal Scrollable Cards */}
        <div style={{ position: 'relative' }}>
          <button onClick={slideLeft} style={{ position: 'absolute', left: '-16px', top: '70px', transform: 'translateY(-50%)', zIndex: 10, background: '#1E2937', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
            <FiChevronLeft size={20} />
          </button>
          
          <div ref={sliderRef} className="mb-8 scrollbar-hide" style={{ display: 'flex', gap: 'var(--space-4)', overflowX: 'auto', paddingBottom: '8px', scrollBehavior: 'smooth' }}>
            <div style={{ minWidth: '300px', height: '140px', background: 'linear-gradient(135deg, #0F172A, #115E59)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ zIndex: 1, textAlign: 'center' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '4px' }}>🔥</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{MOCK_DATA.courses[0].title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: '4px' }}>Curated for Placements</p>
              </div>
            </div>
            
            <div style={{ minWidth: '320px', height: '140px', background: 'linear-gradient(135deg, #0F766E, #0D9488)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ zIndex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '4px' }}>{MOCK_DATA.courses[2].category} Crash Course:</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>{MOCK_DATA.courses[2].title}</p>
              </div>
              <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.2 }}>
                <FiCheckCircle size={100} />
              </div>
            </div>

            <div style={{ minWidth: '320px', height: '140px', background: 'linear-gradient(135deg, #0F766E, #115E59)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ zIndex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '4px' }}>{MOCK_DATA.courses[1].category} Bootcamp:</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>{MOCK_DATA.courses[1].title}</p>
              </div>
            </div>

            <div style={{ minWidth: '200px', height: '140px', background: 'linear-gradient(135deg, #0891B2, #0D9488)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ zIndex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Top Company Tags</h3>
              </div>
            </div>
          </div>

          <button onClick={slideRight} style={{ position: 'absolute', right: '-16px', top: '70px', transform: 'translateY(-50%)', zIndex: 10, background: '#1E2937', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-4 mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {[
            { label: 'Array', count: 342 },
            { label: 'String', count: 156 },
            { label: 'Hash Table', count: 89 },
            { label: 'Math', count: 214 },
            { label: 'Dynamic Programming', count: 412 },
            { label: 'Binary Search', count: 178 }
          ].map((tag, idx) => (
            <div 
              key={idx} 
              onClick={() => setTagFilter(tagFilter === tag.label ? 'All' : tag.label)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
                color: tagFilter === tag.label ? '#2DD4BF' : 'white',
                fontWeight: tagFilter === tag.label ? 700 : 400
              }}
            >
              <span>{tag.label}</span>
              <span style={{ fontSize: '0.75rem', background: tagFilter === tag.label ? 'rgba(45, 212, 191, 0.2)' : 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '12px' }}>{tag.count}</span>
            </div>
          ))}
        </div>

        {/* Pill Filters */}
        <div className="flex flex-wrap gap-3">
          <div 
            onClick={() => setActiveTab('all')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: activeTab === 'all' ? 'white' : 'rgba(255,255,255,0.1)', color: activeTab === 'all' ? '#0F172A' : 'rgba(255,255,255,0.9)', padding: '8px 16px', borderRadius: '20px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}
          >
            <FiCheckCircle />
            <span>All Topics</span>
          </div>
          <div 
            onClick={() => setActiveTab('algorithms')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: activeTab === 'algorithms' ? 'white' : 'rgba(255,255,255,0.1)', color: activeTab === 'algorithms' ? '#0F172A' : 'rgba(255,255,255,0.9)', padding: '8px 16px', borderRadius: '20px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}
          >
            <span style={{ color: '#0D9488' }}><FiTrendingUp /></span>
            <span>Algorithms</span>
          </div>
        </div>
      </div>

      <GlassCard>
        <div className="flex justify-between items-center mb-6 gap-4 flex-wrap" style={{ borderBottom: '1px solid var(--gray-100)', paddingBottom: 'var(--space-4)' }}>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <SearchBar 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or tags"
          />
        </div>
        
        <div className="flex gap-3 mb-6 flex-wrap">
          <select 
            value={difficultyFilter} 
            onChange={(e) => setDifficultyFilter(e.target.value)} 
            className="form-input" 
            style={{ minWidth: '150px' }}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)} 
            className="form-input" 
            style={{ minWidth: '150px' }}
          >
            <option value="All">All Statuses</option>
            <option value="solved">Solved</option>
            <option value="attempted">Attempted</option>
            <option value="unsolved">Unsolved</option>
          </select>
          
          <select 
            value={tagFilter} 
            onChange={(e) => setTagFilter(e.target.value)} 
            className="form-input" 
            style={{ minWidth: '150px' }}
          >
            <option value="All">All Tags</option>
            <option value="Array">Array</option>
            <option value="String">String</option>
            <option value="Hash Table">Hash Table</option>
            <option value="Math">Math</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
          </select>
          
          <select 
            value={companyFilter} 
            onChange={(e) => setCompanyFilter(e.target.value)} 
            className="form-input" 
            style={{ minWidth: '150px', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', fontWeight: 600 }}
          >
            <option value="All">All Companies</option>
            <option value="Google">Google</option>
            <option value="Amazon">Amazon</option>
            <option value="Microsoft">Microsoft</option>
          </select>
        </div>

        <ProblemTable problems={filteredProblems} />
      </GlassCard>
    </div>
  );
};

export default Practice;
