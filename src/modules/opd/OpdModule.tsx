import React from 'react';
import { Plus, AlertTriangle, Search, Sparkles, Mic, X, Send, AlertCircle, FileText, Shield, Printer, Heart, Activity, Bed } from 'lucide-react';

export interface OpdModuleProps {
  [key: string]: any;
}

export const OpdModule: React.FC<OpdModuleProps> = (props) => {
  const {
    activeTab = 'consultation',
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
    ipdTab = 'overview',
    setIpdTab = () => {},
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
    otSubTab = 'schedule',
    setOtSubTab = () => {},
    handleScheduleSurgery = () => {},
    labSubTab = 'queue',
    setLabSubTab = () => {},
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
    testPackages = [],
    setTestPackages = () => {},
    reagentsList = [],
    setReagentsList = () => {},
    outsourcedSamples = [],
    setOutsourcedSamples = () => {},
    handleLabResultSubmit = () => {},
    radiologyWorklist = [],
    setRadiologyWorklist = () => {},
    radSubTab = 'worklist',
    setRadSubTab = () => {},
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
    radPackages = [],
    setRadPackages = () => {},
    radMachines = [],
    setRadMachines = () => {},
    pmsEdition = 'standard',
    setPmsEdition = () => {},
    pmsSubTab = 'pos',
    setPmsSubTab = () => {},
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
    pmsHoldBills = [],
    setPmsHoldBills = () => {},
    pmsMedicines = [],
    setPmsMedicines = () => {},
    pmsStores = [],
    setPmsStores = () => {},
    getDosageInstruction = () => '',
    handleDispenseMeds = () => {},
    expenses = [],
    setExpenses = () => {},
    branchExpenses = [],
    refDoctorEarnings = [],
    setRefDoctorEarnings = () => {},
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

  const [opdSearchQuery, setOpdSearchQuery] = React.useState('');
  const [opdFilter, setOpdFilter] = React.useState('all');
  const [soapSubjective, setSoapSubjective] = React.useState<any>({ chiefComplaint: '', hpi: '', medicalHistory: '', familyHistory: '', surgicalHistory: '' });
  const [soapObjective, setSoapObjective] = React.useState<any>({ height: '', weight: '', painScale: '0', lifestyle: '', mentalHealth: '' });
  const [soapAssessment, setSoapAssessment] = React.useState<any>({ diagnosisCode: '', differential: '' });
  const [soapPlan, setSoapPlan] = React.useState<any>({ treatment: '', referralSpecialist: '' });
  const [calculatedVitalMetrics, setCalculatedVitalMetrics] = React.useState<any>({ bmi: '22.4', bpStatus: 'Optimal' });
  const [selectedTemplate, setSelectedTemplate] = React.useState('');
  const [doctorDictating, setDoctorDictating] = React.useState(false);
  const [followupDate, setFollowupDate] = React.useState('');
  const [followupChannel, setFollowupChannel] = React.useState('In-Person Clinic');
  const [followupRecurring, setFollowupRecurring] = React.useState(false);
  const [showAiPanel, setShowAiPanel] = React.useState(false);
  const [aiAnalysisType, setAiAnalysisType] = React.useState('triage');
  const [aiAssistantChat, setAiAssistantChat] = React.useState<any[]>([]);
  const [aiAssistantQuery, setAiAssistantQuery] = React.useState('');
  const [digitalSignatureChecked, setDigitalSignatureChecked] = React.useState(true);
  const [selectedTabCategory, setSelectedTabCategory] = React.useState('general');
  const [consultationNotes, setConsultationNotes] = React.useState('');
  const [newMed, setNewMed] = React.useState<any>({ name: '', dosage: '', frequency: '', duration: '', instructions: '' });
  const [rxLanguage, setRxLanguage] = React.useState('en');
  const [newOrder, setNewOrder] = React.useState<any>({ testName: '', type: 'lab', priority: 'Routine', notes: '' });
  const [opdSubTab, setOpdSubTab] = React.useState('consult');
  const [opdCategoryFilter, setOpdCategoryFilter] = React.useState('all');
  const [newComplaints, setNewComplaints] = React.useState<any[]>([]);
  const [newComplaintText, setNewComplaintText] = React.useState('');
  const [newComplaintDuration, setNewComplaintDuration] = React.useState('');
  const [newMedicationName, setNewMedicationName] = React.useState('');
  const [newMedicationDosage, setNewMedicationDosage] = React.useState('');
  const [newMedicationFrequency, setNewMedicationFrequency] = React.useState('');
  const [newMedicationDuration, setNewMedicationDuration] = React.useState('');
  const [newMedicationInstructions, setNewMedicationInstructions] = React.useState('');
  const [showFormFDialog, setShowFormFDialog] = React.useState(false);
  const DISEASE_ADVICE_TEMPLATES: any = {
    hypertension: "DASH diet, low salt, regular BP log.",
    diabetes: "Low glycemic diet, daily fasting glucose tracking.",
    fever: "Adequate hydration, paracetamol as needed."
  };
  const startVoiceDictationSim = () => { setDoctorDictating(true); setTimeout(() => setDoctorDictating(false), 3000); };


  return (
            <div className="consultation-workspace" style={{ gridTemplateColumns: showAiPanel ? '280px 1fr 340px' : '280px 1fr' }}>
              {/* Left Column: Clinic Patient Queue Selector */}
              <div className="workspace-panel">
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
                  <h3 style={{ fontWeight: 600 }}>Consultation Queue</h3>
                  <div style={{ position: 'relative', marginTop: '8px' }}>
                    <Search size={12} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      placeholder="Filter queue..."
                      className="form-input"
                      style={{ paddingLeft: '26px', height: '28px', fontSize: '11px' }}
                      value={opdSearchQuery}
                      onChange={(e) => setOpdSearchQuery(e.target.value)}
                    />
                  </div>
                  {/* Category filters */}
                  <div style={{ display: 'flex', gap: '4px', marginTop: '10px' }}>
                    {['all', 'waiting', 'completed', 'priority'].map((f) => (
                      <button
                        type="button"
                        key={f}
                        onClick={() => setOpdFilter(f as any)}
                        style={{
                          padding: '3px 6px',
                          fontSize: '9px',
                          textTransform: 'capitalize',
                          flexGrow: 1,
                          cursor: 'pointer',
                          background: opdFilter === f ? 'var(--primary)' : 'rgba(255,255,255,0.02)',
                          color: 'white',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '4px'
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="workspace-body" style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flexGrow: 1, minHeight: 0 }}>
                  {(() => {
                    const filtered = branchPatients.filter(p => {
                      if (opdSearchQuery && !p.name.toLowerCase().includes(opdSearchQuery.toLowerCase())) return false;
                      if (opdFilter === 'waiting') return p.status === 'waiting' || p.status === 'in-consultation';
                      if (opdFilter === 'completed') return p.status === 'discharged' || p.status === 'billed';
                      if (opdFilter === 'priority') return p.esiScore && p.esiScore <= 2;
                      return true;
                    });

                    return filtered.map(p => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPatientId(p.id)}
                        style={{
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid var(--border)',
                          backgroundColor: selectedPatientId === p.id ? 'rgba(37,99,235,0.06)' : 'var(--bg-card)',
                          borderColor: selectedPatientId === p.id ? 'var(--primary)' : 'var(--border)',
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {p.esiScore && p.esiScore <= 2 && (
                          <div style={{ position: 'absolute', top: '-6px', right: '10px', fontSize: '9px', background: 'var(--danger)', color: 'white', padding: '1px 6px', borderRadius: '10px', fontWeight: 'bold', zIndex: 1 }}>
                            ESI {p.esiScore} - PRIORITY
                          </div>
                        )}
                        <div className="flex align-center justify-between">
                          <span style={{ fontWeight: 600, fontSize: '13px' }}>{p.name}</span>
                          <span className={`badge ${
                            p.status === 'in-consultation' ? 'badge-primary' : p.status === 'no-show' ? 'badge-muted' : 'badge-success'
                          }`} style={{ fontSize: '9px' }}>
                            {p.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                          {p.gender}, {p.age} yrs | ID: {p.id}
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', borderTop: '1px dashed var(--border)', paddingTop: '6px' }}>
                          <span style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 600 }}>
                            AI Wait: {p.esiScore ? p.esiScore * 6 : 12} mins
                          </span>
                          <span className="badge badge-muted" style={{ fontSize: '9px' }}>BP: {p.vitals.bloodPressure}</span>
                        </div>

                        {/* Interactive Queue actions inside patient item */}
                        <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 4px', fontSize: '9px', flexGrow: 1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPatients(prev => prev.map(pt => pt.id === p.id ? { ...pt, status: 'in-consultation' } : pt));
                              addToast('success', `${p.name} checked-in for consultation.`);
                            }}
                          >
                            Check-in
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 4px', fontSize: '9px', flexGrow: 1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPatients(prev => prev.map(pt => pt.id === p.id ? { ...pt, status: 'billed' } : pt));
                              addToast('success', `${p.name} checked-out. Sent to pharmacy & billing.`);
                            }}
                          >
                            Check-out
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 4px', fontSize: '9px', color: 'var(--danger)' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPatients(prev => prev.map(pt => pt.id === p.id ? { ...pt, status: 'no-show' } : pt));
                              addToast('warning', `${p.name} marked as no-show.`);
                            }}
                          >
                            No-Show
                          </button>
                        </div>

                        {/* Queue Transfer Doctor Selector */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }} onClick={(e) => e.stopPropagation()}>
                          <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Transfer:</span>
                          <select
                            style={{ background: 'rgba(255,255,255,0.03)', color: 'white', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '10px', padding: '2px', cursor: 'pointer', flexGrow: 1 }}
                            onChange={(e) => {
                              const doc = e.target.value;
                              if (doc) {
                                addToast('warning', `Transferring patient ${p.name} to queue of ${doc}`);
                                setPatients(prev => prev.map(pt => pt.id === p.id ? { ...pt, assignedDoctor: doc } : pt));
                                // Log Activity Audit
                                const newAudit = {
                                  id: `LOG-${Date.now().toString().slice(-3)}`,
                                  timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
                                  user: "Dr. Sandeep Mehta",
                                  role: "Doctor",
                                  action: "Queue Transfer",
                                  module: "OPD Consultation",
                                  details: `Transferred patient ${p.name} queue token to ${doc}`
                                };
                                setAudits(prev => [newAudit, ...prev]);
                              }
                            }}
                          >
                            <option value="">-- Choose Doctor --</option>
                            <option value="Dr. Ananya Ray">Dr. Ananya Ray (Cardio)</option>
                            <option value="Dr. Deepa Roy">Dr. Deepa Roy (Internal Medicine)</option>
                            <option value="Dr. Sanjay Sen">Dr. Sanjay Sen (Pediatric)</option>
                          </select>
                        </div>
                      </div>
                    ));
                  })()}
                </div>

                {/* Doctor Productivity HUD */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'var(--bg-muted)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Doctor Productivity HUD</div>
                  <div className="grid grid-2" style={{ gap: '6px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', padding: '6px', borderRadius: '4px', textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Patients Today</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>18</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', padding: '6px', borderRadius: '4px', textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Avg Time / Pat</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>11.2 min</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Pending Reports:</span>
                    <strong style={{ color: 'var(--warning)' }}>2 Scans</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>OPD Share Revenue:</span>
                    <strong style={{ color: 'var(--success)' }}>₹42,000</strong>
                  </div>
                </div>
              </div>

              {/* Middle Column: Clinical 360° Profile & Prescriptions */}
              <div className="workspace-panel">
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: '16px' }}>Patient: {selectedPatient.name}</h2>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Sex: {selectedPatient.gender} | Age: {selectedPatient.age} | BG: {selectedPatient.bloodGroup} | ID: {selectedPatient.id}
                    </div>
                  </div>
                  <div className="flex gap-sm">
                    {/* Pregnancy check badge status */}
                    {selectedPatient.pregnancyStatus && (
                      <span className="badge badge-warning" style={{ alignSelf: 'center', fontWeight: 'bold' }}>🤰 Pregnant (Gestation Active)</span>
                    )}
                    <button
                      type="button"
                      className={`btn ${showAiPanel ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setShowAiPanel(!showAiPanel)}
                      style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                      title="Toggle Clinical AI Co-pilot Sidepanel"
                    >
                      <Sparkles size={14} style={{ color: showAiPanel ? 'white' : 'var(--primary)' }} />
                      <span>AI Co-pilot: {showAiPanel ? 'ON' : 'OFF'}</span>
                    </button>
                    <button className="btn btn-secondary" onClick={() => setShowFitnessDialog(true)} style={{ padding: '6px 12px' }}>
                      <FileText size={14} />
                      <span>Fitness Certificate</span>
                    </button>
                    <button className="btn btn-secondary btn-icon" title="Print clinical records" onClick={() => addToast('info', "Printing clinical records...")}>
                      <Printer size={14} />
                    </button>
                  </div>
                </div>

                {/* One-Click Action Toolbar */}
                <div style={{ display: 'flex', gap: '6px', padding: '8px 16px', background: 'var(--bg-muted)', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => setSelectedTabCategory('lab')}>
                    🧪 Order Labs
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => { setSelectedTabCategory('lab'); setShowFormFDialog(true); }}>
                    🩻 Order Radiology
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => setSelectedTabCategory('certificates')}>
                    📋 Refer to Specialist
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => { setActiveTab('wards'); addToast('info', "Navigating to Wards matrix for direct IPD admission allotment..."); }}>
                    🏥 Admit to IPD
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => setSelectedTabCategory('certificates')}>
                    📜 Medical Cert
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => setShowFitnessDialog(true)}>
                    🏃 Fitness Cert
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px', color: 'var(--success)' }} onClick={() => addToast('success', `Prescription shared to ${selectedPatient.name} via WhatsApp.`)}>
                    💬 WhatsApp Share
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => addToast('info', "Prescription sent to PDF printing queue.")}>
                    🖨️ Print Rx
                  </button>
                  
                  {/* Quick Consultation Mode Button */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ padding: '4px 10px', fontSize: '10px', height: '24px', marginLeft: 'auto', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: 'none' }}
                    onClick={() => {
                      setSoapSubjective({
                        chiefComplaint: "Review of Chronic Essential Hypertension",
                        hpi: "Patient presents for routine follow-up of chronic hypertension. Reports no chest pain, shortness of breath, or headache. Compliant with lifestyle modifications.",
                        medicalHistory: "Essential Hypertension (3 years)",
                        familyHistory: "Father - CAD, Mother - Diabetes",
                        surgicalHistory: "None"
                      });
                      setSoapObjective({
                        height: 175,
                        weight: 75,
                        painScale: 0,
                        lifestyle: "Moderate dietary sodium, walks 30 mins daily",
                        mentalHealth: "PHQ-9 Score: 3 (Minimal/None)"
                      });
                      setSoapAssessment({
                        diagnosisCode: "Essential hypertension [I10]",
                        differential: "White coat hypertension, secondary renal hypertension"
                      });
                      setSoapPlan({
                        treatment: "Continue low sodium DASH diet. Walk 30 minutes daily. Monitor BP twice weekly at home.",
                        referralSpecialist: "None"
                      });
                      setConsultationNotes("Routine follow-up check. BP is stable at target level (< 140/90).");
                      
                      const quickRx = {
                        id: `RX-QUICK-${Date.now()}`,
                        medication: 'Amlodipine (Generic: Norvasc)',
                        dosage: '5mg',
                        frequency: 'Once Daily (OD)',
                        duration: '30 days',
                        instructions: 'Take in the morning after food'
                      };
                      setPatients(prev => prev.map(p => p.id === selectedPatientId ? { ...p, prescriptions: [quickRx] } : p));
                      setSelectedTabCategory('soap');
                      addToast('success', "🚀 30-Second Consultation complete! EMR pre-filled, Metformin/Amlodipine Rx drafted & PDF ready.");
                    }}
                  >
                    🚀 30s Quick OPD Mode
                  </button>
                </div>

                <div className="workspace-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', flexGrow: 1, minHeight: 0 }}>
                  {/* Vital Board & Vitals Diagnostics (Shock Index / MAP) */}
                  <div className="grid grid-4">
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--bg-muted)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Blood Pressure</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Heart size={14} style={{ color: 'var(--danger)' }} />
                        <span>{selectedPatient.vitals.bloodPressure}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--primary)', marginTop: '2px', fontWeight: 600 }}>MAP: {calculatedVitalMetrics.map} mmHg</div>
                    </div>

                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--bg-muted)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Heart Rate</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Activity size={14} style={{ color: 'var(--danger)' }} />
                        <span>{selectedPatient.vitals.heartRate} bpm</span>
                      </div>
                      <div style={{ fontSize: '10px', color: calculatedVitalMetrics.shockIndex > 0.9 ? 'var(--danger)' : 'var(--text-muted)', marginTop: '2px', fontWeight: 600 }}>
                        Shock Index: {calculatedVitalMetrics.shockIndex}
                      </div>
                    </div>

                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--bg-muted)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>SpO2 O2 Sat</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Activity size={14} style={{ color: 'var(--primary)' }} />
                        <span>{selectedPatient.vitals.oxygenSat}%</span>
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Room Air</div>
                    </div>

                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--bg-muted)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Triage Acuity</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Shield size={14} style={{ color: 'var(--warning)' }} />
                        <span>ESI-{selectedPatient.esiScore || 3}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Acuity Rating</div>
                    </div>
                  </div>

                  {/* Severe Allergy alerts */}
                  {selectedPatient.allergies.length > 0 && (
                    <div style={{ padding: '12px', backgroundColor: 'rgba(220, 38, 38, 0.05)', border: '1px solid rgba(220, 38, 38, 0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <AlertTriangle size={18} style={{ color: 'var(--danger)' }} />
                      <div style={{ fontSize: '12px' }}>
                        <strong>Active Allergen Warning:</strong> {selectedPatient.allergies.map(a => `${a.substance} (${a.severity} severity - triggers ${a.reaction})`).join(', ')}
                      </div>
                    </div>
                  )}
                  {/* Clinical Decision Support (CDS) Intelligence Banners */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {/* High Risk Alert */}
                    <div style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Activity size={16} style={{ color: selectedPatient.vitals.heartRate > 100 || selectedPatient.id === 'PX-2026-8812' ? 'var(--danger)' : 'var(--success)' }} />
                      <div style={{ fontSize: '11px' }}>
                        <div style={{ fontWeight: 600 }}>Clinical Risk Profile:</div>
                        <span style={{ color: selectedPatient.id === 'PX-2026-8812' ? 'var(--danger)' : 'var(--success)' }}>
                          {selectedPatient.id === 'PX-2026-8812' ? '⚠️ High Risk: Pregnant + Tachycardia' : '✅ Stable Risk Profile'}
                        </span>
                      </div>
                    </div>
                    {/* Vaccination Alerts */}
                    <div style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} style={{ color: 'var(--warning)' }} />
                      <div style={{ fontSize: '11px' }}>
                        <div style={{ fontWeight: 600 }}>Vaccinations & Screening Due:</div>
                        <span style={{ color: 'var(--warning)' }}>Influenza Booster, HbA1c Due</span>
                      </div>
                    </div>
                  </div>
                  {/* Advanced OPD: Chief complaints & Systemic Examination */}
                  <div className="grid grid-2" style={{ gap: '16px' }}>
                    <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px', color: 'var(--primary)' }}>OPD Chief Complaints Triage</h3>
                      {selectedPatient.chiefComplaints && selectedPatient.chiefComplaints.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {selectedPatient.chiefComplaints.map((c, idx) => (
                            <div key={idx} className="flex justify-between text-xs" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                              <span>• {c.complaint}</span>
                              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Duration: {c.duration}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No triage complaints registered. Add in triage section.</div>
                      )}
                    </div>

                    <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px', color: 'var(--primary)' }}>Systemic Physical Examination</h3>
                      {selectedPatient.systemicExam ? (
                        <div style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-muted)' }}>
                          <div><strong>CVS:</strong> {selectedPatient.systemicExam.cvs}</div>
                          <div><strong>RS:</strong> {selectedPatient.systemicExam.rs}</div>
                          <div><strong>GIT:</strong> {selectedPatient.systemicExam.git}</div>
                          <div><strong>CNS:</strong> {selectedPatient.systemicExam.cns}</div>
                        </div>
                      ) : (
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Physical exam records pending.</div>
                      )}
                    </div>
                  </div>

                  {/* Tabs layout inside console details */}
                  <div className="tabs-container" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
                    <div className="tab-list" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '16px', overflowX: 'auto', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      <span
                        className={`tab-item ${selectedTabCategory === 'all' || !['soap', 'prescriptions', 'lab', 'certificates'].includes(selectedTabCategory) ? 'active' : ''}`}
                        onClick={() => setSelectedTabCategory('all')}
                        style={{
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          background: (selectedTabCategory === 'all' || !['soap', 'prescriptions', 'lab', 'certificates'].includes(selectedTabCategory)) ? 'var(--primary)' : 'var(--bg-muted)',
                          color: (selectedTabCategory === 'all' || !['soap', 'prescriptions', 'lab', 'certificates'].includes(selectedTabCategory)) ? 'white' : 'var(--text-muted)',
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        Clinical Profile
                      </span>
                      <span
                        className={`tab-item ${selectedTabCategory === 'soap' ? 'active' : ''}`}
                        onClick={() => setSelectedTabCategory('soap')}
                        style={{
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          background: selectedTabCategory === 'soap' ? 'var(--primary)' : 'var(--bg-muted)',
                          color: selectedTabCategory === 'soap' ? 'white' : 'var(--text-muted)',
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        SOAP & Assessment
                      </span>
                      <span
                        className={`tab-item ${selectedTabCategory === 'prescriptions' ? 'active' : ''}`}
                        onClick={() => setSelectedTabCategory('prescriptions')}
                        style={{
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          background: selectedTabCategory === 'prescriptions' ? 'var(--primary)' : 'var(--bg-muted)',
                          color: selectedTabCategory === 'prescriptions' ? 'white' : 'var(--text-muted)',
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        Rx Prescription
                      </span>
                      <span
                        className={`tab-item ${selectedTabCategory === 'lab' ? 'active' : ''}`}
                        onClick={() => setSelectedTabCategory('lab')}
                        style={{
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          background: selectedTabCategory === 'lab' ? 'var(--primary)' : 'var(--bg-muted)',
                          color: selectedTabCategory === 'lab' ? 'white' : 'var(--text-muted)',
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        Labs & Imaging ({selectedPatient.labResults.length})
                      </span>
                      <span
                        className={`tab-item ${selectedTabCategory === 'certificates' ? 'active' : ''}`}
                        onClick={() => setSelectedTabCategory('certificates')}
                        style={{
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          background: selectedTabCategory === 'certificates' ? 'var(--primary)' : 'var(--bg-muted)',
                          color: selectedTabCategory === 'certificates' ? 'white' : 'var(--text-muted)',
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        Certificates & Follow-up
                      </span>
                    </div>

                    {(selectedTabCategory === 'all' || !['soap', 'prescriptions', 'lab', 'certificates'].includes(selectedTabCategory)) && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Active conditions */}
                        <div>
                          <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Active Diagnoses & Conditions</h3>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {selectedPatient.medicalHistory.map((m, idx) => (
                              <span key={idx} className="badge badge-warning" style={{ gap: '4px' }}>
                                <AlertCircle size={10} />
                                <span>{m.condition} (Diag: {m.diagnosedDate})</span>
                              </span>
                            ))}
                            {selectedPatient.medicalHistory.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>No active conditions.</span>}
                          </div>
                        </div>

                        {/* Visit timeline */}
                        <div>
                          <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Clinical Patient Timeline (Single-Screen Records)</h3>
                          <div className="timeline">
                            {/* Surgeries / History */}
                            <div className="timeline-item danger">
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>CABG Bypass Surgery (Cardiothoracic Dept)</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                2025-11-12 | Surgeon: Dr. R. K. Sharma | Apollo Cardiac
                              </div>
                              <p style={{ fontSize: '12px', marginTop: '6px', color: 'var(--text-muted)' }}>Triple vessel disease. Successful coronary artery bypass graft. Follow up cardiology recommended.</p>
                            </div>

                            {/* Previous Visits */}
                            {selectedPatient.visits.map(v => (
                              <div key={v.id} className="timeline-item info">
                                <div style={{ fontSize: '12px', fontWeight: 600 }}>Visit: {v.reason} ({v.doctor})</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                  {v.date} | Department: {v.department}
                                </div>
                                <p style={{ fontSize: '12px', marginTop: '6px', color: 'var(--text-muted)' }}>{v.notes}</p>
                              </div>
                            ))}

                            {/* Lab Reports */}
                            <div className="timeline-item success">
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>Lab Investigation: Comprehensive Lipid & Diabetes Panel</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                2026-08-01 | Lab: Metro Diagnostics | Status: Verified
                              </div>
                              <div style={{ fontSize: '11px', marginTop: '6px', color: 'var(--text-muted)', background: 'var(--bg-muted)', padding: '8px', borderRadius: '4px' }}>
                                <div>• Total Cholesterol: <strong>240 mg/dL</strong> <span style={{ color: 'var(--danger)' }}>[HIGH]</span></div>
                                <div>• HbA1c Level: <strong>7.2%</strong> <span style={{ color: 'var(--danger)' }}>[ELEVATED]</span></div>
                              </div>
                            </div>

                            {/* Radiology Reports */}
                            <div className="timeline-item info">
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>Radiology: Chest X-Ray Bilateral (AP View)</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                2026-07-28 | Imaging Dept | Radiologist: Dr. Amit Sen
                              </div>
                              <p style={{ fontSize: '12px', marginTop: '6px', color: 'var(--text-muted)' }}>Lung fields are clear bilateral. Cardiac size is within normal limits. No active consolidation.</p>
                            </div>

                            {/* Past Prescriptions */}
                            <div className="timeline-item warning">
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>Active Prescriptions Summary</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                Chronic Medication Registry
                              </div>
                              <div style={{ fontSize: '11px', marginTop: '6px', color: 'var(--text-muted)' }}>
                                • Telmisartan 40mg OD (Hypertension) | • Metformin 500mg BD (Diabetes)
                              </div>
                            </div>

                            {/* Admissions */}
                            <div className="timeline-item warning">
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>IPD Admission: Acute Angina Observation</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                2026-02-10 to 2026-02-12 | Ward: ICU Bed 04 | Dr. Sandeep Mehta
                              </div>
                              <p style={{ fontSize: '12px', marginTop: '6px', color: 'var(--text-muted)' }}>Admitted with chest tightness. Cardiac enzymes troponin negative. Discharged stable on daily antianginal medication.</p>
                            </div>

                            {/* Today's Visit */}
                            <div className="timeline-item success">
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>Today's OPD Consultation Created</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Vitals Checked. Awaiting prescription/lab directives.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedTabCategory === 'soap' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(37,99,235,0.05)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(37,99,235,0.2)' }}>
                          <div>
                            <span style={{ fontWeight: 600, fontSize: '13px' }}>AI EMR SOAP Dictation Copilot</span>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
                              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Template:</span>
                              <select className="form-input" style={{ width: '180px', height: '24px', fontSize: '11px', padding: '0 8px' }} value={selectedTemplate} onChange={(e) => {
                                setSelectedTemplate(e.target.value);
                                addToast('info', `Swapped to EMR consultation template: ${e.target.value}`);
                              }}>
                                <option value="Standard Adult Assessment">Standard Adult Assessment</option>
                                <option value="Pediatric Growth Chart Triage">Pediatric Growth Chart Triage</option>
                                <option value="Antenatal Obstetric Tracker">Antenatal Obstetric Tracker</option>
                              </select>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={startVoiceDictationSim}
                            disabled={doctorDictating}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <Mic size={14} />
                            <span>{doctorDictating ? 'Transcribing...' : 'Start Voice dictation'}</span>
                          </button>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Auto-fill Templates:</span>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '2px 6px', fontSize: '10px' }}
                              onClick={() => {
                                setSoapSubjective({
                                  chiefComplaint: "Diabetes Mellitus Check [DM]",
                                  hpi: "Patient presents with dry mouth, polyuria, and fatigue for 2 weeks. Fasting blood glucose recorded at 180 mg/dL.",
                                  medicalHistory: "Type 2 Diabetes Mellitus diagnosed in 2024.",
                                  familyHistory: "Father has history of Diabetic Nephropathy.",
                                  surgicalHistory: "None"
                                });
                                setSoapObjective(prev => ({
                                  ...prev,
                                  weight: 84,
                                  lifestyle: "Sedentary, high glycemic index dietary habits."
                                }));
                                setSoapAssessment({
                                  diagnosisCode: "Type 2 diabetes mellitus [E11]",
                                  differential: "Impaired glucose tolerance, secondary pancreatic diabetes"
                                });
                                setSoapPlan({
                                  treatment: "Start Metformin. Restrict daily carbohydrates to < 100g. Complete HbA1c lab checks.",
                                  referralSpecialist: "None"
                                });
                                const dmRx = {
                                  id: `RX-DM-${Date.now()}`,
                                  medication: 'Metformin (Generic: Glucophage)',
                                  dosage: '500mg',
                                  frequency: 'Twice Daily (BD)',
                                  duration: '30 days',
                                  instructions: 'Take with breakfast and dinner'
                                };
                                setPatients(prev => prev.map(p => p.id === selectedPatientId ? { ...p, prescriptions: [dmRx] } : p));
                                addToast('success', "DM template loaded: Diabetes EMR & Metformin prescription drafted!");
                              }}
                            >
                              DM (Diabetes)
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '2px 6px', fontSize: '10px' }}
                              onClick={() => {
                                setSoapSubjective({
                                  chiefComplaint: "Essential Hypertension Check [HTN]",
                                  hpi: "Routine follow-up of chronic hypertension. Reports occasional lightheadedness. No palpitations, chest pain, or dyspnea.",
                                  medicalHistory: "Essential Hypertension (3 years)",
                                  familyHistory: "Mother has history of Hypertension.",
                                  surgicalHistory: "None"
                                });
                                setSoapObjective(prev => ({
                                  ...prev,
                                  lifestyle: "Moderate dietary sodium, moderate walks."
                                }));
                                setSoapAssessment({
                                  diagnosisCode: "Essential hypertension [I10]",
                                  differential: "White coat hypertension, renovascular hypertension"
                                });
                                setSoapPlan({
                                  treatment: "Continue low sodium diet. Check BP twice weekly. Follow up in 1 month.",
                                  referralSpecialist: "None"
                                });
                                const htnRx = {
                                  id: `RX-HTN-${Date.now()}`,
                                  medication: 'Amlodipine (Generic: Norvasc)',
                                  dosage: '5mg',
                                  frequency: 'Once Daily (OD)',
                                  duration: '30 days',
                                  instructions: 'Take in morning after food'
                                };
                                setPatients(prev => prev.map(p => p.id === selectedPatientId ? { ...p, prescriptions: [htnRx] } : p));
                                addToast('success', "HTN template loaded: Hypertension EMR & Amlodipine prescription drafted!");
                              }}
                            >
                              HTN (Hypertension)
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '2px 6px', fontSize: '10px' }}
                              onClick={() => {
                                setSoapSubjective({
                                  chiefComplaint: "Chronic Bronchitis / COPD Flare",
                                  hpi: "Patient presents with productive cough, dyspnea on exertion, and wheezing. Symptoms worsened over the past 3 days after dust exposure.",
                                  medicalHistory: "COPD Stage II diagnosed in 2023.",
                                  familyHistory: "Uncle had chronic asthma.",
                                  surgicalHistory: "None"
                                });
                                setSoapAssessment({
                                  diagnosisCode: "Chronic obstructive pulmonary disease [J44]",
                                  differential: "Acute bronchitis, cardiac asthma"
                                });
                                setSoapPlan({
                                  treatment: "Advised inhaled bronchodilators. Complete chest X-ray and pulse oximetry check.",
                                  referralSpecialist: "None"
                                });
                                addToast('success', "COPD template loaded: COPD EMR elements drafted!");
                              }}
                            >
                              COPD (Pulmonary)
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '2px 6px', fontSize: '10px', color: 'var(--primary)', borderColor: 'var(--primary)' }}
                              onClick={() => addToast('info', "Doctor personal templates: Custom templates can be saved from Settings > EMR Configuration.")}
                            >
                              + Personal Favs
                            </button>
                          </div>

                        {/* Subjective */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h4 style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, marginBottom: '10px' }}>Subjective (Patient Narrative & History)</h4>
                          <div className="grid grid-2" style={{ gap: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Chief Complaint</label>
                              <input
                                type="text"
                                className="form-input"
                                value={soapSubjective.chiefComplaint}
                                onChange={(e) => setSoapSubjective({ ...soapSubjective, chiefComplaint: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">History of Present Illness (HPI)</label>
                              <textarea
                                className="form-input"
                                rows={2}
                                value={soapSubjective.hpi}
                                onChange={(e) => setSoapSubjective({ ...soapSubjective, hpi: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="grid grid-3" style={{ gap: '12px', marginTop: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Past Medical History</label>
                              <input
                                type="text"
                                className="form-input"
                                value={soapSubjective.medicalHistory}
                                onChange={(e) => setSoapSubjective({ ...soapSubjective, medicalHistory: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Family History</label>
                              <input
                                type="text"
                                className="form-input"
                                value={soapSubjective.familyHistory}
                                onChange={(e) => setSoapSubjective({ ...soapSubjective, familyHistory: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Surgical History</label>
                              <input
                                type="text"
                                className="form-input"
                                value={soapSubjective.surgicalHistory}
                                onChange={(e) => setSoapSubjective({ ...soapSubjective, surgicalHistory: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Objective */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h4 style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, marginBottom: '10px' }}>Objective (Physical Assessment & Vital metrics)</h4>
                          <div className="grid grid-3" style={{ gap: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Height (cm)</label>
                              <input
                                type="number"
                                className="form-input"
                                value={soapObjective.height}
                                onChange={(e) => setSoapObjective({ ...soapObjective, height: parseInt(e.target.value) || 0 })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Weight (kg)</label>
                              <input
                                type="number"
                                className="form-input"
                                value={soapObjective.weight}
                                onChange={(e) => setSoapObjective({ ...soapObjective, weight: parseInt(e.target.value) || 0 })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Dynamic BMI Score</label>
                              <div style={{ height: '36px', display: 'flex', alignItems: 'center', padding: '0 12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)', fontWeight: 700, color: 'var(--primary)' }}>
                                {(() => {
                                  const h = soapObjective.height / 100;
                                  const w = soapObjective.weight;
                                  if (h <= 0) return '0.0';
                                  const bmi = (w / (h * h)).toFixed(1);
                                  let status = 'Normal';
                                  if (parseFloat(bmi) >= 30) status = 'Obese';
                                  else if (parseFloat(bmi) >= 25) status = 'Overweight';
                                  else if (parseFloat(bmi) < 18.5) status = 'Underweight';
                                  return `${bmi} (${status})`;
                                })()}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-2" style={{ gap: '12px', marginTop: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Pain Score Scale</span>
                                <strong>{soapObjective.painScale} / 10</strong>
                              </label>
                              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>None</span>
                                <input
                                  type="range"
                                  min="0"
                                  max="10"
                                  className="form-input"
                                  style={{ padding: 0, height: 'auto', flexGrow: 1 }}
                                  value={soapObjective.painScale}
                                  onChange={(e) => setSoapObjective({ ...soapObjective, painScale: parseInt(e.target.value) })}
                                />
                                <span style={{ fontSize: '11px', color: 'var(--danger)' }}>Severe</span>
                              </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Lifestyle Risk Factors</label>
                              <input
                                type="text"
                                className="form-input"
                                value={soapObjective.lifestyle}
                                onChange={(e) => setSoapObjective({ ...soapObjective, lifestyle: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
                            <label className="form-label">Mental Health Screening (PHQ-9)</label>
                            <select
                              className="form-input"
                              value={soapObjective.mentalHealth}
                              onChange={(e) => setSoapObjective({ ...soapObjective, mentalHealth: e.target.value })}
                            >
                              <option>PHQ-9 Score: 3 (Minimal/None)</option>
                              <option>PHQ-9 Score: 5 (Mild depressive indicators)</option>
                              <option>PHQ-9 Score: 11 (Moderate clinical depression)</option>
                              <option>PHQ-9 Score: 18 (Moderately severe depression)</option>
                              <option>PHQ-9 Score: 24 (Severe clinical depression)</option>
                            </select>
                          </div>
                        </div>

                        {/* Assessment */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h4 style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, marginBottom: '10px' }}>Assessment (Diagnosis & Clinical Decisions)</h4>
                          <div className="form-group">
                            <label className="form-label">ICD-10 / ICD-11 Diagnosis Codes</label>
                            <select
                              className="form-input"
                              value={soapAssessment.diagnosisCode}
                              onChange={(e) => setSoapAssessment({ ...soapAssessment, diagnosisCode: e.target.value })}
                            >
                              <option value="Essential hypertension [I10]">Essential hypertension [I10]</option>
                              <option value="Type 2 diabetes mellitus [E11]">Type 2 diabetes mellitus [E11]</option>
                              <option value="Angina pectoris, unspecified [I20.9]">Angina pectoris, unspecified [I20.9]</option>
                              <option value="Acute myocardial infarction [I21]">Acute myocardial infarction [I21]</option>
                              <option value="Chronic obstructive pulmonary disease [J44]">Chronic obstructive pulmonary disease [J44]</option>
                              <option value="Coronary artery disease, unspecified [I25.10]">Coronary artery disease, unspecified [I25.10]</option>
                            </select>
                          </div>
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Differential Diagnoses Suggestions</label>
                            <textarea
                              className="form-input"
                              rows={2}
                              value={soapAssessment.differential}
                              onChange={(e) => setSoapAssessment({ ...soapAssessment, differential: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* Plan */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h4 style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, marginBottom: '10px' }}>Plan (Action & Clinical Referrals)</h4>
                          <div className="form-group">
                            <label className="form-label">Treatment Plan & Patient Instructions</label>
                            <textarea
                              className="form-input"
                              rows={2}
                              value={soapPlan.treatment}
                              onChange={(e) => setSoapPlan({ ...soapPlan, treatment: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-2" style={{ gap: '12px', marginTop: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Clinical Progress Notes</label>
                              <textarea
                                className="form-input"
                                rows={2}
                                placeholder="Record today's patient evolution notes..."
                                defaultValue="Patient reports mild improvement in palpitations after baseline rest; ECG requested for verification."
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Chronic Disease Outcomes Tracking</label>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: '6px', padding: '8px', background: 'var(--bg-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>BP Control Status:</span> <strong style={{ color: 'var(--success)' }}>STABLE (135/85)</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>HbA1c Target Level:</span> <strong style={{ color: 'var(--success)' }}>IMPROVING (7.2% to 6.5%)</strong>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
                            <label className="form-label">Assigned Specialist Assignment (Internal/External Referral)</label>
                            <select
                              className="form-input"
                              value={soapPlan.referralSpecialist}
                              onChange={(e) => setSoapPlan({ ...soapPlan, referralSpecialist: e.target.value })}
                            >
                              <option value="None">None - Continue OPD management</option>
                              <option value="Cardiology (Internal)">Cardiology (Dr. Ananya Ray - Internal Referral)</option>
                              <option value="Endocrinology (External)">Endocrinology (External Partner Specialist)</option>
                              <option value="Nephrology (External)">Nephrology (External Partner Specialist)</option>
                            </select>
                          </div>
                        </div>

                        {/* Digitally Signed verified */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                          <input
                            type="checkbox"
                            checked={digitalSignatureChecked}
                            onChange={(e) => {
                              setDigitalSignatureChecked(e.target.checked);
                              if (e.target.checked) addToast('success', "Doctor digital signature verified & stamped to EMR record.");
                            }}
                          />
                          <span style={{ fontSize: '12px' }}>
                            <strong>Digitally Sign EMR Record</strong> (Verified Stamp: Dr. Sandeep Mehta, MMC Reg No: 99402)
                          </span>
                        </div>

                        <button type="button" className="btn btn-primary" onClick={() => addToast('success', 'EMR SOAP details saved successfully to clinical archive!')} style={{ alignSelf: 'flex-end' }}>
                          Save Clinical Assessment
                        </button>
                      </div>
                    )}

                    {selectedTabCategory === 'prescriptions' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Prescription builder tools */}
                        <div className="flex justify-between align-center" style={{ flexWrap: 'wrap', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Advice Templates:</span>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {DISEASE_ADVICE_TEMPLATES.map((t, idx) => (
                                <button key={idx} type="button" className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => applyAdviceTemplate(t.name)}>
                                  {t.name.split(' ')[0]}
                                </button>
                              ))}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '4px 10px', fontSize: '11px', color: 'var(--primary)', borderColor: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}
                            onClick={() => {
                              const previousMeds = [
                                { id: 'RX-PREV-1', medication: 'Atorvastatin (Generic: Lipitor)', dosage: '20mg', frequency: 'Once Daily (OD)', duration: '30 days', instructions: 'Take at bedtime' },
                                { id: 'RX-PREV-2', medication: 'Amlodipine (Generic: Norvasc)', dosage: '5mg', frequency: 'Once Daily (OD)', duration: '30 days', instructions: 'Take in morning' }
                              ];
                              setPatients(prev => prev.map(p => p.id === selectedPatientId ? { ...p, prescriptions: [...p.prescriptions, ...previousMeds] } : p));
                              addToast('success', "Loaded and repeated previous prescription medications successfully.");
                            }}
                          >
                            <span>🔄 Repeat Previous Prescription (Repeat Rx)</span>
                          </button>
                        </div>

                        {/* Consultation notes text-area */}
                        <div className="form-group">
                          <label className="form-label">Doctor Consultation Notes & Advice Summary</label>
                          <textarea
                            rows={3}
                            placeholder="Add diagnosis details, symptoms, patient instructions..."
                            className="form-input"
                            value={consultationNotes}
                            onChange={(e) => setConsultationNotes(e.target.value)}
                          />
                        </div>

                        {/* Rx Table list */}
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Medication</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Dosage</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Frequency</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Duration</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Instructions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedPatient.prescriptions.map(p => (
                              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '8px 0', fontWeight: 600 }}>{p.medication}</td>
                                <td style={{ padding: '8px 0' }}>{p.dosage}</td>
                                <td style={{ padding: '8px 0' }}>{p.frequency}</td>
                                <td style={{ padding: '8px 0' }}>{p.duration}</td>
                                <td style={{ padding: '8px 0', color: 'var(--text-muted)' }}>{p.instructions}</td>
                              </tr>
                            ))}
                            {selectedPatient.prescriptions.length === 0 && (
                              <tr>
                                <td colSpan={5} style={{ padding: '16px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                                  No medication active. Use builder below to prescribe.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        {/* Favorite / Frequently Prescribed Medicines */}
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', backgroundColor: 'var(--bg-muted)', padding: '10px 16px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>⭐ Favorite Meds:</span>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 6px', fontSize: '10px' }}
                            onClick={() => setNewMed({ medication: 'Metformin (Generic: Glucophage)', dosage: '500mg', frequency: 'Twice Daily (BD)', duration: '30 days', instructions: 'Take with breakfast and dinner' })}
                          >
                            Metformin
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 6px', fontSize: '10px' }}
                            onClick={() => setNewMed({ medication: 'Atorvastatin (Generic: Lipitor)', dosage: '20mg', frequency: 'Once Daily (OD)', duration: '30 days', instructions: 'Take at bedtime' })}
                          >
                            Atorvastatin
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 6px', fontSize: '10px' }}
                            onClick={() => setNewMed({ medication: 'Amlodipine (Generic: Norvasc)', dosage: '5mg', frequency: 'Once Daily (OD)', duration: '30 days', instructions: 'Take in morning' })}
                          >
                            Amlodipine
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 6px', fontSize: '10px' }}
                            onClick={() => setNewMed({ medication: 'Aspirin (Generic: Ecotrin)', dosage: '75mg', frequency: 'Once Daily (OD)', duration: '30 days', instructions: 'Take after lunch' })}
                          >
                            Aspirin
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 6px', fontSize: '10px' }}
                            onClick={() => setNewMed({ medication: 'Paracetamol (Generic: Calpol)', dosage: '650mg', frequency: 'As Needed (PRN)', duration: '5 days', instructions: 'Take for fever / pain' })}
                          >
                            Paracetamol
                          </button>
                        </div>

                        {/* Prescription builder form */}
                        <form onSubmit={handleAddMedication} style={{ backgroundColor: 'var(--bg-muted)', padding: '16px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '12px', fontWeight: 600 }}>Prescription Rx Builder (with drug-interaction checks)</h3>
                            <span style={{ fontSize: '10px', color: 'var(--success)' }}>✨ Auto-complete & Generic alternatives enabled</span>
                          </div>
                          <div className="grid grid-3" style={{ gap: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Medication Name</label>
                              <input
                                type="text"
                                placeholder="Aspirin, Atorvastatin, Lisinopril..."
                                className="form-input"
                                style={{ height: '32px' }}
                                value={newMed.medication}
                                onChange={(e) => setNewMed({ ...newMed, medication: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Dosage</label>
                              <input
                                type="text"
                                placeholder="e.g. 500mg, 1 cap"
                                className="form-input"
                                style={{ height: '32px' }}
                                value={newMed.dosage}
                                onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Frequency</label>
                              <select
                                className="form-input"
                                style={{ height: '32px' }}
                                value={newMed.frequency}
                                onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                              >
                                <option value="Once Daily (OD)">Once Daily (OD)</option>
                                <option value="Twice Daily (BD)">Twice Daily (BD)</option>
                                <option value="Thrice Daily (TD)">Thrice Daily (TD)</option>
                                <option value="As Needed (PRN)">As Needed (PRN)</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex gap-md">
                            <input
                              type="text"
                              placeholder="Duration (e.g. 5 days)"
                              className="form-input"
                              style={{ height: '32px', width: '150px' }}
                              value={newMed.duration}
                              onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
                            />
                            <input
                              type="text"
                              placeholder="Clinical Instructions (e.g. after food)"
                              className="form-input"
                              style={{ height: '32px', flexGrow: 1 }}
                              value={newMed.instructions}
                              onChange={(e) => setNewMed({ ...newMed, instructions: e.target.value })}
                            />
                            <button type="submit" className="btn btn-primary" style={{ height: '32px', padding: '0 16px' }}>
                              Add Rx
                            </button>
                          </div>
                        </form>

                        {/* Multi-language selector */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Print Translation Options:</span>
                          <select className="form-input" style={{ width: '150px', height: '28px', fontSize: '11px' }} value={rxLanguage} onChange={(e) => setRxLanguage(e.target.value)}>
                            <option value="English">English</option>
                            <option value="Hindi">Hindi / हिन्दी</option>
                            <option value="Telugu">Telugu / తెలుగు</option>
                            <option value="Spanish">Spanish / Español</option>
                          </select>
                        </div>

                        {/* Patient Education Widget */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Patient Education Advice:</span>
                          <button type="button" className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('success', "Diet Advice Sheet (English/Hindi) sent to patient's WhatsApp.")}>
                            🥗 Diet Plan PDF
                          </button>
                          <button type="button" className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('success', "Cardio Exercise Protocol shared via WhatsApp.")}>
                            🏃 Exercise Advice
                          </button>
                          <button type="button" className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('success', "Chronic disease guidelines sheet shared.")}>
                            📘 Disease Education
                          </button>
                        </div>

                        {/* Keyboard Shortcuts Cheat Sheet */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'var(--bg-muted)', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '10px', color: 'var(--text-muted)' }}>
                          <strong style={{ color: 'var(--primary)' }}>⌨️ Keyboard Shortcuts:</strong>
                          <span>[Alt + S] Save EMR</span> | <span>[Alt + D] AI Dictate</span> | <span>[Alt + R] Repeat Rx</span> | <span>[Alt + P] Print Prescription</span>
                        </div>
                      </div>
                    )}

                    {selectedTabCategory === 'lab' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Labs table list */}
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Test ID</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Test Name</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Source</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Referral Share</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Status</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Results / Reports</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedPatient.labResults.map(lab => (
                              <tr key={lab.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '8px 0', fontWeight: 600 }}>{lab.id}</td>
                                <td style={{ padding: '8px 0' }}>{lab.testName}</td>
                                <td style={{ padding: '8px 0' }}>
                                  <span className={`badge ${lab.outsourced ? 'badge-warning' : 'badge-primary'}`}>
                                    {lab.outsourced ? `Outsourced: ${lab.outsourcedLabName}` : 'Internal Lab'}
                                  </span>
                                </td>
                                <td>{lab.refDoctorShare ? `${lab.refDoctorShare}% split` : 'None'}</td>
                                <td style={{ padding: '8px 0' }}>
                                  <span className={`badge ${lab.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                                    {lab.status}
                                  </span>
                                </td>
                                <td style={{ padding: '8px 0' }}>
                                  {lab.status === 'completed' ? (
                                    <div style={{ fontSize: '11px' }}>
                                      <strong>{lab.resultValue}</strong> <span style={{ color: 'var(--text-muted)' }}>({lab.referenceRange})</span>
                                      <div style={{ color: 'var(--success)', fontSize: '10px', marginTop: '2px' }}>Verified by: {lab.verifiedBy}</div>
                                    </div>
                                  ) : (
                                    <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Waiting on Lab Tech upload</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                            {selectedPatient.labResults.length === 0 && (
                              <tr>
                                <td colSpan={6} style={{ padding: '16px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                                  No laboratory tests ordered today.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        {/* Lab request generator form */}
                        <form onSubmit={handleAddLabRequest} style={{ backgroundColor: 'var(--bg-muted)', padding: '16px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <h3 style={{ fontSize: '12px', fontWeight: 600 }}>Order New Laboratory / Radiology Investigation</h3>
                          <div className="grid grid-3" style={{ gap: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Test Name</label>
                              <input
                                type="text"
                                placeholder="e.g. Lipid Profile, Chest X-ray, HbA1c"
                                className="form-input"
                                style={{ height: '32px' }}
                                value={newOrder.testName}
                                onChange={(e) => setNewOrder({ ...newOrder, testName: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Category</label>
                              <select
                                className="form-input"
                                style={{ height: '32px' }}
                                value={newOrder.category}
                                onChange={(e) => {
                                  const cat = e.target.value as any;
                                  setNewOrder({ ...newOrder, category: cat });
                                  if (cat === 'radiology') {
                                    setShowFormFDialog(true);
                                  }
                                }}
                              >
                                <option value="pathology">Pathology (Blood/Fluid)</option>
                                <option value="radiology">Radiology (PC-PNDT Form F Scan)</option>
                              </select>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Referral Share (Doctor Split %)</label>
                              <input
                                type="number"
                                placeholder="e.g. 15%"
                                className="form-input"
                                style={{ height: '32px' }}
                                value={newOrder.referralShare}
                                onChange={(e) => setNewOrder({ ...newOrder, referralShare: e.target.value })}
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-md align-center">
                            <label className="flex align-center gap-sm" style={{ fontSize: '12px', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={newOrder.outsourced}
                                onChange={(e) => setNewOrder({ ...newOrder, outsourced: e.target.checked })}
                              />
                              <span>Outsource this Sample</span>
                            </label>
                            {newOrder.outsourced && (
                              <input
                                type="text"
                                placeholder="Outsource Lab Name (e.g. Metropolis)"
                                className="form-input"
                                style={{ height: '32px', width: '220px' }}
                                value={newOrder.outsourceLab}
                                onChange={(e) => setNewOrder({ ...newOrder, outsourceLab: e.target.value })}
                              />
                            )}
                            <button type="submit" className="btn btn-primary" style={{ height: '32px', marginLeft: 'auto' }}>
                              Order Test
                            </button>
                          </div>

                          {/* Critical Lab Alert Section */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', marginTop: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--danger)', fontWeight: 'bold', fontSize: '11px' }}>
                              <AlertCircle size={14} />
                              <span>CRITICAL RESULT ALERTS REGISTERED</span>
                            </div>
                            <div style={{ fontSize: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <div>• <strong>Serum Potassium:</strong> 6.2 mEq/L (Normal Ref: 3.5 - 5.0) - <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>HIGH (Critical Alert!)</span></div>
                              <div>• <strong>Hemoglobin (Hgb):</strong> 7.8 g/dL (Normal Ref: 12.0 - 16.0) - <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>LOW (Severe Anemia warning!)</span></div>
                            </div>
                          </div>

                          {/* Clinical Attachments Section */}
                          <div style={{ marginTop: '12px', borderTop: '1px dashed var(--border)', paddingTop: '16px' }}>
                            <h3 style={{ fontSize: '12px', fontWeight: 600, marginBottom: '12px', color: 'var(--primary)' }}>Clinical Scan Attachments & Diagnostic Images</h3>
                            <div className="grid grid-3" style={{ gap: '12px' }}>
                              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', background: 'var(--bg-muted)' }}>
                                <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border)' }}>
                                  <FileText size={20} style={{ color: 'var(--text-muted)' }} />
                                </div>
                                <div style={{ padding: '6px', fontSize: '9px' }}>
                                  <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>chest_xray_bilateral.png</div>
                                  <div style={{ color: 'var(--text-muted)' }}>2.4 MB | PNG Scan</div>
                                </div>
                              </div>
                              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', background: 'var(--bg-muted)' }}>
                                <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border)' }}>
                                  <FileText size={20} style={{ color: 'var(--text-muted)' }} />
                                </div>
                                <div style={{ padding: '6px', fontSize: '9px' }}>
                                  <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>ecg_strip_leads.jpg</div>
                                  <div style={{ color: 'var(--text-muted)' }}>1.1 MB | ECG Strip</div>
                                </div>
                              </div>
                              {/* File upload simulator button */}
                              <div style={{ border: '1.5px dashed var(--border)', borderRadius: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px', cursor: 'pointer', textAlign: 'center' }} onClick={() => addToast('success', "Simulated diagnostic scan attachment upload successful! Loaded into patient's EMR folder.")}>
                                <Plus size={16} style={{ color: 'var(--primary)', marginBottom: '2px' }} />
                                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Add Scan File</span>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}

                    {selectedTabCategory === 'certificates' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Certificates generator card */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>Clinical Certificate & Document Issuer</h3>
                          <div className="grid grid-2" style={{ gap: '12px' }}>
                            <div className="form-group">
                              <label className="form-label">Certificate Type</label>
                              <select className="form-input" style={{ height: '32px' }}>
                                <option>Sick Leave Medical Certificate</option>
                                <option>Physical Fitness for Employment Certificate</option>
                                <option>Return-to-Work Fit Certificate</option>
                                <option>Vaccination / Immunization Record</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label className="form-label">Medical Leave Duration</label>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <input type="date" className="form-input" style={{ height: '32px' }} defaultValue="2026-08-08" />
                                <input type="date" className="form-input" style={{ height: '32px' }} defaultValue="2026-08-11" />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Diagnostic Remarks</label>
                            <input type="text" className="form-input" defaultValue="Advised physical rest for 3 days due to acute fatigue and vital distress." />
                          </div>
                          <div className="flex gap-md justify-between align-center" style={{ marginTop: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                              <Shield size={14} style={{ color: 'var(--success)' }} />
                              <span>Stamps digital signature & secure verification QR card.</span>
                            </div>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => addToast('success', "Custom medical certificate issued & printed. Verification QR code stamped on header.")}
                            >
                              Issue & Download PDF
                            </button>
                          </div>
                        </div>

                        {/* Follow-up scheduler */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>Follow-Up Scheduling & SMS Reminders</h3>
                          <div className="grid grid-3" style={{ gap: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Follow-up Target Date</span>
                                <span style={{ fontSize: '10px', color: 'var(--primary)' }}>Quick Set:</span>
                              </label>
                              <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
                                <button type="button" className="btn btn-secondary" style={{ padding: '2px 4px', fontSize: '9px', flexGrow: 1 }} onClick={() => setFollowupDate('2026-08-11')}>3 Days</button>
                                <button type="button" className="btn btn-secondary" style={{ padding: '2px 4px', fontSize: '9px', flexGrow: 1 }} onClick={() => setFollowupDate('2026-08-15')}>7 Days</button>
                                <button type="button" className="btn btn-secondary" style={{ padding: '2px 4px', fontSize: '9px', flexGrow: 1 }} onClick={() => setFollowupDate('2026-08-23')}>15 Days</button>
                                <button type="button" className="btn btn-secondary" style={{ padding: '2px 4px', fontSize: '9px', flexGrow: 1 }} onClick={() => setFollowupDate('2026-09-08')}>1 Month</button>
                              </div>
                              <input
                                type="date"
                                className="form-input"
                                value={followupDate}
                                onChange={(e) => setFollowupDate(e.target.value)}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Reminder Channel</label>
                              <select
                                className="form-input"
                                value={followupChannel}
                                onChange={(e) => setFollowupChannel(e.target.value)}
                              >
                                <option value="WhatsApp">WhatsApp Message</option>
                                <option value="SMS">Direct SMS Alert</option>
                                <option value="Email">Email Digest</option>
                              </select>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <label className="flex align-center gap-sm" style={{ cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                                <input
                                  type="checkbox"
                                  checked={followupRecurring}
                                  onChange={(e) => setFollowupRecurring(e.target.checked)}
                                />
                                <span>Recurring Chronic Care Follow-up</span>
                              </label>
                            </div>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Outcome metrics tracked automatically under chronic disease metrics.</span>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => addToast('success', `Scheduled follow-up on ${followupDate} via ${followupChannel} successfully.`)}
                            >
                              Schedule Follow-up
                            </button>
                          </div>
                        </div>

                        {/* Missed / Overdue Follow-ups card */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--danger)', marginBottom: '8px' }}>Missed / Overdue Chronic Care Follow-ups</h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                              <span>• Hypertension Control Check (Scheduled: 2026-07-25)</span>
                              <span style={{ color: 'var(--danger)', fontWeight: 600 }}>OVERDUE (14 days)</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>• Lipid Panel Diagnostic Review (Scheduled: 2026-08-01)</span>
                              <span style={{ color: 'var(--danger)', fontWeight: 600 }}>OVERDUE (7 days)</span>
                            </div>
                          </div>
                        </div>

                        {/* Referral Management */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>Clinical Referral Builder (Internal & External Specialists)</h3>
                          <div className="grid grid-3" style={{ gap: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Internal Referral (Doctor)</label>
                              <select className="form-input" style={{ height: '32px' }}>
                                <option value="">-- Choose Doctor --</option>
                                <option value="Dr. Ananya Ray">Dr. Ananya Ray (Cardiology)</option>
                                <option value="Dr. Deepa Roy">Dr. Deepa Roy (Internal Medicine)</option>
                                <option value="Dr. Sanjay Sen">Dr. Sanjay Sen (Pediatric)</option>
                              </select>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">External Specialist (Hospitals)</label>
                              <select className="form-input" style={{ height: '32px' }}>
                                <option value="">-- Choose Hospital Partner --</option>
                                <option value="Apollo Hospitals">Apollo Cardiac Specialist Center</option>
                                <option value="Fortis Healthcare">Fortis Nephrology & Dialysis</option>
                                <option value="Max Super Specialty">Max Endocrinology Unit</option>
                              </select>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Referral Type & Urgency</label>
                              <select className="form-input" style={{ height: '32px' }}>
                                <option>Routine Consultation</option>
                                <option>Urgent Angiography Evaluation</option>
                                <option>Emergency Admission Referral</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group" style={{ marginTop: '10px' }}>
                            <label className="form-label">Clinical Referral Notes & Diagnosis Summary</label>
                            <input type="text" className="form-input" placeholder="e.g. Patient presents with unstable angina symptoms, requires immediate coronary evaluation." />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Referrals are encrypted and transmitted via secure FHIR protocols.</span>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => addToast('success', "Referral letter generated and transmitted to partner specialist successfully.")}
                            >
                              Generate Referral Letter
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {showAiPanel && (
                <div className="workspace-panel ai-sidepanel">
                  <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={16} style={{ color: 'var(--primary)' }} />
                      <h3 style={{ fontWeight: 600 }}>Clinical AI Co-pilot</h3>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary btn-icon"
                      style={{ padding: '2px', height: '24px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      title="Hide AI panel"
                      onClick={() => setShowAiPanel(false)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                <div className="workspace-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flexGrow: 1, minHeight: 0 }}>
                  {/* Section toggler */}
                  <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                    <button
                      onClick={() => setAiAnalysisType('summary')}
                      style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', background: aiAnalysisType === 'summary' ? 'var(--primary)' : 'transparent', color: aiAnalysisType === 'summary' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}
                    >
                      Summary
                    </button>
                    <button
                      onClick={() => setAiAnalysisType('prediction')}
                      style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: aiAnalysisType === 'prediction' ? 'var(--primary)' : 'transparent', color: aiAnalysisType === 'prediction' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}
                    >
                      Predictive
                    </button>
                    <button
                      onClick={() => setAiAnalysisType('diet')}
                      style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', background: aiAnalysisType === 'diet' ? 'var(--primary)' : 'transparent', color: aiAnalysisType === 'diet' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}
                    >
                      Diet
                    </button>
                  </div>

                  {/* AI Content output panels */}
                  {aiAnalysisType === 'summary' && (
                    <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="ai-helper-badge">AI Clinical Summary</div>
                      <p style={{ color: 'var(--text-muted)', lineHeight: '1.45' }}>
                        Patient is a {selectedPatient.age} year old {selectedPatient.gender.toLowerCase()} presenting with a history of {selectedPatient.medicalHistory.map(m => m.condition).join(', ') || "no chronic conditions"}.
                        Allergies include <strong>{selectedPatient.allergies.map(a => a.substance).join(', ') || "none recorded"}</strong>.
                        Current vitals show heart rate of {selectedPatient.vitals.heartRate} bpm and BP {selectedPatient.vitals.bloodPressure}.
                      </p>
                      <div style={{ backgroundColor: 'var(--bg-muted)', padding: '10px', borderRadius: '4px', borderLeft: '3px solid var(--primary)' }}>
                        <strong>AI Clinical Suggestions:</strong>
                        <ul style={{ paddingLeft: '16px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-muted)' }}>
                          <li>Verify medication reconciliation for antihypertensive medicines.</li>
                          <li>Avoid cephalosporin group if penicillin hypersensitivity was severe.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {aiAnalysisType === 'prediction' && (
                    <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="ai-helper-badge">AI Predictive Pathology Risk</div>
                      {computedPredictions.map((c, idx) => (
                        <div key={idx} style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                          <div className="flex justify-between font-semibold">
                            <span>{c.disease}</span>
                            <span className={c.level === 'high' ? 'badge badge-danger' : c.level === 'medium' ? 'badge badge-warning' : 'badge badge-success'}>
                              {c.probability}% Risk
                            </span>
                          </div>
                          <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>{c.rationale}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {aiAnalysisType === 'diet' && (
                    <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="ai-helper-badge">AI Disease-specific Nutrition Plan</div>
                      <div style={{ backgroundColor: 'rgba(22, 163, 74, 0.05)', padding: '12px', border: '1px solid rgba(22, 163, 74, 0.2)', borderRadius: '6px' }}>
                        <strong>Therapeutic Diet Directives:</strong>
                        <ul style={{ paddingLeft: '16px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text-muted)' }}>
                          <li><strong>DASH Diet Principles:</strong> Restrict sodium intake to &lt; 1,500mg/day to control hypertension.</li>
                          <li><strong>Glycemic Index Control:</strong> Emphasize complex carbohydrates (oats, brown rice) and high fiber.</li>
                          <li><strong>Cardioprotective Nutrition:</strong> Enrich omega-3 fatty acids, raw nuts, and olive oil.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* AI chatbot interface */}
                  <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', height: '180px' }}>
                    <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px', fontSize: '11px' }}>
                      {aiAssistantChat.map((chat, idx) => (
                        <div key={idx} style={{ alignSelf: chat.sender === 'ai' ? 'flex-start' : 'flex-end', backgroundColor: chat.sender === 'ai' ? 'var(--bg-muted)' : 'var(--primary)', color: chat.sender === 'ai' ? 'var(--text-main)' : 'white', padding: '8px 12px', borderRadius: '8px', maxWidth: '85%' }}>
                          {chat.text}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-sm" style={{ marginTop: '8px' }}>
                      <input
                        type="text"
                        placeholder="Ask AI assistant..."
                        className="form-input"
                        style={{ height: '30px', fontSize: '11px' }}
                        value={aiAssistantQuery}
                        onChange={(e) => setAiAssistantQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendAIChat()}
                      />
                      <button className="btn btn-primary" style={{ padding: '0 8px', height: '30px' }} onClick={handleSendAIChat}>
                        <Send size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
  );
};
