import React from 'react';
import { DollarSign, TrendingDown, TrendingUp, Receipt, ShieldAlert, CheckCircle2, Clock, Filter, Plus, FileText, Upload, Sparkles, PieChart, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

export interface ExpenseModuleProps {
  [key: string]: any;
}

export const ExpenseModule: React.FC<ExpenseModuleProps> = (props) => {
  const {
    activeTab = 'expense',
    setActiveTab = () => {},
    addToast = () => {},
    expenses = [],
    setExpenses = () => {},
    branchExpenses = [],
    handleAddExpense = () => {},
    ...rest
  } = props;

  const [expenseTab, setExpenseTab] = React.useState<'capture' | 'efficiency' | 'revenue_mgmt'>('capture');
  const [expCategory, setExpCategory] = React.useState('Medical Supplies');
  const [expAmount, setExpAmount] = React.useState('');
  const [expVendor, setExpVendor] = React.useState('');
  const [expDesc, setExpDesc] = React.useState('');
  const [expPaymentMethod, setExpPaymentMethod] = React.useState('Bank Transfer');
  const [showReceiptOcrModal, setShowReceiptOcrModal] = React.useState(false);

  const [expenseList, setExpenseList] = React.useState([
    { id: 'EXP-2026-101', category: 'Pharmacy Bulk Stock', amount: 145000, vendor: 'Sun Pharma Wholesale', desc: 'Antibiotics & IV Fluids Batch #881', method: 'Net Banking', date: '2026-08-08', status: 'Approved' },
    { id: 'EXP-2026-102', category: 'Lab Reagents & Chemicals', amount: 32000, vendor: 'Transasia Bio-Medicals', desc: 'CBC Reagent Pack & Lipid Calibrators', method: 'UPI Corporate', date: '2026-08-08', status: 'Approved' },
    { id: 'EXP-2026-103', category: 'ICU Medical Gas (Oxygen Cylinders)', amount: 28000, vendor: 'Inox Air Products', desc: '20 Liquid Oxygen Cylinders CCU Fill', method: 'Vendor Credit', date: '2026-08-07', status: 'Approved' },
    { id: 'EXP-2026-104', category: 'Hospital Utilities (Electricity)', amount: 64000, vendor: 'State Electricity Board', desc: 'Monthly AC & HVAC Utility Bill', method: 'Direct Bank Debit', date: '2026-08-05', status: 'Approved' },
    { id: 'EXP-2026-105', category: 'OT Equipment Maintenance', amount: 18500, vendor: 'GE Healthcare India', desc: 'Anaesthesia Workstation Preventive Service', method: 'Cheque', date: '2026-08-04', status: 'Pending Approval' }
  ]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expAmount || !expDesc) return;
    const newExp = {
      id: `EXP-2026-${Math.floor(106 + Math.random() * 90)}`,
      category: expCategory,
      amount: parseFloat(expAmount),
      vendor: expVendor || 'General Vendor',
      desc: expDesc,
      method: expPaymentMethod,
      date: new Date().toISOString().split('T')[0],
      status: parseFloat(expAmount) > 25000 ? 'Pending Approval' : 'Approved'
    };
    setExpenseList([newExp, ...expenseList]);
    if (typeof handleAddExpense === 'function') {
      handleAddExpense(e);
    } else {
      addToast('success', `Logged Expense #${newExp.id} of ₹${newExp.amount}!`);
    }
    setExpAmount('');
    setExpVendor('');
    setExpDesc('');
  };

  const totalExpenseSum = expenseList.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex flex-col gap-lg">
      {/* Expense Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%)', borderLeft: '6px solid var(--danger)', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>📊 Operational Expense & Revenue Management (4.12)</span>
              <span className="badge badge-danger" style={{ fontSize: '11px', padding: '4px 10px' }}>Cost Optimization & AI Leakage Control</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
              Simplified Expense Capture, Operational Cost & Time Reduction, Budget Variance Monitoring, and Net Revenue Margin Analytics.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ padding: '10px 16px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Logged Expenses</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--danger)' }}>₹{totalExpenseSum.toLocaleString()}</div>
            </div>
            <div style={{ padding: '10px 16px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Net Operating Margin</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--success)' }}>+ 42.8%</div>
            </div>
          </div>
        </div>

        {/* 3 Main Pillar Sub-Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setExpenseTab('capture')}
            className={`btn ${expenseTab === 'capture' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📝 Simplified Expense Capture
          </button>
          <button
            onClick={() => setExpenseTab('efficiency')}
            className={`btn ${expenseTab === 'efficiency' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            ⚡ Operational Efficiency & Cost Reduction
          </button>
          <button
            onClick={() => setExpenseTab('revenue_mgmt')}
            className={`btn ${expenseTab === 'revenue_mgmt' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📈 Revenue Management & Profitability
          </button>
        </div>
      </div>

      {/* PILLAR 1: SIMPLIFIED EXPENSE CAPTURE */}
      {expenseTab === 'capture' && (
        <div className="grid gap-lg" style={{ gridTemplateColumns: '1.4fr 1.6fr' }}>
          {/* Quick Expense Capture Form */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>📝 Simplified Expense Capture Entry</h3>
              <button className="btn btn-secondary" style={{ fontSize: '11px' }} onClick={() => setShowReceiptOcrModal(true)}>
                📸 Scan Receipt (AI OCR)
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Expense Category</label>
                <select className="form-input" value={expCategory} onChange={(e) => setExpCategory(e.target.value)}>
                  <option value="Pharmacy Bulk Stock">Pharmacy Bulk Stock</option>
                  <option value="Lab Reagents & Chemicals">Lab Reagents & Chemicals</option>
                  <option value="ICU Medical Gas (Oxygen Cylinders)">ICU Medical Gas (Oxygen Cylinders)</option>
                  <option value="Hospital Utilities (Electricity)">Hospital Utilities (Electricity)</option>
                  <option value="OT Equipment Maintenance">OT Equipment Maintenance</option>
                  <option value="Housekeeping & Sanitation">Housekeeping & Sanitation</option>
                </select>
              </div>

              <div className="grid grid-2" style={{ gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 14500"
                    className="form-input"
                    required
                    value={expAmount}
                    onChange={(e) => setExpAmount(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Vendor / Supplier Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sun Pharma"
                    className="form-input"
                    value={expVendor}
                    onChange={(e) => setExpVendor(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Payment Method</label>
                <select className="form-input" value={expPaymentMethod} onChange={(e) => setExpPaymentMethod(e.target.value)}>
                  <option value="Net Banking">Net Banking</option>
                  <option value="UPI Corporate">UPI Corporate</option>
                  <option value="Vendor Credit">Vendor Credit</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Petty Cash">Petty Cash</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Description & Receipt Reference</label>
                <textarea
                  rows={2}
                  placeholder="Invoice number, items breakdown, or note..."
                  className="form-input"
                  required
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-danger" style={{ padding: '12px', fontWeight: 800, marginTop: '4px' }}>
                💾 Submit Expense Voucher
              </button>
            </form>
          </div>

          {/* Expense Log Table */}
          <div className="card">
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📋 Logged Hospital Expenses Ledger</h3>

            <div className="table-container">
              <table className="data-table" style={{ fontSize: '12px' }}>
                <thead>
                  <tr>
                    <th>Expense ID</th>
                    <th>Category</th>
                    <th>Vendor</th>
                    <th>Payment</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseList.map((exp) => (
                    <tr key={exp.id}>
                      <td className="font-semibold">{exp.id}</td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{exp.category}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{exp.desc}</div>
                      </td>
                      <td>{exp.vendor}</td>
                      <td><span className="badge badge-secondary">{exp.method}</span></td>
                      <td style={{ fontWeight: 800, color: 'var(--danger)' }}>₹{exp.amount.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${exp.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                          {exp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 2: OPERATIONAL EFFICIENCY & COST REDUCTION */}
      {expenseTab === 'efficiency' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>⚡ Operational Efficiency & Cost Reduction Center</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Automated budget variance tracking, approval workflows for large capital expenses, and vendor contract rate optimizations.</p>

          <div className="grid grid-3" style={{ gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>💡 Time & Labor Saved</h4>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--success)', marginTop: '4px' }}>14 hrs / week</div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Eliminated paper petty cash vouchers through 1-click digital approvals.</p>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>📉 Automated Budget Variance</h4>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>- 12.4% Expenses</div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Prevented over-ordering on bulk lab reagents through FEFO inventory sync.</p>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', borderLeft: '4px solid var(--warning)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>📜 Approval Workflows (&gt; ₹25,000)</h4>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--warning)', marginTop: '4px' }}>1 Pending Veto</div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>High-value purchase orders require Medical Director signature lock.</p>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 3: REVENUE MANAGEMENT & PROFITABILITY */}
      {expenseTab === 'revenue_mgmt' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📈 Revenue Management & Departmental Profitability Ratios</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Real-time net income calculation comparing gross billing revenue against total operational expenses.</p>

          <div className="grid grid-2" style={{ gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>📊 Net Financial Breakdown</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Gross Hospital Billing Revenue:</span>
                  <strong style={{ color: 'var(--success)' }}>+ ₹4,85,000</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total Operational Expenses:</span>
                  <strong style={{ color: 'var(--danger)' }}>- ₹2,86,500</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '8px', fontSize: '16px', fontWeight: 800 }}>
                  <span>Net Operating Income (NOI):</span>
                  <strong style={{ color: 'var(--primary)' }}>₹1,98,500</strong>
                </div>
              </div>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>🏥 Departmental Profitability Ratios</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div>• <strong>Pharmacy Unit:</strong> 34% Profit Margin (Stock Cost ₹1.45L vs Sales ₹2.20L)</div>
                <div>• <strong>Pathology Lab Unit:</strong> 62% Profit Margin (Reagents ₹32k vs Test Billing ₹84k)</div>
                <div>• <strong>IPD Wards & ICU:</strong> 48% Margin (Bed & Nursing Revenue ₹1.80L vs Gas/Utilities ₹92k)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI OCR RECEIPT MODAL */}
      {showReceiptOcrModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '460px', maxWidth: '90%' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>📸 AI Receipt OCR Expense Extractor</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Upload paper vendor receipt or utility bill photo to auto-fill expense fields.</p>
            
            <div style={{ border: '2px dashed var(--primary)', padding: '24px', textAlign: 'center', borderRadius: '8px', margin: '14px 0' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>📄 Upload Receipt Image or PDF</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary" onClick={() => setShowReceiptOcrModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                setExpCategory('Hospital Utilities (Electricity)');
                setExpAmount('64000');
                setExpVendor('State Electricity Board');
                setExpDesc('Auto-extracted via AI OCR: AC & HVAC Utility Receipt #EB-9041');
                addToast('success', 'AI OCR Extracted Expense Data!');
                setShowReceiptOcrModal(false);
              }}>📸 Auto-Fill via AI</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
