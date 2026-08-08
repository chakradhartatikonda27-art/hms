import React from 'react';
import { Users, DollarSign, Calendar, Shield, UserCheck, Clock, CheckCircle2, XCircle, FileText, Award, Briefcase, Plus, Filter, Lock, QrCode, Smartphone, MapPin, AlertCircle, ArrowRight, Sparkles, Building, ChevronRight } from 'lucide-react';

export interface EmployeeModuleProps {
  [key: string]: any;
}

export const EmployeeModule: React.FC<EmployeeModuleProps> = (props) => {
  const {
    activeTab = 'employee',
    setActiveTab = () => {},
    addToast = () => {},
    employees = [],
    setEmployees = () => {},
    audits = [],
    handleRunPayroll = () => {},
    handleApproveLeave = () => {},
    ...rest
  } = props;

  const [empTab, setEmpTab] = React.useState<'workflow' | 'master_hr' | 'attendance_roster' | 'payroll_bank' | 'leave_whatsapp' | 'performance_kpi' | 'recruitment_hiring' | 'compliance_license' | 'ess_id_card' | 'ai_hr_analytics'>('workflow');
  const [empRoleFilter, setEmpRoleFilter] = React.useState('all');
  const [showAddEmpModal, setShowAddEmpModal] = React.useState(false);
  const [showQrIdCardModal, setShowQrIdCardModal] = React.useState(false);
  const [selectedStaffForId, setSelectedStaffForId] = React.useState<any>(null);

  const [newEmpName, setNewEmpName] = React.useState('');
  const [newEmpRole, setNewEmpRole] = React.useState('Doctor');
  const [newEmpDept, setNewEmpDept] = React.useState('Cardiology');
  const [newEmpSalary, setNewEmpSalary] = React.useState('120000');

  // 9-Step Employee Lifecycle Workflow Steps
  const employeeLifecycleSteps = [
    { step: 1, title: 'Recruitment', icon: '🎯', count: 6, desc: 'Candidate Screening' },
    { step: 2, title: 'Digital Onboarding', icon: '📄', count: 4, desc: 'Paperless Joining' },
    { step: 3, title: 'Dept Assignment', icon: '🏢', count: 142, desc: 'Cost Center Tagging' },
    { step: 4, title: 'Shift & Roster', icon: '📅', count: 142, desc: 'Smart Roster' },
    { step: 5, title: 'Attendance Track', icon: '📲', count: 138, desc: 'Face Recog / GPS' },
    { step: 6, title: 'Leave & Performance', icon: '🌴', count: 8, desc: 'KPI Appraisals' },
    { step: 7, title: 'Payroll Processing', icon: '💰', count: 142, desc: 'Bank Disbursal' },
    { step: 8, title: 'Self-Service ESS', icon: '💳', count: 142, desc: 'Digital QR ID Card' },
    { step: 9, title: 'Offboarding & Exit', icon: '🚪', count: 1, desc: 'Relieving Letter' }
  ];

  const [staffList, setStaffList] = React.useState([
    { id: 'EMP-101', name: 'Dr. Sandeep Mehta', role: 'Doctor', dept: 'Cardiology', salary: 180000, leaveBalance: 14, status: 'Active', shift: 'Morning', regNo: 'MCI-88412', licenseExpiry: '2028-11-30', attendanceMode: 'Face Recognition' },
    { id: 'EMP-102', name: 'Dr. Ananya Ray', role: 'Doctor', dept: 'Neurology', salary: 165000, leaveBalance: 12, status: 'Active', shift: 'Morning', regNo: 'MCI-90124', licenseExpiry: '2027-04-15', attendanceMode: 'Geo-Fenced Mobile' },
    { id: 'EMP-103', name: 'Sister Priya Nair', role: 'Nurse', dept: 'ICU Suite', salary: 45000, leaveBalance: 8, status: 'Active', shift: 'Night', regNo: 'INC-44120', licenseExpiry: '2026-09-30', attendanceMode: 'Biometric Fingerprint' },
    { id: 'EMP-104', name: 'Rahul Kumar', role: 'Pharmacist', dept: 'Pharmacy', salary: 38000, leaveBalance: 10, status: 'Active', shift: 'Day', regNo: 'PCI-11029', licenseExpiry: '2029-01-10', attendanceMode: 'Biometric Fingerprint' },
    { id: 'EMP-105', name: 'Alok Verma', role: 'Lab Technician', dept: 'Pathology Lab', salary: 42000, leaveBalance: 6, status: 'Active', shift: 'Day', regNo: 'MLT-77401', licenseExpiry: '2026-10-15', attendanceMode: 'QR Code Scan' }
  ]);

  const [leaveRequests, setLeaveRequests] = React.useState([
    { id: 'LR-901', empName: 'Sister Priya Nair', role: 'Nurse', type: 'Casual Leave', dates: 'Aug 12 - Aug 14 (3 Days)', reason: 'Family Event', status: 'Pending', viaWhatsApp: true },
    { id: 'LR-902', empName: 'Rahul Kumar', role: 'Pharmacist', type: 'Sick Leave', dates: 'Aug 10 (1 Day)', reason: 'Viral Fever', status: 'Pending', viaWhatsApp: false },
    { id: 'LR-903', empName: 'Dr. Ananya Ray', role: 'Doctor', type: 'Earned Leave', dates: 'Aug 20 - Aug 25 (6 Days)', reason: 'Medical Conference', status: 'Approved', viaWhatsApp: true }
  ]);

  const handleAddEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName) return;
    const newEmp = {
      id: `EMP-${Math.floor(106 + Math.random() * 90)}`,
      name: newEmpName,
      role: newEmpRole,
      dept: newEmpDept,
      salary: parseFloat(newEmpSalary),
      leaveBalance: 15,
      status: 'Active',
      shift: 'Day',
      regNo: 'MCI-TEMP',
      licenseExpiry: '2028-12-31',
      attendanceMode: 'Face Recognition'
    };
    setStaffList([...staffList, newEmp]);
    addToast('success', `Onboarded New Staff Member: ${newEmp.name} (${newEmp.role})`);
    setShowAddEmpModal(false);
    setNewEmpName('');
  };

  const handleLeaveAction = (id: string, action: 'Approved' | 'Rejected') => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: action } : l));
    addToast(action === 'Approved' ? 'success' : 'warning', `Updated Leave Request ${id} to ${action}`);
  };

  const filteredStaff = staffList.filter(s => empRoleFilter === 'all' || s.role.toLowerCase() === empRoleFilter.toLowerCase());

  return (
    <div className="flex flex-col gap-lg">
      {/* Employee Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 51, 234, 0.08) 100%)', borderLeft: '6px solid var(--primary)', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>👨‍💼 Enterprise Employee HR & Payroll Suite (4.14)</span>
              <span className="badge badge-primary" style={{ fontSize: '11px', padding: '4px 10px' }}>⭐ Face Recog & QR ID Ready</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
              Complete Staff Suite: Digital Onboarding, Face & GPS Attendance, Smart Duty Rosters, Bank Payroll, and License Compliance Alerts.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowAddEmpModal(true)}>
              ➕ Digital Onboard Staff
            </button>
            <button className="btn btn-success" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => {
              if (typeof handleRunPayroll === 'function') handleRunPayroll();
              addToast('success', 'Executed Monthly Hospital Payroll Disbursal of ₹24,65,000!');
            }}>
              💰 Disburse Bank Payroll
            </button>
          </div>
        </div>

        {/* 9-Step Employee Lifecycle Workflow Pipeline Flow Bar */}
        <div style={{ marginTop: '20px', background: 'var(--bg-card)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔄 9-Step Enterprise Employee Lifecycle Pipeline Flow</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {employeeLifecycleSteps.map((s, idx) => (
              <React.Fragment key={s.step}>
                <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-muted)', border: '1px solid var(--border)', minWidth: '120px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>STEP {s.step}</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, marginTop: '2px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{s.icon}</span>
                    <span>{s.title}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--primary)', marginTop: '4px', fontWeight: 700 }}>{s.count} Staff</div>
                </div>

                {idx < employeeLifecycleSteps.length - 1 && (
                  <span style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 800 }}>➔</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 10 Navigation Sub-Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setEmpTab('workflow')}
            className={`btn ${empTab === 'workflow' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔄 Lifecycle Pipeline Board
          </button>
          <button
            onClick={() => setEmpTab('master_hr')}
            className={`btn ${empTab === 'master_hr' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            👨‍💼 Staff Directory & Onboarding
          </button>
          <button
            onClick={() => setEmpTab('attendance_roster')}
            className={`btn ${empTab === 'attendance_roster' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📲 Face / GPS & Duty Roster
          </button>
          <button
            onClick={() => setEmpTab('payroll_bank')}
            className={`btn ${empTab === 'payroll_bank' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            💰 Payroll & Bank Transfers
          </button>
          <button
            onClick={() => setEmpTab('leave_whatsapp')}
            className={`btn ${empTab === 'leave_whatsapp' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🌴 Leave & WhatsApp Workflow
          </button>
          <button
            onClick={() => setEmpTab('performance_kpi')}
            className={`btn ${empTab === 'performance_kpi' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            ⭐ KPI Appraisals & Ratings
          </button>
          <button
            onClick={() => setEmpTab('recruitment_hiring')}
            className={`btn ${empTab === 'recruitment_hiring' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🎯 Recruitment & Offer Letters
          </button>
          <button
            onClick={() => setEmpTab('compliance_license')}
            className={`btn ${empTab === 'compliance_license' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📜 Medical License Expiry Alerts
          </button>
          <button
            onClick={() => setEmpTab('ess_id_card')}
            className={`btn ${empTab === 'ess_id_card' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            💳 ESS & Digital QR ID Card
          </button>
          <button
            onClick={() => setEmpTab('ai_hr_analytics')}
            className={`btn ${empTab === 'ai_hr_analytics' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🤖 AI Roster & Attrition Predictor
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: LIFECYCLE PIPELINE BOARD */}
      {empTab === 'workflow' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>
            🔄 Active Hospital Personnel Moving Through 9-Step Lifecycle
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Real-time status tracking from recruitment candidate screening to digital onboarding, shift rosters, and payroll disbursal.
          </p>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Full Name & Role</th>
                  <th>Department</th>
                  <th>Medical Reg No.</th>
                  <th>Attendance Mode</th>
                  <th>Current Pipeline Stage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((emp, idx) => (
                  <tr key={emp.id}>
                    <td className="font-semibold">{emp.id}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{emp.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{emp.role}</div>
                    </td>
                    <td><span className="badge badge-primary">{emp.dept}</span></td>
                    <td><strong style={{ color: 'var(--primary)' }}>{emp.regNo}</strong></td>
                    <td><span className="badge badge-secondary">{emp.attendanceMode}</span></td>
                    <td>
                      <span className="badge badge-success" style={{ fontSize: '11px', padding: '4px 8px' }}>
                        Step {idx + 3}: {employeeLifecycleSteps[idx + 2]?.title || 'Self-Service ESS'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => {
                        setSelectedStaffForId(emp);
                        setShowQrIdCardModal(true);
                      }}>
                        💳 Digital ID Card
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: STAFF DIRECTORY & ONBOARDING */}
      {empTab === 'master_hr' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>👨‍💼 Hospital Employee HR Master Directory</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Paperless digital onboarding for clinical consultants, nursing staff, pharmacists, and administrative personnel.</p>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setEmpRoleFilter('all')} className={`btn ${empRoleFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '2px 8px', fontSize: '10px' }}>All Staff</button>
              <button onClick={() => setEmpRoleFilter('doctor')} className={`btn ${empRoleFilter === 'doctor' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '2px 8px', fontSize: '10px' }}>Doctors</button>
              <button onClick={() => setEmpRoleFilter('nurse')} className={`btn ${empRoleFilter === 'nurse' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '2px 8px', fontSize: '10px' }}>Nurses</button>
              <button onClick={() => setEmpRoleFilter('pharmacist')} className={`btn ${empRoleFilter === 'pharmacist' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '2px 8px', fontSize: '10px' }}>Pharmacists</button>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Designation / Role</th>
                  <th>Department Unit</th>
                  <th>Leave Balance</th>
                  <th>Employment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((emp) => (
                  <tr key={emp.id}>
                    <td className="font-semibold">{emp.id}</td>
                    <td style={{ fontWeight: 700 }}>{emp.name}</td>
                    <td><span className="badge badge-primary">{emp.role}</span></td>
                    <td>{emp.dept}</td>
                    <td><strong>{emp.leaveBalance} Days</strong></td>
                    <td><span className="badge badge-success">{emp.status}</span></td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('info', `Viewing HR File for ${emp.name}`)}>
                        👤 View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: FACE / GPS & DUTY ROSTER */}
      {empTab === 'attendance_roster' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📲 Face Recognition, Geo-Fenced Mobile & Smart Duty Roster</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Biometric facial verification, GPS mobile check-ins for home healthcare staff, and automated doctor/nurse shift schedules.</p>
          <div style={{ padding: '14px', background: 'var(--bg-muted)', borderRadius: '8px', fontSize: '12px' }}>
            <div>• <strong>Morning Shift (08:00 AM - 04:00 PM):</strong> Dr. Sandeep Mehta, Dr. Ananya Ray (100% Present via Face Recog)</div>
            <div>• <strong>Night Shift (08:00 PM - 08:00 AM):</strong> Sister Priya Nair (Verified via Biometric Fingerprint)</div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: PAYROLL & BANK TRANSFERS */}
      {empTab === 'payroll_bank' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>💰 Monthly Payroll & Bank Transfer File Generator</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Base pay, call-duty allowances, PF/TDS deductions, and 1-click HDFC/ICICI corporate bank payout files.</p>
            </div>
            <button className="btn btn-success" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => addToast('success', 'Generated Bank Payout Batch File for 142 Employees!')}>
              💸 Export Bank Payout File
            </button>
          </div>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Employee Name</th>
                  <th>Role</th>
                  <th>Base Salary</th>
                  <th>Allowances</th>
                  <th>PF & TDS</th>
                  <th>Net Payable</th>
                  <th>Payslip</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((s) => (
                  <tr key={s.id}>
                    <td className="font-semibold">{s.id}</td>
                    <td style={{ fontWeight: 700 }}>{s.name}</td>
                    <td><span className="badge badge-primary">{s.role}</span></td>
                    <td>₹{s.salary.toLocaleString()}</td>
                    <td style={{ color: 'var(--success)' }}>+ ₹5,000</td>
                    <td style={{ color: 'var(--danger)' }}>- ₹3,200</td>
                    <td style={{ fontWeight: 800, color: 'var(--primary)' }}>₹{(s.salary + 1800).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('info', `Downloaded Payslip PDF for ${s.name}`)}>
                        📄 Payslip PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: LEAVE & WHATSAPP WORKFLOW */}
      {empTab === 'leave_whatsapp' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🌴 Staff Leave Approval Queue (WhatsApp Integrated)</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Managers approve or reject leave applications directly via WhatsApp notification links.</p>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Employee Name</th>
                  <th>Role</th>
                  <th>Leave Type</th>
                  <th>Dates</th>
                  <th>WhatsApp Sync</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((lr) => (
                  <tr key={lr.id}>
                    <td className="font-semibold">{lr.id}</td>
                    <td style={{ fontWeight: 700 }}>{lr.empName}</td>
                    <td><span className="badge badge-primary">{lr.role}</span></td>
                    <td><span className="badge badge-secondary">{lr.type}</span></td>
                    <td>{lr.dates}</td>
                    <td>
                      {lr.viaWhatsApp ? (
                        <span className="badge badge-success" style={{ fontSize: '10px' }}>💬 WhatsApp Sent</span>
                      ) : (
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Web Portal</span>
                      )}
                    </td>
                    <td><span className={`badge ${lr.status === 'Approved' ? 'badge-success' : lr.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}`}>{lr.status}</span></td>
                    <td>
                      {lr.status === 'Pending' ? (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button className="btn btn-success" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => handleLeaveAction(lr.id, 'Approved')}>
                            ✓ Approve
                          </button>
                          <button className="btn btn-danger" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => handleLeaveAction(lr.id, 'Rejected')}>
                            ✕ Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Actioned</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: KPI APPRAISALS & RATINGS */}
      {empTab === 'performance_kpi' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>⭐ Performance Management & Annual Appraisals</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Evaluate clinical KPI metrics, patient feedback scores, and annual promotion recommendations.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => addToast('info', 'Generated Annual Staff Appraisal Matrix!')}>
            ⭐ View Appraisal Matrix
          </button>
        </div>
      )}

      {/* SUB-TAB 7: RECRUITMENT & OFFER LETTERS */}
      {empTab === 'recruitment_hiring' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🎯 Recruitment Management & Digital Offer Letter Generator</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Track open clinical job vacancies, candidate interview feedback, and paperless offer letters.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => addToast('success', 'Generated Digital Offer Letter for Senior ICU Consultant!')}>
            ✉️ Generate Digital Offer Letter
          </button>
        </div>
      )}

      {/* SUB-TAB 8: MEDICAL LICENSE EXPIRY ALERTS */}
      {empTab === 'compliance_license' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📜 Medical Council License & Certification Expiry Tracker</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Track State Medical Council (MCI), Nursing Council, and Pharmacy Council registration validity.</p>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Council Registration No.</th>
                  <th>License Expiry Date</th>
                  <th>Compliance Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((s) => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 700 }}>{s.name} ({s.role})</td>
                    <td><strong style={{ color: 'var(--primary)' }}>{s.regNo}</strong></td>
                    <td>{s.licenseExpiry}</td>
                    <td>
                      <span className="badge badge-success">Valid & Active</span>
                    </td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('info', `Verified License ${s.regNo} via Medical Council Portal`)}>
                        🔍 Verify License
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 9: ESS & DIGITAL QR ID CARD */}
      {empTab === 'ess_id_card' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>💳 Employee Self-Service (ESS) & Digital QR ID Card</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Employees download payslips, check shift schedules, and present digital QR identity cards.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => {
              setSelectedStaffForId(staffList[0]);
              setShowQrIdCardModal(true);
            }}>
              💳 View Sample Digital QR ID Card
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 10: AI ROSTER & ATTRITION PREDICTOR */}
      {empTab === 'ai_hr_analytics' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🤖 AI Smart Duty Roster & Staff Attrition Risk Predictor</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>AI algorithms predict nurse shift burnout and optimize doctor on-call schedules.</p>
          <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '8px', borderLeft: '4px solid var(--warning)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--warning)' }}>🚨 AI Shift Burnout Risk Warning (ICU Nursing Team)</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Sister Priya Nair logged 3 consecutive night shifts. AI recommends rotating 1 relief nurse to prevent exhaustion.
            </p>
          </div>
        </div>
      )}

      {/* DIGITAL QR ID CARD MODAL */}
      {showQrIdCardModal && selectedStaffForId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '360px', borderRadius: '16px', padding: '20px', background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#38BDF8' }}>SIYANCARE HEALTHCARE</span>
              <span className="badge badge-success" style={{ fontSize: '10px' }}>VERIFIED EMP</span>
            </div>

            <div style={{ textAlign: 'center', margin: '16px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary)', margin: '0 auto 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>
                👨‍⚕️
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'white' }}>{selectedStaffForId.name}</h3>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>{selectedStaffForId.role} • {selectedStaffForId.dept}</div>
              <div style={{ fontSize: '11px', color: '#38BDF8', marginTop: '4px', fontWeight: 700 }}>Reg: {selectedStaffForId.regNo}</div>
            </div>

            <div style={{ background: 'white', padding: '12px', borderRadius: '10px', textAlign: 'center', margin: '14px 0' }}>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700, marginBottom: '4px' }}>SCAN QR FOR VERIFICATION</div>
              <div style={{ fontSize: '32px', letterSpacing: '4px' }}>⬛⬜⬛⬜⬛</div>
              <div style={{ fontSize: '9px', color: '#94A3B8', marginTop: '4px' }}>ID: {selectedStaffForId.id}</div>
            </div>

            <button className="btn btn-secondary" style={{ width: '100%', fontSize: '11px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }} onClick={() => setShowQrIdCardModal(false)}>
              Close Digital ID Card
            </button>
          </div>
        </div>
      )}

      {/* ADD EMPLOYEE MODAL */}
      {showAddEmpModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>➕ Digital Onboard New Hospital Staff</h3>
            <form onSubmit={handleAddEmployeeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Staff Full Name</label>
                <input type="text" className="form-input" required placeholder="e.g. Dr. Rajesh K" value={newEmpName} onChange={(e) => setNewEmpName(e.target.value)} />
              </div>
              <div className="grid grid-2" style={{ gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Designation Role</label>
                  <select className="form-input" value={newEmpRole} onChange={(e) => setNewEmpRole(e.target.value)}>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Pharmacist">Pharmacist</option>
                    <option value="Lab Technician">Lab Technician</option>
                    <option value="Receptionist">Receptionist</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Department</label>
                  <input type="text" className="form-input" required value={newEmpDept} onChange={(e) => setNewEmpDept(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Monthly Base Salary (₹)</label>
                <input type="number" className="form-input" required value={newEmpSalary} onChange={(e) => setNewEmpSalary(e.target.value)} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddEmpModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: 800 }}>Onboard Staff Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
