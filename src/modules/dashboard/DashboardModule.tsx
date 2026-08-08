import React from 'react';
import type { Patient } from '../../types';

interface DashboardModuleProps {
  dashboardViewMode: 'all' | 'doctor' | 'ipd_icu' | 'ot' | 'lab';
  setDashboardViewMode: (mode: 'all' | 'doctor' | 'ipd_icu' | 'ot' | 'lab') => void;
  branchPatients: Patient[];
  branchRevenue: number;
  branchOccupancyRate: number;
  setActiveTab: (tab: any) => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({
  dashboardViewMode,
  setDashboardViewMode,
  branchPatients,
  branchRevenue,
  branchOccupancyRate,
  setActiveTab,
}) => {
  return (
    <div className="grid gap-lg">
      {/* 1-Click Quick Action Launcher Hub */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(147,51,234,0.04) 100%)', borderLeft: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🚀 1-Click Quick Action Launcher Hub</span>
              <span className="badge badge-primary">Fast Navigation</span>
            </h2>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Direct shortcuts to launch key clinical workflows & department desks.</p>
          </div>

          {/* Perspective View Selector Pills */}
          <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-muted)', padding: '3px', borderRadius: '6px' }}>
            <button onClick={() => setDashboardViewMode('all')} className={`btn ${dashboardViewMode === 'all' ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '3px 8px', fontSize: '10px' }}>🌟 Executive</button>
            <button onClick={() => setDashboardViewMode('doctor')} className={`btn ${dashboardViewMode === 'doctor' ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '3px 8px', fontSize: '10px' }}>👨‍⚕️ Doctor Desk</button>
            <button onClick={() => setDashboardViewMode('ipd_icu')} className={`btn ${dashboardViewMode === 'ipd_icu' ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '3px 8px', fontSize: '10px' }}>🛌 IPD & ICU</button>
            <button onClick={() => setDashboardViewMode('ot')} className={`btn ${dashboardViewMode === 'ot' ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '3px 8px', fontSize: '10px' }}>✂️ OT Surgery</button>
            <button onClick={() => setDashboardViewMode('lab')} className={`btn ${dashboardViewMode === 'lab' ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '3px 8px', fontSize: '10px' }}>🔬 Lab & Imaging</button>
          </div>
        </div>

        {/* Launcher Tiles */}
        <div className="grid grid-4" style={{ gap: '10px' }}>
          <div onClick={() => setActiveTab('registration')} style={{ padding: '10px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>💳</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600 }}>New Registration</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Scan Aadhar / QR Code</div>
            </div>
          </div>
          <div onClick={() => setActiveTab('consultation')} style={{ padding: '10px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>👨‍⚕️</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600 }}>OPD Doctor Desk</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>4 Patients Waiting</div>
            </div>
          </div>
          <div onClick={() => setActiveTab('icu')} style={{ padding: '10px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>🫀</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600 }}>ICU Critical Watch</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Live Vitals Telemetry</div>
            </div>
          </div>
          <div onClick={() => setActiveTab('pharmacy')} style={{ padding: '10px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>💊</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600 }}>Pharmacy POS</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Fast Barcode Cashier</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-4" style={{ gap: '16px' }}>
        <div className="card flex align-center gap-md">
          <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(37,99,235,0.1)', color: 'var(--primary)' }}>
            <span style={{ fontSize: '20px' }}>👥</span>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Active Patients</div>
            <div style={{ fontSize: '20px', fontWeight: 700 }}>{branchPatients.length}</div>
          </div>
        </div>

        <div className="card flex align-center gap-md">
          <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(22,163,74,0.1)', color: 'var(--success)' }}>
            <span style={{ fontSize: '20px' }}>🛌</span>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Bed Occupancy</div>
            <div style={{ fontSize: '20px', fontWeight: 700 }}>{branchOccupancyRate}%</div>
          </div>
        </div>

        <div className="card flex align-center gap-md">
          <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(245,158,11,0.1)', color: 'var(--warning)' }}>
            <span style={{ fontSize: '20px' }}>💰</span>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Today's Revenue</div>
            <div style={{ fontSize: '20px', fontWeight: 700 }}>₹{branchRevenue.toLocaleString()}</div>
          </div>
        </div>

        <div className="card flex align-center gap-md">
          <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(220,38,38,0.1)', color: 'var(--danger)' }}>
            <span style={{ fontSize: '20px' }}>🚨</span>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>STAT Emergency Alerts</div>
            <div style={{ fontSize: '20px', fontWeight: 700 }}>2</div>
          </div>
        </div>
      </div>
    </div>
  );
};
