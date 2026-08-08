import React from 'react';
import { Bed } from 'lucide-react';

export interface IcuModuleProps {
  [key: string]: any;
}

export const IcuModule: React.FC<IcuModuleProps> = (props) => {
  const {
    activeTab = 'icu',
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

  const [icuSubTab, setIcuSubTab] = React.useState('telemetry');
  const [showCodeBlueModal, setShowCodeBlueModal] = React.useState(false);
  const [showAdmissionModal, setShowAdmissionModal] = React.useState(false);
  const [newHandoverBed, setNewHandoverBed] = React.useState('ICU Bed 1');
  const [newHandoverText, setNewHandoverText] = React.useState('');
  const [icuHandovers, setIcuHandovers] = React.useState<any[]>([]);
  const [codeBlueLogs, setCodeBlueLogs] = React.useState<any[]>([]);
  const [hourlyLogs, setHourlyLogs] = React.useState<any[]>([]);
  const [icuBeds, setIcuBeds] = React.useState<any[]>([]);
  const [showIcuDischargeModal, setShowIcuDischargeModal] = React.useState(false);
  const [showIcuConsentModal, setShowIcuConsentModal] = React.useState(false);


  return (
            <div className="flex flex-col gap-lg" style={{ width: '100%' }}>
              {/* ICU Header Banner */}
              <div className="card">
                <div className="card-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>🏥 ICU Command Center</span>
                      <span className="badge badge-danger">Level-3 Critical Care</span>
                    </h2>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Real-time telemetry, ventilator controls & 1-click nursing logs.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" className="btn btn-secondary" style={{ fontSize: '11px', padding: '6px 12px', color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => addToast('danger', '🚨 CODE BLUE LOGGED: Resuscitation Team Dispatched!')}>
                      🚨 Code Blue Log
                    </button>
                    <button type="button" className="btn btn-primary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowAdmissionModal(true)}>
                      ➕ ICU Admission
                    </button>
                  </div>
                </div>

                {/* Sub-tabs Navigation */}
                <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', marginTop: '12px', flexWrap: 'wrap' }}>
                  <button onClick={() => setIcuSubTab('whiteboard')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', background: icuSubTab === 'whiteboard' ? 'var(--primary)' : 'transparent', color: icuSubTab === 'whiteboard' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🖥️ Beds Grid & Telemetry
                  </button>
                  <button onClick={() => setIcuSubTab('handover')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: icuSubTab === 'handover' ? 'var(--primary)' : 'transparent', color: icuSubTab === 'handover' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    📋 Shift Handover
                  </button>
                  <button onClick={() => setIcuSubTab('hourly')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: icuSubTab === 'hourly' ? 'var(--primary)' : 'transparent', color: icuSubTab === 'hourly' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    ⏱️ Hourly Chart
                  </button>
                  <button onClick={() => setIcuSubTab('orders_docs')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: icuSubTab === 'orders_docs' ? 'var(--primary)' : 'transparent', color: icuSubTab === 'orders_docs' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    💊 Orders & Documentation
                  </button>
                  <button onClick={() => setIcuSubTab('reports')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: icuSubTab === 'reports' ? 'var(--primary)' : 'transparent', color: icuSubTab === 'reports' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    📊 Analytics & Reports
                  </button>
                  <button onClick={() => setIcuSubTab('ai')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', background: icuSubTab === 'ai' ? 'var(--primary)' : 'transparent', color: icuSubTab === 'ai' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🤖 AI Risk & Deterioration
                  </button>
                </div>

                {/* Emergency STAT Orders Bar */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', backgroundColor: 'rgba(239, 68, 68, 0.05)', padding: '8px 12px', borderRadius: '6px', alignItems: 'center' }}>
                  <strong style={{ fontSize: '11px', color: 'var(--danger)' }}>🚨 STAT Orders:</strong>
                  <button type="button" className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '10px' }} onClick={() => {
                    setIcuBeds(prev => prev.map((bed, idx) => idx === 0 ? { ...bed, statOrdersCount: bed.statOrdersCount + 1, drips: bed.drips + ' | STAT Adrenaline 1mg' } : bed));
                    addToast('warning', 'STAT Order: Pushed 1mg IV Adrenaline dynamically!');
                  }}>💉 Adrenaline 1mg</button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '10px' }} onClick={() => addToast('warning', 'STAT Order: Requested 1 Unit PRBC Blood.')}>🩸 Blood PRBC</button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '10px' }} onClick={() => addToast('warning', 'STAT Order: Ordered STAT ABG Blood Gas.')}>🫁 STAT ABG</button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '10px' }} onClick={() => addToast('warning', 'STAT Order: Ordered Portable Chest X-Ray.')}>🩻 Chest X-Ray</button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '10px', marginLeft: 'auto' }} onClick={() => setShowCodeBlueModal(true)}>🚨 Code Blue Audit Log</button>
                </div>
              </div>

              {/* SUB-TAB 1: BEDS GRID & TELEMETRY */}
              {icuSubTab === 'whiteboard' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Digital ICU Whiteboard Table */}
                  <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>🖥️ Live ICU Whiteboard</h3>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Occupancy: {icuBeds.length} Active Patients</span>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: 'var(--bg-muted)' }}>
                          <th style={{ padding: '8px 10px' }}>Bed #</th>
                          <th style={{ padding: '8px 10px' }}>Patient Name</th>
                          <th style={{ padding: '8px 10px' }}>Status</th>
                          <th style={{ padding: '8px 10px' }}>Consultant</th>
                          <th style={{ padding: '8px 10px' }}>Duty Nurse</th>
                          <th style={{ padding: '8px 10px' }}>Ventilator</th>
                          <th style={{ padding: '8px 10px' }}>STAT Orders</th>
                          <th style={{ padding: '8px 10px', textAlign: 'right' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {icuBeds.map((bed) => (
                          <tr key={bed.id} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '8px 10px' }}><span className="badge badge-primary">{bed.bedNo}</span></td>
                            <td style={{ padding: '8px 10px', fontWeight: 600 }}>{bed.patientName} <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>({bed.id})</span></td>
                            <td style={{ padding: '8px 10px' }}>
                              <span className={`badge ${bed.acuityStatus === 'stable' ? 'badge-success' : bed.acuityStatus === 'observation' ? 'badge-warning' : 'badge-danger'}`}>
                                {bed.acuityStatus === 'stable' ? '🟢 Stable' : bed.acuityStatus === 'observation' ? '🟡 Observation' : '🔴 Critical'}
                              </span>
                            </td>
                            <td style={{ padding: '8px 10px' }}>{bed.consultant}</td>
                            <td style={{ padding: '8px 10px' }}>{bed.dutyNurse}</td>
                            <td style={{ padding: '8px 10px' }}>{bed.ventilatorStatus}</td>
                            <td style={{ padding: '8px 10px' }}><span className="badge badge-warning">{bed.statOrdersCount} Orders</span></td>
                            <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                              <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => { setSelectedIcuBedId(bed.id); addToast('info', `Swapped focus to ${bed.patientName} (${bed.bedNo})`); }}>Inspect</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Dynamic Visual Telemetry Tiles */}
                  <div className="grid grid-2" style={{ gap: '16px' }}>
                    {icuBeds.map((bed) => (
                      <div key={bed.id} className="card" style={{ borderLeft: `4px solid ${bed.acuityStatus === 'stable' ? 'var(--success)' : bed.acuityStatus === 'observation' ? 'var(--warning)' : 'var(--danger)'}`, padding: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                          <div>
                            <strong style={{ fontSize: '13px' }}>{bed.patientName}</strong> ({bed.id})
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Bed: <strong>{bed.bedNo} ({bed.unit})</strong> | {bed.consultant}</div>
                          </div>
                          <span className={`badge ${bed.acuityStatus === 'stable' ? 'badge-success' : bed.acuityStatus === 'observation' ? 'badge-warning' : 'badge-danger'}`}>
                            {bed.acuityStatus === 'stable' ? '🟢 Stable' : bed.acuityStatus === 'observation' ? '🟡 Observation' : '🔴 Critical'}
                          </span>
                        </div>

                        <div className="grid grid-2" style={{ gap: '8px', marginTop: '10px' }}>
                          <div style={{ padding: '6px 8px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '4px' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>BP / MAP</span>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--danger)' }}>{bed.bp} (MAP {bed.map})</div>
                          </div>
                          <div style={{ padding: '6px 8px', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '4px' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>CVP</span>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>{bed.cvp}</div>
                          </div>
                          <div style={{ padding: '6px 8px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '4px' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Ventilator</span>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--success)' }}>{bed.ventilatorStatus}</div>
                          </div>
                          <div style={{ padding: '6px 8px', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '4px' }}>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Drips</span>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--warning)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{bed.drips}</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '10px' }}>
                          <button className="btn btn-secondary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => addToast('info', `ABG for ${bed.patientName}: pH ${bed.abgPh} | PaCO2 ${bed.abgPaCO2} | PaO2 ${bed.abgPaO2}`)}>📄 ABG Log</button>
                          <button className="btn btn-success" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => { setSelectedIcuBedId(bed.id); setShowIcuDischargeModal(true); }}>🔄 Step-Down Summary</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: SHIFT HANDOVER */}
              {icuSubTab === 'handover' && (
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>📋 Dynamic Nursing Shift Handover Log</h3>
                    
                    {/* Add Handover Note Input Form */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px', padding: '10px', background: 'var(--bg-muted)', borderRadius: '6px' }}>
                      <strong style={{ fontSize: '10px' }}>➕ Add Live Shift Handover Note</strong>
                      <select style={{ fontSize: '11px', padding: '4px', borderRadius: '4px', border: '1px solid var(--border)' }} value={newHandoverBed} onChange={(e) => setNewHandoverBed(e.target.value)}>
                        {icuBeds.map(b => (
                          <option key={b.id} value={`${b.bedNo} (${b.patientName})`}>{b.bedNo} - {b.patientName}</option>
                        ))}
                      </select>
                      <input type="text" placeholder="Enter clinical handover notes..." style={{ fontSize: '11px', padding: '6px', borderRadius: '4px', border: '1px solid var(--border)' }} value={newHandoverText} onChange={(e) => setNewHandoverText(e.target.value)} />
                      <button className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '10px', alignSelf: 'flex-end' }} onClick={() => {
                        if (newHandoverText.trim()) {
                          setIcuHandovers(prev => [...prev, { id: prev.length + 1, author: 'Sister Priya → Duty Shift', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), bed: newHandoverBed, text: newHandoverText }]);
                          setNewHandoverText('');
                          addToast('success', 'Dynamic Handover note added live!');
                        }
                      }}>Post Handover</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', fontSize: '11px' }}>
                      {icuHandovers.map(item => (
                        <div key={item.id} style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                          <strong>{item.author}</strong> <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>({item.time})</span>
                          <div style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 600 }}>{item.bed}</div>
                          <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>"{item.text}"</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>💬 Family Counseling & Resuscitation Log</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '11px' }}>
                      <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                        <strong>Family Attendant Briefing</strong> (09:45 AM)
                        <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>Counselled spouse on post-op CABG recovery. Extubation expected in 24h.</div>
                      </div>
                      {codeBlueLogs.map(log => (
                        <div key={log.id} style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.05)' }}>
                          <strong style={{ color: 'var(--danger)' }}>Code Blue Event Audit ({log.bed})</strong> ({log.time})
                          <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>CPR: {log.cpr} | Defibrillation: {log.shocks} | Result: {log.result}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: HOURLY CHART */}
              {icuSubTab === 'hourly' && (
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>⏱️ Dynamic 1-Click Hourly Chart</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '11px' }}>
                      {hourlyLogs.map((log) => (
                        <div key={log.id} className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                          <span>{log.time}: MAP {log.map} | CVP {log.cvp} | Urine {log.urine}</span>
                          <span className="badge badge-success">{log.status}</span>
                        </div>
                      ))}
                      <div className="flex justify-between align-center" style={{ marginTop: '6px' }}>
                        <span>Next Hourly Vitals Charting</span>
                        <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                          setHourlyLogs(prev => [...prev, { id: prev.length + 1, time: `${10 + prev.length}:00 AM`, map: Math.floor(92 + Math.random() * 12), cvp: +(7.5 + Math.random() * 2).toFixed(1), urine: `${Math.floor(35 + Math.random() * 20)}mL`, status: 'Logged' }]);
                          addToast('success', 'Logged new hourly vitals chart dynamically!');
                        }}>Log Hourly Vitals</button>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>📋 Smart Task Checklist</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px', fontSize: '11px' }}>
                      <label className="flex align-center gap-sm"><input type="checkbox" defaultChecked /> Arterial line flush & zeroing</label>
                      <label className="flex align-center gap-sm"><input type="checkbox" defaultChecked /> Check ETT tube depth (22cm)</label>
                      <label className="flex align-center gap-sm"><input type="checkbox" /> Draw 12:00 PM ABG blood gas</label>
                      <label className="flex align-center gap-sm"><input type="checkbox" /> IV Ceftriaxone 1g infusion @ 12:00</label>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: ORDERS & DOCUMENTATION */}
              {icuSubTab === 'orders_docs' && (
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>💊 High-Risk ICU Medication Orders & Drips</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '11px' }}>
                      <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                        <strong>Noradrenaline IV Infusion</strong> <span className="badge badge-warning">High Risk</span>
                        <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>Rate: 0.04 mcg/kg/min | Target MAP &gt; 65 mmHg</div>
                      </div>
                      <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                        <strong>Propofol 1% Sedation Drip</strong> <span className="badge badge-primary">Active</span>
                        <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>Rate: 15 mL/hr | Target RASS: -2 to -1</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                        <button className="btn btn-primary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => addToast('info', 'Opening ICU Medication Order Form')}>➕ New ICU Order</button>
                        <button className="btn btn-secondary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => setShowIcuConsentModal(true)}>✍️ Digital Consent</button>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>🩻 Bedside Procedure & Investigation Orders</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '11px' }}>
                      <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                        <span>Bedside Echocardiogram (STAT)</span>
                        <span className="badge badge-success">Completed</span>
                      </div>
                      <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                        <span>Arterial Blood Gas (ABG 12:00)</span>
                        <span className="badge badge-warning">In Progress</span>
                      </div>
                      <div className="flex justify-between align-center">
                        <span>Portable Chest X-Ray (AP View)</span>
                        <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('warning', 'STAT Portable X-Ray Dispatched')}>Dispatch</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 5: ANALYTICS & REPORTS */}
              {icuSubTab === 'reports' && (
                <div className="grid grid-4" style={{ gap: '12px' }}>
                  <div className="card" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>ICU Occupancy Rate</span>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--danger)', margin: '4px 0' }}>100%</h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>6/6 Beds Occupied</span>
                  </div>
                  <div className="card" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Avg Length of Stay (ALOS)</span>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary)', margin: '4px 0' }}>4.2 Days</h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Target: &lt; 5.0 Days</span>
                  </div>
                  <div className="card" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>ICU Mortality Rate</span>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--success)', margin: '4px 0' }}>2.1%</h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Benchmark: &lt; 4.5%</span>
                  </div>
                  <div className="card" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>30-Day Readmission Rate</span>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--success)', margin: '4px 0' }}>0.8%</h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Benchmark: &lt; 2.0%</span>
                  </div>
                </div>
              )}

              {/* SUB-TAB 6: AI DETERIORATION */}
              {icuSubTab === 'ai' && (
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div className="card" style={{ background: 'rgba(37, 99, 235, 0.03)' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>🤖 AI Risk Score & APACHE-II</h3>
                    <div style={{ marginTop: '10px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ padding: '10px', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>APACHE-II Score</div>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--warning)' }}>18 (12.4% Mortality Risk)</div>
                      </div>
                      <div>• <strong>AI Step-down Readiness:</strong> <strong style={{ color: 'var(--success)' }}>92% Ready</strong></div>
                    </div>
                  </div>

                  <div className="card" style={{ background: 'rgba(239, 68, 68, 0.03)' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--danger)' }}>⚠️ AI Early Warning Alerts</h3>
                    <div style={{ marginTop: '10px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        <strong style={{ color: 'var(--danger)' }}>• Oxygenation Alert:</strong> AI predicts 15% drop in PaO2/FiO2 ratio over next 4 hours based on PEEP trend.
                      </div>
                      <div style={{ padding: '10px', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                        <strong style={{ color: 'var(--success)' }}>• Vasopressor Weaning Insight:</strong>
                        <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>MAP has remained &gt; 85 mmHg for 6 hours. AI suggests weaning Noradrenaline by 0.01 mcg/kg/min.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CODE BLUE RESUSCITATION MODAL */}
              {showCodeBlueModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--danger)' }}>🚨 Code Blue Resuscitation Event Audit Log</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowCodeBlueModal(false)}>✕</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', fontSize: '11px' }}>
                      <div><strong>Bed Number:</strong> ICU-A2 (Aarav Sharma)</div>
                      <div><strong>CPR Duration:</strong> 2 minutes 30 seconds</div>
                      <div><strong>Defibrillation Shocks:</strong> 1 Shock @ 200 Joules Biphasic</div>
                      <div><strong>STAT Medications Pushed:</strong> Adrenaline 1mg IV, Atropine 0.6mg IV</div>
                      <div><strong>ROSC Status:</strong> <span className="badge badge-success">ROSC Restored Successfully</span></div>
                      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '11px' }} onClick={() => setShowCodeBlueModal(false)}>Close</button>
                        <button className="btn btn-primary" style={{ fontSize: '11px' }} onClick={() => {
                          setCodeBlueLogs(prev => [...prev, { id: prev.length + 1, bed: 'ICU-A2 (Aarav Sharma)', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), cpr: '2 min 30 sec', shocks: '1 shock 200J', result: 'ROSC Restored Successfully' }]);
                          addToast('danger', 'Code Blue Resuscitation Audit Event Saved Dynamically!');
                          setShowCodeBlueModal(false);
                        }}>Save Audit Record</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ICU DISCHARGE & STEP-DOWN SUMMARY MODAL */}
              {showIcuDischargeModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--success)' }}>🔄 ICU Step-Down Discharge Summary</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowIcuDischargeModal(false)}>✕</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', fontSize: '11px' }}>
                      <div><strong>Selected Patient:</strong> {icuBeds.find(b => b.id === selectedIcuBedId)?.patientName || 'Aarav Sharma'} ({selectedIcuBedId})</div>
                      <div><strong>Source Unit:</strong> {icuBeds.find(b => b.id === selectedIcuBedId)?.bedNo || 'ICU-A2'} &rarr; <strong>Target Unit:</strong> IPD Ward Bed 302</div>
                      <div><strong>ICU Course Summary:</strong> Successfully extubated. Vasopressors completely tapered. Hemodynamically stable for step-down.</div>
                      <div><strong>Handover Instructions:</strong> Continue oral medications. Vital signs monitoring 4-hourly in ward.</div>
                      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '11px' }} onClick={() => setShowIcuDischargeModal(false)}>Cancel</button>
                        <button className="btn btn-success" style={{ fontSize: '11px' }} onClick={() => {
                          setIcuBeds(prev => prev.filter(bed => bed.id !== selectedIcuBedId));
                          addToast('success', `Step-down Transfer Executed! ${icuBeds.find(b => b.id === selectedIcuBedId)?.patientName || 'Patient'} transferred to Ward 302.`);
                          setShowIcuDischargeModal(false);
                        }}>Confirm Ward Transfer</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DIGITAL CONSENT MODAL */}
              {showIcuConsentModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '460px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>✍️ Digital ICU Consent & Signatures</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowIcuConsentModal(false)}>✕</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', fontSize: '11px' }}>
                      <div><strong>Procedure / Consent Type:</strong> Central Line Insertion & Mechanical Ventilation</div>
                      <div><strong>Attendant Name:</strong> Sunita Sharma (Spouse)</div>
                      <div style={{ padding: '10px', background: 'var(--bg-muted)', borderRadius: '4px', fontStyle: 'italic', border: '1px dashed var(--border)' }}>
                        Signed Digitally via Tablet: Sunita Sharma (Authenticated 2026-08-08 09:12 AM)
                      </div>
                      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '11px' }} onClick={() => setShowIcuConsentModal(false)}>Close</button>
                        <button className="btn btn-primary" style={{ fontSize: '11px' }} onClick={() => { addToast('success', 'Digital Consent Signed & Attached to EMR!'); setShowIcuConsentModal(false); }}>Attach Digital Consent</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
  );
};
