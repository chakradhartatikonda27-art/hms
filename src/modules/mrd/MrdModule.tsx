import React from 'react';
import { Search } from 'lucide-react';

export interface MrdModuleProps {
  [key: string]: any;
}

export const MrdModule: React.FC<MrdModuleProps> = (props) => {
  const {
    activeTab = 'mrd',
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
    handleLabResultSubmit = () => {},
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

  const [mrdSearchTerm, setMrdSearchTerm] = React.useState('');
  const ICD_DISEASE_DB: any[] = [
    { code: 'I10', name: 'Essential Hypertension', chapter: 'Circulatory' },
    { code: 'E11', name: 'Type 2 Diabetes Mellitus', chapter: 'Endocrine' },
    { code: 'J45', name: 'Asthma', chapter: 'Respiratory' }
  ];


  return (
            <div className="grid gap-lg" style={{ gridTemplateColumns: '1.8fr 1.2fr' }}>
              <div className="card">
                <h2>Clinical Disease Coding (ICD-10 & ICD-11 Classifications)</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>Search and link WHO ICD codes to active patient profiles to ensure billing & insurance validity.</p>

                <div className="flex gap-sm" style={{ marginTop: '16px' }}>
                  <input
                    type="text"
                    placeholder="Search ICD database (e.g. Asthma, diabetes)..."
                    className="form-input"
                    value={mrdSearchTerm}
                    onChange={(e) => setMrdSearchTerm(e.target.value)}
                  />
                </div>

                {/* ICD results database */}
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {ICD_DISEASE_DB.filter(d => d.title.toLowerCase().includes(mrdSearchTerm.toLowerCase()) || d.code.toLowerCase().includes(mrdSearchTerm.toLowerCase())).map((icd, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedIcdCode(`${icd.code} (${icd.title})`);
                        addToast('info', `Selected ICD code: ${icd.code}`);
                      }}
                      style={{
                        padding: '12px',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: selectedIcdCode.includes(icd.code) ? 'rgba(37,99,235,0.05)' : 'var(--bg-card)',
                        borderColor: selectedIcdCode.includes(icd.code) ? 'var(--primary)' : 'var(--border)'
                      }}
                    >
                      <div className="flex justify-between font-semibold">
                        <span style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>{icd.code}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{icd.chapter}</span>
                      </div>
                      <div style={{ fontSize: '13px', marginTop: '4px' }}>{icd.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settle ICD link to patient */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h2>Link Code to Patient Profile</h2>
                <div style={{ backgroundColor: 'var(--bg-muted)', padding: '12px', borderRadius: '6px', fontSize: '12px' }}>
                  <strong>Selected Code:</strong>
                  <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '14px', marginTop: '4px', fontFamily: 'monospace' }}>
                    {selectedIcdCode || 'No code selected'}
                  </div>
                </div>

                <form onSubmit={handleAssignMrdCode} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Patient Target</label>
                    <select
                      className="form-input"
                      value={selectedPatientId}
                      onChange={(e) => setSelectedPatientId(e.target.value)}
                    >
                      {branchPatients.map(p => (
                        <option key={p.id} value={p.id}>{p.name} (ID: {p.id})</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={!selectedIcdCode} style={{ width: '100%' }}>
                    Commit Link to Medical Record
                  </button>
                </form>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: 'auto', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <strong>Clinical Audit Checks:</strong>
                  <ul style={{ paddingLeft: '16px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li>All diagnosis assignments trigger clinical log entries.</li>
                    <li>Insurance claims require valid ICD-10/11 links.</li>
                  </ul>
                </div>
              </div>
            </div>
  );
};
