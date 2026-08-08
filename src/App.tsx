import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Bell, AlertTriangle, Shield, Activity,
  FlaskConical, Pill, DollarSign, Bed,
  Users, CheckCircle, ArrowRight, ArrowLeft,
  Printer, Sparkles, ChevronRight, ChevronLeft, UserPlus,
  Heart, Info, X, Sun, Moon,
  AlertCircle,
  Send, Stethoscope, Video, MapPin, FileSpreadsheet, Plus, FileText, Mic, Scissors, Globe, FolderArchive
} from 'lucide-react';
import { DashboardModule } from './modules/dashboard/DashboardModule';
import { RegistrationModule } from './modules/registration/RegistrationModule';
import { OpdModule } from './modules/opd/OpdModule';
import { TelemedicineModule } from './modules/telemedicine/TelemedicineModule';
import { IpdModule } from './modules/ipd/IpdModule';
import { IcuModule } from './modules/icu/IcuModule';
import { OtModule } from './modules/ot/OtModule';
import { PathologyModule } from './modules/pathology/PathologyModule';
import { RadiologyModule } from './modules/radiology/RadiologyModule';
import { PharmacyModule } from './modules/pharmacy/PharmacyModule';
import { BillingModule } from './modules/billing/BillingModule';
import { ExpenseModule } from './modules/expense/ExpenseModule';
import { MrdModule } from './modules/mrd/MrdModule';
import { InventoryModule } from './modules/inventory/InventoryModule';
import { VaccinationModule } from './modules/vaccination/VaccinationModule';
import { PortalModule } from './modules/portal/PortalModule';
import { AdminModule } from './modules/admin/AdminModule';

// ==========================================
// TYPES & INTERFACES
// ==========================================

interface VitalStats {
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  oxygenSat: number;
  respiratoryRate: number;
}

interface Allergy {
  substance: string;
  severity: 'mild' | 'moderate' | 'severe';
  reaction: string;
}

interface MedicalCondition {
  condition: string;
  diagnosedDate: string;
  status: 'active' | 'resolved';
}

interface PrescriptionItem {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface LabResult {
  id: string;
  testName: string;
  category: 'pathology' | 'radiology';
  requestedDate: string;
  status: 'pending' | 'completed';
  resultValue?: string;
  referenceRange?: string;
  findings?: string;
  verifiedBy?: string;
  outsourced?: boolean;
  outsourcedLabName?: string;
  refDoctorShare?: number; // referral commission %
}

interface VisitRecord {
  id: string;
  date: string;
  department: string;
  doctor: string;
  reason: string;
  notes: string;
}

interface FluidLog {
  id: string;
  timestamp: string;
  intakeIv: number; // mL
  intakeOral: number; // mL
  outputUrine: number; // mL
  outputDrain: number; // mL
}

interface EmarSchedule {
  id: string;
  medication: string;
  dosage: string;
  route: 'IV' | 'PO' | 'SC' | 'IM' | 'Neb';
  scheduledTime: string;
  status: 'pending' | 'administered';
  administeredAt?: string;
  administeredBy?: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  tpaProvider: string;
  insuranceId: string;
  vitals: VitalStats;
  allergies: Allergy[];
  medicalHistory: MedicalCondition[];
  visits: VisitRecord[];
  prescriptions: PrescriptionItem[];
  labResults: LabResult[];
  bedNumber?: string;
  status: 'registered' | 'waiting' | 'in-consultation' | 'lab-pending' | 'pharmacy-pending' | 'billed' | 'discharged' | 'no-show';
  totalBill: number;
  paidBill: number;
  pendingBill: number;
  branch: 'metro' | 'north' | 'south';
  mrdCode?: string; // ICD coding link
  
  // Advanced OPD / IPD states
  esiScore?: number; // 1 (Resuscitation) to 5 (Non-urgent)
  chiefComplaints?: { complaint: string; duration: string }[];
  fluidLogs?: FluidLog[];
  emarList?: EmarSchedule[];
  gcsEye?: number; // 1-4
  gcsVerbal?: number; // 1-5
  gcsMotor?: number; // 1-6
  gcsScore?: number; // calculated 3-15
  systemicExam?: { cvs: string; rs: string; git: string; cns: string };
  pregnancyStatus?: boolean; // Drug-pregnancy safety warning
}

interface BedInfo {
  id: string;
  type: 'ICU' | 'General' | 'Emergency' | 'Isolation';
  status: 'vacant' | 'occupied' | 'critical' | 'isolated';
  patientName?: string;
  patientId?: string;
  branch: 'metro' | 'north' | 'south';
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  details: string;
}

interface EmergencyAlert {
  id: string;
  timestamp: string;
  location: string;
  type: 'Code Blue' | 'Trauma Alert' | 'Critical Lab Value' | 'OT Pre-Op';
  message: string;
  severity: 'high' | 'critical';
}

interface Expense {
  id: string;
  timestamp: string;
  category: string;
  description: string;
  amount: number;
  branch: 'metro' | 'north' | 'south';
}

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  salary: number;
  status: 'active' | 'leave';
  leaveBalance: number;
}

interface BloodBankUnit {
  bloodGroup: string;
  units: number;
  temp: number;
  status: 'optimal' | 'low' | 'critical';
  lastChecked: string;
}

interface VaccineStock {
  name: string;
  batchNo: string;
  units: number;
  manufacturer: string;
  minAgeWeeks: number;
  status: 'instock' | 'reorder';
}

// ==========================================
// REAL CLINICAL DATA
// ==========================================

const INITIAL_PATIENTS: Patient[] = [
  {
    id: "PX-2026-9041",
    name: "Aarav Sharma",
    age: 48,
    gender: "Male",
    bloodGroup: "O+",
    phone: "+91 98765 43210",
    email: "aarav.sharma@email.com",
    address: "A-402, Green Glen Layout, Bengaluru, Karnataka - 560103",
    tpaProvider: "Star Health Insurance",
    insuranceId: "STAR-77491-03",
    vitals: {
      heartRate: 78,
      bloodPressure: "135/85",
      temperature: 98.6,
      oxygenSat: 98,
      respiratoryRate: 16
    },
    allergies: [
      { substance: "Penicillin", severity: "severe", reaction: "Anaphylaxis" }
    ],
    medicalHistory: [
      { condition: "Hypertension", diagnosedDate: "2023-05-14", status: "active" }
    ],
    visits: [
      {
        id: "V-901",
        date: "2026-06-12",
        department: "Cardiology",
        doctor: "Dr. Sandeep Mehta",
        reason: "Routine cardiac checkup and blood pressure review",
        notes: "Hypertension remains controlled. Advised reducing sodium intake."
      }
    ],
    prescriptions: [
      { id: "P-101", medication: "Amlodipine 5mg", dosage: "1 tab", frequency: "Once daily", duration: "30 days", instructions: "Take after breakfast" }
    ],
    labResults: [
      { id: "L-201", testName: "Lipid Profile", category: "pathology", requestedDate: "2026-06-12", status: "completed", resultValue: "Total Cholesterol: 210 mg/dL", referenceRange: "< 200 mg/dL", findings: "Mild hypercholesterolemia.", verifiedBy: "Dr. Amit Roy", refDoctorShare: 10 }
    ],
    bedNumber: "ICU-A2",
    status: "in-consultation",
    totalBill: 45000,
    paidBill: 15000,
    pendingBill: 30000,
    branch: "metro",
    mrdCode: "I10 (Essential Hypertension)",
    
    // Advanced fields
    esiScore: 2, // Emergent (Hypertensive crisis check)
    chiefComplaints: [
      { complaint: "Chest tightness", duration: "2 hours" },
      { complaint: "Mild dizziness", duration: "1 day" }
    ],
    pregnancyStatus: false,
    systemicExam: { cvs: "S1/S2 heard, no murmurs", rs: "Bilateral air entry normal, clear lung sounds", git: "Soft, non-tender", cns: "Conscious, oriented, no focal deficit" },
    gcsEye: 4, gcsVerbal: 5, gcsMotor: 6, gcsScore: 15,
    fluidLogs: [
      { id: "FL-1", timestamp: "2026-08-07 18:00", intakeIv: 500, intakeOral: 200, outputUrine: 350, outputDrain: 0 },
      { id: "FL-2", timestamp: "2026-08-07 20:00", intakeIv: 250, intakeOral: 150, outputUrine: 300, outputDrain: 0 }
    ],
    emarList: [
      { id: "EMAR-1", medication: "Inj. Furosemide 20mg", dosage: "2 mL", route: "IV", scheduledTime: "08:00", status: "administered", administeredAt: "2026-08-07 08:10", administeredBy: "Nurse Deepa Roy" },
      { id: "EMAR-2", medication: "Tab. Amlodipine 5mg", dosage: "1 tab", route: "PO", scheduledTime: "20:00", status: "pending" },
      { id: "EMAR-3", medication: "Inj. Pantoprazole 40mg", dosage: "10 mL", route: "IV", scheduledTime: "22:00", status: "pending" }
    ]
  },
  {
    id: "PX-2026-8812",
    name: "Priya Nair",
    age: 34,
    gender: "Female",
    bloodGroup: "B+",
    phone: "+91 91234 56789",
    email: "priya.nair@email.com",
    address: "Flat 12B, Skyline Apartments, Kochi, Kerala - 682021",
    tpaProvider: "HDFC Ergo Health",
    insuranceId: "HDFC-88301-92",
    vitals: {
      heartRate: 104,
      bloodPressure: "110/70",
      temperature: 101.4,
      oxygenSat: 95,
      respiratoryRate: 22
    },
    allergies: [
      { substance: "Sulfa Drugs", severity: "moderate", reaction: "Skin Rash" }
    ],
    medicalHistory: [
      { condition: "Asthma", diagnosedDate: "2018-09-22", status: "active" }
    ],
    visits: [],
    prescriptions: [],
    labResults: [
      { id: "L-202", testName: "Complete Blood Count (CBC)", category: "pathology", requestedDate: "2026-08-07", status: "pending", refDoctorShare: 15 }
    ],
    bedNumber: "EMR-04",
    status: "lab-pending",
    totalBill: 12000,
    paidBill: 0,
    pendingBill: 12000,
    branch: "metro",
    mrdCode: "J45 (Asthma)",
    
    // Advanced fields
    esiScore: 3, // Urgent (Exacerbation / Fever)
    chiefComplaints: [
      { complaint: "Shortness of breath", duration: "1 day" },
      { complaint: "High fever", duration: "3 days" }
    ],
    pregnancyStatus: true, // Warns against teratogenic medications
    systemicExam: { cvs: "Tachycardia, S1/S2 heard", rs: "Bilateral expiratory wheezing heard on auscultation", git: "Soft, bowel sounds active", cns: "Oriented, mild anxiety" },
    gcsEye: 4, gcsVerbal: 5, gcsMotor: 6, gcsScore: 15,
    fluidLogs: [
      { id: "FL-3", timestamp: "2026-08-07 19:00", intakeIv: 1000, intakeOral: 100, outputUrine: 400, outputDrain: 0 }
    ],
    emarList: [
      { id: "EMAR-4", medication: "Budesonide Nebulization", dosage: "2 mL", route: "Neb", scheduledTime: "20:00", status: "pending" },
      { id: "EMAR-5", medication: "Inj. Hydrocortisone 100mg", dosage: "2 mL", route: "IV", scheduledTime: "21:00", status: "pending" }
    ]
  },
  {
    id: "PX-2026-7734",
    name: "Vikram Malhotra",
    age: 62,
    gender: "Male",
    bloodGroup: "AB-",
    phone: "+91 99887 76655",
    email: "vikram.m@email.com",
    address: "Sector 15, HUDA Colony, Gurgaon, Haryana - 122001",
    tpaProvider: "ICICI Lombard",
    insuranceId: "ICICI-88102-12",
    vitals: {
      heartRate: 64,
      bloodPressure: "120/80",
      temperature: 98.2,
      oxygenSat: 99,
      respiratoryRate: 14
    },
    allergies: [],
    medicalHistory: [
      { condition: "Type 2 Diabetes", diagnosedDate: "2015-11-04", status: "active" }
    ],
    visits: [
      {
        id: "V-902",
        date: "2026-03-10",
        department: "Endocrinology",
        doctor: "Dr. Ananya Ray",
        reason: "Diabetic neuropathy review",
        notes: "HbA1c is at 7.2%. Adjusted Metformin dosage."
      }
    ],
    prescriptions: [
      { id: "P-102", medication: "Metformin 1000mg", dosage: "1 tab", frequency: "Twice daily", duration: "90 days", instructions: "Take with meals" }
    ],
    labResults: [],
    status: "waiting",
    totalBill: 2500,
    paidBill: 2500,
    pendingBill: 0,
    branch: "north",
    mrdCode: "E11.9 (Type 2 diabetes mellitus)",
    
    // Advanced fields
    esiScore: 4, // Less Urgent
    chiefComplaints: [
      { complaint: "Loss of sensation in toes", duration: "3 weeks" }
    ],
    pregnancyStatus: false,
    gcsEye: 4, gcsVerbal: 5, gcsMotor: 6, gcsScore: 15,
    fluidLogs: [],
    emarList: []
  }
];

const INITIAL_BEDS: BedInfo[] = [
  { id: "ICU-A1", type: "ICU", status: "vacant", branch: "metro" },
  { id: "ICU-A2", type: "ICU", status: "occupied", patientName: "Aarav Sharma", patientId: "PX-2026-9041", branch: "metro" },
  { id: "ICU-A3", type: "ICU", status: "critical", patientName: "Ramesh Sen", patientId: "PX-2026-1192", branch: "metro" },
  { id: "ICU-B1", type: "ICU", status: "vacant", branch: "metro" },
  { id: "ICU-B2", type: "ICU", status: "isolated", patientName: "Kabir Khan", patientId: "PX-2026-1554", branch: "metro" },
  { id: "GEN-101", type: "General", status: "vacant", branch: "metro" },
  { id: "GEN-102", type: "General", status: "vacant", branch: "metro" },
  { id: "GEN-103", type: "General", status: "vacant", branch: "metro" },
  { id: "GEN-104", type: "General", status: "vacant", branch: "metro" },
  { id: "EMR-01", type: "Emergency", status: "vacant", branch: "metro" },
  { id: "EMR-02", type: "Emergency", status: "vacant", branch: "metro" },
  { id: "EMR-03", type: "Emergency", status: "vacant", branch: "metro" },
  { id: "EMR-04", type: "Emergency", status: "occupied", patientName: "Priya Nair", patientId: "PX-2026-8812", branch: "metro" },
  { id: "ISO-201", type: "Isolation", status: "vacant", branch: "metro" },
  { id: "ISO-202", type: "Isolation", status: "vacant", branch: "metro" },
  
  // North branch beds
  { id: "ICU-N1", type: "ICU", status: "vacant", branch: "north" },
  { id: "GEN-N1", type: "General", status: "occupied", patientName: "Vikram Malhotra", patientId: "PX-2026-7734", branch: "north" },
  
  // South branch beds
  { id: "ICU-S1", type: "ICU", status: "vacant", branch: "south" },
  { id: "GEN-S1", type: "General", status: "vacant", branch: "south" }
];

const INITIAL_AUDITS: AuditLog[] = [
  { id: "LOG-001", timestamp: "2026-08-07 20:30:15", user: "Dr. Sandeep Mehta", role: "Doctor", action: "Prescription Signed", module: "OPD Consultation", details: "Prescribed Amlodipine 5mg to PX-2026-9041" },
  { id: "LOG-002", timestamp: "2026-08-07 20:45:22", user: "Nurse Deepa Roy", role: "Nurse", action: "Vitals Recorded", module: "IPD Ward A", details: "Updated vitals for patient Aarav Sharma" },
  { id: "LOG-003", timestamp: "2026-08-07 21:00:05", user: "Radha Iyer", role: "Receptionist", action: "New Patient Registered", module: "Patient Registration", details: "Registered Priya Nair (PX-2026-8812)" },
  { id: "LOG-004", timestamp: "2026-08-07 21:15:40", user: "Accountant Amit Sen", role: "Accountant", action: "Invoice Generated", module: "Billing & Finance", details: "Generated bill for Vikram Malhotra, received payment" }
];

