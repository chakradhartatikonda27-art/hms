import React from 'react';
import { Plus, Search, ChevronRight, Heart, UserPlus, Stethoscope, Scissors, FlaskConical, Pill, Bed, DollarSign, Users } from 'lucide-react';

export interface DashboardModuleProps {
  [key: string]: any;
}

export const DashboardModule: React.FC<DashboardModuleProps> = (props) => {
  const {
    activeTab = 'dashboard',
    setActiveTab = () => {},
    addToast = () => {},
    patients = [],
    setPatients = () => {},
    branchPatients = [],
    branchBeds = [],
    statsSummary = {},
    selectedPatientId = '',
    setSelectedPatientId = () => {},
    selectedPatient = null,
    regForm = {},
    setRegForm = () => {},
    regStep = 1,
    setRegStep = () => {},
    handleRegisterSubmit = () => {},
    handleSendOtp = () => {},
    handleVerifyOtp = () => {},
    handleCheckInsuranceEligibility = () => {},
    handleQrRegistrationScan = () => {},
    handleOcrScanSimulation = () => {},
    handleRegFormNameChange = () => {},
    handleBedTransfer = () => {},
    handleGcsSelect = () => {},
    selectedIcuBedId = '',
    setSelectedIcuBedId = () => {},
    icuTab = 'telemetry',
    setIcuTab = () => {},
    calculatedNetFluid = 0,
    computedPredictions = {},
    handleAddFluidLog = () => {},
    handleAdministerEmar = () => {},
    selectedOtId = '',
    setSelectedOtId = () => {},
    handleScheduleSurgery = () => {},
    selectedLabReportId = '',
    setSelectedLabReportId = () => {},
    showBarcodeModal = false,
    setShowBarcodeModal = () => {},
    showDeltaCheckModal = false,
    setShowDeltaCheckModal = () => {},
    showReagentModal = false,
    setShowReagentModal = () => {},
    newLabPatientName = '',
    setNewLabPatientName = () => {},
    newLabTestName = '',
    setNewLabTestName = () => {},
    newLabCategory = '',
    setNewLabCategory = () => {},
    newLabCollectionMode = '',
    setNewLabCollectionMode = () => {},
    newLabRefDoctor = '',
    setNewLabRefDoctor = () => {},
    handleLabResultSubmit = () => {},
    showPacsViewerModal = false,
    setShowPacsViewerModal = () => {},
    showDeliveryModal = false,
    setShowDeliveryModal = () => {},
    showRadBookingModal = false,
    setShowRadBookingModal = () => {},
    showVoiceDictationModal = false,
    setShowVoiceDictationModal = () => {},
    showMachineDowntimeModal = false,
    setShowMachineDowntimeModal = () => {},
    showCriticalAlertModal = false,
    setShowCriticalAlertModal = () => {},
    selectedRadStudyId = '',
    setSelectedRadStudyId = () => {},
    selectedRadTemplate = '',
    setSelectedRadTemplate = () => {},
    radVoiceText = '',
    setRadVoiceText = () => {},
    pmsEdition = 'standard',
    setPmsEdition = () => {},
    pharmacyLanguage = 'en',
    setPharmacyLanguage = () => {},
    pharmacyDeptFilter = 'all',
    setPharmacyDeptFilter = () => {},
    otcBillForm = {},
    setOtcBillForm = () => {},
    handleOtcBillSubmit = () => {},
    pharmacyReceiptData = null,
    setPharmacyReceiptData = () => {},
    showPharmacyReceiptModal = false,
    setShowPharmacyReceiptModal = () => {},
    showVoiceBillingModal = false,
    setShowVoiceBillingModal = () => {},
    showOcrModal = false,
    setShowOcrModal = () => {},
    getDosageInstruction = () => '',
    handleDispenseMeds = () => {},
    expenses = [],
    setExpenses = () => {},
    branchExpenses = [],
    handleSettleBill = () => {},
    handleSettleReferralPayout = () => {},
    handleAddExpense = () => {},
    selectedIcdCode = '',
    setSelectedIcdCode = () => {},
    handleAssignMrdCode = () => {},
    bloodStock = [],
    setBloodStock = () => {},
    vaccineStock = [],
    setVaccineStock = () => {},
    handleSendAIChat = () => {},
    moduleVisibility = {},
    setModuleVisibility = () => {},
    employees = [],
    setEmployees = () => {},
    audits = [],
    setAudits = () => {},
    handleRunPayroll = () => {},
    handleApproveLeave = () => {},
    alerts = [],
    fitnessCertDetails = {},
    setFitnessCertDetails = () => {},
    setShowFitnessDialog = () => {},
    dashboardViewMode = 'executive',
    setDashboardViewMode = () => {},
    beds = [],
    setBeds = () => {},
    handleAddMedication = () => {},
    handleAddLabRequest = () => {},
    applyAdviceTemplate = () => {},
    ...rest
  } = props;

  const [filterQuery, setFilterQuery] = React.useState('');
  const [activeReportTab, setActiveReportTab] = React.useState('revenue');
  const activeBranch = props.activeBranch || 'metro';
  const activeRole = props.activeRole || 'doctor';
  const branchRevenue = props.branchRevenue || 485000;
  const branchOccupancyRate = props.branchOccupancyRate || 84;
  const branchOccupiedBedsCount = props.branchOccupiedBedsCount || 42;
  const branchTotalBedsCount = props.branchTotalBedsCount || 50;
  const setIpdTab = props.setIpdTab || (() => {});


  return (
            <div className="flex flex-col gap-lg">
              
              {/* Header Banner & 1-Click Quick Launcher Hub */}
              <div className="card" style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(16, 185, 129, 0.05) 100%)', borderLeft: '4px solid var(--primary)', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>🏥 Welcome to SiyanCare HMS Dashboard</span>
                      <span className="badge badge-success">Live System Active</span>
                    </h2>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Simple, clean & user-friendly dashboard overview. Click any action tile below to jump directly into the workspace!
                    </p>
                  </div>

                  {/* Filter View Selector Pills */}
                  <div style={{ display: 'flex', background: 'var(--bg-muted)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border)', flexWrap: 'wrap', gap: '4px' }}>
                    <button onClick={() => setDashboardViewMode('all')} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 600, border: 'none', borderRadius: '6px', background: dashboardViewMode === 'all' ? 'var(--primary)' : 'transparent', color: dashboardViewMode === 'all' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                      🌟 Executive Overview
                    </button>
                    <button onClick={() => setDashboardViewMode('doctor')} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 600, border: 'none', borderRadius: '6px', background: dashboardViewMode === 'doctor' ? 'var(--primary)' : 'transparent', color: dashboardViewMode === 'doctor' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                      👨‍⚕️ Doctor Desk View
                    </button>
                    <button onClick={() => setDashboardViewMode('ipd_icu')} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 600, border: 'none', borderRadius: '6px', background: dashboardViewMode === 'ipd_icu' ? 'var(--primary)' : 'transparent', color: dashboardViewMode === 'ipd_icu' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                      🛌 IPD & ICU Watch
                    </button>
                    <button onClick={() => setDashboardViewMode('ot')} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 600, border: 'none', borderRadius: '6px', background: dashboardViewMode === 'ot' ? 'var(--primary)' : 'transparent', color: dashboardViewMode === 'ot' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                      ✂️ OT Surgery Watch
                    </button>
                    <button onClick={() => setDashboardViewMode('lab')} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 600, border: 'none', borderRadius: '6px', background: dashboardViewMode === 'lab' ? 'var(--primary)' : 'transparent', color: dashboardViewMode === 'lab' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                      🔬 Pathology Lab Watch
                    </button>
                  </div>
                </div>

                {/* 1-Click Quick Launcher Action Hub */}
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    ⚡ 1-Click Quick Action Launcher
                  </div>
                  <div className="grid grid-4" style={{ gap: '10px' }}>
                    <button onClick={() => setActiveTab('registration')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <UserPlus size={18} style={{ color: 'var(--primary)' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>Register New Patient</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Create UHID & Medical File</div>
                      </div>
                    </button>

                    <button onClick={() => setActiveTab('consultation')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <Stethoscope size={18} style={{ color: 'var(--success)' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>OPD Consultation Desk</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Examine & Write eRx</div>
                      </div>
                    </button>

                    <button onClick={() => setActiveTab('icu')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <Heart size={18} style={{ color: '#EAB308' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>ICU Suite Monitor</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Vitals & Critical Alerts</div>
                      </div>
                    </button>

                    <button onClick={() => setActiveTab('ot')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <Scissors size={18} style={{ color: '#EC4899' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>OT Surgery Suite</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Whiteboard & Operative Notes</div>
                      </div>
                    </button>

                    <button onClick={() => setActiveTab('lab')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <FlaskConical size={18} style={{ color: '#8B5CF6' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>Pathology & Radiology</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Book Orders & View Reports</div>
                      </div>
                    </button>

                    <button onClick={() => setActiveTab('pharmacy')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <Pill size={18} style={{ color: '#06B6D4' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>Pharmacy Counter</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Dispense eRx & OTC Cashier</div>
                      </div>
                    </button>

                    <button onClick={() => { setActiveTab('wards'); setIpdTab('overview'); }} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <Bed size={18} style={{ color: '#10B981' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>IPD Wards & Beds</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Bed Occupancy & Transfers</div>
                      </div>
                    </button>

                    <button onClick={() => setActiveTab('billing')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <DollarSign size={18} style={{ color: '#F59E0B' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>Billing & Claims</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Invoices & TPA Insurance</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Stat Summary Cards */}
              <div className="grid grid-4" style={{ gap: '16px' }}>
                <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                  <div className="card-header">
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Patients Today</span>
                    <Users size={18} style={{ color: 'var(--primary)' }} />
                  </div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0' }}>{statsSummary.totalPatients}</h2>
                  <div style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>↑ +12% vs Yesterday</div>
                </div>

                <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
                  <div className="card-header">
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Bed Occupancy</span>
                    <Bed size={18} style={{ color: 'var(--success)' }} />
                  </div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0' }}>{statsSummary.bedOccupancyRate}%</h2>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{statsSummary.activeICU} ICU Beds Active</div>
                </div>

                <div className="card" style={{ borderLeft: '4px solid #EAB308' }}>
                  <div className="card-header">
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>OT Surgeries Today</span>
                    <Scissors size={18} style={{ color: '#EAB308' }} />
                  </div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0' }}>6 Scheduled</h2>
                  <div style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>2 Surgeries In Progress</div>
                </div>

                <div className="card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                  <div className="card-header">
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Pathology Lab Reports</span>
                    <FlaskConical size={18} style={{ color: '#8B5CF6' }} />
                  </div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0' }}>128 Done</h2>
                  <div style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>99.4% On-time TAT</div>
                </div>
              </div>

              {/* Graphical Visualizations & Lists */}
              <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* SVG Revenue performance graph */}
                <div className="card">
                  <div className="card-header">
                    <h2>OPD vs IPD Patient Stream (Last 6 Hours)</h2>
                    <div className="flex gap-sm">
                      <span className="badge badge-primary">OPD Intake</span>
                      <span className="badge badge-success">IPD Intake</span>
                    </div>
                  </div>
                  <div style={{ height: '220px', position: 'relative', marginTop: '20px' }}>
                    <svg className="svg-chart" viewBox="0 0 500 200" preserveAspectRatio="none">
                      <line x1="0" y1="50" x2="500" y2="50" className="chart-grid-line" />
                      <line x1="0" y1="100" x2="500" y2="100" className="chart-grid-line" />
                      <line x1="0" y1="150" x2="500" y2="150" className="chart-grid-line" />
                      
                      <path d="M 0 160 Q 100 80, 200 120 T 400 60 L 500 90 L 500 200 L 0 200 Z" className="chart-area" />
                      <path d="M 0 160 Q 100 80, 200 120 T 400 60 L 500 90" className="chart-line" />

                      <path d="M 0 180 Q 100 120, 200 140 T 400 90 L 500 110" className="chart-line" style={{ stroke: 'var(--success)' }} />
                    </svg>
                    <div className="flex justify-between text-xs text-muted" style={{ marginTop: '8px' }}>
                      <span>16:00</span>
                      <span>17:00</span>
                      <span>18:00</span>
                      <span>19:00</span>
                      <span>20:00</span>
                      <span>21:00</span>
                    </div>
                  </div>
                </div>

                {/* Operations checklist and calendar alerts */}
                <div className="card">
                  <div className="card-header">
                    <h2>OT Schedule Today</h2>
                    <span className="badge badge-muted">3 surgeries scheduled</span>
                  </div>
                  <div className="flex flex-col gap-md" style={{ marginTop: '16px' }}>
                    <div className="flex gap-md" style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '12px' }}>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>CABG Bypass Grafting</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Patient: Aarav Sharma | OT-1</div>
                        <div style={{ fontSize: '11px', color: 'var(--primary)', marginTop: '4px' }}>09:00 AM - 12:30 PM</div>
                      </div>
                      <span className="badge badge-success" style={{ alignSelf: 'flex-start' }}>Done</span>
                    </div>

                    <div className="flex gap-md" style={{ borderLeft: '3px solid var(--warning)', paddingLeft: '12px' }}>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>Laparoscopic Appendectomy</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Patient: Priya Nair | OT-2</div>
                        <div style={{ fontSize: '11px', color: 'var(--warning)', marginTop: '4px' }}>03:00 PM - 04:30 PM</div>
                      </div>
                      <span className="badge badge-warning" style={{ alignSelf: 'flex-start' }}>Delayed</span>
                    </div>

                    <div className="flex gap-md" style={{ borderLeft: '3px solid var(--danger)', paddingLeft: '12px' }}>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>Total Hip Replacement</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Patient: Vikram Malhotra | OT-1</div>
                        <div style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '4px' }}>05:30 PM - 07:30 PM</div>
                      </div>
                      <span className="badge badge-danger" style={{ alignSelf: 'flex-start' }}>In Progress</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Enterprise Queue Table */}
              <div className="card">
                <div className="card-header">
                  <h2>Active Patient Queue - {activeBranch.toUpperCase()} Branch</h2>
                  <div className="flex gap-sm">
                    <div style={{ position: 'relative' }}>
                      <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        placeholder="Search patient name..."
                        className="form-input"
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        style={{ paddingLeft: '28px', width: '220px', height: '32px' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="table-container" style={{ marginTop: '16px' }}>
                  <div className="data-table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Patient ID</th>
                          <th>Patient Name</th>
                          <th>Age / Gender</th>
                          <th>ESI Acuity</th>
                          <th>Blood Group</th>
                          <th>Vitals (BP / HR / O2)</th>
                          <th>Workflow Status</th>
                          <th>ICD Class Link</th>
                          <th>Billing Status</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {branchPatients
                          .filter(p => p.name.toLowerCase().includes(filterQuery.toLowerCase()))
                          .map((p) => (
                            <tr key={p.id} className={selectedPatientId === p.id ? 'active' : ''}>
                              <td className="font-semibold">{p.id}</td>
                              <td>{p.name}</td>
                              <td>{p.age} Y / {p.gender}</td>
                              <td>
                                <span className={`badge ${
                                  p.esiScore === 1 ? 'badge-danger font-bold' :
                                  p.esiScore === 2 ? 'badge-danger' :
                                  p.esiScore === 3 ? 'badge-warning' : 'badge-primary'
                                }`}>
                                  ESI-{p.esiScore || 3}
                                </span>
                              </td>
                              <td>{p.bloodGroup}</td>
                              <td>
                                <span className={p.vitals.heartRate > 100 || p.vitals.oxygenSat < 96 ? 'badge badge-danger' : 'badge badge-muted'}>
                                  {p.vitals.bloodPressure} | {p.vitals.heartRate} bpm | {p.vitals.oxygenSat}%
                                </span>
                              </td>
                              <td>
                                <span className={`badge ${
                                  p.status === 'in-consultation' ? 'badge-primary' :
                                  p.status === 'lab-pending' ? 'badge-warning' :
                                  p.status === 'pharmacy-pending' ? 'badge-warning' :
                                  p.status === 'billed' ? 'badge-success' :
                                  p.status === 'discharged' ? 'badge-muted' : 'badge-muted'
                                }`}>
                                  {p.status}
                                </span>
                              </td>
                              <td>
                                <span className="badge badge-muted" style={{ fontFamily: 'monospace' }}>
                                  {p.mrdCode || 'Not Codified'}
                                </span>
                              </td>
                              <td>
                                <span className={p.pendingBill > 0 ? 'badge badge-danger' : 'badge badge-success'}>
                                  {p.pendingBill > 0 ? `₹${p.pendingBill.toLocaleString()} Pending` : 'Settled'}
                                </span>
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <button
                                  className="btn btn-secondary btn-icon"
                                  onClick={() => {
                                    setSelectedPatientId(p.id);
                                    setActiveTab(activeRole === 'doctor' ? 'consultation' : activeRole === 'accountant' ? 'billing' : 'consultation');
                                  }}
                                >
                                  <ChevronRight size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Enterprise OPD Reports & Analytics Suite Card */}
              <div className="card" style={{ marginTop: '20px' }}>
                <div className="card-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Enterprise OPD Reports & Analytics Suite</h2>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Interactive, real-time analytics covering all 7 standard hospital reporting vectors.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', maxWidth: '100%' }}>
                    {[
                      { key: 'daily', label: 'Daily OPD' },
                      { key: 'doctor', label: 'Doctor-wise' },
                      { key: 'department', label: 'Department-wise' },
                      { key: 'diagnosis', label: 'Diagnosis Stats' },
                      { key: 'prescriptions', label: 'Rx Analytics' },
                      { key: 'followups', label: 'Follow-ups' },
                      { key: 'revenue', label: 'Revenue Report' }
                    ].map((tab) => (
                      <button
                        type="button"
                        key={tab.key}
                        onClick={() => setActiveReportTab(tab.key as any)}
                        style={{
                          padding: '4px 10px',
                          fontSize: '10px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          background: activeReportTab === tab.key ? 'var(--primary)' : 'var(--bg-muted)',
                          color: activeReportTab === tab.key ? 'white' : 'var(--text-muted)',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '16px' }}>
                  {activeReportTab === 'daily' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Today's Live OPD Registration Summary</h3>
                      <div className="grid grid-4" style={{ gap: '12px' }}>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total OPD Registrations</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>18 Patients</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Walk-in Registrations</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>9 Patients (50%)</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Online Pre-Registrations</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>5 Patients (28%)</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Corporate / Referral Registrations</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>4 Patients (22%)</h4>
                        </div>
                      </div>
                      <div style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '12px', marginTop: '4px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'white', marginBottom: '8px' }}>Recent Audit Log Registries (Daily Stream)</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div>• [09:12 AM] - Walk-in patient Aarav Sharma registered via UHID Auto-Generator.</div>
                          <div>• [10:34 AM] - Pre-registered patient Priya Nair admitted to Cardiology Clinic queue.</div>
                          <div>• [11:15 AM] - Corporate clearance approved for patient Vikram Malhotra.</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeReportTab === 'doctor' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Doctor Consultation Productivity Index</h3>
                      <table className="data-table" style={{ fontSize: '12px', width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                            <th style={{ padding: '8px' }}>Doctor Name</th>
                            <th style={{ padding: '8px' }}>Specialization</th>
                            <th style={{ padding: '8px' }}>Patients Seen</th>
                            <th style={{ padding: '8px' }}>Avg Consultation Time</th>
                            <th style={{ padding: '8px' }}>Revenue Contributed</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <td className="font-semibold" style={{ padding: '8px' }}>Dr. Sandeep Mehta</td>
                            <td style={{ padding: '8px' }}>Chief Cardiologist</td>
                            <td style={{ padding: '8px' }}>12 Patients</td>
                            <td style={{ padding: '8px' }}>14.2 minutes</td>
                            <td style={{ color: 'var(--success)', padding: '8px', fontWeight: 600 }}>₹24,000</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <td className="font-semibold" style={{ padding: '8px' }}>Dr. Ananya Ray</td>
                            <td style={{ padding: '8px' }}>General Physician</td>
                            <td style={{ padding: '8px' }}>8 Patients</td>
                            <td style={{ padding: '8px' }}>10.5 minutes</td>
                            <td style={{ color: 'var(--success)', padding: '8px', fontWeight: 600 }}>₹8,000</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <td className="font-semibold" style={{ padding: '8px' }}>Dr. Deepa Roy</td>
                            <td style={{ padding: '8px' }}>Internal Medicine</td>
                            <td style={{ padding: '8px' }}>6 Patients</td>
                            <td style={{ padding: '8px' }}>18.1 minutes</td>
                            <td style={{ color: 'var(--success)', padding: '8px', fontWeight: 600 }}>₹6,000</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <td className="font-semibold" style={{ padding: '8px' }}>Dr. Sanjay Sen</td>
                            <td style={{ padding: '8px' }}>Pediatric Specialist</td>
                            <td style={{ padding: '8px' }}>4 Patients</td>
                            <td style={{ padding: '8px' }}>12.0 minutes</td>
                            <td style={{ color: 'var(--success)', padding: '8px', fontWeight: 600 }}>₹4,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeReportTab === 'department' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Department-wise Patient Load Summary</h3>
                      <div className="grid grid-3" style={{ gap: '12px' }}>
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '6px', textAlign: 'center', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cardiology Clinic</span>
                          <h4 style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0', color: 'var(--primary)' }}>12 Patients</h4>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>40% load factor</span>
                        </div>
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '6px', textAlign: 'center', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Internal Medicine</span>
                          <h4 style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0', color: 'var(--success)' }}>8 Patients</h4>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>27% load factor</span>
                        </div>
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '6px', textAlign: 'center', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pediatric Clinic</span>
                          <h4 style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0', color: 'var(--warning)' }}>6 Patients</h4>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>20% load factor</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeReportTab === 'diagnosis' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Top ICD Diagnosis Code Frequencies</h3>
                      <div className="grid grid-2" style={{ gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                            <span>Essential hypertension [ICD-10 I10]</span>
                            <strong>42% (8 cases)</strong>
                          </div>
                          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: '42%', background: 'var(--primary)' }}></div>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '4px' }}>
                            <span>Type 2 diabetes mellitus [ICD-10 E11]</span>
                            <strong>26% (5 cases)</strong>
                          </div>
                          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: '26%', background: 'var(--success)' }}></div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                            <span>Coronary artery disease [ICD-10 I25.1]</span>
                            <strong>16% (3 cases)</strong>
                          </div>
                          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: '16%', background: 'var(--warning)' }}></div>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '4px' }}>
                            <span>Allergic asthma [ICD-10 J45.909]</span>
                            <strong>10% (2 cases)</strong>
                          </div>
                          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: '10%', background: 'var(--danger)' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeReportTab === 'prescriptions' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>SaaS Prescribing & Generic Efficiency Stats</h3>
                      <div className="grid grid-4" style={{ gap: '12px' }}>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total E-Prescriptions Issued</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>34 Prescriptions</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Generic Brand Substitutions</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>88.2% (28 Success)</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Drug Interaction Safety Alerts</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--danger)' }}>3 Blocked Interactions</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Multi-language Translations</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>9 Hindi / 4 Telugu prints</h4>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeReportTab === 'followups' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Chronic Disease Patient Follow-up & Compliance Registry</h3>
                      <div className="grid grid-3" style={{ gap: '12px' }}>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>WhatsApp Reminder Delivery Success</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>94.1% Delivery Rate</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Compliance / Retention Rate</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--primary)' }}>82.5% Return Compliance</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Missed Follow-ups Registered</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--warning)' }}>2 Patients Tracked</h4>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeReportTab === 'revenue' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Live OPD Segment Revenue Distributions</h3>
                      <div className="grid grid-4" style={{ gap: '12px' }}>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Doctor Consultation Fees</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>₹42,000</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Laboratory Investigation Revenue</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>₹18,500</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Radiology Scan Bilateral fees</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>₹14,000</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pharmacy Dispensed Billing</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>₹22,100</h4>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
  );
};
