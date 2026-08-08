import React from 'react';
import type { Patient } from '../../types';

interface RegistrationModuleProps {
  patients: Patient[];
  newPatient: { name: string; age: string; gender: string; phone: string; bloodType: string; allergies: string; diagnosis: string };
  setNewPatient: (p: any) => void;
  handleRegisterPatient: (e: React.FormEvent) => void;
}

export const RegistrationModule: React.FC<RegistrationModuleProps> = ({
  patients,
  newPatient,
  setNewPatient,
  handleRegisterPatient,
}) => {
  return (
    <div className="grid gap-lg" style={{ gridTemplateColumns: '1fr 1.5fr' }}>
      <div className="card">
        <h2>💳 New Patient Registration (OPD / Emergency)</h2>
        <form onSubmit={handleRegisterPatient} className="flex flex-col gap-sm" style={{ marginTop: '12px' }}>
          <input type="text" placeholder="Full Patient Name" className="form-input" required value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} />
          <div className="grid grid-2" style={{ gap: '8px' }}>
            <input type="number" placeholder="Age" className="form-input" required value={newPatient.age} onChange={e => setNewPatient({ ...newPatient, age: e.target.value })} />
            <select className="form-input" value={newPatient.gender} onChange={e => setNewPatient({ ...newPatient, gender: e.target.value })}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <input type="text" placeholder="Phone Number" className="form-input" required value={newPatient.phone} onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })} />
          <input type="text" placeholder="Primary Diagnosis / Chief Complaint" className="form-input" required value={newPatient.diagnosis} onChange={e => setNewPatient({ ...newPatient, diagnosis: e.target.value })} />
          <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>💳 Register & Generate UHID</button>
        </form>
      </div>

      <div className="card">
        <h2>📋 Registered Patients Registry</h2>
        <div className="table-container" style={{ marginTop: '12px' }}>
          <table className="data-table" style={{ fontSize: '11px' }}>
            <thead>
              <tr>
                <th>UHID</th>
                <th>Name</th>
                <th>Age/Gender</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td>{p.age} yrs / {p.gender}</td>
                  <td>{p.phone}</td>
                  <td><span className="badge badge-primary">{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
