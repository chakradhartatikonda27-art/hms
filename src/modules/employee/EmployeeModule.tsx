import React from 'react';
import { Users, DollarSign, Calendar, Shield, UserCheck, Clock, CheckCircle2, XCircle, FileText, Award, Briefcase, Plus, Filter, Lock } from 'lucide-react';

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

  const [empTab, setEmpTab] = React.useState<'hr' | 'payroll' | 'leave' | 'rbac'>('hr');
  const [empRoleFilter, setEmpRoleFilter] = React.useState('all');
  const [showAddEmpModal, setShowAddEmpModal] = React.useState(false);
  const [newEmpName, setNewEmpName] = React.useState('');
  const [newEmpRole, setNewEmpRole] = React.useState('Doctor');
  const [newEmpDept, setNewEmpDept] = React.useState('Cardiology');
  const [newEmpSalary, setNewEmpSalary] = React.useState('120000');

  const [staffList, setStaffList] = React.useState([
    { id: 'EMP-101', name: 'Dr. Sandeep Mehta', role: 'Doctor', dept: 'Cardiology', salary: 180000, leaveBalance: 14, status: 'Active', shift: 'Morning' },
    { id: 'EMP-102', name: 'Dr. Ananya Ray', role: 'Doctor', dept: 'Neurology', salary: 165000, leaveBalance: 12, status: 'Active', shift: 'Morning' },
    { id: 'EMP-103', name: 'Sister Priya Nair', role: 'Nurse', dept: 'ICU Suite', salary: 45000, leaveBalance: 8, status: 'Active', shift: 'Night' },
    { id: 'EMP-104', name: 'Rahul Kumar', role: 'Pharmacist', dept: 'Pharmacy', salary: 38000, leaveBalance: 10, status: 'Active', shift: 'Day' },
    { id: 'EMP-105', name: 'Alok Verma', role: 'Lab Technician', dept: 'Pathology Lab', salary: 42000, leaveBalance: 6, status: 'Active', shift: 'Day' }
  ]);

  const [leaveRequests, setLeaveRequests] = React.useState([
    { id: 'LR-901', empName: 'Sister Priya Nair', role: 'Nurse', type: 'Casual Leave', dates: 'Aug 12 - Aug 14 (3 Days)', reason: 'Family Event', status: 'Pending' },
    { id: 'LR-902', empName: 'Rahul Kumar', role: 'Pharmacist', type: 'Sick Leave', dates: 'Aug 10 (1 Day)', reason: 'Viral Fever', status: 'Pending' },
    { id: 'LR-903', empName: 'Dr. Ananya Ray', role: 'Doctor', type: 'Earned Leave', dates: 'Aug 20 - Aug 25 (6 Days)', reason: 'Medical Conference', status: 'Approved' }
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
      shift: 'Day'
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
              <span>👨‍💼 Employee HR, Payroll & Leave Management (4.14)</span>
              <span className="badge badge-primary" style={{ fontSize: '11px', padding: '4px 10px' }}>RBAC Security Certified</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
              Staff HR Directory, Monthly Payroll Processing, Leave Approvals, and Role-Based Security Access Control.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowAddEmpModal(true)}>
              ➕ Onboard New Employee
            </button>
            <button className="btn btn-success" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => {
              if (typeof handleRunPayroll === 'function') handleRunPayroll();
              addToast('success', 'Executed Monthly Hospital Payroll Disbursal of ₹24,65,000!');
            }}>
              💰 Run Monthly Payroll
            </button>
          </div>
        </div>

        {/* 4 Main Sub-Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setEmpTab('hr')}
            className={`btn ${empTab === 'hr' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            👨‍💼 HR Staff Directory & Profiles
          </button>
          <button
            onClick={() => setEmpTab('payroll')}
            className={`btn ${empTab === 'payroll' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            💰 Payroll & Salary Disbursal
          </button>
          <button
            onClick={() => setEmpTab('leave')}
            className={`btn ${empTab === 'leave' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🌴 Leave Approvals & Balance
          </button>
          <button
            onClick={() => setEmpTab('rbac')}
            className={`btn ${empTab === 'rbac' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔐 Role-Based Access Control (RBAC)
          </button>
        </div>
      </div>

      {/* PILLAR 1: HR STAFF DIRECTORY */}
      {empTab === 'hr' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>👨‍💼 Hospital Employee HR Directory & Duty Rosters</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Directory of active clinical consultants, nursing staff, pharmacists, and administrative personnel.</p>
            </div>

            {/* Filter Pills */}
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
                  <th>Assigned Shift</th>
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
                    <td><span className="badge badge-secondary">{emp.shift} Shift</span></td>
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

      {/* PILLAR 2: PAYROLL & SALARY DISBURSAL */}
      {empTab === 'payroll' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>💰 Monthly Staff Payroll & Salary Slip Generator</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Base pay, call-duty allowances, PF deductions, and net salary bank payouts.</p>
            </div>
            <button className="btn btn-success" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => addToast('success', 'Executed Monthly Direct Bank Payout for 142 Staff Members!')}>
              💸 Disburse Bank Payroll
            </button>
          </div>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Employee Name</th>
                  <th>Role</th>
                  <th>Base Monthly Salary</th>
                  <th>Allowances & Incentives</th>
                  <th>TDS & PF Deductions</th>
                  <th>Net Payable Salary</th>
                  <th>Salary Slip</th>
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
                        📄 Download Payslip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PILLAR 3: LEAVE APPROVALS & BALANCES */}
      {empTab === 'leave' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🌴 Staff Leave Approval Queue & Absence Ledger</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Review casual, sick, and earned leave requests with instant coverage checking.</p>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Employee Name</th>
                  <th>Role</th>
                  <th>Leave Category</th>
                  <th>Requested Duration</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Approval Actions</th>
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
                    <td>{lr.reason}</td>
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

      {/* PILLAR 4: ROLE-BASED ACCESS CONTROL (RBAC) */}
      {empTab === 'rbac' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🔐 Role-Based Access Control (RBAC) Matrix</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Fine-grained security permissions for clinical data, financial records, and pharmacy dispensing.</p>

          <div className="grid grid-2" style={{ gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>👨‍⚕️ Clinical Doctor Role</h4>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Full access to OPD/IPD SOAP Notes, E-Prescriptions, Lab Requests, & PACS Imaging.</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>💊 Pharmacist Role</h4>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Access restricted to Pharmacy POS Cashier, Stock FEFO, & Drug Master Registry.</p>
            </div>
          </div>
        </div>
      )}

      {/* ADD EMPLOYEE MODAL */}
      {showAddEmpModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>➕ Onboard New Hospital Staff</h3>
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
