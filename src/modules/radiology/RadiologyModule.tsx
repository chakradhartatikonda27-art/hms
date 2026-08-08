import React from 'react';
import type { RadiologyStudy } from '../../types';

interface RadiologyModuleProps {
  radiologyWorklist: RadiologyStudy[];
  setSelectedDicomStudy: (study: RadiologyStudy | null) => void;
  setShowDicomViewerModal: (show: boolean) => void;
  setShowFormFModal: (show: boolean) => void;
}

export const RadiologyModule: React.FC<RadiologyModuleProps> = ({
  radiologyWorklist,
  setSelectedDicomStudy,
  setShowDicomViewerModal,
  setShowFormFModal,
}) => {
  return (
    <div className="flex flex-col gap-lg">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2>🖼️ Radiology & Imaging Management (DICOM PACS & Form F PC-PNDT)</h2>
          <button className="btn btn-primary" style={{ fontSize: '11px' }} onClick={() => setShowFormFModal(true)}>📋 PC-PNDT Statutory Form F</button>
        </div>

        <div className="table-container">
          <table className="data-table" style={{ fontSize: '11px' }}>
            <thead>
              <tr>
                <th>Study ID</th>
                <th>Patient Name</th>
                <th>Modality</th>
                <th>Study Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {radiologyWorklist.map(s => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td style={{ fontWeight: 600 }}>{s.patientName}</td>
                  <td><span className="badge badge-primary">{s.modality}</span></td>
                  <td>{s.studyName}</td>
                  <td><span className={`badge ${s.priority === 'STAT' ? 'badge-danger' : 'badge-warning'}`}>{s.priority}</span></td>
                  <td>{s.status}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => {
                      setSelectedDicomStudy(s);
                      setShowDicomViewerModal(true);
                    }}>🖥️ Open DICOM PACS Viewer</button>
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
