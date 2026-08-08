import React from 'react';
import { Search, FileText, Shield, Database, CheckCircle2, AlertTriangle, Lock, Tag, Clock, FolderArchive } from 'lucide-react';

export interface MrdModuleProps {
  [key: string]: any;
}

export const MrdModule: React.FC<MrdModuleProps> = (props) => {
  const {
    activeTab = 'mrd',
    setActiveTab = () => {},
    addToast = () => {},
    patients = [],
    setPatients = () => {},
    branchPatients = [],
    selectedPatientId = '',
    setSelectedPatientId = () => {},
    selectedIcdCode = '',
    setSelectedIcdCode = () => {},
    handleAssignMrdCode = () => {},
    ...rest
  } = props;

  const [mrdTab, setMrdTab] = React.useState<'coding' | 'storage' | 'quality' | 'confidentiality'>('coding');
  const [mrdSearchTerm, setMrdSearchTerm] = React.useState('');
  const [icdVersionFilter, setIcdVersionFilter] = React.useState<'all' | 'icd10' | 'icd11'>('all');

  const ICD_DISEASE_DB = [
    { code: 'I10', title: 'Essential (primary) hypertension', version: 'ICD-10', chapter: 'Diseases of the circulatory system' },
    { code: 'BA00', title: 'Essential hypertension', version: 'ICD-11', chapter: '01 Diseases of the circulatory system' },
    { code: 'E11.9', title: 'Type 2 diabetes mellitus without complications', version: 'ICD-10', chapter: 'Endocrine, nutritional and metabolic diseases' },
    { code: '5A11', title: 'Type 2 diabetes mellitus', version: 'ICD-11', chapter: '05 Endocrine, nutritional or metabolic diseases' },
    { code: 'J45.909', title: 'Unspecified asthma, uncomplicated', version: 'ICD-10', chapter: 'Diseases of the respiratory system' },
    { code: 'CA23', title: 'Asthma', version: 'ICD-11', chapter: '12 Diseases of the respiratory system' },
    { code: 'I21.9', title: 'Acute myocardial infarction, unspecified', version: 'ICD-10', chapter: 'Diseases of the circulatory system' },
    { code: 'BA41', title: 'Acute myocardial infarction', version: 'ICD-11', chapter: '01 Diseases of the circulatory system' },
    { code: 'K35.80', title: 'Unspecified acute appendicitis', version: 'ICD-10', chapter: 'Diseases of the digestive system' },
    { code: 'DB10', title: 'Acute appendicitis', version: 'ICD-11', chapter: '13 Diseases of the digestive system' }
  ];

  const [mrdArchives, setMrdArchives] = React.useState([
    { id: 'MRD-2026-001', patientName: 'Aarav Sharma', uhid: 'PX-2026-9041', fileRack: 'Rack A-04', shelfNo: 'Shelf 3', status: 'Archived', accessLevel: 'Restricted' },
    { id: 'MRD-2026-002', patientName: 'Priya Sharma', uhid: 'PX-2026-9042', fileRack: 'Rack B-12', shelfNo: 'Shelf 1', status: 'Out on Loan (Legal Court)', accessLevel: 'Legal Hold' },
    { id: 'MRD-2026-003', patientName: 'Rohan Mehta', uhid: 'PX-2026-9043', fileRack: 'Rack C-08', shelfNo: 'Shelf 5', status: 'Digitized & Encrypted', accessLevel: 'Confidential' }
  ]);

  const [qualityAudits, setQualityAudits] = React.useState([
    { id: 'AUD-101', chartName: 'Inpatient Record - PX-2026-9041', score: '96%', dischargeSummaryStatus: 'Complete', consentForm: 'Verified', status: 'Passed' },
    { id: 'AUD-102', chartName: 'OT Surgery Record - PX-2026-9042', score: '82%', dischargeSummaryStatus: 'Missing Doctor Signature', consentForm: 'Verified', status: 'Action Required' },
    { id: 'AUD-103', chartName: 'ICU Telemetry Record - PX-2026-9043', score: '100%', dischargeSummaryStatus: 'Complete', consentForm: 'Verified', status: 'Passed' }
  ]);

  const filteredIcdList = ICD_DISEASE_DB.filter(item => {
    const matchQuery = item.title.toLowerCase().includes(mrdSearchTerm.toLowerCase()) || item.code.toLowerCase().includes(mrdSearchTerm.toLowerCase());
    const matchVersion = icdVersionFilter === 'all' || (icdVersionFilter === 'icd10' && item.version === 'ICD-10') || (icdVersionFilter === 'icd11' && item.version === 'ICD-11');
    return matchQuery && matchVersion;
  });

  return (
    <div className="flex flex-col gap-lg">
      {/* MRD Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(147, 51, 234, 0.08) 100%)', borderLeft: '6px solid var(--primary)', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🗄️ Medical Records Department (MRD)</span>
              <span className="badge badge-primary" style={{ fontSize: '11px', padding: '4px 10px' }}>ICD-10 & ICD-11 Standardized</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
              Physical & digital medical records archive, clinical disease coding, quality audit monitoring, and patient confidentiality.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>🔒 DISHA & HIPAA Compliant</span>
          </div>
        </div>

        {/* 4 MRD Pillar Sub-Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setMrdTab('coding')}
            className={`btn ${mrdTab === 'coding' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🏷️ Clinical Disease Coding (ICD-10 & ICD-11)
          </button>
          <button
            onClick={() => setMrdTab('storage')}
            className={`btn ${mrdTab === 'storage' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📦 Medical Records Storage & Tracking
          </button>
          <button
            onClick={() => setMrdTab('quality')}
            className={`btn ${mrdTab === 'quality' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📋 Record Quality Audit & Monitoring
          </button>
          <button
            onClick={() => setMrdTab('confidentiality')}
            className={`btn ${mrdTab === 'confidentiality' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔒 Patient Confidentiality & Legal Access
          </button>
        </div>
      </div>

      {/* PILLAR 1: ICD-10 & ICD-11 CLINICAL CODING */}
      {mrdTab === 'coding' && (
        <div className="grid gap-lg" style={{ gridTemplateColumns: '1.8fr 1.2fr' }}>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)' }}>🏷️ WHO Clinical Disease Coding (ICD-10 & ICD-11 Search)</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>Search WHO disease classification database to link billing & insurance diagnosis codes.</p>
              </div>

              {/* Version filter */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => setIcdVersionFilter('all')} className={`btn ${icdVersionFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '2px 8px', fontSize: '10px' }}>All Codes</button>
                <button onClick={() => setIcdVersionFilter('icd10')} className={`btn ${icdVersionFilter === 'icd10' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '2px 8px', fontSize: '10px' }}>ICD-10</button>
                <button onClick={() => setIcdVersionFilter('icd11')} className={`btn ${icdVersionFilter === 'icd11' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '2px 8px', fontSize: '10px' }}>ICD-11</button>
              </div>
            </div>

            <div className="flex gap-sm" style={{ marginTop: '12px' }}>
              <input
                type="text"
                placeholder="Search ICD-10/11 database (e.g. Hypertension, BA00, Asthma, E11)..."
                className="form-input"
                value={mrdSearchTerm}
                onChange={(e) => setMrdSearchTerm(e.target.value)}
              />
            </div>

            {/* ICD results list */}
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto' }}>
              {filteredIcdList.map((icd, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedIcdCode(`${icd.code} (${icd.title}) [${icd.version}]`);
                    addToast('info', `Selected ${icd.version} Code: ${icd.code}`);
                  }}
                  style={{
                    padding: '12px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: selectedIcdCode.includes(icd.code) ? 'rgba(37,99,235,0.08)' : 'var(--bg-card)',
                    borderColor: selectedIcdCode.includes(icd.code) ? 'var(--primary)' : 'var(--border)'
                  }}
                >
                  <div className="flex justify-between font-semibold" style={{ alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: 'monospace', color: 'var(--primary)', fontWeight: 800, fontSize: '14px' }}>{icd.code}</span>
                      <span className={`badge ${icd.version === 'ICD-11' ? 'badge-success' : 'badge-primary'}`} style={{ fontSize: '10px', padding: '2px 6px' }}>{icd.version}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{icd.chapter}</span>
                  </div>
                  <div style={{ fontSize: '13px', marginTop: '6px', fontWeight: 600 }}>{icd.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Settle ICD link to patient */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)' }}>🔗 Assign Code to Patient Medical Record</h3>
            
            <div style={{ backgroundColor: 'var(--bg-muted)', padding: '14px', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Selected ICD Diagnosis Code:</div>
              <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '14px', marginTop: '4px', fontFamily: 'monospace' }}>
                {selectedIcdCode || 'No code selected from list'}
              </div>
            </div>

            <form onSubmit={handleAssignMrdCode} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Select Target Patient UHID</label>
                <select
                  className="form-input"
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                >
                  {(patients || branchPatients).map((p: any) => (
                    <option key={p.id} value={p.id}>{p.name} (UHID: {p.id})</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary" disabled={!selectedIcdCode} style={{ width: '100%', padding: '12px', fontWeight: 800 }}>
                💾 Commit Code to Patient Record
              </button>
            </form>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: 'auto', fontSize: '11px', color: 'var(--text-muted)' }}>
              <strong>Clinical Audit Rules:</strong>
              <ul style={{ paddingLeft: '16px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>All diagnosis code assignments generate audit trail records.</li>
                <li>Insurance claim verification requires valid ICD-10 or ICD-11 codes.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 2: STORAGE & TRACKING OF MEDICAL RECORDS */}
      {mrdTab === 'storage' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)' }}>📦 Physical File Storage, Shelf Location & Loan Out Tracking</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>Track paper medical files in physical archive racks & digital encrypted vaults.</p>
            </div>
            <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => {
              setMrdArchives(prev => [...prev, { id: `MRD-2026-004`, patientName: 'New Archived Record', uhid: `PX-2026-${Math.floor(9044 + Math.random() * 90)}`, fileRack: 'Rack D-01', shelfNo: 'Shelf 2', status: 'Archived', accessLevel: 'Restricted' }]);
              addToast('success', 'Registered New File Storage Location in MRD Archive!');
            }}>
              ➕ Register Physical File Location
            </button>
          </div>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Archive File ID</th>
                  <th>Patient Name</th>
                  <th>UHID</th>
                  <th>Physical Storage Rack</th>
                  <th>Shelf Location</th>
                  <th>Current Tracking Status</th>
                  <th>Access Permission</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mrdArchives.map((arc) => (
                  <tr key={arc.id}>
                    <td className="font-semibold">{arc.id}</td>
                    <td style={{ fontWeight: 700 }}>{arc.patientName}</td>
                    <td style={{ color: 'var(--primary)', fontFamily: 'monospace' }}>{arc.uhid}</td>
                    <td><strong>{arc.fileRack}</strong></td>
                    <td>{arc.shelfNo}</td>
                    <td>
                      <span className={`badge ${arc.status.includes('Loan') ? 'badge-warning' : arc.status.includes('Digitized') ? 'badge-success' : 'badge-primary'}`}>
                        {arc.status}
                      </span>
                    </td>
                    <td><span className="badge badge-secondary">{arc.accessLevel}</span></td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('info', `Issued File Loan Voucher for ${arc.id}`)}>
                        📋 Loan File
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PILLAR 3: RECORD QUALITY AUDIT & MONITORING */}
      {mrdTab === 'quality' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>📋 Medical Record Quality Monitoring & Completeness Audit</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '16px' }}>Automated quality audit checking for missing signatures, incomplete discharge summaries, and consent forms.</p>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Audit ID</th>
                  <th>Medical Record Chart</th>
                  <th>Completeness Score</th>
                  <th>Discharge Summary Status</th>
                  <th>Informed Consent Check</th>
                  <th>Quality Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {qualityAudits.map((aud) => (
                  <tr key={aud.id}>
                    <td className="font-semibold">{aud.id}</td>
                    <td style={{ fontWeight: 600 }}>{aud.chartName}</td>
                    <td><strong style={{ color: parseInt(aud.score) >= 90 ? 'var(--success)' : 'var(--warning)' }}>{aud.score}</strong></td>
                    <td>{aud.dischargeSummaryStatus}</td>
                    <td><span className="badge badge-success">{aud.consentForm}</span></td>
                    <td>
                      <span className={`badge ${aud.status === 'Passed' ? 'badge-success' : 'badge-danger'}`}>
                        {aud.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-primary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('success', `Sent Quality Rectification Alert to Consultant for ${aud.id}`)}>
                        🔔 Notify Consultant
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PILLAR 4: PATIENT CONFIDENTIALITY CONTROLS */}
      {mrdTab === 'confidentiality' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>🔒 Patient Confidentiality Controls & DISHA/HIPAA Access Locks</h3>
          
          <div className="grid grid-2" style={{ gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>🔐 Digital Encryption & Anonymization</h4>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>All patient health records (EHR/EMR) are stored using 256-bit AES cryptographic encryption.</p>
              <button className="btn btn-success" style={{ marginTop: '12px', fontSize: '11px' }} onClick={() => addToast('success', 'Verified 256-Bit Cryptographic Vault Integrity!')}>
                🛡️ Verify Encrypted Records Vault
              </button>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', borderLeft: '4px solid var(--warning)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>📜 Legal Hold & Law Enforcement Request</h4>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Place temporary legal locks on medical records requested by judicial courts or forensic auditors.</p>
              <button className="btn btn-warning" style={{ fontSize: '11px', marginTop: '12px' }} onClick={() => addToast('warning', 'Placed Legal Hold Lock on Record #MRD-2026-002')}>
                ⚖️ Apply Legal Hold Lock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
