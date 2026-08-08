import React from 'react';
import { X } from 'lucide-react';

export interface PathologyModuleProps {
  [key: string]: any;
}

export const PathologyModule: React.FC<PathologyModuleProps> = (props) => {
  const {
    activeTab = 'lab',
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

  const [labSubTab, setLabSubTab] = React.useState('workflow_board');
  const [showLabBookingModal, setShowLabBookingModal] = React.useState(false);
  const [labEntryId, setLabEntryId] = React.useState('');
  const [labEntryValue, setLabEntryValue] = React.useState('');
  const [labEntryRange, setLabEntryRange] = React.useState('');
  const [showSmartReportModal, setShowSmartReportModal] = React.useState(false);
  const [showQrVerifyModal, setShowQrVerifyModal] = React.useState(false);
  const [labCategoryFilter, setLabCategoryFilter] = React.useState('all');
  const [selectedLabPatientId, setSelectedLabPatientId] = React.useState('');
  const [testPackages, setTestPackages] = React.useState([
    { id: 'PKG-101', name: 'Executive Master Health Package', testsCount: 68, originalPrice: 4500, packagePrice: 1999, category: 'Comprehensive' },
    { id: 'PKG-102', name: 'Complete Cardiac Risk Panel', testsCount: 14, originalPrice: 3200, packagePrice: 1499, category: 'Cardiology' },
    { id: 'PKG-103', name: 'Comprehensive Diabetes & Renal Profile', testsCount: 22, originalPrice: 2800, packagePrice: 1199, category: 'Endocrinology' },
    { id: 'PKG-104', name: 'Senior Citizen Full Body Screening', testsCount: 82, originalPrice: 5500, packagePrice: 2499, category: 'Geriatric' }
  ]);
  const [reagentsList, setReagentsList] = React.useState([
    { id: 'REG-501', name: 'Sysmex Cellpack DCL Diluent (CBC)', lot: 'LOT-SY-2026-A', stockLevel: 14, minThreshold: 5, unit: 'Bottles (20L)', expiry: '2027-04-30', status: 'Optimal' },
    { id: 'REG-502', name: 'Roche Cobas c501 Glucose HK Assay Kit', lot: 'LOT-RC-8841-B', stockLevel: 2, minThreshold: 4, unit: 'Kits (800 Tests)', expiry: '2026-09-15', status: 'Low Stock Alert' },
    { id: 'REG-503', name: 'Bio-Rad HbA1c HPLC Reagent Cartridge', lot: 'LOT-BR-9901-C', stockLevel: 8, minThreshold: 3, unit: 'Cartridges', expiry: '2026-08-30', status: 'Expiring Soon' }
  ]);
  const [outsourcedSamples, setOutsourcedSamples] = React.useState([
    { id: 'OUT-9901', patientName: 'Aarav Sharma', testName: 'GeneXpert HLA-B27 PCR', partnerLab: 'Metropolis Healthcare', dispatchTime: '2026-08-08 08:30 AM', trackingNo: 'DHL-884129-IN', tempStatus: '2.4°C (Cold-Chain OK)', status: 'Dispatched' },
    { id: 'OUT-9902', patientName: 'Ramesh Sen', testName: 'Liquid Biopsy NGS Panel', partnerLab: 'Dr. Lal PathLabs', dispatchTime: '2026-08-07 04:15 PM', trackingNo: 'BLUEDART-9011-X', tempStatus: '4.1°C (Cold-Chain OK)', status: 'Results Received' }
  ]);
  const [refDoctorEarnings, setRefDoctorEarnings] = React.useState([
    { id: 1, doctorName: 'Dr. Sandeep Mehta', testName: 'Lipid Profile & HbA1c', fee: 1800, sharePercent: 15, payout: 270, status: 'Approved' },
    { id: 2, doctorName: 'Dr. Ananya Ray', testName: 'Brain MRI Contrast', fee: 6500, sharePercent: 20, payout: 1300, status: 'Pending Audit' },
    { id: 3, doctorName: 'Dr. Deepa Roy', testName: 'Whole Abdomen CT', fee: 4200, sharePercent: 15, payout: 630, status: 'Disbursed' }
  ]);


  return (
            <div className="flex flex-col gap-lg">
              {/* Header Banner */}
              <div className="card" style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(147, 51, 234, 0.05) 100%)', borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>🔬 Pathology Laboratory Management (Enterprise SaaS Suite)</span>
                      <span className="badge badge-primary">NABL & HL7/ASTM Ready</span>
                    </h2>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      8-Step Sample Pipeline • Delta Check • Cryptographic QR Auth • Reagents Inventory • AI Abnormal Alerts • Referring Doctor Revenue Share
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button type="button" className="btn btn-secondary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowBarcodeModal(true)}>
                      🏷️ Generate Barcode/QR
                    </button>
                    <button type="button" className="btn btn-secondary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowDeltaCheckModal(true)}>
                      📊 Delta Check Viewer
                    </button>
                    <button type="button" className="btn btn-primary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowLabBookingModal(true)}>
                      🌐 Test & Package Booking
                    </button>
                  </div>
                </div>

                {/* Sub-tabs Navigation */}
                <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', marginTop: '14px', flexWrap: 'wrap' }}>
                  <button onClick={() => setLabSubTab('workflow_board')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', background: labSubTab === 'workflow_board' ? 'var(--primary)' : 'transparent', color: labSubTab === 'workflow_board' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    📋 8-Step Pipeline Board
                  </button>
                  <button onClick={() => setLabSubTab('booking_packages')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: labSubTab === 'booking_packages' ? 'var(--primary)' : 'transparent', color: labSubTab === 'booking_packages' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    📦 Packages & Bookings
                  </button>
                  <button onClick={() => setLabSubTab('samples_tracking')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: labSubTab === 'samples_tracking' ? 'var(--primary)' : 'transparent', color: labSubTab === 'samples_tracking' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🏷️ Sample Tracking & Barcode
                  </button>
                  <button onClick={() => setLabSubTab('smart_reports')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: labSubTab === 'smart_reports' ? 'var(--primary)' : 'transparent', color: labSubTab === 'smart_reports' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    📄 Smart Reports & QR Auth
                  </button>
                  <button onClick={() => setLabSubTab('reagents_inventory')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: labSubTab === 'reagents_inventory' ? 'var(--primary)' : 'transparent', color: labSubTab === 'reagents_inventory' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🧪 Reagent & Kit Inventory
                  </button>
                  <button onClick={() => setLabSubTab('finance_referral')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: labSubTab === 'finance_referral' ? 'var(--primary)' : 'transparent', color: labSubTab === 'finance_referral' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    💰 Finance & Referral Split
                  </button>
                  <button onClick={() => setLabSubTab('ai_analytics')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', background: labSubTab === 'ai_analytics' ? 'var(--primary)' : 'transparent', color: labSubTab === 'ai_analytics' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🤖 AI Insights & TAT Analytics
                  </button>
                </div>
              </div>

              {/* SUB-TAB 1: 8-STEP SAMPLE PIPELINE BOARD */}
              {labSubTab === 'workflow_board' && (
                <div className="card">
                  <div className="card-header">
                    <h2>Real-Time Laboratory Sample Workflow Pipeline</h2>
                    <span className="badge badge-primary">Test Ordered ➔ Registration ➔ Barcode Label ➔ Collection ➔ Processing ➔ Quality Check ➔ Pathologist Sign-off ➔ Dispatched</span>
                  </div>

                  <div className="grid grid-4" style={{ gap: '12px', marginTop: '14px' }}>
                    <div style={{ padding: '10px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '3px solid var(--primary)' }}>
                      <strong style={{ fontSize: '12px' }}>1. Sample Registered & Barcoded</strong>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>3 Samples Pending Phlebotomist Pickup</div>
                    </div>
                    <div style={{ padding: '10px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '3px solid #EAB308' }}>
                      <strong style={{ fontSize: '12px' }}>2. Analyzer Processing (HL7)</strong>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>2 Batches Running on Sysmex XN-1000</div>
                    </div>
                    <div style={{ padding: '10px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '3px solid #3B82F6' }}>
                      <strong style={{ fontSize: '12px' }}>3. Pathologist Verification</strong>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>4 Reports Awaiting Digital Sign-off</div>
                    </div>
                    <div style={{ padding: '10px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '3px solid var(--success)' }}>
                      <strong style={{ fontSize: '12px' }}>4. QR Dispatched & Portal Sync</strong>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>28 Reports Delivered via WhatsApp / Email</div>
                    </div>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginTop: '16px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: 'var(--bg-muted)' }}>
                        <th style={{ padding: '10px' }}>Patient Name</th>
                        <th style={{ padding: '10px' }}>Test Code</th>
                        <th style={{ padding: '10px' }}>Lab Test Name</th>
                        <th style={{ padding: '10px' }}>Dispatch Type</th>
                        <th style={{ padding: '10px' }}>Referral Share</th>
                        <th style={{ padding: '10px' }}>Status</th>
                        <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.flatMap(p => p.labResults.map(lab => ({ ...lab, patientName: p.name, patientId: p.id }))).map(lab => (
                        <tr key={lab.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '10px', fontWeight: 600 }}>{lab.patientName}</td>
                          <td style={{ padding: '10px' }}><span className="badge badge-secondary">{lab.id}</span></td>
                          <td style={{ padding: '10px' }}>{lab.testName}</td>
                          <td style={{ padding: '10px' }}>
                            <span className={`badge ${lab.outsourced ? 'badge-warning' : 'badge-primary'}`}>
                              {lab.outsourced ? `Outsourced: ${lab.outsourcedLabName}` : 'In-House Lab'}
                            </span>
                          </td>
                          <td style={{ padding: '10px' }}>{lab.refDoctorShare ? `${lab.refDoctorShare}% Share` : 'Direct'}</td>
                          <td style={{ padding: '10px' }}>
                            <span className={`badge ${lab.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                              {lab.status === 'completed' ? '✅ Completed' : '🟡 Processing'}
                            </span>
                          </td>
                          <td style={{ padding: '10px', textAlign: 'right' }}>
                            {lab.status === 'pending' ? (
                              <button className="btn btn-primary" style={{ padding: '3px 8px', fontSize: '10px' }} onClick={() => { setLabEntryId(lab.id); setLabEntryValue(''); }}>
                                Upload Observed Results
                              </button>
                            ) : (
                              <button className="btn btn-secondary" style={{ padding: '3px 8px', fontSize: '10px' }} onClick={() => { setSelectedLabReportId(lab.id); setShowSmartReportModal(true); }}>
                                View Smart Report
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Lab Result Uploading Form */}
                  {labEntryId && (
                    <div className="card" style={{ maxWidth: '500px', marginTop: '16px', borderLeft: '4px solid var(--primary)' }}>
                      <div className="card-header">
                        <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Enter Laboratory Results - Order ID {labEntryId}</h3>
                        <button className="btn btn-ghost btn-icon" onClick={() => setLabEntryId('')}>
                          <X size={16} />
                        </button>
                      </div>
                      <form onSubmit={handleLabResultSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', fontSize: '11px' }}>
                        <div className="form-group">
                          <label className="form-label">Observed Test Value</label>
                          <input
                            type="text"
                            placeholder="e.g. 104 mg/dL, Clear, Normal"
                            className="form-input"
                            style={{ height: '30px', fontSize: '11px' }}
                            required
                            value={labEntryValue}
                            onChange={(e) => setLabEntryValue(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Reference Range</label>
                          <input
                            type="text"
                            placeholder="e.g. 70-100 mg/dL"
                            className="form-input"
                            style={{ height: '30px', fontSize: '11px' }}
                            value={labEntryRange}
                            onChange={(e) => setLabEntryRange(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-sm justify-between" style={{ marginTop: '6px' }}>
                          <button type="button" className="btn btn-secondary" onClick={() => setLabEntryId('')}>Cancel</button>
                          <button type="submit" className="btn btn-success">Verify & Publish Report</button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TAB 2: ONE-CLICK TEST PACKAGES & BOOKINGS */}
              {labSubTab === 'booking_packages' && (
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>📦 One-Click Curated Test Packages & Home Phlebotomy Pickup</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-secondary" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => {
                        const newPkgId = `PKG-${100 + testPackages.length + 1}`;
                        setTestPackages(prev => [...prev, { id: newPkgId, name: 'Oncology Marker Screen', testsCount: 18, originalPrice: 6000, packagePrice: 2999, category: 'Oncology' }]);
                        addToast('success', `Created New Package ${newPkgId}: Oncology Marker Screen!`);
                      }}>➕ Add New Package</button>
                      <button className="btn btn-primary" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => setShowLabBookingModal(true)}>🌐 Custom Diagnostic Booking</button>
                    </div>
                  </div>

                  <div className="grid grid-2" style={{ gap: '12px' }}>
                    {testPackages.map(pkg => (
                      <div key={pkg.id} style={{ padding: '14px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-muted)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <span className="badge badge-primary">{pkg.category}</span>
                            <h4 style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>{pkg.name}</h4>
                            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Includes {pkg.testsCount} essential biomarkers & parameters</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '11px', textDecoration: 'line-through', color: 'var(--text-muted)' }}>₹{pkg.originalPrice}</div>
                            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--success)' }}>₹{pkg.packagePrice}</div>
                          </div>
                        </div>

                        <button className="btn btn-success" style={{ width: '100%', marginTop: '12px', fontSize: '11px', padding: '6px' }} onClick={() => {
                          addToast('success', `One-click package booked: ${pkg.name}! Barcode assigned.`);
                        }}>
                          ⚡ Book Package Now (1-Click)
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: SAMPLE TRACKING & BARCODE & OUTSOURCING */}
              {labSubTab === 'samples_tracking' && (
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>🏷️ Barcode/QR Label Generation, Sample Tracking & Outsourcing Register</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-primary" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => {
                        const newId = `OUT-${9900 + outsourcedSamples.length + 1}`;
                        setOutsourcedSamples(prev => [...prev, { id: newId, patientName: 'Vikram Patel', testName: 'Karyotype Chromosome Analysis', partnerLab: 'Metropolis Healthcare', dispatchTime: '2026-08-08 09:40 AM', trackingNo: 'DHL-990412-IN', tempStatus: '3.1°C (Cold-Chain OK)', status: 'Dispatched' }]);
                        addToast('success', `Dispatched Sample ${newId} to Metropolis Healthcare!`);
                      }}>🚚 Dispatch Outsource Sample</button>
                      <button className="btn btn-secondary" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => setShowBarcodeModal(true)}>🖨️ Print Sample Label</button>
                    </div>
                  </div>

                  <div className="grid grid-3" style={{ gap: '12px', marginBottom: '14px' }}>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                      <strong>Barcode ID: BC-99041288</strong>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Specimen: EDTA Purple Top Blood (5 mL)</p>
                      <span className="badge badge-success" style={{ marginTop: '6px' }}>Received at Analyzer</span>
                    </div>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                      <strong>Barcode ID: BC-99041289</strong>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Specimen: Sodium Fluoride Grey Top (Fasting)</p>
                      <span className="badge badge-warning" style={{ marginTop: '6px' }}>In Transit (Home Pickup)</span>
                    </div>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                      <strong>Barcode ID: BC-99041290</strong>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Specimen: Sterile Urine Container</p>
                      <span className="badge badge-danger" style={{ marginTop: '6px' }}>Recollection Requested (Hemolyzed)</span>
                    </div>
                  </div>

                  {/* Reference Lab Sample Outsourcing Table */}
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginTop: '16px', marginBottom: '8px' }}>Reference Laboratory Outsourced Manifest</h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: 'var(--bg-muted)' }}>
                        <th style={{ padding: '8px' }}>Outsource ID</th>
                        <th style={{ padding: '8px' }}>Patient Name</th>
                        <th style={{ padding: '8px' }}>Specialized Test Name</th>
                        <th style={{ padding: '8px' }}>Partner Ref Lab</th>
                        <th style={{ padding: '8px' }}>Airway Bill Tracking</th>
                        <th style={{ padding: '8px' }}>Cold-Chain Temp</th>
                        <th style={{ padding: '8px' }}>Outsource Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {outsourcedSamples.map(sample => (
                        <tr key={sample.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '8px' }}><span className="badge badge-primary">{sample.id}</span></td>
                          <td style={{ padding: '8px', fontWeight: 600 }}>{sample.patientName}</td>
                          <td style={{ padding: '8px' }}>{sample.testName}</td>
                          <td style={{ padding: '8px' }}>{sample.partnerLab}</td>
                          <td style={{ padding: '8px' }}><span style={{ fontFamily: 'monospace' }}>{sample.trackingNo}</span></td>
                          <td style={{ padding: '8px' }}><span className="badge badge-success">{sample.tempStatus}</span></td>
                          <td style={{ padding: '8px' }}>
                            <span className={`badge ${sample.status === 'Results Received' ? 'badge-success' : 'badge-warning'}`}>
                              {sample.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUB-TAB 4: SMART REPORTS & DELTA CHECK */}
              {labSubTab === 'smart_reports' && (
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>📊 Smart Lab Reports, Delta Check & QR Authentication</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-secondary" style={{ fontSize: '11px' }} onClick={() => setShowDeltaCheckModal(true)}>📈 View Historical Delta Check</button>
                      <button className="btn btn-secondary" style={{ fontSize: '11px' }} onClick={() => setShowQrVerifyModal(true)}>🔒 Verify QR Hash</button>
                    </div>
                  </div>

                  <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-card)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '14px' }}>SIYANCARE DIAGNOSTICS & PATHOLOGY</strong>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>NABL Accredited Laboratory | License #NABL-2026-8804 (Report #{selectedLabReportId})</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className="badge badge-success">✅ Digitally Signed & Authenticated</span>
                      </div>
                    </div>

                    <div className="grid grid-2" style={{ gap: '12px', margin: '12px 0', fontSize: '11px' }}>
                      <div>Patient Name: <strong>Aarav Sharma</strong> (UHID: PX-2026-9041)</div>
                      <div>Sample Barcode: <strong>BC-99041288</strong></div>
                      <div>Referred By: <strong>Dr. Sandeep Mehta</strong></div>
                      <div>Report Date: <strong>2026-08-08 09:30 AM</strong></div>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', margin: '12px 0' }}>
                      <thead>
                        <tr style={{ background: 'var(--bg-muted)', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                          <th style={{ padding: '6px' }}>Test Parameter</th>
                          <th style={{ padding: '6px' }}>Observed Result</th>
                          <th style={{ padding: '6px' }}>Previous (Delta)</th>
                          <th style={{ padding: '6px' }}>Reference Range</th>
                          <th style={{ padding: '6px' }}>Status Indicator</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '6px' }}>Hemoglobin (Hb)</td>
                          <td style={{ padding: '6px', fontWeight: 600 }}>14.2 g/dL</td>
                          <td style={{ padding: '6px', color: 'var(--text-muted)' }}>13.9 g/dL (+2.1%)</td>
                          <td style={{ padding: '6px' }}>13.5 - 17.5 g/dL</td>
                          <td style={{ padding: '6px' }}><span className="badge badge-success">Normal</span></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '6px' }}>Total Leukocyte Count (TLC)</td>
                          <td style={{ padding: '6px', fontWeight: 600 }}>11,400 /uL</td>
                          <td style={{ padding: '6px', color: 'var(--warning)' }}>8,200 /uL (+39% Delta Alert)</td>
                          <td style={{ padding: '6px' }}>4,000 - 11,000 /uL</td>
                          <td style={{ padding: '6px' }}><span className="badge badge-warning">High</span></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '6px' }}>Fasting Blood Sugar (FBS)</td>
                          <td style={{ padding: '6px', fontWeight: 600, color: 'var(--danger)' }}>184 mg/dL</td>
                          <td style={{ padding: '6px', color: 'var(--danger)' }}>110 mg/dL (+67% Critical Shift)</td>
                          <td style={{ padding: '6px' }}>70 - 100 mg/dL</td>
                          <td style={{ padding: '6px' }}><span className="badge badge-danger">Critical Panic</span></td>
                        </tr>
                      </tbody>
                    </table>

                    {/* QR Code Stamp Box */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-muted)', padding: '10px', borderRadius: '6px', marginTop: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ background: 'white', padding: '6px', borderRadius: '4px', border: '1px solid #000', cursor: 'pointer' }} onClick={() => setShowQrVerifyModal(true)}>
                          <div style={{ fontSize: '10px', fontWeight: 'bold', fontFamily: 'monospace', color: 'black' }}>[ QR-CODE ]</div>
                        </div>
                        <div style={{ fontSize: '10px' }}>
                          <strong>Scan QR for Authentication</strong><br/>
                          <span style={{ color: 'var(--text-muted)' }}>SHA-256: 8f4e2b...9a0c1 (Cryptographically Signed)</span>
                        </div>
                      </div>
                      <button className="btn btn-primary" style={{ fontSize: '10px', padding: '4px 10px' }} onClick={() => setShowQrVerifyModal(true)}>Verify Authenticity</button>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 5: REAGENTS & KITS INVENTORY */}
              {labSubTab === 'reagents_inventory' && (
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>🧪 Reagent Kits, Calibrators & Consumables Inventory</h3>
                    <button className="btn btn-primary" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => setShowReagentModal(true)}>➕ Add Reagent Stock</button>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: 'var(--bg-muted)' }}>
                        <th style={{ padding: '8px' }}>Reagent ID</th>
                        <th style={{ padding: '8px' }}>Reagent Kit Name</th>
                        <th style={{ padding: '8px' }}>Lot Number</th>
                        <th style={{ padding: '8px' }}>Stock Level</th>
                        <th style={{ padding: '8px' }}>Expiry Date</th>
                        <th style={{ padding: '8px' }}>Alert Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reagentsList.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '8px' }}><span className="badge badge-secondary">{item.id}</span></td>
                          <td style={{ padding: '8px', fontWeight: 600 }}>{item.name}</td>
                          <td style={{ padding: '8px' }}><span style={{ fontFamily: 'monospace' }}>{item.lot}</span></td>
                          <td style={{ padding: '8px' }}>{item.stockLevel} {item.unit}</td>
                          <td style={{ padding: '8px' }}>{item.expiry}</td>
                          <td style={{ padding: '8px' }}>
                            <span className={`badge ${item.status === 'Optimal' ? 'badge-success' : 'badge-warning'}`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUB-TAB 6: FINANCE & REFERRAL SPLIT */}
              {labSubTab === 'finance_referral' && (
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>💰 Referring Doctor Revenue Sharing & Payout Ledger</h3>
                    <button className="btn btn-success" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => {
                      setRefDoctorEarnings(prev => prev.map(item => ({ ...item, status: 'Disbursed' })));
                      addToast('success', 'Monthly Doctor Referral Payouts Disbursed to Bank Accounts!');
                    }}>Disburse Payouts</button>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: 'var(--bg-muted)' }}>
                        <th style={{ padding: '8px' }}>Doctor Name</th>
                        <th style={{ padding: '8px' }}>Test Referred</th>
                        <th style={{ padding: '8px' }}>Total Fee</th>
                        <th style={{ padding: '8px' }}>Share %</th>
                        <th style={{ padding: '8px' }}>Doctor Payout</th>
                        <th style={{ padding: '8px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {refDoctorEarnings.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '8px', fontWeight: 600 }}>{item.doctorName}</td>
                          <td style={{ padding: '8px' }}>{item.testName}</td>
                          <td style={{ padding: '8px' }}>₹{item.fee}</td>
                          <td style={{ padding: '8px' }}>{item.sharePercent}%</td>
                          <td style={{ padding: '8px', fontWeight: 700, color: 'var(--success)' }}>₹{item.payout}</td>
                          <td style={{ padding: '8px' }}>
                            <span className={`badge ${item.status === 'Disbursed' ? 'badge-success' : item.status === 'Approved' ? 'badge-primary' : 'badge-warning'}`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUB-TAB 7: AI INSIGHTS & TAT ANALYTICS */}
              {labSubTab === 'ai_analytics' && (
                <div className="card">
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>🤖 Premium AI Lab Analytics & Turnaround Time (TAT) Engine</h3>

                  <div className="grid grid-3" style={{ gap: '12px' }}>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                      <strong>AI Abnormal Result Detection</strong>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Flags 99.4% of panic values prior to pathologist signoff.</p>
                      <span className="badge badge-success" style={{ marginTop: '6px' }}>Active</span>
                    </div>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                      <strong>Avg Turnaround Time (TAT)</strong>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Routine: 42 mins | STAT Emergency: 18 mins</p>
                      <span className="badge badge-primary" style={{ marginTop: '6px' }}>Top 5% Efficiency</span>
                    </div>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                      <strong>AI Quality Control (QC) Insights</strong>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Automated Westgard rule evaluation on analyzer controls.</p>
                      <span className="badge badge-success" style={{ marginTop: '6px' }}>Pass (1s, 2s rules)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* BARCODE / QR PRINT MODAL */}
              {showBarcodeModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '420px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>🖨️ Sample Barcode & QR Label Printer</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowBarcodeModal(false)}>✕</button>
                    </div>

                    <div style={{ marginTop: '12px', padding: '12px', border: '2px dashed var(--primary)', borderRadius: '6px', textAlign: 'center', background: 'white', color: 'black' }}>
                      <div style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '16px' }}>*BC-99041288*</div>
                      <div style={{ fontSize: '11px', fontWeight: 600, marginTop: '4px' }}>Aarav Sharma (PX-2026-9041)</div>
                      <div style={{ fontSize: '10px', color: '#555' }}>EDTA Blood • Complete Blood Count (CBC)</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                      <button className="btn btn-secondary" onClick={() => setShowBarcodeModal(false)}>Close</button>
                      <button className="btn btn-primary" onClick={() => {
                        addToast('success', 'Printed 2 Copies of Sample Barcode Label #BC-99041288!');
                        setShowBarcodeModal(false);
                      }}>Print Barcode Label</button>
                    </div>
                  </div>
                </div>
              )}

              {/* HISTORICAL DELTA CHECK MODAL */}
              {showDeltaCheckModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '520px', maxWidth: '90%', borderLeft: '4px solid var(--warning)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--warning)' }}>📊 Historical Delta Check Comparison Engine</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowDeltaCheckModal(false)}>✕</button>
                    </div>

                    <div style={{ marginTop: '12px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ padding: '8px', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '4px', border: '1px solid var(--warning)' }}>
                        <strong>⚠️ Fasting Blood Sugar Delta Alert (+67% Sudden Increase)</strong>
                        <p style={{ marginTop: '2px' }}>Current: 184 mg/dL (Aug 08) vs Previous: 110 mg/dL (Jul 12). Automatically flagged for Pathologist review.</p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                        <button className="btn btn-primary" onClick={() => setShowDeltaCheckModal(false)}>Acknowledge Delta Alert</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* REAGENT STOCK RECEIVER MODAL */}
              {showReagentModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '450px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>🧪 Receive Reagent & Kit Stock</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowReagentModal(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setReagentsList(prev => [...prev, { id: `REG-${500 + prev.length + 1}`, name: 'Roche Cobas c501 Glucose Assay Kit', lot: 'LOT-RC-9904-C', stockLevel: 10, minThreshold: 4, unit: 'Kits', expiry: '2027-12-31', status: 'Optimal' }]);
                      addToast('success', 'Added new Reagent stock batch to Inventory!');
                      setShowReagentModal(false);
                    }} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      
                      <div className="form-group">
                        <label className="form-label">Reagent Kit Name</label>
                        <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} defaultValue="Roche Cobas c501 Glucose Assay Kit" required />
                      </div>

                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Lot Number</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} defaultValue="LOT-RC-9904-C" required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Quantity Received</label>
                          <input type="number" className="form-input" style={{ height: '30px', fontSize: '11px' }} defaultValue={10} required />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowReagentModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Receive Stock Batch</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ONLINE TEST BOOKING MODAL */}
              {showLabBookingModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>🌐 Book Diagnostic Test Online</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowLabBookingModal(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      addToast('success', `Online test booking confirmed for ${newLabPatientName || 'Patient'}! Barcode generated.`);
                      setShowLabBookingModal(false);
                    }} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      
                      <div className="form-group">
                        <label className="form-label">Patient Name</label>
                        <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} placeholder="e.g. Aarav Sharma" value={newLabPatientName} onChange={(e) => setNewLabPatientName(e.target.value)} required />
                      </div>

                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Diagnostic Category</label>
                          <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newLabCategory} onChange={(e) => setNewLabCategory(e.target.value as any)}>
                            <option value="pathology">Pathology (Blood/Urine)</option>
                            <option value="radiology">Radiology (X-Ray/CT/MRI)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Test Panel Name</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newLabTestName} onChange={(e) => setNewLabTestName(e.target.value)} required />
                        </div>
                      </div>

                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Collection Mode</label>
                          <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newLabCollectionMode} onChange={(e) => setNewLabCollectionMode(e.target.value as any)}>
                            <option value="home">Home Sample Pickup</option>
                            <option value="walkin">Hospital Walk-In</option>
                            <option value="corporate">Corporate Health Drive</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Referred Doctor</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newLabRefDoctor} onChange={(e) => setNewLabRefDoctor(e.target.value)} />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowLabBookingModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Confirm Booking</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* SMART REPORT VIEW MODAL */}
              {showSmartReportModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '520px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>📄 Smart Digital Pathology Report #{selectedLabReportId}</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowSmartReportModal(false)}>✕</button>
                    </div>

                    <div style={{ marginTop: '12px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ padding: '8px', background: 'var(--bg-muted)', borderRadius: '4px' }}>
                        <strong>Patient:</strong> Aarav Sharma (PX-2026-9041) | <strong>Barcoded Sample:</strong> BC-99041288
                      </div>
                      <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                        <strong>Observed Results:</strong> Hemoglobin: 14.2 g/dL (Normal) | Fasting Glucose: 184 mg/dL (High)
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button className="btn btn-secondary" onClick={() => setShowSmartReportModal(false)}>Close</button>
                        <button className="btn btn-primary" onClick={() => setShowQrVerifyModal(true)}>Verify Cryptographic QR</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* QR CODE AUTHENTICATION VERIFIER MODAL */}
              {showQrVerifyModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '480px', maxWidth: '90%', borderLeft: '4px solid var(--success)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>🔒 QR-Code Report Authentication Result</span>
                      </h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowQrVerifyModal(false)}>✕</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', fontSize: '11px' }}>
                      <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '4px', border: '1px solid var(--success)' }}>
                        <strong style={{ color: 'var(--success)' }}>✅ REPORT INTEGRITY VERIFIED (100% AUTHENTIC)</strong>
                        <p style={{ marginTop: '4px', color: 'var(--text-main)' }}>
                          This report digital hash matches the original signature on the SiyanCare HMS blockchain ledger.
                        </p>
                      </div>

                      <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text-muted)' }}>
                        • <strong>Issuing Laboratory:</strong> SiyanCare Central Pathology (NABL-2026-8804)<br/>
                        • <strong>Signing Pathologist:</strong> Dr. Rajesh K (MD Pathology, Lic #MP-9011)<br/>
                        • <strong>Cryptographic SHA-256 Hash:</strong> <span style={{ fontFamily: 'monospace' }}>8f4e2b3c9a1d...e001</span><br/>
                        • <strong>Timestamp:</strong> 2026-08-08 09:30:12 AM
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                        <button className="btn btn-primary" onClick={() => setShowQrVerifyModal(false)}>Close Verification</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
  );
};
