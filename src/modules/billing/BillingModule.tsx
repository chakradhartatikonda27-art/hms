import React from 'react';
import { DollarSign, FileText, CreditCard, UserCheck, Stethoscope, Bed, FlaskConical, Pill, Share2, Receipt, CheckCircle2, ShieldCheck, Printer, AlertCircle, Sparkles, Calculator, Package, Clock, ArrowRight, ShieldAlert, Zap, Send } from 'lucide-react';

export interface BillingModuleProps {
  [key: string]: any;
}

export const BillingModule: React.FC<BillingModuleProps> = (props) => {
  const {
    activeTab = 'billing',
    setActiveTab = () => {},
    addToast = () => {},
    patients = [],
    setPatients = () => {},
    branchPatients = [],
    branchBeds = [],
    handleSettleBill = () => {},
    handleSettleReferralPayout = () => {},
    handleAddExpense = () => {},
    expenses = [],
    branchExpenses = [],
    ...rest
  } = props;

  const [billingTab, setBillingTab] = React.useState<'workflow' | 'packages' | 'reg_consult' | 'inpatient_compound' | 'lab_billing' | 'pharmacy_billing' | 'referral_sharing' | 'shift_closing' | 'ai_insights' | 'expenses'>('workflow');
  const [expCategory, setExpCategory] = React.useState('Medical Supplies');
  const [expAmount, setExpAmount] = React.useState('');
  const [expDesc, setExpDesc] = React.useState('');
  const [showCostEstimatorModal, setShowCostEstimatorModal] = React.useState(false);
  const [showAiLeakageModal, setShowAiLeakageModal] = React.useState(false);
  const [showShiftClosingModal, setShowShiftClosingModal] = React.useState(false);
  const [estimateProcedure, setEstimateProcedure] = React.useState('Coronary Angiography (CAG)');

  // 9-Step Billing Workflow Pipeline
  const billingWorkflowSteps = [
    { step: 1, title: 'Patient Reg', icon: '👤', count: 18, desc: 'UHID Generated' },
    { step: 2, title: 'Dept Services Added', icon: '🏥', count: 15, desc: 'OPD / Lab / Pharmacy / OT' },
    { step: 3, title: 'Auto Charge Capture', icon: '⚡', count: 12, desc: 'Real-Time Sync' },
    { step: 4, title: 'Insurance Validation', icon: '🛡️', count: 8, desc: 'TPA Pre-Auth' },
    { step: 5, title: 'Real-Time Update', icon: '📊', count: 12, desc: 'Live Bill Ledger' },
    { step: 6, title: 'Payment Collection', icon: '💳', count: 9, desc: 'Cash / UPI / Card' },
    { step: 7, title: 'Invoice Gen', icon: '🧾', count: 7, desc: 'GST Tax Invoice' },
    { step: 8, title: 'Receipt Settlement', icon: '✅', count: 14, desc: 'Final Discharge' },
    { step: 9, title: 'Financial Reports', icon: '📈', count: 1, desc: 'Day-End Audit' }
  ];

  // Packages Dataset
  const treatmentPackages = [
    { id: 'PKG-101', name: 'Master Executive Health Check-up', dept: 'Preventive Care', packagePrice: 4999, actualValue: 8500, savings: '41%', inclusions: 'CBC, Lipid, HbA1c, Chest X-Ray, ECG, Doctor Consult' },
    { id: 'PKG-102', name: 'Standard Maternity Delivery Package', dept: 'Obstetrics & Gynaecology', packagePrice: 45000, actualValue: 62000, savings: '27%', inclusions: 'Normal Delivery, 3-Day Deluxe Room, OT Fee, Pediatric Care' },
    { id: 'PKG-103', name: 'Laparoscopic Cholecystectomy Package', dept: 'General Surgery', packagePrice: 55000, actualValue: 72000, savings: '23%', inclusions: 'Laparoscopic Surgery, 2-Day Private Bed, Anesthesia, Meds' },
    { id: 'PKG-104', name: 'Monthly Hemodialysis Package (10 Sessions)', dept: 'Nephrology', packagePrice: 18000, actualValue: 25000, savings: '28%', inclusions: '10 Dialysis Cycles, Heparin, Erythropoietin, Dialyzer Lines' }
  ];

  // Sample Bills Dataset
  const regConsultBills = [
    { id: 'REG-2026-101', patientName: 'Aarav Sharma', uhid: 'PX-2026-9041', type: 'OPD First Consultation', doctor: 'Dr. Sandeep Mehta', fee: 800, regFee: 200, total: 1000, status: 'Paid (Cash)', date: '2026-08-08' },
    { id: 'REG-2026-102', patientName: 'Priya Sharma', uhid: 'PX-2026-9042', type: 'Specialist Follow-up', doctor: 'Dr. Ananya Ray', fee: 500, regFee: 0, total: 500, status: 'Paid (UPI)', date: '2026-08-08' },
    { id: 'REG-2026-103', patientName: 'Rohan Mehta', uhid: 'PX-2026-9043', type: 'Emergency Consultation', doctor: 'Dr. Alok Verma', fee: 1200, regFee: 300, total: 1500, status: 'Pending', date: '2026-08-08' }
  ];

  const inpatientBills = [
    { id: 'IPD-BILL-801', patientName: 'Aarav Sharma', bedNo: 'CCU Bed 02', days: 3, bedRent: 15000, otCharges: 35000, nursingCharges: 6000, medCharges: 12400, total: 68400, tpaCovered: 60000, patientPayable: 8400, status: 'Pre-Auth Approved (Star Health)' },
    { id: 'IPD-BILL-802', patientName: 'Priya Sharma', bedNo: 'Deluxe Ward 04', days: 2, bedRent: 8000, otCharges: 0, nursingCharges: 3000, medCharges: 4200, total: 15200, tpaCovered: 0, patientPayable: 15200, status: 'Cash Settlement Pending' }
  ];

  const labBills = [
    { id: 'LAB-BILL-301', patientName: 'Aarav Sharma', testNames: 'Lipid Profile, HbA1c, Troponin-I', refDoctor: 'Dr. Sandeep Mehta', total: 3200, status: 'Paid (Card)', date: '2026-08-08' },
    { id: 'LAB-BILL-302', patientName: 'Rohan Mehta', testNames: 'Brain MRI Contrast & Spine Scan', refDoctor: 'Dr. Ananya Ray', total: 8500, status: 'Pre-Auth Pending', date: '2026-08-08' }
  ];

  const pharmacyBills = [
    { id: 'PHARM-BILL-901', patientName: 'Aarav Sharma', items: 'Telma 40mg x2, Dolo 650mg x3', counter: 'Counter 1 POS', total: 680, gstTax: 81.6, status: 'Paid (Cash)', receiptNo: 'TXN-88419' },
    { id: 'PHARM-BILL-902', patientName: 'Priya Sharma', items: 'Augmentin 625mg x1, Pantocid 40mg x2', counter: 'IPD Inpatient Desk', total: 1240, gstTax: 148.8, status: 'Billed to Bed #04', receiptNo: 'TXN-88420' }
  ];

  return (
    <div className="flex flex-col gap-lg">
      {/* Billing Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(37, 99, 235, 0.08) 100%)', borderLeft: '6px solid var(--success)', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>💳 Revenue Desk & Enterprise SaaS Billing Module</span>
              <span className="badge badge-success" style={{ fontSize: '11px', padding: '4px 10px' }}>⭐ AI Revenue Leakage & Multi-Counter Ready</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
              End-to-end automated charge capture across OPD, IPD, ICU, OT, Pharmacy, Lab, Radiology, TPA Claims, Packages, and Cash Counter Shift Management.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowCostEstimatorModal(true)}>
              🧮 Patient Cost Estimator
            </button>
            <button className="btn btn-warning" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowAiLeakageModal(true)}>
              🤖 AI Leakage Alerts
            </button>
            <button className="btn btn-success" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowShiftClosingModal(true)}>
              📊 Shift Closing Report
            </button>
          </div>
        </div>

        {/* 9-Step Billing Workflow Pipeline Flow Bar */}
        <div style={{ marginTop: '20px', background: 'var(--bg-card)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔄 Automated 9-Step Enterprise Billing Pipeline</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {billingWorkflowSteps.map((s, idx) => (
              <React.Fragment key={s.step}>
                <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-muted)', border: '1px solid var(--border)', minWidth: '125px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>STEP {s.step}</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, marginTop: '2px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{s.icon}</span>
                    <span>{s.title}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--success)', marginTop: '4px', fontWeight: 700 }}>{s.count} Processed</div>
                </div>

                {idx < billingWorkflowSteps.length - 1 && (
                  <span style={{ fontSize: '14px', color: 'var(--success)', fontWeight: 800 }}>➔</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 10 Billing Pillar Sub-Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setBillingTab('workflow')}
            className={`btn ${billingTab === 'workflow' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔄 Live 9-Step Billing Pipeline
          </button>
          <button
            onClick={() => setBillingTab('packages')}
            className={`btn ${billingTab === 'packages' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📦 Health & Surgery Packages
          </button>
          <button
            onClick={() => setBillingTab('reg_consult')}
            className={`btn ${billingTab === 'reg_consult' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🩺 Registration & Consulting
          </button>
          <button
            onClick={() => setBillingTab('inpatient_compound')}
            className={`btn ${billingTab === 'inpatient_compound' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🏥 In-Patient & Compound Bills
          </button>
          <button
            onClick={() => setBillingTab('lab_billing')}
            className={`btn ${billingTab === 'lab_billing' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔬 Lab & Diagnostic Billing
          </button>
          <button
            onClick={() => setBillingTab('pharmacy_billing')}
            className={`btn ${billingTab === 'pharmacy_billing' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            💊 Pharmacy & Drug Invoices
          </button>
          <button
            onClick={() => setBillingTab('referral_sharing')}
            className={`btn ${billingTab === 'referral_sharing' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🤝 Doctor Referral Splits
          </button>
          <button
            onClick={() => setBillingTab('shift_closing')}
            className={`btn ${billingTab === 'shift_closing' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📊 Cash Counter Shift Handoff
          </button>
          <button
            onClick={() => setBillingTab('ai_insights')}
            className={`btn ${billingTab === 'ai_insights' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🤖 AI Leakage & Duplicate Errors
          </button>
          <button
            onClick={() => setBillingTab('expenses')}
            className={`btn ${billingTab === 'expenses' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📊 Operational Expense Ledger
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: LIVE 9-STEP BILLING WORKFLOW PIPELINE */}
      {billingTab === 'workflow' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>
            ⚡ Real-Time Auto Billing & Multi-Department Charge Capture Ledger
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Every service added across OPD, IPD, ICU, OT, Pharmacy, and Pathology automatically posts to the active patient bill ledger.
          </p>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Billing Queue ID</th>
                  <th>Patient Name & UHID</th>
                  <th>Department Auto-Posting</th>
                  <th>TPA / Insurance Status</th>
                  <th>Gross Bill</th>
                  <th>Net Patient Payable</th>
                  <th>Clearance Action</th>
                </tr>
              </thead>
              <tbody>
                {branchPatients.map((p) => (
                  <tr key={p.id}>
                    <td className="font-semibold">BLL-2026-90{p.id.slice(-2)}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{p.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--primary)', fontFamily: 'monospace' }}>{p.id}</div>
                    </td>
                    <td><span className="badge badge-primary">Auto Charge Capture Active</span></td>
                    <td>
                      {p.tpaProvider !== 'None' ? (
                        <span className="badge badge-success">Pre-Auth Approved ({p.tpaProvider})</span>
                      ) : (
                        <span className="badge badge-secondary">Direct Cash Pay</span>
                      )}
                    </td>
                    <td>₹{p.totalBill.toLocaleString()}</td>
                    <td style={{ color: 'var(--danger)', fontWeight: 800 }}>₹{p.pendingBill.toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {p.tpaProvider !== 'None' && (
                          <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => handleSettleBill(p.id, true)}>
                            🛡️ Claim TPA
                          </button>
                        )}
                        <button className="btn btn-success" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => handleSettleBill(p.id, false)}>
                          💵 Settle Bill
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: HEALTH & SURGERY PACKAGES */}
      {billingTab === 'packages' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>📦 Health Check-up & Bundled Surgery Treatment Packages</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Pre-configured bundled pricing vs actual cost breakdown comparison.</p>
            </div>
            <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => addToast('success', 'Assigned Master Executive Checkup Package to Patient PX-2026-9041!')}>
              ➕ Assign Package to Patient
            </button>
          </div>

          <div className="grid grid-2" style={{ gap: '16px' }}>
            {treatmentPackages.map((pkg) => (
              <div key={pkg.id} style={{ border: '1px solid var(--border)', padding: '16px', borderRadius: '10px', background: 'var(--bg-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-primary">{pkg.dept}</span>
                  <span className="badge badge-success" style={{ fontSize: '11px', fontWeight: 800 }}>Save {pkg.savings}</span>
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '8px 0', color: 'var(--text-main)' }}>{pkg.name}</h4>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}><strong>Inclusions:</strong> {pkg.inclusions}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--border)', paddingTop: '10px' }}>
                  <div>
                    <span style={{ fontSize: '11px', textDecoration: 'line-through', color: 'var(--text-muted)', marginRight: '8px' }}>₹{pkg.actualValue.toLocaleString()}</span>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--success)' }}>₹{pkg.packagePrice.toLocaleString()}</span>
                  </div>
                  <button className="btn btn-secondary" style={{ fontSize: '11px' }} onClick={() => addToast('info', `Simulating Package vs Actual comparison for ${pkg.id}`)}>
                    📊 Cost Comparison
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: REGISTRATION & CONSULTING BILLING */}
      {billingTab === 'reg_consult' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>🩺 Registration & Doctor Consulting Fee Ledger</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>OPD consultation receipts, follow-up visit charges, and new patient UHID registration fees.</p>
            </div>
            <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => addToast('success', 'Generated New OPD Consultation Invoice #REG-2026-104!')}>
              ➕ Create OPD Consultation Bill
            </button>
          </div>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Bill Receipt ID</th>
                  <th>Patient Name & UHID</th>
                  <th>Consultation Type</th>
                  <th>Attending Physician</th>
                  <th>Reg Fee</th>
                  <th>Doctor Fee</th>
                  <th>Net Total</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {regConsultBills.map((b) => (
                  <tr key={b.id}>
                    <td className="font-semibold">{b.id}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{b.patientName}</div>
                      <div style={{ fontSize: '10px', color: 'var(--primary)', fontFamily: 'monospace' }}>{b.uhid}</div>
                    </td>
                    <td><span className="badge badge-primary">{b.type}</span></td>
                    <td>{b.doctor}</td>
                    <td>₹{b.regFee}</td>
                    <td>₹{b.fee}</td>
                    <td style={{ fontWeight: 800, color: 'var(--success)' }}>₹{b.total}</td>
                    <td><span className={`badge ${b.status.includes('Paid') ? 'badge-success' : 'badge-danger'}`}>{b.status}</span></td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('info', `Printed Thermal Receipt for ${b.id}`)}>
                        🖨️ Print Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: IN-PATIENT & COMPOUND BILLING */}
      {billingTab === 'inpatient_compound' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>🏥 In-Patient & Compound Itemized Discharge Billing</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Consolidated IPD bill including room bed rent, OT surgery, nursing care, and TPA insurance claim settlement.</p>
            </div>
            <button className="btn btn-success" style={{ fontSize: '12px' }} onClick={() => addToast('success', 'Generated Itemized Compound Discharge Bill!')}>
              📜 Generate Discharge Summary Bill
            </button>
          </div>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>IPD Bill ID</th>
                  <th>Patient Name</th>
                  <th>Bed Location</th>
                  <th>Stay Days</th>
                  <th>Bed Rent</th>
                  <th>OT Surgery Fee</th>
                  <th>Nursing & Meds</th>
                  <th>Gross Total</th>
                  <th>TPA Claim Approved</th>
                  <th>Patient Net Payable</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inpatientBills.map((ip) => (
                  <tr key={ip.id}>
                    <td className="font-semibold">{ip.id}</td>
                    <td style={{ fontWeight: 700 }}>{ip.patientName}</td>
                    <td><span className="badge badge-primary">{ip.bedNo}</span></td>
                    <td>{ip.days} Days</td>
                    <td>₹{ip.bedRent.toLocaleString()}</td>
                    <td>₹{ip.otCharges.toLocaleString()}</td>
                    <td>₹{(ip.nursingCharges + ip.medCharges).toLocaleString()}</td>
                    <td style={{ fontWeight: 800 }}>₹{ip.total.toLocaleString()}</td>
                    <td style={{ color: 'var(--success)', fontWeight: 700 }}>- ₹{ip.tpaCovered.toLocaleString()}</td>
                    <td style={{ color: 'var(--danger)', fontWeight: 800 }}>₹{ip.patientPayable.toLocaleString()}</td>
                    <td>
                      <button className="btn btn-primary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => handleSettleBill('PX-2026-9041', false)}>
                        💵 Settle Net Cash
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: LABORATORY BILLING */}
      {billingTab === 'lab_billing' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🔬 Laboratory & Diagnostic Imaging Billing</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Pathology NABL test packages, Radiology DICOM X-Ray/CT/MRI scan invoices.</p>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Lab Bill ID</th>
                  <th>Patient Name</th>
                  <th>Investigation Test Package</th>
                  <th>Referring Doctor</th>
                  <th>Gross Amount</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {labBills.map((lb) => (
                  <tr key={lb.id}>
                    <td className="font-semibold">{lb.id}</td>
                    <td style={{ fontWeight: 700 }}>{lb.patientName}</td>
                    <td>{lb.testNames}</td>
                    <td>{lb.refDoctor}</td>
                    <td style={{ fontWeight: 800, color: 'var(--success)' }}>₹{lb.total.toLocaleString()}</td>
                    <td><span className={`badge ${lb.status.includes('Paid') ? 'badge-success' : 'badge-warning'}`}>{lb.status}</span></td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('info', `Printed Lab Billing Slip for ${lb.id}`)}>
                        🖨️ Print Lab Slip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: PHARMACY BILLING */}
      {billingTab === 'pharmacy_billing' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>💊 Pharmacy POS & Prescription Drug Invoices</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Barcoded OTC medicine sales, IPD ward drug charges, and GST Tax Invoices.</p>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Pharmacy Invoice</th>
                  <th>Patient Name</th>
                  <th>Dispensed Medication Summary</th>
                  <th>Billing Counter</th>
                  <th>GST Tax Amount (12%)</th>
                  <th>Gross Invoice Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pharmacyBills.map((pb) => (
                  <tr key={pb.id}>
                    <td className="font-semibold">{pb.id}</td>
                    <td style={{ fontWeight: 700 }}>{pb.patientName}</td>
                    <td>{pb.items}</td>
                    <td><span className="badge badge-secondary">{pb.counter}</span></td>
                    <td>₹{pb.gstTax}</td>
                    <td style={{ fontWeight: 800, color: 'var(--success)' }}>₹{pb.total}</td>
                    <td><span className="badge badge-success">{pb.status}</span></td>
                    <td>
                      <button className="btn btn-primary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('success', `Printed GST Tax Invoice ${pb.receiptNo}`)}>
                        🧾 GST Tax Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: REFERRAL & SHARING BILLING */}
      {billingTab === 'referral_sharing' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>🤝 Referral Doctor Commission Splits & Revenue Sharing</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Automated referral fee calculations and revenue share disbursement ledger.</p>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginTop: '16px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: 'var(--bg-muted)' }}>
                <th style={{ padding: '10px 12px' }}>Patient Target</th>
                <th style={{ padding: '10px 12px' }}>Investigation Test</th>
                <th style={{ padding: '10px 12px' }}>Referring Physician</th>
                <th style={{ padding: '10px 12px' }}>Share %</th>
                <th style={{ padding: '10px 12px' }}>Commission Payout</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Disbursement Actions</th>
              </tr>
            </thead>
            <tbody>
              {branchPatients.flatMap(p => p.labResults.filter(l => l.status === 'completed' && l.refDoctorShare && l.refDoctorShare > 0).map(l => ({ ...l, patientName: p.name }))).map((lab, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700 }}>{lab.patientName}</td>
                  <td style={{ padding: '10px 12px' }}>{lab.testName}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--primary)', fontWeight: 600 }}>Dr. Sandeep Mehta</td>
                  <td style={{ padding: '10px 12px' }}><span className="badge badge-warning">{lab.refDoctorShare}% Share</span></td>
                  <td style={{ padding: '10px 12px', fontWeight: 800, color: 'var(--success)' }}>₹{Math.round(1500 * ((lab.refDoctorShare || 0) / 100))}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                    <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => handleSettleReferralPayout(lab.id, lab.testName, "Dr. Sandeep Mehta", lab.refDoctorShare || 0, 1500)}>
                      💸 Disburse Share
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB-TAB 8: CASH COUNTER SHIFT CLOSING */}
      {billingTab === 'shift_closing' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>📊 Cash Counter Shift Closing & Handoff Audit</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Reconcile total cash, card, UPI, and net banking collections before cashier shift handoff.</p>
            </div>
            <button className="btn btn-success" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowShiftClosingModal(true)}>
              🔒 Lock & Close Cashier Shift
            </button>
          </div>

          <div className="grid grid-3" style={{ gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Physical Cash in Drawer</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--success)', marginTop: '4px' }}>₹48,200</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>POS Card Machine Collection</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>₹82,500</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', borderLeft: '4px solid #9333EA' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>UPI / QR Digital Payment</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#9333EA', marginTop: '4px' }}>₹54,600</div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 9: AI LEAKAGE & DUPLICATE ERROR DETECTION */}
      {billingTab === 'ai_insights' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🤖 AI Revenue Leakage & Billing Error Alerts</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>AI algorithms detect unbilled OT consumables, duplicate lab test entries, and missing bed rent charges.</p>
          
          <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '8px', borderLeft: '4px solid var(--danger)', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--danger)' }}>🚨 Unbilled OT Stent Consumable Alert (Patient PX-2026-9041)</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              AI detected a St-Jude Stent used in CAG Surgery on Aug 6 was not posted to the active IPD bill. Estimated leakage: ₹32,000.
            </p>
            <button className="btn btn-danger" style={{ marginTop: '10px', fontSize: '11px' }} onClick={() => addToast('success', 'Auto-added ₹32,000 OT Stent charge to Patient PX-2026-9041 bill!')}>
              ⚡ Auto-Fix & Post Charge
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 10: EXPENSE LEDGER */}
      {billingTab === 'expenses' && (
        <div className="grid gap-lg" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
          <div className="card">
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📊 Capture Hospital Operational Expense</h3>
            <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Expense Category</label>
                <select className="form-input" value={expCategory} onChange={(e) => setExpCategory(e.target.value)}>
                  <option value="Pharmacy Stock">Pharmacy Stock</option>
                  <option value="Lab Supplies">Lab Supplies</option>
                  <option value="ICU Oxygen / Medical Gas">ICU Oxygen / Medical Gas</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Hospital Maintenance">Hospital Maintenance</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Amount (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 12000"
                  className="form-input"
                  required
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Payment Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe invoice/receipt details..."
                  className="form-input"
                  required
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', fontWeight: 800 }}>
                💾 Log Expense Entry
              </button>
            </form>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>Recent Logged Expenses</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
              {branchExpenses.map(e => (
                <div key={e.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <div className="flex justify-between text-xs" style={{ fontWeight: 700 }}>
                    <span>{e.category}</span>
                    <span style={{ color: 'var(--danger)' }}>₹{e.amount}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{e.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: PATIENT TREATMENT COST ESTIMATOR */}
      {showCostEstimatorModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>🧮 Pre-Treatment Patient Cost Estimator</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Provide accurate cost estimates before admission based on room category & surgery type.</p>

            <div style={{ margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Select Planned Procedure</label>
                <select className="form-input" value={estimateProcedure} onChange={(e) => setEstimateProcedure(e.target.value)}>
                  <option value="Coronary Angiography (CAG)">Coronary Angiography (CAG)</option>
                  <option value="Laparoscopic Cholecystectomy">Laparoscopic Cholecystectomy</option>
                  <option value="Total Knee Replacement">Total Knee Replacement</option>
                  <option value="Normal Maternity Delivery">Normal Maternity Delivery</option>
                </select>
              </div>

              <div style={{ padding: '14px', background: 'var(--bg-muted)', borderRadius: '8px', fontSize: '12px' }}>
                <div>• <strong>Estimated Surgery Fee:</strong> ₹45,000</div>
                <div>• <strong>3-Day Deluxe Bed Rent:</strong> ₹15,000</div>
                <div>• <strong>Estimated Nursing & Meds:</strong> ₹8,500</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--success)', marginTop: '8px', borderTop: '1px dashed var(--border)', paddingTop: '6px' }}>
                  Total Estimated Bill Range: ₹65,000 - ₹72,000
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary" onClick={() => setShowCostEstimatorModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { addToast('success', 'Printed Cost Estimate PDF for Patient!'); setShowCostEstimatorModal(false); }}>🖨️ Print Estimate PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: AI REVENUE LEAKAGE MODAL */}
      {showAiLeakageModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🤖 AI Revenue Leakage Audit Report</span>
            </h3>
            <div style={{ padding: '14px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '8px', margin: '14px 0', fontSize: '12px', lineHeight: '1.6' }}>
              <div>• <strong>1 Unbilled OT Stent Consumable:</strong> ₹32,000</div>
              <div>• <strong>2 Duplicate Lab Entries Detected:</strong> Resolved (-₹1,800)</div>
              <div>• <strong>Missing Bed Rent for ICU Bed B-02:</strong> +₹5,000</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--success)', marginTop: '8px' }}>Net Recoverable Revenue: ₹37,000</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary" onClick={() => setShowAiLeakageModal(false)}>Close</button>
              <button className="btn btn-warning" onClick={() => { addToast('success', 'Auto-resolved 3 Revenue Leakages!'); setShowAiLeakageModal(false); }}>⚡ Fix All Leakages</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SHIFT CLOSING MODAL */}
      {showShiftClosingModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '460px', maxWidth: '90%' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--success)' }}>🔒 Cashier Counter Shift Handoff</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Reconcile physical cash drawer with digital system collection.</p>

            <div style={{ padding: '14px', background: 'var(--bg-muted)', borderRadius: '8px', margin: '14px 0', fontSize: '12px' }}>
              <div>• <strong>Cash Collection:</strong> ₹48,200</div>
              <div>• <strong>POS Card Machine:</strong> ₹82,500</div>
              <div>• <strong>UPI QR Receipts:</strong> ₹54,600</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--success)', marginTop: '8px' }}>Shift Total: ₹1,85,300</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary" onClick={() => setShowShiftClosingModal(false)}>Cancel</button>
              <button className="btn btn-success" onClick={() => { addToast('success', 'Locked Shift Collection #SH-9041!'); setShowShiftClosingModal(false); }}>🔒 Lock Shift Handoff</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
