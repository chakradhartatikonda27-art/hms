import React from 'react';
import { Mic, Send } from 'lucide-react';

export interface RadiologyModuleProps {
  [key: string]: any;
}

export const RadiologyModule: React.FC<RadiologyModuleProps> = (props) => {
  const {
    activeTab = 'radiology',
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

  const [showFormFDialog, setShowFormFDialog] = React.useState(false);
  const [formFData, setFormFData] = React.useState<any>({ patientName: '', age: '', gpaStatus: '', declarationSigned: false, regNo: '' });
  const [radPackages, setRadPackages] = React.useState([
    { id: 'RPKG-101', name: 'Comprehensive Neuro Imaging Package (Brain CT + Spine MRI)', modality: 'CT + MRI', price: 9500, originalPrice: 14000, testsCount: 2, status: 'Active' },
    { id: 'RPKG-102', name: 'Executive Cardiac & Vascular CT Angiography', modality: '128-Slice CT', price: 7999, originalPrice: 12000, testsCount: 1, status: 'Active' },
    { id: 'RPKG-103', name: 'Full Body Wellness MRI & USG Screening', modality: '3T MRI + USG', price: 14999, originalPrice: 22000, testsCount: 3, status: 'Active' }
  ]);
  const [radMachines, setRadMachines] = React.useState([
    { id: 'MCH-3T-01', name: 'Siemens Magnetom 3T MRI Suite', room: 'MRI Bay 1', status: 'Operational', uptime: '99.2%', nextService: '2026-09-15', techOnDuty: 'Rajesh Kumar (Tech)' },
    { id: 'MCH-CT-02', name: 'GE Revolution 128-Slice CT Scanner', room: 'CT Suite 2', status: 'Operational', uptime: '98.7%', nextService: '2026-08-25', techOnDuty: 'Amit Verma (Tech)' },
    { id: 'MCH-USG-03', name: 'Philips HD11 XE Ultrasound & Doppler', room: 'USG Room 3', status: 'Maintenance', uptime: '94.5%', nextService: '2026-08-10', techOnDuty: 'Pooja Singh (Tech)' }
  ]);
  const [radiologyWorklist, setRadiologyWorklist] = React.useState([
    { id: 'RAD-2026-801', patientName: 'Priya Sharma', modality: 'USG', studyName: 'Obstetric Anomaly Scan (PC-PNDT Form F)', priority: 'Routine', prepStatus: 'NPO Fasting OK', requestedBy: 'Dr. Ananya Ray', date: '2026-08-08 09:15 AM', status: 'PACS Captured', formFSigned: true, criticalFlag: false },
    { id: 'RAD-2026-802', patientName: 'Ramesh Sen', modality: 'CT', studyName: 'NCCT Head / Brain (Trauma Rule-Out)', priority: 'STAT', prepStatus: 'Immediate Scan', requestedBy: 'Dr. Sandeep Mehta', date: '2026-08-08 08:30 AM', status: 'Report Signed Off', formFSigned: false, criticalFlag: true },
    { id: 'RAD-2026-803', patientName: 'Aarav Sharma', modality: 'MRI', studyName: 'MRI Lumbar Spine Contrast', priority: 'Urgent', prepStatus: 'Metal Safety Screened', requestedBy: 'Dr. Deepa Roy', date: '2026-08-07 04:45 PM', status: 'Awaiting Sign-off', formFSigned: false, criticalFlag: false },
    { id: 'RAD-2026-804', patientName: 'Meena Gupta', modality: 'X-Ray', studyName: 'Chest X-Ray PA View', priority: 'Routine', prepStatus: 'Standard Prep', requestedBy: 'Dr. Sandeep Mehta', date: '2026-08-08 10:00 AM', status: 'PACS Captured', formFSigned: false, criticalFlag: false }
  ]);


  return (
            <div className="flex flex-col gap-lg">
              {/* Header Banner */}
              <div className="card" style={{ background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.08) 0%, rgba(37, 99, 235, 0.05) 100%)', borderLeft: '4px solid #9333EA' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>🖼️ Radiology & Imaging Management (15-Pillar Enterprise SaaS Suite)</span>
                      <span className="badge badge-primary">PACS, DICOM & PC-PNDT Form F</span>
                    </h2>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      10-Step Workflow Pipeline • Structured Reports • Voice Dictation • AI Critical Alerts • Machine Downtime Tracking • WhatsApp/Email/SMS Delivery
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button type="button" className="btn btn-secondary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowRadBookingModal(true)}>
                      ➕ 1-Click Order Test / Package
                    </button>
                    <button type="button" className="btn btn-secondary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowVoiceDictationModal(true)}>
                      🎙️ Voice-to-Text Dictation
                    </button>
                    <button type="button" className="btn btn-secondary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowFormFDialog(true)}>
                      📝 PC-PNDT Form F (USG)
                    </button>
                    <button type="button" className="btn btn-primary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowPacsViewerModal(true)}>
                      🖼️ Launch Web PACS Viewer
                    </button>
                  </div>
                </div>

                {/* Sub-tabs Navigation */}
                <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', marginTop: '14px', flexWrap: 'wrap' }}>
                  <button onClick={() => setRadSubTab('workflow_pipeline')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', background: radSubTab === 'workflow_pipeline' ? '#9333EA' : 'transparent', color: radSubTab === 'workflow_pipeline' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🔄 10-Step Pipeline Board
                  </button>
                  <button onClick={() => setRadSubTab('booking_packages')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: radSubTab === 'booking_packages' ? '#9333EA' : 'transparent', color: radSubTab === 'booking_packages' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    📦 Test Booking & Packages
                  </button>
                  <button onClick={() => setRadSubTab('investigation_templates')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: radSubTab === 'investigation_templates' ? '#9333EA' : 'transparent', color: radSubTab === 'investigation_templates' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    📑 Structured Reporting & Dictation
                  </button>
                  <button onClick={() => setRadSubTab('form_f_pacs')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: radSubTab === 'form_f_pacs' ? '#9333EA' : 'transparent', color: radSubTab === 'form_f_pacs' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    📝 PC-PNDT Form F & PACS Console
                  </button>
                  <button onClick={() => setRadSubTab('machines_scheduling')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: radSubTab === 'machines_scheduling' ? '#9333EA' : 'transparent', color: radSubTab === 'machines_scheduling' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    ⚙️ Machines, Rooms & Rosters
                  </button>
                  <button onClick={() => setRadSubTab('multichannel_billing')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: radSubTab === 'multichannel_billing' ? '#9333EA' : 'transparent', color: radSubTab === 'multichannel_billing' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    📲 Delivery, QR Auth & Revenue
                  </button>
                  <button onClick={() => setRadSubTab('ai_analytics')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', background: radSubTab === 'ai_analytics' ? '#9333EA' : 'transparent', color: radSubTab === 'ai_analytics' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🤖 AI Panic Alerts & Analytics
                  </button>
                </div>
              </div>

              {/* SUB-TAB 1: 10-STEP VISUAL IMAGING PIPELINE BOARD */}
              {radSubTab === 'workflow_pipeline' && (
                <div className="card">
                  <div className="card-header">
                    <h2>🔄 Interactive 10-Step Radiology Operational Pipeline</h2>
                    <span className="badge badge-primary">Real-time DICOM Workflow</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginTop: '16px' }}>
                    <div style={{ padding: '10px', background: 'rgba(37,99,235,0.06)', borderRadius: '6px', border: '1px solid var(--primary)', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)' }}>Step 1: Doctor Orders</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>OPD / IPD / ICU 1-Click</div>
                    </div>
                    <div style={{ padding: '10px', background: 'rgba(37,99,235,0.06)', borderRadius: '6px', border: '1px solid var(--primary)', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)' }}>Step 2: Registration</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>UHID & QR Code</div>
                    </div>
                    <div style={{ padding: '10px', background: 'rgba(37,99,235,0.06)', borderRadius: '6px', border: '1px solid var(--primary)', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)' }}>Step 3: Scheduling</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Room & Machine Roster</div>
                    </div>
                    <div style={{ padding: '10px', background: 'rgba(37,99,235,0.06)', borderRadius: '6px', border: '1px solid var(--primary)', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)' }}>Step 4: Patient Prep</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>NPO & Metal Check</div>
                    </div>
                    <div style={{ padding: '10px', background: 'rgba(37,99,235,0.06)', borderRadius: '6px', border: '1px solid var(--primary)', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)' }}>Step 5: Imaging Done</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>PACS DICOM Capture</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginTop: '10px' }}>
                    <div style={{ padding: '10px', background: 'rgba(16,185,129,0.06)', borderRadius: '6px', border: '1px solid var(--success)', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)' }}>Step 6: Reporting</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Voice & Template</div>
                    </div>
                    <div style={{ padding: '10px', background: 'rgba(16,185,129,0.06)', borderRadius: '6px', border: '1px solid var(--success)', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)' }}>Step 7: Verification</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Radiologist Audit</div>
                    </div>
                    <div style={{ padding: '10px', background: 'rgba(16,185,129,0.06)', borderRadius: '6px', border: '1px solid var(--success)', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)' }}>Step 8: Digital Sign</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Reg # Stamp</div>
                    </div>
                    <div style={{ padding: '10px', background: 'rgba(16,185,129,0.06)', borderRadius: '6px', border: '1px solid var(--success)', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)' }}>Step 9: Delivery</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>WhatsApp / Email / SMS</div>
                    </div>
                    <div style={{ padding: '10px', background: 'rgba(16,185,129,0.06)', borderRadius: '6px', border: '1px solid var(--success)', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)' }}>Step 10: Archive</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Cloud PACS Backup</div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14px', fontWeight: 600, marginTop: '20px', marginBottom: '10px' }}>Active Imaging Study Queue</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: 'var(--bg-muted)' }}>
                        <th style={{ padding: '8px' }}>Study ID</th>
                        <th style={{ padding: '8px' }}>Patient Name</th>
                        <th style={{ padding: '8px' }}>Modality</th>
                        <th style={{ padding: '8px' }}>Procedure</th>
                        <th style={{ padding: '8px' }}>Priority Queue</th>
                        <th style={{ padding: '8px' }}>Prep Status</th>
                        <th style={{ padding: '8px' }}>Workflow Stage</th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {radiologyWorklist.map(study => (
                        <tr key={study.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '8px' }}><span className="badge badge-secondary">{study.id}</span></td>
                          <td style={{ padding: '8px', fontWeight: 600 }}>{study.patientName}</td>
                          <td style={{ padding: '8px' }}>
                            <span className={`badge ${study.modality === 'USG' ? 'badge-primary' : study.modality === 'CT' ? 'badge-warning' : study.modality === 'MRI' ? 'badge-success' : 'badge-secondary'}`}>
                              {study.modality}
                            </span>
                          </td>
                          <td style={{ padding: '8px' }}>{study.studyName}</td>
                          <td style={{ padding: '8px' }}>
                            <span className={`badge ${study.priority === 'STAT' ? 'badge-danger' : study.priority === 'Urgent' ? 'badge-warning' : 'badge-muted'}`}>
                              {study.priority === 'STAT' ? '🔴 STAT (Emergency)' : study.priority === 'Urgent' ? '🟡 Urgent' : '🔵 Routine'}
                            </span>
                          </td>
                          <td style={{ padding: '8px', color: 'var(--text-muted)' }}>{study.prepStatus}</td>
                          <td style={{ padding: '8px' }}>
                            <span className={`badge ${study.status === 'Report Signed Off' ? 'badge-success' : 'badge-primary'}`}>
                              {study.status}
                            </span>
                          </td>
                          <td style={{ padding: '8px', textAlign: 'right', display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                            <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => { setSelectedRadStudyId(study.id); setShowPacsViewerModal(true); }}>
                              🖼️ PACS
                            </button>
                            <button className="btn btn-primary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowDeliveryModal(true)}>
                              📲 Deliver
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUB-TAB 2: TEST BOOKING & PACKAGES */}
              {radSubTab === 'booking_packages' && (
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#9333EA' }}>📦 Curated Radiology Test Packages & OPD/IPD 1-Click Booking</h3>
                    <button className="btn btn-primary" style={{ fontSize: '11px' }} onClick={() => setShowRadBookingModal(true)}>➕ Book New Scan / Package</button>
                  </div>

                  <div className="grid grid-3" style={{ gap: '12px' }}>
                    {radPackages.map(pkg => (
                      <div key={pkg.id} style={{ padding: '14px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-muted)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="badge badge-primary">{pkg.modality}</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{pkg.id}</span>
                        </div>
                        <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '8px 0', color: 'var(--text-main)' }}>{pkg.name}</h4>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--success)' }}>
                          ₹{pkg.price} <span style={{ fontSize: '11px', textDecoration: 'line-through', color: 'var(--text-muted)' }}>₹{pkg.originalPrice}</span>
                        </div>
                        <button className="btn btn-success" style={{ width: '100%', marginTop: '10px', fontSize: '11px' }} onClick={() => {
                          setRadPackages(prev => prev.map(p => p.id === pkg.id ? { ...p, status: 'Booked' } : p));
                          addToast('success', `Booked ${pkg.name} for Patient! Package Code: ${pkg.id}`);
                        }}>Book 1-Click Package</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: STRUCTURED REPORTING & VOICE DICTATION */}
              {radSubTab === 'investigation_templates' && (
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#9333EA' }}>📑 Standardized Structured Report Templates & Voice Dictation Console</h3>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Active Selected Template: <span className="badge badge-primary">{selectedRadTemplate}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-secondary" style={{ fontSize: '11px' }} onClick={() => setShowVoiceDictationModal(true)}>🎙️ Voice Dictation</button>
                      <button className="btn btn-primary" style={{ fontSize: '11px' }} onClick={() => addToast('success', 'Saved Custom Radiology Report Template!')}>➕ Save Template</button>
                    </div>
                  </div>

                  <div className="grid grid-2" style={{ gap: '12px' }}>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>🫁 HRCT Chest PA View Template</strong>
                        <span className="badge badge-primary">X-Ray / CT</span>
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.4' }}>
                        "Lungs: Clear lung fields bilaterally. No focal infiltrates or consolidation.<br/>
                        Heart: Normal cardio-thoracic ratio. Mediastinum unremarkable."
                      </p>
                      <button className="btn btn-secondary" style={{ fontSize: '10px', marginTop: '8px' }} onClick={() => { setSelectedRadTemplate('HRCT Chest PA View'); addToast('info', 'Loaded HRCT Chest Template'); }}>Use Template</button>
                    </div>

                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>🧠 NCCT Head / Brain Template</strong>
                        <span className="badge badge-warning">CT Scan</span>
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.4' }}>
                        "Brain Parenchyma: Normal attenuation of cerebral & cerebellar hemispheres.<br/>
                        Ventricles: Normal size & position. No acute hemorrhage or midline shift."
                      </p>
                      <button className="btn btn-secondary" style={{ fontSize: '10px', marginTop: '8px' }} onClick={() => { setSelectedRadTemplate('NCCT Head'); addToast('info', 'Loaded NCCT Brain Template'); }}>Use Template</button>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: PC-PNDT FORM F & PACS CONSOLE */}
              {radSubTab === 'form_f_pacs' && (
                <div className="flex flex-col gap-lg">
                  <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--danger)' }}>📝 PC-PNDT Form F Statutory Registry (Pre-Conception & Pre-Natal Diagnostic Techniques Act, 1994 - India)</h3>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Mandatory statutory compliance register for all obstetric ultrasound scans conducted in India.</p>
                      </div>
                      <button className="btn btn-primary" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => setShowFormFDialog(true)}>➕ Generate Form F Entry</button>
                    </div>

                    <div style={{ padding: '14px', background: 'var(--bg-muted)', borderRadius: '6px', fontSize: '11px', marginBottom: '12px' }}>
                      <strong>Statutory Non-Disclosure Undertaking:</strong><br/>
                      <span style={{ color: 'var(--text-muted)' }}>
                        "I hereby declare that while conducting ultrasonography scan on patient <strong>{formFData.patientName}</strong>, I have neither determined nor disclosed the sex of the fetus to anyone in compliance with Section 6 of the PC-PNDT Act, 1994."
                      </span>
                      <div style={{ marginTop: '8px', fontWeight: 600, color: 'var(--success)' }}>
                        ✍️ Signed by Radiologist: {formFData.radiologistName} (Reg # {formFData.radiologistRegNo})
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>🖼️ Web DICOM PACS Image Viewer Console</h3>
                      <button className="btn btn-primary" style={{ fontSize: '11px' }} onClick={() => setShowPacsViewerModal(true)}>Launch Fullscreen DICOM PACS</button>
                    </div>

                    <div style={{ padding: '20px', background: '#000', color: '#00ff00', fontFamily: 'monospace', borderRadius: '8px', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>[ DICOM PACS SIMULATION CONSOLE ]</div>
                      <div style={{ fontSize: '12px', marginTop: '8px', color: '#fff' }}>Patient: Priya Sharma (PX-2026-9041) | Modality: USG / CT / MRI</div>
                      <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>Slice 24/120 • Window Level: 40 • Window Width: 400 • Pixel Matrix: 512x512</div>
                      <button className="btn btn-success" style={{ marginTop: '14px', fontSize: '11px' }} onClick={() => setShowPacsViewerModal(true)}>Open Interactive DICOM Viewer</button>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 5: MACHINES, ROOMS & ROSTERS */}
              {radSubTab === 'machines_scheduling' && (
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#9333EA' }}>⚙️ Machine Maintenance, Room Allocation & Duty Rosters</h3>
                    <button className="btn btn-secondary" style={{ fontSize: '11px' }} onClick={() => setShowMachineDowntimeModal(true)}>🔧 Log Machine Service / Downtime</button>
                  </div>

                  <div className="grid grid-3" style={{ gap: '12px' }}>
                    {radMachines.map(mch => (
                      <div key={mch.id} style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-card)', borderLeft: `4px solid ${mch.status === 'Operational' ? 'var(--success)' : 'var(--warning)'}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '13px' }}>{mch.name}</strong>
                          <span className={`badge ${mch.status === 'Operational' ? 'badge-success' : 'badge-warning'}`}>{mch.status}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <div>• <strong>Room:</strong> {mch.room}</div>
                          <div>• <strong>Uptime Rate:</strong> {mch.uptime}</div>
                          <div>• <strong>Next Service:</strong> {mch.nextService}</div>
                          <div>• <strong>Tech Assigned:</strong> {mch.techOnDuty}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 6: MULTI-CHANNEL DELIVERY, QR AUTH & REVENUE */}
              {radSubTab === 'multichannel_billing' && (
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>📲 Automated Multi-Channel Delivery, QR Verification & Referral Revenue</h3>
                    <button className="btn btn-success" style={{ fontSize: '11px' }} onClick={() => setShowDeliveryModal(true)}>Dispatch Report (WhatsApp/SMS)</button>
                  </div>

                  <div className="grid grid-3" style={{ gap: '12px' }}>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                      <strong>📲 WhatsApp API Delivery</strong>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Sends encrypted PDF link directly to patient WhatsApp (+91 98765 43210).</p>
                      <button className="btn btn-primary" style={{ fontSize: '10px', marginTop: '8px' }} onClick={() => addToast('success', 'WhatsApp Radiology Report Dispatched!')}>Send WhatsApp</button>
                    </div>

                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                      <strong>📧 Encrypted Email Dispatch</strong>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Delivers password-protected PDF + DICOM viewer link to patient email.</p>
                      <button className="btn btn-primary" style={{ fontSize: '10px', marginTop: '8px' }} onClick={() => addToast('success', 'Encrypted Email Dispatched!')}>Send Email</button>
                    </div>

                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                      <strong>💬 SMS Gateway Alert</strong>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Sends short download URL via SMS gateway for feature phones.</p>
                      <button className="btn btn-primary" style={{ fontSize: '10px', marginTop: '8px' }} onClick={() => addToast('success', 'SMS Alert Dispatched!')}>Send SMS</button>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 7: AI CRITICAL ALERTS & ANALYTICS */}
              {radSubTab === 'ai_analytics' && (
                <div className="grid grid-2" style={{ gap: '12px' }}>
                  <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--danger)' }}>🤖 AI Panic Finding Alert & Acute Pathology Detector</h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>AI algorithms automatically flag acute intracranial hemorrhage, pneumothorax, and pulmonary embolism with 99.7% sensitivity.</p>
                    <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', border: '1px solid var(--danger)', marginTop: '12px', fontSize: '11px' }}>
                      <strong style={{ color: 'var(--danger)' }}>🚨 AI Critical Alert #RAD-2026-802:</strong> Acute Subdural Hematoma detected on NCCT Brain of Ramesh Sen. Immediate treating doctor push notification dispatched to Dr. Sandeep Mehta.
                    </div>
                    <button className="btn btn-danger" style={{ marginTop: '12px', fontSize: '11px' }} onClick={() => setShowCriticalAlertModal(true)}>View AI Panic Alert Details</button>
                  </div>

                  <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>📊 Machine Utilization & TAT Performance Analytics</h3>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div>• <strong>3T MRI Suite Utilization:</strong> 99.2% Uptime (Avg scan time 24 mins)</div>
                      <div>• <strong>128-Slice CT Scanner Utilization:</strong> 98.7% Uptime (Avg scan time 8 mins)</div>
                      <div>• <strong>Turnaround Time (TAT):</strong> Emergency STAT 14 mins (Target &lt; 30 mins)</div>
                      <div>• <strong>AI Worklist Prioritization:</strong> Auto-promoted 12 acute scans to top queue</div>
                    </div>
                  </div>
                </div>
              )}

              {/* DICOM PACS VIEWER MODAL */}
              {showPacsViewerModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '640px', maxWidth: '95%', background: '#090D16', color: 'white', border: '1px solid #1E293B' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1E293B', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>🖼️ Web DICOM PACS Viewer — Study #{selectedRadStudyId}</span>
                      </h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowPacsViewerModal(false)}>✕</button>
                    </div>

                    <div style={{ marginTop: '12px', background: '#000', padding: '20px', borderRadius: '6px', textAlign: 'center', border: '1px solid #334155' }}>
                      <div style={{ fontSize: '12px', color: '#94A3B8', fontFamily: 'monospace' }}>MODALITY: CT HEAD / BRAIN • SLICE 18/64</div>
                      <div style={{ margin: '20px 0', height: '140px', background: 'radial-gradient(circle, #334155 0%, #000 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px dashed #475569' }}>
                        <span style={{ color: '#38BDF8', fontWeight: 'bold' }}>[ HIGH-RESOLUTION DICOM IMAGE LAYER ]</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>WL: 40 | WW: 400 | Zoom: 100% | Measurement: 12.4 mm</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>✍️ Signing Radiologist: Dr. Rajesh K (MD Radiodiagnosis)</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-secondary" onClick={() => setShowPacsViewerModal(false)}>Close PACS</button>
                        <button className="btn btn-success" onClick={() => {
                          setRadiologyWorklist(prev => prev.map(s => s.id === selectedRadStudyId ? { ...s, status: 'Report Signed Off' } : s));
                          addToast('success', `Radiology Study #${selectedRadStudyId} Digitally Signed & Approved!`);
                          setShowPacsViewerModal(false);
                        }}>Sign Off Report</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* REPORT DELIVERY MODAL */}
              {showDeliveryModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '460px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>📲 Multi-Channel Diagnostic Report Delivery</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowDeliveryModal(false)}>✕</button>
                    </div>

                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      <div style={{ padding: '10px', background: 'var(--bg-muted)', borderRadius: '4px' }}>
                        <strong>Target Patient:</strong> Priya Sharma (PX-2026-9041)<br/>
                        <strong>Mobile Phone:</strong> +91 98765 43210 | <strong>Email:</strong> priya.sharma@example.com
                      </div>

                      <button className="btn btn-success" style={{ padding: '8px', fontSize: '11px', justifyContent: 'center' }} onClick={() => {
                        addToast('success', 'Sent Radiology PDF Report to Patient WhatsApp (+91 98765 43210)!');
                        setShowDeliveryModal(false);
                      }}>
                        📲 Send via WhatsApp API
                      </button>

                      <button className="btn btn-primary" style={{ padding: '8px', fontSize: '11px', justifyContent: 'center' }} onClick={() => {
                        addToast('success', 'Sent Encrypted Radiology PDF to priya.sharma@example.com!');
                        setShowDeliveryModal(false);
                      }}>
                        📧 Send via Encrypted Email
                      </button>

                      <button className="btn btn-secondary" style={{ padding: '8px', fontSize: '11px', justifyContent: 'center' }} onClick={() => {
                        addToast('success', 'Sent SMS download URL to +91 98765 43210!');
                        setShowDeliveryModal(false);
                      }}>
                        💬 Send via SMS Gateway
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PC-PNDT FORM F STATUTORY DIALOG */}
              {showFormFDialog && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '560px', maxWidth: '95%', borderLeft: '4px solid var(--danger)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--danger)' }}>📝 Statutory PC-PNDT Form F (Section 9, PC-PNDT Act 1994)</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowFormFDialog(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      addToast('success', 'PC-PNDT Form F Statutory Declaration Saved & Linked to USG Study!');
                      setShowFormFDialog(false);
                    }} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      
                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Pregnant Woman Name</label>
                          <input type="text" className="form-input" style={{ height: '28px', fontSize: '11px' }} value={formFData.patientName} onChange={(e) => setFormFData({ ...formFData, patientName: e.target.value })} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Age (Years)</label>
                          <input type="text" className="form-input" style={{ height: '28px', fontSize: '11px' }} value={formFData.patientAge} onChange={(e) => setFormFData({ ...formFData, patientAge: e.target.value })} required />
                        </div>
                      </div>

                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Gestational Age (Weeks)</label>
                          <input type="text" className="form-input" style={{ height: '28px', fontSize: '11px' }} value={formFData.gestationalWeeks} onChange={(e) => setFormFData({ ...formFData, gestationalWeeks: e.target.value })} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Number of Living Children</label>
                          <input type="text" className="form-input" style={{ height: '28px', fontSize: '11px' }} value={formFData.livingChildren} onChange={(e) => setFormFData({ ...formFData, livingChildren: e.target.value })} required />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Indication for Ultrasound Diagnostic Scan</label>
                        <input type="text" className="form-input" style={{ height: '28px', fontSize: '11px' }} value={formFData.usgIndication} onChange={(e) => setFormFData({ ...formFData, usgIndication: e.target.value })} required />
                      </div>

                      <div style={{ padding: '8px', background: 'rgba(239,68,68,0.05)', borderRadius: '4px', border: '1px solid var(--danger)', fontSize: '10px', color: 'var(--danger)' }}>
                        <strong>⚖️ Legal Undertaking:</strong> "Sex of fetus was neither determined nor communicated to anyone."
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowFormFDialog(false)}>Cancel</button>
                        <button type="submit" className="btn btn-danger">Sign & Submit Form F</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* VOICE DICTATION MODAL */}
              {showVoiceDictationModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mic size={16} style={{ color: 'var(--danger)' }} />
                        <span>Voice-to-Text Report Dictation Engine</span>
                      </h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowVoiceDictationModal(false)}>✕</button>
                    </div>

                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '4px', border: '1px solid var(--danger)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--danger)', animation: 'pulse 1s infinite' }}></div>
                        <strong>Microphone Active: Dictating Radiology Findings...</strong>
                      </div>

                      <textarea
                        rows={4}
                        className="form-input"
                        style={{ fontSize: '11px' }}
                        value={radVoiceText}
                        onChange={(e) => setRadVoiceText(e.target.value)}
                      />

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button className="btn btn-secondary" onClick={() => setShowVoiceDictationModal(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => {
                          addToast('success', 'Voice Dictation Inserted into Radiology Report!');
                          setShowVoiceDictationModal(false);
                        }}>Insert into Report</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* RAD BOOKING MODAL */}
              {showRadBookingModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>➕ Book Radiology Scan / Package</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowRadBookingModal(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      addToast('success', 'Radiology Order Registered & Added to PACS Worklist Queue!');
                      setShowRadBookingModal(false);
                    }} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      
                      <div className="form-group">
                        <label className="form-label">Patient Name</label>
                        <input type="text" className="form-input" placeholder="e.g. Ramesh Sen" required />
                      </div>

                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Modality</label>
                          <select className="form-input">
                            <option value="USG">USG Ultrasound</option>
                            <option value="CT">CT Scan 128-Slice</option>
                            <option value="MRI">MRI 3T Magnetom</option>
                            <option value="XRAY">X-Ray Digital</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Priority Queue</label>
                          <select className="form-input">
                            <option value="STAT">🔴 STAT (Emergency)</option>
                            <option value="Urgent">🟡 Urgent</option>
                            <option value="Routine">🔵 Routine</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowRadBookingModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Submit Order</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* MACHINE DOWNTIME MODAL */}
              {showMachineDowntimeModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '450px', maxWidth: '90%', borderLeft: '4px solid var(--warning)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--warning)' }}>🔧 Machine Maintenance & Downtime Log</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowMachineDowntimeModal(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setRadMachines(prev => prev.map((m, i) => i === 2 ? { ...m, status: 'Maintenance' } : m));
                      addToast('warning', 'Machine Downtime & Maintenance Schedule Logged!');
                      setShowMachineDowntimeModal(false);
                    }} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      
                      <div className="form-group">
                        <label className="form-label">Select Equipment / Suite</label>
                        <select className="form-input">
                          {radMachines.map(m => <option key={m.id} value={m.id}>{m.name} ({m.room})</option>)}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Downtime Reason / Calibration Check</label>
                        <textarea rows={2} className="form-input" placeholder="e.g. Cryogen helium refilling & RF coil calibration..." required />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowMachineDowntimeModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-warning">Save Maintenance Log</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* CRITICAL ALERT MODAL */}
              {showCriticalAlertModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '480px', maxWidth: '90%', borderLeft: '4px solid var(--danger)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>🚨 AI Critical Finding Alert Push Dispatch</span>
                      </h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowCriticalAlertModal(false)}>✕</button>
                    </div>

                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '4px', border: '1px solid var(--danger)' }}>
                        <strong style={{ color: 'var(--danger)' }}>⚠️ Acute Subdural Hematoma (6.4 mm thickness)</strong>
                        <p style={{ marginTop: '4px', color: 'var(--text-main)' }}>
                          NCCT Brain Scan of <strong>Ramesh Sen</strong> (PX-2026-8802). AI deep learning model flagged high-density crescentic extra-axial bleed.
                        </p>
                      </div>

                      <div style={{ padding: '8px', background: 'var(--bg-muted)', borderRadius: '4px' }}>
                        <strong>Dispatch Log:</strong> Dispatched STAT alert push notification & SMS to treating physician <strong>Dr. Sandeep Mehta</strong> at 08:32 AM.
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                        <button className="btn btn-primary" onClick={() => setShowCriticalAlertModal(false)}>Acknowledge Critical Alert</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
  );
};
