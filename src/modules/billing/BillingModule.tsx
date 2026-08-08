import React from 'react';


export interface BillingModuleProps {
  [key: string]: any;
}

export const BillingModule: React.FC<BillingModuleProps> = (props) => {
  const {
    activeTab = 'billing',
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

  const [expCategory, setExpCategory] = React.useState('Medical Supplies');
  const [expAmount, setExpAmount] = React.useState('');
  const [expDesc, setExpDesc] = React.useState('');


  return (
            <div className="grid gap-lg" style={{ gridTemplateColumns: '2.5fr 1.2fr' }}>
              <div className="flex flex-col gap-lg">
                {/* Active claims queue */}
                <div className="card">
                  <div className="card-header">
                    <h2>Revenue Desk & Invoice Clearance Workspace</h2>
                    <span className="badge badge-danger">Unsettled accounts</span>
                  </div>

                  <div className="table-container" style={{ marginTop: '16px' }}>
                    <div className="data-table-wrapper">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Patient Name</th>
                            <th>Insurance Provider</th>
                            <th>Claim Coverage Status</th>
                            <th>Invoice Sum</th>
                            <th>Outstanding balance</th>
                            <th style={{ textAlign: 'right' }}>Clearance Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {branchPatients.filter(p => p.pendingBill > 0).map(p => (
                            <tr key={p.id}>
                              <td className="font-semibold">{p.name}</td>
                              <td>{p.tpaProvider}</td>
                              <td>
                                {p.tpaProvider !== 'None' ? (
                                  <span className="badge badge-success">Pre-auth approved (90%)</span>
                                ) : (
                                  <span className="badge badge-muted">Direct Cash Pay</span>
                                )}
                              </td>
                              <td>₹{p.totalBill.toLocaleString()}</td>
                              <td style={{ color: 'var(--danger)', fontWeight: 600 }}>₹{p.pendingBill.toLocaleString()}</td>
                              <td style={{ textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                {p.tpaProvider !== 'None' && (
                                  <button
                                    className="btn btn-secondary"
                                    style={{ padding: '4px 10px', fontSize: '11px' }}
                                    onClick={() => handleSettleBill(p.id, true)}
                                  >
                                    Claim Insurance
                                  </button>
                                )}
                                <button
                                  className="btn btn-primary"
                                  style={{ padding: '4px 10px', fontSize: '11px' }}
                                  onClick={() => handleSettleBill(p.id, false)}
                                >
                                  Settle Cash Pay
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Referral sharing splits ledger */}
                <div className="card">
                  <div className="card-header">
                    <h2>Referring Doctor Commission Splits & Revenue Shares</h2>
                    <span className="badge badge-muted">Clinical referrals ledger</span>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginTop: '12px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: 'var(--bg-muted)' }}>
                        <th style={{ padding: '8px 12px' }}>Patient</th>
                        <th style={{ padding: '8px 12px' }}>Investigation Test</th>
                        <th style={{ padding: '8px 12px' }}>Referring Physician</th>
                        <th style={{ padding: '8px 12px' }}>Share %</th>
                        <th style={{ padding: '8px 12px' }}>Commission Value</th>
                        <th style={{ padding: '8px 12px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branchPatients.flatMap(p => p.labResults.filter(l => l.status === 'completed' && l.refDoctorShare && l.refDoctorShare > 0).map(l => ({ ...l, patientName: p.name }))).map((lab, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '8px 12px', fontWeight: 600 }}>{lab.patientName}</td>
                          <td style={{ padding: '8px 12px' }}>{lab.testName}</td>
                          <td style={{ padding: '8px 12px' }}>Dr. Sandeep Mehta</td>
                          <td style={{ padding: '8px 12px' }}>{lab.refDoctorShare}%</td>
                          <td style={{ padding: '8px 12px', fontWeight: 600 }}>₹{Math.round(1500 * ((lab.refDoctorShare || 0) / 100))}</td>
                          <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                            <button className="btn btn-secondary" style={{ padding: '3px 8px', fontSize: '10px' }} onClick={() => handleSettleReferralPayout(lab.id, lab.testName, "Dr. Sandeep Mehta", lab.refDoctorShare || 0, 1500)}>
                              Disburse Share
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right column: Simplified Expense Capture */}
              <div className="flex flex-col gap-lg">
                <div className="card">
                  <h2>Capture Operational Expense</h2>
                  <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Expense Category</label>
                      <select className="form-input" value={expCategory} onChange={(e) => setExpCategory(e.target.value)}>
                        <option value="Pharmacy Stock">Pharmacy Stock</option>
                        <option value="Lab Supplies">Lab Supplies</option>
                        <option value="ICU Oxygen / Medical Gas">ICU Oxygen / Medical Gas</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Hospital Maintenance">Hospital Maintenance</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Amount (₹)</label>
                      <input
                        type="number"
                        placeholder="e.g. 12000"
                        className="form-input"
                        required
                        value={expAmount}
                        onChange={(e) => setExpAmount(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Payment Description</label>
                      <textarea
                        rows={2}
                        placeholder="Describe invoice/receipt details..."
                        className="form-input"
                        required
                        value={expDesc}
                        onChange={(e) => setExpDesc(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      Log Expense
                    </button>
                  </form>
                </div>

                <div className="card" style={{ flexGrow: 1 }}>
                  <h2>Recent Expenses</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', maxHeight: '200px', overflowY: 'auto' }}>
                    {branchExpenses.map(e => (
                      <div key={e.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                        <div className="flex justify-between text-xs" style={{ fontWeight: 600 }}>
                          <span>{e.category}</span>
                          <span style={{ color: 'var(--danger)' }}>₹{e.amount}</span>
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{e.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
  );
};
