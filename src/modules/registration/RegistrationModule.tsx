import React from 'react';
import { Plus, AlertTriangle, Search, Sparkles, CheckCircle, ArrowLeft, ArrowRight, X, Send } from 'lucide-react';

export interface RegistrationModuleProps {
  [key: string]: any;
}

export const RegistrationModule: React.FC<RegistrationModuleProps> = (props) => {
  const {
    activeTab = 'registration',
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

  const [otpStatus, setOtpStatus] = React.useState('idle');
  const [documentUploads, setDocumentUploads] = React.useState<any>({});
  const [assignedDept, setAssignedDept] = React.useState('General Medicine');
  const [assignedDoctor, setAssignedDoctor] = React.useState('Dr. Sandeep Mehta');
  const [assignedSlot, setAssignedSlot] = React.useState('09:30 AM');
  const [registrationFees, setRegistrationFees] = React.useState(200);
  const [consultationFees, setConsultationFees] = React.useState(500);
  const [advanceAmount, setAdvanceAmount] = React.useState(0);
  const [quickSearchQuery, setQuickSearchQuery] = React.useState('');
  const [insuranceEligibilityChecked, setInsuranceEligibilityChecked] = React.useState<any>(false);
  const [ocrAutoFilled, setOcrAutoFilled] = React.useState(false);
  const [regType, setRegType] = React.useState('General');
  const [duplicatePatientAlert, setDuplicatePatientAlert] = React.useState<any>(null);
  const [referralSource, setReferralSource] = React.useState('Self Walk-in');
  const [corporateEmployer, setCorporateEmployer] = React.useState('');
  const [idProofType, setIdProofType] = React.useState('Aadhaar Card');
  const [idProofNumber, setIdProofNumber] = React.useState('');
  const [enteredOtp, setEnteredOtp] = React.useState('');
  const [otpSent, setOtpSent] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState('');
  const [isVerified, setIsVerified] = React.useState(false);
  const [selectedDoctor, setSelectedDoctor] = React.useState('Dr. Sandeep Mehta');
  const [regDept, setRegDept] = React.useState('Cardiology');
  const [tpaEligible, setTpaEligible] = React.useState(false);
  const [tpaProvider, setTpaProvider] = React.useState('Star Health TPA');
  const [insurancePolicyNo, setInsurancePolicyNo] = React.useState('');
  const [tpaCoverageLimit, setTpaCoverageLimit] = React.useState(300000);
  const [qrScanSimulated, setQrScanSimulated] = React.useState(false);
  const [ocrScanSimulated, setOcrScanSimulated] = React.useState(false);


  return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
              
              {/* Left Column: Form Stepper */}
              <div className="card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Integrated Hospital Registration Desk</h2>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>New admissions, ESI triage check-in, billing, and card print queues.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" className="btn btn-secondary" onClick={handleQrRegistrationScan} style={{ gap: '6px', fontSize: '12px' }}>
                      <Plus size={14} />
                      <span>Scan QR Card</span>
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleOcrScanSimulation} style={{ gap: '6px', fontSize: '12px', border: ocrAutoFilled ? '1px solid var(--success)' : '' }}>
                      <Sparkles size={14} style={{ color: ocrAutoFilled ? 'var(--success)' : '' }} />
                      <span>{ocrAutoFilled ? 'OCR Form Filled' : 'AI OCR Scan ID Card'}</span>
                    </button>
                  </div>
                </div>

                {/* Step Progress Indicators */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', padding: '16px 0', marginBottom: '20px', gap: '4px' }}>
                  <div style={{ flex: 1, padding: '8px', borderBottom: `2px solid ${regStep >= 1 ? 'var(--primary)' : 'transparent'}`, textAlign: 'center', transition: 'all 0.15s ease' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: regStep >= 1 ? 'white' : 'var(--text-muted)' }}>1. Acuity & Demographics</span>
                  </div>
                  <div style={{ flex: 1, padding: '8px', borderBottom: `2px solid ${regStep >= 2 ? 'var(--primary)' : 'transparent'}`, textAlign: 'center', transition: 'all 0.15s ease' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: regStep >= 2 ? 'white' : 'var(--text-muted)' }}>2. Identity & Documents</span>
                  </div>
                  <div style={{ flex: 1, padding: '8px', borderBottom: `2px solid ${regStep >= 3 ? 'var(--primary)' : 'transparent'}`, textAlign: 'center', transition: 'all 0.15s ease' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: regStep >= 3 ? 'white' : 'var(--text-muted)' }}>3. Assigned Clinic</span>
                  </div>
                  <div style={{ flex: 1, padding: '8px', borderBottom: `2px solid ${regStep >= 4 ? 'var(--primary)' : 'transparent'}`, textAlign: 'center', transition: 'all 0.15s ease' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: regStep >= 4 ? 'white' : 'var(--text-muted)' }}>4. Billing & Fees</span>
                  </div>
                </div>

                <form onSubmit={handleRegisterSubmit}>
                  {/* Step 1: Acuity & Demographics */}
                  {regStep === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">Registration Type</label>
                          <select
                            className="form-input"
                            value={regType}
                            onChange={(e: any) => setRegType(e.target.value)}
                          >
                            <option value="new">New Patient Registration</option>
                            <option value="walkin">Walk-in Triage</option>
                            <option value="emergency">Emergency Admit</option>
                            <option value="referral">Referral Admission</option>
                            <option value="corporate">Corporate / Employer Plan</option>
                            <option value="online">Online Pre-Registration</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">ESI Acuity Triage Level</label>
                          <select
                            className="form-input"
                            value={regForm.esiScore}
                            onChange={(e) => setRegForm({ ...regForm, esiScore: e.target.value })}
                          >
                            <option value="1">ESI-1: Resuscitation (Severe threat)</option>
                            <option value="2">ESI-2: Emergent (High risk status)</option>
                            <option value="3">ESI-3: Urgent (Stable vitals, multiple tests)</option>
                            <option value="4">ESI-4: Less Urgent (Stable, single test)</option>
                            <option value="5">ESI-5: Non-Urgent (Refills/Exam only)</option>
                          </select>
                        </div>
                      </div>

                      {duplicatePatientAlert && (
                        <div style={{ border: '1px solid var(--danger)', background: 'rgba(220,38,38,0.08)', borderRadius: '6px', padding: '12px', color: 'var(--danger)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <AlertTriangle size={18} />
                          <div style={{ flexGrow: 1 }}>
                            <strong>Duplicate Detection:</strong> A patient named <strong>{regForm.name}</strong> is already registered. If this is the same patient, click to lookup in Search widget.
                          </div>
                        </div>
                      )}

                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">Full Name <span style={{ color: 'var(--danger)' }}>*</span></label>
                          <input
                            type="text"
                            placeholder="Patient's Full Name"
                            className="form-input"
                            required
                            value={regForm.name}
                            onChange={(e) => handleRegFormNameChange(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Age <span style={{ color: 'var(--danger)' }}>*</span></label>
                          <input
                            type="number"
                            placeholder="Age"
                            className="form-input"
                            required
                            value={regForm.age}
                            onChange={(e) => setRegForm({ ...regForm, age: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Gender <span style={{ color: 'var(--danger)' }}>*</span></label>
                          <select
                            className="form-input"
                            value={regForm.gender}
                            onChange={(e) => setRegForm({ ...regForm, gender: e.target.value })}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Blood Group</label>
                          <select
                            className="form-input"
                            value={regForm.bloodGroup}
                            onChange={(e) => setRegForm({ ...regForm, bloodGroup: e.target.value })}
                          >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Mobile Number <span style={{ color: 'var(--danger)' }}>*</span></label>
                          <input
                            type="tel"
                            placeholder="+91 99999 88888"
                            className="form-input"
                            required
                            value={regForm.phone}
                            onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            placeholder="patient@email.com"
                            className="form-input"
                            value={regForm.email}
                            onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Residential Address</label>
                        <input
                          type="text"
                          placeholder="Street, City, Pincode"
                          className="form-input"
                          value={regForm.address}
                          onChange={(e) => setRegForm({ ...regForm, address: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">Emergency Contact Name</label>
                          <input
                            type="text"
                            placeholder="Spouse / Parent / Kin"
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Emergency Contact Phone</label>
                          <input
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            className="form-input"
                          />
                        </div>
                      </div>

                      {regType === 'referral' && (
                        <div className="form-group">
                          <label className="form-label">Referral Source Clinic / Practitioner Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Dr. Roy Diagnostic Center"
                            className="form-input"
                            value={referralSource}
                            onChange={(e) => setReferralSource(e.target.value)}
                          />
                        </div>
                      )}

                      {regType === 'corporate' && (
                        <div className="form-group">
                          <label className="form-label">Corporate Employer Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Tata Consultancy Services"
                            className="form-input"
                            value={corporateEmployer}
                            onChange={(e) => setCorporateEmployer(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 2: Identity & Document Verification */}
                  {regStep === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">National ID Verification Type</label>
                          <select
                            className="form-input"
                            value={idProofType}
                            onChange={(e: any) => setIdProofType(e.target.value)}
                          >
                            <option value="Aadhaar">Aadhaar (National ID)</option>
                            <option value="Passport">Passport</option>
                            <option value="None">Self-Declared (No ID Proof)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">ID Document/Aadhaar Number</label>
                          <input
                            type="text"
                            placeholder="XXXX-XXXX-XXXX"
                            className="form-input"
                            value={idProofNumber}
                            onChange={(e) => setIdProofNumber(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* OTP Verification Block */}
                      <div style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '16px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 600 }}>Two-Step OTP Security Check</span>
                          <span className={`badge ${
                            otpStatus === 'verified' ? 'badge-success' :
                            otpStatus === 'sent' ? 'badge-warning' : 'badge-muted'
                          }`}>
                            {otpStatus.toUpperCase()}
                          </span>
                        </div>
                        {otpStatus === 'idle' && (
                          <button type="button" className="btn btn-secondary" onClick={handleSendOtp} style={{ fontSize: '12px' }}>
                            Send Verification OTP (SMS)
                          </button>
                        )}
                        {otpStatus === 'sending' && (
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Generating OTP...</span>
                        )}
                        {otpStatus === 'sent' && (
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                              type="text"
                              placeholder="Enter 4-Digit OTP (e.g. 1234)"
                              className="form-input"
                              style={{ maxWidth: '200px' }}
                              value={enteredOtp}
                              onChange={(e) => setEnteredOtp(e.target.value)}
                            />
                            <button type="button" className="btn btn-primary" onClick={handleVerifyOtp}>
                              Verify
                            </button>
                          </div>
                        )}
                        {otpStatus === 'verified' && (
                          <span style={{ fontSize: '12px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CheckCircle size={14} /> Identity verified securely via SMS gateway.
                          </span>
                        )}
                      </div>

                      {/* Document uploads */}
                      <div>
                        <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Document Attachment Checksheet</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={documentUploads.idProof} onChange={(e) => setDocumentUploads({ ...documentUploads, idProof: e.target.checked })} />
                            <span style={{ fontSize: '12px' }}>Aadhaar ID Card Upload</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={documentUploads.insurance} onChange={(e) => setDocumentUploads({ ...documentUploads, insurance: e.target.checked })} />
                            <span style={{ fontSize: '12px' }}>Insurance Card Scan</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={documentUploads.referral} onChange={(e) => setDocumentUploads({ ...documentUploads, referral: e.target.checked })} />
                            <span style={{ fontSize: '12px' }}>Referral Letter (optional)</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={documentUploads.priorRecords} onChange={(e) => setDocumentUploads({ ...documentUploads, priorRecords: e.target.checked })} />
                            <span style={{ fontSize: '12px' }}>Prior Medical Records</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={documentUploads.consent} onChange={(e) => setDocumentUploads({ ...documentUploads, consent: e.target.checked })} />
                            <span style={{ fontSize: '12px' }}>Patient Consent Form Signed</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Assigned Clinic */}
                  {regStep === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">Clinical Specialty Department</label>
                          <select
                            className="form-input"
                            value={assignedDept}
                            onChange={(e) => {
                              setAssignedDept(e.target.value);
                              if (e.target.value === 'Cardiology') setAssignedDoctor('Dr. Sandeep Mehta');
                              else if (e.target.value === 'Pediatrics') setAssignedDoctor('Dr. Ananya Ray');
                              else setAssignedDoctor('Dr. Amit Roy');
                            }}
                          >
                            <option value="Cardiology">Cardiology</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Orthopaedics">Orthopaedics</option>
                            <option value="Gynaecology">Gynaecology</option>
                            <option value="Endocrinology">Endocrinology</option>
                            <option value="Pulmonology">Pulmonology</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Consulting Practitioner</label>
                          <select
                            className="form-input"
                            value={assignedDoctor}
                            onChange={(e) => setAssignedDoctor(e.target.value)}
                          >
                            <option value="Dr. Sandeep Mehta">Dr. Sandeep Mehta (Cardiology)</option>
                            <option value="Dr. Ananya Ray">Dr. Ananya Ray (Pediatrics)</option>
                            <option value="Dr. Amit Roy">Dr. Amit Roy (Orthopaedics/General)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">Choose Time Slot</label>
                          <select
                            className="form-input"
                            value={assignedSlot}
                            onChange={(e) => setAssignedSlot(e.target.value)}
                          >
                            <option value="10:30 AM">10:30 AM (Available)</option>
                            <option value="11:15 AM">11:15 AM (Available)</option>
                            <option value="12:00 PM">12:00 PM (Queue Overload)</option>
                            <option value="02:30 PM">02:30 PM (Available)</option>
                            <option value="03:15 PM">03:15 PM (Available)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Vitals Log Status</label>
                          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                            <span style={{ fontSize: '11px', padding: '6px 10px', background: 'rgba(37,99,235,0.1)', color: 'var(--primary)', borderRadius: '4px', display: 'inline-block' }}>HR: {regForm.heartRate} bpm</span>
                            <span style={{ fontSize: '11px', padding: '6px 10px', background: 'rgba(37,99,235,0.1)', color: 'var(--primary)', borderRadius: '4px', display: 'inline-block' }}>BP: {regForm.bloodPressure}</span>
                          </div>
                        </div>
                      </div>

                      {/* AI Queue Prediction Banner */}
                      <div style={{ display: 'flex', gap: '12px', border: '1px solid var(--border)', borderRadius: '6px', padding: '16px', backgroundColor: 'rgba(99,102,241,0.06)' }}>
                        <Sparkles size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>AI Queue Wait-Time Analytics</div>
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>
                            Based on active charts, <strong>{assignedDoctor}</strong> has 3 patients waiting in triage. Estimated wait time for slot <strong>{assignedSlot}</strong> is <strong>14 minutes</strong>.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Billing & Fees */}
                  {regStep === 4 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="grid grid-3">
                        <div className="form-group">
                          <label className="form-label">Registration Charge (₹)</label>
                          <input
                            type="number"
                            className="form-input"
                            value={registrationFees}
                            onChange={(e) => setRegistrationFees(parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">OPD Consultation (₹)</label>
                          <input
                            type="number"
                            className="form-input"
                            value={consultationFees}
                            onChange={(e) => setConsultationFees(parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Advance Deposit (₹)</label>
                          <input
                            type="number"
                            className="form-input"
                            value={advanceAmount}
                            onChange={(e) => setAdvanceAmount(parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">Insurance Provider / TPA Partner</label>
                          <select
                            className="form-input"
                            value={regForm.tpaProvider}
                            onChange={(e) => setRegForm({ ...regForm, tpaProvider: e.target.value })}
                          >
                            <option value="None">Self Pay (No TPA)</option>
                            <option value="Star Health Insurance">Star Health Insurance</option>
                            <option value="HDFC Ergo Health">HDFC Ergo Health</option>
                            <option value="ICICI Lombard">ICICI Lombard</option>
                            <option value="Max Bupa Health">Max Bupa Health</option>
                          </select>
                        </div>
                        {regForm.tpaProvider !== 'None' && (
                          <div className="form-group">
                            <label className="form-label">TPA Policy ID</label>
                            <input
                              type="text"
                              placeholder="e.g. STAR-8820"
                              className="form-input"
                              value={regForm.insuranceId}
                              onChange={(e) => setRegForm({ ...regForm, insuranceId: e.target.value })}
                            />
                          </div>
                        )}
                      </div>

                      {regForm.tpaProvider !== 'None' && (
                        <div style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: 600 }}>TPA Pre-Authorization Verification Gateway</div>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status query on Star Health/HDFC servers</span>
                          </div>
                          {insuranceEligibilityChecked === 'none' && (
                            <button type="button" className="btn btn-secondary" onClick={handleCheckInsuranceEligibility} style={{ fontSize: '11px' }}>
                              Check Eligibility
                            </button>
                          )}
                          {insuranceEligibilityChecked === 'checking' && (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Verifying eligibility...</span>
                          )}
                          {insuranceEligibilityChecked === 'approved' && (
                            <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>Approved (STAR Pay 90%)</span>
                          )}
                        </div>
                      )}

                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cumulative Collected Amount</span>
                          <div style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>₹{registrationFees + consultationFees + advanceAmount}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span className="badge badge-muted" style={{ padding: '6px 10px' }}>Cash/UPI</span>
                          <span className="badge badge-muted" style={{ padding: '6px 10px' }}>Receipt queue auto</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stepper Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                    {regStep > 1 ? (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setRegStep(prev => prev - 1)}
                        style={{ gap: '6px' }}
                      >
                        <ArrowLeft size={16} />
                        <span>Back</span>
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {regStep < 4 ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setRegStep(prev => prev + 1)}
                        style={{ gap: '6px' }}
                      >
                        <span>Next Step</span>
                        <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-success" style={{ gap: '6px' }}>
                        <CheckCircle size={16} />
                        <span>Complete Registration</span>
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Right Column: Search, Analytics & Quick Book */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Panel 1: Smart Patient Search & Quick Book */}
                <div className="card" style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '12px' }}>Smart Patient Search</h3>
                  
                  <div style={{ position: 'relative', marginBottom: '12px' }}>
                    <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      placeholder="Name, Phone, UHID, Aadhaar..."
                      className="form-input"
                      style={{ paddingLeft: '28px' }}
                      value={quickSearchQuery}
                      onChange={(e) => setQuickSearchQuery(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                    {patients
                      .filter(p => {
                        if (!quickSearchQuery) return false;
                        const q = quickSearchQuery.toLowerCase();
                        return p.name.toLowerCase().includes(q) || p.phone.includes(q) || p.id.toLowerCase().includes(q);
                      })
                      .map(p => (
                        <div
                          key={p.id}
                          style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                          <div>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>{p.name}</div>
                            <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{p.phone} | {p.id}</div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-ghost"
                            style={{ padding: '2px 6px', fontSize: '9px', border: '1px solid var(--border)' }}
                            onClick={() => {
                              setSelectedPatientId(p.id);
                              addToast('success', `Quick Booking active for existing patient: ${p.name}`);
                              setActiveTab('consultation');
                            }}
                          >
                            Book OPD
                          </button>
                        </div>
                      ))}
                    {quickSearchQuery && patients.filter(p => {
                      const q = quickSearchQuery.toLowerCase();
                      return p.name.toLowerCase().includes(q) || p.phone.includes(q) || p.id.toLowerCase().includes(q);
                    }).length === 0 && (
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', padding: '12px' }}>
                        No records match query. Choose "New Patient Registration".
                      </div>
                    )}
                    {!quickSearchQuery && (
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', padding: '12px' }}>
                        Type above to query active records.
                      </div>
                    )}
                  </div>
                </div>

                {/* Panel 2: Registration Analytics Dashboard */}
                <div className="card" style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '12px' }}>Daily Registration Report</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Total Registrations Today:</span>
                      <strong style={{ color: 'white' }}>18</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Walk-in Triage:</span>
                      <strong style={{ color: 'white' }}>9 (50%)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Referrals Received:</span>
                      <strong style={{ color: 'white' }}>4 (22%)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Corporate Clearances:</span>
                      <strong style={{ color: 'white' }}>3 (16%)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Emergency Admissions:</span>
                      <strong style={{ color: 'var(--danger)' }}>2 (12%)</strong>
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'white', marginBottom: '8px' }}>Dept-wise Admissions:</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>• Cardiology: 8 patients</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>• Pediatrics: 5 patients</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>• Orthopaedics: 3 patients</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>• Gynaecology: 2 patients</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
  );
};
