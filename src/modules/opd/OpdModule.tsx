import React from 'react';
import type { Patient } from '../../types';

interface OpdModuleProps {
  selectedPatient?: Patient;
  patients: Patient[];
  setSelectedPatientId: (id: string) => void;
  newPrescription: { medication: string; dosage: string; frequency: string; duration: string; instructions: string };
  setNewPrescription: (p: any) => void;
  handleAddPrescription: (e: React.FormEvent) => void;
  handleAddLabOrder: (testName: string) => void;
}

export const OpdModule: React.FC<OpdModuleProps> = ({
  selectedPatient,
  patients,
  setSelectedPatientId,
  newPrescription,
  setNewPrescription,
  handleAddPrescription,
  handleAddLabOrder,
}) => {
  return (
    <div className="grid gap-lg" style={{ gridTemplateColumns: '1fr 2.5fr' }}>
      {/* Patient Queue */}
      <div className="card">
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--primary)' }}>🩺 OPD Patient Queue</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {patients.map(p => (
            <div
              key={p.id}
              onClick={() => setSelectedPatientId(p.id)}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                background: selectedPatient?.id === p.id ? 'rgba(37,99,235,0.08)' : 'var(--bg-card)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '12px' }}>{p.name} ({p.id})</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{p.diagnosis} • {p.gender}, {p.age} yrs</div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor EMR Workspace */}
      <div className="card">
        {selectedPatient ? (
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700 }}>EMR Consultation: {selectedPatient.name}</h2>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>MRD Code: {selectedPatient.mrdCode || 'N/A'} • Diagnosis: {selectedPatient.diagnosis}</div>

            {/* Prescriptions Form */}
            <form onSubmit={handleAddPrescription} className="grid grid-3" style={{ gap: '8px', marginTop: '12px' }}>
              <input type="text" placeholder="Medication Name" className="form-input" value={newPrescription.medication} onChange={e => setNewPrescription({ ...newPrescription, medication: e.target.value })} required />
              <input type="text" placeholder="Dosage (e.g. 1 tab)" className="form-input" value={newPrescription.dosage} onChange={e => setNewPrescription({ ...newPrescription, dosage: e.target.value })} required />
              <button type="submit" className="btn btn-primary">➕ Add Prescription</button>
            </form>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: 600 }}>Order Pathology / Radiology Diagnostic Scans:</h4>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => handleAddLabOrder('CBC (Complete Blood Count)')}>🔬 Order CBC</button>
                <button type="button" className="btn btn-secondary" onClick={() => handleAddLabOrder('NCCT Brain Trauma Scan')}>🖼️ Order NCCT Brain</button>
              </div>
            </div>
          </div>
        ) : (
          <div>Select a patient from the queue to start consultation.</div>
        )}
      </div>
    </div>
  );
};
