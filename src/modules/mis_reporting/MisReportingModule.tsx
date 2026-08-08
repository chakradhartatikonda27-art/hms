import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Activity, FileSpreadsheet, Download, Filter, Calendar, PieChart, ShieldAlert, Award, FileText, CheckCircle2, RefreshCw } from 'lucide-react';

export interface MisReportingModuleProps {
  [key: string]: any;
}

export const MisReportingModule: React.FC<MisReportingModuleProps> = (props) => {
  const {
    activeTab = 'mis_reporting',
    setActiveTab = () => {},
    addToast = () => {},
    patients = [],
    expenses = [],
    branches = [],
    ...rest
  } = props;

  const [misTab, setMisTab] = React.useState<'finance' | 'operations' | 'clinical' | 'business' | 'smart_dashboard'>('smart_dashboard');
  const [dateRange, setDateRange] = React.useState('this_month');
  const [selectedDept, setSelectedDept] = React.useState('all');

  // Sample MIS Financial Metrics
  const financeMetrics = {
    grossRevenue: '₹48,50,000',
    netRevenue: '₹41,20,000',
    opdBilling: '₹14,50,000',
    ipdBilling: '₹22,80,000',
    pharmacyBilling: '₹6,40,000',
    labBilling: '₹4,80,000',
    expenses: '₹28,60,000',
    netProfit: '₹12,60,000'
  };

  // Sample Operational Metrics
  const operationalMetrics = [
    { metric: 'ICU Bed Occupancy Rate', value: '88.4%', target: '85%', status: 'Optimal' },
    { metric: 'General Ward Occupancy Rate', value: '76.2%', target: '80%', status: 'Normal' },
    { metric: 'Pathology Lab Test TAT', value: '42 mins', target: '45 mins', status: 'NABL Met' },
    { metric: 'Radiology Scan TAT', value: '55 mins', target: '60 mins', status: 'Met' },
    { metric: 'Average Length of Stay (ALOS)', value: '3.4 Days', target: '3.8 Days', status: 'Efficient' }
  ];

  const handleExportReport = (reportType: string) => {
    addToast('success', `Exported ${reportType} MIS Report to Excel & PDF!`);
  };

  return (
    <div className="flex flex-col gap-lg">
      {/* MIS Reporting Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%)', borderLeft: '6px solid var(--success)', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>📊 Management Information System (MIS) Reporting (4.15)</span>
              <span className="badge badge-success" style={{ fontSize: '11px', padding: '4px 10px' }}>Executive Analytics Suite</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
              Financial Statements, Operational Efficiency, Clinical Outcomes, Business Analytics, and Interactive Dashboards.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => handleExportReport('Executive Summary')}>
              📥 Export All MIS (Excel)
            </button>
            <button className="btn btn-primary" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => handleExportReport('Board PDF Package')}>
              📄 Download Board PDF
            </button>
          </div>
        </div>

        {/* 5 Main Sub-Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setMisTab('smart_dashboard')}
            className={`btn ${misTab === 'smart_dashboard' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📊 Smart Report Dashboard
          </button>
          <button
            onClick={() => setMisTab('finance')}
            className={`btn ${misTab === 'finance' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            💵 Finance Reports & P&L
          </button>
          <button
            onClick={() => setMisTab('operations')}
            className={`btn ${misTab === 'operations' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🏥 Operations & TAT Reports
          </button>
          <button
            onClick={() => setMisTab('clinical')}
            className={`btn ${misTab === 'clinical' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🩺 Clinical & Outcome Reports
          </button>
          <button
            onClick={() => setMisTab('business')}
            className={`btn ${misTab === 'business' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📈 Business Analytics & Doctors
          </button>
        </div>
      </div>

      {/* PILLAR 1: SMART REPORT DASHBOARD */}
      {misTab === 'smart_dashboard' && (
        <div className="flex flex-col gap-lg">
          {/* Key KPI Cards */}
          <div className="grid grid-4" style={{ gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Gross Monthly Revenue</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>{financeMetrics.grossRevenue}</div>
              <div style={{ fontSize: '10px', color: 'var(--success)', fontWeight: 700, marginTop: '2px' }}>+ 14.2% vs Last Month</div>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)', borderLeft: '4px solid var(--danger)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Total Operational Expenses</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--danger)', marginTop: '4px' }}>{financeMetrics.expenses}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, marginTop: '2px' }}>58.9% Expense-to-Rev Ratio</div>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)', borderLeft: '4px solid var(--success)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Net Operating Profit</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--success)', marginTop: '4px' }}>{financeMetrics.netProfit}</div>
              <div style={{ fontSize: '10px', color: 'var(--success)', fontWeight: 700, marginTop: '2px' }}>26.0% Net Profit Margin</div>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)', borderLeft: '4px solid #9333EA' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>ICU & Bed Occupancy</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#9333EA', marginTop: '4px' }}>88.4%</div>
              <div style={{ fontSize: '10px', color: 'var(--success)', fontWeight: 700, marginTop: '2px' }}>High Capacity Utilization</div>
            </div>
          </div>

          <div className="grid grid-2" style={{ gap: '16px' }}>
            <div className="card">
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>💵 Departmental Revenue Breakdown</h3>
              <div className="table-container">
                <table className="data-table" style={{ fontSize: '12px' }}>
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Revenue (₹)</th>
                      <th>Share (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="font-semibold">IPD Wards & ICU</td><td>₹22,80,000</td><td><span className="badge badge-primary">47.0%</span></td></tr>
                    <tr><td className="font-semibold">OPD Consultations</td><td>₹14,50,000</td><td><span className="badge badge-secondary">29.8%</span></td></tr>
                    <tr><td className="font-semibold">Pharmacy POS</td><td>₹6,40,000</td><td><span className="badge badge-success">13.1%</span></td></tr>
                    <tr><td className="font-semibold">Pathology & Radiology</td><td>₹4,80,000</td><td><span className="badge badge-warning">10.1%</span></td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🏥 Hospital Operational Efficiency Overview</h3>
              <div className="table-container">
                <table className="data-table" style={{ fontSize: '12px' }}>
                  <thead>
                    <tr>
                      <th>Operational KPI</th>
                      <th>Current Benchmark</th>
                      <th>Target</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {operationalMetrics.map((om, idx) => (
                      <tr key={idx}>
                        <td className="font-semibold">{om.metric}</td>
                        <td style={{ fontWeight: 800, color: 'var(--primary)' }}>{om.value}</td>
                        <td>{om.target}</td>
                        <td><span className="badge badge-success">{om.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 2: FINANCE REPORTS */}
      {misTab === 'finance' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>💵 Financial Statements & Profitability Reports</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Gross Revenue, Operating Expenses, Net Operating Profit, and GST Tax Compliance Ledger.</p>
            </div>
            <button className="btn btn-secondary" style={{ fontSize: '11px' }} onClick={() => handleExportReport('Financial P&L Ledger')}>
              📥 Export Financial Excel
            </button>
          </div>

          <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', fontSize: '13px', lineHeight: '1.8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
              <span>Gross Hospital Revenue:</span>
              <strong style={{ color: 'var(--success)' }}>+ ₹48,50,000</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '6px', paddingTop: '6px' }}>
              <span>Total Operational & Stock Expenses:</span>
              <strong style={{ color: 'var(--danger)' }}>- ₹28,60,000</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', fontSize: '16px', fontWeight: 800 }}>
              <span>Net Operating Profit Before Taxes:</span>
              <strong style={{ color: 'var(--primary)' }}>₹19,90,000 (41.0% Margin)</strong>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 3: OPERATIONS REPORTS */}
      {misTab === 'operations' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🏥 Operations & Turnaround Time (TAT) Analytics</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Bed turnover velocity, diagnostic report delivery TAT, and equipment preventive maintenance compliance.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => handleExportReport('Operations & TAT Performance')}>
            📥 Export Operations Summary
          </button>
        </div>
      )}

      {/* PILLAR 4: CLINICAL REPORTS */}
      {misTab === 'clinical' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🩺 Clinical Outcome & Quality Compliance Reports</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Surgical success rates, hospital-acquired infection (HAI) monitoring, and mortality audit reports.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => handleExportReport('Clinical Outcome Audit')}>
            🩺 Export Clinical Audit PDF
          </button>
        </div>
      )}

      {/* PILLAR 5: BUSINESS ANALYTICS */}
      {misTab === 'business' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📈 Business Analytical Reports & Doctor Revenue Contribution</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Consultant billing contribution matrix, referral doctor commissions, and patient payer demographic splits.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => handleExportReport('Doctor Billing Contribution')}>
            📈 Export Consultant Revenue Matrix
          </button>
        </div>
      )}
    </div>
  );
};
