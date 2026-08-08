import React from 'react';
import type { Bed } from '../../types';

interface IpdModuleProps {
  branchBeds: Bed[];
  ipdTab: 'overview' | 'gcs';
  setIpdTab: (tab: 'overview' | 'gcs') => void;
}

export const IpdModule: React.FC<IpdModuleProps> = ({
  branchBeds,
  ipdTab,
  setIpdTab,
}) => {
  return (
    <div className="flex flex-col gap-lg">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>🛌 Inpatient Department (IPD Wards & Bed Management)</h2>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button className={`btn ${ipdTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setIpdTab('overview')}>Bed Matrix</button>
            <button className={`btn ${ipdTab === 'gcs' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setIpdTab('gcs')}>🧠 GCS Coma Scale</button>
          </div>
        </div>

        {ipdTab === 'overview' ? (
          <div className="grid grid-4" style={{ gap: '12px', marginTop: '16px' }}>
            {branchBeds.map(b => (
              <div key={b.id} style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: b.status === 'occupied' ? 'rgba(37,99,235,0.06)' : 'var(--bg-muted)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '13px' }}>Bed {b.number}</strong>
                  <span className={`badge ${b.status === 'occupied' ? 'badge-primary' : 'badge-success'}`}>{b.status}</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Type: {b.wardType ? b.wardType.toUpperCase() : 'GENERAL'} Ward</div>
                {b.patientName && <div style={{ fontSize: '11px', fontWeight: 600, marginTop: '4px' }}>Patient: {b.patientName}</div>}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: '16px' }}>
            <h3>Glasgow Coma Scale (GCS) Assessment</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Calculated GCS Score for Bed IPD-101: <strong>15/15 (Fully Conscious)</strong></p>
          </div>
        )}
      </div>
    </div>
  );
};
