import React from 'react';
import { Bed } from 'lucide-react';

export interface IpdModuleProps {
  [key: string]: any;
}

export const IpdModule: React.FC<IpdModuleProps> = (props) => {
  const {
    activeTab = 'wards',
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

  const [ipdTab, setIpdTab] = React.useState('overview');
  const [selectedIpdPatientId, setSelectedIpdPatientId] = React.useState('PX-2026-9041');
  const [showAdmissionModal, setShowAdmissionModal] = React.useState(false);
  const [newAdmissionName, setNewAdmissionName] = React.useState('');
  const [newAdmissionUnit, setNewAdmissionUnit] = React.useState('General Ward');
  const [newAdmissionBed, setNewAdmissionBed] = React.useState('BED-101');
  const [newAdmissionConsultant, setNewAdmissionConsultant] = React.useState('Dr. Sandeep Mehta');
  const [newAdmissionAcuity, setNewAdmissionAcuity] = React.useState('Moderate');
  const [otPatientId, setOtPatientId] = React.useState('');
  const [otSurgeryName, setOtSurgeryName] = React.useState('');
  const [otAnesthesiaReady, setOtAnesthesiaReady] = React.useState(false);
  const [otDigitalConsent, setOtDigitalConsent] = React.useState(false);
  const [ivIntake, setIvIntake] = React.useState('1000');
  const [oralIntake, setOralIntake] = React.useState('500');
  const [urineOutput, setUrineOutput] = React.useState('800');
  const [drainOutput, setDrainOutput] = React.useState('100');
  const [selectedBedForTransfer, setSelectedBedForTransfer] = React.useState('');
  const [transferTargetBed, setTransferTargetBed] = React.useState('');
  const [icuBeds, setIcuBeds] = React.useState([
    {
      id: 'PX-2026-9041',
      bedNo: 'ICU-A2',
      unit: 'CCU',
      patientName: 'Aarav Sharma',
      age: '58M',
      acuityStatus: 'stable',
      consultant: 'Dr. Sandeep Mehta',
      dutyNurse: 'Sister Priya',
      ventilatorStatus: 'FiO2 40% | PEEP 5',
      pendingTasks: '12:00 IV Antibiotic',
      bp: '135/85',
      map: 101,
      cvp: '8.5 cmH2O',
      fio2: '40%',
      peep: '5 cmH2O',
      cardiacOutput: '5.2 L/min',
      svo2: '72%',
      abgPh: '7.39',
      abgPaCO2: '38',
      abgPaO2: '96',
      drips: 'Norad 0.04 mcg/kg/min',
      statOrdersCount: 2
    },
    {
      id: 'PX-2026-9042',
      bedNo: 'ICU-A3',
      unit: 'SICU',
      patientName: 'Ramesh Sen',
      age: '64M',
      acuityStatus: 'observation',
      consultant: 'Dr. Ananya Ray',
      dutyNurse: 'Sister Anjali',
      ventilatorStatus: 'FiO2 50% | PEEP 8',
      pendingTasks: 'Ventilator Weaning Trial',
      bp: '145/92',
      map: 109,
      cvp: '11.2 cmH2O',
      fio2: '50%',
      peep: '8 cmH2O',
      cardiacOutput: '4.8 L/min',
      svo2: '68%',
      abgPh: '7.32',
      abgPaCO2: '46',
      abgPaO2: '88',
      drips: 'Dobutamine 0.08 mcg/kg/min',
      statOrdersCount: 1
    },
    {
      id: 'PX-2026-9043',
      bedNo: 'ICU-B2',
      unit: 'Neuro ICU',
      patientName: 'Kabir Khan',
      age: '42M',
      acuityStatus: 'critical',
      consultant: 'Dr. Deepa Roy',
      dutyNurse: 'Sister Kavita',
      ventilatorStatus: 'Off Vent (Nasal 2L)',
      pendingTasks: 'Step-down Transfer',
      bp: '110/65',
      map: 80,
      cvp: '6.5 cmH2O',
      fio2: 'Room Air',
      peep: 'None',
      cardiacOutput: '5.8 L/min',
      svo2: '75%',
      abgPh: '7.42',
      abgPaCO2: '35',
      abgPaO2: '98',
      drips: 'Dopamine 0.05 mcg/kg/min',
      statOrdersCount: 0
    }
  ]);
  const selectedIpdPatient = (props.patients || []).find((p: any) => p.id === selectedIpdPatientId) || props.patients?.[0];


  return (
            <div className="flex flex-col gap-lg" style={{ width: '100%' }}>
              {/* Digital Ward Whiteboard Banner */}
              <div className="card">
                <div className="card-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>📋 Digital Ward Whiteboard & IPD Operations</span>
                      <span className="badge badge-success">Live Shared Record Sync</span>
                    </h2>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Real-time cross-department tracking: Doctors, Nurses, Pharmacy, Labs, and Billing working on 1 shared inpatient record.</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ fontSize: '11px', padding: '6px 12px' }}
                    onClick={() => setShowAdmissionModal(true)}
                  >
                    ➕ New Inpatient Admission
                  </button>
                </div>

                <div className="grid grid-4" style={{ gap: '12px', marginTop: '12px' }}>
                  <div style={{ padding: '10px', backgroundColor: 'var(--bg-muted)', borderRadius: '6px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Ward Occupancy Rate</span>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary)' }}>85.7% (12/14)</h4>
                  </div>
                  <div style={{ padding: '10px', backgroundColor: 'var(--bg-muted)', borderRadius: '6px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Average Length of Stay (ALOS)</span>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--success)' }}>3.4 Days</h4>
                  </div>
                  <div style={{ padding: '10px', backgroundColor: 'var(--bg-muted)', borderRadius: '6px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Pending Discharges Today</span>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--warning)' }}>2 Patients</h4>
                  </div>
                  <div style={{ padding: '10px', backgroundColor: 'var(--bg-muted)', borderRadius: '6px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Automatic Billing Ledger Sync</span>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--success)' }}>₹1,42,800</h4>
                  </div>
                </div>

                {/* Live Digital Ward Whiteboard Table */}
                <div style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>🖥️ Admitted Inpatients Live Whiteboard Ledger</span>
                    </h3>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Updated live by Doctor, Nurse, Pharmacy, Lab & Billing</span>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: 'var(--bg-muted)' }}>
                        <th style={{ padding: '8px 10px' }}>Bed #</th>
                        <th style={{ padding: '8px 10px' }}>Patient Name & ID</th>
                        <th style={{ padding: '8px 10px' }}>Assigned Doctor</th>
                        <th style={{ padding: '8px 10px' }}>Assigned Nurse</th>
                        <th style={{ padding: '8px 10px' }}>Vitals & GCS</th>
                        <th style={{ padding: '8px 10px' }}>Diet Order</th>
                        <th style={{ padding: '8px 10px' }}>Readiness Score</th>
                        <th style={{ padding: '8px 10px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '8px 10px' }}><span className="badge badge-primary">ICU-A2</span></td>
                        <td style={{ padding: '8px 10px', fontWeight: 600 }}>Aarav Sharma (PX-2026-9041)</td>
                        <td style={{ padding: '8px 10px' }}>Dr. Sandeep Mehta</td>
                        <td style={{ padding: '8px 10px' }}>Nurse Sister Priya</td>
                        <td style={{ padding: '8px 10px' }}>BP 135/85 | HR 78 | GCS 15</td>
                        <td style={{ padding: '8px 10px' }}><span className="badge badge-success">DASH Low Sodium</span></td>
                        <td style={{ padding: '8px 10px' }}><strong style={{ color: 'var(--success)' }}>88% Ready</strong></td>
                        <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                          <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => { setSelectedIpdPatientId('PX-2026-9041'); addToast('info', 'Swapped dashboard to Aarav Sharma (ICU-A2)'); }}>Inspect Dashboard</button>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '8px 10px' }}><span className="badge badge-warning">ICU-A3</span></td>
                        <td style={{ padding: '8px 10px', fontWeight: 600 }}>Ramesh Sen (PX-2026-9042)</td>
                        <td style={{ padding: '8px 10px' }}>Dr. Ananya Ray</td>
                        <td style={{ padding: '8px 10px' }}>Nurse Sister Anjali</td>
                        <td style={{ padding: '8px 10px' }}>BP 145/92 | HR 88 | GCS 14</td>
                        <td style={{ padding: '8px 10px' }}><span className="badge badge-secondary">Diabetic Soft Diet</span></td>
                        <td style={{ padding: '8px 10px' }}><strong style={{ color: 'var(--warning)' }}>65% (Lab Pending)</strong></td>
                        <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                          <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => { setSelectedIpdPatientId('PX-2026-9042'); addToast('info', 'Swapped dashboard to Ramesh Sen (ICU-A3)'); }}>Inspect Dashboard</button>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '8px 10px' }}><span className="badge badge-secondary">ICU-B2</span></td>
                        <td style={{ padding: '8px 10px', fontWeight: 600 }}>Kabir Khan (PX-2026-9043)</td>
                        <td style={{ padding: '8px 10px' }}>Dr. Deepa Roy</td>
                        <td style={{ padding: '8px 10px' }}>Nurse Sister Kavita</td>
                        <td style={{ padding: '8px 10px' }}>BP 128/78 | HR 72 | GCS 15</td>
                        <td style={{ padding: '8px 10px' }}><span className="badge badge-success">Regular Renal</span></td>
                        <td style={{ padding: '8px 10px' }}><strong style={{ color: 'var(--success)' }}>92% Ready</strong></td>
                        <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                          <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => { setSelectedIpdPatientId('PX-2026-9043'); addToast('info', 'Swapped dashboard to Kabir Khan (ICU-B2)'); }}>Inspect Dashboard</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Inpatient Admission Workflow Modal */}
              {showAdmissionModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                  <div className="card" style={{ width: '520px', maxWidth: '90%', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600 }}>🏥 New IPD Admission & Approval Workflow</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '12px' }} onClick={() => setShowAdmissionModal(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const newId = `PX-2026-${9040 + icuBeds.length + 1}`;
                      setIcuBeds(prev => [
                        ...prev,
                        {
                          id: newId,
                          bedNo: newAdmissionBed || 'ICU-B3',
                          unit: newAdmissionUnit,
                          patientName: newAdmissionName || 'New Admitted Patient',
                          age: '45M',
                          acuityStatus: newAdmissionAcuity,
                          consultant: newAdmissionConsultant,
                          dutyNurse: 'Sister Priya',
                          ventilatorStatus: 'FiO2 40% | PEEP 5',
                          pendingTasks: 'Initial Assessment',
                          bp: '120/80',
                          map: 93,
                          cvp: '8.0 cmH2O',
                          fio2: '40%',
                          peep: '5 cmH2O',
                          cardiacOutput: '5.0 L/min',
                          svo2: '70%',
                          abgPh: '7.40',
                          abgPaCO2: '40',
                          abgPaO2: '95',
                          drips: 'IV Normal Saline @ 100mL/hr',
                          statOrdersCount: 0
                        }
                      ]);
                      setShowAdmissionModal(false);
                      setNewAdmissionName('');
                      addToast('success', `Admitted ${newAdmissionName || 'New Patient'} to Bed ${newAdmissionBed || 'ICU-B3'} dynamically!`);
                    }} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>

                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Patient Full Name</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} placeholder="Enter Patient Name" value={newAdmissionName} onChange={(e) => setNewAdmissionName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Specialty Unit</label>
                          <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newAdmissionUnit} onChange={(e) => setNewAdmissionUnit(e.target.value)}>
                            <option value="CCU">Cardiovascular ICU (CCU)</option>
                            <option value="NICU">Neonatal ICU (NICU)</option>
                            <option value="PICU">Pediatric ICU (PICU)</option>
                            <option value="SICU">Surgical ICU (SICU)</option>
                            <option value="Neuro ICU">Neuro ICU</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Target Bed No.</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newAdmissionBed} onChange={(e) => setNewAdmissionBed(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Assigned Consultant</label>
                          <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newAdmissionConsultant} onChange={(e) => setNewAdmissionConsultant(e.target.value)}>
                            <option value="Dr. Sandeep Mehta">Dr. Sandeep Mehta (CCU)</option>
                            <option value="Dr. Ananya Ray">Dr. Ananya Ray (SICU)</option>
                            <option value="Dr. Deepa Roy">Dr. Deepa Roy (Neuro ICU)</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Initial Acuity Status</label>
                        <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newAdmissionAcuity} onChange={(e) => setNewAdmissionAcuity(e.target.value as any)}>
                          <option value="critical">🔴 Critical Care</option>
                          <option value="observation">🟡 Observation</option>
                          <option value="stable">🟢 Stable</option>
                        </select>
                      </div>

                      <div style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '10px', backgroundColor: 'var(--bg-muted)' }}>
                        <strong>Admission Approval Checklist:</strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <input type="checkbox" defaultChecked /> Vitals Triage & Initial Screening Logged
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <input type="checkbox" defaultChecked /> Signed Digital Inpatient Consent Form
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <input type="checkbox" defaultChecked /> CMO Clinical Approval Sign-off
                          </label>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowAdmissionModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Approve & Admit Patient</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="grid gap-lg" style={{ gridTemplateColumns: '1.4fr 1.6fr' }}>
                <div className="flex flex-col gap-lg">
                <div className="card">
                  <div className="card-header">
                    <div>
                      <h2>IPD Bed Matrix & Wards</h2>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Click bed to inspect IPD patient dashboards.</div>
                    </div>
                  </div>

                  {/* ICU Wards Grid */}
                  <div style={{ marginTop: '16px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>ICU / Isolation Beds</h3>
                    <div className="wards-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                      {branchBeds.filter(b => b.type === 'ICU' || b.type === 'Isolation').map(bed => (
                        <div
                          key={bed.id}
                          className={`bed-card ${
                            bed.status === 'occupied' ? 'occupied' :
                            bed.status === 'vacant' ? 'vacant' :
                            bed.status === 'isolated' ? 'isolated' : 'critical'
                          } ${selectedIpdPatient.bedNumber === bed.id ? 'active-bed' : ''}`}
                          style={{ cursor: 'pointer', padding: '12px' }}
                          onClick={() => {
                            if (bed.patientId) {
                              setSelectedIpdPatientId(bed.patientId);
                            } else {
                              addToast('info', `Bed ${bed.id} is vacant. Assign a patient via Triage or Admission.`);
                            }
                          }}
                        >
                          <div className="flex justify-between align-center">
                            <strong style={{ fontSize: '12px' }}>{bed.id}</strong>
                            <span style={{ fontSize: '8px', textTransform: 'uppercase' }}>{bed.type}</span>
                          </div>
                          <div style={{ fontSize: '11px', fontWeight: 600, marginTop: '4px', minHeight: '16px' }}>
                            {bed.patientName || <span style={{ color: 'var(--success)' }}>VACANT</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* General / Emergency Beds Grid */}
                  <div style={{ marginTop: '24px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>General & Emergency Triage Bays</h3>
                    <div className="wards-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                      {branchBeds.filter(b => b.type === 'General' || b.type === 'Emergency').map(bed => (
                        <div
                          key={bed.id}
                          className={`bed-card ${bed.status === 'occupied' ? 'occupied' : 'vacant'} ${selectedIpdPatient.bedNumber === bed.id ? 'active-bed' : ''}`}
                          style={{ cursor: 'pointer', padding: '12px' }}
                          onClick={() => {
                            if (bed.patientId) {
                              setSelectedIpdPatientId(bed.patientId);
                            }
                          }}
                        >
                          <div className="flex justify-between align-center">
                            <strong style={{ fontSize: '12px' }}>{bed.id}</strong>
                            <span style={{ fontSize: '8px', textTransform: 'uppercase' }}>{bed.type}</span>
                          </div>
                          <div style={{ fontSize: '11px', fontWeight: 600, marginTop: '4px', minHeight: '16px' }}>
                            {bed.patientName || <span style={{ color: 'var(--success)' }}>VACANT</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* OT Surgery Reservation builder */}
                <div className="card">
                  <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>OT Reserve & Operative Scheduler</h3>
                  <form onSubmit={handleScheduleSurgery} className="flex flex-col gap-sm">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Patient Selection</label>
                      <select
                        className="form-input"
                        value={otPatientId}
                        onChange={(e) => setOtPatientId(e.target.value)}
                        style={{ height: '32px', fontSize: '12px' }}
                      >
                        <option value="">Choose Patient...</option>
                        {branchPatients.map(p => (
                          <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Planned Operative Procedure</label>
                      <input
                        type="text"
                        placeholder="e.g. Laparoscopic Cholecystectomy, CABG"
                        className="form-input"
                        value={otSurgeryName}
                        onChange={(e) => setOtSurgeryName(e.target.value)}
                        style={{ height: '32px', fontSize: '12px' }}
                      />
                    </div>
                    <div className="flex gap-md" style={{ marginTop: '4px' }}>
                      <label className="flex align-center gap-sm text-xs" style={{ cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={otAnesthesiaReady}
                          onChange={(e) => setOtAnesthesiaReady(e.target.checked)}
                        />
                        <span>Anesthetic Prep Done</span>
                      </label>
                      <label className="flex align-center gap-sm text-xs" style={{ cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={otDigitalConsent}
                          onChange={(e) => setOtDigitalConsent(e.target.checked)}
                        />
                        <span>Signed Digital Consent Form</span>
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ height: '32px', marginTop: '8px' }}>
                      Reserve Operative OT
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column: Advanced IPD Nursing Care Plan & ADT Dashboard */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignSelf: 'start', position: 'sticky', top: '20px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div className="flex justify-between align-center">
                    <h2 style={{ fontSize: '16px' }}>IPD Nursing Dashboard: {selectedIpdPatient.name}</h2>
                    <span className="badge badge-primary">{selectedIpdPatient.bedNumber || "No Bed Assigned"}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    ESI: {selectedIpdPatient.esiScore} | Blood: {selectedIpdPatient.bloodGroup} | Vitals: BP {selectedIpdPatient.vitals.bloodPressure}, HR {selectedIpdPatient.vitals.heartRate} bpm
                  </div>
                </div>

                {/* Sub-tabs toggler */}
                <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', flexWrap: 'wrap' }}>
                  <button onClick={() => setIpdTab('overview')} style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', background: ipdTab === 'overview' ? 'var(--primary)' : 'transparent', color: ipdTab === 'overview' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>Overview</button>
                  <button onClick={() => setIpdTab('emar')} style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: ipdTab === 'emar' ? 'var(--primary)' : 'transparent', color: ipdTab === 'emar' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>eMAR Logs</button>
                  <button onClick={() => setIpdTab('fluid')} style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: ipdTab === 'fluid' ? 'var(--primary)' : 'transparent', color: ipdTab === 'fluid' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>Fluid I/O</button>
                  <button onClick={() => setIpdTab('gcs')} style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: ipdTab === 'gcs' ? 'var(--primary)' : 'transparent', color: ipdTab === 'gcs' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>GCS Calc</button>
                  <button onClick={() => setIpdTab('transfer')} style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: ipdTab === 'transfer' ? 'var(--primary)' : 'transparent', color: ipdTab === 'transfer' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>ADT Room</button>
                  <button onClick={() => setIpdTab('rounds')} style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: ipdTab === 'rounds' ? 'var(--primary)' : 'transparent', color: ipdTab === 'rounds' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>Rounds & Tasks</button>
                  <button onClick={() => setIpdTab('readiness')} style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: ipdTab === 'readiness' ? 'var(--primary)' : 'transparent', color: ipdTab === 'readiness' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>Discharge Score</button>
                  <button onClick={() => setIpdTab('icu')} style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', background: ipdTab === 'icu' ? 'var(--primary)' : 'transparent', color: ipdTab === 'icu' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>Specialty ICU</button>
                </div>

                {/* Sub-tab: Clinical Overview */}
                {ipdTab === 'overview' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
                    <div style={{ padding: '10px', backgroundColor: 'var(--bg-muted)', borderRadius: '6px' }}>
                      <strong>Active Nursing Care Directives:</strong>
                      <ul style={{ paddingLeft: '16px', marginTop: '6px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <li>Perform vitals check every 2 hours.</li>
                        <li>Maintain accurate hourly fluid logs (Target output &gt; 30mL/hr).</li>
                        <li>Log GCS scoring on each nursing shift transition.</li>
                      </ul>
                    </div>
                    
                    {/* Staff Assignment & Demographics details */}
                    <div className="grid grid-2" style={{ gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Assign Attending Clinician</label>
                        <select
                          className="form-input"
                          style={{ height: '30px', fontSize: '11px' }}
                          defaultValue="Dr. Sandeep Mehta"
                          onChange={(e) => addToast('success', `Assigned Primary Clinician: ${e.target.value} for patient ${selectedIpdPatient.name}`)}
                        >
                          <option value="Dr. Sandeep Mehta">Dr. Sandeep Mehta (Cardiology)</option>
                          <option value="Dr. Ananya Ray">Dr. Ananya Ray (Internal Medicine)</option>
                          <option value="Dr. Deepa Roy">Dr. Deepa Roy (Critical Care)</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Assign Duty Nurse</label>
                        <select
                          className="form-input"
                          style={{ height: '30px', fontSize: '11px' }}
                          defaultValue="Nurse Sister Priya"
                          onChange={(e) => addToast('success', `Assigned Duty Nurse: ${e.target.value} for patient ${selectedIpdPatient.name}`)}
                        >
                          <option value="Nurse Sister Priya">Nurse Sister Priya (Shift Lead)</option>
                          <option value="Nurse Sister Anjali">Nurse Sister Anjali (ICU Specialist)</option>
                          <option value="Nurse Sister Kavita">Nurse Sister Kavita (General Ward)</option>
                        </select>
                      </div>
                    </div>

                    {/* ADT Discharge Patient Section */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ fontSize: '12px', color: 'var(--primary)' }}>ADT Patient Discharge Clearance</strong>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Generate discharge summary, clear bed assignment & release invoice.</div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ color: 'var(--danger)', borderColor: 'var(--danger)', padding: '4px 10px', fontSize: '11px' }}
                        onClick={() => {
                          // Discharge patient: mark bed vacant
                          if (selectedIpdPatient.bedNumber) {
                            setBeds(prev => prev.map(b => b.id === selectedIpdPatient.bedNumber ? { ...b, status: 'vacant', patientId: undefined, patientName: undefined } : b));
                            addToast('success', `ADT Discharge Processed: Patient ${selectedIpdPatient.name} discharged. Bed ${selectedIpdPatient.bedNumber} is now VACANT.`);
                          } else {
                            addToast('warning', "Patient is not assigned to an active bed.");
                          }
                        }}
                      >
                        🚪 Execute ADT Discharge
                      </button>
                    </div>
                  </div>
                )}

                {/* Sub-tab: eMAR Scheduled Medications */}
                {ipdTab === 'emar' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: 600 }}>Electronic Medication Administration Record (eMAR)</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedIpdPatient.emarList && selectedIpdPatient.emarList.length > 0 ? (
                        selectedIpdPatient.emarList.map(e => (
                          <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '12px' }}>{e.medication} ({e.dosage})</div>
                              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Route: {e.route} | Scheduled: {e.scheduledTime}</div>
                              {e.status === 'administered' && (
                                <div style={{ fontSize: '10px', color: 'var(--success)', marginTop: '2px' }}>Administered at: {e.administeredAt} by {e.administeredBy}</div>
                              )}
                            </div>
                            {e.status === 'pending' ? (
                              <button className="btn btn-success" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => handleAdministerEmar(selectedIpdPatient.id, e.id)}>
                                Administer Dose
                              </button>
                            ) : (
                              <span className="badge badge-success">Done</span>
                            )}
                          </div>
                        ))
                      ) : (
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '16px' }}>No scheduled IV medications logged.</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Sub-tab: Fluid Balance intake/output */}
                {ipdTab === 'fluid' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>Fluid Balance Ledger</span>
                      <span className={`badge ${calculatedNetFluid >= 0 ? 'badge-success' : 'badge-danger'}`}>
                        Net: {calculatedNetFluid} mL
                      </span>
                    </div>

                    {/* Fluid Logs database list */}
                    <div style={{ maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {selectedIpdPatient.fluidLogs && selectedIpdPatient.fluidLogs.map((fl, idx) => (
                        <div key={idx} className="flex justify-between text-xs" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                          <span>{fl.timestamp}</span>
                          <span style={{ color: 'var(--text-muted)' }}>Intake: {fl.intakeIv + fl.intakeOral}mL | Output: {fl.outputUrine + fl.outputDrain}mL</span>
                        </div>
                      ))}
                    </div>

                    {/* Add Fluid Log form */}
                    <form onSubmit={handleAddFluidLog} className="grid grid-2" style={{ gap: '8px' }}>
                      <input type="number" placeholder="IV Intake (mL)" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={ivIntake} onChange={(e) => setIvIntake(e.target.value)} />
                      <input type="number" placeholder="Oral Intake (mL)" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={oralIntake} onChange={(e) => setOralIntake(e.target.value)} />
                      <input type="number" placeholder="Urine Output (mL)" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={urineOutput} onChange={(e) => setUrineOutput(e.target.value)} />
                      <input type="number" placeholder="Drain Output (mL)" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={drainOutput} onChange={(e) => setDrainOutput(e.target.value)} />
                      <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 2', height: '30px' }}>
                        Add Fluid Entry
                      </button>
                    </form>
                  </div>
                )}

                {/* Sub-tab: Glasgow Coma Scale (GCS) Calculator */}
                {ipdTab === 'gcs' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="flex justify-between align-center">
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>Glasgow Coma Scale score</span>
                      <span className="badge badge-danger" style={{ fontSize: '13px', fontWeight: 'bold' }}>
                        GCS: {selectedIpdPatient.gcsScore || 15}/15
                      </span>
                    </div>

                    {/* Interactive GCS selectors */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                      <div>
                        <strong>Eye Opening (E):</strong>
                        <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                          {[4, 3, 2, 1].map(v => (
                            <button key={v} type="button" className={`btn ${selectedIpdPatient.gcsEye === v ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '2px 8px', fontSize: '10px' }} onClick={() => handleGcsSelect('eye', v)}>
                              {v === 4 ? "Spontaneous" : v === 3 ? "To Sound" : v === 2 ? "To Pain" : "None"}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginTop: '4px' }}>
                        <strong>Verbal Response (V):</strong>
                        <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                          {[5, 4, 3, 2, 1].map(v => (
                            <button key={v} type="button" className={`btn ${selectedIpdPatient.gcsVerbal === v ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '2px 8px', fontSize: '10px' }} onClick={() => handleGcsSelect('verbal', v)}>
                              {v === 5 ? "Oriented" : v === 4 ? "Confused" : v === 3 ? "Inappropriate" : v === 2 ? "Incomprehensible" : "None"}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginTop: '4px' }}>
                        <strong>Motor Response (M):</strong>
                        <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                          {[6, 5, 4, 3, 2, 1].map(v => (
                            <button key={v} type="button" className={`btn ${selectedIpdPatient.gcsMotor === v ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '2px 8px', fontSize: '10px' }} onClick={() => handleGcsSelect('motor', v)}>
                              {v === 6 ? "Obeys Commands" : v === 5 ? "Localizes Pain" : v === 4 ? "Withdraws" : v === 3 ? "Flexion" : v === 2 ? "Extension" : "None"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab: ADT Room Transfer */}
                {ipdTab === 'transfer' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: 600 }}>ADT Bed Transfer Request</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Moves patient to another bed in the clinic. Old bed will become vacant.</p>
                    
                    <form onSubmit={handleBedTransfer} className="flex flex-col gap-sm" style={{ marginTop: '8px' }}>
                      <div className="form-group">
                        <label className="form-label">Target Vacant Bed</label>
                        <select
                          className="form-input"
                          value={transferTargetBed}
                          onChange={(e) => setTransferTargetBed(e.target.value)}
                        >
                          <option value="">Select vacant bed...</option>
                          {branchBeds.filter(b => b.status === 'vacant').map(b => (
                            <option key={b.id} value={b.id}>{b.id} ({b.type})</option>
                          ))}
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary" disabled={!transferTargetBed}>
                        Execute ADT Bed Transfer
                      </button>
                    </form>
                  </div>
                )}

                {/* Sub-tab: Doctor Rounds & Nursing Task Scheduler */}
                {ipdTab === 'rounds' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '11px' }}>
                    {/* Doctor Rounds Manager */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--bg-muted)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '12px', color: 'var(--primary)' }}>🩺 Doctor Rounds Manager</strong>
                        <span className="badge badge-success">Morning Round Completed</span>
                      </div>
                      <div style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
                        <div>• <strong>Primary Attending:</strong> Dr. Sandeep Mehta (Cardiology)</div>
                        <div>• <strong>Round Time:</strong> 09:30 AM | <strong>Next Scheduled Round:</strong> 18:00 PM</div>
                        <div>• <strong>Clinical Directive:</strong> Continue IV Nitroglycerin titration. Check Troponin at 16:00.</div>
                      </div>
                    </div>

                    {/* Nursing Task Scheduler */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--primary)' }}>📋 Nursing Task Scheduler & Reminders</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                        <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                          <span>• 12:00 PM: IV Antibiotic Infusion (Ceftriaxone 1g)</span>
                          <span className="badge badge-warning">Due Now</span>
                        </div>
                        <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                          <span>• 14:00 PM: Surgical Dressing & Wound Inspection</span>
                          <span style={{ color: 'var(--text-muted)' }}>Scheduled</span>
                        </div>
                        <div className="flex justify-between align-center">
                          <span>• 15:00 PM: Shift Transition Vitals & GCS Scoring</span>
                          <span style={{ color: 'var(--text-muted)' }}>Scheduled</span>
                        </div>
                      </div>
                    </div>

                    {/* Diet & Nutrition Tracking */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--primary)' }}>🥗 Dietitian & Nutrition Order Status</strong>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                        <span>DASH Sodium-Restricted Therapeutic Meal (Lunch)</span>
                        <span className="badge badge-success">Delivered (12:15)</span>
                      </div>
                    </div>

                    {/* Family Communication Log */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--primary)' }}>💬 Family Communication & Attendant Log</strong>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        <div>• <strong>2026-08-08 09:45:</strong> Dr. Sandeep Mehta updated patient spouse regarding stable ECG results and expected 48h discharge plan.</div>
                      </div>
                    </div>

                    {/* Pain Scale & Morse Fall Risk Assessment */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--primary)' }}>⚡ Pain & Morse Fall Risk Assessment</strong>
                      <div className="grid grid-2" style={{ gap: '8px', marginTop: '6px' }}>
                        <div style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Pain Assessment Score (0-10)</span>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--warning)', marginTop: '2px' }}>3 / 10 (Mild Discomfort)</div>
                        </div>
                        <div style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Morse Fall Risk Rating</span>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--success)', marginTop: '2px' }}>Low Risk (15/125) • Bed Rails Up</div>
                        </div>
                      </div>
                    </div>

                    {/* Special Requisitions: Blood Bank, Physiotherapy & Procedures */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--primary)' }}>💉 Inpatient Special Requisitions</strong>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                        <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px' }} onClick={() => addToast('info', 'Blood Request Sent: 1 Unit PRBC O-Positive ordered from Blood Bank.')}>
                          🩸 Request Blood Unit
                        </button>
                        <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px' }} onClick={() => addToast('info', 'Physiotherapy Order Sent: Post-op Chest Mobility ordered.')}>
                          🏋️ Physiotherapy Order
                        </button>
                        <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px' }} onClick={() => addToast('info', 'Procedure Order Sent: Bedside Arterial Line Insertion.')}>
                          💉 IP Procedure Order
                        </button>
                      </div>
                    </div>

                    {/* Live IPD Alerts Stream */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.05)' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--danger)' }}>🔔 Live IPD Clinical Alerts Stream</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px', fontSize: '10px' }}>
                        <div>• <strong>Missed Dose Alert:</strong> Ciprofloxacin 400mg IV missed at 08:00 AM (Charge Nurse Alerted)</div>
                        <div>• <strong>Doctor Round Reminder:</strong> Dr. Sandeep Mehta Evening Round scheduled for 18:00 PM</div>
                        <div>• <strong>Investigation Ready Alert:</strong> Serum Troponin I result ready (0.02 ng/mL - Normal)</div>
                        <div>• <strong>Bed Availability:</strong> ICU Bed A1 sanitized & ready for direct admission</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab: AI Discharge Readiness & Readmission Prediction */}
                {ipdTab === 'readiness' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '11px' }}>
                    {/* Gauge Card */}
                    <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '6px', textAlign: 'center', backgroundColor: 'var(--bg-muted)' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Discharge Readiness Score</span>
                      <h2 style={{ fontSize: '28px', color: 'var(--success)', fontWeight: 700, margin: '4px 0' }}>88%</h2>
                      <span className="badge badge-success">High Readiness - Ready for Discharge Clearance</span>
                    </div>

                    {/* Readiness Checklist */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                      <strong style={{ fontSize: '12px' }}>Clearance Checklist:</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                        <div className="flex justify-between align-center">
                          <span>1. Primary Clinician Discharge Sign-off</span>
                          <span style={{ color: 'var(--success)', fontWeight: 600 }}>✅ APPROVED</span>
                        </div>
                        <div className="flex justify-between align-center">
                          <span>2. Pharmacy Discharge Take-Home Pack</span>
                          <span style={{ color: 'var(--success)', fontWeight: 600 }}>✅ DISPENSED</span>
                        </div>
                        <div className="flex justify-between align-center">
                          <span>3. Pathology & Diagnostic Lab Clearances</span>
                          <span style={{ color: 'var(--success)', fontWeight: 600 }}>✅ ALL CLEAR</span>
                        </div>
                        <div className="flex justify-between align-center">
                          <span>4. Cross-Department Automatic Billing Sync</span>
                          <span style={{ color: 'var(--success)', fontWeight: 600 }}>✅ SETTLED (₹48,500)</span>
                        </div>
                        <div className="flex justify-between align-center">
                          <span>5. Patient Education & Discharge Summary</span>
                          <span style={{ color: 'var(--warning)', fontWeight: 600 }}>⏳ Final Sign-off</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Predictions */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'rgba(37,99,235,0.05)' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--primary)' }}>🤖 AI IPD Predictive Analytics</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                        <div>• <strong>AI Predicted Length of Stay (ALOS):</strong> 3.2 Days (Expected: Aug 10, 14:00)</div>
                        <div>• <strong>30-Day Readmission Risk:</strong> <strong style={{ color: 'var(--success)' }}>8.4% [LOW RISK]</strong></div>
                        <div>• <strong>AI Bed Allocation Insight:</strong> Patient stable for step-down transfer to General Ward.</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab: 4.5 Specialty ICU Management */}
                {ipdTab === 'icu' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '11px' }}>
                    {/* ICU Specialty Unit Switcher */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--bg-muted)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '12px', color: 'var(--primary)' }}>🏥 Specialty ICU Unit Selection</strong>
                        <span className="badge badge-danger">Level-3 Critical Care</span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                        <button type="button" className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '10px' }}>Cardiovascular ICU (CCU)</button>
                        <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px' }}>Neonatal ICU (NICU)</button>
                        <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px' }}>Pediatric ICU (PICU)</button>
                        <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px' }}>Surgical ICU (SICU)</button>
                        <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px' }}>Neuro ICU</button>
                      </div>
                    </div>

                    {/* Real-time Invasive Telemetry & Treatment Monitoring */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--primary)' }}>📡 Continuous Invasive Telemetry & Vitals</strong>
                      <div className="grid grid-2" style={{ gap: '8px', marginTop: '8px' }}>
                        <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Invasive Arterial Line (MAP)</span>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--danger)' }}>118/74 mmHg (MAP: 88)</div>
                        </div>
                        <div style={{ padding: '8px', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Central Venous Pressure (CVP)</span>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>8.5 cmH2O (Target: 8-12)</div>
                        </div>
                        <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Mechanical Ventilator (PEEP)</span>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--success)' }}>FiO2: 40% | PEEP: 5 cmH2O</div>
                        </div>
                        <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Continuous Cardiac Output</span>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--warning)' }}>5.2 L/min | SvO2: 72%</div>
                        </div>
                      </div>
                    </div>

                    {/* Arterial Blood Gas (ABG) & Drip Titration Real-time Updates */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--primary)' }}>📄 Arterial Blood Gas (ABG) & Vasopressor Drips</strong>
                      <div style={{ marginTop: '6px', color: 'var(--text-muted)' }}>
                        <div>• <strong>ABG Analysis (09:15):</strong> pH 7.39 | PaCO2 38 mmHg | PaO2 96 mmHg | HCO3 24 mEq/L | SaO2 99%</div>
                        <div>• <strong>Active Drips:</strong> Noradrenaline @ 0.04 mcg/kg/min | Propofol @ 15 mL/hr</div>
                        <div>• <strong>RASS Sedation Rating:</strong> Score -1 (Drowsy, awakens to voice)</div>
                      </div>
                    </div>

                    {/* ICU ADT & Step-down Transfer Clearance */}
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ fontSize: '12px', color: 'var(--success)' }}>🔄 Step-down ICU ADT Clearance</strong>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Extubated & hemodynamically stable for General Ward step-down transfer.</div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '11px', color: 'var(--success)', borderColor: 'var(--success)' }}
                        onClick={() => addToast('success', 'ICU Step-down Approved: Patient cleared for General Ward transfer!')}
                      >
                        Clear for Step-down
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
  );
};
