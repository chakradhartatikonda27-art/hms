import React from 'react';
import { Activity } from 'lucide-react';

export interface AdminModuleProps {
  [key: string]: any;
}

export const AdminModule: React.FC<AdminModuleProps> = (props) => {
  const {
    activeTab = 'admin',
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


  return (
            <div className="grid gap-lg">
              {/* Module Visibility & RBAC Admin Controls */}
              <div className="card">
                <div className="card-header">
                  <div>
                    <h2>Enterprise Role-Based Access & Visibility Panel</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>Control live workspace module access and visibility inside the hospital operating system sidebar.</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
                  {Object.entries(moduleVisibility).map(([key, val]) => (
                    <div
                      key={key}
                      style={{
                        padding: '12px',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        backgroundColor: val ? 'rgba(37,99,235,0.02)' : 'rgba(255,255,255,0.01)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px', textTransform: 'capitalize' }}>
                          {key === 'bloodbank' ? 'Inventory' : key === 'consultation' ? 'OPD consultation' : key}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {val ? 'Enabled in Sidebar' : 'Hidden from Sidebar'}
                        </div>
                      </div>
                      <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '38px', height: '22px' }}>
                        <input
                          type="checkbox"
                          checked={Boolean(val)}
                          onChange={(e) => {
                            setModuleVisibility(prev => {
                              const updated = { ...prev, [key]: e.target.checked };
                              addToast('warning', `Admin Visibility Override: ${key.toUpperCase()} module is now ${e.target.checked ? 'VISIBLE' : 'HIDDEN'}`);
                              return updated;
                            });
                          }}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0, left: 0, right: 0, bottom: 0,
                          backgroundColor: val ? 'var(--primary)' : '#334155',
                          transition: '.2s',
                          borderRadius: '34px'
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '""',
                            height: '16px', width: '16px',
                            left: val ? '18px' : '4px', bottom: '3px',
                            backgroundColor: 'white',
                            transition: '.2s',
                            borderRadius: '50%'
                          }}></span>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Employee management HR payroll */}
              <div className="card">
                <div className="card-header">
                  <h2>Employee Management, Leave Tracker & Payroll</h2>
                  <button type="button" className="btn btn-primary" onClick={handleRunPayroll}>
                    Disburse Monthly Payroll
                  </button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginTop: '16px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: 'var(--bg-muted)' }}>
                      <th style={{ padding: '10px 16px' }}>Employee Name</th>
                      <th style={{ padding: '10px 16px' }}>Designation</th>
                      <th style={{ padding: '10px 16px' }}>Department</th>
                      <th style={{ padding: '10px 16px' }}>Monthly Salary</th>
                      <th style={{ padding: '10px 16px' }}>Leave Balance</th>
                      <th style={{ padding: '10px 16px' }}>Work Status</th>
                      <th style={{ padding: '10px 16px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(emp => (
                      <tr key={emp.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '10px 16px', fontWeight: 600 }}>{emp.name}</td>
                        <td style={{ padding: '10px 16px' }}>{emp.role}</td>
                        <td style={{ padding: '10px 16px' }}>{emp.department}</td>
                        <td style={{ padding: '10px 16px' }}>₹{emp.salary.toLocaleString()}</td>
                        <td style={{ padding: '10px 16px' }}>{emp.leaveBalance} days</td>
                        <td style={{ padding: '10px 16px' }}>
                          <span className={`badge ${emp.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                            {emp.status}
                          </span>
                        </td>
                        <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                          {emp.status === 'active' ? (
                            <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => handleApproveLeave(emp.id)}>
                              Approve Leave (1d)
                            </button>
                          ) : (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>On Leave</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* System audits */}
              <div className="card">
                <h2>Clinical & Administrative Activity Audit Log</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>Real-time compliance activity ledger in compliance with regulatory healthcare directives.</p>
                
                <div className="table-container" style={{ marginTop: '20px' }}>
                  <div className="data-table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Timestamp</th>
                          <th>Operator</th>
                          <th>Role Group</th>
                          <th>Activity Action</th>
                          <th>Clinical Module</th>
                          <th>Execution Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {audits.map(log => (
                          <tr key={log.id}>
                            <td style={{ color: 'var(--text-muted)' }}>{log.timestamp}</td>
                            <td className="font-semibold">{log.user}</td>
                            <td><span className="badge badge-muted">{log.role}</span></td>
                            <td><strong>{log.action}</strong></td>
                            <td>{log.module}</td>
                            <td style={{ color: 'var(--text-muted)' }}>{log.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
  );
};
