import React from 'react';
import { DollarSign, FileText, CreditCard, UserCheck, Stethoscope, Bed, FlaskConical, Pill, Share2, Receipt, CheckCircle2, ShieldCheck, Printer, AlertCircle } from 'lucide-react';

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

  const [billingTab, setBillingTab] = React.useState<'reg_consult' | 'inpatient_compound' | 'lab_billing' | 'pharmacy_billing' | 'referral_sharing' | 'expenses'>('reg_consult');
  const [expCategory, setExpCategory] = React.useState('Medical Supplies');
  const [expAmount, setExpAmount] = React.useState('');
  const [expDesc, setExpDesc] = React.useState('');

  // Sample Bills Dataset for 5 categories
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
              <span>💳 Revenue Desk & Enterprise Billing Module</span>
              <span className="badge badge-success" style={{ fontSize: '11px', padding: '4px 10px' }}>TPA Cashless & GST Integrated</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
              Registration & Consulting Fees, In-Patient Compound Bills, Laboratory Test Charges, Pharmacy POS Invoices, and Referral Doctor Commission Splits.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ padding: '10px 16px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Today's Total Billing</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--success)' }}>₹1,85,300</div>
            </div>
            <div style={{ padding: '10px 16px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>TPA Outstanding Claims</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--warning)' }}>₹60,000</div>
            </div>
          </div>
        </div>

        {/* 5 Billing Pillar Sub-Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setBillingTab('reg_consult')}
            className={`btn ${billingTab === 'reg_consult' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🩺 Registration & Consulting Billing
          </button>
          <button
            onClick={() => setBillingTab('inpatient_compound')}
            className={`btn ${billingTab === 'inpatient_compound' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🏥 In-Patient & Compound Billing
          </button>
          <button
            onClick={() => setBillingTab('lab_billing')}
            className={`btn ${billingTab === 'lab_billing' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔬 Laboratory & Imaging Billing
          </button>
          <button
            onClick={() => setBillingTab('pharmacy_billing')}
            className={`btn ${billingTab === 'pharmacy_billing' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            💊 Pharmacy & Medication Billing
          </button>
          <button
            onClick={() => setBillingTab('referral_sharing')}
            className={`btn ${billingTab === 'referral_sharing' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🤝 Referral & Doctor Commission Splits
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

      {/* PILLAR 1: REGISTRATION & CONSULTING BILLING */}
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
                    <td>
                      <span className={`badge ${b.status.includes('Paid') ? 'badge-success' : 'badge-danger'}`}>
                        {b.status}
                      </span>
                    </td>
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

      {/* PILLAR 2: IN-PATIENT & COMPOUND BILLING */}
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

      {/* PILLAR 3: LABORATORY BILLING */}
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

      {/* PILLAR 4: PHARMACY BILLING */}
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

      {/* PILLAR 5: REFERRAL & SHARING BILLING */}
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

      {/* PILLAR 6: EXPENSE LEDGER */}
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
    </div>
  );
};
