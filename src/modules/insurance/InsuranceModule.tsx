import React from 'react';
import { ShieldCheck, FileCheck, FileText, Clock, AlertTriangle, CheckCircle2, DollarSign, Upload, Sparkles, Building2, UserCheck, RefreshCw, QrCode, Search, ChevronRight, Award, Lock, Smartphone } from 'lucide-react';

export interface InsuranceModuleProps {
  [key: string]: any;
}

export const InsuranceModule: React.FC<InsuranceModuleProps> = (props) => {
  const {
    activeTab = 'insurance',
    setActiveTab = () => {},
    addToast = () => {},
    patients = [],
    insuranceClaims = [],
    setInsuranceClaims = () => {},
    handleApproveClaim = () => {},
    ...rest
  } = props;

  const [insTab, setInsTab] = React.useState<'workflow' | 'cashless_preauth' | 'claims_lifecycle' | 'policy_verifier' | 'package_copay' | 'govt_schemes' | 'ocr_documents' | 'tpa_sla' | 'edition_mode' | 'ai_fraud'>('workflow');
  const [selectedSchemeFilter, setSelectedSchemeFilter] = React.useState('all');
  const [showPreAuthModal, setShowPreAuthModal] = React.useState(false);
  const [showQrCardModal, setShowQrCardModal] = React.useState(false);

  // Pre-Auth Form State
  const [preAuthPatient, setPreAuthPatient] = React.useState('Aarav Sharma');
  const [preAuthInsurance, setPreAuthInsurance] = React.useState('Star Health Allied Insurance');
  const [preAuthTpa, setPreAuthTpa] = React.useState('Family Health Plan TPA');
  const [preAuthAmount, setPreAuthAmount] = React.useState('125000');
  const [preAuthDiagnosis, setPreAuthDiagnosis] = React.useState('Acute Appendicitis (ICD K35.8)');

  // 11-Step Insurance Claim Lifecycle Workflow Steps
  const insurancePipelineSteps = [
    { step: 1, title: 'Patient Registration', icon: '📝', count: 18, desc: 'Policy Tagging' },
    { step: 2, title: 'Policy Verification', icon: '🔍', count: 16, desc: 'Real-Time Eligibility' },
    { step: 3, title: 'Coverage Validation', icon: '🛡️', count: 16, desc: 'Package Mapping' },
    { step: 4, title: 'Pre-Authorization', icon: '📄', count: 6, desc: 'Online Portal Submit' },
    { step: 5, title: 'Treatment Capture', icon: '🩺', count: 14, desc: 'Auto Charge Capture' },
    { step: 6, title: 'Claim Generation', icon: '⚙️', count: 14, desc: 'NHCX Format' },
    { step: 7, title: 'Doc Submission', icon: '📎', count: 12, desc: 'OCR Document Check' },
    { step: 8, title: 'TPA Approval', icon: '✅', count: 12, desc: 'SLA Tracking' },
    { step: 9, title: 'Claim Settlement', icon: '💰', count: 10, desc: 'Bank Payout' },
    { step: 10, title: 'Patient Discharge', icon: '🏥', count: 10, desc: 'Co-Pay Settlement' },
    { step: 11, title: 'Financial Recon', icon: '📊', count: 10, desc: 'Bank Audit' }
  ];

  // Active Insurance Claims Ledger
  const [claimsList, setClaimsList] = React.useState([
    { id: 'CLM-2026-901', patient: 'Aarav Sharma', uhid: 'PX-2026-9041', company: 'Star Health', tpa: 'FHPL TPA', scheme: 'Private Cashless', amount: 125000, preAuthStatus: 'Approved', claimStatus: 'In Review', copay: '10% (₹12,500)', date: '2026-08-08' },
    { id: 'CLM-2026-902', patient: 'Sunita Devi', uhid: 'PX-2026-8812', company: 'Ayushman Bharat (PMJAY)', tpa: 'State NHA', scheme: 'Government Scheme', amount: 85000, preAuthStatus: 'Approved', claimStatus: 'Settled', copay: '0% (100% Free)', date: '2026-08-07' },
    { id: 'CLM-2026-903', patient: 'Rajesh V', uhid: 'PX-2026-7740', company: 'HDFC ERGO Health', tpa: 'Medi Assist TPA', scheme: 'Corporate Group', amount: 210000, preAuthStatus: 'Pending Info', claimStatus: 'Pre-Auth Raised', copay: '₹5,000 Deductible', date: '2026-08-08' },
    { id: 'CLM-2026-904', patient: 'Priya Verma', uhid: 'PX-2026-1104', company: 'CGHS Central Govt', tpa: 'CGHS Portal', scheme: 'Government Scheme', amount: 48000, preAuthStatus: 'Approved', claimStatus: 'Settled', copay: '0%', date: '2026-08-05' }
  ]);

  const handlePreAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClaim = {
      id: `CLM-2026-${Math.floor(905 + Math.random() * 90)}`,
      patient: preAuthPatient,
      uhid: 'PX-2026-NEW',
      company: preAuthInsurance,
      tpa: preAuthTpa,
      scheme: 'Private Cashless',
      amount: parseFloat(preAuthAmount),
      preAuthStatus: 'Submitted to TPA',
      claimStatus: 'Pre-Auth Raised',
      copay: '10%',
      date: new Date().toISOString().split('T')[0]
    };
    setClaimsList([newClaim, ...claimsList]);
    addToast('success', `Submitted Pre-Authorization Request #${newClaim.id} of ₹${newClaim.amount} to ${newClaim.tpa}!`);
    setShowPreAuthModal(false);
  };

  return (
    <div className="flex flex-col gap-lg">
      {/* Insurance Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)', borderLeft: '6px solid var(--primary)', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🛡️ Enterprise Insurance, TPA & PMJAY Ayushman Engine (4.17)</span>
              <span className="badge badge-primary" style={{ fontSize: '11px', padding: '4px 10px' }}>⭐ NHCX & ABDM Ready</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
              1-Click Policy Verification, Online Pre-Authorization, Ayushman Bharat PMJAY Integration, TPA SLA Tracking, and AI Fraud Detection.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" style={{ fontSize: '12px', fontWeight: 800 }} onClick={() => setShowPreAuthModal(true)}>
              📄 Raise Online Pre-Auth
            </button>
            <button className="btn btn-secondary" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowQrCardModal(true)}>
              🔍 Verify Digital Insurance QR
            </button>
          </div>
        </div>

        {/* 11-Step Insurance Operational Workflow Pipeline Flow Bar */}
        <div style={{ marginTop: '20px', background: 'var(--bg-card)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔄 11-Step Insurance Claim Lifecycle Pipeline Flow</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {insurancePipelineSteps.map((s, idx) => (
              <React.Fragment key={s.step}>
                <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-muted)', border: '1px solid var(--border)', minWidth: '125px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>STEP {s.step}</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, marginTop: '2px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{s.icon}</span>
                    <span>{s.title}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--primary)', marginTop: '4px', fontWeight: 700 }}>{s.count} Claims</div>
                </div>

                {idx < insurancePipelineSteps.length - 1 && (
                  <span style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 800 }}>➔</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 10 Navigation Sub-Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setInsTab('workflow')}
            className={`btn ${insTab === 'workflow' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔄 Claim Lifecycle Board
          </button>
          <button
            onClick={() => setInsTab('cashless_preauth')}
            className={`btn ${insTab === 'cashless_preauth' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📄 Cashless Admissions & Pre-Auth
          </button>
          <button
            onClick={() => setInsTab('claims_lifecycle')}
            className={`btn ${insTab === 'claims_lifecycle' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            💰 Active Claims & Bank Settlement
          </button>
          <button
            onClick={() => setInsTab('policy_verifier')}
            className={`btn ${insTab === 'policy_verifier' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔍 1-Click Policy Verification
          </button>
          <button
            onClick={() => setInsTab('package_copay')}
            className={`btn ${insTab === 'package_copay' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🧮 Package Mapping & Co-Pay Rules
          </button>
          <button
            onClick={() => setInsTab('govt_schemes')}
            className={`btn ${insTab === 'govt_schemes' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🏛️ PMJAY, CGHS & ECHS Schemes
          </button>
          <button
            onClick={() => setInsTab('ocr_documents')}
            className={`btn ${insTab === 'ocr_documents' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📎 OCR Missing Document Scanner
          </button>
          <button
            onClick={() => setInsTab('tpa_sla')}
            className={`btn ${insTab === 'tpa_sla' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            ⏱️ TPA SLA Performance & TAT
          </button>
          <button
            onClick={() => setInsTab('edition_mode')}
            className={`btn ${insTab === 'edition_mode' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🏢 Multi-Hospital SaaS Edition
          </button>
          <button
            onClick={() => setInsTab('ai_fraud')}
            className={`btn ${insTab === 'ai_fraud' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🤖 AI Fraud & Rejection Predictor
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: CLAIM LIFECYCLE BOARD */}
      {insTab === 'workflow' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>
            🔄 Active Hospital Claims Moving Through 11-Step Lifecycle
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Real-time status tracking from policy verification to cashless pre-authorization, TPA approval, and financial bank reconciliation.
          </p>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Claim ID</th>
                  <th>Patient Name (UHID)</th>
                  <th>Insurance & TPA Name</th>
                  <th>Scheme Type</th>
                  <th>Claim Amount</th>
                  <th>Pre-Auth Status</th>
                  <th>Claim Lifecycle Stage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {claimsList.map((c, idx) => (
                  <tr key={c.id}>
                    <td className="font-semibold">{c.id}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{c.patient}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{c.uhid}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{c.company}</div>
                      <div style={{ fontSize: '10px', color: 'var(--primary)' }}>{c.tpa}</div>
                    </td>
                    <td><span className="badge badge-primary">{c.scheme}</span></td>
                    <td style={{ fontWeight: 800, color: 'var(--primary)' }}>₹{c.amount.toLocaleString()}</td>
                    <td><span className="badge badge-success">{c.preAuthStatus}</span></td>
                    <td>
                      <span className="badge badge-warning" style={{ fontSize: '11px', padding: '4px 8px' }}>
                        Step {idx + 4}: {insurancePipelineSteps[idx + 3]?.title || 'Claim Settlement'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('info', `Viewing Claim File ${c.id}`)}>
                        📄 View Claim File
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CASHLESS ADMISSIONS & PRE-AUTH */}
      {insTab === 'cashless_preauth' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>📄 Online Cashless Admissions & Pre-Authorization Portal</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Submit electronic pre-auth requests directly to TPA portals with medical justifications and cost estimates.</p>
            </div>
            <button className="btn btn-primary" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowPreAuthModal(true)}>
              ➕ Raise Online Pre-Auth Request
            </button>
          </div>

          <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', fontSize: '12px' }}>
            <div>• <strong>Star Health FHPL Pre-Auth:</strong> Request #PA-8801 for Acute Appendicitis (₹1,25,000) - <strong>APPROVED</strong></div>
            <div>• <strong>HDFC ERGO Medi Assist:</strong> Request #PA-9014 for Total Knee Replacement (₹2,10,000) - <strong>PENDING DOCS</strong></div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ACTIVE CLAIMS & BANK SETTLEMENT */}
      {insTab === 'claims_lifecycle' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>💰 Claim Settlement & Bank Payment Reconciliation</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Track electronic bank payouts from TPAs and reconcile short settlements or co-payments.</p>
          <button className="btn btn-success" style={{ fontSize: '12px' }} onClick={() => addToast('success', 'Reconciled TPA Bank Deposit of ₹4,80,000 for 4 Settled Claims!')}>
            💸 Reconcile Bank Deposit File
          </button>
        </div>
      )}

      {/* SUB-TAB 4: 1-CLICK POLICY VERIFICATION */}
      {insTab === 'policy_verifier' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🔍 Real-Time 1-Click Policy & Coverage Verification</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Instant API integration with Star Health, ICICI Lombard, Max Bupa, and NHA Portals to check active policy sum insured.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => addToast('success', 'Verified Policy #SH-884192: Active Sum Insured ₹5,00,000!')}>
            🔍 Run Real-Time Policy API Check
          </button>
        </div>
      )}

      {/* SUB-TAB 5: PACKAGE MAPPING & CO-PAY RULES */}
      {insTab === 'package_copay' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🧮 Insurance Package Mapping & Automatic Co-Payment Split</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Auto-calculate room rent capping limits, co-payment percentages, and patient out-of-pocket shares.</p>
          <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total Approved Treatment Charge:</span><strong>₹1,25,000</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}><span>Insurance Approved Share (90%):</span><strong style={{ color: 'var(--success)' }}>₹1,12,500</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}><span>Patient Mandatory Co-Pay Share (10%):</span><strong style={{ color: 'var(--danger)' }}>₹12,500</strong></div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: PMJAY, CGHS & ECHS SCHEMES */}
      {insTab === 'govt_schemes' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🏛️ Government Health Schemes (Ayushman Bharat PMJAY, CGHS, ECHS)</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Manage 100% cashless treatment packages under PMJAY National Health Authority and CGHS rates.</p>
          <button className="btn btn-success" style={{ fontSize: '12px' }} onClick={() => addToast('success', 'Logged PMJAY Ayushman Beneficiary Token Verification!')}>
            🏛️ Verify Ayushman Golden Card (PMJAY)
          </button>
        </div>
      )}

      {/* SUB-TAB 7: OCR MISSING DOCUMENT SCANNER */}
      {insTab === 'ocr_documents' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📎 AI OCR Missing Document Detector & Digital Archive</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>AI scans pre-auth bundles to detect missing indoor case papers, lab reports, or discharge summaries before TPA submission.</p>
          <button className="btn btn-warning" style={{ fontSize: '12px' }} onClick={() => addToast('info', 'AI Scan Complete: 100% Required Documents Present!')}>
            🔍 Run AI Missing Document Scan
          </button>
        </div>
      )}

      {/* SUB-TAB 8: TPA SLA PERFORMANCE & TAT */}
      {insTab === 'tpa_sla' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>⏱️ TPA SLA Performance & Turnaround Time (TAT) Tracking</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Monitor pre-auth approval TAT (Average: 1.8 Hours) and track delayed claims against TPA SLAs.</p>
          <div style={{ padding: '14px', background: 'var(--bg-muted)', borderRadius: '8px', fontSize: '12px' }}>
            <div>• <strong>FHPL TPA:</strong> Average Pre-Auth TAT 1.4 Hours (100% SLA Met)</div>
            <div>• <strong>Medi Assist TPA:</strong> Average Pre-Auth TAT 2.1 Hours (94% SLA Met)</div>
          </div>
        </div>
      )}

      {/* SUB-TAB 9: MULTI-HOSPITAL SAAS EDITION */}
      {insTab === 'edition_mode' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🏢 Multi-Hospital Enterprise Group Insurance Engine</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Centralized TPA claim processing desk for multi-branch hospital chains and corporate healthcare networks.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => addToast('info', 'Switched to Centralized Multi-Hospital TPA Desk View')}>
            🏢 Activate Enterprise Multi-Branch Desk
          </button>
        </div>
      )}

      {/* SUB-TAB 10: AI FRAUD & REJECTION PREDICTOR */}
      {insTab === 'ai_fraud' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🤖 AI Claim Rejection Predictor & Fraud Prevention</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Machine learning models predict claim rejection risks before submission and alert revenue leakage.</p>
          <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '8px', borderLeft: '4px solid var(--danger)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--danger)' }}>🚨 AI Rejection Risk Alert (Claim #CLM-2026-903)</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              High rejection risk (48%) due to missing initial consultation clinical note for Total Knee Replacement. Upload note to achieve 98% approval chance.
            </p>
          </div>
        </div>
      )}

      {/* PRE-AUTH MODAL */}
      {showPreAuthModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>📄 Raise Online Pre-Authorization Request</h3>
            <form onSubmit={handlePreAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Patient Full Name</label>
                <input type="text" className="form-input" required value={preAuthPatient} onChange={(e) => setPreAuthPatient(e.target.value)} />
              </div>
              <div className="grid grid-2" style={{ gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Insurance Company</label>
                  <input type="text" className="form-input" required value={preAuthInsurance} onChange={(e) => setPreAuthInsurance(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>TPA Desk</label>
                  <input type="text" className="form-input" required value={preAuthTpa} onChange={(e) => setPreAuthTpa(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Diagnosis & ICD Code</label>
                <input type="text" className="form-input" required value={preAuthDiagnosis} onChange={(e) => setPreAuthDiagnosis(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Estimated Cost Package (₹)</label>
                <input type="number" className="form-input" required value={preAuthAmount} onChange={(e) => setPreAuthAmount(e.target.value)} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowPreAuthModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: 800 }}>Submit Pre-Auth to TPA</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
