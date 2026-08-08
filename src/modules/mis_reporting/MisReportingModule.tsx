import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Activity, FileSpreadsheet, Download, Filter, Calendar, PieChart, ShieldAlert, Award, FileText, CheckCircle2, RefreshCw, Tv, Sparkles, Send, Share2, Layers, AlertCircle, ArrowUpRight, ChevronRight } from 'lucide-react';

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

  const [misTab, setMisTab] = React.useState<'workflow' | 'command_center' | 'nl_query' | 'finance_pnl' | 'operations_tat' | 'clinical_outcomes' | 'business_doctor' | 'hr_inventory' | 'custom_builder' | 'compliance_nabh'>('command_center');
  const [nlQueryInput, setNlQueryInput] = React.useState('');
  const [nlQueryResult, setNlQueryResult] = React.useState<any>(null);
  const [showTvCommandModal, setShowTvCommandModal] = React.useState(false);

  // 7-Step Central Data Pipeline Workflow
  const misPipelineSteps = [
    { step: 1, title: 'All HMS Modules', icon: '🏥', count: 18, desc: 'Real-Time Sync' },
    { step: 2, title: 'Data Warehouse', icon: '🗄️', count: 1420, desc: 'Centralized ETL' },
    { step: 3, title: 'KPI Engine', icon: '⚡', count: 24, desc: 'RAG Calculation' },
    { step: 4, title: 'Analytics Engine', icon: '📈', count: 12, desc: 'Predictive Models' },
    { step: 5, title: 'Dashboards', icon: '🖥️', count: 8, desc: 'CFO/CEO Views' },
    { step: 6, title: 'AI Insights', icon: '🤖', count: 5, desc: 'Natural Query' },
    { step: 7, title: 'Scheduled Alerts', icon: '📲', count: 4, desc: 'WhatsApp & Email' }
  ];

  // RAG Indicators Data
  const commandCenterMetrics = [
    { metric: 'Gross Monthly Revenue', value: '₹48.50 Lakhs', rag: 'Green', target: '₹45.00 Lakhs', trend: '+14.2% MoM' },
    { metric: 'ICU Bed Occupancy Rate', value: '88.4%', rag: 'Green', target: '85.0%', trend: 'Optimal Capacity' },
    { metric: 'Pathology Lab TAT', value: '42 mins', rag: 'Green', target: '< 45 mins', trend: 'NABL Met' },
    { metric: 'General Ward Occupancy', value: '76.2%', rag: 'Amber', target: '80.0%', trend: 'Moderate Capacity' },
    { metric: 'TPA Insurance Outstanding', value: '₹8.40 Lakhs', rag: 'Red', target: '< ₹5.00 Lakhs', trend: 'Action Needed' },
    { metric: 'Pharmacy Near-Expiry Stock', value: '14 Batches', rag: 'Amber', target: '< 10 Batches', trend: 'Discount Promo' }
  ];

  const handleNlQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlQueryInput.trim()) return;

    setNlQueryResult({
      query: nlQueryInput,
      title: 'OPD Consultation Revenue Report (August 2026)',
      totalRevenue: '₹14,50,000',
      consultationCount: 184,
      avgConsultationFee: '₹7,880',
      topDoctor: 'Dr. Sandeep Mehta (Cardiology) - ₹4,80,000 Revenue'
    });
    addToast('success', 'AI Generated Customized Visual Report!');
  };

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
              <span>📊 Enterprise MIS Reporting & Command Center (4.15)</span>
              <span className="badge badge-success" style={{ fontSize: '11px', padding: '4px 10px' }}>⭐ AI Natural Query & TV Display Mode</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
              Central Data Warehouse Analytics: Real-Time Command Center, Natural Language Queries, P&L Statements, and RAG Indicators.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowTvCommandModal(true)}>
              📺 TV Command Display Mode
            </button>
            <button className="btn btn-primary" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => handleExportReport('Board PDF Package')}>
              📄 Download Board PDF Package
            </button>
          </div>
        </div>

        {/* 7-Step Central Data Pipeline Workflow Bar */}
        <div style={{ marginTop: '20px', background: 'var(--bg-card)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔄 7-Step Central Data Warehouse Pipeline Flow</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {misPipelineSteps.map((s, idx) => (
              <React.Fragment key={s.step}>
                <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-muted)', border: '1px solid var(--border)', minWidth: '125px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>STEP {s.step}</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, marginTop: '2px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{s.icon}</span>
                    <span>{s.title}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--success)', marginTop: '4px', fontWeight: 700 }}>{s.count} Synced</div>
                </div>

                {idx < misPipelineSteps.length - 1 && (
                  <span style={{ fontSize: '14px', color: 'var(--success)', fontWeight: 800 }}>➔</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 10 Navigation Sub-Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setMisTab('command_center')}
            className={`btn ${misTab === 'command_center' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📺 Real-Time Command Center
          </button>
          <button
            onClick={() => setMisTab('nl_query')}
            className={`btn ${misTab === 'nl_query' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🤖 AI Natural Query Generator
          </button>
          <button
            onClick={() => setMisTab('finance_pnl')}
            className={`btn ${misTab === 'finance_pnl' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            💵 Finance, P&L & Cash Flow
          </button>
          <button
            onClick={() => setMisTab('operations_tat')}
            className={`btn ${misTab === 'operations_tat' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🏥 Operations, Bed ALOS & TAT
          </button>
          <button
            onClick={() => setMisTab('clinical_outcomes')}
            className={`btn ${misTab === 'clinical_outcomes' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🩺 Clinical Outcomes & Mortality
          </button>
          <button
            onClick={() => setMisTab('business_doctor')}
            className={`btn ${misTab === 'business_doctor' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📈 Doctor Revenue & Growth
          </button>
          <button
            onClick={() => setMisTab('hr_inventory')}
            className={`btn ${misTab === 'hr_inventory' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            👨‍💼 HR Payroll & Drug Stock Analytics
          </button>
          <button
            onClick={() => setMisTab('custom_builder')}
            className={`btn ${misTab === 'custom_builder' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🛠️ Drag & Drop Report Builder
          </button>
          <button
            onClick={() => setMisTab('compliance_nabh')}
            className={`btn ${misTab === 'compliance_nabh' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📜 NABH & Audit Compliance
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: REAL-TIME HOSPITAL COMMAND CENTER */}
      {misTab === 'command_center' && (
        <div className="flex flex-col gap-lg">
          <div className="card">
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>
              📺 Real-Time Hospital Command Center Dashboard (Red / Amber / Green Status)
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Color-coded KPI indicators monitoring hospital capacity, revenue targets, and critical operational alerts.
            </p>

            <div className="grid grid-3" style={{ gap: '16px' }}>
              {commandCenterMetrics.map((cm, idx) => (
                <div key={idx} style={{ padding: '16px', borderRadius: '10px', background: 'var(--bg-card)', border: `2px solid ${cm.rag === 'Green' ? 'var(--success)' : cm.rag === 'Amber' ? 'var(--warning)' : 'var(--danger)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>{cm.metric}</span>
                    <span className={`badge ${cm.rag === 'Green' ? 'badge-success' : cm.rag === 'Amber' ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: '10px' }}>
                      ● {cm.rag} Status
                    </span>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px', color: 'var(--text-main)' }}>{cm.value}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Target Benchmark: {cm.target}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: cm.rag === 'Green' ? 'var(--success)' : 'var(--danger)', marginTop: '2px' }}>{cm.trend}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: AI NATURAL LANGUAGE QUERY GENERATOR */}
      {misTab === 'nl_query' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🤖 AI Natural Language Query & Instant Report Engine</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Type plain English questions to automatically extract data and render visual charts.</p>

          <form onSubmit={handleNlQuerySubmit} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="e.g. 'Show OPD revenue for August' or 'List ICU bed occupancy last week'..."
              className="form-input"
              value={nlQueryInput}
              onChange={(e) => setNlQueryInput(e.target.value)}
              style={{ flexGrow: 1 }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 20px', fontWeight: 800 }}>
              🤖 Generate AI Report
            </button>
          </form>

          {nlQueryResult && (
            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>{nlQueryResult.title}</div>
              <div className="grid grid-2" style={{ gap: '12px', fontSize: '12px' }}>
                <div>• <strong>Total OPD Revenue:</strong> <span style={{ color: 'var(--success)', fontWeight: 800 }}>{nlQueryResult.totalRevenue}</span></div>
                <div>• <strong>Total Consultations:</strong> {nlQueryResult.consultationCount}</div>
                <div>• <strong>Average Fee:</strong> {nlQueryResult.avgConsultationFee}</div>
                <div>• <strong>Top Doctor:</strong> {nlQueryResult.topDoctor}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: FINANCE, P&L & CASH FLOW */}
      {misTab === 'finance_pnl' && (
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

      {/* SUB-TAB 4: OPERATIONS, BED ALOS & TAT */}
      {misTab === 'operations_tat' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🏥 Operations & Turnaround Time (TAT) Analytics</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Bed turnover velocity, diagnostic report delivery TAT, and equipment preventive maintenance compliance.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => handleExportReport('Operations & TAT Performance')}>
            📥 Export Operations Summary
          </button>
        </div>
      )}

      {/* SUB-TAB 5: CLINICAL OUTCOMES & MORTALITY */}
      {misTab === 'clinical_outcomes' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🩺 Clinical Outcome & Quality Compliance Reports</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Surgical success rates, hospital-acquired infection (HAI) monitoring, and mortality audit reports.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => handleExportReport('Clinical Outcome Audit')}>
            🩺 Export Clinical Audit PDF
          </button>
        </div>
      )}

      {/* SUB-TAB 6: DOCTOR REVENUE & GROWTH */}
      {misTab === 'business_doctor' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📈 Business Analytical Reports & Doctor Revenue Contribution</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Consultant billing contribution matrix, referral doctor commissions, and patient payer demographic splits.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => handleExportReport('Doctor Billing Contribution')}>
            📈 Export Consultant Revenue Matrix
          </button>
        </div>
      )}

      {/* SUB-TAB 7: HR PAYROLL & DRUG STOCK ANALYTICS */}
      {misTab === 'hr_inventory' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>👨‍💼 HR Payroll & Pharmacy Inventory Movement</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Staff attendance ratios, payroll costs, fast vs slow-moving medicines, and near-expiry drugs.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => handleExportReport('HR & Pharmacy Movement')}>
            📦 Export Stock & HR Summary
          </button>
        </div>
      )}

      {/* SUB-TAB 8: DRAG & DROP REPORT BUILDER */}
      {misTab === 'custom_builder' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🛠️ Custom Drag & Drop Report Builder</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Select custom metrics, group by department or doctor, and save custom report templates.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => addToast('success', 'Created Custom Report Template!')}>
            🛠️ Save Custom Report Template
          </button>
        </div>
      )}

      {/* SUB-TAB 9: NABH & AUDIT COMPLIANCE */}
      {misTab === 'compliance_nabh' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📜 NABH Audit & Compliance Data Logs</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Generate NABH accreditation data packages, consent form audits, and HIPAA access logs.</p>
          <button className="btn btn-success" style={{ fontSize: '12px' }} onClick={() => handleExportReport('NABH Audit Package')}>
            📜 Export NABH Compliance Bundle
          </button>
        </div>
      )}

      {/* TV COMMAND DISPLAY MODAL */}
      {showTvCommandModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0F172A', zIndex: 9999, padding: '30px', color: 'white', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📺 HEXENCARE HOSPITAL COMMAND CENTER (LIVE TV MODE)</span>
              </h2>
              <p style={{ fontSize: '13px', color: '#94A3B8' }}>Live Management Board Display • Real-time Data Sync Every 10s</p>
            </div>
            <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }} onClick={() => setShowTvCommandModal(false)}>
              ✕ Exit TV Mode
            </button>
          </div>

          <div className="grid grid-3" style={{ gap: '20px' }}>
            {commandCenterMetrics.map((cm, idx) => (
              <div key={idx} style={{ padding: '24px', borderRadius: '16px', background: 'rgba(30, 41, 59, 0.8)', border: `2px solid ${cm.rag === 'Green' ? '#10B981' : cm.rag === 'Amber' ? '#F59E0B' : '#EF4444'}` }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#94A3B8' }}>{cm.metric}</div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginTop: '10px' }}>{cm.value}</div>
                <div style={{ fontSize: '12px', color: cm.rag === 'Green' ? '#10B981' : '#EF4444', fontWeight: 700, marginTop: '8px' }}>{cm.trend}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
