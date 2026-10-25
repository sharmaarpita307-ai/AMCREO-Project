import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [collegeId, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [actionStatus, setActionStatus] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!collegeId || !password) {
      setErrorMsg('Please enter both College ID and Password.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collegeId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setDashboardData(data);
        setIsLoggedIn(true);
      } else {
        setErrorMsg(data.error || 'Invalid credentials.');
      }
      setLoading(false);
    } catch (error) {
      setErrorMsg('Backend connection error. Make sure Python Flask server is running.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      setDashboardData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          energySaved: prev.energySaved + Math.floor(Math.random() * 2),
          waterConserved: prev.waterConserved + Math.floor(Math.random() * 5)
        };
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const triggerAIAction = (actionType) => {
    if (actionType === 'balancer') {
      setActionStatus('⚡ AI Cluster successfully rebalanced load across all campus substations!');
    } else if (actionType === 'waste') {
      setActionStatus('♻️ Waste Management Agent dispatched optimized cleaning route.');
    }
    setTimeout(() => setActionStatus(''), 4000);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#05070b', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ backgroundColor: '#0f172a', padding: '45px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.7)', width: '100%', maxWidth: '420px', border: '1px solid #1e293b' }}>
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <h2 style={{ color: '#38bdf8', margin: '0 0 8px 0', fontSize: '26px', fontWeight: '800' }}>⚡ AMCREO Enterprise</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>Multi-College Autonomous Resource Optimizer</p>
          </div>

          {errorMsg && (
            <div style={{ backgroundColor: '#7f1d1d', color: '#fca5a5', padding: '10px', borderRadius: '6px', fontSize: '12px', marginBottom: '15px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', marginBottom: '6px', fontWeight: '600' }}>COLLEGE ID (e.g. bbdu)</label>
              <input 
                type="text" 
                placeholder="bbdu"
                value={collegeId} 
                onChange={(e) => setCollegeId(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', marginBottom: '6px', fontWeight: '600' }}>PASSWORD (e.g. bbd123)</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <button 
              type="submit" 
              style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
              {loading ? 'Authenticating...' : 'Launch Command Center'}
            </button>
          </form>
          <div style={{ marginTop: '20px', textAlign: 'center', color: '#64748b', fontSize: '11px' }}>
            Test BBDU Login - ID: <span style={{ color: '#38bdf8' }}>bbdu</span> | Password: <span style={{ color: '#38bdf8' }}>bbd123</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#05070b', color: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      
      {/* Sidebar */}
      <div style={{ width: '280px', backgroundColor: '#0f172a', borderRight: '1px solid #1e293b', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '35px' }}>
            <div style={{ backgroundColor: '#0284c7', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>⚡</div>
            <div>
              <h2 style={{ color: '#fff', fontSize: '18px', margin: 0, fontWeight: '700' }}>AMCREO AI</h2>
              <span style={{ color: '#38bdf8', fontSize: '11px' }}>Autonomous Core v2.8</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              onClick={() => setActiveTab('overview')}
              style={{ backgroundColor: activeTab === 'overview' ? '#1e293b' : 'transparent', color: activeTab === 'overview' ? '#38bdf8' : '#94a3b8', border: 'none', padding: '12px 16px', textAlign: 'left', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
              📊 Live Command Center
            </button>
            <button 
              onClick={() => setActiveTab('buildings')}
              style={{ backgroundColor: activeTab === 'buildings' ? '#1e293b' : 'transparent', color: activeTab === 'buildings' ? '#38bdf8' : '#94a3b8', border: 'none', padding: '12px 16px', textAlign: 'left', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
              🏢 Building Infrastructure
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              style={{ backgroundColor: activeTab === 'analytics' ? '#1e293b' : 'transparent', color: activeTab === 'analytics' ? '#38bdf8' : '#94a3b8', border: 'none', padding: '12px 16px', textAlign: 'left', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
              📈 Neural Analytics & Graphs
            </button>
          </div>
        </div>

        <div>
          <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '8px', marginBottom: '15px', fontSize: '12px', color: '#94a3b8' }}>
            <span style={{ color: '#34d399', fontWeight: 'bold' }}>● Active Tenant:</span> {dashboardData.collegeName}
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            style={{ width: '100%', backgroundColor: '#7f1d1d', color: '#fca5a5', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
            Secure Logout
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div style={{ flex: 1, padding: '35px', overflowY: 'auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '20px', marginBottom: '30px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#fff', fontWeight: '700' }}>{dashboardData.collegeName} - Command Center</h1>
            <p style={{ margin: '5px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>Multi-agent autonomous decision loop operating in real-time.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ backgroundColor: '#064e3b', color: '#34d399', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', border: '1px solid #065f46' }}>
              🟢 {dashboardData.systemStatus} (Live Sync)
            </div>
          </div>
        </div>

        {/* Action Status Notification Banner */}
        {actionStatus && (
          <div style={{ backgroundColor: '#0369a1', color: '#bae6fd', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', fontWeight: '600', border: '1px solid #0284c7' }}>
            {actionStatus}
          </div>
        )}

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div>
            {/* Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '700' }}>ENERGY SAVED TODAY</span>
                <p style={{ fontSize: '32px', margin: '10px 0 5px 0', fontWeight: '800', color: '#38bdf8' }}>{dashboardData.energySaved} kWh</p>
                <span style={{ color: '#34d399', fontSize: '12px' }}>↑ Live counter active</span>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '700' }}>WATER CONSERVED</span>
                <p style={{ fontSize: '32px', margin: '10px 0 5px 0', fontWeight: '800', color: '#34d399' }}>{dashboardData.waterConserved} L</p>
                <span style={{ color: '#34d399', fontSize: '12px' }}>Smart valve automation active</span>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '700' }}>CARBON OFFSET</span>
                <p style={{ fontSize: '32px', margin: '10px 0 5px 0', fontWeight: '800', color: '#facc15' }}>{dashboardData.carbonOffset}</p>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>Equivalent environmental offset</span>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '700' }}>ACTIVE AI AGENTS</span>
                <p style={{ fontSize: '32px', margin: '10px 0 5px 0', fontWeight: '800', color: '#a855f7' }}>{dashboardData.activeAgents} Units</p>
                <span style={{ color: '#a855f7', fontSize: '12px' }}>Autonomous cluster sync</span>
              </div>
            </div>

            {/* Live Activity Logs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '25px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#fff' }}>⚡ Real-Time Autonomous Agent Ticker</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {dashboardData.logs.map((log, index) => (
                    <div key={index} style={{ backgroundColor: '#1e293b', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', color: '#cbd5e1', borderLeft: '3px solid #38bdf8' }}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: '#0f172a', padding: '25px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#fff' }}>🚀 Quick AI Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button 
                    onClick={() => triggerAIAction('balancer')}
                    style={{ backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                    Trigger Load Balancer
                  </button>
                  <button 
                    onClick={() => triggerAIAction('waste')}
                    style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                    Run Waste Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Buildings */}
        {activeTab === 'buildings' && (
          <div style={{ backgroundColor: '#0f172a', padding: '25px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#fff' }}>🏢 Campus Building Infrastructure Status</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {dashboardData.buildings.map((b, i) => (
                <div key={i} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h4 style={{ margin: 0, color: '#38bdf8' }}>{b.name}</h4>
                    <span style={{ color: '#34d399', fontSize: '12px', fontWeight: 'bold' }}>{b.status}</span>
                  </div>
                  <p style={{ margin: '0 0 10px 0', color: '#94a3b8', fontSize: '13px' }}>Current Load: {b.load}</p>
                  <div style={{ width: '100%', backgroundColor: '#0f172a', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: b.load, backgroundColor: '#38bdf8', height: '100%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Analytics */}
        {activeTab === 'analytics' && (
          <div style={{ backgroundColor: '#0f172a', padding: '30px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#fff' }}>📈 Neural Analytics & Efficiency Graphs</h3>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '25px' }}>Live data processed via Python backend regression models.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span>Campus Power Optimization</span>
                  <span style={{ color: '#38bdf8' }}>88% Efficiency</span>
                </div>
                <div style={{ width: '100%', backgroundColor: '#1e293b', height: '12px', borderRadius: '6px' }}>
                  <div style={{ width: '88%', backgroundColor: '#38bdf8', height: '100%', borderRadius: '6px' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span>Water Conservation Rate</span>
                  <span style={{ color: '#34d399' }}>94% Efficiency</span>
                </div>
                <div style={{ width: '100%', backgroundColor: '#1e293b', height: '12px', borderRadius: '6px' }}>
                  <div style={{ width: '94%', backgroundColor: '#34d399', height: '100%', borderRadius: '6px' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;