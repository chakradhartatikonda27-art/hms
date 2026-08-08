import React from 'react';
import type { Bed } from '../../types';

interface IcuModuleProps {
  branchBeds: Bed[];
}

export const IcuModule: React.FC<IcuModuleProps> = ({
  branchBeds,
}) => {
  const icuBeds = branchBeds.filter(b => b.wardType === 'icu');
  return (
    <div className="flex flex-col gap-lg">
      <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
        <h2>🫀 Intensive Care Unit (ICU Suite & Live Telemetry)</h2>
        <div className="grid grid-3" style={{ gap: '12px', marginTop: '16px' }}>
          {icuBeds.map(b => (
            <div key={b.id} style={{ padding: '14px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-muted)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-danger">ICU BED #{b.number}</span>
                <span className="badge badge-success">Live Vitals Sync</span>
              </div>
              <h4 style={{ fontSize: '13px', margin: '6px 0' }}>{b.patientName || 'Available Bed'}</h4>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>BP: 128/82 | Pulse: 78 bpm | SpO2: 98%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