const INITIAL_ALERTS: EmergencyAlert[] = [
  { id: "AL-1", timestamp: "2026-08-07 21:05:00", location: "ICU Bed A3", type: "Code Blue", message: "Patient Ramesh Sen showing cardiac arrest. Resuscitation team dispatched.", severity: "critical" },
  { id: "AL-2", timestamp: "2026-08-07 21:20:12", location: "Emergency Bed E2", type: "Trauma Alert", message: "Multiple trauma patient arriving via ambulance in 5 mins.", severity: "high" },
  { id: "AL-3", timestamp: "2026-08-07 21:25:40", location: "Lab 02", type: "Critical Lab Value", message: "Glucose level for PX-2026-8812 is extremely high (410 mg/dL).", severity: "high" }
];

const INITIAL_EXPENSES: Expense[] = [
  { id: "EXP-001", timestamp: "2026-08-07 10:00:00", category: "Pharmacy Stock", description: "Batch purchase of Metformin and Antibiotics from Cipla Ltd", amount: 45000, branch: "metro" },
  { id: "EXP-002", timestamp: "2026-08-07 12:30:00", category: "Lab Supplies", description: "Reagents for Pathology Blood Glucose analyzers (Transasia Bio-Medicals)", amount: 15000, branch: "metro" },
  { id: "EXP-003", timestamp: "2026-08-07 15:45:00", category: "Utilities", description: "Monthly ICU Oxygen Cylinder refilling service from Praxair India", amount: 28000, branch: "metro" },
  { id: "EXP-004", timestamp: "2026-08-07 16:15:00", category: "Biomedical Waste", description: "Safe segregation and incineration service fee (Maridi Eco Industries)", amount: 7800, branch: "metro" }
];

const INITIAL_EMPLOYEES: Employee[] = [
  { id: "EMP-101", name: "Dr. Sandeep Mehta", role: "Chief Cardiologist", department: "OPD Medicine", salary: 180000, status: "active", leaveBalance: 14 },
  { id: "EMP-102", name: "Nurse Deepa Roy", role: "Head ICU Nurse", department: "ICU Specialty", salary: 65000, status: "active", leaveBalance: 18 },
  { id: "EMP-103", name: "Technician Rohan Sen", role: "Senior Pathologist", department: "Laboratory", salary: 55000, status: "active", leaveBalance: 12 },
  { id: "EMP-104", name: "Pharmacist Anil Kulkarni", role: "Inventory Lead", department: "Pharmacy Desk", salary: 48000, status: "active", leaveBalance: 20 },
  { id: "EMP-105", name: "Radha Iyer", role: "Desk Executive", department: "Reception Desk", salary: 32000, status: "active", leaveBalance: 15 },
  { id: "EMP-106", name: "Accountant Amit Sen", role: "Lead Billing Controller", department: "Billing Dept", salary: 45000, status: "active", leaveBalance: 16 },
  { id: "EMP-107", name: "Dr. Ananya Ray", role: "Chief Endocrinologist", department: "OPD Medicine", salary: 165000, status: "active", leaveBalance: 11 }
];

const INITIAL_BLOOD_BANK: BloodBankUnit[] = [
  { bloodGroup: "A+", units: 18, temp: 4.1, status: "optimal", lastChecked: "2026-08-07 20:00" },
  { bloodGroup: "A-", units: 4, temp: 4.3, status: "low", lastChecked: "2026-08-07 20:15" },
  { bloodGroup: "B+", units: 22, temp: 3.9, status: "optimal", lastChecked: "2026-08-07 19:45" },
  { bloodGroup: "B-", units: 2, temp: 4.2, status: "critical", lastChecked: "2026-08-07 21:10" },
  { bloodGroup: "O+", units: 28, temp: 4.0, status: "optimal", lastChecked: "2026-08-07 20:30" },
  { bloodGroup: "O-", units: 1, temp: 4.4, status: "critical", lastChecked: "2026-08-07 21:05" },
  { bloodGroup: "AB+", units: 12, temp: 3.8, status: "optimal", lastChecked: "2026-08-07 19:30" },
  { bloodGroup: "AB-", units: 3, temp: 4.1, status: "low", lastChecked: "2026-08-07 20:55" }
];

const INITIAL_VACCINES: VaccineStock[] = [
  { name: "BCG (Tuberculosis)", batchNo: "BCG-903A", units: 120, manufacturer: "Serum Institute of India", minAgeWeeks: 0, status: "instock" },
  { name: "Hepatitis B (HepB)", batchNo: "HEPB-771B", units: 15, manufacturer: "Bharat Biotech", minAgeWeeks: 0, status: "reorder" },
  { name: "Rotavirus Vaccine (RV)", batchNo: "ROTA-332D", units: 85, manufacturer: "Bharat Biotech", minAgeWeeks: 6, status: "instock" },
  { name: "Measles-Rubella (MR)", batchNo: "MRV-004C", units: 60, manufacturer: "Serum Institute of India", minAgeWeeks: 36, status: "instock" },
  { name: "Tdap (Tetanus, Diphtheria, Pertussis)", batchNo: "TDAP-110X", units: 8, manufacturer: "Biological E. Limited", minAgeWeeks: 364, status: "reorder" }
];

const ICD_DISEASE_DB = [
  { code: "I10", title: "Essential (primary) hypertension", chapter: "Diseases of the circulatory system" },
  { code: "E11.9", title: "Type 2 diabetes mellitus without complications", chapter: "Endocrine, nutritional or metabolic diseases" },
  { code: "J45.909", title: "Unspecified asthma, uncomplicated", chapter: "Diseases of the respiratory system" },
  { code: "I21.9", title: "Acute myocardial infarction, unspecified", chapter: "Diseases of the circulatory system" },
  { code: "N18.9", title: "Chronic kidney disease, unspecified", chapter: "Diseases of the genitourinary system" }
];

