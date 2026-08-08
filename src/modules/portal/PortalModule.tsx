import React from 'react';


export interface PortalModuleProps {
  [key: string]: any;
}

export const PortalModule: React.FC<PortalModuleProps> = (props) => {
  const {
    activeTab = 'portal',
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


  return (
            <div className="grid gap-lg" style={{ gridTemplateColumns: '2fr 1fr' }}>
              <div className="flex flex-col gap-lg">
                {/* Health Overview */}
                <div className="card">
                  <h2>Welcome back, Aarav Sharma</h2>
                  <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Your medical health records dashboard.</p>
                  
                  <div className="grid grid-3" style={{ marginTop: '20px' }}>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Active Prescriptions</span>
                      <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--primary)' }}>1 Medication</div>
                    </div>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Latest Test Results</span>
                      <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>Lipid Profile</div>
                    </div>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Linked ICD Code</span>
                      <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px', color: 'var(--warning)', fontFamily: 'monospace' }}>I10 Hypertension</div>
                    </div>
                  </div>
                </div>

                {/* Health record details */}
                <div className="card">
                  <h2>My Prescriptions & Reports</h2>
                  <div className="table-container" style={{ marginTop: '16px' }}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Medication</th>
                          <th>Dosage</th>
                          <th>Frequency</th>
                          <th>Duration</th>
                          <th>Instructions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patients[0].prescriptions.map(p => (
                          <tr key={p.id}>
                            <td className="font-semibold">{p.medication}</td>
                            <td>{p.dosage}</td>
                            <td>{p.frequency}</td>
                            <td>{p.duration}</td>
                            <td style={{ color: 'var(--text-muted)' }}>{p.instructions}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right column: Patient Portal Wellness companion chat */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header">
                  <h2>AI Wellness Companion</h2>
                  <span className="badge badge-success">Online AI</span>
                </div>
                <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px 0', fontSize: '11px' }}>
                  <div style={{ alignSelf: 'flex-start', backgroundColor: 'var(--bg-muted)', padding: '8px 12px', borderRadius: '8px' }}>
                    Hi Aarav, how can I assist you with your health today? I can help clarify prescription instructions or diet directions.
                  </div>
                </div>
                <div className="flex gap-sm">
                  <input
                    type="text"
                    placeholder="Ask about diet or medicines..."
                    className="form-input"
                    style={{ height: '32px', fontSize: '11px' }}
                  />
                  <button className="btn btn-primary" style={{ padding: '0 12px', height: '32px' }} onClick={() => addToast('info', "AI Wellness companion is processing...")}>
                    Send
                  </button>
                </div>
              </div>
            </div>
  );
};
