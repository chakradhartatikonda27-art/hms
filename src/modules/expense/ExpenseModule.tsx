import React from 'react';
import { DollarSign, TrendingDown, TrendingUp, Receipt, ShieldAlert, CheckCircle2, Clock, Filter, Plus, FileText, Upload, Sparkles, PieChart, ArrowUpRight, ArrowDownRight, Wallet, Building2, UserCheck, Calculator, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

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

  const [expenseTab, setExpenseTab] = React.useState<'workflow' | 'capture' | 'approvals' | 'vendor_amc' | 'department_cost' | 'unit_costs' | 'employee_payroll' | 'operational_util' | 'ai_categorization' | 'revenue_profit'>('workflow');
  const [expCategory, setExpCategory] = React.useState('Pharmacy Bulk Stock');
  const [expDepartment, setExpDepartment] = React.useState('Pharmacy');
  const [expAmount, setExpAmount] = React.useState('');
  const [expVendor, setExpVendor] = React.useState('');
  const [expDesc, setExpDesc] = React.useState('');
  const [expPaymentMethod, setExpPaymentMethod] = React.useState('Net Banking');
  const [showReceiptOcrModal, setShowReceiptOcrModal] = React.useState(false);
  const [showApprovalModal, setShowApprovalModal] = React.useState(false);

  // 8-Step Expense Workflow Steps
  const expenseWorkflowSteps = [
    { step: 1, title: 'Expense Created', icon: '📝', count: 18, desc: 'Voucher Entry' },
    { step: 2, title: 'Attach Bill / Invoice', icon: '📄', count: 16, desc: 'OCR Bill Upload' },
    { step: 3, title: 'Department Allocation', icon: '🏢', count: 14, desc: 'Cost Center Tagging' },
    { step: 4, title: 'Approval Workflow', icon: '🛡️', count: 3, desc: 'Multi-Level Signoff' },
    { step: 5, title: 'Payment Processing', icon: '💳', count: 12, desc: 'Net Banking / UPI' },
    { step: 6, title: 'Accounting Entry', icon: '📑', count: 12, desc: 'GST Credit Posting' },
    { step: 7, title: 'Budget Update', icon: '📊', count: 12, desc: 'Real-Time Variance' },
    { step: 8, title: 'Financial Reports', icon: '📈', count: 1, desc: 'P&L Analytics' }
  ];

  const [expenseList, setExpenseList] = React.useState([
    { id: 'EXP-2026-101', category: 'Pharmacy Bulk Stock', department: 'Pharmacy', amount: 145000, vendor: 'Sun Pharma Wholesale', desc: 'Antibiotics & IV Fluids Batch #881', method: 'Net Banking', date: '2026-08-08', status: 'Approved' },
    { id: 'EXP-2026-102', category: 'Lab Reagents & Chemicals', department: 'Pathology Lab', amount: 32000, vendor: 'Transasia Bio-Medicals', desc: 'CBC Reagent Pack & Lipid Calibrators', method: 'UPI Corporate', date: '2026-08-08', status: 'Approved' },
    { id: 'EXP-2026-103', category: 'ICU Medical Gas (Oxygen Cylinders)', department: 'ICU Suite', amount: 28000, vendor: 'Inox Air Products', desc: '20 Liquid Oxygen Cylinders CCU Fill', method: 'Vendor Credit', date: '2026-08-07', status: 'Approved' },
    { id: 'EXP-2026-104', category: 'Hospital Utilities (Electricity)', department: 'Facilities & HVAC', amount: 64000, vendor: 'State Electricity Board', desc: 'Monthly AC & HVAC Utility Bill', method: 'Direct Bank Debit', date: '2026-08-05', status: 'Approved' },
    { id: 'EXP-2026-105', category: 'OT Equipment Maintenance (AMC)', department: 'OT Suite', amount: 18500, vendor: 'GE Healthcare India', desc: 'Anaesthesia Workstation Preventive Service', method: 'Cheque', date: '2026-08-04', status: 'Pending Approval' }
  ]);

  // Unit Cost Metrics
  const unitCostMetrics = [
    { title: 'Average Cost per Patient', value: '₹4,200', change: '- 5.2% MoM', status: 'Good' },
    { title: 'Operational Cost per Bed / Day', value: '₹1,850', change: '- 3.1% MoM', status: 'Good' },
    { title: 'Average Cost per Surgery', value: '₹18,400', change: '+ 1.4% MoM', status: 'Optimal' },
    { title: 'Cost per Lab Test Conducted', value: '₹340', change: '- 8.0% MoM', status: 'Efficient' }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expAmount || !expDesc) return;
    const newExp = {
      id: `EXP-2026-${Math.floor(106 + Math.random() * 90)}`,
      category: expCategory,
      department: expDepartment,
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
              <span>📊 Enterprise Expense & Profitability Suite (4.12)</span>
              <span className="badge badge-danger" style={{ fontSize: '11px', padding: '4px 10px' }}>⭐ OCR Scanner & Cost per Bed Ready</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
              Complete Hospital Expense Suite: OCR Bill Reader, Multi-Level Approvals, Vendor AMC Contracts, Department Cost Centers, and Unit Cost Analytics.
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

        {/* 8-Step Expense Operational Workflow Pipeline Flow Bar */}
        <div style={{ marginTop: '20px', background: 'var(--bg-card)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔄 8-Step Enterprise Expense Lifecycle Pipeline Flow</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {expenseWorkflowSteps.map((s, idx) => (
              <React.Fragment key={s.step}>
                <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-muted)', border: '1px solid var(--border)', minWidth: '125px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>STEP {s.step}</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, marginTop: '2px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{s.icon}</span>
                    <span>{s.title}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--danger)', marginTop: '4px', fontWeight: 700 }}>{s.count} Processed</div>
                </div>

                {idx < expenseWorkflowSteps.length - 1 && (
                  <span style={{ fontSize: '14px', color: 'var(--danger)', fontWeight: 800 }}>➔</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 10 Navigation Sub-Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setExpenseTab('workflow')}
            className={`btn ${expenseTab === 'workflow' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔄 Operational Lifecycle Board
          </button>
          <button
            onClick={() => setExpenseTab('capture')}
            className={`btn ${expenseTab === 'capture' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📝 Mobile / OCR Expense Entry
          </button>
          <button
            onClick={() => setExpenseTab('approvals')}
            className={`btn ${expenseTab === 'approvals' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🛡️ Multi-Level Approval Matrix
          </button>
          <button
            onClick={() => setExpenseTab('vendor_amc')}
            className={`btn ${expenseTab === 'vendor_amc' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🤝 Vendor Contracts & AMC
          </button>
          <button
            onClick={() => setExpenseTab('department_cost')}
            className={`btn ${expenseTab === 'department_cost' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🏢 Department Cost Centers
          </button>
          <button
            onClick={() => setExpenseTab('unit_costs')}
            className={`btn ${expenseTab === 'unit_costs' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🧮 Cost Per Bed / Surgery Unit
          </button>
          <button
            onClick={() => setExpenseTab('employee_payroll')}
            className={`btn ${expenseTab === 'employee_payroll' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            👨‍⚕️ Staff Salary & Travel Expenses
          </button>
          <button
            onClick={() => setExpenseTab('operational_util')}
            className={`btn ${expenseTab === 'operational_util' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            ⚡ Utilities, Fuel & Bio-Waste
          </button>
          <button
            onClick={() => setExpenseTab('ai_categorization')}
            className={`btn ${expenseTab === 'ai_categorization' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🤖 AI Categorization & Overruns
          </button>
          <button
            onClick={() => setExpenseTab('revenue_profit')}
            className={`btn ${expenseTab === 'revenue_profit' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📈 Real-Time Profitability Dashboard
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: OPERATIONAL LIFECYCLE PIPELINE BOARD */}
      {expenseTab === 'workflow' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>
            🔄 Active Hospital Expenses Moving Through 8-Step Lifecycle
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Real-time status tracking of vouchers from creation to final accounting entry and P&L updates.
          </p>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Expense ID</th>
                  <th>Category & Description</th>
                  <th>Department Allocation</th>
                  <th>Vendor / Supplier</th>
                  <th>Gross Amount</th>
                  <th>Current Pipeline Stage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenseList.map((exp, idx) => (
                  <tr key={exp.id}>
                    <td className="font-semibold">{exp.id}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{exp.category}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{exp.desc}</div>
                    </td>
                    <td><span className="badge badge-primary">{exp.department}</span></td>
                    <td>{exp.vendor}</td>
                    <td style={{ fontWeight: 800, color: 'var(--danger)' }}>₹{exp.amount.toLocaleString()}</td>
                    <td>
                      <span className="badge badge-success" style={{ fontSize: '11px', padding: '4px 8px' }}>
                        Step {idx + 4}: {expenseWorkflowSteps[idx + 3]?.title || 'Accounting Entry'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('info', `Advanced Expense ${exp.id} to Next Step`)}>
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

      {/* SUB-TAB 2: MOBILE / OCR EXPENSE ENTRY */}
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
              <div className="grid grid-2" style={{ gap: '12px' }}>
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

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Department Cost Center</label>
                  <select className="form-input" value={expDepartment} onChange={(e) => setExpDepartment(e.target.value)}>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Pathology Lab">Pathology Lab</option>
                    <option value="ICU Suite">ICU Suite</option>
                    <option value="OT Suite">OT Suite</option>
                    <option value="Facilities & HVAC">Facilities & HVAC</option>
                  </select>
                </div>
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

      {/* SUB-TAB 3: MULTI-LEVEL APPROVAL MATRIX */}
      {expenseTab === 'approvals' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🛡️ Multi-Level Expense Approval Workflow Matrix</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Expenses above threshold limits (&gt; ₹25,000) require signoff from Medical Director or CFO.</p>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Voucher ID</th>
                  <th>Department & Category</th>
                  <th>Amount</th>
                  <th>Approval Level Needed</th>
                  <th>Approval Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">EXP-2026-105</td>
                  <td>
                    <div style={{ fontWeight: 700 }}>OT Equipment Maintenance (AMC)</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>GE Healthcare Anaesthesia Service</div>
                  </td>
                  <td style={{ fontWeight: 800, color: 'var(--danger)' }}>₹18,500</td>
                  <td><span className="badge badge-warning">Level 1: Dept Head Signoff</span></td>
                  <td><span className="badge badge-warning">Pending Approval</span></td>
                  <td>
                    <button className="btn btn-success" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('success', 'Approved Expense #EXP-2026-105!')}>
                      ✓ Approve Voucher
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: VENDOR CONTRACTS & AMC */}
      {expenseTab === 'vendor_amc' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🤝 Vendor Contracts, Equipment Service & Annual Maintenance (AMC)</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Track supplier rate contracts, equipment calibration schedules, and AMC renewal alerts.</p>
          <div style={{ padding: '14px', background: 'var(--bg-muted)', borderRadius: '8px', fontSize: '12px' }}>
            <div>• <strong>GE Healthcare India:</strong> OT Anesthesia Workstation AMC Contract (Valid till Dec 2026)</div>
            <div>• <strong>Inox Air Products:</strong> Liquid Oxygen Cylinder Rate Contract (₹1,400 per cylinder)</div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: DEPARTMENT COST CENTERS */}
      {expenseTab === 'department_cost' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🏢 Department Cost Center Allocation & Budget Variance</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Track monthly expenditure budgets vs actual spending for every hospital department.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => addToast('info', 'Generated Department Cost Center Breakdown Report!')}>
            📊 View Budget vs Actual Matrix
          </button>
        </div>
      )}

      {/* SUB-TAB 6: COST PER BED / SURGERY UNIT */}
      {expenseTab === 'unit_costs' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🧮 Unit Cost Analytics (Cost per Patient / Bed / Surgery)</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Granular cost per unit analytics for hospital capacity planning and procedure pricing.</p>

          <div className="grid grid-4" style={{ gap: '16px' }}>
            {unitCostMetrics.map((uc, idx) => (
              <div key={idx} style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>{uc.title}</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>{uc.value}</div>
                <div style={{ fontSize: '10px', color: 'var(--success)', fontWeight: 700, marginTop: '2px' }}>{uc.change} ({uc.status})</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 7: STAFF SALARY & TRAVEL EXPENSES */}
      {expenseTab === 'employee_payroll' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>👨‍⚕️ Employee Salary Expenses, Incentives & Travel Reimbursements</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>HR payroll disbursements, doctor call-duty allowances, and staff welfare expenses.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => addToast('success', 'Logged Monthly Staff Payroll Expense of ₹18,40,000!')}>
            💼 Process Payroll Expense Ledger
          </button>
        </div>
      )}

      {/* SUB-TAB 8: UTILITIES, FUEL & BIO-WASTE */}
      {expenseTab === 'operational_util' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>⚡ Operational Utilities, Generator Fuel & Biomedical Waste Disposal</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Track electricity bills, diesel fuel for backup generators, laundry contracts, and PCB bio-waste disposal.</p>
          <button className="btn btn-warning" style={{ fontSize: '12px' }} onClick={() => addToast('info', 'Logged Monthly Generator Diesel Expense: ₹34,000')}>
            ⛽ Log Fuel / Utility Expense
          </button>
        </div>
      )}

      {/* SUB-TAB 9: AI CATEGORIZATION & OVERRUNS */}
      {expenseTab === 'ai_categorization' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🤖 AI Expense Categorization & Budget Overrun Alerts</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>AI algorithms detect duplicate vendor invoices and forecast monthly expenditure trends.</p>
          
          <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '8px', borderLeft: '4px solid var(--warning)', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--warning)' }}>🚨 AI Budget Overrun Warning (Pharmacy Unit)</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Pharmacy bulk stock purchases exceeded the monthly budget allocation by 8.4%. Recommended action: Pause non-essential IV fluid orders.
            </p>
          </div>
        </div>
      )}

      {/* SUB-TAB 10: REAL-TIME PROFITABILITY DASHBOARD */}
      {expenseTab === 'revenue_profit' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📈 Real-Time Hospital Profitability Dashboard & Net P&L</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Real-time net operating income (NOI) calculation comparing gross billing revenue against total operational expenses.</p>

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
