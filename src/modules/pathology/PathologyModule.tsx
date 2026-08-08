import React from 'react';
import type { Patient } from '../../types';

interface PathologyModuleProps {
  patients: Patient[];
  addToast: (type: any, msg: string) => void;
}

export const PathologyModule: React.FC<PathologyModuleProps> = ({ patients, addToast }) => {
  return (
    <div className="flex flex-col gap-lg">
      <div className="card">
        <h2>🔬 Pathology Laboratory Management (NABL Smart Reports)</h2>
        <div className="table-container" style={{ marginTop: '12px' }}>
          <table className="data-table" style={{ fontSize: '11px' }}>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Requested Test</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.filter(p => p.status === 'pathology-pending').map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.labResults?.map(l => l.testName).join(', ') || 'CBC Blood Panel'}</td>
                  <td><span className="badge badge-warning">Processing</span></td>
                  <td>
                    <button className="btn btn-success" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('success', `Generated NABL Smart Report for ${p.name}`)}>Approve Report</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
