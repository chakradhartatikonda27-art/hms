import React from 'react';
import { Bed } from 'lucide-react';

export interface OtModuleProps {
  [key: string]: any;
}

export const OtModule: React.FC<OtModuleProps> = (props) => {
  const {
    activeTab = 'ot',
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

  const [otSubTab, setOtSubTab] = React.useState('whiteboard');
  const [showOtRescheduleModal, setShowOtRescheduleModal] = React.useState(false);
  const [rescheduleRoom, setRescheduleRoom] = React.useState('OT Room 1');
  const [rescheduleSlot, setRescheduleSlot] = React.useState('09:00 AM');
  const [showOtBookingModal, setShowOtBookingModal] = React.useState(false);
  const [newOtPatientName, setNewOtPatientName] = React.useState('');
  const [newOtProcedure, setNewOtProcedure] = React.useState('');
  const [newOtRoom, setNewOtRoom] = React.useState('OT Room 1');
  const [newOtSurgeon, setNewOtSurgeon] = React.useState('Dr. Sandeep Mehta');
  const [newOtAnesthetist, setNewOtAnesthetist] = React.useState('Dr. K. R. Iyer');
  const [newOtCategory, setNewOtCategory] = React.useState('Elective');
  const [showWhoChecklistModal, setShowWhoChecklistModal] = React.useState(false);
  const [showOtTeamModal, setShowOtTeamModal] = React.useState(false);
  const [showImplantModal, setShowImplantModal] = React.useState(false);
  const [showAiDraftModal, setShowAiDraftModal] = React.useState(false);
  const [newAnesthesiaDrug, setNewAnesthesiaDrug] = React.useState('Propofol 100mg IV');
  const [newAnesthesiaTime, setNewAnesthesiaTime] = React.useState('09:15 AM');
  const [implantName, setImplantName] = React.useState('');
  const [implantLotNo, setImplantLotNo] = React.useState('');
  const [implantSerialNo, setImplantSerialNo] = React.useState('');
  const [implantExpiry, setImplantExpiry] = React.useState('');
  const [teamSurgeon, setTeamSurgeon] = React.useState('Dr. Sandeep Mehta');
  const [teamAssistant, setTeamAssistant] = React.useState('Dr. Ananya Ray');
  const [teamAnesthetist, setTeamAnesthetist] = React.useState('Dr. K. R. Iyer');
  const [teamNurse, setTeamNurse] = React.useState('Sr. Sunita Rao');
  const [teamTech, setTeamTech] = React.useState('Tech. Ramesh');
  const [newSurgeryPatient, setNewSurgeryPatient] = React.useState('');
  const [newSurgeryProcedure, setNewSurgeryProcedure] = React.useState('');
  const [newSurgerySurgeon, setNewSurgerySurgeon] = React.useState('Dr. Sandeep Mehta');
  const [newSurgeryTime, setNewSurgeryTime] = React.useState('09:00 AM');
  const [newSurgeryRoom, setNewSurgeryRoom] = React.useState('OT Room 1');
  const [otSurgeries, setOtSurgeries] = React.useState([
    {
      id: 'OT-2026-101',
      patientName: 'Aarav Sharma',
      patientId: 'PX-2026-9041',
      otRoom: 'OT-1 (Cardiac Suite)',
      procedure: 'Coronary Artery Bypass Graft (CABG)',
      surgeon: 'Dr. Sandeep Mehta',
      assistantSurgeon: 'Dr. Alok Verma',
      anesthetist: 'Dr. Vikram Malhotra',
      otNurse: 'Sister Sunita',
      otTechnician: 'Tech Rahul',
      timeSlot: '09:00 AM - 01:00 PM',
      category: 'Planned Elective',
      phase: 'In-Procedure', // 'Scheduled' | 'Preparing' | 'In-Procedure' | 'Recovery' | 'Completed'
      anesthesiaType: 'General Anesthesia (ETT)',
      pacStatus: 'Cleared (ASA Grade III)',
      consentSigned: true,
      bloodLossMl: 250,
      spongeCount: '24/24 Verified',
      preOpPrep: { NPO: true, siteMarked: true, ivAntibiotic: true, bloodCrossMatch: '2 Units PRBC Ready', equipmentVerified: true },
      opNote: 'Successful 3-vessel CABG (LIMA to LAD, SVG to OM1, SVG to PDA). CPB time 78 min. Cross-clamp time 45 min. Chest closed with steel wires.',
      whoChecklist: { signIn: true, timeOut: true, signOut: false },
      delayTracking: 'On Schedule (0 min delay)',
      implantDetails: 'Sternal Steel Wires (Lot #SW-9921, Exp 2032), Saphenous Vein Grafts',
      billingTotal: 65400,
      aiPredictedDuration: '3h 45m (Confidence 94%)',
      aiPostOpRecommendation: 'Maintain MAP > 70 mmHg. Wean sedation in 6 hours. ICU Step-Down Target: Day 2.',
      pacuStatus: 'In PACU Bed 1 | Aldrete Score 8/10 | Stable'
    },
    {
      id: 'OT-2026-102',
      patientName: 'Ramesh Sen',
      patientId: 'PX-2026-9042',
      otRoom: 'OT-2 (Neuro Suite)',
      procedure: 'Craniotomy & Tumor Resection',
      surgeon: 'Dr. Ananya Ray',
      assistantSurgeon: 'Dr. Rohit Sharma',
      anesthetist: 'Dr. Rajesh K',
      otNurse: 'Sister Kavita',
      otTechnician: 'Tech Suresh',
      timeSlot: '02:00 PM - 06:00 PM',
      category: 'Planned Elective',
      phase: 'Preparing',
      anesthesiaType: 'General Anesthesia',
      pacStatus: 'Cleared (ASA Grade II)',
      consentSigned: true,
      bloodLossMl: 0,
      spongeCount: 'Pending',
      preOpPrep: { NPO: true, siteMarked: true, ivAntibiotic: false, bloodCrossMatch: '4 Units PRBC Ready', equipmentVerified: true },
      opNote: '',
      whoChecklist: { signIn: true, timeOut: false, signOut: false },
      delayTracking: 'Minor Prep Delay (10 min)',
      implantDetails: 'Titanium Cranial Plate & Screws (Lot #CP-4012)',
      billingTotal: 58200,
      aiPredictedDuration: '4h 15m (Confidence 91%)',
      aiPostOpRecommendation: 'Frequent neuro checks 1-hourly. Keep head elevated 30 degrees.',
      pacuStatus: 'Scheduled for PACU Bed 3'
    },
    {
      id: 'OT-2026-103',
      patientName: 'Kabir Khan',
      patientId: 'PX-2026-9043',
      otRoom: 'OT-4 (Emergency OT)',
      procedure: 'Emergency Laparotomy & Splenectomy',
      surgeon: 'Dr. Deepa Roy',
      assistantSurgeon: 'Dr. Manish Kumar',
      anesthetist: 'Dr. Vikram Malhotra',
      otNurse: 'Sister Anjali',
      otTechnician: 'Tech Amit',
      timeSlot: 'NOW (STAT)',
      category: 'Emergency STAT',
      phase: 'Preparing',
      anesthesiaType: 'Rapid Sequence Intubation',
      pacStatus: 'Emergency Clearance (ASA Grade IV-E)',
      consentSigned: true,
      bloodLossMl: 600,
      spongeCount: 'Pending',
      preOpPrep: { NPO: false, siteMarked: true, ivAntibiotic: true, bloodCrossMatch: '6 Units PRBC Dispatched', equipmentVerified: true },
      opNote: '',
      whoChecklist: { signIn: true, timeOut: true, signOut: false },
      delayTracking: 'STAT Direct Entry',
      implantDetails: 'Surgical Mesh 15x15cm (Lot #SM-8812)',
      billingTotal: 42000,
      aiPredictedDuration: '2h 30m (Confidence 88%)',
      aiPostOpRecommendation: 'Monitor hemoglobin 4-hourly. Transfuse PRBC if Hb < 8.0 g/dL.',
      pacuStatus: 'Direct Transfer to ICU Post-Op'
    }
  ]);
  const [anesthesiaLogs, setAnesthesiaLogs] = React.useState([
    { id: 1, time: '09:15 AM', drug: 'IV Propofol 150mg + Fentanyl 100mcg (Induction)' },
    { id: 2, time: '09:20 AM', drug: 'IV Rocuronium 50mg (Muscle Relaxant)' },
    { id: 3, time: '10:15 AM', drug: 'IV Heparin 25,000 units (CPB Anticoagulation)' }
  ]);
  const [implantsList, setImplantsList] = React.useState([
    { id: 1, name: 'St-Jude Mechanical Heart Valve', lot: 'LOT-HV-2026-90', serial: 'SN-88412-A', expiry: '2032-12-31' },
    { id: 2, name: 'Titanium Cranial Plate System', lot: 'CP-4012', serial: 'SN-9011-B', expiry: '2030-06-30' }
  ]);


  return (
            <div className="flex flex-col gap-lg">
              {/* Header Banner */}
              <div className="card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(37, 99, 235, 0.05) 100%)', borderLeft: '4px solid var(--success)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>✂️ OT Management (Enterprise SaaS)</span>
                      <span className="badge badge-success">⭐ 13 Enterprise Pillars</span>
                    </h2>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Digital OT Whiteboard • Scheduling • Pre-Op & PAC • Intra-op Anesthesia • PACU Recovery • Billing & Implants • AI Optimization
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button type="button" className="btn btn-secondary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowWhoChecklistModal(true)}>
                      📋 WHO Safety Checklist
                    </button>
                    <button type="button" className="btn btn-secondary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowOtTeamModal(true)}>
                      👥 Assign Team
                    </button>
                    <button type="button" className="btn btn-secondary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowImplantModal(true)}>
                      🔩 Implant Tracking
                    </button>
                    <button type="button" className="btn btn-primary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowOtBookingModal(true)}>
                      📅 Reserve OT Suite
                    </button>
                  </div>
                </div>

                {/* OT Quick Metrics Bar */}
                <div className="grid grid-4" style={{ gap: '10px', marginTop: '14px' }}>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Scheduled Surgeries Today</span>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary)' }}>{otSurgeries.length} Cases</div>
                  </div>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Active In-Procedure</span>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--danger)' }}>{otSurgeries.filter(s => s.phase === 'In-Procedure').length} Active</div>
                  </div>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PAC Clearances</span>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--success)' }}>{otSurgeries.filter(s => s.pacStatus.includes('Cleared')).length} Cleared</div>
                  </div>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Sterile OT Suites</span>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--success)' }}>4 / 4 Autoclaved</div>
                  </div>
                </div>

                {/* 7 Enterprise Sub-tabs Navigation */}
                <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', marginTop: '14px', flexWrap: 'wrap' }}>
                  <button onClick={() => setOtSubTab('whiteboard')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', background: otSubTab === 'whiteboard' ? 'var(--primary)' : 'transparent', color: otSubTab === 'whiteboard' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🖥️ Digital Whiteboard
                  </button>
                  <button onClick={() => setOtSubTab('schedule')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: otSubTab === 'schedule' ? 'var(--primary)' : 'transparent', color: otSubTab === 'schedule' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    📅 Scheduling & Slots
                  </button>
                  <button onClick={() => setOtSubTab('preop_team')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: otSubTab === 'preop_team' ? 'var(--primary)' : 'transparent', color: otSubTab === 'preop_team' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    👥 Pre-Op & Teams
                  </button>
                  <button onClick={() => setOtSubTab('intraop_anesthesia')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: otSubTab === 'intraop_anesthesia' ? 'var(--primary)' : 'transparent', color: otSubTab === 'intraop_anesthesia' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🩸 Operative & Anesthesia
                  </button>
                  <button onClick={() => setOtSubTab('postop_pacu')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: otSubTab === 'postop_pacu' ? 'var(--primary)' : 'transparent', color: otSubTab === 'postop_pacu' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🏥 Recovery (PACU)
                  </button>
                  <button onClick={() => setOtSubTab('billing_resources')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: otSubTab === 'billing_resources' ? 'var(--primary)' : 'transparent', color: otSubTab === 'billing_resources' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    💳 Billing & Implants
                  </button>
                  <button onClick={() => setOtSubTab('analytics_ai')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', background: otSubTab === 'analytics_ai' ? 'var(--primary)' : 'transparent', color: otSubTab === 'analytics_ai' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🤖 Analytics & AI
                  </button>
                </div>
              </div>

              {/* SUB-TAB 1: DIGITAL OT WHITEBOARD & VISUAL TIMELINE */}
              {otSubTab === 'whiteboard' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Live OT Whiteboard Grid */}
                  <div className="grid grid-2" style={{ gap: '16px' }}>
                    {otSurgeries.map((surg) => (
                      <div key={surg.id} className="card" style={{ borderLeft: `4px solid ${surg.phase === 'In-Procedure' ? 'var(--danger)' : surg.phase === 'Preparing' ? 'var(--warning)' : surg.phase === 'Recovery' ? 'var(--primary)' : 'var(--success)'}`, padding: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                          <div>
                            <strong style={{ fontSize: '13px' }}>{surg.otRoom}</strong>
                            <div style={{ fontSize: '11px', color: 'var(--text-main)', fontWeight: 600 }}>{surg.patientName} ({surg.patientId})</div>
                          </div>
                          <span className={`badge ${surg.phase === 'In-Procedure' ? 'badge-danger' : surg.phase === 'Preparing' ? 'badge-warning' : surg.phase === 'Recovery' ? 'badge-primary' : 'badge-success'}`}>
                            {surg.phase === 'In-Procedure' ? '🔴 In-Procedure' : surg.phase === 'Preparing' ? '🟡 Preparing' : surg.phase === 'Recovery' ? '🔵 Recovery (PACU)' : '✅ Completed'}
                          </span>
                        </div>

                        {/* Visual Surgery Phase Timeline Bar */}
                        <div style={{ margin: '12px 0' }}>
                          <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Visual Surgery Progression Timeline</span>
                          <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                            <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'var(--success)' }} title="Scheduled" />
                            <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: surg.phase !== 'Scheduled' ? 'var(--success)' : 'var(--border)' }} title="Preparing" />
                            <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: (surg.phase === 'In-Procedure' || surg.phase === 'Recovery' || surg.phase === 'Completed') ? 'var(--danger)' : 'var(--border)' }} title="In Progress" />
                            <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: (surg.phase === 'Recovery' || surg.phase === 'Completed') ? 'var(--primary)' : 'var(--border)' }} title="Recovery" />
                            <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: surg.phase === 'Completed' ? 'var(--success)' : 'var(--border)' }} title="Completed" />
                          </div>
                        </div>

                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div>• <strong>Procedure:</strong> {surg.procedure}</div>
                          <div>• <strong>Team:</strong> {surg.surgeon} (Surgeon) | {surg.anesthetist} (Anesthetist)</div>
                          <div>• <strong>Delay Status:</strong> <span style={{ color: surg.delayTracking.includes('Delay') ? 'var(--danger)' : 'var(--success)', fontWeight: 600 }}>{surg.delayTracking}</span></div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '12px' }}>
                          <button className="btn btn-secondary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => { setSelectedOtId(surg.id); setShowWhoChecklistModal(true); }}>📋 WHO Safety Checklist</button>
                          <button className="btn btn-primary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => { setSelectedOtId(surg.id); setOtSubTab('intraop_anesthesia'); }}>🩸 Intra-op Console</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Operation Delay Analytics & WHO Summary */}
                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>⏱️ Live Operation Delay Tracking & WHO Safety Audit</h3>
                    <div className="grid grid-2" style={{ gap: '12px', marginTop: '10px', fontSize: '11px' }}>
                      <div style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-muted)' }}>
                        <strong>Delay Reasons Analytics Today:</strong>
                        <ul style={{ margin: '6px 0 0 16px', color: 'var(--text-muted)' }}>
                          <li>Anesthesia Preparation: 10 min average delay</li>
                          <li>Instrument Sterilization Countdown: On Time</li>
                          <li>Patient Transport from Ward: On Time</li>
                        </ul>
                      </div>
                      <div style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.05)' }}>
                        <strong style={{ color: 'var(--success)' }}>WHO Surgical Safety Compliance: 100%</strong>
                        <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>All 3 surgical cases completed Sign-In and Time-Out verification prior to skin incision.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: SCHEDULING & OT SLOT MANAGEMENT */}
              {otSubTab === 'schedule' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>📅 Scheduled Surgeries & Slot Reservation Ledger</h3>
                      <button className="btn btn-primary" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => setShowOtBookingModal(true)}>➕ Reserve OT Slot</button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: 'var(--bg-muted)' }}>
                          <th style={{ padding: '8px 10px' }}>OT Suite</th>
                          <th style={{ padding: '8px 10px' }}>Patient Name</th>
                          <th style={{ padding: '8px 10px' }}>Procedure Name</th>
                          <th style={{ padding: '8px 10px' }}>Lead Surgeon</th>
                          <th style={{ padding: '8px 10px' }}>Anesthetist</th>
                          <th style={{ padding: '8px 10px' }}>Time Slot</th>
                          <th style={{ padding: '8px 10px' }}>AI Pred. Duration</th>
                          <th style={{ padding: '8px 10px', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {otSurgeries.map((surg) => (
                          <tr key={surg.id} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '8px 10px' }}><span className="badge badge-primary">{surg.otRoom}</span></td>
                            <td style={{ padding: '8px 10px', fontWeight: 600 }}>{surg.patientName} <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>({surg.patientId})</span></td>
                            <td style={{ padding: '8px 10px' }}>{surg.procedure}</td>
                            <td style={{ padding: '8px 10px' }}>{surg.surgeon}</td>
                            <td style={{ padding: '8px 10px' }}>{surg.anesthetist}</td>
                            <td style={{ padding: '8px 10px' }}>{surg.timeSlot}</td>
                            <td style={{ padding: '8px 10px' }}><span className="badge badge-success">{surg.aiPredictedDuration}</span></td>
                            <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                              <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px', marginRight: '4px' }} onClick={() => { setSelectedOtId(surg.id); setShowOtRescheduleModal(true); }}>Reschedule</button>
                              <button className="btn btn-danger" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => {
                                setOtSurgeries(prev => prev.filter(s => s.id !== surg.id));
                                addToast('danger', `Cancelled OT reservation for ${surg.patientName}`);
                              }}>Cancel</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: PRE-OPERATIVE & TEAM ALLOCATION */}
              {otSubTab === 'preop_team' && (
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>👥 Multi-Disciplinary OT Surgical Team Assignment</h3>
                      <button className="btn btn-secondary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => setShowOtTeamModal(true)}>Reassign Team</button>
                    </div>

                    {(() => {
                      const activeCase = otSurgeries.find(s => s.id === selectedOtId) || otSurgeries[0];
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                          <div style={{ padding: '8px', background: 'var(--bg-muted)', borderRadius: '4px' }}>
                            <strong>Selected Case:</strong> {activeCase.patientName} ({activeCase.procedure})
                          </div>
                          <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                            <strong>Lead Surgeon:</strong> {activeCase.surgeon} | <strong>Assistant:</strong> {activeCase.assistantSurgeon}
                          </div>
                          <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                            <strong>Lead Anesthetist:</strong> {activeCase.anesthetist}
                          </div>
                          <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                            <strong>Scrub Nurse:</strong> {activeCase.otNurse} | <strong>OT Technician:</strong> {activeCase.otTechnician}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>📋 Pre-Op Checklist & PAC Evaluation</h3>
                    {(() => {
                      const activeCase = otSurgeries.find(s => s.id === selectedOtId) || otSurgeries[0];
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '11px' }}>
                          <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                            <strong>PAC Status:</strong> <span className="badge badge-warning">{activeCase.pacStatus}</span>
                          </div>
                          
                          {/* Interactive Pre-Op Prep Checkboxes */}
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={activeCase.preOpPrep.NPO} onChange={(e) => {
                              const checked = e.target.checked;
                              setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, preOpPrep: { ...s.preOpPrep, NPO: checked } } : s));
                              addToast('info', `NPO Fasting status updated to ${checked ? 'Verified' : 'Pending'}`);
                            }} />
                            <span>NPO Fasting Status (Min 8 Hours)</span>
                          </label>

                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={activeCase.preOpPrep.siteMarked} onChange={(e) => {
                              const checked = e.target.checked;
                              setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, preOpPrep: { ...s.preOpPrep, siteMarked: checked } } : s));
                              addToast('info', `Surgical Site Marking updated to ${checked ? 'Verified' : 'Pending'}`);
                            }} />
                            <span>Surgical Site Marked & Verified</span>
                          </label>

                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={activeCase.preOpPrep.ivAntibiotic} onChange={(e) => {
                              const checked = e.target.checked;
                              setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, preOpPrep: { ...s.preOpPrep, ivAntibiotic: checked } } : s));
                              addToast('info', `Pre-Op IV Antibiotic updated to ${checked ? 'Infused' : 'Pending'}`);
                            }} />
                            <span>Pre-Op IV Prophylactic Antibiotic Infused</span>
                          </label>

                          <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                            <strong>Blood Bank Reserved:</strong> {activeCase.preOpPrep.bloodCrossMatch}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: OPERATIVE & ANESTHESIA CONSOLE */}
              {otSubTab === 'intraop_anesthesia' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(() => {
                    const activeCase = otSurgeries.find(s => s.id === selectedOtId) || otSurgeries[0];
                    return (
                      <>
                        <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <h3 style={{ fontSize: '14px', fontWeight: 700 }}>🩸 Live Operative & Anesthesia Console ({activeCase.otRoom})</h3>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Patient: <strong>{activeCase.patientName}</strong> | Surgeon: <strong>{activeCase.surgeon}</strong> | Anesthetist: <strong>{activeCase.anesthetist}</strong></div>
                            </div>
                            
                            {/* Live Surgery Phase Switcher */}
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button className={`btn ${activeCase.phase === 'Preparing' ? 'btn-warning' : 'btn-secondary'}`} style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => {
                                setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, phase: 'Preparing' } : s));
                                addToast('info', 'Phase updated to Preparing');
                              }}>Preparing</button>
                              <button className={`btn ${activeCase.phase === 'In-Procedure' ? 'btn-danger' : 'btn-secondary'}`} style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => {
                                setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, phase: 'In-Procedure' } : s));
                                addToast('danger', 'Phase updated to In-Procedure (Scalpel On)');
                              }}>In-Procedure</button>
                              <button className={`btn ${activeCase.phase === 'Recovery' ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => {
                                setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, phase: 'Recovery' } : s));
                                addToast('warning', 'Phase updated to PACU Recovery');
                              }}>Recovery</button>
                              <button className={`btn ${activeCase.phase === 'Completed' ? 'btn-success' : 'btn-secondary'}`} style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => {
                                setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, phase: 'Completed' } : s));
                                addToast('success', 'Surgery Completed & Case Closed');
                              }}>Completed</button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-2" style={{ gap: '16px' }}>
                          <div className="card">
                            <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>📊 Real-Time Intra-op Parameters & Counts</h3>
                            <div className="grid grid-2" style={{ gap: '10px', marginTop: '10px' }}>
                              <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '4px' }}>
                                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Estimated Blood Loss</span>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--danger)' }}>{activeCase.bloodLossMl} mL</div>
                                <button className="btn btn-secondary" style={{ fontSize: '9px', padding: '1px 4px', marginTop: '4px' }} onClick={() => {
                                  setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, bloodLossMl: s.bloodLossMl + 50 } : s));
                                }}>+50 mL</button>
                              </div>

                              <div style={{ padding: '8px', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '4px' }}>
                                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Sponge & Instrument Count</span>
                                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>{activeCase.spongeCount}</div>
                                <button className="btn btn-success" style={{ fontSize: '9px', padding: '1px 4px', marginTop: '4px' }} onClick={() => {
                                  setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, spongeCount: '24/24 Verified' } : s));
                                  addToast('success', 'Sponge count verified 24/24 with Scrub Nurse!');
                                }}>Verify Count</button>
                              </div>
                            </div>
                          </div>

                          {/* Dynamic Anesthesia Drug Administration Record */}
                          <div className="card">
                            <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>💉 Anesthesia Drug Administration Record</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px', fontSize: '11px', maxHeight: '140px', overflowY: 'auto' }}>
                              {anesthesiaLogs.map((log) => (
                                <div key={log.id} style={{ padding: '6px 8px', border: '1px solid var(--border)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span><strong>{log.time}:</strong> {log.drug}</span>
                                  <button className="btn btn-ghost" style={{ padding: '1px 4px', fontSize: '9px', color: 'var(--danger)' }} onClick={() => {
                                    setAnesthesiaLogs(prev => prev.filter(l => l.id !== log.id));
                                  }}>✕</button>
                                </div>
                              ))}
                            </div>

                            {/* Add Anesthesia Log Form */}
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              if (!newAnesthesiaDrug) return;
                              const timeStr = newAnesthesiaTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                              setAnesthesiaLogs(prev => [...prev, { id: Date.now(), time: timeStr, drug: newAnesthesiaDrug }]);
                              setNewAnesthesiaDrug('');
                              setNewAnesthesiaTime('');
                              addToast('success', 'Added Anesthesia Drug Log Entry!');
                            }} style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                              <input type="text" className="form-input" style={{ width: '80px', height: '26px', fontSize: '10px' }} placeholder="Time" value={newAnesthesiaTime} onChange={(e) => setNewAnesthesiaTime(e.target.value)} />
                              <input type="text" className="form-input" style={{ flexGrow: 1, height: '26px', fontSize: '10px' }} placeholder="Drug Name & Dose (e.g. Fentanyl 50mcg)" value={newAnesthesiaDrug} onChange={(e) => setNewAnesthesiaDrug(e.target.value)} required />
                              <button type="submit" className="btn btn-primary" style={{ padding: '2px 8px', fontSize: '10px' }}>+ Log</button>
                            </form>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* SUB-TAB 5: RECOVERY ROOM & PACU MONITORING */}
              {otSubTab === 'postop_pacu' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>🏥 Recovery Room (PACU) Bed Monitoring Dashboard</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', fontSize: '11px' }}>
                      {otSurgeries.map((surg) => (
                        <div key={surg.id} style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', background: surg.id === selectedOtId ? 'rgba(37, 99, 235, 0.03)' : 'transparent' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <strong>{surg.patientName}</strong> ({surg.procedure})
                              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PACU Status: {surg.pacuStatus}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <button className="btn btn-secondary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => {
                                setOtSurgeries(prev => prev.map(s => s.id === surg.id ? { ...s, pacuStatus: `${s.pacuStatus} | Aldrete 9/10 Recorded` } : s));
                                addToast('info', `Aldrete Score 9/10 Recorded for ${surg.patientName}`);
                              }}>Aldrete Score (9/10)</button>

                              <button className="btn btn-success" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => {
                                setOtSurgeries(prev => prev.map(s => s.id === surg.id ? { ...s, phase: 'Completed', pacuStatus: 'Transferred to ICU Bed 2' } : s));
                                addToast('success', `${surg.patientName} Transferred to ICU Bed 2 successfully!`);
                              }}>Transfer to ICU</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 6: BILLING & IMPLANT RESOURCE MANAGEMENT */}
              {otSubTab === 'billing_resources' && (
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>🔩 Implant & Device Tracking Register</h3>
                      <button className="btn btn-primary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => setShowImplantModal(true)}>➕ Add Implant</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', maxHeight: '180px', overflowY: 'auto' }}>
                      {implantsList.map((item) => (
                        <div key={item.id} style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <strong>{item.name}</strong>
                            <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>Lot #: <strong>{item.lot}</strong> | Serial #: <strong>{item.serial}</strong> | Expiry: {item.expiry}</div>
                          </div>
                          <button className="btn btn-ghost" style={{ color: 'var(--danger)', padding: '2px 6px', fontSize: '10px' }} onClick={() => {
                            setImplantsList(prev => prev.filter(i => i.id !== item.id));
                            addToast('warning', `Removed implant ${item.name}`);
                          }}>Remove</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>💳 OT Package & Resource Billing Breakdown</h3>
                    {(() => {
                      const activeCase = otSurgeries.find(s => s.id === selectedOtId) || otSurgeries[0];
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px', fontSize: '11px' }}>
                          <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                            <span>OT Suite Base Charge (3 Hours)</span>
                            <strong>₹18,000</strong>
                          </div>
                          <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                            <span>Surgeon Share ({activeCase.surgeon})</span>
                            <strong>₹25,000</strong>
                          </div>
                          <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                            <span>Anesthesia Charge ({activeCase.anesthetist})</span>
                            <strong>₹12,000</strong>
                          </div>
                          <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                            <span>Implants & Consumables</span>
                            <strong>₹10,400</strong>
                          </div>
                          <div className="flex justify-between align-center" style={{ marginTop: '4px', fontSize: '12px' }}>
                            <strong>Total OT Bill Ledger</strong>
                            <strong style={{ color: 'var(--success)' }}>₹{activeCase.billingTotal.toLocaleString('en-IN')}</strong>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* SUB-TAB 7: ANALYTICS & AI FEATURES */}
              {otSubTab === 'analytics_ai' && (
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div className="card" style={{ background: 'rgba(37, 99, 235, 0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>🤖 AI Surgery Duration & Slot Optimization</h3>
                      <button className="btn btn-primary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => setShowAiDraftModal(true)}>AI Operative Note Drafter</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '11px' }}>
                      <div style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        <strong>AI Duration Prediction:</strong> 3 Hours 45 Minutes (Confidence: 94%)
                        <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>Based on 142 historical CABG cases under Dr. Sandeep Mehta.</p>
                      </div>
                      <div style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        <strong style={{ color: 'var(--success)' }}>AI Slot Optimization Suggestion:</strong>
                        <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>Schedule OT-2 Craniotomy at 02:15 PM to optimize instrument turnover time by 20 minutes.</p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>📊 Enterprise OT Analytics & Utilization Reports</h3>
                    <div className="grid grid-2" style={{ gap: '10px', marginTop: '10px', fontSize: '11px' }}>
                      <div style={{ padding: '8px', background: 'var(--bg-muted)', borderRadius: '4px' }}>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>OT Utilization Rate</span>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--success)' }}>94.2%</div>
                      </div>
                      <div style={{ padding: '8px', background: 'var(--bg-muted)', borderRadius: '4px' }}>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Surgery Delay Rate</span>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--warning)' }}>4.1%</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* WHO SURGICAL SAFETY CHECKLIST MODAL */}
              {showWhoChecklistModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>📋 WHO Surgical Safety Checklist (3 Phases)</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowWhoChecklistModal(false)}>✕</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', fontSize: '11px' }}>
                      <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.05)' }}>
                        <strong>Phase 1: SIGN IN (Before Induction)</strong>
                        <div style={{ marginTop: '4px' }}>• Patient Identity, Site, Procedure & Consent Verified</div>
                      </div>
                      <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px', background: 'rgba(37, 99, 235, 0.05)' }}>
                        <strong>Phase 2: TIME OUT (Before Skin Incision)</strong>
                        <div style={{ marginTop: '4px' }}>• Team members introduce by name & role. Critical steps reviewed.</div>
                      </div>
                      <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                        <strong>Phase 3: SIGN OUT (Before Patient Leaves OT)</strong>
                        <div style={{ marginTop: '4px' }}>• Sponge, Needle & Instrument count verified 100% correct.</div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button className="btn btn-secondary" onClick={() => setShowWhoChecklistModal(false)}>Close</button>
                        <button className="btn btn-success" onClick={() => {
                          addToast('success', 'WHO Surgical Safety Sign-off Verified!');
                          setShowWhoChecklistModal(false);
                        }}>Sign-Off WHO Checklist</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* OT TEAM ASSIGNMENT MODAL */}
              {showOtTeamModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>👥 Assign Multi-Disciplinary OT Surgical Team</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowOtTeamModal(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setOtSurgeries(prev => prev.map(s => s.id === selectedOtId ? {
                        ...s,
                        surgeon: teamSurgeon,
                        assistantSurgeon: teamAssistant,
                        anesthetist: teamAnesthetist,
                        otNurse: teamNurse,
                        otTechnician: teamTech
                      } : s));
                      addToast('success', 'Surgical & Anesthesia Team Assigned & Saved to EMR!');
                      setShowOtTeamModal(false);
                    }} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', fontSize: '11px' }}>
                      <div className="form-group">
                        <label className="form-label">Lead Surgeon</label>
                        <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={teamSurgeon} onChange={(e) => setTeamSurgeon(e.target.value)} required />
                      </div>
                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Assistant Surgeon</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={teamAssistant} onChange={(e) => setTeamAssistant(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Lead Anesthetist</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={teamAnesthetist} onChange={(e) => setTeamAnesthetist(e.target.value)} required />
                        </div>
                      </div>
                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Scrub Nurse</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={teamNurse} onChange={(e) => setTeamNurse(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">OT Technician</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={teamTech} onChange={(e) => setTeamTech(e.target.value)} required />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowOtTeamModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Team Allocation</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* IMPLANT & DEVICE TRACKING MODAL */}
              {showImplantModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>🔩 Implant & Medical Device Lot Tracker</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowImplantModal(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setImplantsList(prev => [...prev, { id: Date.now(), name: implantName, lot: implantLotNo, serial: implantSerialNo, expiry: implantExpiry }]);
                      addToast('success', `Implant ${implantName} (Lot ${implantLotNo}) Tracked & Saved to Register!`);
                      setShowImplantModal(false);
                    }} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      
                      <div className="form-group">
                        <label className="form-label">Implant / Prosthesis Name</label>
                        <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={implantName} onChange={(e) => setImplantName(e.target.value)} required />
                      </div>

                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Lot Number</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={implantLotNo} onChange={(e) => setImplantLotNo(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Serial Number</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={implantSerialNo} onChange={(e) => setImplantSerialNo(e.target.value)} required />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Sterilization Expiry Date</label>
                        <input type="date" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={implantExpiry} onChange={(e) => setImplantExpiry(e.target.value)} required />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowImplantModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Implant Record</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* AI OPERATIVE NOTE DRAFTER MODAL */}
              {showAiDraftModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '520px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>🤖 AI Operative Note & Post-Op Recommendations Drafter</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowAiDraftModal(false)}>✕</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', fontSize: '11px' }}>
                      <div style={{ padding: '10px', background: 'var(--bg-muted)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        <strong>AI Drafted Operative Narrative:</strong>
                        <p style={{ marginTop: '4px', color: 'var(--text-main)', fontStyle: 'italic' }}>
                          "Patient underwent successful 3-vessel CABG under General Anesthesia. LIMA to LAD anastomosed smoothly. Cardiopulmonary bypass time: 78 min. Hemostasis achieved. Chest closed with 6 sternal wires."
                        </p>
                      </div>
                      <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        <strong style={{ color: 'var(--success)' }}>AI Post-Op Recommendations:</strong>
                        <p style={{ marginTop: '4px', color: 'var(--text-main)' }}>
                          • Maintain MAP &gt; 70 mmHg using Noradrenaline titration.<br/>
                          • Wean propofol sedation after 6 hours.<br/>
                          • Schedule ICU Step-Down evaluation on Post-Op Day 2.
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button className="btn btn-secondary" onClick={() => setShowAiDraftModal(false)}>Close</button>
                        <button className="btn btn-primary" onClick={() => {
                          setOtSurgeries(prev => prev.map(s => s.id === selectedOtId ? { ...s, opNote: 'AI Drafted: On-pump CABG with LIMA to LAD anastomosis and SVG grafts. CPB 78 min.' } : s));
                          addToast('success', 'AI Operative Note & Recommendations Inserted!');
                          setShowAiDraftModal(false);
                        }}>Adopt AI Note</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* OT RESERVATION MODAL */}
              {showOtBookingModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>📅 New Surgery OT Reservation</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowOtBookingModal(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const newId = `OT-2026-${100 + otSurgeries.length + 1}`;
                      setOtSurgeries(prev => [
                        ...prev,
                        {
                          id: newId,
                          patientName: newOtPatientName || 'New Surgical Patient',
                          patientId: `PX-2026-${9050 + otSurgeries.length}`,
                          otRoom: newOtRoom,
                          procedure: newOtProcedure || 'Elective Surgery',
                          surgeon: newOtSurgeon,
                          assistantSurgeon: 'Dr. Alok Verma',
                          anesthetist: newOtAnesthetist,
                          otNurse: 'Sister Sunita',
                          otTechnician: 'Tech Rahul',
                          timeSlot: '08:00 AM - 12:00 PM',
                          category: newOtCategory,
                          phase: 'Preparing',
                          anesthesiaType: 'General Anesthesia',
                          pacStatus: 'Cleared (ASA Grade II)',
                          consentSigned: true,
                          bloodLossMl: 0,
                          spongeCount: 'Pending',
                          preOpPrep: { NPO: true, siteMarked: true, ivAntibiotic: true, bloodCrossMatch: '2 Units Ready', equipmentVerified: true },
                          opNote: '',
                          whoChecklist: { signIn: true, timeOut: false, signOut: false },
                          delayTracking: 'On Schedule',
                          implantDetails: 'Standard Consumables Pack',
                          billingTotal: 38000,
                          aiPredictedDuration: '2h 15m (Confidence 92%)',
                          aiPostOpRecommendation: 'Standard Ward Recovery',
                          pacuStatus: 'Scheduled'
                        }
                      ]);
                      setShowOtBookingModal(false);
                      setNewOtPatientName('');
                      setNewOtProcedure('');
                      addToast('success', `Reserved ${newOtRoom} for ${newOtPatientName || 'Patient'} successfully!`);
                    }} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      
                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Patient Full Name</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} placeholder="e.g. Vikram Patel" value={newOtPatientName} onChange={(e) => setNewOtPatientName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Surgical Procedure</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} placeholder="e.g. Total Knee Replacement" value={newOtProcedure} onChange={(e) => setNewOtProcedure(e.target.value)} required />
                        </div>
                      </div>

                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Target OT Suite</label>
                          <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newOtRoom} onChange={(e) => setNewOtRoom(e.target.value)}>
                            <option value="OT-1 (Cardiac Suite)">OT-1 (Cardiac Suite)</option>
                            <option value="OT-2 (Neuro Suite)">OT-2 (Neuro Suite)</option>
                            <option value="OT-3 (Ortho Suite)">OT-3 (Ortho Suite)</option>
                            <option value="OT-4 (Emergency OT)">OT-4 (Emergency OT)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Lead Surgeon</label>
                          <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newOtSurgeon} onChange={(e) => setNewOtSurgeon(e.target.value)}>
                            <option value="Dr. Sandeep Mehta">Dr. Sandeep Mehta (Cardiac)</option>
                            <option value="Dr. Ananya Ray">Dr. Ananya Ray (Neuro)</option>
                            <option value="Dr. Deepa Roy">Dr. Deepa Roy (General/Trauma)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Lead Anesthetist</label>
                          <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newOtAnesthetist} onChange={(e) => setNewOtAnesthetist(e.target.value)}>
                            <option value="Dr. Vikram Malhotra">Dr. Vikram Malhotra (Cardiac Anesthesia)</option>
                            <option value="Dr. Rajesh K">Dr. Rajesh K (Neuro Anesthesia)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Surgery Category</label>
                          <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newOtCategory} onChange={(e) => setNewOtCategory(e.target.value)}>
                            <option value="Planned Elective">Planned Elective Surgery</option>
                            <option value="Emergency STAT">Emergency STAT Surgery</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowOtBookingModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Confirm OT Reservation</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* RESCHEDULE SURGERY MODAL */}
              {showOtRescheduleModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '450px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>🕒 Reschedule OT Surgery Slot</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowOtRescheduleModal(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setOtSurgeries(prev => prev.map(s => s.id === selectedOtId ? {
                        ...s,
                        otRoom: rescheduleRoom,
                        timeSlot: rescheduleSlot,
                        delayTracking: `Rescheduled to ${rescheduleSlot}`
                      } : s));
                      addToast('warning', `Surgery rescheduled to ${rescheduleRoom} (${rescheduleSlot}) successfully!`);
                      setShowOtRescheduleModal(false);
                    }} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      
                      <div className="form-group">
                        <label className="form-label">Target OT Suite</label>
                        <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={rescheduleRoom} onChange={(e) => setRescheduleRoom(e.target.value)}>
                          <option value="OT-1 (Cardiac Suite)">OT-1 (Cardiac Suite)</option>
                          <option value="OT-2 (Neuro Suite)">OT-2 (Neuro Suite)</option>
                          <option value="OT-3 (Ortho Suite)">OT-3 (Ortho Suite)</option>
                          <option value="OT-4 (Emergency OT)">OT-4 (Emergency OT)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">New Time Slot</label>
                        <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={rescheduleSlot} onChange={(e) => setRescheduleSlot(e.target.value)}>
                          <option value="08:00 AM - 11:00 AM">08:00 AM - 11:00 AM (Morning Slot)</option>
                          <option value="11:30 AM - 02:30 PM">11:30 AM - 02:30 PM (Midday Slot)</option>
                          <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM (Afternoon Slot)</option>
                          <option value="06:30 PM - 09:30 PM">06:30 PM - 09:30 PM (Evening Slot)</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowOtRescheduleModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Reschedule</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
  );
};