const DISEASE_ADVICE_TEMPLATES = [
  {
    name: "Hypertension Advice Protocol",
    advice: "1. Follow low-sodium DASH diet (<1500mg daily).\n2. Aerobic exercise 30 minutes daily.\n3. Daily morning BP tracking.\n4. Avoid OTC decongestants."
  },
  {
    name: "Type 2 Diabetes Protocol",
    advice: "1. Maintain blood glucose diaries (Fasting & PP).\n2. Restrict direct sugar/high glycemic carbohydrates.\n3. Check feet daily for sensation/minor cuts.\n4. Periodic HbA1c audits."
  },
  {
    name: "Acute Asthma Protocol",
    advice: "1. Carry rescue inhaler (Salbutamol) at all times.\n2. Keep dust and allergen triggers minimum.\n3. Check peak flow rate daily.\n4. Follow up if rescue inhaler used >2 times per week."
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function App() {
  // Navigation & Role States
  const [activeRole, setActiveRole] = useState<'admin' | 'doctor' | 'nurse' | 'receptionist' | 'lab_tech' | 'pharmacist' | 'accountant' | 'case_manager' | 'patient_portal'>('doctor');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Chain management / location selection
  const [activeBranch, setActiveBranch] = useState<'metro' | 'north' | 'south'>('metro');

  // App State Data
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [beds, setBeds] = useState<BedInfo[]>(INITIAL_BEDS);
  const [audits, setAudits] = useState<AuditLog[]>(INITIAL_AUDITS);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(INITIAL_ALERTS);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [bloodStock, setBloodStock] = useState<BloodBankUnit[]>(INITIAL_BLOOD_BANK);
  const [vaccineStock, setVaccineStock] = useState<VaccineStock[]>(INITIAL_VACCINES);
  const [toasts, setToasts] = useState<{ id: string; type: 'success' | 'danger' | 'warning' | 'info'; message: string }[]>([]);

  // Workspace Specific Active Selection
  const [selectedPatientId, setSelectedPatientId] = useState<string>(INITIAL_PATIENTS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCommandPalette, setShowCommandPalette] = useState<boolean>(false);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState<boolean>(false);

  // Advanced Registration Module Form & Operational State
  const [regStep, setRegStep] = useState<number>(1);
  const [regType, setRegType] = useState<'new' | 'walkin' | 'emergency' | 'referral' | 'corporate' | 'online'>('new');
  const [regForm, setRegForm] = useState({
    name: '', age: '', gender: 'Male', bloodGroup: 'O+', phone: '', email: '',
    address: '', tpaProvider: 'None', insuranceId: '', heartRate: '75',
    bloodPressure: '120/80', temperature: '98.6', oxygenSat: '98', respiratoryRate: '16',
    esiScore: '3', pregnancyStatus: false
  });
  const [idProofType, setIdProofType] = useState<'Aadhaar' | 'Passport' | 'None'>('Aadhaar');
  const [idProofNumber, setIdProofNumber] = useState('');
  const [otpStatus, setOtpStatus] = useState<'idle' | 'sending' | 'sent' | 'verified'>('idle');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [duplicatePatientAlert, setDuplicatePatientAlert] = useState(false);
  const [ocrAutoFilled, setOcrAutoFilled] = useState(false);
  const [insuranceEligibilityChecked, setInsuranceEligibilityChecked] = useState<'none' | 'checking' | 'approved' | 'rejected'>('none');
  const [registrationFees, setRegistrationFees] = useState(200);
  const [consultationFees, setConsultationFees] = useState(600);
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [assignedDoctor, setAssignedDoctor] = useState('Dr. Sandeep Mehta');
  const [assignedDept, setAssignedDept] = useState('Cardiology');
  const [assignedSlot, setAssignedSlot] = useState('10:30 AM');
  const [referralSource, setReferralSource] = useState('');
  const [corporateEmployer, setCorporateEmployer] = useState('');
  const [documentUploads, setDocumentUploads] = useState({ idProof: false, insurance: false, referral: false, priorRecords: false, consent: false });
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState<any>(null);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  
  // Enterprise OPD Module States
  const [soapSubjective, setSoapSubjective] = useState({ chiefComplaint: 'Severe retrosternal pressure radiating to left arm', hpi: 'Patient reports progressive dyspnea and pressure over past 4 hours. No active palpitations.', medicalHistory: 'Hypertension (8 years), Mild Dyslipidemia', familyHistory: 'Father: MI at age 52, Mother: Type 2 Diabetes', surgicalHistory: 'Appendectomy (2018)' });
  const [soapObjective, setSoapObjective] = useState({ height: 175, weight: 82, painScale: 6, lifestyle: 'High operational stress, low cardio, moderate diet compliance', mentalHealth: 'PHQ-9 Score: 5 (Mild depressive indicators)' });
  const [soapAssessment, setSoapAssessment] = useState({ diagnosisCode: 'Essential hypertension [I10]', differential: 'Angina Pectoris, Coronary Artery Disease, Myocardial Infarction' });
  const [soapPlan, setSoapPlan] = useState({ treatment: 'Prescribe Telmisartan 40mg PO QD, Lipvas 10mg PO HS. Restrict sodium. Schedule lipid profile test.', referralSpecialist: 'Cardiology (Internal)' });
  const [digitalSignatureChecked, setDigitalSignatureChecked] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('Standard Adult Assessment');
  const [rxLanguage, setRxLanguage] = useState('English');
  const [followupDate, setFollowupDate] = useState('2026-08-22');
  const [followupRecurring, setFollowupRecurring] = useState(false);
  const [followupChannel, setFollowupChannel] = useState('WhatsApp');
  const [doctorDictating, setDoctorDictating] = useState(false);
  const [opdFilter, setOpdFilter] = useState<'all' | 'waiting' | 'completed' | 'priority'>('all');
  const [opdSearchQuery, setOpdSearchQuery] = useState('');
  const [showAiPanel, setShowAiPanel] = useState(true);
  const [activeReportTab, setActiveReportTab] = useState<'daily' | 'doctor' | 'department' | 'diagnosis' | 'prescriptions' | 'followups' | 'revenue'>('daily');
  const [moduleVisibility, setModuleVisibility] = useState<Record<string, boolean>>({
    dashboard: true,
    registration: true,
    appointments: true,
    consultation: true,
    icu: true,
    ot: true,
    wards: true,
    lab: true,
    pharmacy: true,
    bloodbank: true,
    mrd: true,
    billing: true,
    expense: true,
    analytics: true
  });
  const ROLE_PERMISSIONS: Record<string, Record<string, boolean>> = {
    admin: { dashboard: true, registration: true, appointments: true, consultation: true, icu: true, ot: true, wards: true, lab: true, pharmacy: true, bloodbank: true, mrd: true, billing: true, expense: true, analytics: true },
    doctor: { dashboard: true, registration: false, appointments: true, consultation: true, icu: true, ot: true, wards: true, lab: true, pharmacy: true, bloodbank: true, mrd: true, billing: false, expense: false, analytics: true },
    anesthetist: { dashboard: true, registration: false, appointments: false, consultation: false, icu: true, ot: true, wards: false, lab: true, pharmacy: true, bloodbank: true, mrd: false, billing: false, expense: false, analytics: false },
    nurse: { dashboard: true, registration: true, appointments: true, consultation: false, icu: true, ot: true, wards: true, lab: true, pharmacy: false, bloodbank: true, mrd: true, billing: false, expense: false, analytics: false },
    receptionist: { dashboard: true, registration: true, appointments: true, consultation: false, icu: false, ot: false, wards: true, lab: false, pharmacy: false, bloodbank: false, mrd: true, billing: true, expense: false, analytics: false },
    lab_tech: { dashboard: false, registration: false, appointments: false, consultation: false, icu: false, ot: false, wards: false, lab: true, pharmacy: false, bloodbank: true, mrd: false, billing: false, expense: false, analytics: false },
    pharmacist: { dashboard: false, registration: false, appointments: false, consultation: false, icu: false, ot: false, wards: false, lab: false, pharmacy: true, bloodbank: false, mrd: false, billing: true, expense: true, analytics: false },
    accountant: { dashboard: true, registration: false, appointments: false, consultation: false, icu: false, ot: false, wards: false, lab: false, pharmacy: false, bloodbank: false, mrd: true, billing: true, expense: true, analytics: true }
  };

  // Visibility Check Helper (Combines Admin Global Toggle + Role Access Control)
  const isModuleVisible = (moduleKey: string) => {
    if (moduleVisibility[moduleKey] === false) return false;
    if (activeRole === 'admin') return true;
    const rolePerms = ROLE_PERMISSIONS[activeRole];
    return rolePerms ? rolePerms[moduleKey] !== false : true;
  };

  // Prescription builder form
  const [newMed, setNewMed] = useState({ medication: '', dosage: '', frequency: '', duration: '', instructions: '' });
  const [newOrder, setNewOrder] = useState({ testName: '', category: 'pathology' as 'pathology' | 'radiology', outsourced: false, outsourceLab: '', referralShare: '0' });

  // Doctor AI Workspace Toggle
  const [aiAnalysisType, setAiAnalysisType] = useState<'summary' | 'prediction' | 'diet'>('summary');
  const [aiAssistantQuery, setAiAssistantQuery] = useState<string>('');
  const [aiAssistantChat, setAiAssistantChat] = useState<{ sender: 'ai' | 'user'; text: string }[]>([
    { sender: 'ai', text: "Hello Dr. Sandeep. I can analyze patient vitals, predict potential disease paths, check drug-drug interactions, or write custom summaries. How can I help you today?" }
  ]);

  // Lab Result Form States
  const [labEntryId, setLabEntryId] = useState<string>('');
  const [labEntryValue, setLabEntryValue] = useState<string>('');
  const [labEntryRange, setLabEntryRange] = useState<string>('');

  // TPA & Claim status
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [selectedTabCategory, setSelectedTabCategory] = useState<string>('all');

  // OPD Advice & Certs State
  const [consultationNotes, setConsultationNotes] = useState<string>('');
  const [fitnessCertDetails, setFitnessCertDetails] = useState({ patientName: '', purpose: '', durationDays: '3', notes: '' });
  const [showFitnessDialog, setShowFitnessDialog] = useState(false);

  // PC-PNDT Form F State (Radiology Specific compliance for India)
  const [showFormFDialog, setShowFormFDialog] = useState(false);
  const [formFData, setFormFData] = useState({
    patientId: 'PX-2026-9041',
    patientName: 'Priya Sharma',
    patientAge: '28',
    husbandName: 'Aarav Sharma',
    address: 'Flat 402, Green Valley Apartments, New Delhi',
    livingChildren: '1 Female',
    gestationalWeeks: '24',
    usgIndication: 'Routine Anomaly Scan (Fetal Growth & Anatomy)',
    declarationSigned: true,
    radiologistName: 'Dr. Rajesh K',
    radiologistRegNo: 'MP-9011-PC-PNDT',
    pregnantWeek: '24',
    isGeneticCounselingDone: true,
    declarationNoGenderSelection: true,
    consentFormSigned: true
  });

  // Pharmacy Language Toggles & OTC Fast Billing
  const [pharmacyLanguage, setPharmacyLanguage] = useState<'en' | 'hi' | 'te' | 'ta' | 'bn'>('en');
  const [otcBillForm, setOtcBillForm] = useState({ medicine: '', qty: '1', price: '120', customerName: 'OTC Walk-in' });

  // MRD ICD coding search state
  const [mrdSearchTerm, setMrdSearchTerm] = useState('');
  const [selectedIcdCode, setSelectedIcdCode] = useState('');

  // OT Surgery Scheduling state
  const [otPatientId, setOtPatientId] = useState('');
  const [otSurgeryName, setOtSurgeryName] = useState('');
  const [otAnesthesiaReady, setOtAnesthesiaReady] = useState(false);
  const [otDigitalConsent, setOtDigitalConsent] = useState(false);

  // Expense form state
  const [expCategory, setExpCategory] = useState('Pharmacy Stock');
  const [expAmount, setExpAmount] = useState('');
  const [expDesc, setExpDesc] = useState('');

  // Telemedicine Active Video session State
  const [telemedActive, setTelemedActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // IPD Management: Advanced details selection
  const [selectedIpdPatientId, setSelectedIpdPatientId] = useState<string>('PX-2026-9041');
  const [ipdTab, setIpdTab] = useState<'overview' | 'emar' | 'fluid' | 'gcs' | 'transfer' | 'rounds' | 'readiness' | 'icu'>('overview');
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [icuSubTab, setIcuSubTab] = useState<'whiteboard' | 'handover' | 'hourly' | 'orders_docs' | 'reports' | 'ai'>('whiteboard');
  const [showCodeBlueModal, setShowCodeBlueModal] = useState(false);
  const [showIcuDischargeModal, setShowIcuDischargeModal] = useState(false);
  const [showIcuConsentModal, setShowIcuConsentModal] = useState(false);

  // Dynamic ICU Patients Bed State
  const [icuBeds, setIcuBeds] = useState([
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

  // Dynamic Shift Handovers State
  const [icuHandovers, setIcuHandovers] = useState([
    { id: 1, author: 'Sister Priya → Sister Anjali', time: '08:00 AM', bed: 'ICU-A2 (Aarav Sharma)', text: 'Norad drip stable @ 0.04. ABG pH 7.39. Arterial line zeroed.' },
    { id: 2, author: 'Dr. Sandeep Mehta → Dr. Deepa Roy', time: '09:30 AM', bed: 'ICU-A3 (Ramesh Sen)', text: 'Plan weaning trial at 14:00 if PaO2 > 90 on PEEP 5.' }
  ]);

  // Dynamic Hourly Charts State
  const [hourlyLogs, setHourlyLogs] = useState([
    { id: 1, time: '09:00 AM', map: 101, cvp: 8.5, urine: '45mL', status: 'Logged' },
    { id: 2, time: '10:00 AM', map: 98, cvp: 8.2, urine: '40mL', status: 'Logged' }
  ]);

  // Dynamic Code Blue Audit Logs State
  const [codeBlueLogs, setCodeBlueLogs] = useState([
    { id: 1, bed: 'ICU-A2 (Aarav Sharma)', time: '2026-08-07 22:15 PM', cpr: '2 min 30 sec', shocks: '1 shock 200J', result: 'ROSC Restored @ 22:18' }
  ]);

  // Selected Patient Target Bed State for Step-Down & Actions
  const [selectedIcuBedId, setSelectedIcuBedId] = useState<string>('PX-2026-9041');

  // New Admission Modal Form State
  const [newAdmissionName, setNewAdmissionName] = useState('');
  const [newAdmissionUnit, setNewAdmissionUnit] = useState('CCU');
  const [newAdmissionBed, setNewAdmissionBed] = useState('ICU-B3');
  const [newAdmissionAcuity, setNewAdmissionAcuity] = useState<'stable' | 'observation' | 'critical'>('critical');
  const [newAdmissionConsultant, setNewAdmissionConsultant] = useState('Dr. Sandeep Mehta');

  // Handover Input Form State
  const [newHandoverText, setNewHandoverText] = useState('');
  const [newHandoverBed, setNewHandoverBed] = useState('ICU-A2 (Aarav Sharma)');

  // Intake/Output Form States
  const [ivIntake, setIvIntake] = useState('');
  const [oralIntake, setOralIntake] = useState('');
  const [urineOutput, setUrineOutput] = useState('');
  const [drainOutput, setDrainOutput] = useState('');

  // ADT Transfer bed selector
  const [transferTargetBed, setTransferTargetBed] = useState('');

  // 4.6 OT Management Enterprise SaaS State
  const [otSubTab, setOtSubTab] = useState<'whiteboard' | 'schedule' | 'preop_team' | 'intraop_anesthesia' | 'postop_pacu' | 'billing_resources' | 'analytics_ai'>('whiteboard');
  const [showOtBookingModal, setShowOtBookingModal] = useState(false);
  const [showWhoChecklistModal, setShowWhoChecklistModal] = useState(false);
  const [showOtTeamModal, setShowOtTeamModal] = useState(false);
  const [showImplantModal, setShowImplantModal] = useState(false);
  const [showAiDraftModal, setShowAiDraftModal] = useState(false);

  // Enterprise SaaS OT Surgery Cases Array
  const [otSurgeries, setOtSurgeries] = useState([
    {
      id: 'OT-2026-101',
      patientName: 'Aarav Sharma',
      patientId: 'PX-2026-9041',
      otRoom: 'OT-1 (Cardiac Suite)',
      procedure: 'Coronary Artery Bypass Graft (CABG)',
      surgeon: 'Dr. Sandeep Mehta',
      assistantSurgeon: 'Dr. Alok Verma',
      anesthetist: 'Dr. Vikram Malhotra',
      otNurse: 'Sister Sunita',
      otTechnician: 'Tech Rahul',
      timeSlot: '09:00 AM - 01:00 PM',
      category: 'Planned Elective',
      phase: 'In-Procedure', // 'Scheduled' | 'Preparing' | 'In-Procedure' | 'Recovery' | 'Completed'
      anesthesiaType: 'General Anesthesia (ETT)',
      pacStatus: 'Cleared (ASA Grade III)',
      consentSigned: true,
      bloodLossMl: 250,
      spongeCount: '24/24 Verified',
      preOpPrep: { NPO: true, siteMarked: true, ivAntibiotic: true, bloodCrossMatch: '2 Units PRBC Ready', equipmentVerified: true },
      opNote: 'Successful 3-vessel CABG (LIMA to LAD, SVG to OM1, SVG to PDA). CPB time 78 min. Cross-clamp time 45 min. Chest closed with steel wires.',
      whoChecklist: { signIn: true, timeOut: true, signOut: false },
      delayTracking: 'On Schedule (0 min delay)',
      implantDetails: 'Sternal Steel Wires (Lot #SW-9921, Exp 2032), Saphenous Vein Grafts',
      billingTotal: 65400,
      aiPredictedDuration: '3h 45m (Confidence 94%)',
      aiPostOpRecommendation: 'Maintain MAP > 70 mmHg. Wean sedation in 6 hours. ICU Step-Down Target: Day 2.',
      pacuStatus: 'In PACU Bed 1 | Aldrete Score 8/10 | Stable'
    },
    {
      id: 'OT-2026-102',
      patientName: 'Ramesh Sen',
      patientId: 'PX-2026-9042',
      otRoom: 'OT-2 (Neuro Suite)',
      procedure: 'Craniotomy & Tumor Resection',
      surgeon: 'Dr. Ananya Ray',
      assistantSurgeon: 'Dr. Rohit Sharma',
      anesthetist: 'Dr. Rajesh K',
      otNurse: 'Sister Kavita',
      otTechnician: 'Tech Suresh',
      timeSlot: '02:00 PM - 06:00 PM',
      category: 'Planned Elective',
      phase: 'Preparing',
      anesthesiaType: 'General Anesthesia',
      pacStatus: 'Cleared (ASA Grade II)',
      consentSigned: true,
      bloodLossMl: 0,
      spongeCount: 'Pending',
      preOpPrep: { NPO: true, siteMarked: true, ivAntibiotic: false, bloodCrossMatch: '4 Units PRBC Ready', equipmentVerified: true },
      opNote: '',
      whoChecklist: { signIn: true, timeOut: false, signOut: false },
      delayTracking: 'Minor Prep Delay (10 min)',
      implantDetails: 'Titanium Cranial Plate & Screws (Lot #CP-4012)',
      billingTotal: 58200,
      aiPredictedDuration: '4h 15m (Confidence 91%)',
      aiPostOpRecommendation: 'Frequent neuro checks 1-hourly. Keep head elevated 30 degrees.',
      pacuStatus: 'Scheduled for PACU Bed 3'
    },
    {
      id: 'OT-2026-103',
      patientName: 'Kabir Khan',
      patientId: 'PX-2026-9043',
      otRoom: 'OT-4 (Emergency OT)',
      procedure: 'Emergency Laparotomy & Splenectomy',
      surgeon: 'Dr. Deepa Roy',
      assistantSurgeon: 'Dr. Manish Kumar',
      anesthetist: 'Dr. Vikram Malhotra',
      otNurse: 'Sister Anjali',
      otTechnician: 'Tech Amit',
      timeSlot: 'NOW (STAT)',
      category: 'Emergency STAT',
      phase: 'Preparing',
      anesthesiaType: 'Rapid Sequence Intubation',
      pacStatus: 'Emergency Clearance (ASA Grade IV-E)',
      consentSigned: true,
      bloodLossMl: 600,
      spongeCount: 'Pending',
      preOpPrep: { NPO: false, siteMarked: true, ivAntibiotic: true, bloodCrossMatch: '6 Units PRBC Dispatched', equipmentVerified: true },
      opNote: '',
      whoChecklist: { signIn: true, timeOut: true, signOut: false },
      delayTracking: 'STAT Direct Entry',
      implantDetails: 'Surgical Mesh 15x15cm (Lot #SM-8812)',
      billingTotal: 42000,
      aiPredictedDuration: '2h 30m (Confidence 88%)',
      aiPostOpRecommendation: 'Monitor hemoglobin 4-hourly. Transfuse PRBC if Hb < 8.0 g/dL.',
      pacuStatus: 'Direct Transfer to ICU Post-Op'
    }
  ]);

  const [selectedOtId, setSelectedOtId] = useState('OT-2026-101');

  // New Surgery Reservation Form State
  const [newOtPatientName, setNewOtPatientName] = useState('');
  const [newOtProcedure, setNewOtProcedure] = useState('');
  const [newOtRoom, setNewOtRoom] = useState('OT-1 (Cardiac Suite)');
  const [newOtSurgeon, setNewOtSurgeon] = useState('Dr. Sandeep Mehta');
  const [newOtAnesthetist, setNewOtAnesthetist] = useState('Dr. Vikram Malhotra');
  const [newOtCategory, setNewOtCategory] = useState('Planned Elective');

  // Reschedule Surgery Modal State
  const [showOtRescheduleModal, setShowOtRescheduleModal] = useState(false);
  const [rescheduleSlot, setRescheduleSlot] = useState('02:00 PM - 05:00 PM');
  const [rescheduleRoom, setRescheduleRoom] = useState('OT-1 (Cardiac Suite)');

  // Interactive Anesthesia Log State Array
  const [anesthesiaLogs, setAnesthesiaLogs] = useState([
    { id: 1, time: '09:15 AM', drug: 'IV Propofol 150mg + Fentanyl 100mcg (Induction)' },
    { id: 2, time: '09:20 AM', drug: 'IV Rocuronium 50mg (Muscle Relaxant)' },
    { id: 3, time: '10:15 AM', drug: 'IV Heparin 25,000 units (CPB Anticoagulation)' }
  ]);
  const [newAnesthesiaTime, setNewAnesthesiaTime] = useState('');
  const [newAnesthesiaDrug, setNewAnesthesiaDrug] = useState('');

  // Dynamic Implants List Array
  const [implantsList, setImplantsList] = useState([
    { id: 1, name: 'St-Jude Mechanical Heart Valve', lot: 'LOT-HV-2026-90', serial: 'SN-88412-A', expiry: '2032-12-31' },
    { id: 2, name: 'Titanium Cranial Plate System', lot: 'CP-4012', serial: 'SN-9011-B', expiry: '2030-06-30' }
  ]);

  // Team Assignment Form State
  const [teamSurgeon, setTeamSurgeon] = useState('Dr. Sandeep Mehta');
  const [teamAssistant, setTeamAssistant] = useState('Dr. Alok Verma');
  const [teamAnesthetist, setTeamAnesthetist] = useState('Dr. Vikram Malhotra');
  const [teamNurse, setTeamNurse] = useState('Sister Sunita');
  const [teamTech, setTeamTech] = useState('Tech Rahul');

  // Implant Form State
  const [implantName, setImplantName] = useState('St-Jude Mechanical Heart Valve');
  const [implantLotNo, setImplantLotNo] = useState('LOT-HV-2026-90');
  const [implantSerialNo, setImplantSerialNo] = useState('SN-88412-A');
  const [implantExpiry, setImplantExpiry] = useState('2032-12-31');

  // 4.7 Pathology Lab Enterprise SaaS State (15-Pillar Suite)
  const [labSubTab, setLabSubTab] = useState<'workflow_board' | 'booking_packages' | 'samples_tracking' | 'smart_reports' | 'reagents_inventory' | 'finance_referral' | 'ai_analytics'>('workflow_board');
  const [showLabBookingModal, setShowLabBookingModal] = useState(false);
  const [showSmartReportModal, setShowSmartReportModal] = useState(false);
  const [showQrVerifyModal, setShowQrVerifyModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [showDeltaCheckModal, setShowDeltaCheckModal] = useState(false);
  const [showReagentModal, setShowReagentModal] = useState(false);
  const [selectedLabReportId, setSelectedLabReportId] = useState('LAB-2026-101');

  // Booking & Package State
  const [newLabPatientName, setNewLabPatientName] = useState('');
  const [newLabTestName, setNewLabTestName] = useState('Complete Blood Count (CBC) + ESR');
  const [newLabCategory, setNewLabCategory] = useState<'pathology' | 'radiology'>('pathology');
  const [newLabCollectionMode, setNewLabCollectionMode] = useState<'walkin' | 'home' | 'corporate'>('home');
  const [newLabRefDoctor, setNewLabRefDoctor] = useState('Dr. Sandeep Mehta');

  // One-Click Test Packages Catalog
  const [testPackages, setTestPackages] = useState([
    { id: 'PKG-101', name: 'Executive Master Health Package', testsCount: 68, originalPrice: 4500, packagePrice: 1999, category: 'Comprehensive' },
    { id: 'PKG-102', name: 'Complete Cardiac Risk Panel', testsCount: 14, originalPrice: 3200, packagePrice: 1499, category: 'Cardiology' },
    { id: 'PKG-103', name: 'Comprehensive Diabetes & Renal Profile', testsCount: 22, originalPrice: 2800, packagePrice: 1199, category: 'Endocrinology' },
    { id: 'PKG-104', name: 'Senior Citizen Full Body Screening', testsCount: 82, originalPrice: 5500, packagePrice: 2499, category: 'Geriatric' }
  ]);

  // Reagents & Consumables Inventory
  const [reagentsList, setReagentsList] = useState([
    { id: 'REG-501', name: 'Sysmex Cellpack DCL Diluent (CBC)', lot: 'LOT-SY-2026-A', stockLevel: 14, minThreshold: 5, unit: 'Bottles (20L)', expiry: '2027-04-30', status: 'Optimal' },
    { id: 'REG-502', name: 'Roche Cobas c501 Glucose HK Assay Kit', lot: 'LOT-RC-8841-B', stockLevel: 2, minThreshold: 4, unit: 'Kits (800 Tests)', expiry: '2026-09-15', status: 'Low Stock Alert' },
    { id: 'REG-503', name: 'Bio-Rad HbA1c HPLC Reagent Cartridge', lot: 'LOT-BR-9901-C', stockLevel: 8, minThreshold: 3, unit: 'Cartridges', expiry: '2026-08-30', status: 'Expiring Soon' }
  ]);

  // Outsourced Samples Register Array
  const [outsourcedSamples, setOutsourcedSamples] = useState([
    { id: 'OUT-9901', patientName: 'Aarav Sharma', testName: 'GeneXpert HLA-B27 PCR', partnerLab: 'Metropolis Healthcare', dispatchTime: '2026-08-08 08:30 AM', trackingNo: 'DHL-884129-IN', tempStatus: '2.4°C (Cold-Chain OK)', status: 'Dispatched' },
    { id: 'OUT-9902', patientName: 'Ramesh Sen', testName: 'Liquid Biopsy NGS Panel', partnerLab: 'Dr. Lal PathLabs', dispatchTime: '2026-08-07 04:15 PM', trackingNo: 'BLUEDART-9011-X', tempStatus: '4.1°C (Cold-Chain OK)', status: 'Results Received' }
  ]);

  // 4.9 Pharmacy Suite State
  const [pharmacyDeptFilter, setPharmacyDeptFilter] = useState<'all' | 'opd' | 'ipd' | 'icu' | 'ot'>('all');
  const [showPharmacyReceiptModal, setShowPharmacyReceiptModal] = useState(false);
  const [pharmacyReceiptData, setPharmacyReceiptData] = useState({
    billNo: 'PHARM-2026-9041',
    customerName: 'Aarav Sharma',
    medicineName: 'Paracetamol 650mg & Amoxicillin 500mg',
    qty: '2',
    totalAmount: 240,
    department: 'OPD Consultation',
    tpaStatus: 'Cashless Pre-Auth Approved (Star Health TPA)',
    date: '2026-08-08 11:35 AM'
  });

  // Standalone Pharmacy Product Mode Toggle
  const [isStandalonePharmacy, setIsStandalonePharmacy] = useState(() => {
    return typeof window !== 'undefined' && window.location.search.includes('app=pharmacy');
  });

  // HexenCare Pharmacy Engine State (3 Editions & 20 Pillars)
  const [pmsEdition, setPmsEdition] = useState<'hospital' | 'retail' | 'chain'>('hospital');
  const [pmsSubTab, setPmsSubTab] = useState<'pos_cashier' | 'medicine_master' | 'inventory_batches' | 'purchases_suppliers' | 'prescriptions_ocr' | 'multistore_chain' | 'delivery_crm' | 'reports_ai'>('pos_cashier');
  const [showOcrModal, setShowOcrModal] = useState(false);
  const [showVoiceBillingModal, setShowVoiceBillingModal] = useState(false);
  const [pmsHoldBills, setPmsHoldBills] = useState([
    { id: 'HOLD-801', customerName: 'Rohan Mehta', itemsCount: 3, total: 450, time: '11:20 AM' }
  ]);
  const [pmsMedicines, setPmsMedicines] = useState([
    { id: 'MED-101', brand: 'Dolo 650mg', generic: 'Paracetamol', composition: 'Paracetamol IP 650mg', schedule: 'Schedule H', hsn: '30049099', gst: 12, mrp: 34, purchasePrice: 22, sellingPrice: 30, stock: 1240, expiry: '2027-10-15' },
    { id: 'MED-102', brand: 'Augmentin 625mg', generic: 'Amoxicillin + Clavulanate', composition: 'Amoxicillin 500mg + Clavulanic Acid 125mg', schedule: 'Schedule H1', hsn: '30041010', gst: 12, mrp: 204, purchasePrice: 145, sellingPrice: 185, stock: 450, expiry: '2026-11-20' },
    { id: 'MED-103', brand: 'Pan 40mg', generic: 'Pantoprazole', composition: 'Pantoprazole Sodium 40mg', schedule: 'Schedule H', hsn: '30049099', gst: 12, mrp: 155, purchasePrice: 98, sellingPrice: 135, stock: 890, expiry: '2027-04-30' }
  ]);
  const [pmsStores, setPmsStores] = useState([
    { id: 'STR-001', name: 'Central Warehouse & Hub', type: 'Main Hub', location: 'Medical College Zone', stockValue: '₹48,50,000', manager: 'Suresh Kumar' },
    { id: 'STR-002', name: 'Downtown Retail Store', type: 'Retail Branch', location: 'MG Road Plaza', stockValue: '₹12,40,000', manager: 'Anita Verma' },
    { id: 'STR-003', name: 'Airport Metro Branch', type: 'Express POS', location: 'Terminal 2 Concourse', stockValue: '₹6,80,000', manager: 'Vikram Joshi' }
  ]);

  // User-Friendly Simple Dashboard State
  const [dashboardViewMode, setDashboardViewMode] = useState<'all' | 'doctor' | 'ipd_icu' | 'ot' | 'lab'>('all');

  // 15-Pillar Enterprise Radiology Suite State
  const [radSubTab, setRadSubTab] = useState<'workflow_pipeline' | 'booking_packages' | 'investigation_templates' | 'form_f_pacs' | 'machines_scheduling' | 'multichannel_billing' | 'ai_analytics'>('workflow_pipeline');
  const [showPacsViewerModal, setShowPacsViewerModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showRadBookingModal, setShowRadBookingModal] = useState(false);
  const [showVoiceDictationModal, setShowVoiceDictationModal] = useState(false);
  const [showMachineDowntimeModal, setShowMachineDowntimeModal] = useState(false);
  const [showCriticalAlertModal, setShowCriticalAlertModal] = useState(false);
  const [selectedRadStudyId, setSelectedRadStudyId] = useState('RAD-2026-801');
  const [selectedRadTemplate, setSelectedRadTemplate] = useState('Chest X-Ray PA View');
  const [radVoiceText, setRadVoiceText] = useState('Impression: Minimal disc bulge at L4-L5 level with preserved vertebral heights.');

  // Radiology Diagnostic Packages
  const [radPackages, setRadPackages] = useState([
    { id: 'RPKG-101', name: 'Comprehensive Neuro Imaging Package (Brain CT + Spine MRI)', modality: 'CT + MRI', price: 9500, originalPrice: 14000, testsCount: 2, status: 'Active' },
    { id: 'RPKG-102', name: 'Executive Cardiac & Vascular CT Angiography', modality: '128-Slice CT', price: 7999, originalPrice: 12000, testsCount: 1, status: 'Active' },
    { id: 'RPKG-103', name: 'Full Body Wellness MRI & USG Screening', modality: '3T MRI + USG', price: 14999, originalPrice: 22000, testsCount: 3, status: 'Active' }
  ]);

  // Radiology Machine & Room Registry
  const [radMachines, setRadMachines] = useState([
    { id: 'MCH-3T-01', name: 'Siemens Magnetom 3T MRI Suite', room: 'MRI Bay 1', status: 'Operational', uptime: '99.2%', nextService: '2026-09-15', techOnDuty: 'Rajesh Kumar (Tech)' },
    { id: 'MCH-CT-02', name: 'GE Revolution 128-Slice CT Scanner', room: 'CT Suite 2', status: 'Operational', uptime: '98.7%', nextService: '2026-08-25', techOnDuty: 'Amit Verma (Tech)' },
    { id: 'MCH-USG-03', name: 'Philips HD11 XE Ultrasound & Doppler', room: 'USG Room 3', status: 'Maintenance', uptime: '94.5%', nextService: '2026-08-10', techOnDuty: 'Pooja Singh (Tech)' }
  ]);

  // Radiology DICOM Worklist Queue with Priority & Patient Prep
  const [radiologyWorklist, setRadiologyWorklist] = useState([
    { id: 'RAD-2026-801', patientName: 'Priya Sharma', modality: 'USG', studyName: 'Obstetric Anomaly Scan (PC-PNDT Form F)', priority: 'Routine', prepStatus: 'NPO Fasting OK', requestedBy: 'Dr. Ananya Ray', date: '2026-08-08 09:15 AM', status: 'PACS Captured', formFSigned: true, criticalFlag: false },
    { id: 'RAD-2026-802', patientName: 'Ramesh Sen', modality: 'CT', studyName: 'NCCT Head / Brain (Trauma Rule-Out)', priority: 'STAT', prepStatus: 'Immediate Scan', requestedBy: 'Dr. Sandeep Mehta', date: '2026-08-08 08:30 AM', status: 'Report Signed Off', formFSigned: false, criticalFlag: true },
    { id: 'RAD-2026-803', patientName: 'Aarav Sharma', modality: 'MRI', studyName: 'MRI Lumbar Spine Contrast', priority: 'Urgent', prepStatus: 'Metal Safety Screened', requestedBy: 'Dr. Deepa Roy', date: '2026-08-07 04:45 PM', status: 'Awaiting Sign-off', formFSigned: false, criticalFlag: false },
    { id: 'RAD-2026-804', patientName: 'Meena Gupta', modality: 'X-Ray', studyName: 'Chest X-Ray PA View', priority: 'Routine', prepStatus: 'Standard Prep', requestedBy: 'Dr. Sandeep Mehta', date: '2026-08-08 10:00 AM', status: 'PACS Captured', formFSigned: false, criticalFlag: false }
  ]);

  // Referring Doctor Revenue Share Ledger
  const [refDoctorEarnings, setRefDoctorEarnings] = useState([
    { id: 1, doctorName: 'Dr. Sandeep Mehta', testName: 'Lipid Profile & HbA1c', fee: 1800, sharePercent: 15, payout: 270, status: 'Approved' },
    { id: 2, doctorName: 'Dr. Ananya Ray', testName: 'Brain MRI Contrast', fee: 6500, sharePercent: 20, payout: 1300, status: 'Pending Audit' },
    { id: 3, doctorName: 'Dr. Deepa Roy', testName: 'Whole Abdomen CT', fee: 4200, sharePercent: 15, payout: 630, status: 'Disbursed' }
  ]);

  // Trigger Dark Mode Toggle
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Toast Trigger Helper
  const addToast = (type: 'success' | 'danger' | 'warning' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Keyboard shortcut listener for Command Palette (Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync default tab when changing roles
  useEffect(() => {
    setActiveTab('dashboard');
  }, [activeRole]);

  // Compute stats helper
  const selectedPatient = useMemo(() => {
    return patients.find(p => p.id === selectedPatientId) || patients[0];
  }, [patients, selectedPatientId]);

  const selectedIpdPatient = useMemo(() => {
    return patients.find(p => p.id === selectedIpdPatientId) || patients[0];
  }, [patients, selectedIpdPatientId]);

  // Filter patients and beds based on branch isolation
  const branchPatients = useMemo(() => {
    return patients.filter(p => p.branch === activeBranch);
  }, [patients, activeBranch]);

  const branchBeds = useMemo(() => {
    return beds.filter(b => b.branch === activeBranch);
  }, [beds, activeBranch]);

  const branchExpenses = useMemo(() => {
    return expenses.filter(e => e.branch === activeBranch);
  }, [expenses, activeBranch]);

  // Calculated vital scores (MAP, Shock Index)
  const calculatedVitalMetrics = useMemo(() => {
    const p = selectedPatient;
    if (!p || !p.vitals.bloodPressure) return { map: 0, shockIndex: 0 };
    const parts = p.vitals.bloodPressure.split('/');
    if (parts.length !== 2) return { map: 0, shockIndex: 0 };
    const sys = parseInt(parts[0]);
    const dia = parseInt(parts[1]);
    const hr = p.vitals.heartRate;

    const mapVal = Math.round(dia + (sys - dia) / 3);
    const shockVal = sys > 0 ? parseFloat((hr / sys).toFixed(2)) : 0;

    return { map: mapVal, shockIndex: shockVal };
  }, [selectedPatient]);

  const statsSummary = useMemo(() => {
    return {
      totalPatients: branchPatients.length,
      waitingQueue: branchPatients.filter(p => p.status === 'waiting').length,
      inConsultation: branchPatients.filter(p => p.status === 'in-consultation').length,
      labPending: branchPatients.filter(p => p.status === 'lab-pending').length,
      pharmacyPending: branchPatients.filter(p => p.status === 'pharmacy-pending').length,
      activeICU: branchBeds.filter(b => b.type === 'ICU' && b.status === 'occupied').length + branchBeds.filter(b => b.type === 'ICU' && b.status === 'critical').length,
      bedOccupancyRate: branchBeds.length > 0 ? Math.round((branchBeds.filter(b => b.status !== 'vacant').length / branchBeds.length) * 100) : 0,
      totalRevenue: branchPatients.reduce((acc, curr) => acc + curr.totalBill, 0),
      pendingBills: branchPatients.reduce((acc, curr) => acc + curr.pendingBill, 0),
      totalExpenses: branchExpenses.reduce((acc, curr) => acc + curr.amount, 0)
    };
  }, [branchPatients, branchBeds, branchExpenses]);

  // Localized instructions maps for Pharmacy E-Prescription
  const getDosageInstruction = (med: string, lang: string) => {
    const defaultInst = med + " - 1 tablet twice daily after meals";
    if (lang === 'hi') {
      return med + " - 1 गोली दिन में दो बार भोजन के बाद";
    }
    if (lang === 'te') {
      return med + " - 1 టాబ్లెట్ రోజుకు రెండుసార్లు భోజనం తర్వాత";
    }
    if (lang === 'ta') {
      return med + " - 1 மாத்திரை தினமும் இரண்டு முறை உணவுக்கு பின்";
    }
    if (lang === 'bn') {
      return med + " - ১ টি ট্যাবলেট দিনে দুবার খাওয়ার পর";
    }
    return defaultInst;
  };

  // Global search options filter for command palette
  const commandPaletteResults = useMemo(() => {
    if (!searchQuery) return [];
    const lower = searchQuery.toLowerCase();
    const matches: { title: string; subtitle: string; action: () => void }[] = [];

    patients.forEach(p => {
      if (p.name.toLowerCase().includes(lower) || p.id.toLowerCase().includes(lower)) {
        matches.push({
          title: `Patient Profile: ${p.name}`,
          subtitle: `${p.gender}, ${p.age} yrs - ID: ${p.id} (${p.branch.toUpperCase()} Branch)`,
          action: () => {
            setActiveBranch(p.branch);
            setSelectedPatientId(p.id);
            setActiveTab('consultation');
            setShowCommandPalette(false);
          }
        });
      }
    });

    if ('registration'.includes(lower) || 'register'.includes(lower)) {
      matches.push({
        title: 'New Patient Registration Form',
        subtitle: 'OPD Quick Registration Desk Form',
        action: () => {
          setActiveTab('registration');
          setShowCommandPalette(false);
        }
      });
    }

    if ('icu'.includes(lower) || 'beds'.includes(lower) || 'ward'.includes(lower)) {
      matches.push({
        title: 'Wards & Bed Matrix',
        subtitle: 'Real-time IPD Map',
        action: () => {
          setActiveTab('wards');
          setShowCommandPalette(false);
        }
      });
    }

    if ('telemed'.includes(lower) || 'video'.includes(lower) || 'virtual'.includes(lower)) {
      matches.push({
        title: 'Telemedicine Desk',
        subtitle: 'Virtual Doctor Consultation Platform',
        action: () => {
          setActiveTab('telemedicine');
          setShowCommandPalette(false);
        }
      });
    }

    return matches;
  }, [searchQuery, patients]);

  // QR-code scan simulation - autofills registration form
  const handleQrRegistrationScan = () => {
    addToast('info', "Scanning Patient ID card QR Code...");
    setTimeout(() => {
      setRegForm({
        name: "Devendra Verma",
        age: "42",
        gender: "Male",
        bloodGroup: "A+",
        phone: "+91 94412 88402",
        email: "d.verma@email.com",
        address: "E-301, Brigade Orchards, Devanahalli, Bengaluru - 562110",
        tpaProvider: "ICICI Lombard",
        insuranceId: "ICICI-VERMA-904",
        heartRate: "72",
        bloodPressure: "128/82",
        temperature: "98.4",
        oxygenSat: "99",
        respiratoryRate: "16",
        esiScore: "3",
        pregnancyStatus: false
      });
      addToast('success', "QR Code scanned successfully! Auto-filled demographic profile and insurance details.");
    }, 1200);
  };

  // ==========================================
  // HANDLERS
  // ==========================================

  // AI OCR Document Scan Simulation
  const handleOcrScanSimulation = () => {
    addToast('info', "Running AI OCR Document Scanner (Aadhaar Card)...");
    setTimeout(() => {
      setRegForm(prev => ({
        ...prev,
        name: "Devendra Verma",
        age: "42",
        gender: "Male",
        bloodGroup: "A+",
        phone: "+91 94412 88402",
        email: "d.verma@email.com",
        address: "E-301, Brigade Orchards, Devanahalli, Bengaluru - 562110"
      }));
      setIdProofType('Aadhaar');
      setIdProofNumber('4412-8840-2904');
      setOcrAutoFilled(true);
      // Check duplicate
      const dup = patients.some(p => p.name.toLowerCase() === "devendra verma" || p.phone === "+91 94412 88402");
      setDuplicatePatientAlert(dup);
      addToast('success', "AI OCR Scan Complete: Extracted details from Aadhaar Card and auto-filled form.");
    }, 1500);
  };

  // Two-Step Mobile Verification OTP simulation
  const handleSendOtp = () => {
    setOtpStatus('sending');
    addToast('info', "Sending OTP message code via SMS gateway...");
    setTimeout(() => {
      setOtpStatus('sent');
      addToast('success', "Verification SMS OTP code (1234) sent to patient's mobile number.");
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === '1234') {
      setOtpStatus('verified');
      addToast('success', "Two-step identity verification successful!");
    } else {
      addToast('danger', "Invalid OTP Code. Please try entering '1234'.");
    }
  };

  // Insurance pre-authorization eligibility check
  const handleCheckInsuranceEligibility = () => {
    setInsuranceEligibilityChecked('checking');
    addToast('info', "Verifying insurance policy number with TPA gateway clearance...");
    setTimeout(() => {
      setInsuranceEligibilityChecked('approved');
      addToast('success', "Star Health Insurance Pre-auth approved! 90% cashless coverage active.");
    }, 1200);
  };

  // Duplicate Check on form value changes
  const handleRegFormNameChange = (val: string) => {
    setRegForm(prev => ({ ...prev, name: val }));
    const dup = patients.some(p => p.name.toLowerCase() === val.trim().toLowerCase());
    setDuplicatePatientAlert(dup);
  };

  // Advanced Registration Form Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name || !regForm.phone || !regForm.age) {
      addToast('danger', "Validation Error: Please fill in Name, Phone, and Age.");
      return;
    }

    const newPatientId = `PX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const uhidNum = `UHID-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const tokenNum = `OPD-${assignedDept.slice(0,3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;
    const totalDue = registrationFees + consultationFees + advanceAmount;

    const newPatient: Patient = {
      id: newPatientId,
      name: regForm.name,
      age: parseInt(regForm.age),
      gender: regForm.gender as any,
      bloodGroup: regForm.bloodGroup,
      phone: regForm.phone,
      email: regForm.email || `${regForm.name.toLowerCase().replace(' ', '')}@email.com`,
      address: regForm.address || 'Address not specified',
      tpaProvider: regForm.tpaProvider,
      insuranceId: regForm.insuranceId || 'N/A',
      vitals: {
        heartRate: parseInt(regForm.heartRate),
        bloodPressure: regForm.bloodPressure,
        temperature: parseFloat(regForm.temperature),
        oxygenSat: parseInt(regForm.oxygenSat),
        respiratoryRate: parseInt(regForm.respiratoryRate)
      },
      allergies: [],
      medicalHistory: [],
      visits: [{
        id: `V-${Date.now().toString().slice(-3)}`,
        date: new Date().toISOString().slice(0, 10),
        department: assignedDept,
        doctor: assignedDoctor,
        reason: `${regType.toUpperCase()} Registration - Appointment Scheduled`,
        notes: `Patient checked in. ESI: ${regForm.esiScore}. Queue token: ${tokenNum}. Slot: ${assignedSlot}`
      }],
      prescriptions: [],
      labResults: [],
      status: 'waiting',
      totalBill: totalDue,
      paidBill: regForm.tpaProvider !== 'None' ? totalDue : 0,
      pendingBill: regForm.tpaProvider !== 'None' ? 0 : totalDue,
      branch: activeBranch,
      
      // Advanced elements
      esiScore: parseInt(regForm.esiScore),
      pregnancyStatus: regForm.pregnancyStatus,
      chiefComplaints: [],
      gcsEye: 4, gcsVerbal: 5, gcsMotor: 6, gcsScore: 15,
      fluidLogs: [],
      emarList: [],
      mrdCode: uhidNum
    };

    setPatients(prev => [newPatient, ...prev]);
    setSelectedPatientId(newPatientId);

    // Build Receipt Details
    const details = {
      uhid: uhidNum,
      name: regForm.name,
      phone: regForm.phone,
      age: regForm.age,
      gender: regForm.gender,
      bloodGroup: regForm.bloodGroup,
      regType: regType,
      department: assignedDept,
      doctor: assignedDoctor,
      slot: assignedSlot,
      token: tokenNum,
      regFee: registrationFees,
      conFee: consultationFees,
      advPay: advanceAmount,
      total: totalDue,
      tpa: regForm.tpaProvider,
      insuranceChecked: insuranceEligibilityChecked
    };
    setReceiptDetails(details);
    setShowReceiptDialog(true);

    // Log Activity Audit
    const newAudit: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-3)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: "Radha Iyer",
      role: "Receptionist",
      action: "Advanced Registration & Booking",
      module: "Patient Registration Desk",
      details: `Registered ${newPatient.name} under ${regType.toUpperCase()}. UHID: ${uhidNum}, Token: ${tokenNum} generated.`
    };
    setAudits(prev => [newAudit, ...prev]);

    // Send confirmation alert
    addToast('success', `UHID ${uhidNum} generated! Appointment booked for ${assignedDoctor} (Token: ${tokenNum}).`);

    // Reset advanced state variables
    setRegForm({
      name: '', age: '', gender: 'Male', bloodGroup: 'O+', phone: '', email: '',
      address: '', tpaProvider: 'None', insuranceId: '', heartRate: '75',
      bloodPressure: '120/80', temperature: '98.6', oxygenSat: '98', respiratoryRate: '16',
      esiScore: '3', pregnancyStatus: false
    });
    setRegStep(1);
    setIdProofNumber('');
    setReferralSource('');
    setCorporateEmployer('');
    setOtpStatus('idle');
    setEnteredOtp('');
    setDuplicatePatientAlert(false);
    setOcrAutoFilled(false);
    setInsuranceEligibilityChecked('none');
    setDocumentUploads({ idProof: false, insurance: false, referral: false, priorRecords: false, consent: false });
  };

  // Add Medication to Prescription
  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed.medication || !newMed.dosage) {
      addToast('warning', "Enter medication name and dosage.");
      return;
    }

    // Drug Interaction Allergy Check
    if (newMed.medication.toLowerCase().includes('aspirin') && selectedPatient.allergies.some(a => a.substance.toLowerCase() === 'aspirin')) {
      addToast('danger', `CRITICAL WARNING: Patient is ALLERGIC to Aspirin. Severe reaction risk: Anaphylaxis/Hives.`);
      return;
    }

    // Teratogenic Pregnancy warning check
    if (selectedPatient.pregnancyStatus && (newMed.medication.toLowerCase().includes('lisinopril') || newMed.medication.toLowerCase().includes('losartan') || newMed.medication.toLowerCase().includes('atorvastatin'))) {
      addToast('danger', `CRITICAL TERATOGENIC WARNING: ${newMed.medication} is contraindicated in pregnant patients (FDA Category X / Risk of foetal toxicity).`);
      return;
    }

    // Duplicate medicine check
    const medBase = newMed.medication.toLowerCase().split('(')[0].trim();
    if (selectedPatient.prescriptions.some(p => p.medication.toLowerCase().split('(')[0].trim() === medBase)) {
      addToast('warning', `DUPLICATE MEDICINE WARNING: ${newMed.medication} is already prescribed in this visit. Please adjust dosage instead.`);
      return;
    }

    const newItem: PrescriptionItem = {
      id: `P-${Date.now().toString().slice(-3)}`,
      medication: newMed.medication,
      dosage: newMed.dosage,
      frequency: newMed.frequency || 'Once daily',
      duration: newMed.duration || '5 days',
      instructions: newMed.instructions || 'Take after meals'
    };

    setPatients(prev => prev.map(p => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          prescriptions: [...p.prescriptions, newItem],
          status: 'pharmacy-pending',
          totalBill: p.totalBill + 650,
          pendingBill: p.pendingBill + 650
        };
      }
      return p;
    }));

    setNewMed({ medication: '', dosage: '', frequency: '', duration: '', instructions: '' });
    addToast('success', `Prescription Added: ${newItem.medication}`);
  };

  // Add Lab/Radiology Request (including referral commission percentage and outsourcing option)
  const handleAddLabRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.testName) return;

    const newResult: LabResult = {
      id: `LAB-${Date.now().toString().slice(-3)}`,
      testName: newOrder.testName,
      category: newOrder.category,
      requestedDate: new Date().toISOString().slice(0, 10),
      status: 'pending',
      outsourced: newOrder.outsourced,
      outsourcedLabName: newOrder.outsourced ? newOrder.outsourceLab || 'Outsourced Partner Lab' : undefined,
      refDoctorShare: parseFloat(newOrder.referralShare) || 0
    };

    setPatients(prev => prev.map(p => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          labResults: [...p.labResults, newResult],
          status: 'lab-pending',
          totalBill: p.totalBill + 1500,
          pendingBill: p.pendingBill + 1500
        };
      }
      return p;
    }));

    setNewOrder({ testName: '', category: 'pathology', outsourced: false, outsourceLab: '', referralShare: '0' });
    addToast('success', `Lab test order created: ${newResult.testName} ${newResult.outsourced ? '(Outsourced)' : ''}`);
  };

  // Lab Technician: Submit Results
  const handleLabResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!labEntryId || !labEntryValue) {
      addToast('warning', "Please select a test and enter result value.");
      return;
    }

    setPatients(prev => prev.map(p => {
      return {
        ...p,
        labResults: p.labResults.map(lab => {
          if (lab.id === labEntryId) {
            return {
              ...lab,
              status: 'completed',
              resultValue: labEntryValue,
              referenceRange: labEntryRange || 'Normal range',
              findings: 'Analyzed & verified by automated analyzer',
              verifiedBy: 'Technician Rohan Sen'
            };
          }
          return lab;
        }
      )};
    }));

    // Audit Log Entry
    const newAudit: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-3)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: "Technician Rohan Sen",
      role: "Lab Technician",
      action: "Test Result Entered",
      module: "Pathology Lab",
      details: `Result of ${labEntryValue} recorded for test ID ${labEntryId}`
    };
    setAudits(prev => [newAudit, ...prev]);

    addToast('success', "Lab report uploaded and verified.");
    setLabEntryId('');
    setLabEntryValue('');
    setLabEntryRange('');
  };

  // Pharmacist: Dispense Medicines
  const handleDispenseMeds = (patientId: string) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return { ...p, status: 'billed' };
      }
      return p;
    }));

    const newAudit: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-3)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: "Pharmacist Anil Kulkarni",
      role: "Pharmacist",
      action: "Prescription Dispensed",
      module: "Pharmacy Desk",
      details: `Dispensed prescribed medicines to patient ID ${patientId}`
    };
    setAudits(prev => [newAudit, ...prev]);

    addToast('success', "Prescription checked, verified against inventory stock, and dispensed.");
  };

  // Accountant: Bill settle
  const handleSettleBill = (patientId: string, insuranceUsed: boolean) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        const cover = insuranceUsed ? p.pendingBill * 0.9 : 0;
        const settledAmount = p.pendingBill - cover;
        return {
          ...p,
          paidBill: p.paidBill + settledAmount,
          pendingBill: cover,
          status: cover > 0 ? 'billed' : 'discharged'
        };
      }
      return p;
    }));

    const p = patients.find(pat => pat.id === patientId);
    const newAudit: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-3)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: "Accountant Amit Sen",
      role: "Accountant",
      action: "Invoice Paid Settle",
      module: "Billing Dept",
      details: `Settled payment for ${p?.name}. Claims dispatched.`
    };
    setAudits(prev => [newAudit, ...prev]);

    addToast('success', `Payment processed in 18 seconds. Receipt printed.`);
  };

  // Settle Referral Doctor Share commission payouts
  const handleSettleReferralPayout = (_pId: string, testName: string, doctor: string, pct: number, val: number) => {
    const payout = Math.round(val * (pct / 100));
    addToast('success', `Settle referral payout: Approved commission split of ₹${payout} to ${doctor} on test "${testName}"`);
  };

  // Expense management submit handler
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expAmount || !expDesc) return;

    const newExp: Expense = {
      id: `EXP-${Date.now().toString().slice(-3)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      category: expCategory,
      description: expDesc,
      amount: parseFloat(expAmount),
      branch: activeBranch
    };

    setExpenses(prev => [newExp, ...prev]);
    setExpAmount('');
    setExpDesc('');
    addToast('success', `Expense added under ${expCategory}: ₹${newExp.amount}`);
  };

  // Simulate Voice-to-Text SOAP Dictation
  const startVoiceDictationSim = () => {
    setDoctorDictating(true);
    addToast('info', '🎙️ Voice Dictation active... Speak SOAP details');
    setTimeout(() => {
      setSoapSubjective({
        chiefComplaint: 'Chest tightness, shortness of breath on exertion, mild anxiety',
        hpi: 'Patient states chest tightness started 2 hours ago. Relieved partially by rest. Non-pleuritic.',
        medicalHistory: 'Hypertension, Borderline High Cholesterol',
        familyHistory: 'Father: CAD, Sister: Stroke',
        surgicalHistory: 'None'
      });
      setSoapObjective(prev => ({
        ...prev,
        painScale: 5,
        lifestyle: 'Sedentary work desk, high sodium foods, sleeps 5 hrs/night',
        mentalHealth: 'PHQ-9 Score: 7 (Mild anxiety/depressive signs)'
      }));
      setSoapAssessment({
        diagnosisCode: 'Coronary artery disease, unspecified [I25.10]',
        differential: 'Stable angina pectoris, Gastroesophageal reflux disease, Costochondritis'
      });
      setSoapPlan({
        treatment: 'Initiate Aspirin 75mg PO QD, Atorvastatin 20mg PO QD. Refer for echocardiogram.',
        referralSpecialist: 'Cardiology (Dr. Ananya Ray)'
      });
      setDoctorDictating(false);
      addToast('success', '🎙️ Voice dictation processed successfully into SOAP structures!');
    }, 2000);
  };

  // Doctor Keyboard Shortcuts Event Listener
  useEffect(() => {
    const handleDoctorShortcuts = (e: KeyboardEvent) => {
      if (!e.altKey) return;
      const key = e.key.toLowerCase();
      if (key === 's') {
        e.preventDefault();
        addToast('success', '⌨️ [Alt + S] EMR SOAP details saved successfully to clinical archive!');
      } else if (key === 'd') {
        e.preventDefault();
        startVoiceDictationSim();
      } else if (key === 'r') {
        e.preventDefault();
        const previousMeds = [
          { id: 'RX-PREV-1', medication: 'Atorvastatin (Generic: Lipitor)', dosage: '20mg', frequency: 'Once Daily (OD)', duration: '30 days', instructions: 'Take at bedtime' },
          { id: 'RX-PREV-2', medication: 'Amlodipine (Generic: Norvasc)', dosage: '5mg', frequency: 'Once Daily (OD)', duration: '30 days', instructions: 'Take in morning' }
        ];
        setPatients(prev => prev.map(p => p.id === selectedPatientId ? { ...p, prescriptions: [...p.prescriptions, ...previousMeds] } : p));
        addToast('success', "⌨️ [Alt + R] Loaded and repeated previous prescription medications successfully.");
      } else if (key === 'p') {
        e.preventDefault();
        addToast('info', "⌨️ [Alt + P] Prescription sent to PDF printing queue.");
      }
    };
    window.addEventListener('keydown', handleDoctorShortcuts);
    return () => window.removeEventListener('keydown', handleDoctorShortcuts);
  }, [selectedPatientId]);

  // Run Monthly Payroll processing
  const handleRunPayroll = () => {
    const payrollSum = employees.reduce((acc, curr) => acc + curr.salary, 0);
    const newExp: Expense = {
      id: `EXP-${Date.now().toString().slice(-3)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      category: "Payroll Operations",
      description: `Disbursed salaries for ${employees.length} active hospital employees`,
      amount: payrollSum,
      branch: activeBranch
    };
    setExpenses(prev => [newExp, ...prev]);

    // Log Activity Audit
    const newAudit: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-3)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: "Admin Administrator",
      role: "Admin",
      action: "Payroll Executed",
      module: "Finance & HR",
      details: `Disbursed monthly employee payroll ledger totaling ₹${payrollSum.toLocaleString('en-IN')}`
    };
    setAudits(prev => [newAudit, ...prev]);
    addToast('success', `Monthly Payroll executed! ₹${payrollSum.toLocaleString('en-IN')} disbursed successfully.`);
  };

  // HR Leave request approval
  const handleApproveLeave = (empId: string) => {
    setEmployees(prev => prev.map(e => {
      if (e.id === empId) {
        return { ...e, status: 'leave', leaveBalance: e.leaveBalance - 1 };
      }
      return e;
    }));
    addToast('success', "Leave request approved. Employee status updated.");
  };

  // Apply OPD Advice templates
  const applyAdviceTemplate = (templateName: string) => {
    const t = DISEASE_ADVICE_TEMPLATES.find(temp => temp.name === templateName);
    if (t) {
      setConsultationNotes(prev => (prev ? prev + "\n" : "") + t.advice);
      addToast('success', `Applied template: ${templateName}`);
    }
  };

  // Generate Fitness Certificate handler
  const handleGenerateFitness = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fitnessCertDetails.patientName || !fitnessCertDetails.purpose) {
      addToast('warning', "Fill out patient name and certificate purpose.");
      return;
    }
    setShowFitnessDialog(false);
    addToast('success', `Fitness Certificate generated for ${fitnessCertDetails.patientName}. Sent to Patient Portal.`);
  };

  // Radiology Form F Submit (PC-PNDT India Compliance)
  const handleFormFSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFData.declarationNoGenderSelection || !formFData.consentFormSigned) {
      addToast('danger', "PC-PNDT Violation: Declarations and signed consents are statutory prerequisites.");
      return;
    }
    setShowFormFDialog(false);
    addToast('success', `Form F PC-PNDT Statutory compliance record filed for patient. Uploaded to MRD database.`);
  };

  // OT Surgery Scheduler submit
  const handleScheduleSurgery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otPatientId || !otSurgeryName) return;
    if (!otDigitalConsent) {
      addToast('danger', "Cannot schedule surgery: Signed digital consent form is required.");
      return;
    }
    addToast('success', `OT Reserved & Schedule recorded for surgery: ${otSurgeryName}`);
    setOtPatientId('');
    setOtSurgeryName('');
    setOtAnesthesiaReady(false);
    setOtDigitalConsent(false);
  };

  // Settle E-Prescription linking with MRD coding
  const handleAssignMrdCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIcdCode) return;
    setPatients(prev => prev.map(p => {
      if (p.id === selectedPatient.id) {
        return { ...p, mrdCode: selectedIcdCode };
      }
      return p;
    }));
    addToast('success', `ICD classification linked to patient profile: ${selectedIcdCode}`);
  };

  // Fast OTC Cash bill pharmacy sale
  const handleOtcBillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otcBillForm.medicine || !otcBillForm.qty) return;
    const saleSum = parseFloat(otcBillForm.qty) * parseFloat(otcBillForm.price);
    
    // Add revenue to branch stats
    setPatients(prev => prev.map(p => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          totalBill: p.totalBill + saleSum,
          paidBill: p.paidBill + saleSum
        };
      }
      return p;
    }));

    addToast('success', `OTC Cash Sale Complete: ${otcBillForm.qty}x ${otcBillForm.medicine} - Total: ₹${saleSum}`);
    setOtcBillForm({ medicine: '', qty: '1', price: '120', customerName: 'OTC Walk-in' });
  };

  // AI Chat Assistant Send
  const handleSendAIChat = () => {
    if (!aiAssistantQuery.trim()) return;

    const userText = aiAssistantQuery;
    setAiAssistantChat(prev => [...prev, { sender: 'user', text: userText }]);
    setAiAssistantQuery('');

    // Simulate clinical response
    setTimeout(() => {
      let aiText = "I have scanned the clinical data. Vitals are within baseline tolerance. No critical alerts found.";
      if (userText.toLowerCase().includes('diabetes') || userText.toLowerCase().includes('sugar')) {
        aiText = "Based on Patient Vikram Malhotra's profile: Active diagnosis is Type 2 Diabetes (diagnosed 2015). Metformin 1000mg BID is active. Recommendation: Monitor HbA1c, keep target under 6.5%. Ensure kidney panel (eGFR) checked biannually.";
      } else if (userText.toLowerCase().includes('allergy') || userText.toLowerCase().includes('rash')) {
        aiText = "Patient Aarav Sharma has a severe penicillin allergy recorded. Suggest avoiding cephalosporins if penicillin sensitivity is extremely high. Use macrolides or lincosamides for bacterial infections instead.";
      } else if (userText.toLowerCase().includes('vital') || userText.toLowerCase().includes('heart')) {
        aiText = `Reviewing vitals for ${selectedPatient.name}: BP is ${selectedPatient.vitals.bloodPressure}, Heart Rate is ${selectedPatient.vitals.heartRate} bpm. O2 sat is ${selectedPatient.vitals.oxygenSat}%. Vitals are stable, but regular checking recommended.`;
      }
      setAiAssistantChat(prev => [...prev, { sender: 'ai', text: aiText }]);
    }, 800);
  };

  // Advanced IPD: eMAR Nurse administration marker
  const handleAdministerEmar = (patientId: string, emarId: string) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId && p.emarList) {
        return {
          ...p,
          emarList: p.emarList.map(e => e.id === emarId ? {
            ...e,
            status: 'administered',
            administeredAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
            administeredBy: 'Nurse Deepa Roy'
          } : e)
        };
      }
      return p;
    }));
    addToast('success', "eMAR Medication signed off and logged in EMR.");
  };

  // Advanced IPD: Add Fluid Intake/Output log
  const handleAddFluidLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ivIntake && !oralIntake && !urineOutput && !drainOutput) return;

    const newLog: FluidLog = {
      id: `FL-${Date.now().toString().slice(-3)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      intakeIv: parseInt(ivIntake) || 0,
      intakeOral: parseInt(oralIntake) || 0,
      outputUrine: parseInt(urineOutput) || 0,
      outputDrain: parseInt(drainOutput) || 0
    };

    setPatients(prev => prev.map(p => {
      if (p.id === selectedIpdPatient.id) {
        return {
          ...p,
          fluidLogs: [...(p.fluidLogs || []), newLog]
        };
      }
      return p;
    }));

    setIvIntake('');
    setOralIntake('');
    setUrineOutput('');
    setDrainOutput('');
    addToast('success', "Intake/Output Fluid balance updated.");
  };

  // Advanced IPD: Glasgow Coma Scale Calculator
  const handleGcsSelect = (category: 'eye' | 'verbal' | 'motor', value: number) => {
    setPatients(prev => prev.map(p => {
      if (p.id === selectedIpdPatient.id) {
        const eye = category === 'eye' ? value : p.gcsEye || 4;
        const verbal = category === 'verbal' ? value : p.gcsVerbal || 5;
        const motor = category === 'motor' ? value : p.gcsMotor || 6;
        return {
          ...p,
          gcsEye: eye,
          gcsVerbal: verbal,
          gcsMotor: motor,
          gcsScore: eye + verbal + motor
        };
      }
      return p;
    }));
  };

  // Advanced IPD: Patient Room/Bed Transfer ADT
  const handleBedTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferTargetBed) return;

    // Check if target bed is occupied
    const targetBed = beds.find(b => b.id === transferTargetBed);
    if (targetBed && targetBed.status !== 'vacant') {
      addToast('danger', "Bed allocation violation: Selected bed is occupied.");
      return;
    }

    const sourceBedId = selectedIpdPatient.bedNumber;

    // Perform Transfer
    setBeds(prev => prev.map(b => {
      // Vacate old bed
      if (b.id === sourceBedId) {
        return { ...b, status: 'vacant', patientName: undefined, patientId: undefined };
      }
      // Occupy new bed
      if (b.id === transferTargetBed) {
        return { ...b, status: 'occupied', patientName: selectedIpdPatient.name, patientId: selectedIpdPatient.id };
      }
      return b;
    }));

    setPatients(prev => prev.map(p => {
      if (p.id === selectedIpdPatient.id) {
        return { ...p, bedNumber: transferTargetBed };
      }
      return p;
    }));

    // Log Activity Audit
    const newAudit: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-3)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: "Nurse Deepa Roy",
      role: "Nurse",
      action: "ADT Bed Transfer",
      module: "Wards Management",
      details: `Transferred patient ${selectedIpdPatient.name} from bed ${sourceBedId} to ${transferTargetBed}`
    };
    setAudits(prev => [newAudit, ...prev]);

    addToast('success', `Transfer Complete: Moved patient to bed ${transferTargetBed}`);
    setTransferTargetBed('');
  };

  // Calculate Net fluid balance (Total intake - Total output)
  const calculatedNetFluid = useMemo(() => {
    if (!selectedIpdPatient || !selectedIpdPatient.fluidLogs) return 0;
    return selectedIpdPatient.fluidLogs.reduce((acc, curr) => {
      const intake = curr.intakeIv + curr.intakeOral;
      const output = curr.outputUrine + curr.outputDrain;
      return acc + (intake - output);
    }, 0);
  }, [selectedIpdPatient]);

  // AI disease prediction calculation simulation
  const computedPredictions = useMemo(() => {
    const p = selectedPatient;
    const risks: { disease: string; probability: number; rationale: string; level: 'low' | 'medium' | 'high' }[] = [];

    if (p.vitals.bloodPressure.split('/')[0] && parseInt(p.vitals.bloodPressure.split('/')[0]) > 130) {
      risks.push({
        disease: "Cardiovascular Disease / Stroke",
        probability: 72,
        rationale: "Elevated systolic BP, active history of Hypertension, patient is over 45 years.",
        level: 'high'
      });
    }

    if (p.medicalHistory.some(m => m.condition.includes('Diabetes'))) {
      risks.push({
        disease: "Diabetic Nephropathy / Renal Impairment",
        probability: 45,
        rationale: "Longstanding type 2 diabetes (11 years) requires screening of microalbuminuria.",
        level: 'medium'
      });
    } else {
      risks.push({
        disease: "Type 2 Diabetes Mellitus",
        probability: 15,
        rationale: "Age/BMI indicators are within normal risk range. Vitals indicate stable insulin levels.",
        level: 'low'
      });
    }

    if (p.vitals.oxygenSat < 96) {
      risks.push({
        disease: "Acute Respiratory Failure",
        probability: 60,
        rationale: "Oxygen saturation levels showing decline (current: 95%). Chronic Asthma increases risk.",
        level: 'high'
      });
    }

    return risks;
  }, [selectedPatient]);

  return (
    <div className="app-wrapper">
      {/* ==========================================
          SIDEBAR
          ========================================== */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Logo brand section */}
        <div style={{ height: 'var(--header-height)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '12px' }}>
          <div style={{ background: 'var(--primary)', color: 'white', width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            H
          </div>
          {!sidebarCollapsed && (
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'white' }}>HexenCare</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.05em' }}>HEALTH OPERATING SYSTEM</div>
            </div>
          )}
        </div>

        {/* Sidebar global search input */}
        {!sidebarCollapsed && (
          <div style={{ padding: '16px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'rgba(255,255,255,0.4)' }} />
              <input
                type="text"
                placeholder="Quick search desk..."
                onClick={() => setShowCommandPalette(true)}
                style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '8px 12px 8px 30px', color: 'white', outline: 'none', fontSize: '12px' }}
                readOnly
              />
            </div>
          </div>
        )}

        {/* Navigation list */}
        <nav style={{ flexGrow: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }} className="sidebar-nav">
          
          {isStandalonePharmacy ? (
            <>
              {!sidebarCollapsed && <div className="nav-section-title">PHARMACY WORKSPACES</div>}
              
              <button onClick={() => { setActiveTab('pharmacy'); setPmsSubTab('pos_cashier'); }} className={`sidebar-nav-item ${pmsSubTab === 'pos_cashier' ? 'active' : ''}`}>
                <span>⚡ 1. POS Fast Billing</span>
              </button>
              <button onClick={() => { setActiveTab('pharmacy'); setPmsSubTab('medicine_master'); }} className={`sidebar-nav-item ${pmsSubTab === 'medicine_master' ? 'active' : ''}`}>
                <span>💊 2. Medicine Master</span>
              </button>
              <button onClick={() => { setActiveTab('pharmacy'); setPmsSubTab('inventory_batches'); }} className={`sidebar-nav-item ${pmsSubTab === 'inventory_batches' ? 'active' : ''}`}>
                <span>📦 3. FEFO Live Batches</span>
              </button>
              <button onClick={() => { setActiveTab('pharmacy'); setPmsSubTab('purchases_suppliers'); }} className={`sidebar-nav-item ${pmsSubTab === 'purchases_suppliers' ? 'active' : ''}`}>
                <span>🛒 4. Purchases & Vendors</span>
              </button>
              <button onClick={() => { setActiveTab('pharmacy'); setPmsSubTab('prescriptions_ocr'); }} className={`sidebar-nav-item ${pmsSubTab === 'prescriptions_ocr' ? 'active' : ''}`}>
                <span>📸 5. Scan Rx & AI OCR</span>
              </button>
              <button onClick={() => { setActiveTab('pharmacy'); setPmsSubTab('multistore_chain'); }} className={`sidebar-nav-item ${pmsSubTab === 'multistore_chain' ? 'active' : ''}`}>
                <span>🏢 6. Multi-Store Chain</span>
              </button>
              <button onClick={() => { setActiveTab('pharmacy'); setPmsSubTab('delivery_crm'); }} className={`sidebar-nav-item ${pmsSubTab === 'delivery_crm' ? 'active' : ''}`}>
                <span>🛵 7. Home Delivery & CRM</span>
              </button>
              <button onClick={() => { setActiveTab('pharmacy'); setPmsSubTab('reports_ai'); }} className={`sidebar-nav-item ${pmsSubTab === 'reports_ai' ? 'active' : ''}`}>
                <span>📊 8. GST Tax Reports</span>
              </button>
            </>
          ) : (
            <>
              {/* SECTION: OVERVIEW */}
              {isModuleVisible('dashboard') && (
                <>
                  {!sidebarCollapsed ? (
                    <div className="nav-section-title">OVERVIEW</div>
                  ) : (
                    <div style={{ height: '8px' }}></div>
                  )}
                  
                  <button onClick={() => setActiveTab('dashboard')} className={`sidebar-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} title="Dashboard">
                    {sidebarCollapsed ? <Activity size={18} /> : <span>Dashboard</span>}
                  </button>
                </>
              )}

          {/* SECTION: PATIENT CARE */}
          {(isModuleVisible('registration') || isModuleVisible('appointments') || isModuleVisible('consultation') || isModuleVisible('wards') || isModuleVisible('icu') || isModuleVisible('ot')) && (
            <>
              {!sidebarCollapsed ? (
                <div className="nav-section-title">PATIENT CARE</div>
              ) : (
                <div style={{ height: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '8px 0' }}></div>
              )}
              
              {isModuleVisible('registration') && (
                <button onClick={() => setActiveTab('registration')} className={`sidebar-nav-item ${activeTab === 'registration' ? 'active' : ''}`} title="Registration">
                  {sidebarCollapsed ? <UserPlus size={18} /> : <span>Registration</span>}
                </button>
              )}
              
              {isModuleVisible('appointments') && (
                <button onClick={() => addToast('info', "Navigating to Appointments Scheduler (OPD Waitlist)...")} className={`sidebar-nav-item ${activeTab === 'appointments' ? 'active' : ''}`} title="Appointments">
                  {sidebarCollapsed ? <Plus size={18} /> : <span>Appointments</span>}
                </button>
              )}
              
              {isModuleVisible('consultation') && (
                <button onClick={() => setActiveTab('consultation')} className={`sidebar-nav-item ${activeTab === 'consultation' ? 'active' : ''}`} title="OPD">
                  {sidebarCollapsed ? <Stethoscope size={18} /> : (
                    <>
                      <span>OPD Desk</span>
                      <span className="sidebar-badge">4</span>
                    </>
                  )}
                </button>
              )}
              
              {isModuleVisible('wards') && (
                <button onClick={() => { setActiveTab('wards'); setIpdTab('overview'); }} className={`sidebar-nav-item ${activeTab === 'wards' && ipdTab !== 'gcs' ? 'active' : ''}`} title="IPD Wards">
                  {sidebarCollapsed ? <Bed size={18} /> : <span>IPD Wards</span>}
                </button>
              )}

              {isModuleVisible('icu') && (
                <button onClick={() => setActiveTab('icu')} className={`sidebar-nav-item ${activeTab === 'icu' ? 'active' : ''}`} title="ICU Suite">
                  {sidebarCollapsed ? <Heart size={18} /> : <span>ICU Suite</span>}
                </button>
              )}

              {isModuleVisible('ot') && (
                <button onClick={() => setActiveTab('ot')} className={`sidebar-nav-item ${activeTab === 'ot' ? 'active' : ''}`} title="OT Management">
                  {sidebarCollapsed ? <Scissors size={18} /> : <span>OT Suite</span>}
                </button>
              )}
              
              <button onClick={() => setShowEmergencyDialog(true)} className="sidebar-nav-item" title="Emergency STAT">
                {sidebarCollapsed ? <AlertTriangle size={18} style={{ color: 'var(--danger)' }} /> : (
                  <>
                    <span>Emergency STAT</span>
                    <span className="sidebar-badge badge-red">2</span>
                  </>
                )}
              </button>
            </>
          )}

          {/* SECTION: DIAGNOSTICS */}
          {isModuleVisible('lab') && (
            <>
              {!sidebarCollapsed ? (
                <div className="nav-section-title">DIAGNOSTICS</div>
              ) : (
                <div style={{ height: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '8px 0' }}></div>
              )}
              
              <button onClick={() => setActiveTab('lab')} className={`sidebar-nav-item ${activeTab === 'lab' ? 'active' : ''}`} title="Pathology Lab">
                {sidebarCollapsed ? <FlaskConical size={18} /> : (
                  <>
                    <span>Pathology Lab</span>
                    <span className="sidebar-badge">2</span>
                  </>
                )}
              </button>

              <button onClick={() => setActiveTab('radiology')} className={`sidebar-nav-item ${activeTab === 'radiology' ? 'active' : ''}`} title="Radiology & Imaging">
                {sidebarCollapsed ? <FileText size={18} /> : <span>Radiology & Imaging</span>}
              </button>
            </>
          )}

          {/* SECTION: PHARMACY & INVENTORY */}
          {(isModuleVisible('pharmacy') || isModuleVisible('bloodbank')) && (
            <>
              {!sidebarCollapsed ? (
                <div className="nav-section-title">PHARMACY & INVENTORY</div>
              ) : (
                <div style={{ height: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '8px 0' }}></div>
              )}
              
              {isModuleVisible('pharmacy') && (
                <button onClick={() => setActiveTab('pharmacy')} className={`sidebar-nav-item ${activeTab === 'pharmacy' ? 'active' : ''}`} title="Pharmacy">
                  {sidebarCollapsed ? <Pill size={18} /> : (
                    <>
                      <span>Pharmacy</span>
                      <span className="sidebar-badge">1</span>
                    </>
                  )}
                </button>
              )}
              
              {isModuleVisible('bloodbank') && (
                <button onClick={() => setActiveTab('bloodbank')} className={`sidebar-nav-item ${activeTab === 'bloodbank' ? 'active' : ''}`} title="Inventory">
                  {sidebarCollapsed ? <FileSpreadsheet size={18} /> : <span>Inventory & Blood Bank</span>}
                </button>
              )}
            </>
          )}

          {/* SECTION: RECORDS & FINANCE */}
          {(isModuleVisible('mrd') || isModuleVisible('billing')) && (
            <>
              {!sidebarCollapsed ? (
                <div className="nav-section-title">RECORDS & FINANCE</div>
              ) : (
                <div style={{ height: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '8px 0' }}></div>
              )}

              {isModuleVisible('mrd') && (
                <button onClick={() => setActiveTab('mrd')} className={`sidebar-nav-item ${activeTab === 'mrd' ? 'active' : ''}`} title="Medical Records (MRD)">
                  {sidebarCollapsed ? <FolderArchive size={18} /> : (
                    <>
                      <span>Medical Records (MRD)</span>
                      <span className="sidebar-badge" style={{ background: '#9333EA' }}>EHR</span>
                    </>
                  )}
                </button>
              )}

              {isModuleVisible('billing') && (
                <button onClick={() => setActiveTab('billing')} className={`sidebar-nav-item ${activeTab === 'billing' ? 'active' : ''}`} title="Billing & Claims">
                  {sidebarCollapsed ? <DollarSign size={18} /> : <span>Billing & Claims</span>}
                </button>
              )}

              {isModuleVisible('expense') && (
                <button onClick={() => setActiveTab('expense')} className={`sidebar-nav-item ${activeTab === 'expense' ? 'active' : ''}`} title="Expense Management">
                  {sidebarCollapsed ? <DollarSign size={18} /> : <span>Expense Management</span>}
                </button>
              )}
            </>
          )}

          {/* Bottom Settings Separator */}
          <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
            <button onClick={() => setActiveTab('admin')} className={`sidebar-nav-item ${activeTab === 'admin' ? 'active' : ''}`} title="Settings">
              {sidebarCollapsed ? <Shield size={18} /> : <span>Settings</span>}
            </button>
          </div>

          {/* Workspace Swapper (only if expanded) */}
          {!sidebarCollapsed && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '8px', paddingTop: '12px' }}>
              <div style={{ padding: '0 12px' }}>
                <label style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role Context</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={activeRole}
                    onChange={(e) => {
                      setActiveRole(e.target.value as any);
                      addToast('info', `Simulating profile shift: ${e.target.value.toUpperCase()}`);
                    }}
                    style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '6px 10px', borderRadius: '4px', outline: 'none', fontSize: '12px', cursor: 'pointer' }}
                  >
                    <option value="doctor" style={{ background: '#0F172A' }}>👨‍⚕️ Lead Surgeon / Doctor</option>
                    <option value="anesthetist" style={{ background: '#0F172A' }}>💉 Lead Anesthetist</option>
                    <option value="nurse" style={{ background: '#0F172A' }}>👩‍⚕️ Nursing Staff</option>
                    <option value="receptionist" style={{ background: '#0F172A' }}>💳 Reception / Admission</option>
                    <option value="lab_tech" style={{ background: '#0F172A' }}>🔬 Lab Technician</option>
                    <option value="pharmacist" style={{ background: '#0F172A' }}>💊 Pharmacist</option>
                    <option value="accountant" style={{ background: '#0F172A' }}>💰 Finance & Billing</option>
                    <option value="admin" style={{ background: '#0F172A' }}>👑 SysAdmin / Hospital Admin</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </nav>

        {/* Sidebar footer collapsing switch */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {!sidebarCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></div>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Gateway Online</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="btn btn-ghost"
            style={{ color: 'rgba(255,255,255,0.4)', padding: '4px' }}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>

      {/* ==========================================
          MAIN CONTENT ZONE
          ========================================== */}
      <main className="main-content">
        {/* Top Navbar */}
        <header className="top-navbar">
          <div className="flex align-center gap-md">
            <h1 style={{ fontSize: '18px', fontWeight: 700, color: isStandalonePharmacy ? 'var(--primary)' : 'var(--text-main)' }}>
              {isStandalonePharmacy ? '💊 HEXENCARE PHARMACY OS (STANDALONE SAAS)' : `${activeRole.toUpperCase().replace('_', ' ')} WORKSPACE`}
            </h1>
            <span style={{ height: '16px', width: '1px', backgroundColor: 'var(--border)' }}></span>
            
            {/* Chain management: Location selector switch */}
            <div className="flex align-center gap-sm" style={{ backgroundColor: 'var(--bg-muted)', padding: '4px', borderRadius: '6px' }}>
              <MapPin size={14} style={{ color: 'var(--primary)', marginLeft: '6px' }} />
              <select
                value={activeBranch}
                onChange={(e) => {
                  setActiveBranch(e.target.value as any);
                  addToast('info', isStandalonePharmacy ? `Switched Pharmacy Store Context: ${e.target.value.toUpperCase()} Store` : `Switched Location Context: ${e.target.value.toUpperCase()} Hospital`);
                }}
                style={{ border: 'none', background: 'transparent', fontSize: '12px', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer', outline: 'none', paddingRight: '12px' }}
              >
                <option value="metro">{isStandalonePharmacy ? 'Central Warehouse & Hub' : 'HexenCare Metro Hub'}</option>
                <option value="north">{isStandalonePharmacy ? 'Downtown Retail Branch' : 'HexenCare North Clinic'}</option>
                <option value="south">{isStandalonePharmacy ? 'Airport Express POS Counter' : 'HexenCare South Specialty'}</option>
              </select>
            </div>
          </div>

          <div className="flex align-center gap-md">
            {/* Standalone Pharmacy OS Product Switcher Button */}
            <button
              onClick={() => {
                const nextMode = !isStandalonePharmacy;
                setIsStandalonePharmacy(nextMode);
                if (nextMode) setActiveTab('pharmacy');
                addToast(nextMode ? 'success' : 'info', nextMode ? '💊 Launched HexenCare Pharmacy OS in Standalone Product Mode!' : '🏥 Returned to HexenCare Hospital Operating System');
              }}
              className="btn btn-success"
              style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', background: isStandalonePharmacy ? 'var(--primary)' : 'linear-gradient(135deg, #10B981 0%, #059669 100%)', border: 'none', color: 'white' }}
              title="Launch HexenCare Pharmacy as a standalone product (Independent Medical Shops & Chains)"
            >
              <span>{isStandalonePharmacy ? '🏥 Switch to HexenCare HMS' : '💊 Standalone Pharmacy OS'}</span>
            </button>

            {/* Real-time Web Data Extractor & Sync Button */}
            <button
              onClick={() => {
                addToast('info', '🌐 Extracting real-time diagnostic test catalog, Radiology DICOM studies & WHO ICD-11 codes from web APIs...');
                setTimeout(() => {
                  setRadiologyWorklist(prev => [
                    ...prev,
                    { id: 'RAD-WEB-901', patientName: 'Priya Sharma', modality: 'USG', studyName: '3D/4D Obstetric Anomaly Scan (NABL Live Sync)', priority: 'Routine', prepStatus: 'Full Bladder Hydrated', requestedBy: 'Dr. Ananya Ray', date: '2026-08-08 09:45 AM', status: 'PACS Captured', formFSigned: true, criticalFlag: false },
                    { id: 'RAD-WEB-902', patientName: 'Vikram Malhotra', modality: 'CT', studyName: '128-Slice Cardiac CT Angiography', priority: 'STAT', prepStatus: 'Beta Blocked HR 62', requestedBy: 'Dr. Sandeep Mehta', date: '2026-08-08 09:30 AM', status: 'Awaiting Sign-off', formFSigned: false, criticalFlag: true }
                  ]);
                  addToast('success', '✅ Live Web Data Extracted: 68+ NABL Pathology Packages, DICOM Radiology Scans & WHO ICD-11 Codes Synced!');
                }, 800);
              }}
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(147,51,234,0.15) 100%)', border: '1px solid var(--primary)' }}
              title="Extract real-time live medical & diagnostic test data from web APIs"
            >
              <Globe size={15} style={{ color: 'var(--primary)' }} />
              <span>⚡ Live Web Data Sync</span>
            </button>

            {/* Real-time Emergency Indicator Alert Badge */}
            <button
              onClick={() => setShowEmergencyDialog(true)}
              className="btn btn-danger ai-pulse"
              style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <AlertTriangle size={15} />
              <span>{alerts.length} Emergency Alerts</span>
            </button>

            {/* Dark mode switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn btn-ghost btn-icon"
              style={{ color: 'var(--text-muted)' }}
              title="Toggle theme mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Notifications centre */}
            <div style={{ position: 'relative' }}>
              <button className="btn btn-ghost btn-icon" style={{ color: 'var(--text-muted)' }}>
                <Bell size={18} />
              </button>
              <span style={{ position: 'absolute', top: '2px', right: '2px', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--danger)' }}></span>
            </div>

            {/* Profile widget */}
            <span style={{ height: '24px', width: '1px', backgroundColor: 'var(--border)' }}></span>
            <div className="flex align-center gap-sm" style={{ cursor: 'pointer' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px' }}>
                SM
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '12px', fontWeight: 600 }}>Dr. Sandeep Mehta</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Chief Cardiologist</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Workspace Container */}
        <div className="content-workspace">
          
          {/* ==========================================
              TAB: MAIN OVERVIEW DASHBOARD
              ========================================== */}
          {/* ==========================================
              TAB: USER-FRIENDLY SIMPLE DASHBOARD
              ========================================== */}
{/* ==========================================
              MODULAR DISPATCHER HUB (16 ENTERPRISE MODULES)
              100% ORIGINAL RICH UI EXTRACTED INTO SRC/MODULES/
              ========================================== */}
          {activeTab === 'dashboard' && (
            <DashboardModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              patients={patients}
              setPatients={setPatients}
              branchPatients={branchPatients}
              branchBeds={branchBeds}
              statsSummary={statsSummary}
              dashboardViewMode={dashboardViewMode}
              setDashboardViewMode={setDashboardViewMode}
              selectedPatientId={selectedPatientId}
              setSelectedPatientId={setSelectedPatientId}
              alerts={alerts}
              activeBranch={activeBranch}
              activeRole={activeRole}
              setIpdTab={setIpdTab}
            />
          )}

          {activeTab === 'registration' && (
            <RegistrationModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              patients={patients}
              setPatients={setPatients}
              branchPatients={branchPatients}
              regForm={regForm}
              setRegForm={setRegForm}
              regStep={regStep}
              setRegStep={setRegStep}
              handleRegisterSubmit={handleRegisterSubmit}
              handleSendOtp={handleSendOtp}
              handleVerifyOtp={handleVerifyOtp}
              handleCheckInsuranceEligibility={handleCheckInsuranceEligibility}
              handleQrRegistrationScan={handleQrRegistrationScan}
              handleOcrScanSimulation={handleOcrScanSimulation}
              handleRegFormNameChange={handleRegFormNameChange}
            />
          )}

          {activeTab === 'consultation' && (
            <OpdModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              patients={patients}
              setPatients={setPatients}
              branchPatients={branchPatients}
              selectedPatientId={selectedPatientId}
              setSelectedPatientId={setSelectedPatientId}
              selectedPatient={selectedPatient}
              handleAddMedication={handleAddMedication}
              handleAddLabRequest={handleAddLabRequest}
              applyAdviceTemplate={applyAdviceTemplate}
              setShowFitnessDialog={setShowFitnessDialog}
              setShowFormFDialog={setShowFormFDialog}
            />
          )}

          {activeTab === 'telemedicine' && (
            <TelemedicineModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
            />
          )}

          {activeTab === 'wards' && (
            <IpdModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              beds={beds}
              setBeds={setBeds}
              branchBeds={branchBeds}
              handleBedTransfer={handleBedTransfer}
              handleGcsSelect={handleGcsSelect}
              patients={patients}
            />
          )}

          {activeTab === 'icu' && (
            <IcuModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              beds={beds}
              setBeds={setBeds}
              branchBeds={branchBeds}
              selectedIcuBedId={selectedIcuBedId}
              setSelectedIcuBedId={setSelectedIcuBedId}
              calculatedNetFluid={calculatedNetFluid}
              computedPredictions={computedPredictions}
              handleAddFluidLog={handleAddFluidLog}
              handleAdministerEmar={handleAdministerEmar}
            />
          )}

          {activeTab === 'ot' && (
            <OtModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              selectedOtId={selectedOtId}
              setSelectedOtId={setSelectedOtId}
              handleScheduleSurgery={handleScheduleSurgery}
            />
          )}

          {activeTab === 'lab' && (
            <PathologyModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              patients={patients}
              setPatients={setPatients}
              branchPatients={branchPatients}
              selectedLabReportId={selectedLabReportId}
              setSelectedLabReportId={setSelectedLabReportId}
              showBarcodeModal={showBarcodeModal}
              setShowBarcodeModal={setShowBarcodeModal}
              showDeltaCheckModal={showDeltaCheckModal}
              setShowDeltaCheckModal={setShowDeltaCheckModal}
              showReagentModal={showReagentModal}
              setShowReagentModal={setShowReagentModal}
              handleLabResultSubmit={handleLabResultSubmit}
            />
          )}

          {activeTab === 'radiology' && (
            <RadiologyModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              showPacsViewerModal={showPacsViewerModal}
              setShowPacsViewerModal={setShowPacsViewerModal}
              showDeliveryModal={showDeliveryModal}
              setShowDeliveryModal={setShowDeliveryModal}
              showRadBookingModal={showRadBookingModal}
              setShowRadBookingModal={setShowRadBookingModal}
              showVoiceDictationModal={showVoiceDictationModal}
              setShowVoiceDictationModal={setShowVoiceDictationModal}
              showMachineDowntimeModal={showMachineDowntimeModal}
              setShowMachineDowntimeModal={setShowMachineDowntimeModal}
              showCriticalAlertModal={showCriticalAlertModal}
              setShowCriticalAlertModal={setShowCriticalAlertModal}
              selectedRadStudyId={selectedRadStudyId}
              setSelectedRadStudyId={setSelectedRadStudyId}
              selectedRadTemplate={selectedRadTemplate}
              setSelectedRadTemplate={setSelectedRadTemplate}
              radVoiceText={radVoiceText}
              setRadVoiceText={setRadVoiceText}
              setShowFormFDialog={setShowFormFDialog}
            />
          )}

          {activeTab === 'pharmacy' && (
            <PharmacyModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              patients={patients}
              setPatients={setPatients}
              branchPatients={branchPatients}
              pmsEdition={pmsEdition}
              setPmsEdition={setPmsEdition}
              pharmacyLanguage={pharmacyLanguage}
              setPharmacyLanguage={setPharmacyLanguage}
              pharmacyDeptFilter={pharmacyDeptFilter}
              setPharmacyDeptFilter={setPharmacyDeptFilter}
              otcBillForm={otcBillForm}
              setOtcBillForm={setOtcBillForm}
              handleOtcBillSubmit={handleOtcBillSubmit}
              pharmacyReceiptData={pharmacyReceiptData}
              setPharmacyReceiptData={setPharmacyReceiptData}
              showPharmacyReceiptModal={showPharmacyReceiptModal}
              setShowPharmacyReceiptModal={setShowPharmacyReceiptModal}
              showVoiceBillingModal={showVoiceBillingModal}
              setShowVoiceBillingModal={setShowVoiceBillingModal}
              showOcrModal={showOcrModal}
              setShowOcrModal={setShowOcrModal}
              getDosageInstruction={getDosageInstruction}
              handleDispenseMeds={handleDispenseMeds}
            />
          )}

          {activeTab === 'billing' && (
            <BillingModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              patients={patients}
              setPatients={setPatients}
              branchPatients={branchPatients}
              expenses={expenses}
              setExpenses={setExpenses}
              branchExpenses={branchExpenses}
              handleSettleBill={handleSettleBill}
              handleSettleReferralPayout={handleSettleReferralPayout}
              handleAddExpense={handleAddExpense}
            />
          )}

          {activeTab === 'expense' && (
            <ExpenseModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              expenses={expenses}
              setExpenses={setExpenses}
              branchExpenses={branchExpenses}
              handleAddExpense={handleAddExpense}
            />
          )}

          {activeTab === 'mrd' && (
            <MrdModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              patients={patients}
              setPatients={setPatients}
              branchPatients={branchPatients}
              selectedIcdCode={selectedIcdCode}
              setSelectedIcdCode={setSelectedIcdCode}
              selectedPatientId={selectedPatientId}
              setSelectedPatientId={setSelectedPatientId}
              handleAssignMrdCode={handleAssignMrdCode}
            />
          )}

          {activeTab === 'bloodbank' && (
            <InventoryModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              bloodStock={bloodStock}
              setBloodStock={setBloodStock}
            />
          )}

          {activeTab === 'vaccination' && (
            <VaccinationModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              vaccineStock={vaccineStock}
              setVaccineStock={setVaccineStock}
            />
          )}

          {activeTab === 'portal' && (
            <PortalModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              patients={patients}
              handleSendAIChat={handleSendAIChat}
            />
          )}

          {activeTab === 'admin' && (
            <AdminModule
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addToast={addToast}
              moduleVisibility={moduleVisibility}
              setModuleVisibility={setModuleVisibility}
              employees={employees}
              setEmployees={setEmployees}
              audits={audits}
              setAudits={setAudits}
              handleRunPayroll={handleRunPayroll}
              handleApproveLeave={handleApproveLeave}
            />
          )}

        </div>
      </main>

      {/* ==========================================
          GLOBAL DIALOGS & OVERLAYS
          ========================================== */}
      
      {/* Fitness Certificate Generator Dialog */}
      {showFitnessDialog && (
        <div className="dialog-overlay" onClick={() => setShowFitnessDialog(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Generate Health & Fitness Certificate</h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowFitnessDialog(false)}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleGenerateFitness} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Patient Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={fitnessCertDetails.patientName}
                  onChange={(e) => setFitnessCertDetails({ ...fitnessCertDetails, patientName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Purpose of Fitness / Diagnosis Details</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Fit to resume duties / Return to work after medical rest"
                  value={fitnessCertDetails.purpose}
                  onChange={(e) => setFitnessCertDetails({ ...fitnessCertDetails, purpose: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Rest Period Prescribed (Days)</label>
                <input
                  type="number"
                  className="form-input"
                  value={fitnessCertDetails.durationDays}
                  onChange={(e) => setFitnessCertDetails({ ...fitnessCertDetails, durationDays: e.target.value })}
                />
              </div>
              <div className="flex justify-between" style={{ marginTop: '16px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowFitnessDialog(false)}>Cancel</button>
                <button type="submit" className="btn btn-success">Issue Digital Certificate</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PC-PNDT Form F Compliance Dialog (Radiology specific) */}
      {showFormFDialog && (
        <div className="dialog-overlay" onClick={() => setShowFormFDialog(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
              <h2 style={{ color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={18} />
                <span>PC-PNDT Form F Compliance (Statutory India)</span>
              </h2>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowFormFDialog(false)}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleFormFSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                <strong>Attention Radiologist:</strong> Form F is statutory for all obstetric ultrasound scans. Pre-natal gender selection is strictly illegal under India PC-PNDT Act.
              </div>
              
              <div className="form-group">
                <label className="form-label">Pregnancy Duration (Weeks)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formFData.pregnantWeek}
                  onChange={(e) => setFormFData({ ...formFData, pregnantWeek: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                <label className="flex align-center gap-sm" style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formFData.isGeneticCounselingDone}
                    onChange={(e) => setFormFData({ ...formFData, isGeneticCounselingDone: e.target.checked })}
                  />
                  <span>Genetic counseling session conducted & logged.</span>
                </label>

                <label className="flex align-center gap-sm" style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formFData.declarationNoGenderSelection}
                    required
                    onChange={(e) => setFormFData({ ...formFData, declarationNoGenderSelection: e.target.checked })}
                  />
                  <strong>Solemn declaration signed: No sex selection was disclosed. *</strong>
                </label>

                <label className="flex align-center gap-sm" style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formFData.consentFormSigned}
                    required
                    onChange={(e) => setFormFData({ ...formFData, consentFormSigned: e.target.checked })}
                  />
                  <strong>Patient thumbprint consent form signed *</strong>
                </label>
              </div>

              <div className="flex justify-between" style={{ marginTop: '16px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowFormFDialog(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">File Compliance Form F</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cmd + K Command Palette Modal */}
      {showCommandPalette && (
        <div className="dialog-overlay" onClick={() => setShowCommandPalette(false)}>
          <div className="command-palette" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Search size={18} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search patient, module, or ward (e.g. Priya, Register, ICU)..."
                autoFocus
                style={{ flexGrow: 1, border: 'none', outline: 'none', background: 'transparent', color: 'var(--text-main)', fontSize: '15px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-ghost" style={{ padding: '4px' }} onClick={() => setShowCommandPalette(false)}>
                <X size={16} />
              </button>
            </div>
            
            <div style={{ maxHeight: '280px', overflowY: 'auto', padding: '8px' }}>
              {commandPaletteResults.length > 0 ? (
                commandPaletteResults.map((r, idx) => (
                  <div
                    key={idx}
                    onClick={r.action}
                    style={{ padding: '12px 16px', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.1s ease', display: 'flex', flexDirection: 'column' }}
                    className="data-table-wrapper"
                  >
                    <span style={{ fontWeight: 600, fontSize: '13px' }}>{r.title}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{r.subtitle}</span>
                  </div>
                ))
              ) : (
                <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                  {searchQuery ? 'No results found' : 'Type to search Patients (e.g., Aarav, Priya), Wards (e.g., ICU), or Forms (e.g., Register)'}
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', backgroundColor: 'var(--bg-muted)' }}>
              <span>Use <kbd>↑↓</kbd> to navigate, <kbd>Enter</kbd> to select</span>
              <span>Press <kbd>Esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Alerts Center Modal Dialog */}
      {showEmergencyDialog && (
        <div className="dialog-overlay" onClick={() => setShowEmergencyDialog(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(220, 38, 38, 0.05)' }}>
              <div className="flex align-center gap-sm" style={{ color: 'var(--danger)' }}>
                <AlertTriangle size={18} />
                <h2 style={{ fontSize: '16px', fontWeight: 700 }}>Critical Emergency Alerts Desk</h2>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowEmergencyDialog(false)}>
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '20px', maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {alerts.map(al => (
                <div
                  key={al.id}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    borderLeft: '4px solid var(--danger)',
                    backgroundColor: 'var(--bg-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div className="flex justify-between align-center">
                    <span className="badge badge-danger" style={{ textTransform: 'uppercase', fontSize: '10px' }}>{al.type}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{al.timestamp}</span>
                  </div>
                  <strong style={{ fontSize: '13px' }}>Location: {al.location}</strong>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{al.message}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setAlerts([])}>Dismiss All</button>
              <button className="btn btn-primary" onClick={() => setShowEmergencyDialog(false)}>Close Panel</button>
            </div>
          </div>
        </div>
      )}

      {showReceiptDialog && receiptDetails && (
        <div className="dialog-overlay" onClick={() => setShowReceiptDialog(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', width: '100%', padding: '24px' }}>
            <div className="dialog-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <h3 style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: 'var(--primary)' }} />
                <span>Patient Registered Successfully</span>
              </h3>
              <button onClick={() => setShowReceiptDialog(false)} className="btn btn-ghost" style={{ padding: '4px' }}><X size={16} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '20px 0' }}>
              {/* UHID Card */}
              <div style={{ border: '2.5px solid #2563eb', borderRadius: '8px', padding: '16px', backgroundColor: '#090d16', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(37,99,235,0.08)' }}></div>
                <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', color: '#3b82f6', marginBottom: '8px' }}>HEXENCARE HOSPITALS</div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '12px' }}>{receiptDetails.name}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
                  <div>UHID: <strong>{receiptDetails.uhid}</strong></div>
                  <div>Phone: {receiptDetails.phone}</div>
                  <div>Age/Sex: {receiptDetails.age} / {receiptDetails.gender}</div>
                  <div>Blood: <span style={{ color: 'var(--danger)' }}>{receiptDetails.bloodGroup}</span></div>
                </div>
                {/* Barcode */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                  <div style={{ background: 'white', padding: '4px', borderRadius: '4px', display: 'inline-block' }}>
                    <div style={{ fontSize: '9px', fontWeight: 'bold', letterSpacing: '1.2px', color: 'black', textTransform: 'uppercase', fontFamily: 'monospace' }}>
                      |||| | || || | ||
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>OPD Token</span>
                    <strong style={{ fontSize: '13px', color: 'var(--success)' }}>{receiptDetails.token}</strong>
                  </div>
                </div>
              </div>

              {/* Invoice Summary */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>Invoice Receipt</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', margin: '6px 0' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Reg Fee:</span>
                  <span>₹{receiptDetails.regFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', margin: '6px 0' }}>
                  <span style={{ color: 'var(--text-muted)' }}>OPD Consultation:</span>
                  <span>₹{receiptDetails.conFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', margin: '6px 0' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Advance Deposit:</span>
                  <span>₹{receiptDetails.advPay}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '8px' }}>
                  <span>Total Paid:</span>
                  <span style={{ color: 'var(--success)' }}>₹{receiptDetails.total}</span>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '12px' }}>
                  Coverage: {receiptDetails.tpa !== 'None' ? `${receiptDetails.tpa} Clear` : 'Settled'}
                </div>
              </div>
            </div>

            <div style={{ border: '1px dashed var(--border)', borderRadius: '6px', padding: '12px', display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'rgba(59,130,246,0.05)', marginBottom: '20px' }}>
              <Info size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <p style={{ fontSize: '11px', margin: 0 }}>
                SMS & WhatsApp confirmation sent to <strong>{receiptDetails.phone}</strong> with UHID credentials and active token appointment details.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => { addToast('success', "UHID & Receipt sent to print queue..."); }} className="btn btn-primary" style={{ gap: '6px' }}>
                <Printer size={14} />
                <span>Print Card</span>
              </button>
              <button onClick={() => { setShowReceiptDialog(false); setActiveTab('consultation'); }} className="btn btn-secondary">
                <span>Close Desk</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification HUD */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <Info size={16} style={{ color: t.type === 'danger' ? 'var(--danger)' : t.type === 'success' ? 'var(--success)' : 'var(--primary)' }} />
            <span style={{ fontSize: '12px', fontWeight: 500 }}>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
