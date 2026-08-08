import React from 'react';


export interface VaccinationModuleProps {
  [key: string]: any;
}

export const VaccinationModule: React.FC<VaccinationModuleProps> = (props) => {
  const {
    activeTab = 'vaccination',
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


  return (
            <div className="grid gap-lg">
              <div className="card">
                <div className="card-header">
                  <h2>Vaccine Stock Registry & Immunization Log</h2>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      addToast('success', "Dispatched vaccine inventory order request to central storage.");
                    }}
                  >
                    Request Stocks
                  </button>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>Childhood and adult immunization schedules, cold chain storage audits, and manufacturer logs.</p>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginTop: '20px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: 'var(--bg-muted)' }}>
                      <th style={{ padding: '10px 16px' }}>Vaccine Name</th>
                      <th style={{ padding: '10px 16px' }}>Batch Code</th>
                      <th style={{ padding: '10px 16px' }}>Units Available</th>
                      <th style={{ padding: '10px 16px' }}>Manufacturer</th>
                      <th style={{ padding: '10px 16px' }}>Eligible Age</th>
                      <th style={{ padding: '10px 16px' }}>Stock Alert</th>
                      <th style={{ padding: '10px 16px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccineStock.map((v, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '12px 16px', fontWeight: 600 }}>{v.name}</td>
                        <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>{v.batchNo}</td>
                        <td style={{ padding: '12px 16px', fontWeight: 600 }}>{v.units} vials</td>
                        <td style={{ padding: '12px 16px' }}>{v.manufacturer}</td>
                        <td style={{ padding: '12px 16px' }}>{v.minAgeWeeks === 0 ? "At birth" : `${v.minAgeWeeks / 4} months`}</td>
                        <td>
                          <span className={`badge ${v.status === 'instock' ? 'badge-success' : 'badge-danger'}`}>
                            {v.status === 'instock' ? "In Stock" : "Reorder Needed"}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                            onClick={() => {
                              setVaccineStock(prev => prev.map(vac => vac.name === v.name ? { ...vac, units: vac.units - 1 } : vac));
                              addToast('success', `Dispensed 1 dose vial of ${v.name}`);
                            }}
                            disabled={v.units <= 0}
                          >
                            Dispense Vial
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
  );
};
