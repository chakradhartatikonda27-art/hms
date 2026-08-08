import React from 'react';
import { Search, FileText, Shield, Database, CheckCircle2, AlertTriangle, Lock, Tag, Clock, FolderArchive, Sparkles, UserCheck, Merge, Download, Share2, Eye, FileCheck, Filter, Layers, ArrowRight } from 'lucide-react';

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

  const [mrdTab, setMrdTab] = React.useState<'pipeline' | 'timeline' | 'coding' | 'ai_summary' | 'storage' | 'quality' | 'ocr_pdf' | 'merge_tool' | 'sharing_roi' | 'confidentiality' | 'retention'>('pipeline');
  const [mrdSearchTerm, setMrdSearchTerm] = React.useState('');
  const [icdVersionFilter, setIcdVersionFilter] = React.useState<'all' | 'icd10' | 'icd11'>('all');
  const [selectedPatientForTimeline, setSelectedPatientForTimeline] = React.useState<string>('PX-2026-9041');
  const [showAiSummaryModal, setShowAiSummaryModal] = React.useState(false);
  const [showMergeModal, setShowMergeModal] = React.useState(false);
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [mergePrimaryId, setMergePrimaryId] = React.useState('PX-2026-9041');
  const [mergeDuplicateId, setMergeDuplicateId] = React.useState('PX-2026-9099');

  const ICD_DISEASE_DB = [
    { code: 'I10', title: 'Essential (primary) hypertension', version: 'ICD-10', chapter: 'Circulatory System' },
    { code: 'BA00', title: 'Essential hypertension', version: 'ICD-11', chapter: '01 Circulatory System' },
    { code: 'E11.9', title: 'Type 2 diabetes mellitus without complications', version: 'ICD-10', chapter: 'Endocrine & Metabolic' },
    { code: '5A11', title: 'Type 2 diabetes mellitus', version: 'ICD-11', chapter: '05 Endocrine & Metabolic' },
    { code: 'J45.909', title: 'Unspecified asthma, uncomplicated', version: 'ICD-10', chapter: 'Respiratory System' },
    { code: 'CA23', title: 'Asthma', version: 'ICD-11', chapter: '12 Respiratory System' },
    { code: 'I21.9', title: 'Acute myocardial infarction, unspecified', version: 'ICD-10', chapter: 'Circulatory System' },
    { code: 'BA41', title: 'Acute myocardial infarction', version: 'ICD-11', chapter: '01 Circulatory System' },
    { code: 'K35.80', title: 'Unspecified acute appendicitis', version: 'ICD-10', chapter: 'Digestive System' },
    { code: 'DB10', title: 'Acute appendicitis', version: 'ICD-11', chapter: '13 Digestive System' }
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

  // 8-Step MRD Lifecycle Stages
  const lifecycleSteps = [
    { step: 1, title: 'Patient Visit', icon: '🏥', count: 18, desc: 'OPD / IPD / STAT Arrival' },
    { step: 2, title: 'Medical Records Created', icon: '📄', count: 14, desc: 'EHR / EMR Generation' },
    { step: 3, title: 'Clinical Coding', icon: '🏷️', count: 11, desc: 'ICD-10 / ICD-11 Mapping' },
    { step: 4, title: 'Quality Review', icon: '📋', count: 9, desc: 'Completeness Audit' },
    { step: 5, title: 'Doctor Verification', icon: '👨‍⚕️', count: 8, desc: 'Digital Signature Lock' },
    { step: 6, title: 'Secure Storage', icon: '🔒', count: 42, desc: '256-Bit Vault & Rack A-04' },
    { step: 7, title: 'Retrieval & Sharing', icon: '📤', count: 6, desc: 'ROI Portal Token Link' },
    { step: 8, title: 'Archive / Retention', icon: '📜', count: 120, desc: '7-Year Archival Rule' }
  ];

  // 360° Timeline Events for selected patient
  const patientTimelineEvents = [
    { date: '2026-08-08 10:15 AM', type: 'OPD Consultation', title: 'Cardiology Consultation', dept: 'OPD Desk', doctor: 'Dr. Sandeep Mehta', details: 'Chief Complaint: Retro-sternal pressure. Prescribe Telmisartan 40mg PO QD, Lipvas 10mg HS.', icdCode: 'I10 (Hypertension)' },
    { date: '2026-08-08 10:45 AM', type: 'Pathology Lab', title: 'Complete Blood Count & Lipid Profile', dept: 'Pathology Lab', doctor: 'Dr. Ananya Ray', details: 'NABL Report Verified. Cholesterol: 210 mg/dL, Hb: 14.2 g/dL. Delta check passed.', icdCode: 'E11.9 (Hyperlipidemia)' },
    { date: '2026-08-08 11:30 AM', type: 'Radiology Scan', title: 'Chest X-Ray PA View & 2D Echo', dept: 'Radiology PACS', doctor: 'Dr. Rajesh K', details: 'PACS Study RAD-801: Preserved ejection fraction (62%), no pulmonary congestion.', icdCode: 'I21.9' },
    { date: '2026-08-07 02:00 PM', type: 'ICU Admission', title: 'CCU Telemetry Bed B-2 Transfer', dept: 'ICU Suite', doctor: 'Dr. Sandeep Mehta', details: 'Admitted for continuous ST-segment monitoring. Net Fluid Intake: +450mL. GCS Score: 15/15.', icdCode: 'I10' },
    { date: '2026-08-06 09:00 AM', type: 'OT Surgery', title: 'Coronary Angiography (CAG)', dept: 'OT Suite 1', doctor: 'Dr. Sandeep Mehta', details: 'Single vessel stenosis (LAD 65%). Implant St-Jude Stent SN-88412-A.', icdCode: 'I21.9' },
    { date: '2026-08-05 08:30 PM', type: 'Emergency STAT', title: 'Triage ESI Level 2 Admission', dept: 'Emergency Desk', doctor: 'Dr. Alok Verma', details: 'UHID PX-2026-9041 registered via Aadhaar OTP validation. Vital BP: 160/100 mmHg.', icdCode: 'I10' }
  ];

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
              <span>🗄️ Medical Records Department (MRD Enterprise Suite)</span>
              <span className="badge badge-primary" style={{ fontSize: '11px', padding: '4px 10px' }}>⭐ 8-Step Lifecycle & AI Coding Ready</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
              End-to-end Medical Record Lifecycle: Patient Visit ➔ Records Created ➔ Clinical Coding ➔ Quality Review ➔ Doctor Verification ➔ Secure Storage ➔ Retrieval & Sharing ➔ Archival.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowAiSummaryModal(true)}>
              🤖 AI Medical Summary
            </button>
            <button className="btn btn-secondary" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowMergeModal(true)}>
              🔀 Merge Duplicate Patient
            </button>
            <button className="btn btn-success" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowShareModal(true)}>
              🔗 Share Record (ROI Portal)
            </button>
          </div>
        </div>

        {/* 8-Step Lifecycle Visual Pipeline Flow Bar */}
        <div style={{ marginTop: '20px', background: 'var(--bg-card)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔄 8-Step Medical Record Operational Lifecycle Flow</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {lifecycleSteps.map((s, idx) => (
              <React.Fragment key={s.step}>
                <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-muted)', border: '1px solid var(--border)', minWidth: '125px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>STEP {s.step}</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, marginTop: '2px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{s.icon}</span>
                    <span>{s.title}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--primary)', marginTop: '4px', fontWeight: 700 }}>{s.count} Active Records</div>
                </div>

                {idx < lifecycleSteps.length - 1 && (
                  <span style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 800 }}>➔</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setMrdTab('pipeline')}
            className={`btn ${mrdTab === 'pipeline' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔄 Operational Lifecycle Board
          </button>
          <button
            onClick={() => setMrdTab('timeline')}
            className={`btn ${mrdTab === 'timeline' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            ⏱️ 360° Patient Medical Timeline
          </button>
          <button
            onClick={() => setMrdTab('coding')}
            className={`btn ${mrdTab === 'coding' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🏷️ AI ICD-10 & ICD-11 Coding
          </button>
          <button
            onClick={() => setMrdTab('quality')}
            className={`btn ${mrdTab === 'quality' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📋 Record Quality & Score (96%)
          </button>
          <button
            onClick={() => setMrdTab('storage')}
            className={`btn ${mrdTab === 'storage' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📦 File Storage Racks & Tracking
          </button>
          <button
            onClick={() => setMrdTab('ocr_pdf')}
            className={`btn ${mrdTab === 'ocr_pdf' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔍 Smart OCR & Document Reader
          </button>
          <button
            onClick={() => setMrdTab('sharing_roi')}
            className={`btn ${mrdTab === 'sharing_roi' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📤 Release of Information (ROI)
          </button>
          <button
            onClick={() => setMrdTab('confidentiality')}
            className={`btn ${mrdTab === 'confidentiality' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔒 DISHA Confidentiality & Legal Lock
          </button>
          <button
            onClick={() => setMrdTab('retention')}
            className={`btn ${mrdTab === 'retention' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📜 Data Retention & Archiving Policy
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: OPERATIONAL LIFECYCLE PIPELINE BOARD */}
      {mrdTab === 'pipeline' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>
            🔄 Active Medical Records Moving Through 8-Step Lifecycle
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Real-time status tracking of all patient records from initial visit registration to permanent archival.
          </p>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Medical Record ID</th>
                  <th>Patient Name & UHID</th>
                  <th>Department Source</th>
                  <th>Current Lifecycle Step</th>
                  <th>ICD Coding Status</th>
                  <th>Quality Review</th>
                  <th>Doctor Verification</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(patients || branchPatients).slice(0, 5).map((p: any, idx: number) => (
                  <tr key={p.id || idx}>
                    <td className="font-semibold">MRD-2026-00{idx + 1}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{p.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--primary)', fontFamily: 'monospace' }}>{p.id}</div>
                    </td>
                    <td><span className="badge badge-primary">OPD & IPD Combined</span></td>
                    <td>
                      <span className="badge badge-success" style={{ fontSize: '11px', padding: '4px 8px' }}>
                        Step {idx + 3}: {lifecycleSteps[idx + 2]?.title || 'Secure Storage'}
                      </span>
                    </td>
                    <td><span className="badge badge-warning">I10 / BA00 Linked</span></td>
                    <td><strong style={{ color: 'var(--success)' }}>96% Passed</strong></td>
                    <td><span className="badge badge-success">✓ Verified & Digitally Signed</span></td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('info', `Advanced Record MRD-2026-00${idx + 1} to Next Step`)}>
                        ➔ Advance Step
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: 360° PATIENT MEDICAL TIMELINE */}
      {mrdTab === 'timeline' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>⏱️ Complete 360° Chronological Patient Medical Timeline</span>
                <span className="badge badge-success">All Departments Consolidated</span>
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Single unified EHR/EMR view of all OPD consultations, IPD admissions, ICU vitals, OT surgeries, Lab reports, and Prescriptions.
              </p>
            </div>

            {/* Select Patient Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>Select Patient:</span>
              <select
                value={selectedPatientForTimeline}
                onChange={(e) => setSelectedPatientForTimeline(e.target.value)}
                className="form-input"
                style={{ width: '240px', height: '36px', fontSize: '12px', fontWeight: 700 }}
              >
                {(patients || branchPatients).map((p: any) => (
                  <option key={p.id} value={p.id}>{p.name} (UHID: {p.id})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Timeline Visual Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '24px', borderLeft: '3px solid var(--primary)' }}>
            {patientTimelineEvents.map((ev, idx) => (
              <div key={idx} style={{ position: 'relative', background: 'var(--bg-card)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
                {/* Timeline Bullet */}
                <div style={{ position: 'absolute', left: '-33px', top: '20px', width: '15px', height: '15px', borderRadius: '50%', background: 'var(--primary)', border: '3px solid var(--bg-card)' }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="badge badge-primary" style={{ fontSize: '11px', fontWeight: 800 }}>{ev.type}</span>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>{ev.title}</h4>
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>📅 {ev.date}</div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <div><strong>Department:</strong> {ev.dept}</div>
                  <div><strong>Attending Doctor:</strong> {ev.doctor}</div>
                  <div><strong>Linked ICD Code:</strong> <span style={{ fontFamily: 'monospace', color: 'var(--primary)', fontWeight: 700 }}>{ev.icdCode}</span></div>
                </div>

                <div style={{ marginTop: '10px', padding: '10px 14px', background: 'var(--bg-muted)', borderRadius: '6px', fontSize: '12px', lineHeight: '1.5' }}>
                  {ev.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ICD-10 & ICD-11 CLINICAL CODING */}
      {mrdTab === 'coding' && (
        <div className="grid gap-lg" style={{ gridTemplateColumns: '1.8fr 1.2fr' }}>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)' }}>🏷️ WHO Clinical Disease Coding (ICD-10 & ICD-11 Assistant)</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>AI-assisted search across WHO disease classification database to link billing & insurance diagnosis codes.</p>
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

      {/* SUB-TAB 4: RECORD QUALITY & COMPLETENESS SCORE */}
      {mrdTab === 'quality' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>📋 Medical Record Quality Monitoring & Completeness Score</h3>
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

      {/* SUB-TAB 5: PHYSICAL FILE STORAGE & TRACKING */}
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

      {/* SUB-TAB 6: SMART DOCUMENT OCR & PDF READER */}
      {mrdTab === 'ocr_pdf' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>🔍 Smart Document OCR & Full-Text PDF Search</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '16px' }}>Upload scanned physical paper records and search text inside PDF files using optical character recognition.</p>
          <div style={{ border: '2px dashed var(--primary)', padding: '30px', textAlign: 'center', borderRadius: '10px', background: 'rgba(37,99,235,0.03)' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>📄 Drag & Drop Scanned Medical PDF Records or Click to Upload</span>
            <div style={{ marginTop: '12px' }}>
              <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => addToast('success', 'Extracted 14 pages of text via OCR for Patient PX-2026-9041!')}>
                📸 Run AI OCR Text Extraction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: RELEASE OF INFORMATION (ROI) */}
      {mrdTab === 'sharing_roi' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>📤 Release of Information (ROI) & Third-Party Sharing</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '16px' }}>Generate secure, time-limited, encrypted links for insurance providers, legal courts, or patient portals.</p>
          <button className="btn btn-success" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowShareModal(true)}>
            🔗 Generate Secure Shareable Link
          </button>
        </div>
      )}

      {/* SUB-TAB 8: PATIENT CONFIDENTIALITY & LEGAL HOLD */}
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

      {/* SUB-TAB 9: RETENTION & ARCHIVING POLICIES */}
      {mrdTab === 'retention' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>📜 Data Retention Policies & Automatic Archiving</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '16px' }}>Configure retention rules (e.g., Adult records 7 years, Pediatric records until age 25, MLC cases permanent).</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => addToast('info', 'Automated Archival Rule Executed: Archived 120 Medical Charts older than 7 years.')}>
            🔄 Run Archival Retention Pipeline
          </button>
        </div>
      )}

      {/* MODAL 1: AI MEDICAL RECORD SUMMARY */}
      {showAiSummaryModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '520px', maxWidth: '90%' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🤖 AI Clinical Medical Record Summary</span>
            </h3>
            <div style={{ padding: '16px', background: 'rgba(37,99,235,0.06)', borderRadius: '8px', margin: '14px 0', fontSize: '12px', lineHeight: '1.6' }}>
              <strong>Patient Summary (Aarav Sharma - UHID PX-2026-9041):</strong>
              <p style={{ marginTop: '6px' }}>
                48-year-old male with a history of essential hypertension (I10) and hyperlipidemia. Admitted on Aug 5, 2026 via Emergency STAT following retrosternal chest pain. Underwent successful Coronary Angiography (CAG) with St-Jude Stent placement in LAD. Post-op recovery in CCU stable. Prescribed Telmisartan 40mg PO QD & Lipvas 10mg HS. Discharge summary complete.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary" onClick={() => setShowAiSummaryModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { addToast('success', 'Exported AI Clinical Summary PDF!'); setShowAiSummaryModal(false); }}>📄 Export PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DUPLICATE PATIENT MERGE TOOL */}
      {showMergeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>🔀 Duplicate Patient Record Merge Tool</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Merge two duplicate patient UHIDs while preserving full audit history and visit logs.</p>
            
            <div style={{ margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Primary Master UHID (Keep Active)</label>
                <input type="text" className="form-input" value={mergePrimaryId} onChange={(e) => setMergePrimaryId(e.target.value)} />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Duplicate UHID (Merge & Retire)</label>
                <input type="text" className="form-input" value={mergeDuplicateId} onChange={(e) => setMergeDuplicateId(e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary" onClick={() => setShowMergeModal(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => { addToast('success', `Merged ${mergeDuplicateId} into Master Record ${mergePrimaryId}!`); setShowMergeModal(false); }}>🔀 Execute Merge</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: RELEASE OF INFORMATION (ROI) SHARING */}
      {showShareModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>🔗 Release of Information (ROI) Share Portal</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Generate a 72-hour time-limited encrypted link with download passcode.</p>

            <div style={{ padding: '14px', background: 'var(--bg-muted)', borderRadius: '8px', margin: '14px 0', fontSize: '11px', fontFamily: 'monospace' }}>
              https://siyancare.health/roi/share/token-88419024?expires=72h
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary" onClick={() => setShowShareModal(false)}>Close</button>
              <button className="btn btn-success" onClick={() => { addToast('success', 'Copied Encrypted ROI Share Link to Clipboard!'); setShowShareModal(false); }}>📋 Copy Encrypted Link</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
