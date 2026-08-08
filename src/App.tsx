import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Bell, AlertTriangle, Shield, Activity,
  FlaskConical, Pill, DollarSign, Bed,
  Users, CheckCircle, ArrowRight, ArrowLeft,
  Printer, Sparkles, ChevronRight, ChevronLeft, UserPlus,
  Heart, Info, X, Sun, Moon,
  AlertCircle,
  Send, Stethoscope, Video, MapPin, FileSpreadsheet, Plus, FileText, Mic, Scissors, Globe
} from 'lucide-react';

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
    bloodbank: true,
    billing: true,
    analytics: true
  });
  const ROLE_PERMISSIONS: Record<string, Record<string, boolean>> = {
    admin: { dashboard: true, registration: true, appointments: true, consultation: true, icu: true, ot: true, wards: true, lab: true, pharmacy: true, bloodbank: true, billing: true, analytics: true },
    doctor: { dashboard: true, registration: false, appointments: true, consultation: true, icu: true, ot: true, wards: true, lab: true, pharmacy: true, bloodbank: true, billing: false, analytics: true },
    anesthetist: { dashboard: true, registration: false, appointments: false, consultation: false, icu: true, ot: true, wards: false, lab: true, pharmacy: true, bloodbank: true, billing: false, analytics: false },
    nurse: { dashboard: true, registration: true, appointments: true, consultation: false, icu: true, ot: true, wards: true, lab: true, pharmacy: false, bloodbank: true, billing: false, analytics: false },
    receptionist: { dashboard: true, registration: true, appointments: true, consultation: false, icu: false, ot: false, wards: true, lab: false, pharmacy: false, bloodbank: false, billing: true, analytics: false },
    lab_tech: { dashboard: false, registration: false, appointments: false, consultation: false, icu: false, ot: false, wards: false, lab: true, pharmacy: false, bloodbank: true, billing: false, analytics: false },
    pharmacist: { dashboard: false, registration: false, appointments: false, consultation: false, icu: false, ot: false, wards: false, lab: false, pharmacy: true, bloodbank: false, billing: true, analytics: false },
    accountant: { dashboard: true, registration: false, appointments: false, consultation: false, icu: false, ot: false, wards: false, lab: false, pharmacy: false, bloodbank: false, billing: true, analytics: true }
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

          {/* SECTION: FINANCE */}
          {isModuleVisible('billing') && (
            <>
              {!sidebarCollapsed ? (
                <div className="nav-section-title">FINANCE</div>
              ) : (
                <div style={{ height: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '8px 0' }}></div>
              )}
              
              <button onClick={() => setActiveTab('billing')} className={`sidebar-nav-item ${activeTab === 'billing' ? 'active' : ''}`} title="Billing & Claims">
                {sidebarCollapsed ? <DollarSign size={18} /> : <span>Billing & Claims</span>}
              </button>
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
          {activeTab === 'dashboard' && (
            <div className="flex flex-col gap-lg">
              
              {/* Header Banner & 1-Click Quick Launcher Hub */}
              <div className="card" style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(16, 185, 129, 0.05) 100%)', borderLeft: '4px solid var(--primary)', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>🏥 Welcome to HexenCare HMS Dashboard</span>
                      <span className="badge badge-success">Live System Active</span>
                    </h2>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Simple, clean & user-friendly dashboard overview. Click any action tile below to jump directly into the workspace!
                    </p>
                  </div>

                  {/* Filter View Selector Pills */}
                  <div style={{ display: 'flex', background: 'var(--bg-muted)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border)', flexWrap: 'wrap', gap: '4px' }}>
                    <button onClick={() => setDashboardViewMode('all')} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 600, border: 'none', borderRadius: '6px', background: dashboardViewMode === 'all' ? 'var(--primary)' : 'transparent', color: dashboardViewMode === 'all' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                      🌟 Executive Overview
                    </button>
                    <button onClick={() => setDashboardViewMode('doctor')} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 600, border: 'none', borderRadius: '6px', background: dashboardViewMode === 'doctor' ? 'var(--primary)' : 'transparent', color: dashboardViewMode === 'doctor' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                      👨‍⚕️ Doctor Desk View
                    </button>
                    <button onClick={() => setDashboardViewMode('ipd_icu')} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 600, border: 'none', borderRadius: '6px', background: dashboardViewMode === 'ipd_icu' ? 'var(--primary)' : 'transparent', color: dashboardViewMode === 'ipd_icu' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                      🛌 IPD & ICU Watch
                    </button>
                    <button onClick={() => setDashboardViewMode('ot')} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 600, border: 'none', borderRadius: '6px', background: dashboardViewMode === 'ot' ? 'var(--primary)' : 'transparent', color: dashboardViewMode === 'ot' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                      ✂️ OT Surgery Watch
                    </button>
                    <button onClick={() => setDashboardViewMode('lab')} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 600, border: 'none', borderRadius: '6px', background: dashboardViewMode === 'lab' ? 'var(--primary)' : 'transparent', color: dashboardViewMode === 'lab' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                      🔬 Pathology Lab Watch
                    </button>
                  </div>
                </div>

                {/* 1-Click Quick Launcher Action Hub */}
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    ⚡ 1-Click Quick Action Launcher
                  </div>
                  <div className="grid grid-4" style={{ gap: '10px' }}>
                    <button onClick={() => setActiveTab('registration')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <UserPlus size={18} style={{ color: 'var(--primary)' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>Register New Patient</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Create UHID & Medical File</div>
                      </div>
                    </button>

                    <button onClick={() => setActiveTab('consultation')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <Stethoscope size={18} style={{ color: 'var(--success)' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>OPD Consultation Desk</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Examine & Write eRx</div>
                      </div>
                    </button>

                    <button onClick={() => setActiveTab('icu')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <Heart size={18} style={{ color: '#EAB308' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>ICU Suite Monitor</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Vitals & Critical Alerts</div>
                      </div>
                    </button>

                    <button onClick={() => setActiveTab('ot')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <Scissors size={18} style={{ color: '#EC4899' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>OT Surgery Suite</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Whiteboard & Operative Notes</div>
                      </div>
                    </button>

                    <button onClick={() => setActiveTab('lab')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <FlaskConical size={18} style={{ color: '#8B5CF6' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>Pathology & Radiology</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Book Orders & View Reports</div>
                      </div>
                    </button>

                    <button onClick={() => setActiveTab('pharmacy')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <Pill size={18} style={{ color: '#06B6D4' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>Pharmacy Counter</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Dispense eRx & OTC Cashier</div>
                      </div>
                    </button>

                    <button onClick={() => { setActiveTab('wards'); setIpdTab('overview'); }} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <Bed size={18} style={{ color: '#10B981' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>IPD Wards & Beds</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Bed Occupancy & Transfers</div>
                      </div>
                    </button>

                    <button onClick={() => setActiveTab('billing')} className="btn" style={{ justifyContent: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px' }}>
                      <DollarSign size={18} style={{ color: '#F59E0B' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>Billing & Claims</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Invoices & TPA Insurance</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Stat Summary Cards */}
              <div className="grid grid-4" style={{ gap: '16px' }}>
                <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                  <div className="card-header">
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Patients Today</span>
                    <Users size={18} style={{ color: 'var(--primary)' }} />
                  </div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0' }}>{statsSummary.totalPatients}</h2>
                  <div style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>↑ +12% vs Yesterday</div>
                </div>

                <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
                  <div className="card-header">
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Bed Occupancy</span>
                    <Bed size={18} style={{ color: 'var(--success)' }} />
                  </div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0' }}>{statsSummary.bedOccupancyRate}%</h2>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{statsSummary.activeICU} ICU Beds Active</div>
                </div>

                <div className="card" style={{ borderLeft: '4px solid #EAB308' }}>
                  <div className="card-header">
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>OT Surgeries Today</span>
                    <Scissors size={18} style={{ color: '#EAB308' }} />
                  </div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0' }}>6 Scheduled</h2>
                  <div style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>2 Surgeries In Progress</div>
                </div>

                <div className="card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                  <div className="card-header">
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Pathology Lab Reports</span>
                    <FlaskConical size={18} style={{ color: '#8B5CF6' }} />
                  </div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0' }}>128 Done</h2>
                  <div style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>99.4% On-time TAT</div>
                </div>
              </div>

              {/* Graphical Visualizations & Lists */}
              <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* SVG Revenue performance graph */}
                <div className="card">
                  <div className="card-header">
                    <h2>OPD vs IPD Patient Stream (Last 6 Hours)</h2>
                    <div className="flex gap-sm">
                      <span className="badge badge-primary">OPD Intake</span>
                      <span className="badge badge-success">IPD Intake</span>
                    </div>
                  </div>
                  <div style={{ height: '220px', position: 'relative', marginTop: '20px' }}>
                    <svg className="svg-chart" viewBox="0 0 500 200" preserveAspectRatio="none">
                      <line x1="0" y1="50" x2="500" y2="50" className="chart-grid-line" />
                      <line x1="0" y1="100" x2="500" y2="100" className="chart-grid-line" />
                      <line x1="0" y1="150" x2="500" y2="150" className="chart-grid-line" />
                      
                      <path d="M 0 160 Q 100 80, 200 120 T 400 60 L 500 90 L 500 200 L 0 200 Z" className="chart-area" />
                      <path d="M 0 160 Q 100 80, 200 120 T 400 60 L 500 90" className="chart-line" />

                      <path d="M 0 180 Q 100 120, 200 140 T 400 90 L 500 110" className="chart-line" style={{ stroke: 'var(--success)' }} />
                    </svg>
                    <div className="flex justify-between text-xs text-muted" style={{ marginTop: '8px' }}>
                      <span>16:00</span>
                      <span>17:00</span>
                      <span>18:00</span>
                      <span>19:00</span>
                      <span>20:00</span>
                      <span>21:00</span>
                    </div>
                  </div>
                </div>

                {/* Operations checklist and calendar alerts */}
                <div className="card">
                  <div className="card-header">
                    <h2>OT Schedule Today</h2>
                    <span className="badge badge-muted">3 surgeries scheduled</span>
                  </div>
                  <div className="flex flex-col gap-md" style={{ marginTop: '16px' }}>
                    <div className="flex gap-md" style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '12px' }}>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>CABG Bypass Grafting</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Patient: Aarav Sharma | OT-1</div>
                        <div style={{ fontSize: '11px', color: 'var(--primary)', marginTop: '4px' }}>09:00 AM - 12:30 PM</div>
                      </div>
                      <span className="badge badge-success" style={{ alignSelf: 'flex-start' }}>Done</span>
                    </div>

                    <div className="flex gap-md" style={{ borderLeft: '3px solid var(--warning)', paddingLeft: '12px' }}>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>Laparoscopic Appendectomy</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Patient: Priya Nair | OT-2</div>
                        <div style={{ fontSize: '11px', color: 'var(--warning)', marginTop: '4px' }}>03:00 PM - 04:30 PM</div>
                      </div>
                      <span className="badge badge-warning" style={{ alignSelf: 'flex-start' }}>Delayed</span>
                    </div>

                    <div className="flex gap-md" style={{ borderLeft: '3px solid var(--danger)', paddingLeft: '12px' }}>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>Total Hip Replacement</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Patient: Vikram Malhotra | OT-1</div>
                        <div style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '4px' }}>05:30 PM - 07:30 PM</div>
                      </div>
                      <span className="badge badge-danger" style={{ alignSelf: 'flex-start' }}>In Progress</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Enterprise Queue Table */}
              <div className="card">
                <div className="card-header">
                  <h2>Active Patient Queue - {activeBranch.toUpperCase()} Branch</h2>
                  <div className="flex gap-sm">
                    <div style={{ position: 'relative' }}>
                      <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        placeholder="Search patient name..."
                        className="form-input"
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        style={{ paddingLeft: '28px', width: '220px', height: '32px' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="table-container" style={{ marginTop: '16px' }}>
                  <div className="data-table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Patient ID</th>
                          <th>Patient Name</th>
                          <th>Age / Gender</th>
                          <th>ESI Acuity</th>
                          <th>Blood Group</th>
                          <th>Vitals (BP / HR / O2)</th>
                          <th>Workflow Status</th>
                          <th>ICD Class Link</th>
                          <th>Billing Status</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {branchPatients
                          .filter(p => p.name.toLowerCase().includes(filterQuery.toLowerCase()))
                          .map((p) => (
                            <tr key={p.id} className={selectedPatientId === p.id ? 'active' : ''}>
                              <td className="font-semibold">{p.id}</td>
                              <td>{p.name}</td>
                              <td>{p.age} Y / {p.gender}</td>
                              <td>
                                <span className={`badge ${
                                  p.esiScore === 1 ? 'badge-danger font-bold' :
                                  p.esiScore === 2 ? 'badge-danger' :
                                  p.esiScore === 3 ? 'badge-warning' : 'badge-primary'
                                }`}>
                                  ESI-{p.esiScore || 3}
                                </span>
                              </td>
                              <td>{p.bloodGroup}</td>
                              <td>
                                <span className={p.vitals.heartRate > 100 || p.vitals.oxygenSat < 96 ? 'badge badge-danger' : 'badge badge-muted'}>
                                  {p.vitals.bloodPressure} | {p.vitals.heartRate} bpm | {p.vitals.oxygenSat}%
                                </span>
                              </td>
                              <td>
                                <span className={`badge ${
                                  p.status === 'in-consultation' ? 'badge-primary' :
                                  p.status === 'lab-pending' ? 'badge-warning' :
                                  p.status === 'pharmacy-pending' ? 'badge-warning' :
                                  p.status === 'billed' ? 'badge-success' :
                                  p.status === 'discharged' ? 'badge-muted' : 'badge-muted'
                                }`}>
                                  {p.status}
                                </span>
                              </td>
                              <td>
                                <span className="badge badge-muted" style={{ fontFamily: 'monospace' }}>
                                  {p.mrdCode || 'Not Codified'}
                                </span>
                              </td>
                              <td>
                                <span className={p.pendingBill > 0 ? 'badge badge-danger' : 'badge badge-success'}>
                                  {p.pendingBill > 0 ? `₹${p.pendingBill.toLocaleString()} Pending` : 'Settled'}
                                </span>
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <button
                                  className="btn btn-secondary btn-icon"
                                  onClick={() => {
                                    setSelectedPatientId(p.id);
                                    setActiveTab(activeRole === 'doctor' ? 'consultation' : activeRole === 'accountant' ? 'billing' : 'consultation');
                                  }}
                                >
                                  <ChevronRight size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Enterprise OPD Reports & Analytics Suite Card */}
              <div className="card" style={{ marginTop: '20px' }}>
                <div className="card-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Enterprise OPD Reports & Analytics Suite</h2>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Interactive, real-time analytics covering all 7 standard hospital reporting vectors.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', maxWidth: '100%' }}>
                    {[
                      { key: 'daily', label: 'Daily OPD' },
                      { key: 'doctor', label: 'Doctor-wise' },
                      { key: 'department', label: 'Department-wise' },
                      { key: 'diagnosis', label: 'Diagnosis Stats' },
                      { key: 'prescriptions', label: 'Rx Analytics' },
                      { key: 'followups', label: 'Follow-ups' },
                      { key: 'revenue', label: 'Revenue Report' }
                    ].map((tab) => (
                      <button
                        type="button"
                        key={tab.key}
                        onClick={() => setActiveReportTab(tab.key as any)}
                        style={{
                          padding: '4px 10px',
                          fontSize: '10px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          background: activeReportTab === tab.key ? 'var(--primary)' : 'var(--bg-muted)',
                          color: activeReportTab === tab.key ? 'white' : 'var(--text-muted)',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '16px' }}>
                  {activeReportTab === 'daily' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Today's Live OPD Registration Summary</h3>
                      <div className="grid grid-4" style={{ gap: '12px' }}>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total OPD Registrations</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>18 Patients</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Walk-in Registrations</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>9 Patients (50%)</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Online Pre-Registrations</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>5 Patients (28%)</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Corporate / Referral Registrations</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>4 Patients (22%)</h4>
                        </div>
                      </div>
                      <div style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '12px', marginTop: '4px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'white', marginBottom: '8px' }}>Recent Audit Log Registries (Daily Stream)</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div>• [09:12 AM] - Walk-in patient Aarav Sharma registered via UHID Auto-Generator.</div>
                          <div>• [10:34 AM] - Pre-registered patient Priya Nair admitted to Cardiology Clinic queue.</div>
                          <div>• [11:15 AM] - Corporate clearance approved for patient Vikram Malhotra.</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeReportTab === 'doctor' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Doctor Consultation Productivity Index</h3>
                      <table className="data-table" style={{ fontSize: '12px', width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                            <th style={{ padding: '8px' }}>Doctor Name</th>
                            <th style={{ padding: '8px' }}>Specialization</th>
                            <th style={{ padding: '8px' }}>Patients Seen</th>
                            <th style={{ padding: '8px' }}>Avg Consultation Time</th>
                            <th style={{ padding: '8px' }}>Revenue Contributed</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <td className="font-semibold" style={{ padding: '8px' }}>Dr. Sandeep Mehta</td>
                            <td style={{ padding: '8px' }}>Chief Cardiologist</td>
                            <td style={{ padding: '8px' }}>12 Patients</td>
                            <td style={{ padding: '8px' }}>14.2 minutes</td>
                            <td style={{ color: 'var(--success)', padding: '8px', fontWeight: 600 }}>₹24,000</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <td className="font-semibold" style={{ padding: '8px' }}>Dr. Ananya Ray</td>
                            <td style={{ padding: '8px' }}>General Physician</td>
                            <td style={{ padding: '8px' }}>8 Patients</td>
                            <td style={{ padding: '8px' }}>10.5 minutes</td>
                            <td style={{ color: 'var(--success)', padding: '8px', fontWeight: 600 }}>₹8,000</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <td className="font-semibold" style={{ padding: '8px' }}>Dr. Deepa Roy</td>
                            <td style={{ padding: '8px' }}>Internal Medicine</td>
                            <td style={{ padding: '8px' }}>6 Patients</td>
                            <td style={{ padding: '8px' }}>18.1 minutes</td>
                            <td style={{ color: 'var(--success)', padding: '8px', fontWeight: 600 }}>₹6,000</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <td className="font-semibold" style={{ padding: '8px' }}>Dr. Sanjay Sen</td>
                            <td style={{ padding: '8px' }}>Pediatric Specialist</td>
                            <td style={{ padding: '8px' }}>4 Patients</td>
                            <td style={{ padding: '8px' }}>12.0 minutes</td>
                            <td style={{ color: 'var(--success)', padding: '8px', fontWeight: 600 }}>₹4,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeReportTab === 'department' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Department-wise Patient Load Summary</h3>
                      <div className="grid grid-3" style={{ gap: '12px' }}>
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '6px', textAlign: 'center', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cardiology Clinic</span>
                          <h4 style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0', color: 'var(--primary)' }}>12 Patients</h4>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>40% load factor</span>
                        </div>
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '6px', textAlign: 'center', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Internal Medicine</span>
                          <h4 style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0', color: 'var(--success)' }}>8 Patients</h4>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>27% load factor</span>
                        </div>
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '6px', textAlign: 'center', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pediatric Clinic</span>
                          <h4 style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0', color: 'var(--warning)' }}>6 Patients</h4>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>20% load factor</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeReportTab === 'diagnosis' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Top ICD Diagnosis Code Frequencies</h3>
                      <div className="grid grid-2" style={{ gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                            <span>Essential hypertension [ICD-10 I10]</span>
                            <strong>42% (8 cases)</strong>
                          </div>
                          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: '42%', background: 'var(--primary)' }}></div>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '4px' }}>
                            <span>Type 2 diabetes mellitus [ICD-10 E11]</span>
                            <strong>26% (5 cases)</strong>
                          </div>
                          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: '26%', background: 'var(--success)' }}></div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                            <span>Coronary artery disease [ICD-10 I25.1]</span>
                            <strong>16% (3 cases)</strong>
                          </div>
                          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: '16%', background: 'var(--warning)' }}></div>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '4px' }}>
                            <span>Allergic asthma [ICD-10 J45.909]</span>
                            <strong>10% (2 cases)</strong>
                          </div>
                          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: '10%', background: 'var(--danger)' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeReportTab === 'prescriptions' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>SaaS Prescribing & Generic Efficiency Stats</h3>
                      <div className="grid grid-4" style={{ gap: '12px' }}>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total E-Prescriptions Issued</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>34 Prescriptions</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Generic Brand Substitutions</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>88.2% (28 Success)</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Drug Interaction Safety Alerts</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--danger)' }}>3 Blocked Interactions</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Multi-language Translations</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>9 Hindi / 4 Telugu prints</h4>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeReportTab === 'followups' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Chronic Disease Patient Follow-up & Compliance Registry</h3>
                      <div className="grid grid-3" style={{ gap: '12px' }}>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>WhatsApp Reminder Delivery Success</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>94.1% Delivery Rate</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Compliance / Retention Rate</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--primary)' }}>82.5% Return Compliance</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Missed Follow-ups Registered</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--warning)' }}>2 Patients Tracked</h4>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeReportTab === 'revenue' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>Live OPD Segment Revenue Distributions</h3>
                      <div className="grid grid-4" style={{ gap: '12px' }}>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Doctor Consultation Fees</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>₹42,000</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Laboratory Investigation Revenue</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>₹18,500</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Radiology Scan Bilateral fees</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>₹14,000</h4>
                        </div>
                        <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pharmacy Dispensed Billing</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>₹22,100</h4>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB: QUICK PATIENT REGISTRATION (Under 60s target)
              ========================================== */}
          {activeTab === 'registration' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
              
              {/* Left Column: Form Stepper */}
              <div className="card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Integrated Hospital Registration Desk</h2>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>New admissions, ESI triage check-in, billing, and card print queues.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" className="btn btn-secondary" onClick={handleQrRegistrationScan} style={{ gap: '6px', fontSize: '12px' }}>
                      <Plus size={14} />
                      <span>Scan QR Card</span>
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleOcrScanSimulation} style={{ gap: '6px', fontSize: '12px', border: ocrAutoFilled ? '1px solid var(--success)' : '' }}>
                      <Sparkles size={14} style={{ color: ocrAutoFilled ? 'var(--success)' : '' }} />
                      <span>{ocrAutoFilled ? 'OCR Form Filled' : 'AI OCR Scan ID Card'}</span>
                    </button>
                  </div>
                </div>

                {/* Step Progress Indicators */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', padding: '16px 0', marginBottom: '20px', gap: '4px' }}>
                  <div style={{ flex: 1, padding: '8px', borderBottom: `2px solid ${regStep >= 1 ? 'var(--primary)' : 'transparent'}`, textAlign: 'center', transition: 'all 0.15s ease' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: regStep >= 1 ? 'white' : 'var(--text-muted)' }}>1. Acuity & Demographics</span>
                  </div>
                  <div style={{ flex: 1, padding: '8px', borderBottom: `2px solid ${regStep >= 2 ? 'var(--primary)' : 'transparent'}`, textAlign: 'center', transition: 'all 0.15s ease' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: regStep >= 2 ? 'white' : 'var(--text-muted)' }}>2. Identity & Documents</span>
                  </div>
                  <div style={{ flex: 1, padding: '8px', borderBottom: `2px solid ${regStep >= 3 ? 'var(--primary)' : 'transparent'}`, textAlign: 'center', transition: 'all 0.15s ease' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: regStep >= 3 ? 'white' : 'var(--text-muted)' }}>3. Assigned Clinic</span>
                  </div>
                  <div style={{ flex: 1, padding: '8px', borderBottom: `2px solid ${regStep >= 4 ? 'var(--primary)' : 'transparent'}`, textAlign: 'center', transition: 'all 0.15s ease' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: regStep >= 4 ? 'white' : 'var(--text-muted)' }}>4. Billing & Fees</span>
                  </div>
                </div>

                <form onSubmit={handleRegisterSubmit}>
                  {/* Step 1: Acuity & Demographics */}
                  {regStep === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">Registration Type</label>
                          <select
                            className="form-input"
                            value={regType}
                            onChange={(e: any) => setRegType(e.target.value)}
                          >
                            <option value="new">New Patient Registration</option>
                            <option value="walkin">Walk-in Triage</option>
                            <option value="emergency">Emergency Admit</option>
                            <option value="referral">Referral Admission</option>
                            <option value="corporate">Corporate / Employer Plan</option>
                            <option value="online">Online Pre-Registration</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">ESI Acuity Triage Level</label>
                          <select
                            className="form-input"
                            value={regForm.esiScore}
                            onChange={(e) => setRegForm({ ...regForm, esiScore: e.target.value })}
                          >
                            <option value="1">ESI-1: Resuscitation (Severe threat)</option>
                            <option value="2">ESI-2: Emergent (High risk status)</option>
                            <option value="3">ESI-3: Urgent (Stable vitals, multiple tests)</option>
                            <option value="4">ESI-4: Less Urgent (Stable, single test)</option>
                            <option value="5">ESI-5: Non-Urgent (Refills/Exam only)</option>
                          </select>
                        </div>
                      </div>

                      {duplicatePatientAlert && (
                        <div style={{ border: '1px solid var(--danger)', background: 'rgba(220,38,38,0.08)', borderRadius: '6px', padding: '12px', color: 'var(--danger)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <AlertTriangle size={18} />
                          <div style={{ flexGrow: 1 }}>
                            <strong>Duplicate Detection:</strong> A patient named <strong>{regForm.name}</strong> is already registered. If this is the same patient, click to lookup in Search widget.
                          </div>
                        </div>
                      )}

                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">Full Name <span style={{ color: 'var(--danger)' }}>*</span></label>
                          <input
                            type="text"
                            placeholder="Patient's Full Name"
                            className="form-input"
                            required
                            value={regForm.name}
                            onChange={(e) => handleRegFormNameChange(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Age <span style={{ color: 'var(--danger)' }}>*</span></label>
                          <input
                            type="number"
                            placeholder="Age"
                            className="form-input"
                            required
                            value={regForm.age}
                            onChange={(e) => setRegForm({ ...regForm, age: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Gender <span style={{ color: 'var(--danger)' }}>*</span></label>
                          <select
                            className="form-input"
                            value={regForm.gender}
                            onChange={(e) => setRegForm({ ...regForm, gender: e.target.value })}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Blood Group</label>
                          <select
                            className="form-input"
                            value={regForm.bloodGroup}
                            onChange={(e) => setRegForm({ ...regForm, bloodGroup: e.target.value })}
                          >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Mobile Number <span style={{ color: 'var(--danger)' }}>*</span></label>
                          <input
                            type="tel"
                            placeholder="+91 99999 88888"
                            className="form-input"
                            required
                            value={regForm.phone}
                            onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            placeholder="patient@email.com"
                            className="form-input"
                            value={regForm.email}
                            onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Residential Address</label>
                        <input
                          type="text"
                          placeholder="Street, City, Pincode"
                          className="form-input"
                          value={regForm.address}
                          onChange={(e) => setRegForm({ ...regForm, address: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">Emergency Contact Name</label>
                          <input
                            type="text"
                            placeholder="Spouse / Parent / Kin"
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Emergency Contact Phone</label>
                          <input
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            className="form-input"
                          />
                        </div>
                      </div>

                      {regType === 'referral' && (
                        <div className="form-group">
                          <label className="form-label">Referral Source Clinic / Practitioner Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Dr. Roy Diagnostic Center"
                            className="form-input"
                            value={referralSource}
                            onChange={(e) => setReferralSource(e.target.value)}
                          />
                        </div>
                      )}

                      {regType === 'corporate' && (
                        <div className="form-group">
                          <label className="form-label">Corporate Employer Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Tata Consultancy Services"
                            className="form-input"
                            value={corporateEmployer}
                            onChange={(e) => setCorporateEmployer(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 2: Identity & Document Verification */}
                  {regStep === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">National ID Verification Type</label>
                          <select
                            className="form-input"
                            value={idProofType}
                            onChange={(e: any) => setIdProofType(e.target.value)}
                          >
                            <option value="Aadhaar">Aadhaar (National ID)</option>
                            <option value="Passport">Passport</option>
                            <option value="None">Self-Declared (No ID Proof)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">ID Document/Aadhaar Number</label>
                          <input
                            type="text"
                            placeholder="XXXX-XXXX-XXXX"
                            className="form-input"
                            value={idProofNumber}
                            onChange={(e) => setIdProofNumber(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* OTP Verification Block */}
                      <div style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '16px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 600 }}>Two-Step OTP Security Check</span>
                          <span className={`badge ${
                            otpStatus === 'verified' ? 'badge-success' :
                            otpStatus === 'sent' ? 'badge-warning' : 'badge-muted'
                          }`}>
                            {otpStatus.toUpperCase()}
                          </span>
                        </div>
                        {otpStatus === 'idle' && (
                          <button type="button" className="btn btn-secondary" onClick={handleSendOtp} style={{ fontSize: '12px' }}>
                            Send Verification OTP (SMS)
                          </button>
                        )}
                        {otpStatus === 'sending' && (
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Generating OTP...</span>
                        )}
                        {otpStatus === 'sent' && (
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                              type="text"
                              placeholder="Enter 4-Digit OTP (e.g. 1234)"
                              className="form-input"
                              style={{ maxWidth: '200px' }}
                              value={enteredOtp}
                              onChange={(e) => setEnteredOtp(e.target.value)}
                            />
                            <button type="button" className="btn btn-primary" onClick={handleVerifyOtp}>
                              Verify
                            </button>
                          </div>
                        )}
                        {otpStatus === 'verified' && (
                          <span style={{ fontSize: '12px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CheckCircle size={14} /> Identity verified securely via SMS gateway.
                          </span>
                        )}
                      </div>

                      {/* Document uploads */}
                      <div>
                        <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Document Attachment Checksheet</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={documentUploads.idProof} onChange={(e) => setDocumentUploads({ ...documentUploads, idProof: e.target.checked })} />
                            <span style={{ fontSize: '12px' }}>Aadhaar ID Card Upload</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={documentUploads.insurance} onChange={(e) => setDocumentUploads({ ...documentUploads, insurance: e.target.checked })} />
                            <span style={{ fontSize: '12px' }}>Insurance Card Scan</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={documentUploads.referral} onChange={(e) => setDocumentUploads({ ...documentUploads, referral: e.target.checked })} />
                            <span style={{ fontSize: '12px' }}>Referral Letter (optional)</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={documentUploads.priorRecords} onChange={(e) => setDocumentUploads({ ...documentUploads, priorRecords: e.target.checked })} />
                            <span style={{ fontSize: '12px' }}>Prior Medical Records</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={documentUploads.consent} onChange={(e) => setDocumentUploads({ ...documentUploads, consent: e.target.checked })} />
                            <span style={{ fontSize: '12px' }}>Patient Consent Form Signed</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Assigned Clinic */}
                  {regStep === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">Clinical Specialty Department</label>
                          <select
                            className="form-input"
                            value={assignedDept}
                            onChange={(e) => {
                              setAssignedDept(e.target.value);
                              if (e.target.value === 'Cardiology') setAssignedDoctor('Dr. Sandeep Mehta');
                              else if (e.target.value === 'Pediatrics') setAssignedDoctor('Dr. Ananya Ray');
                              else setAssignedDoctor('Dr. Amit Roy');
                            }}
                          >
                            <option value="Cardiology">Cardiology</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Orthopaedics">Orthopaedics</option>
                            <option value="Gynaecology">Gynaecology</option>
                            <option value="Endocrinology">Endocrinology</option>
                            <option value="Pulmonology">Pulmonology</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Consulting Practitioner</label>
                          <select
                            className="form-input"
                            value={assignedDoctor}
                            onChange={(e) => setAssignedDoctor(e.target.value)}
                          >
                            <option value="Dr. Sandeep Mehta">Dr. Sandeep Mehta (Cardiology)</option>
                            <option value="Dr. Ananya Ray">Dr. Ananya Ray (Pediatrics)</option>
                            <option value="Dr. Amit Roy">Dr. Amit Roy (Orthopaedics/General)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">Choose Time Slot</label>
                          <select
                            className="form-input"
                            value={assignedSlot}
                            onChange={(e) => setAssignedSlot(e.target.value)}
                          >
                            <option value="10:30 AM">10:30 AM (Available)</option>
                            <option value="11:15 AM">11:15 AM (Available)</option>
                            <option value="12:00 PM">12:00 PM (Queue Overload)</option>
                            <option value="02:30 PM">02:30 PM (Available)</option>
                            <option value="03:15 PM">03:15 PM (Available)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Vitals Log Status</label>
                          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                            <span style={{ fontSize: '11px', padding: '6px 10px', background: 'rgba(37,99,235,0.1)', color: 'var(--primary)', borderRadius: '4px', display: 'inline-block' }}>HR: {regForm.heartRate} bpm</span>
                            <span style={{ fontSize: '11px', padding: '6px 10px', background: 'rgba(37,99,235,0.1)', color: 'var(--primary)', borderRadius: '4px', display: 'inline-block' }}>BP: {regForm.bloodPressure}</span>
                          </div>
                        </div>
                      </div>

                      {/* AI Queue Prediction Banner */}
                      <div style={{ display: 'flex', gap: '12px', border: '1px solid var(--border)', borderRadius: '6px', padding: '16px', backgroundColor: 'rgba(99,102,241,0.06)' }}>
                        <Sparkles size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>AI Queue Wait-Time Analytics</div>
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>
                            Based on active charts, <strong>{assignedDoctor}</strong> has 3 patients waiting in triage. Estimated wait time for slot <strong>{assignedSlot}</strong> is <strong>14 minutes</strong>.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Billing & Fees */}
                  {regStep === 4 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="grid grid-3">
                        <div className="form-group">
                          <label className="form-label">Registration Charge (₹)</label>
                          <input
                            type="number"
                            className="form-input"
                            value={registrationFees}
                            onChange={(e) => setRegistrationFees(parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">OPD Consultation (₹)</label>
                          <input
                            type="number"
                            className="form-input"
                            value={consultationFees}
                            onChange={(e) => setConsultationFees(parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Advance Deposit (₹)</label>
                          <input
                            type="number"
                            className="form-input"
                            value={advanceAmount}
                            onChange={(e) => setAdvanceAmount(parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">Insurance Provider / TPA Partner</label>
                          <select
                            className="form-input"
                            value={regForm.tpaProvider}
                            onChange={(e) => setRegForm({ ...regForm, tpaProvider: e.target.value })}
                          >
                            <option value="None">Self Pay (No TPA)</option>
                            <option value="Star Health Insurance">Star Health Insurance</option>
                            <option value="HDFC Ergo Health">HDFC Ergo Health</option>
                            <option value="ICICI Lombard">ICICI Lombard</option>
                            <option value="Max Bupa Health">Max Bupa Health</option>
                          </select>
                        </div>
                        {regForm.tpaProvider !== 'None' && (
                          <div className="form-group">
                            <label className="form-label">TPA Policy ID</label>
                            <input
                              type="text"
                              placeholder="e.g. STAR-8820"
                              className="form-input"
                              value={regForm.insuranceId}
                              onChange={(e) => setRegForm({ ...regForm, insuranceId: e.target.value })}
                            />
                          </div>
                        )}
                      </div>

                      {regForm.tpaProvider !== 'None' && (
                        <div style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: 600 }}>TPA Pre-Authorization Verification Gateway</div>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status query on Star Health/HDFC servers</span>
                          </div>
                          {insuranceEligibilityChecked === 'none' && (
                            <button type="button" className="btn btn-secondary" onClick={handleCheckInsuranceEligibility} style={{ fontSize: '11px' }}>
                              Check Eligibility
                            </button>
                          )}
                          {insuranceEligibilityChecked === 'checking' && (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Verifying eligibility...</span>
                          )}
                          {insuranceEligibilityChecked === 'approved' && (
                            <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>Approved (STAR Pay 90%)</span>
                          )}
                        </div>
                      )}

                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cumulative Collected Amount</span>
                          <div style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>₹{registrationFees + consultationFees + advanceAmount}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span className="badge badge-muted" style={{ padding: '6px 10px' }}>Cash/UPI</span>
                          <span className="badge badge-muted" style={{ padding: '6px 10px' }}>Receipt queue auto</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stepper Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                    {regStep > 1 ? (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setRegStep(prev => prev - 1)}
                        style={{ gap: '6px' }}
                      >
                        <ArrowLeft size={16} />
                        <span>Back</span>
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {regStep < 4 ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setRegStep(prev => prev + 1)}
                        style={{ gap: '6px' }}
                      >
                        <span>Next Step</span>
                        <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-success" style={{ gap: '6px' }}>
                        <CheckCircle size={16} />
                        <span>Complete Registration</span>
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Right Column: Search, Analytics & Quick Book */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Panel 1: Smart Patient Search & Quick Book */}
                <div className="card" style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '12px' }}>Smart Patient Search</h3>
                  
                  <div style={{ position: 'relative', marginBottom: '12px' }}>
                    <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      placeholder="Name, Phone, UHID, Aadhaar..."
                      className="form-input"
                      style={{ paddingLeft: '28px' }}
                      value={quickSearchQuery}
                      onChange={(e) => setQuickSearchQuery(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                    {patients
                      .filter(p => {
                        if (!quickSearchQuery) return false;
                        const q = quickSearchQuery.toLowerCase();
                        return p.name.toLowerCase().includes(q) || p.phone.includes(q) || p.id.toLowerCase().includes(q);
                      })
                      .map(p => (
                        <div
                          key={p.id}
                          style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                          <div>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>{p.name}</div>
                            <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{p.phone} | {p.id}</div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-ghost"
                            style={{ padding: '2px 6px', fontSize: '9px', border: '1px solid var(--border)' }}
                            onClick={() => {
                              setSelectedPatientId(p.id);
                              addToast('success', `Quick Booking active for existing patient: ${p.name}`);
                              setActiveTab('consultation');
                            }}
                          >
                            Book OPD
                          </button>
                        </div>
                      ))}
                    {quickSearchQuery && patients.filter(p => {
                      const q = quickSearchQuery.toLowerCase();
                      return p.name.toLowerCase().includes(q) || p.phone.includes(q) || p.id.toLowerCase().includes(q);
                    }).length === 0 && (
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', padding: '12px' }}>
                        No records match query. Choose "New Patient Registration".
                      </div>
                    )}
                    {!quickSearchQuery && (
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', padding: '12px' }}>
                        Type above to query active records.
                      </div>
                    )}
                  </div>
                </div>

                {/* Panel 2: Registration Analytics Dashboard */}
                <div className="card" style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '12px' }}>Daily Registration Report</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Total Registrations Today:</span>
                      <strong style={{ color: 'white' }}>18</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Walk-in Triage:</span>
                      <strong style={{ color: 'white' }}>9 (50%)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Referrals Received:</span>
                      <strong style={{ color: 'white' }}>4 (22%)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Corporate Clearances:</span>
                      <strong style={{ color: 'white' }}>3 (16%)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Emergency Admissions:</span>
                      <strong style={{ color: 'var(--danger)' }}>2 (12%)</strong>
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'white', marginBottom: '8px' }}>Dept-wise Admissions:</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>• Cardiology: 8 patients</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>• Pediatrics: 5 patients</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>• Orthopaedics: 3 patients</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>• Gynaecology: 2 patients</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ==========================================
              TAB: DOCTOR CONSULTATION CLINICAL WORKSPACE
              ========================================== */}
          {activeTab === 'consultation' && (
            <div className="consultation-workspace" style={{ gridTemplateColumns: showAiPanel ? '280px 1fr 340px' : '280px 1fr' }}>
              {/* Left Column: Clinic Patient Queue Selector */}
              <div className="workspace-panel">
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
                  <h3 style={{ fontWeight: 600 }}>Consultation Queue</h3>
                  <div style={{ position: 'relative', marginTop: '8px' }}>
                    <Search size={12} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      placeholder="Filter queue..."
                      className="form-input"
                      style={{ paddingLeft: '26px', height: '28px', fontSize: '11px' }}
                      value={opdSearchQuery}
                      onChange={(e) => setOpdSearchQuery(e.target.value)}
                    />
                  </div>
                  {/* Category filters */}
                  <div style={{ display: 'flex', gap: '4px', marginTop: '10px' }}>
                    {['all', 'waiting', 'completed', 'priority'].map((f) => (
                      <button
                        type="button"
                        key={f}
                        onClick={() => setOpdFilter(f as any)}
                        style={{
                          padding: '3px 6px',
                          fontSize: '9px',
                          textTransform: 'capitalize',
                          flexGrow: 1,
                          cursor: 'pointer',
                          background: opdFilter === f ? 'var(--primary)' : 'rgba(255,255,255,0.02)',
                          color: 'white',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '4px'
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="workspace-body" style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flexGrow: 1, minHeight: 0 }}>
                  {(() => {
                    const filtered = branchPatients.filter(p => {
                      if (opdSearchQuery && !p.name.toLowerCase().includes(opdSearchQuery.toLowerCase())) return false;
                      if (opdFilter === 'waiting') return p.status === 'waiting' || p.status === 'in-consultation';
                      if (opdFilter === 'completed') return p.status === 'discharged' || p.status === 'billed';
                      if (opdFilter === 'priority') return p.esiScore && p.esiScore <= 2;
                      return true;
                    });

                    return filtered.map(p => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPatientId(p.id)}
                        style={{
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid var(--border)',
                          backgroundColor: selectedPatientId === p.id ? 'rgba(37,99,235,0.06)' : 'var(--bg-card)',
                          borderColor: selectedPatientId === p.id ? 'var(--primary)' : 'var(--border)',
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {p.esiScore && p.esiScore <= 2 && (
                          <div style={{ position: 'absolute', top: '-6px', right: '10px', fontSize: '9px', background: 'var(--danger)', color: 'white', padding: '1px 6px', borderRadius: '10px', fontWeight: 'bold', zIndex: 1 }}>
                            ESI {p.esiScore} - PRIORITY
                          </div>
                        )}
                        <div className="flex align-center justify-between">
                          <span style={{ fontWeight: 600, fontSize: '13px' }}>{p.name}</span>
                          <span className={`badge ${
                            p.status === 'in-consultation' ? 'badge-primary' : p.status === 'no-show' ? 'badge-muted' : 'badge-success'
                          }`} style={{ fontSize: '9px' }}>
                            {p.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                          {p.gender}, {p.age} yrs | ID: {p.id}
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', borderTop: '1px dashed var(--border)', paddingTop: '6px' }}>
                          <span style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 600 }}>
                            AI Wait: {p.esiScore ? p.esiScore * 6 : 12} mins
                          </span>
                          <span className="badge badge-muted" style={{ fontSize: '9px' }}>BP: {p.vitals.bloodPressure}</span>
                        </div>

                        {/* Interactive Queue actions inside patient item */}
                        <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 4px', fontSize: '9px', flexGrow: 1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPatients(prev => prev.map(pt => pt.id === p.id ? { ...pt, status: 'in-consultation' } : pt));
                              addToast('success', `${p.name} checked-in for consultation.`);
                            }}
                          >
                            Check-in
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 4px', fontSize: '9px', flexGrow: 1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPatients(prev => prev.map(pt => pt.id === p.id ? { ...pt, status: 'billed' } : pt));
                              addToast('success', `${p.name} checked-out. Sent to pharmacy & billing.`);
                            }}
                          >
                            Check-out
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 4px', fontSize: '9px', color: 'var(--danger)' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPatients(prev => prev.map(pt => pt.id === p.id ? { ...pt, status: 'no-show' } : pt));
                              addToast('warning', `${p.name} marked as no-show.`);
                            }}
                          >
                            No-Show
                          </button>
                        </div>

                        {/* Queue Transfer Doctor Selector */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }} onClick={(e) => e.stopPropagation()}>
                          <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Transfer:</span>
                          <select
                            style={{ background: 'rgba(255,255,255,0.03)', color: 'white', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '10px', padding: '2px', cursor: 'pointer', flexGrow: 1 }}
                            onChange={(e) => {
                              const doc = e.target.value;
                              if (doc) {
                                addToast('warning', `Transferring patient ${p.name} to queue of ${doc}`);
                                setPatients(prev => prev.map(pt => pt.id === p.id ? { ...pt, assignedDoctor: doc } : pt));
                                // Log Activity Audit
                                const newAudit = {
                                  id: `LOG-${Date.now().toString().slice(-3)}`,
                                  timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
                                  user: "Dr. Sandeep Mehta",
                                  role: "Doctor",
                                  action: "Queue Transfer",
                                  module: "OPD Consultation",
                                  details: `Transferred patient ${p.name} queue token to ${doc}`
                                };
                                setAudits(prev => [newAudit, ...prev]);
                              }
                            }}
                          >
                            <option value="">-- Choose Doctor --</option>
                            <option value="Dr. Ananya Ray">Dr. Ananya Ray (Cardio)</option>
                            <option value="Dr. Deepa Roy">Dr. Deepa Roy (Internal Medicine)</option>
                            <option value="Dr. Sanjay Sen">Dr. Sanjay Sen (Pediatric)</option>
                          </select>
                        </div>
                      </div>
                    ));
                  })()}
                </div>

                {/* Doctor Productivity HUD */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'var(--bg-muted)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Doctor Productivity HUD</div>
                  <div className="grid grid-2" style={{ gap: '6px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', padding: '6px', borderRadius: '4px', textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Patients Today</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>18</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', padding: '6px', borderRadius: '4px', textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Avg Time / Pat</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>11.2 min</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Pending Reports:</span>
                    <strong style={{ color: 'var(--warning)' }}>2 Scans</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>OPD Share Revenue:</span>
                    <strong style={{ color: 'var(--success)' }}>₹42,000</strong>
                  </div>
                </div>
              </div>

              {/* Middle Column: Clinical 360° Profile & Prescriptions */}
              <div className="workspace-panel">
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: '16px' }}>Patient: {selectedPatient.name}</h2>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Sex: {selectedPatient.gender} | Age: {selectedPatient.age} | BG: {selectedPatient.bloodGroup} | ID: {selectedPatient.id}
                    </div>
                  </div>
                  <div className="flex gap-sm">
                    {/* Pregnancy check badge status */}
                    {selectedPatient.pregnancyStatus && (
                      <span className="badge badge-warning" style={{ alignSelf: 'center', fontWeight: 'bold' }}>🤰 Pregnant (Gestation Active)</span>
                    )}
                    <button
                      type="button"
                      className={`btn ${showAiPanel ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setShowAiPanel(!showAiPanel)}
                      style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                      title="Toggle Clinical AI Co-pilot Sidepanel"
                    >
                      <Sparkles size={14} style={{ color: showAiPanel ? 'white' : 'var(--primary)' }} />
                      <span>AI Co-pilot: {showAiPanel ? 'ON' : 'OFF'}</span>
                    </button>
                    <button className="btn btn-secondary" onClick={() => setShowFitnessDialog(true)} style={{ padding: '6px 12px' }}>
                      <FileText size={14} />
                      <span>Fitness Certificate</span>
                    </button>
                    <button className="btn btn-secondary btn-icon" title="Print clinical records" onClick={() => addToast('info', "Printing clinical records...")}>
                      <Printer size={14} />
                    </button>
                  </div>
                </div>

                {/* One-Click Action Toolbar */}
                <div style={{ display: 'flex', gap: '6px', padding: '8px 16px', background: 'var(--bg-muted)', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => setSelectedTabCategory('lab')}>
                    🧪 Order Labs
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => { setSelectedTabCategory('lab'); setShowFormFDialog(true); }}>
                    🩻 Order Radiology
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => setSelectedTabCategory('certificates')}>
                    📋 Refer to Specialist
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => { setActiveTab('wards'); addToast('info', "Navigating to Wards matrix for direct IPD admission allotment..."); }}>
                    🏥 Admit to IPD
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => setSelectedTabCategory('certificates')}>
                    📜 Medical Cert
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => setShowFitnessDialog(true)}>
                    🏃 Fitness Cert
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px', color: 'var(--success)' }} onClick={() => addToast('success', `Prescription shared to ${selectedPatient.name} via WhatsApp.`)}>
                    💬 WhatsApp Share
                  </button>
                  <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '10px', height: '24px' }} onClick={() => addToast('info', "Prescription sent to PDF printing queue.")}>
                    🖨️ Print Rx
                  </button>
                  
                  {/* Quick Consultation Mode Button */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ padding: '4px 10px', fontSize: '10px', height: '24px', marginLeft: 'auto', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: 'none' }}
                    onClick={() => {
                      setSoapSubjective({
                        chiefComplaint: "Review of Chronic Essential Hypertension",
                        hpi: "Patient presents for routine follow-up of chronic hypertension. Reports no chest pain, shortness of breath, or headache. Compliant with lifestyle modifications.",
                        medicalHistory: "Essential Hypertension (3 years)",
                        familyHistory: "Father - CAD, Mother - Diabetes",
                        surgicalHistory: "None"
                      });
                      setSoapObjective({
                        height: 175,
                        weight: 75,
                        painScale: 0,
                        lifestyle: "Moderate dietary sodium, walks 30 mins daily",
                        mentalHealth: "PHQ-9 Score: 3 (Minimal/None)"
                      });
                      setSoapAssessment({
                        diagnosisCode: "Essential hypertension [I10]",
                        differential: "White coat hypertension, secondary renal hypertension"
                      });
                      setSoapPlan({
                        treatment: "Continue low sodium DASH diet. Walk 30 minutes daily. Monitor BP twice weekly at home.",
                        referralSpecialist: "None"
                      });
                      setConsultationNotes("Routine follow-up check. BP is stable at target level (< 140/90).");
                      
                      const quickRx = {
                        id: `RX-QUICK-${Date.now()}`,
                        medication: 'Amlodipine (Generic: Norvasc)',
                        dosage: '5mg',
                        frequency: 'Once Daily (OD)',
                        duration: '30 days',
                        instructions: 'Take in the morning after food'
                      };
                      setPatients(prev => prev.map(p => p.id === selectedPatientId ? { ...p, prescriptions: [quickRx] } : p));
                      setSelectedTabCategory('soap');
                      addToast('success', "🚀 30-Second Consultation complete! EMR pre-filled, Metformin/Amlodipine Rx drafted & PDF ready.");
                    }}
                  >
                    🚀 30s Quick OPD Mode
                  </button>
                </div>

                <div className="workspace-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', flexGrow: 1, minHeight: 0 }}>
                  {/* Vital Board & Vitals Diagnostics (Shock Index / MAP) */}
                  <div className="grid grid-4">
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--bg-muted)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Blood Pressure</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Heart size={14} style={{ color: 'var(--danger)' }} />
                        <span>{selectedPatient.vitals.bloodPressure}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--primary)', marginTop: '2px', fontWeight: 600 }}>MAP: {calculatedVitalMetrics.map} mmHg</div>
                    </div>

                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--bg-muted)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Heart Rate</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Activity size={14} style={{ color: 'var(--danger)' }} />
                        <span>{selectedPatient.vitals.heartRate} bpm</span>
                      </div>
                      <div style={{ fontSize: '10px', color: calculatedVitalMetrics.shockIndex > 0.9 ? 'var(--danger)' : 'var(--text-muted)', marginTop: '2px', fontWeight: 600 }}>
                        Shock Index: {calculatedVitalMetrics.shockIndex}
                      </div>
                    </div>

                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--bg-muted)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>SpO2 O2 Sat</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Activity size={14} style={{ color: 'var(--primary)' }} />
                        <span>{selectedPatient.vitals.oxygenSat}%</span>
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Room Air</div>
                    </div>

                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'var(--bg-muted)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Triage Acuity</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Shield size={14} style={{ color: 'var(--warning)' }} />
                        <span>ESI-{selectedPatient.esiScore || 3}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Acuity Rating</div>
                    </div>
                  </div>

                  {/* Severe Allergy alerts */}
                  {selectedPatient.allergies.length > 0 && (
                    <div style={{ padding: '12px', backgroundColor: 'rgba(220, 38, 38, 0.05)', border: '1px solid rgba(220, 38, 38, 0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <AlertTriangle size={18} style={{ color: 'var(--danger)' }} />
                      <div style={{ fontSize: '12px' }}>
                        <strong>Active Allergen Warning:</strong> {selectedPatient.allergies.map(a => `${a.substance} (${a.severity} severity - triggers ${a.reaction})`).join(', ')}
                      </div>
                    </div>
                  )}
                  {/* Clinical Decision Support (CDS) Intelligence Banners */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {/* High Risk Alert */}
                    <div style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Activity size={16} style={{ color: selectedPatient.vitals.heartRate > 100 || selectedPatient.id === 'PX-2026-8812' ? 'var(--danger)' : 'var(--success)' }} />
                      <div style={{ fontSize: '11px' }}>
                        <div style={{ fontWeight: 600 }}>Clinical Risk Profile:</div>
                        <span style={{ color: selectedPatient.id === 'PX-2026-8812' ? 'var(--danger)' : 'var(--success)' }}>
                          {selectedPatient.id === 'PX-2026-8812' ? '⚠️ High Risk: Pregnant + Tachycardia' : '✅ Stable Risk Profile'}
                        </span>
                      </div>
                    </div>
                    {/* Vaccination Alerts */}
                    <div style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} style={{ color: 'var(--warning)' }} />
                      <div style={{ fontSize: '11px' }}>
                        <div style={{ fontWeight: 600 }}>Vaccinations & Screening Due:</div>
                        <span style={{ color: 'var(--warning)' }}>Influenza Booster, HbA1c Due</span>
                      </div>
                    </div>
                  </div>
                  {/* Advanced OPD: Chief complaints & Systemic Examination */}
                  <div className="grid grid-2" style={{ gap: '16px' }}>
                    <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px', color: 'var(--primary)' }}>OPD Chief Complaints Triage</h3>
                      {selectedPatient.chiefComplaints && selectedPatient.chiefComplaints.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {selectedPatient.chiefComplaints.map((c, idx) => (
                            <div key={idx} className="flex justify-between text-xs" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                              <span>• {c.complaint}</span>
                              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Duration: {c.duration}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No triage complaints registered. Add in triage section.</div>
                      )}
                    </div>

                    <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px', color: 'var(--primary)' }}>Systemic Physical Examination</h3>
                      {selectedPatient.systemicExam ? (
                        <div style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-muted)' }}>
                          <div><strong>CVS:</strong> {selectedPatient.systemicExam.cvs}</div>
                          <div><strong>RS:</strong> {selectedPatient.systemicExam.rs}</div>
                          <div><strong>GIT:</strong> {selectedPatient.systemicExam.git}</div>
                          <div><strong>CNS:</strong> {selectedPatient.systemicExam.cns}</div>
                        </div>
                      ) : (
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Physical exam records pending.</div>
                      )}
                    </div>
                  </div>

                  {/* Tabs layout inside console details */}
                  <div className="tabs-container" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
                    <div className="tab-list" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '16px', overflowX: 'auto', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      <span
                        className={`tab-item ${selectedTabCategory === 'all' || !['soap', 'prescriptions', 'lab', 'certificates'].includes(selectedTabCategory) ? 'active' : ''}`}
                        onClick={() => setSelectedTabCategory('all')}
                        style={{
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          background: (selectedTabCategory === 'all' || !['soap', 'prescriptions', 'lab', 'certificates'].includes(selectedTabCategory)) ? 'var(--primary)' : 'var(--bg-muted)',
                          color: (selectedTabCategory === 'all' || !['soap', 'prescriptions', 'lab', 'certificates'].includes(selectedTabCategory)) ? 'white' : 'var(--text-muted)',
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        Clinical Profile
                      </span>
                      <span
                        className={`tab-item ${selectedTabCategory === 'soap' ? 'active' : ''}`}
                        onClick={() => setSelectedTabCategory('soap')}
                        style={{
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          background: selectedTabCategory === 'soap' ? 'var(--primary)' : 'var(--bg-muted)',
                          color: selectedTabCategory === 'soap' ? 'white' : 'var(--text-muted)',
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        SOAP & Assessment
                      </span>
                      <span
                        className={`tab-item ${selectedTabCategory === 'prescriptions' ? 'active' : ''}`}
                        onClick={() => setSelectedTabCategory('prescriptions')}
                        style={{
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          background: selectedTabCategory === 'prescriptions' ? 'var(--primary)' : 'var(--bg-muted)',
                          color: selectedTabCategory === 'prescriptions' ? 'white' : 'var(--text-muted)',
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        Rx Prescription
                      </span>
                      <span
                        className={`tab-item ${selectedTabCategory === 'lab' ? 'active' : ''}`}
                        onClick={() => setSelectedTabCategory('lab')}
                        style={{
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          background: selectedTabCategory === 'lab' ? 'var(--primary)' : 'var(--bg-muted)',
                          color: selectedTabCategory === 'lab' ? 'white' : 'var(--text-muted)',
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        Labs & Imaging ({selectedPatient.labResults.length})
                      </span>
                      <span
                        className={`tab-item ${selectedTabCategory === 'certificates' ? 'active' : ''}`}
                        onClick={() => setSelectedTabCategory('certificates')}
                        style={{
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          background: selectedTabCategory === 'certificates' ? 'var(--primary)' : 'var(--bg-muted)',
                          color: selectedTabCategory === 'certificates' ? 'white' : 'var(--text-muted)',
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        Certificates & Follow-up
                      </span>
                    </div>

                    {(selectedTabCategory === 'all' || !['soap', 'prescriptions', 'lab', 'certificates'].includes(selectedTabCategory)) && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Active conditions */}
                        <div>
                          <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Active Diagnoses & Conditions</h3>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {selectedPatient.medicalHistory.map((m, idx) => (
                              <span key={idx} className="badge badge-warning" style={{ gap: '4px' }}>
                                <AlertCircle size={10} />
                                <span>{m.condition} (Diag: {m.diagnosedDate})</span>
                              </span>
                            ))}
                            {selectedPatient.medicalHistory.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>No active conditions.</span>}
                          </div>
                        </div>

                        {/* Visit timeline */}
                        <div>
                          <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Clinical Patient Timeline (Single-Screen Records)</h3>
                          <div className="timeline">
                            {/* Surgeries / History */}
                            <div className="timeline-item danger">
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>CABG Bypass Surgery (Cardiothoracic Dept)</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                2025-11-12 | Surgeon: Dr. R. K. Sharma | Apollo Cardiac
                              </div>
                              <p style={{ fontSize: '12px', marginTop: '6px', color: 'var(--text-muted)' }}>Triple vessel disease. Successful coronary artery bypass graft. Follow up cardiology recommended.</p>
                            </div>

                            {/* Previous Visits */}
                            {selectedPatient.visits.map(v => (
                              <div key={v.id} className="timeline-item info">
                                <div style={{ fontSize: '12px', fontWeight: 600 }}>Visit: {v.reason} ({v.doctor})</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                  {v.date} | Department: {v.department}
                                </div>
                                <p style={{ fontSize: '12px', marginTop: '6px', color: 'var(--text-muted)' }}>{v.notes}</p>
                              </div>
                            ))}

                            {/* Lab Reports */}
                            <div className="timeline-item success">
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>Lab Investigation: Comprehensive Lipid & Diabetes Panel</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                2026-08-01 | Lab: Metro Diagnostics | Status: Verified
                              </div>
                              <div style={{ fontSize: '11px', marginTop: '6px', color: 'var(--text-muted)', background: 'var(--bg-muted)', padding: '8px', borderRadius: '4px' }}>
                                <div>• Total Cholesterol: <strong>240 mg/dL</strong> <span style={{ color: 'var(--danger)' }}>[HIGH]</span></div>
                                <div>• HbA1c Level: <strong>7.2%</strong> <span style={{ color: 'var(--danger)' }}>[ELEVATED]</span></div>
                              </div>
                            </div>

                            {/* Radiology Reports */}
                            <div className="timeline-item info">
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>Radiology: Chest X-Ray Bilateral (AP View)</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                2026-07-28 | Imaging Dept | Radiologist: Dr. Amit Sen
                              </div>
                              <p style={{ fontSize: '12px', marginTop: '6px', color: 'var(--text-muted)' }}>Lung fields are clear bilateral. Cardiac size is within normal limits. No active consolidation.</p>
                            </div>

                            {/* Past Prescriptions */}
                            <div className="timeline-item warning">
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>Active Prescriptions Summary</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                Chronic Medication Registry
                              </div>
                              <div style={{ fontSize: '11px', marginTop: '6px', color: 'var(--text-muted)' }}>
                                • Telmisartan 40mg OD (Hypertension) | • Metformin 500mg BD (Diabetes)
                              </div>
                            </div>

                            {/* Admissions */}
                            <div className="timeline-item warning">
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>IPD Admission: Acute Angina Observation</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                2026-02-10 to 2026-02-12 | Ward: ICU Bed 04 | Dr. Sandeep Mehta
                              </div>
                              <p style={{ fontSize: '12px', marginTop: '6px', color: 'var(--text-muted)' }}>Admitted with chest tightness. Cardiac enzymes troponin negative. Discharged stable on daily antianginal medication.</p>
                            </div>

                            {/* Today's Visit */}
                            <div className="timeline-item success">
                              <div style={{ fontSize: '12px', fontWeight: 600 }}>Today's OPD Consultation Created</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Vitals Checked. Awaiting prescription/lab directives.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedTabCategory === 'soap' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(37,99,235,0.05)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(37,99,235,0.2)' }}>
                          <div>
                            <span style={{ fontWeight: 600, fontSize: '13px' }}>AI EMR SOAP Dictation Copilot</span>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
                              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Template:</span>
                              <select className="form-input" style={{ width: '180px', height: '24px', fontSize: '11px', padding: '0 8px' }} value={selectedTemplate} onChange={(e) => {
                                setSelectedTemplate(e.target.value);
                                addToast('info', `Swapped to EMR consultation template: ${e.target.value}`);
                              }}>
                                <option value="Standard Adult Assessment">Standard Adult Assessment</option>
                                <option value="Pediatric Growth Chart Triage">Pediatric Growth Chart Triage</option>
                                <option value="Antenatal Obstetric Tracker">Antenatal Obstetric Tracker</option>
                              </select>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={startVoiceDictationSim}
                            disabled={doctorDictating}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <Mic size={14} />
                            <span>{doctorDictating ? 'Transcribing...' : 'Start Voice dictation'}</span>
                          </button>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Auto-fill Templates:</span>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '2px 6px', fontSize: '10px' }}
                              onClick={() => {
                                setSoapSubjective({
                                  chiefComplaint: "Diabetes Mellitus Check [DM]",
                                  hpi: "Patient presents with dry mouth, polyuria, and fatigue for 2 weeks. Fasting blood glucose recorded at 180 mg/dL.",
                                  medicalHistory: "Type 2 Diabetes Mellitus diagnosed in 2024.",
                                  familyHistory: "Father has history of Diabetic Nephropathy.",
                                  surgicalHistory: "None"
                                });
                                setSoapObjective(prev => ({
                                  ...prev,
                                  weight: 84,
                                  lifestyle: "Sedentary, high glycemic index dietary habits."
                                }));
                                setSoapAssessment({
                                  diagnosisCode: "Type 2 diabetes mellitus [E11]",
                                  differential: "Impaired glucose tolerance, secondary pancreatic diabetes"
                                });
                                setSoapPlan({
                                  treatment: "Start Metformin. Restrict daily carbohydrates to < 100g. Complete HbA1c lab checks.",
                                  referralSpecialist: "None"
                                });
                                const dmRx = {
                                  id: `RX-DM-${Date.now()}`,
                                  medication: 'Metformin (Generic: Glucophage)',
                                  dosage: '500mg',
                                  frequency: 'Twice Daily (BD)',
                                  duration: '30 days',
                                  instructions: 'Take with breakfast and dinner'
                                };
                                setPatients(prev => prev.map(p => p.id === selectedPatientId ? { ...p, prescriptions: [dmRx] } : p));
                                addToast('success', "DM template loaded: Diabetes EMR & Metformin prescription drafted!");
                              }}
                            >
                              DM (Diabetes)
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '2px 6px', fontSize: '10px' }}
                              onClick={() => {
                                setSoapSubjective({
                                  chiefComplaint: "Essential Hypertension Check [HTN]",
                                  hpi: "Routine follow-up of chronic hypertension. Reports occasional lightheadedness. No palpitations, chest pain, or dyspnea.",
                                  medicalHistory: "Essential Hypertension (3 years)",
                                  familyHistory: "Mother has history of Hypertension.",
                                  surgicalHistory: "None"
                                });
                                setSoapObjective(prev => ({
                                  ...prev,
                                  lifestyle: "Moderate dietary sodium, moderate walks."
                                }));
                                setSoapAssessment({
                                  diagnosisCode: "Essential hypertension [I10]",
                                  differential: "White coat hypertension, renovascular hypertension"
                                });
                                setSoapPlan({
                                  treatment: "Continue low sodium diet. Check BP twice weekly. Follow up in 1 month.",
                                  referralSpecialist: "None"
                                });
                                const htnRx = {
                                  id: `RX-HTN-${Date.now()}`,
                                  medication: 'Amlodipine (Generic: Norvasc)',
                                  dosage: '5mg',
                                  frequency: 'Once Daily (OD)',
                                  duration: '30 days',
                                  instructions: 'Take in morning after food'
                                };
                                setPatients(prev => prev.map(p => p.id === selectedPatientId ? { ...p, prescriptions: [htnRx] } : p));
                                addToast('success', "HTN template loaded: Hypertension EMR & Amlodipine prescription drafted!");
                              }}
                            >
                              HTN (Hypertension)
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '2px 6px', fontSize: '10px' }}
                              onClick={() => {
                                setSoapSubjective({
                                  chiefComplaint: "Chronic Bronchitis / COPD Flare",
                                  hpi: "Patient presents with productive cough, dyspnea on exertion, and wheezing. Symptoms worsened over the past 3 days after dust exposure.",
                                  medicalHistory: "COPD Stage II diagnosed in 2023.",
                                  familyHistory: "Uncle had chronic asthma.",
                                  surgicalHistory: "None"
                                });
                                setSoapAssessment({
                                  diagnosisCode: "Chronic obstructive pulmonary disease [J44]",
                                  differential: "Acute bronchitis, cardiac asthma"
                                });
                                setSoapPlan({
                                  treatment: "Advised inhaled bronchodilators. Complete chest X-ray and pulse oximetry check.",
                                  referralSpecialist: "None"
                                });
                                addToast('success', "COPD template loaded: COPD EMR elements drafted!");
                              }}
                            >
                              COPD (Pulmonary)
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '2px 6px', fontSize: '10px', color: 'var(--primary)', borderColor: 'var(--primary)' }}
                              onClick={() => addToast('info', "Doctor personal templates: Custom templates can be saved from Settings > EMR Configuration.")}
                            >
                              + Personal Favs
                            </button>
                          </div>

                        {/* Subjective */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h4 style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, marginBottom: '10px' }}>Subjective (Patient Narrative & History)</h4>
                          <div className="grid grid-2" style={{ gap: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Chief Complaint</label>
                              <input
                                type="text"
                                className="form-input"
                                value={soapSubjective.chiefComplaint}
                                onChange={(e) => setSoapSubjective({ ...soapSubjective, chiefComplaint: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">History of Present Illness (HPI)</label>
                              <textarea
                                className="form-input"
                                rows={2}
                                value={soapSubjective.hpi}
                                onChange={(e) => setSoapSubjective({ ...soapSubjective, hpi: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="grid grid-3" style={{ gap: '12px', marginTop: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Past Medical History</label>
                              <input
                                type="text"
                                className="form-input"
                                value={soapSubjective.medicalHistory}
                                onChange={(e) => setSoapSubjective({ ...soapSubjective, medicalHistory: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Family History</label>
                              <input
                                type="text"
                                className="form-input"
                                value={soapSubjective.familyHistory}
                                onChange={(e) => setSoapSubjective({ ...soapSubjective, familyHistory: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Surgical History</label>
                              <input
                                type="text"
                                className="form-input"
                                value={soapSubjective.surgicalHistory}
                                onChange={(e) => setSoapSubjective({ ...soapSubjective, surgicalHistory: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Objective */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h4 style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, marginBottom: '10px' }}>Objective (Physical Assessment & Vital metrics)</h4>
                          <div className="grid grid-3" style={{ gap: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Height (cm)</label>
                              <input
                                type="number"
                                className="form-input"
                                value={soapObjective.height}
                                onChange={(e) => setSoapObjective({ ...soapObjective, height: parseInt(e.target.value) || 0 })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Weight (kg)</label>
                              <input
                                type="number"
                                className="form-input"
                                value={soapObjective.weight}
                                onChange={(e) => setSoapObjective({ ...soapObjective, weight: parseInt(e.target.value) || 0 })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Dynamic BMI Score</label>
                              <div style={{ height: '36px', display: 'flex', alignItems: 'center', padding: '0 12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)', fontWeight: 700, color: 'var(--primary)' }}>
                                {(() => {
                                  const h = soapObjective.height / 100;
                                  const w = soapObjective.weight;
                                  if (h <= 0) return '0.0';
                                  const bmi = (w / (h * h)).toFixed(1);
                                  let status = 'Normal';
                                  if (parseFloat(bmi) >= 30) status = 'Obese';
                                  else if (parseFloat(bmi) >= 25) status = 'Overweight';
                                  else if (parseFloat(bmi) < 18.5) status = 'Underweight';
                                  return `${bmi} (${status})`;
                                })()}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-2" style={{ gap: '12px', marginTop: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Pain Score Scale</span>
                                <strong>{soapObjective.painScale} / 10</strong>
                              </label>
                              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>None</span>
                                <input
                                  type="range"
                                  min="0"
                                  max="10"
                                  className="form-input"
                                  style={{ padding: 0, height: 'auto', flexGrow: 1 }}
                                  value={soapObjective.painScale}
                                  onChange={(e) => setSoapObjective({ ...soapObjective, painScale: parseInt(e.target.value) })}
                                />
                                <span style={{ fontSize: '11px', color: 'var(--danger)' }}>Severe</span>
                              </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Lifestyle Risk Factors</label>
                              <input
                                type="text"
                                className="form-input"
                                value={soapObjective.lifestyle}
                                onChange={(e) => setSoapObjective({ ...soapObjective, lifestyle: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
                            <label className="form-label">Mental Health Screening (PHQ-9)</label>
                            <select
                              className="form-input"
                              value={soapObjective.mentalHealth}
                              onChange={(e) => setSoapObjective({ ...soapObjective, mentalHealth: e.target.value })}
                            >
                              <option>PHQ-9 Score: 3 (Minimal/None)</option>
                              <option>PHQ-9 Score: 5 (Mild depressive indicators)</option>
                              <option>PHQ-9 Score: 11 (Moderate clinical depression)</option>
                              <option>PHQ-9 Score: 18 (Moderately severe depression)</option>
                              <option>PHQ-9 Score: 24 (Severe clinical depression)</option>
                            </select>
                          </div>
                        </div>

                        {/* Assessment */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h4 style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, marginBottom: '10px' }}>Assessment (Diagnosis & Clinical Decisions)</h4>
                          <div className="form-group">
                            <label className="form-label">ICD-10 / ICD-11 Diagnosis Codes</label>
                            <select
                              className="form-input"
                              value={soapAssessment.diagnosisCode}
                              onChange={(e) => setSoapAssessment({ ...soapAssessment, diagnosisCode: e.target.value })}
                            >
                              <option value="Essential hypertension [I10]">Essential hypertension [I10]</option>
                              <option value="Type 2 diabetes mellitus [E11]">Type 2 diabetes mellitus [E11]</option>
                              <option value="Angina pectoris, unspecified [I20.9]">Angina pectoris, unspecified [I20.9]</option>
                              <option value="Acute myocardial infarction [I21]">Acute myocardial infarction [I21]</option>
                              <option value="Chronic obstructive pulmonary disease [J44]">Chronic obstructive pulmonary disease [J44]</option>
                              <option value="Coronary artery disease, unspecified [I25.10]">Coronary artery disease, unspecified [I25.10]</option>
                            </select>
                          </div>
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Differential Diagnoses Suggestions</label>
                            <textarea
                              className="form-input"
                              rows={2}
                              value={soapAssessment.differential}
                              onChange={(e) => setSoapAssessment({ ...soapAssessment, differential: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* Plan */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h4 style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, marginBottom: '10px' }}>Plan (Action & Clinical Referrals)</h4>
                          <div className="form-group">
                            <label className="form-label">Treatment Plan & Patient Instructions</label>
                            <textarea
                              className="form-input"
                              rows={2}
                              value={soapPlan.treatment}
                              onChange={(e) => setSoapPlan({ ...soapPlan, treatment: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-2" style={{ gap: '12px', marginTop: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Clinical Progress Notes</label>
                              <textarea
                                className="form-input"
                                rows={2}
                                placeholder="Record today's patient evolution notes..."
                                defaultValue="Patient reports mild improvement in palpitations after baseline rest; ECG requested for verification."
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Chronic Disease Outcomes Tracking</label>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: '6px', padding: '8px', background: 'var(--bg-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>BP Control Status:</span> <strong style={{ color: 'var(--success)' }}>STABLE (135/85)</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>HbA1c Target Level:</span> <strong style={{ color: 'var(--success)' }}>IMPROVING (7.2% to 6.5%)</strong>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
                            <label className="form-label">Assigned Specialist Assignment (Internal/External Referral)</label>
                            <select
                              className="form-input"
                              value={soapPlan.referralSpecialist}
                              onChange={(e) => setSoapPlan({ ...soapPlan, referralSpecialist: e.target.value })}
                            >
                              <option value="None">None - Continue OPD management</option>
                              <option value="Cardiology (Internal)">Cardiology (Dr. Ananya Ray - Internal Referral)</option>
                              <option value="Endocrinology (External)">Endocrinology (External Partner Specialist)</option>
                              <option value="Nephrology (External)">Nephrology (External Partner Specialist)</option>
                            </select>
                          </div>
                        </div>

                        {/* Digitally Signed verified */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                          <input
                            type="checkbox"
                            checked={digitalSignatureChecked}
                            onChange={(e) => {
                              setDigitalSignatureChecked(e.target.checked);
                              if (e.target.checked) addToast('success', "Doctor digital signature verified & stamped to EMR record.");
                            }}
                          />
                          <span style={{ fontSize: '12px' }}>
                            <strong>Digitally Sign EMR Record</strong> (Verified Stamp: Dr. Sandeep Mehta, MMC Reg No: 99402)
                          </span>
                        </div>

                        <button type="button" className="btn btn-primary" onClick={() => addToast('success', 'EMR SOAP details saved successfully to clinical archive!')} style={{ alignSelf: 'flex-end' }}>
                          Save Clinical Assessment
                        </button>
                      </div>
                    )}

                    {selectedTabCategory === 'prescriptions' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Prescription builder tools */}
                        <div className="flex justify-between align-center" style={{ flexWrap: 'wrap', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Advice Templates:</span>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {DISEASE_ADVICE_TEMPLATES.map((t, idx) => (
                                <button key={idx} type="button" className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => applyAdviceTemplate(t.name)}>
                                  {t.name.split(' ')[0]}
                                </button>
                              ))}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '4px 10px', fontSize: '11px', color: 'var(--primary)', borderColor: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}
                            onClick={() => {
                              const previousMeds = [
                                { id: 'RX-PREV-1', medication: 'Atorvastatin (Generic: Lipitor)', dosage: '20mg', frequency: 'Once Daily (OD)', duration: '30 days', instructions: 'Take at bedtime' },
                                { id: 'RX-PREV-2', medication: 'Amlodipine (Generic: Norvasc)', dosage: '5mg', frequency: 'Once Daily (OD)', duration: '30 days', instructions: 'Take in morning' }
                              ];
                              setPatients(prev => prev.map(p => p.id === selectedPatientId ? { ...p, prescriptions: [...p.prescriptions, ...previousMeds] } : p));
                              addToast('success', "Loaded and repeated previous prescription medications successfully.");
                            }}
                          >
                            <span>🔄 Repeat Previous Prescription (Repeat Rx)</span>
                          </button>
                        </div>

                        {/* Consultation notes text-area */}
                        <div className="form-group">
                          <label className="form-label">Doctor Consultation Notes & Advice Summary</label>
                          <textarea
                            rows={3}
                            placeholder="Add diagnosis details, symptoms, patient instructions..."
                            className="form-input"
                            value={consultationNotes}
                            onChange={(e) => setConsultationNotes(e.target.value)}
                          />
                        </div>

                        {/* Rx Table list */}
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Medication</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Dosage</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Frequency</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Duration</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Instructions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedPatient.prescriptions.map(p => (
                              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '8px 0', fontWeight: 600 }}>{p.medication}</td>
                                <td style={{ padding: '8px 0' }}>{p.dosage}</td>
                                <td style={{ padding: '8px 0' }}>{p.frequency}</td>
                                <td style={{ padding: '8px 0' }}>{p.duration}</td>
                                <td style={{ padding: '8px 0', color: 'var(--text-muted)' }}>{p.instructions}</td>
                              </tr>
                            ))}
                            {selectedPatient.prescriptions.length === 0 && (
                              <tr>
                                <td colSpan={5} style={{ padding: '16px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                                  No medication active. Use builder below to prescribe.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        {/* Favorite / Frequently Prescribed Medicines */}
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', backgroundColor: 'var(--bg-muted)', padding: '10px 16px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>⭐ Favorite Meds:</span>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 6px', fontSize: '10px' }}
                            onClick={() => setNewMed({ medication: 'Metformin (Generic: Glucophage)', dosage: '500mg', frequency: 'Twice Daily (BD)', duration: '30 days', instructions: 'Take with breakfast and dinner' })}
                          >
                            Metformin
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 6px', fontSize: '10px' }}
                            onClick={() => setNewMed({ medication: 'Atorvastatin (Generic: Lipitor)', dosage: '20mg', frequency: 'Once Daily (OD)', duration: '30 days', instructions: 'Take at bedtime' })}
                          >
                            Atorvastatin
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 6px', fontSize: '10px' }}
                            onClick={() => setNewMed({ medication: 'Amlodipine (Generic: Norvasc)', dosage: '5mg', frequency: 'Once Daily (OD)', duration: '30 days', instructions: 'Take in morning' })}
                          >
                            Amlodipine
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 6px', fontSize: '10px' }}
                            onClick={() => setNewMed({ medication: 'Aspirin (Generic: Ecotrin)', dosage: '75mg', frequency: 'Once Daily (OD)', duration: '30 days', instructions: 'Take after lunch' })}
                          >
                            Aspirin
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '2px 6px', fontSize: '10px' }}
                            onClick={() => setNewMed({ medication: 'Paracetamol (Generic: Calpol)', dosage: '650mg', frequency: 'As Needed (PRN)', duration: '5 days', instructions: 'Take for fever / pain' })}
                          >
                            Paracetamol
                          </button>
                        </div>

                        {/* Prescription builder form */}
                        <form onSubmit={handleAddMedication} style={{ backgroundColor: 'var(--bg-muted)', padding: '16px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '12px', fontWeight: 600 }}>Prescription Rx Builder (with drug-interaction checks)</h3>
                            <span style={{ fontSize: '10px', color: 'var(--success)' }}>✨ Auto-complete & Generic alternatives enabled</span>
                          </div>
                          <div className="grid grid-3" style={{ gap: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Medication Name</label>
                              <input
                                type="text"
                                placeholder="Aspirin, Atorvastatin, Lisinopril..."
                                className="form-input"
                                style={{ height: '32px' }}
                                value={newMed.medication}
                                onChange={(e) => setNewMed({ ...newMed, medication: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Dosage</label>
                              <input
                                type="text"
                                placeholder="e.g. 500mg, 1 cap"
                                className="form-input"
                                style={{ height: '32px' }}
                                value={newMed.dosage}
                                onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Frequency</label>
                              <select
                                className="form-input"
                                style={{ height: '32px' }}
                                value={newMed.frequency}
                                onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                              >
                                <option value="Once Daily (OD)">Once Daily (OD)</option>
                                <option value="Twice Daily (BD)">Twice Daily (BD)</option>
                                <option value="Thrice Daily (TD)">Thrice Daily (TD)</option>
                                <option value="As Needed (PRN)">As Needed (PRN)</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex gap-md">
                            <input
                              type="text"
                              placeholder="Duration (e.g. 5 days)"
                              className="form-input"
                              style={{ height: '32px', width: '150px' }}
                              value={newMed.duration}
                              onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
                            />
                            <input
                              type="text"
                              placeholder="Clinical Instructions (e.g. after food)"
                              className="form-input"
                              style={{ height: '32px', flexGrow: 1 }}
                              value={newMed.instructions}
                              onChange={(e) => setNewMed({ ...newMed, instructions: e.target.value })}
                            />
                            <button type="submit" className="btn btn-primary" style={{ height: '32px', padding: '0 16px' }}>
                              Add Rx
                            </button>
                          </div>
                        </form>

                        {/* Multi-language selector */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Print Translation Options:</span>
                          <select className="form-input" style={{ width: '150px', height: '28px', fontSize: '11px' }} value={rxLanguage} onChange={(e) => setRxLanguage(e.target.value)}>
                            <option value="English">English</option>
                            <option value="Hindi">Hindi / हिन्दी</option>
                            <option value="Telugu">Telugu / తెలుగు</option>
                            <option value="Spanish">Spanish / Español</option>
                          </select>
                        </div>

                        {/* Patient Education Widget */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Patient Education Advice:</span>
                          <button type="button" className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('success', "Diet Advice Sheet (English/Hindi) sent to patient's WhatsApp.")}>
                            🥗 Diet Plan PDF
                          </button>
                          <button type="button" className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('success', "Cardio Exercise Protocol shared via WhatsApp.")}>
                            🏃 Exercise Advice
                          </button>
                          <button type="button" className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('success', "Chronic disease guidelines sheet shared.")}>
                            📘 Disease Education
                          </button>
                        </div>

                        {/* Keyboard Shortcuts Cheat Sheet */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'var(--bg-muted)', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '10px', color: 'var(--text-muted)' }}>
                          <strong style={{ color: 'var(--primary)' }}>⌨️ Keyboard Shortcuts:</strong>
                          <span>[Alt + S] Save EMR</span> | <span>[Alt + D] AI Dictate</span> | <span>[Alt + R] Repeat Rx</span> | <span>[Alt + P] Print Prescription</span>
                        </div>
                      </div>
                    )}

                    {selectedTabCategory === 'lab' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Labs table list */}
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Test ID</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Test Name</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Source</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Referral Share</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Status</th>
                              <th style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Results / Reports</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedPatient.labResults.map(lab => (
                              <tr key={lab.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '8px 0', fontWeight: 600 }}>{lab.id}</td>
                                <td style={{ padding: '8px 0' }}>{lab.testName}</td>
                                <td style={{ padding: '8px 0' }}>
                                  <span className={`badge ${lab.outsourced ? 'badge-warning' : 'badge-primary'}`}>
                                    {lab.outsourced ? `Outsourced: ${lab.outsourcedLabName}` : 'Internal Lab'}
                                  </span>
                                </td>
                                <td>{lab.refDoctorShare ? `${lab.refDoctorShare}% split` : 'None'}</td>
                                <td style={{ padding: '8px 0' }}>
                                  <span className={`badge ${lab.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                                    {lab.status}
                                  </span>
                                </td>
                                <td style={{ padding: '8px 0' }}>
                                  {lab.status === 'completed' ? (
                                    <div style={{ fontSize: '11px' }}>
                                      <strong>{lab.resultValue}</strong> <span style={{ color: 'var(--text-muted)' }}>({lab.referenceRange})</span>
                                      <div style={{ color: 'var(--success)', fontSize: '10px', marginTop: '2px' }}>Verified by: {lab.verifiedBy}</div>
                                    </div>
                                  ) : (
                                    <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Waiting on Lab Tech upload</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                            {selectedPatient.labResults.length === 0 && (
                              <tr>
                                <td colSpan={6} style={{ padding: '16px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                                  No laboratory tests ordered today.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        {/* Lab request generator form */}
                        <form onSubmit={handleAddLabRequest} style={{ backgroundColor: 'var(--bg-muted)', padding: '16px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <h3 style={{ fontSize: '12px', fontWeight: 600 }}>Order New Laboratory / Radiology Investigation</h3>
                          <div className="grid grid-3" style={{ gap: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Test Name</label>
                              <input
                                type="text"
                                placeholder="e.g. Lipid Profile, Chest X-ray, HbA1c"
                                className="form-input"
                                style={{ height: '32px' }}
                                value={newOrder.testName}
                                onChange={(e) => setNewOrder({ ...newOrder, testName: e.target.value })}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Category</label>
                              <select
                                className="form-input"
                                style={{ height: '32px' }}
                                value={newOrder.category}
                                onChange={(e) => {
                                  const cat = e.target.value as any;
                                  setNewOrder({ ...newOrder, category: cat });
                                  if (cat === 'radiology') {
                                    setShowFormFDialog(true);
                                  }
                                }}
                              >
                                <option value="pathology">Pathology (Blood/Fluid)</option>
                                <option value="radiology">Radiology (PC-PNDT Form F Scan)</option>
                              </select>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Referral Share (Doctor Split %)</label>
                              <input
                                type="number"
                                placeholder="e.g. 15%"
                                className="form-input"
                                style={{ height: '32px' }}
                                value={newOrder.referralShare}
                                onChange={(e) => setNewOrder({ ...newOrder, referralShare: e.target.value })}
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-md align-center">
                            <label className="flex align-center gap-sm" style={{ fontSize: '12px', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={newOrder.outsourced}
                                onChange={(e) => setNewOrder({ ...newOrder, outsourced: e.target.checked })}
                              />
                              <span>Outsource this Sample</span>
                            </label>
                            {newOrder.outsourced && (
                              <input
                                type="text"
                                placeholder="Outsource Lab Name (e.g. Metropolis)"
                                className="form-input"
                                style={{ height: '32px', width: '220px' }}
                                value={newOrder.outsourceLab}
                                onChange={(e) => setNewOrder({ ...newOrder, outsourceLab: e.target.value })}
                              />
                            )}
                            <button type="submit" className="btn btn-primary" style={{ height: '32px', marginLeft: 'auto' }}>
                              Order Test
                            </button>
                          </div>

                          {/* Critical Lab Alert Section */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', marginTop: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--danger)', fontWeight: 'bold', fontSize: '11px' }}>
                              <AlertCircle size={14} />
                              <span>CRITICAL RESULT ALERTS REGISTERED</span>
                            </div>
                            <div style={{ fontSize: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <div>• <strong>Serum Potassium:</strong> 6.2 mEq/L (Normal Ref: 3.5 - 5.0) - <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>HIGH (Critical Alert!)</span></div>
                              <div>• <strong>Hemoglobin (Hgb):</strong> 7.8 g/dL (Normal Ref: 12.0 - 16.0) - <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>LOW (Severe Anemia warning!)</span></div>
                            </div>
                          </div>

                          {/* Clinical Attachments Section */}
                          <div style={{ marginTop: '12px', borderTop: '1px dashed var(--border)', paddingTop: '16px' }}>
                            <h3 style={{ fontSize: '12px', fontWeight: 600, marginBottom: '12px', color: 'var(--primary)' }}>Clinical Scan Attachments & Diagnostic Images</h3>
                            <div className="grid grid-3" style={{ gap: '12px' }}>
                              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', background: 'var(--bg-muted)' }}>
                                <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border)' }}>
                                  <FileText size={20} style={{ color: 'var(--text-muted)' }} />
                                </div>
                                <div style={{ padding: '6px', fontSize: '9px' }}>
                                  <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>chest_xray_bilateral.png</div>
                                  <div style={{ color: 'var(--text-muted)' }}>2.4 MB | PNG Scan</div>
                                </div>
                              </div>
                              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', background: 'var(--bg-muted)' }}>
                                <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border)' }}>
                                  <FileText size={20} style={{ color: 'var(--text-muted)' }} />
                                </div>
                                <div style={{ padding: '6px', fontSize: '9px' }}>
                                  <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>ecg_strip_leads.jpg</div>
                                  <div style={{ color: 'var(--text-muted)' }}>1.1 MB | ECG Strip</div>
                                </div>
                              </div>
                              {/* File upload simulator button */}
                              <div style={{ border: '1.5px dashed var(--border)', borderRadius: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px', cursor: 'pointer', textAlign: 'center' }} onClick={() => addToast('success', "Simulated diagnostic scan attachment upload successful! Loaded into patient's EMR folder.")}>
                                <Plus size={16} style={{ color: 'var(--primary)', marginBottom: '2px' }} />
                                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Add Scan File</span>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}

                    {selectedTabCategory === 'certificates' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Certificates generator card */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>Clinical Certificate & Document Issuer</h3>
                          <div className="grid grid-2" style={{ gap: '12px' }}>
                            <div className="form-group">
                              <label className="form-label">Certificate Type</label>
                              <select className="form-input" style={{ height: '32px' }}>
                                <option>Sick Leave Medical Certificate</option>
                                <option>Physical Fitness for Employment Certificate</option>
                                <option>Return-to-Work Fit Certificate</option>
                                <option>Vaccination / Immunization Record</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label className="form-label">Medical Leave Duration</label>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <input type="date" className="form-input" style={{ height: '32px' }} defaultValue="2026-08-08" />
                                <input type="date" className="form-input" style={{ height: '32px' }} defaultValue="2026-08-11" />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Diagnostic Remarks</label>
                            <input type="text" className="form-input" defaultValue="Advised physical rest for 3 days due to acute fatigue and vital distress." />
                          </div>
                          <div className="flex gap-md justify-between align-center" style={{ marginTop: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                              <Shield size={14} style={{ color: 'var(--success)' }} />
                              <span>Stamps digital signature & secure verification QR card.</span>
                            </div>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => addToast('success', "Custom medical certificate issued & printed. Verification QR code stamped on header.")}
                            >
                              Issue & Download PDF
                            </button>
                          </div>
                        </div>

                        {/* Follow-up scheduler */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>Follow-Up Scheduling & SMS Reminders</h3>
                          <div className="grid grid-3" style={{ gap: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Follow-up Target Date</span>
                                <span style={{ fontSize: '10px', color: 'var(--primary)' }}>Quick Set:</span>
                              </label>
                              <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
                                <button type="button" className="btn btn-secondary" style={{ padding: '2px 4px', fontSize: '9px', flexGrow: 1 }} onClick={() => setFollowupDate('2026-08-11')}>3 Days</button>
                                <button type="button" className="btn btn-secondary" style={{ padding: '2px 4px', fontSize: '9px', flexGrow: 1 }} onClick={() => setFollowupDate('2026-08-15')}>7 Days</button>
                                <button type="button" className="btn btn-secondary" style={{ padding: '2px 4px', fontSize: '9px', flexGrow: 1 }} onClick={() => setFollowupDate('2026-08-23')}>15 Days</button>
                                <button type="button" className="btn btn-secondary" style={{ padding: '2px 4px', fontSize: '9px', flexGrow: 1 }} onClick={() => setFollowupDate('2026-09-08')}>1 Month</button>
                              </div>
                              <input
                                type="date"
                                className="form-input"
                                value={followupDate}
                                onChange={(e) => setFollowupDate(e.target.value)}
                              />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Reminder Channel</label>
                              <select
                                className="form-input"
                                value={followupChannel}
                                onChange={(e) => setFollowupChannel(e.target.value)}
                              >
                                <option value="WhatsApp">WhatsApp Message</option>
                                <option value="SMS">Direct SMS Alert</option>
                                <option value="Email">Email Digest</option>
                              </select>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <label className="flex align-center gap-sm" style={{ cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                                <input
                                  type="checkbox"
                                  checked={followupRecurring}
                                  onChange={(e) => setFollowupRecurring(e.target.checked)}
                                />
                                <span>Recurring Chronic Care Follow-up</span>
                              </label>
                            </div>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Outcome metrics tracked automatically under chronic disease metrics.</span>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => addToast('success', `Scheduled follow-up on ${followupDate} via ${followupChannel} successfully.`)}
                            >
                              Schedule Follow-up
                            </button>
                          </div>
                        </div>

                        {/* Missed / Overdue Follow-ups card */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--danger)', marginBottom: '8px' }}>Missed / Overdue Chronic Care Follow-ups</h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                              <span>• Hypertension Control Check (Scheduled: 2026-07-25)</span>
                              <span style={{ color: 'var(--danger)', fontWeight: 600 }}>OVERDUE (14 days)</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>• Lipid Panel Diagnostic Review (Scheduled: 2026-08-01)</span>
                              <span style={{ color: 'var(--danger)', fontWeight: 600 }}>OVERDUE (7 days)</span>
                            </div>
                          </div>
                        </div>

                        {/* Referral Management */}
                        <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>Clinical Referral Builder (Internal & External Specialists)</h3>
                          <div className="grid grid-3" style={{ gap: '12px' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Internal Referral (Doctor)</label>
                              <select className="form-input" style={{ height: '32px' }}>
                                <option value="">-- Choose Doctor --</option>
                                <option value="Dr. Ananya Ray">Dr. Ananya Ray (Cardiology)</option>
                                <option value="Dr. Deepa Roy">Dr. Deepa Roy (Internal Medicine)</option>
                                <option value="Dr. Sanjay Sen">Dr. Sanjay Sen (Pediatric)</option>
                              </select>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">External Specialist (Hospitals)</label>
                              <select className="form-input" style={{ height: '32px' }}>
                                <option value="">-- Choose Hospital Partner --</option>
                                <option value="Apollo Hospitals">Apollo Cardiac Specialist Center</option>
                                <option value="Fortis Healthcare">Fortis Nephrology & Dialysis</option>
                                <option value="Max Super Specialty">Max Endocrinology Unit</option>
                              </select>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label">Referral Type & Urgency</label>
                              <select className="form-input" style={{ height: '32px' }}>
                                <option>Routine Consultation</option>
                                <option>Urgent Angiography Evaluation</option>
                                <option>Emergency Admission Referral</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group" style={{ marginTop: '10px' }}>
                            <label className="form-label">Clinical Referral Notes & Diagnosis Summary</label>
                            <input type="text" className="form-input" placeholder="e.g. Patient presents with unstable angina symptoms, requires immediate coronary evaluation." />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Referrals are encrypted and transmitted via secure FHIR protocols.</span>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => addToast('success', "Referral letter generated and transmitted to partner specialist successfully.")}
                            >
                              Generate Referral Letter
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {showAiPanel && (
                <div className="workspace-panel ai-sidepanel">
                  <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={16} style={{ color: 'var(--primary)' }} />
                      <h3 style={{ fontWeight: 600 }}>Clinical AI Co-pilot</h3>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary btn-icon"
                      style={{ padding: '2px', height: '24px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      title="Hide AI panel"
                      onClick={() => setShowAiPanel(false)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                <div className="workspace-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flexGrow: 1, minHeight: 0 }}>
                  {/* Section toggler */}
                  <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                    <button
                      onClick={() => setAiAnalysisType('summary')}
                      style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', background: aiAnalysisType === 'summary' ? 'var(--primary)' : 'transparent', color: aiAnalysisType === 'summary' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}
                    >
                      Summary
                    </button>
                    <button
                      onClick={() => setAiAnalysisType('prediction')}
                      style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: aiAnalysisType === 'prediction' ? 'var(--primary)' : 'transparent', color: aiAnalysisType === 'prediction' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}
                    >
                      Predictive
                    </button>
                    <button
                      onClick={() => setAiAnalysisType('diet')}
                      style={{ flexGrow: 1, padding: '6px', fontSize: '11px', fontWeight: 600, border: 'none', background: aiAnalysisType === 'diet' ? 'var(--primary)' : 'transparent', color: aiAnalysisType === 'diet' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}
                    >
                      Diet
                    </button>
                  </div>

                  {/* AI Content output panels */}
                  {aiAnalysisType === 'summary' && (
                    <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="ai-helper-badge">AI Clinical Summary</div>
                      <p style={{ color: 'var(--text-muted)', lineHeight: '1.45' }}>
                        Patient is a {selectedPatient.age} year old {selectedPatient.gender.toLowerCase()} presenting with a history of {selectedPatient.medicalHistory.map(m => m.condition).join(', ') || "no chronic conditions"}.
                        Allergies include <strong>{selectedPatient.allergies.map(a => a.substance).join(', ') || "none recorded"}</strong>.
                        Current vitals show heart rate of {selectedPatient.vitals.heartRate} bpm and BP {selectedPatient.vitals.bloodPressure}.
                      </p>
                      <div style={{ backgroundColor: 'var(--bg-muted)', padding: '10px', borderRadius: '4px', borderLeft: '3px solid var(--primary)' }}>
                        <strong>AI Clinical Suggestions:</strong>
                        <ul style={{ paddingLeft: '16px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-muted)' }}>
                          <li>Verify medication reconciliation for antihypertensive medicines.</li>
                          <li>Avoid cephalosporin group if penicillin hypersensitivity was severe.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {aiAnalysisType === 'prediction' && (
                    <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="ai-helper-badge">AI Predictive Pathology Risk</div>
                      {computedPredictions.map((c, idx) => (
                        <div key={idx} style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                          <div className="flex justify-between font-semibold">
                            <span>{c.disease}</span>
                            <span className={c.level === 'high' ? 'badge badge-danger' : c.level === 'medium' ? 'badge badge-warning' : 'badge badge-success'}>
                              {c.probability}% Risk
                            </span>
                          </div>
                          <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>{c.rationale}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {aiAnalysisType === 'diet' && (
                    <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="ai-helper-badge">AI Disease-specific Nutrition Plan</div>
                      <div style={{ backgroundColor: 'rgba(22, 163, 74, 0.05)', padding: '12px', border: '1px solid rgba(22, 163, 74, 0.2)', borderRadius: '6px' }}>
                        <strong>Therapeutic Diet Directives:</strong>
                        <ul style={{ paddingLeft: '16px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text-muted)' }}>
                          <li><strong>DASH Diet Principles:</strong> Restrict sodium intake to &lt; 1,500mg/day to control hypertension.</li>
                          <li><strong>Glycemic Index Control:</strong> Emphasize complex carbohydrates (oats, brown rice) and high fiber.</li>
                          <li><strong>Cardioprotective Nutrition:</strong> Enrich omega-3 fatty acids, raw nuts, and olive oil.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* AI chatbot interface */}
                  <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', height: '180px' }}>
                    <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px', fontSize: '11px' }}>
                      {aiAssistantChat.map((chat, idx) => (
                        <div key={idx} style={{ alignSelf: chat.sender === 'ai' ? 'flex-start' : 'flex-end', backgroundColor: chat.sender === 'ai' ? 'var(--bg-muted)' : 'var(--primary)', color: chat.sender === 'ai' ? 'var(--text-main)' : 'white', padding: '8px 12px', borderRadius: '8px', maxWidth: '85%' }}>
                          {chat.text}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-sm" style={{ marginTop: '8px' }}>
                      <input
                        type="text"
                        placeholder="Ask AI assistant..."
                        className="form-input"
                        style={{ height: '30px', fontSize: '11px' }}
                        value={aiAssistantQuery}
                        onChange={(e) => setAiAssistantQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendAIChat()}
                      />
                      <button className="btn btn-primary" style={{ padding: '0 8px', height: '30px' }} onClick={handleSendAIChat}>
                        <Send size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          )}

          {/* ==========================================
              TAB: TELEMEDICINE VIRTUAL CONSULTATION (Live Video Module)
              ========================================== */}
          {activeTab === 'telemedicine' && (
            <div className="grid gap-lg" style={{ gridTemplateColumns: '2fr 1.2fr' }}>
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '480px' }}>
                <div className="card-header">
                  <div>
                    <h2>Live Virtual Telemedicine Session</h2>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Secure HIPAA & Telemedicine Guidelines Practice compliant session.</div>
                  </div>
                  <span className={telemedActive ? "badge badge-success" : "badge badge-muted"}>
                    {telemedActive ? "Connected" : "Disconnected"}
                  </span>
                </div>

                {/* Video call feed simulator */}
                <div style={{ flexGrow: 1, backgroundColor: '#000', borderRadius: '8px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '320px' }}>
                  {telemedActive ? (
                    <>
                      {/* Patient stream simulation */}
                      {!isVideoOff ? (
                        <div style={{ textAlign: 'center', color: '#FFF' }}>
                          <Video size={48} style={{ color: 'var(--primary)', marginBottom: '12px' }} />
                          <div><strong>Patient Stream: {selectedPatient.name}</strong></div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Resolution: 1080p | Latency: 22ms</div>
                        </div>
                      ) : (
                        <div style={{ color: 'rgba(255,255,255,0.4)' }}>Patient Camera Disabled</div>
                      )}

                      {/* Doctor PIP stream */}
                      <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '120px', height: '80px', backgroundColor: '#1E293B', border: '2px solid white', borderRadius: '4px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '9px' }}>
                        {isMuted ? "Dr. Mehta (Muted)" : "Dr. Mehta (Live)"}
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
                      <Video size={36} style={{ margin: '0 auto 12px' }} />
                      <div>Awaiting Patient Connection...</div>
                      <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => setTelemedActive(true)}>
                        Start Virtual Call Session
                      </button>
                    </div>
                  )}
                </div>

                {/* Video controls */}
                <div className="flex justify-between align-center" style={{ backgroundColor: 'var(--bg-muted)', padding: '12px', borderRadius: '6px' }}>
                  <div className="flex gap-sm">
                    <button className="btn btn-secondary" onClick={() => setIsMuted(!isMuted)}>
                      {isMuted ? "Unmute Mic" : "Mute Mic"}
                    </button>
                    <button className="btn btn-secondary" onClick={() => setIsVideoOff(!isVideoOff)}>
                      {isVideoOff ? "Start Video" : "Stop Video"}
                    </button>
                  </div>
                  <button className="btn btn-danger" onClick={() => setTelemedActive(false)}>
                    Terminate Consultation Call
                  </button>
                </div>
              </div>

              {/* Side panel: Telemed guidelines & E-Rx checklist */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontWeight: 600 }}>Telemedicine Practice Guidelines Checklist</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
                  <label className="flex align-center gap-sm">
                    <input type="checkbox" defaultChecked />
                    <span>Confirm patient identity and age records.</span>
                  </label>
                  <label className="flex align-center gap-sm">
                    <input type="checkbox" defaultChecked />
                    <span>Obtained explicit digital consent for virtual consultation.</span>
                  </label>
                  <label className="flex align-center gap-sm">
                    <input type="checkbox" defaultChecked />
                    <span>Review chronic illness records and medication history.</span>
                  </label>
                  <label className="flex align-center gap-sm">
                    <input type="checkbox" />
                    <span>Document chief complaints and symptom timeline.</span>
                  </label>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: 'auto' }}>
                  <strong>Quick Actions:</strong>
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={() => setActiveTab('consultation')}>
                    Open Prescription Builder
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB: WARDS & IPD MATRIX (ICU Map)
              ========================================== */}
          {activeTab === 'wards' && (
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
        )}

          {/* ==========================================
              TAB: SPECIALTY ICU COMMAND CENTER (4.5 ICU Management)
              ========================================== */}
          {activeTab === 'icu' && (
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
          )}

          {/* ==========================================
              TAB: 4.6 OT MANAGEMENT (Enterprise SaaS Suite)
              ========================================== */}
          {activeTab === 'ot' && (
            <div className="flex flex-col gap-lg">
              {/* Header Banner */}
              <div className="card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(37, 99, 235, 0.05) 100%)', borderLeft: '4px solid var(--success)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>✂️ OT Management (Enterprise SaaS)</span>
                      <span className="badge badge-success">⭐ 13 Enterprise Pillars</span>
                    </h2>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Digital OT Whiteboard • Scheduling • Pre-Op & PAC • Intra-op Anesthesia • PACU Recovery • Billing & Implants • AI Optimization
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button type="button" className="btn btn-secondary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowWhoChecklistModal(true)}>
                      📋 WHO Safety Checklist
                    </button>
                    <button type="button" className="btn btn-secondary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowOtTeamModal(true)}>
                      👥 Assign Team
                    </button>
                    <button type="button" className="btn btn-secondary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowImplantModal(true)}>
                      🔩 Implant Tracking
                    </button>
                    <button type="button" className="btn btn-primary" style={{ fontSize: '11px', padding: '6px 12px' }} onClick={() => setShowOtBookingModal(true)}>
                      📅 Reserve OT Suite
                    </button>
                  </div>
                </div>

                {/* OT Quick Metrics Bar */}
                <div className="grid grid-4" style={{ gap: '10px', marginTop: '14px' }}>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Scheduled Surgeries Today</span>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary)' }}>{otSurgeries.length} Cases</div>
                  </div>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Active In-Procedure</span>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--danger)' }}>{otSurgeries.filter(s => s.phase === 'In-Procedure').length} Active</div>
                  </div>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PAC Clearances</span>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--success)' }}>{otSurgeries.filter(s => s.pacStatus.includes('Cleared')).length} Cleared</div>
                  </div>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-card)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Sterile OT Suites</span>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--success)' }}>4 / 4 Autoclaved</div>
                  </div>
                </div>

                {/* 7 Enterprise Sub-tabs Navigation */}
                <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', marginTop: '14px', flexWrap: 'wrap' }}>
                  <button onClick={() => setOtSubTab('whiteboard')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', background: otSubTab === 'whiteboard' ? 'var(--primary)' : 'transparent', color: otSubTab === 'whiteboard' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🖥️ Digital Whiteboard
                  </button>
                  <button onClick={() => setOtSubTab('schedule')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: otSubTab === 'schedule' ? 'var(--primary)' : 'transparent', color: otSubTab === 'schedule' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    📅 Scheduling & Slots
                  </button>
                  <button onClick={() => setOtSubTab('preop_team')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: otSubTab === 'preop_team' ? 'var(--primary)' : 'transparent', color: otSubTab === 'preop_team' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    👥 Pre-Op & Teams
                  </button>
                  <button onClick={() => setOtSubTab('intraop_anesthesia')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: otSubTab === 'intraop_anesthesia' ? 'var(--primary)' : 'transparent', color: otSubTab === 'intraop_anesthesia' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🩸 Operative & Anesthesia
                  </button>
                  <button onClick={() => setOtSubTab('postop_pacu')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: otSubTab === 'postop_pacu' ? 'var(--primary)' : 'transparent', color: otSubTab === 'postop_pacu' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🏥 Recovery (PACU)
                  </button>
                  <button onClick={() => setOtSubTab('billing_resources')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', borderRight: '1px solid var(--border)', background: otSubTab === 'billing_resources' ? 'var(--primary)' : 'transparent', color: otSubTab === 'billing_resources' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    💳 Billing & Implants
                  </button>
                  <button onClick={() => setOtSubTab('analytics_ai')} style={{ flexGrow: 1, padding: '8px', fontSize: '11px', fontWeight: 600, border: 'none', background: otSubTab === 'analytics_ai' ? 'var(--primary)' : 'transparent', color: otSubTab === 'analytics_ai' ? 'white' : 'var(--text-main)', cursor: 'pointer' }}>
                    🤖 Analytics & AI
                  </button>
                </div>
              </div>

              {/* SUB-TAB 1: DIGITAL OT WHITEBOARD & VISUAL TIMELINE */}
              {otSubTab === 'whiteboard' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Live OT Whiteboard Grid */}
                  <div className="grid grid-2" style={{ gap: '16px' }}>
                    {otSurgeries.map((surg) => (
                      <div key={surg.id} className="card" style={{ borderLeft: `4px solid ${surg.phase === 'In-Procedure' ? 'var(--danger)' : surg.phase === 'Preparing' ? 'var(--warning)' : surg.phase === 'Recovery' ? 'var(--primary)' : 'var(--success)'}`, padding: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                          <div>
                            <strong style={{ fontSize: '13px' }}>{surg.otRoom}</strong>
                            <div style={{ fontSize: '11px', color: 'var(--text-main)', fontWeight: 600 }}>{surg.patientName} ({surg.patientId})</div>
                          </div>
                          <span className={`badge ${surg.phase === 'In-Procedure' ? 'badge-danger' : surg.phase === 'Preparing' ? 'badge-warning' : surg.phase === 'Recovery' ? 'badge-primary' : 'badge-success'}`}>
                            {surg.phase === 'In-Procedure' ? '🔴 In-Procedure' : surg.phase === 'Preparing' ? '🟡 Preparing' : surg.phase === 'Recovery' ? '🔵 Recovery (PACU)' : '✅ Completed'}
                          </span>
                        </div>

                        {/* Visual Surgery Phase Timeline Bar */}
                        <div style={{ margin: '12px 0' }}>
                          <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Visual Surgery Progression Timeline</span>
                          <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                            <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'var(--success)' }} title="Scheduled" />
                            <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: surg.phase !== 'Scheduled' ? 'var(--success)' : 'var(--border)' }} title="Preparing" />
                            <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: (surg.phase === 'In-Procedure' || surg.phase === 'Recovery' || surg.phase === 'Completed') ? 'var(--danger)' : 'var(--border)' }} title="In Progress" />
                            <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: (surg.phase === 'Recovery' || surg.phase === 'Completed') ? 'var(--primary)' : 'var(--border)' }} title="Recovery" />
                            <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: surg.phase === 'Completed' ? 'var(--success)' : 'var(--border)' }} title="Completed" />
                          </div>
                        </div>

                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div>• <strong>Procedure:</strong> {surg.procedure}</div>
                          <div>• <strong>Team:</strong> {surg.surgeon} (Surgeon) | {surg.anesthetist} (Anesthetist)</div>
                          <div>• <strong>Delay Status:</strong> <span style={{ color: surg.delayTracking.includes('Delay') ? 'var(--danger)' : 'var(--success)', fontWeight: 600 }}>{surg.delayTracking}</span></div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '12px' }}>
                          <button className="btn btn-secondary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => { setSelectedOtId(surg.id); setShowWhoChecklistModal(true); }}>📋 WHO Safety Checklist</button>
                          <button className="btn btn-primary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => { setSelectedOtId(surg.id); setOtSubTab('intraop_anesthesia'); }}>🩸 Intra-op Console</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Operation Delay Analytics & WHO Summary */}
                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>⏱️ Live Operation Delay Tracking & WHO Safety Audit</h3>
                    <div className="grid grid-2" style={{ gap: '12px', marginTop: '10px', fontSize: '11px' }}>
                      <div style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-muted)' }}>
                        <strong>Delay Reasons Analytics Today:</strong>
                        <ul style={{ margin: '6px 0 0 16px', color: 'var(--text-muted)' }}>
                          <li>Anesthesia Preparation: 10 min average delay</li>
                          <li>Instrument Sterilization Countdown: On Time</li>
                          <li>Patient Transport from Ward: On Time</li>
                        </ul>
                      </div>
                      <div style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.05)' }}>
                        <strong style={{ color: 'var(--success)' }}>WHO Surgical Safety Compliance: 100%</strong>
                        <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>All 3 surgical cases completed Sign-In and Time-Out verification prior to skin incision.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: SCHEDULING & OT SLOT MANAGEMENT */}
              {otSubTab === 'schedule' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>📅 Scheduled Surgeries & Slot Reservation Ledger</h3>
                      <button className="btn btn-primary" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => setShowOtBookingModal(true)}>➕ Reserve OT Slot</button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: 'var(--bg-muted)' }}>
                          <th style={{ padding: '8px 10px' }}>OT Suite</th>
                          <th style={{ padding: '8px 10px' }}>Patient Name</th>
                          <th style={{ padding: '8px 10px' }}>Procedure Name</th>
                          <th style={{ padding: '8px 10px' }}>Lead Surgeon</th>
                          <th style={{ padding: '8px 10px' }}>Anesthetist</th>
                          <th style={{ padding: '8px 10px' }}>Time Slot</th>
                          <th style={{ padding: '8px 10px' }}>AI Pred. Duration</th>
                          <th style={{ padding: '8px 10px', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {otSurgeries.map((surg) => (
                          <tr key={surg.id} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '8px 10px' }}><span className="badge badge-primary">{surg.otRoom}</span></td>
                            <td style={{ padding: '8px 10px', fontWeight: 600 }}>{surg.patientName} <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>({surg.patientId})</span></td>
                            <td style={{ padding: '8px 10px' }}>{surg.procedure}</td>
                            <td style={{ padding: '8px 10px' }}>{surg.surgeon}</td>
                            <td style={{ padding: '8px 10px' }}>{surg.anesthetist}</td>
                            <td style={{ padding: '8px 10px' }}>{surg.timeSlot}</td>
                            <td style={{ padding: '8px 10px' }}><span className="badge badge-success">{surg.aiPredictedDuration}</span></td>
                            <td style={{ padding: '8px 10px', textAlign: 'right' }}>
                              <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px', marginRight: '4px' }} onClick={() => { setSelectedOtId(surg.id); setShowOtRescheduleModal(true); }}>Reschedule</button>
                              <button className="btn btn-danger" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => {
                                setOtSurgeries(prev => prev.filter(s => s.id !== surg.id));
                                addToast('danger', `Cancelled OT reservation for ${surg.patientName}`);
                              }}>Cancel</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: PRE-OPERATIVE & TEAM ALLOCATION */}
              {otSubTab === 'preop_team' && (
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>👥 Multi-Disciplinary OT Surgical Team Assignment</h3>
                      <button className="btn btn-secondary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => setShowOtTeamModal(true)}>Reassign Team</button>
                    </div>

                    {(() => {
                      const activeCase = otSurgeries.find(s => s.id === selectedOtId) || otSurgeries[0];
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                          <div style={{ padding: '8px', background: 'var(--bg-muted)', borderRadius: '4px' }}>
                            <strong>Selected Case:</strong> {activeCase.patientName} ({activeCase.procedure})
                          </div>
                          <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                            <strong>Lead Surgeon:</strong> {activeCase.surgeon} | <strong>Assistant:</strong> {activeCase.assistantSurgeon}
                          </div>
                          <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                            <strong>Lead Anesthetist:</strong> {activeCase.anesthetist}
                          </div>
                          <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                            <strong>Scrub Nurse:</strong> {activeCase.otNurse} | <strong>OT Technician:</strong> {activeCase.otTechnician}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>📋 Pre-Op Checklist & PAC Evaluation</h3>
                    {(() => {
                      const activeCase = otSurgeries.find(s => s.id === selectedOtId) || otSurgeries[0];
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '11px' }}>
                          <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                            <strong>PAC Status:</strong> <span className="badge badge-warning">{activeCase.pacStatus}</span>
                          </div>
                          
                          {/* Interactive Pre-Op Prep Checkboxes */}
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={activeCase.preOpPrep.NPO} onChange={(e) => {
                              const checked = e.target.checked;
                              setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, preOpPrep: { ...s.preOpPrep, NPO: checked } } : s));
                              addToast('info', `NPO Fasting status updated to ${checked ? 'Verified' : 'Pending'}`);
                            }} />
                            <span>NPO Fasting Status (Min 8 Hours)</span>
                          </label>

                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={activeCase.preOpPrep.siteMarked} onChange={(e) => {
                              const checked = e.target.checked;
                              setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, preOpPrep: { ...s.preOpPrep, siteMarked: checked } } : s));
                              addToast('info', `Surgical Site Marking updated to ${checked ? 'Verified' : 'Pending'}`);
                            }} />
                            <span>Surgical Site Marked & Verified</span>
                          </label>

                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={activeCase.preOpPrep.ivAntibiotic} onChange={(e) => {
                              const checked = e.target.checked;
                              setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, preOpPrep: { ...s.preOpPrep, ivAntibiotic: checked } } : s));
                              addToast('info', `Pre-Op IV Antibiotic updated to ${checked ? 'Infused' : 'Pending'}`);
                            }} />
                            <span>Pre-Op IV Prophylactic Antibiotic Infused</span>
                          </label>

                          <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                            <strong>Blood Bank Reserved:</strong> {activeCase.preOpPrep.bloodCrossMatch}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: OPERATIVE & ANESTHESIA CONSOLE */}
              {otSubTab === 'intraop_anesthesia' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(() => {
                    const activeCase = otSurgeries.find(s => s.id === selectedOtId) || otSurgeries[0];
                    return (
                      <>
                        <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <h3 style={{ fontSize: '14px', fontWeight: 700 }}>🩸 Live Operative & Anesthesia Console ({activeCase.otRoom})</h3>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Patient: <strong>{activeCase.patientName}</strong> | Surgeon: <strong>{activeCase.surgeon}</strong> | Anesthetist: <strong>{activeCase.anesthetist}</strong></div>
                            </div>
                            
                            {/* Live Surgery Phase Switcher */}
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button className={`btn ${activeCase.phase === 'Preparing' ? 'btn-warning' : 'btn-secondary'}`} style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => {
                                setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, phase: 'Preparing' } : s));
                                addToast('info', 'Phase updated to Preparing');
                              }}>Preparing</button>
                              <button className={`btn ${activeCase.phase === 'In-Procedure' ? 'btn-danger' : 'btn-secondary'}`} style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => {
                                setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, phase: 'In-Procedure' } : s));
                                addToast('danger', 'Phase updated to In-Procedure (Scalpel On)');
                              }}>In-Procedure</button>
                              <button className={`btn ${activeCase.phase === 'Recovery' ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => {
                                setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, phase: 'Recovery' } : s));
                                addToast('warning', 'Phase updated to PACU Recovery');
                              }}>Recovery</button>
                              <button className={`btn ${activeCase.phase === 'Completed' ? 'btn-success' : 'btn-secondary'}`} style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => {
                                setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, phase: 'Completed' } : s));
                                addToast('success', 'Surgery Completed & Case Closed');
                              }}>Completed</button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-2" style={{ gap: '16px' }}>
                          <div className="card">
                            <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>📊 Real-Time Intra-op Parameters & Counts</h3>
                            <div className="grid grid-2" style={{ gap: '10px', marginTop: '10px' }}>
                              <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '4px' }}>
                                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Estimated Blood Loss</span>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--danger)' }}>{activeCase.bloodLossMl} mL</div>
                                <button className="btn btn-secondary" style={{ fontSize: '9px', padding: '1px 4px', marginTop: '4px' }} onClick={() => {
                                  setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, bloodLossMl: s.bloodLossMl + 50 } : s));
                                }}>+50 mL</button>
                              </div>

                              <div style={{ padding: '8px', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '4px' }}>
                                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Sponge & Instrument Count</span>
                                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>{activeCase.spongeCount}</div>
                                <button className="btn btn-success" style={{ fontSize: '9px', padding: '1px 4px', marginTop: '4px' }} onClick={() => {
                                  setOtSurgeries(prev => prev.map(s => s.id === activeCase.id ? { ...s, spongeCount: '24/24 Verified' } : s));
                                  addToast('success', 'Sponge count verified 24/24 with Scrub Nurse!');
                                }}>Verify Count</button>
                              </div>
                            </div>
                          </div>

                          {/* Dynamic Anesthesia Drug Administration Record */}
                          <div className="card">
                            <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>💉 Anesthesia Drug Administration Record</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px', fontSize: '11px', maxHeight: '140px', overflowY: 'auto' }}>
                              {anesthesiaLogs.map((log) => (
                                <div key={log.id} style={{ padding: '6px 8px', border: '1px solid var(--border)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span><strong>{log.time}:</strong> {log.drug}</span>
                                  <button className="btn btn-ghost" style={{ padding: '1px 4px', fontSize: '9px', color: 'var(--danger)' }} onClick={() => {
                                    setAnesthesiaLogs(prev => prev.filter(l => l.id !== log.id));
                                  }}>✕</button>
                                </div>
                              ))}
                            </div>

                            {/* Add Anesthesia Log Form */}
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              if (!newAnesthesiaDrug) return;
                              const timeStr = newAnesthesiaTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                              setAnesthesiaLogs(prev => [...prev, { id: Date.now(), time: timeStr, drug: newAnesthesiaDrug }]);
                              setNewAnesthesiaDrug('');
                              setNewAnesthesiaTime('');
                              addToast('success', 'Added Anesthesia Drug Log Entry!');
                            }} style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                              <input type="text" className="form-input" style={{ width: '80px', height: '26px', fontSize: '10px' }} placeholder="Time" value={newAnesthesiaTime} onChange={(e) => setNewAnesthesiaTime(e.target.value)} />
                              <input type="text" className="form-input" style={{ flexGrow: 1, height: '26px', fontSize: '10px' }} placeholder="Drug Name & Dose (e.g. Fentanyl 50mcg)" value={newAnesthesiaDrug} onChange={(e) => setNewAnesthesiaDrug(e.target.value)} required />
                              <button type="submit" className="btn btn-primary" style={{ padding: '2px 8px', fontSize: '10px' }}>+ Log</button>
                            </form>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* SUB-TAB 5: RECOVERY ROOM & PACU MONITORING */}
              {otSubTab === 'postop_pacu' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>🏥 Recovery Room (PACU) Bed Monitoring Dashboard</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', fontSize: '11px' }}>
                      {otSurgeries.map((surg) => (
                        <div key={surg.id} style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', background: surg.id === selectedOtId ? 'rgba(37, 99, 235, 0.03)' : 'transparent' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <strong>{surg.patientName}</strong> ({surg.procedure})
                              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PACU Status: {surg.pacuStatus}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <button className="btn btn-secondary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => {
                                setOtSurgeries(prev => prev.map(s => s.id === surg.id ? { ...s, pacuStatus: `${s.pacuStatus} | Aldrete 9/10 Recorded` } : s));
                                addToast('info', `Aldrete Score 9/10 Recorded for ${surg.patientName}`);
                              }}>Aldrete Score (9/10)</button>

                              <button className="btn btn-success" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => {
                                setOtSurgeries(prev => prev.map(s => s.id === surg.id ? { ...s, phase: 'Completed', pacuStatus: 'Transferred to ICU Bed 2' } : s));
                                addToast('success', `${surg.patientName} Transferred to ICU Bed 2 successfully!`);
                              }}>Transfer to ICU</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 6: BILLING & IMPLANT RESOURCE MANAGEMENT */}
              {otSubTab === 'billing_resources' && (
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>🔩 Implant & Device Tracking Register</h3>
                      <button className="btn btn-primary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => setShowImplantModal(true)}>➕ Add Implant</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', maxHeight: '180px', overflowY: 'auto' }}>
                      {implantsList.map((item) => (
                        <div key={item.id} style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <strong>{item.name}</strong>
                            <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>Lot #: <strong>{item.lot}</strong> | Serial #: <strong>{item.serial}</strong> | Expiry: {item.expiry}</div>
                          </div>
                          <button className="btn btn-ghost" style={{ color: 'var(--danger)', padding: '2px 6px', fontSize: '10px' }} onClick={() => {
                            setImplantsList(prev => prev.filter(i => i.id !== item.id));
                            addToast('warning', `Removed implant ${item.name}`);
                          }}>Remove</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>💳 OT Package & Resource Billing Breakdown</h3>
                    {(() => {
                      const activeCase = otSurgeries.find(s => s.id === selectedOtId) || otSurgeries[0];
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px', fontSize: '11px' }}>
                          <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                            <span>OT Suite Base Charge (3 Hours)</span>
                            <strong>₹18,000</strong>
                          </div>
                          <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                            <span>Surgeon Share ({activeCase.surgeon})</span>
                            <strong>₹25,000</strong>
                          </div>
                          <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                            <span>Anesthesia Charge ({activeCase.anesthetist})</span>
                            <strong>₹12,000</strong>
                          </div>
                          <div className="flex justify-between align-center" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                            <span>Implants & Consumables</span>
                            <strong>₹10,400</strong>
                          </div>
                          <div className="flex justify-between align-center" style={{ marginTop: '4px', fontSize: '12px' }}>
                            <strong>Total OT Bill Ledger</strong>
                            <strong style={{ color: 'var(--success)' }}>₹{activeCase.billingTotal.toLocaleString('en-IN')}</strong>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* SUB-TAB 7: ANALYTICS & AI FEATURES */}
              {otSubTab === 'analytics_ai' && (
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div className="card" style={{ background: 'rgba(37, 99, 235, 0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>🤖 AI Surgery Duration & Slot Optimization</h3>
                      <button className="btn btn-primary" style={{ fontSize: '10px', padding: '3px 8px' }} onClick={() => setShowAiDraftModal(true)}>AI Operative Note Drafter</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '11px' }}>
                      <div style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        <strong>AI Duration Prediction:</strong> 3 Hours 45 Minutes (Confidence: 94%)
                        <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>Based on 142 historical CABG cases under Dr. Sandeep Mehta.</p>
                      </div>
                      <div style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        <strong style={{ color: 'var(--success)' }}>AI Slot Optimization Suggestion:</strong>
                        <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>Schedule OT-2 Craniotomy at 02:15 PM to optimize instrument turnover time by 20 minutes.</p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>📊 Enterprise OT Analytics & Utilization Reports</h3>
                    <div className="grid grid-2" style={{ gap: '10px', marginTop: '10px', fontSize: '11px' }}>
                      <div style={{ padding: '8px', background: 'var(--bg-muted)', borderRadius: '4px' }}>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>OT Utilization Rate</span>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--success)' }}>94.2%</div>
                      </div>
                      <div style={{ padding: '8px', background: 'var(--bg-muted)', borderRadius: '4px' }}>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Surgery Delay Rate</span>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--warning)' }}>4.1%</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* WHO SURGICAL SAFETY CHECKLIST MODAL */}
              {showWhoChecklistModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>📋 WHO Surgical Safety Checklist (3 Phases)</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowWhoChecklistModal(false)}>✕</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', fontSize: '11px' }}>
                      <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.05)' }}>
                        <strong>Phase 1: SIGN IN (Before Induction)</strong>
                        <div style={{ marginTop: '4px' }}>• Patient Identity, Site, Procedure & Consent Verified</div>
                      </div>
                      <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px', background: 'rgba(37, 99, 235, 0.05)' }}>
                        <strong>Phase 2: TIME OUT (Before Skin Incision)</strong>
                        <div style={{ marginTop: '4px' }}>• Team members introduce by name & role. Critical steps reviewed.</div>
                      </div>
                      <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px' }}>
                        <strong>Phase 3: SIGN OUT (Before Patient Leaves OT)</strong>
                        <div style={{ marginTop: '4px' }}>• Sponge, Needle & Instrument count verified 100% correct.</div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button className="btn btn-secondary" onClick={() => setShowWhoChecklistModal(false)}>Close</button>
                        <button className="btn btn-success" onClick={() => {
                          addToast('success', 'WHO Surgical Safety Sign-off Verified!');
                          setShowWhoChecklistModal(false);
                        }}>Sign-Off WHO Checklist</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* OT TEAM ASSIGNMENT MODAL */}
              {showOtTeamModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>👥 Assign Multi-Disciplinary OT Surgical Team</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowOtTeamModal(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setOtSurgeries(prev => prev.map(s => s.id === selectedOtId ? {
                        ...s,
                        surgeon: teamSurgeon,
                        assistantSurgeon: teamAssistant,
                        anesthetist: teamAnesthetist,
                        otNurse: teamNurse,
                        otTechnician: teamTech
                      } : s));
                      addToast('success', 'Surgical & Anesthesia Team Assigned & Saved to EMR!');
                      setShowOtTeamModal(false);
                    }} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', fontSize: '11px' }}>
                      <div className="form-group">
                        <label className="form-label">Lead Surgeon</label>
                        <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={teamSurgeon} onChange={(e) => setTeamSurgeon(e.target.value)} required />
                      </div>
                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Assistant Surgeon</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={teamAssistant} onChange={(e) => setTeamAssistant(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Lead Anesthetist</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={teamAnesthetist} onChange={(e) => setTeamAnesthetist(e.target.value)} required />
                        </div>
                      </div>
                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Scrub Nurse</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={teamNurse} onChange={(e) => setTeamNurse(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">OT Technician</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={teamTech} onChange={(e) => setTeamTech(e.target.value)} required />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowOtTeamModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Team Allocation</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* IMPLANT & DEVICE TRACKING MODAL */}
              {showImplantModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>🔩 Implant & Medical Device Lot Tracker</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowImplantModal(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setImplantsList(prev => [...prev, { id: Date.now(), name: implantName, lot: implantLotNo, serial: implantSerialNo, expiry: implantExpiry }]);
                      addToast('success', `Implant ${implantName} (Lot ${implantLotNo}) Tracked & Saved to Register!`);
                      setShowImplantModal(false);
                    }} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      
                      <div className="form-group">
                        <label className="form-label">Implant / Prosthesis Name</label>
                        <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={implantName} onChange={(e) => setImplantName(e.target.value)} required />
                      </div>

                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Lot Number</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={implantLotNo} onChange={(e) => setImplantLotNo(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Serial Number</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={implantSerialNo} onChange={(e) => setImplantSerialNo(e.target.value)} required />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Sterilization Expiry Date</label>
                        <input type="date" className="form-input" style={{ height: '30px', fontSize: '11px' }} value={implantExpiry} onChange={(e) => setImplantExpiry(e.target.value)} required />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowImplantModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Implant Record</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* AI OPERATIVE NOTE DRAFTER MODAL */}
              {showAiDraftModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '520px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>🤖 AI Operative Note & Post-Op Recommendations Drafter</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowAiDraftModal(false)}>✕</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', fontSize: '11px' }}>
                      <div style={{ padding: '10px', background: 'var(--bg-muted)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        <strong>AI Drafted Operative Narrative:</strong>
                        <p style={{ marginTop: '4px', color: 'var(--text-main)', fontStyle: 'italic' }}>
                          "Patient underwent successful 3-vessel CABG under General Anesthesia. LIMA to LAD anastomosed smoothly. Cardiopulmonary bypass time: 78 min. Hemostasis achieved. Chest closed with 6 sternal wires."
                        </p>
                      </div>
                      <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        <strong style={{ color: 'var(--success)' }}>AI Post-Op Recommendations:</strong>
                        <p style={{ marginTop: '4px', color: 'var(--text-main)' }}>
                          • Maintain MAP &gt; 70 mmHg using Noradrenaline titration.<br/>
                          • Wean propofol sedation after 6 hours.<br/>
                          • Schedule ICU Step-Down evaluation on Post-Op Day 2.
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button className="btn btn-secondary" onClick={() => setShowAiDraftModal(false)}>Close</button>
                        <button className="btn btn-primary" onClick={() => {
                          setOtSurgeries(prev => prev.map(s => s.id === selectedOtId ? { ...s, opNote: 'AI Drafted: On-pump CABG with LIMA to LAD anastomosis and SVG grafts. CPB 78 min.' } : s));
                          addToast('success', 'AI Operative Note & Recommendations Inserted!');
                          setShowAiDraftModal(false);
                        }}>Adopt AI Note</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* OT RESERVATION MODAL */}
              {showOtBookingModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '500px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>📅 New Surgery OT Reservation</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowOtBookingModal(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const newId = `OT-2026-${100 + otSurgeries.length + 1}`;
                      setOtSurgeries(prev => [
                        ...prev,
                        {
                          id: newId,
                          patientName: newOtPatientName || 'New Surgical Patient',
                          patientId: `PX-2026-${9050 + otSurgeries.length}`,
                          otRoom: newOtRoom,
                          procedure: newOtProcedure || 'Elective Surgery',
                          surgeon: newOtSurgeon,
                          assistantSurgeon: 'Dr. Alok Verma',
                          anesthetist: newOtAnesthetist,
                          otNurse: 'Sister Sunita',
                          otTechnician: 'Tech Rahul',
                          timeSlot: '08:00 AM - 12:00 PM',
                          category: newOtCategory,
                          phase: 'Preparing',
                          anesthesiaType: 'General Anesthesia',
                          pacStatus: 'Cleared (ASA Grade II)',
                          consentSigned: true,
                          bloodLossMl: 0,
                          spongeCount: 'Pending',
                          preOpPrep: { NPO: true, siteMarked: true, ivAntibiotic: true, bloodCrossMatch: '2 Units Ready', equipmentVerified: true },
                          opNote: '',
                          whoChecklist: { signIn: true, timeOut: false, signOut: false },
                          delayTracking: 'On Schedule',
                          implantDetails: 'Standard Consumables Pack',
                          billingTotal: 38000,
                          aiPredictedDuration: '2h 15m (Confidence 92%)',
                          aiPostOpRecommendation: 'Standard Ward Recovery',
                          pacuStatus: 'Scheduled'
                        }
                      ]);
                      setShowOtBookingModal(false);
                      setNewOtPatientName('');
                      setNewOtProcedure('');
                      addToast('success', `Reserved ${newOtRoom} for ${newOtPatientName || 'Patient'} successfully!`);
                    }} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      
                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Patient Full Name</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} placeholder="e.g. Vikram Patel" value={newOtPatientName} onChange={(e) => setNewOtPatientName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Surgical Procedure</label>
                          <input type="text" className="form-input" style={{ height: '30px', fontSize: '11px' }} placeholder="e.g. Total Knee Replacement" value={newOtProcedure} onChange={(e) => setNewOtProcedure(e.target.value)} required />
                        </div>
                      </div>

                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Target OT Suite</label>
                          <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newOtRoom} onChange={(e) => setNewOtRoom(e.target.value)}>
                            <option value="OT-1 (Cardiac Suite)">OT-1 (Cardiac Suite)</option>
                            <option value="OT-2 (Neuro Suite)">OT-2 (Neuro Suite)</option>
                            <option value="OT-3 (Ortho Suite)">OT-3 (Ortho Suite)</option>
                            <option value="OT-4 (Emergency OT)">OT-4 (Emergency OT)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Lead Surgeon</label>
                          <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newOtSurgeon} onChange={(e) => setNewOtSurgeon(e.target.value)}>
                            <option value="Dr. Sandeep Mehta">Dr. Sandeep Mehta (Cardiac)</option>
                            <option value="Dr. Ananya Ray">Dr. Ananya Ray (Neuro)</option>
                            <option value="Dr. Deepa Roy">Dr. Deepa Roy (General/Trauma)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-2" style={{ gap: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">Lead Anesthetist</label>
                          <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newOtAnesthetist} onChange={(e) => setNewOtAnesthetist(e.target.value)}>
                            <option value="Dr. Vikram Malhotra">Dr. Vikram Malhotra (Cardiac Anesthesia)</option>
                            <option value="Dr. Rajesh K">Dr. Rajesh K (Neuro Anesthesia)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Surgery Category</label>
                          <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={newOtCategory} onChange={(e) => setNewOtCategory(e.target.value)}>
                            <option value="Planned Elective">Planned Elective Surgery</option>
                            <option value="Emergency STAT">Emergency STAT Surgery</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowOtBookingModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Confirm OT Reservation</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* RESCHEDULE SURGERY MODAL */}
              {showOtRescheduleModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '450px', maxWidth: '90%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>🕒 Reschedule OT Surgery Slot</h3>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => setShowOtRescheduleModal(false)}>✕</button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setOtSurgeries(prev => prev.map(s => s.id === selectedOtId ? {
                        ...s,
                        otRoom: rescheduleRoom,
                        timeSlot: rescheduleSlot,
                        delayTracking: `Rescheduled to ${rescheduleSlot}`
                      } : s));
                      addToast('warning', `Surgery rescheduled to ${rescheduleRoom} (${rescheduleSlot}) successfully!`);
                      setShowOtRescheduleModal(false);
                    }} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      
                      <div className="form-group">
                        <label className="form-label">Target OT Suite</label>
                        <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={rescheduleRoom} onChange={(e) => setRescheduleRoom(e.target.value)}>
                          <option value="OT-1 (Cardiac Suite)">OT-1 (Cardiac Suite)</option>
                          <option value="OT-2 (Neuro Suite)">OT-2 (Neuro Suite)</option>
                          <option value="OT-3 (Ortho Suite)">OT-3 (Ortho Suite)</option>
                          <option value="OT-4 (Emergency OT)">OT-4 (Emergency OT)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">New Time Slot</label>
                        <select className="form-input" style={{ height: '30px', fontSize: '11px' }} value={rescheduleSlot} onChange={(e) => setRescheduleSlot(e.target.value)}>
                          <option value="08:00 AM - 11:00 AM">08:00 AM - 11:00 AM (Morning Slot)</option>
                          <option value="11:30 AM - 02:30 PM">11:30 AM - 02:30 PM (Midday Slot)</option>
                          <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM (Afternoon Slot)</option>
                          <option value="06:30 PM - 09:30 PM">06:30 PM - 09:30 PM (Evening Slot)</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowOtRescheduleModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Reschedule</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* ==========================================
              TAB: 4.7 PATHOLOGY LAB (Enterprise SaaS Suite)
              ========================================== */}
          {/* ==========================================
              TAB: 4.7 PATHOLOGY LAB (15-Pillar Enterprise SaaS Suite)
              ========================================== */}
          {activeTab === 'lab' && (
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
                        <strong style={{ fontSize: '14px' }}>HEXENCARE DIAGNOSTICS & PATHOLOGY</strong>
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
                          This report digital hash matches the original signature on the HexenCare HMS blockchain ledger.
                        </p>
                      </div>

                      <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text-muted)' }}>
                        • <strong>Issuing Laboratory:</strong> HexenCare Central Pathology (NABL-2026-8804)<br/>
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
          )}

          {/* ==========================================
              TAB: RADIOLOGY & IMAGING MANAGEMENT (15-Pillar Enterprise SaaS Suite)
              ========================================== */}
          {activeTab === 'radiology' && (
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
          )}

          {/* ==========================================
              TAB: HEXENCARE PHARMACY ENGINE (RURAL & REMOTE ENTERPRISE PMS)
              ========================================== */}
          {activeTab === 'pharmacy' && (
            <div className="flex flex-col gap-lg">
              {/* Header Banner - High-Contrast Touch Friendly */}
              <div className="card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(37, 99, 235, 0.08) 100%)', borderLeft: '6px solid var(--success)', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span>💊 HexenCare Pharmacy Management System (PMS)</span>
                      <span className="badge badge-success" style={{ fontSize: '11px', padding: '4px 10px' }}>Rural & Remote Ready</span>
                    </h2>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
                      Simple visual touch interface designed for easy operation in rural medical shops & hospital pharmacies.
                    </p>
                  </div>

                  {/* 5-Language Local Audio/Text Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-card)', padding: '6px 14px', borderRadius: '10px', border: '2px solid var(--primary)' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>🌐 Select Language:</span>
                    <select
                      value={pharmacyLanguage}
                      onChange={(e) => {
                        setPharmacyLanguage(e.target.value as any);
                        addToast('info', `Switched Prescription Language to ${e.target.value.toUpperCase()}`);
                      }}
                      className="form-input"
                      style={{ width: '150px', height: '36px', fontSize: '13px', fontWeight: 700 }}
                    >
                      <option value="en">🇬🇧 English</option>
                      <option value="hi">🇮🇳 Hindi (हिंदी)</option>
                      <option value="te">🇮🇳 Telugu (తెలుగు)</option>
                      <option value="ta">🇮🇳 Tamil (தமிழ்)</option>
                      <option value="bn">🇮🇳 Bengali (বাংলা)</option>
                    </select>
                  </div>
                </div>

                {/* 3 Edition Switcher Cards */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { setPmsEdition('hospital'); addToast('info', 'Activated Hospital Pharmacy Edition'); }}
                    className={`btn ${pmsEdition === 'hospital' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
                  >
                    🏥 Hospital Edition (HMS Integrated)
                  </button>
                  <button
                    onClick={() => { setPmsEdition('retail'); addToast('info', 'Activated Retail Standalone Medical Shop Edition'); }}
                    className={`btn ${pmsEdition === 'retail' ? 'btn-success' : 'btn-secondary'}`}
                    style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
                  >
                    🏪 Retail Standalone Medical Shop Edition
                  </button>
                  <button
                    onClick={() => { setPmsEdition('chain'); addToast('info', 'Activated Enterprise Pharmacy Chain Edition'); }}
                    className={`btn ${pmsEdition === 'chain' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px', background: pmsEdition === 'chain' ? '#9333EA' : undefined, color: pmsEdition === 'chain' ? 'white' : undefined }}
                  >
                    🏢 Enterprise Chain & Warehouse Edition
                  </button>
                </div>
              </div>

              {/* 8 Visual Touch Navigation Tiles */}
              <div className="grid grid-4" style={{ gap: '12px' }}>
                <div onClick={() => setPmsSubTab('pos_cashier')} className={`pms-nav-tile ${pmsSubTab === 'pos_cashier' ? 'active' : ''}`}>
                  <span style={{ fontSize: '20px' }}>⚡</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>1. POS Fast Billing</div>
                    <div style={{ fontSize: '10px', opacity: 0.8 }}>Barcoded Cash Register</div>
                  </div>
                </div>

                <div onClick={() => setPmsSubTab('medicine_master')} className={`pms-nav-tile ${pmsSubTab === 'medicine_master' ? 'active' : ''}`}>
                  <span style={{ fontSize: '20px' }}>💊</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>2. Medicine Master</div>
                    <div style={{ fontSize: '10px', opacity: 0.8 }}>Salts & Price List</div>
                  </div>
                </div>

                <div onClick={() => setPmsSubTab('inventory_batches')} className={`pms-nav-tile ${pmsSubTab === 'inventory_batches' ? 'active' : ''}`}>
                  <span style={{ fontSize: '20px' }}>📦</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>3. Live Stock & FEFO</div>
                    <div style={{ fontSize: '10px', opacity: 0.8 }}>Near Expiry Discount</div>
                  </div>
                </div>

                <div onClick={() => setPmsSubTab('purchases_suppliers')} className={`pms-nav-tile ${pmsSubTab === 'purchases_suppliers' ? 'active' : ''}`}>
                  <span style={{ fontSize: '20px' }}>🛒</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>4. Purchases & Vendors</div>
                    <div style={{ fontSize: '10px', opacity: 0.8 }}>PO & Supplier Ledger</div>
                  </div>
                </div>

                <div onClick={() => setPmsSubTab('prescriptions_ocr')} className={`pms-nav-tile ${pmsSubTab === 'prescriptions_ocr' ? 'active' : ''}`}>
                  <span style={{ fontSize: '20px' }}>📸</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>5. Scan Rx & AI OCR</div>
                    <div style={{ fontSize: '10px', opacity: 0.8 }}>Doctor Photo Reader</div>
                  </div>
                </div>

                <div onClick={() => setPmsSubTab('multistore_chain')} className={`pms-nav-tile ${pmsSubTab === 'multistore_chain' ? 'active' : ''}`}>
                  <span style={{ fontSize: '20px' }}>🏢</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>6. Multi-Store Chain</div>
                    <div style={{ fontSize: '10px', opacity: 0.8 }}>Warehouse Transfers</div>
                  </div>
                </div>

                <div onClick={() => setPmsSubTab('delivery_crm')} className={`pms-nav-tile ${pmsSubTab === 'delivery_crm' ? 'active' : ''}`}>
                  <span style={{ fontSize: '20px' }}>🛵</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>7. Home Delivery & CRM</div>
                    <div style={{ fontSize: '10px', opacity: 0.8 }}>WhatsApp Refill Alert</div>
                  </div>
                </div>

                <div onClick={() => setPmsSubTab('reports_ai')} className={`pms-nav-tile ${pmsSubTab === 'reports_ai' ? 'active' : ''}`}>
                  <span style={{ fontSize: '20px' }}>📊</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>8. GST & AI Reports</div>
                    <div style={{ fontSize: '10px', opacity: 0.8 }}>GSTR-1, GSTR-3B & P&L</div>
                  </div>
                </div>
              </div>

              {/* WORKSPACE 1: POS CASHIER & FAST BILLING */}
              {pmsSubTab === 'pos_cashier' && (
                <div className="flex flex-col gap-md">
                  <div className="card" style={{ border: '2px solid var(--primary)', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>⚡ Touch-Friendly POS Billing Counter</span>
                        <span className="badge badge-success">Online & Barcode Ready</span>
                      </h3>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '6px 12px', fontWeight: 700 }} onClick={() => setShowVoiceBillingModal(true)}>
                          🎙️ Speak Medicine Name (AI Voice)
                        </button>
                        <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '6px 12px', fontWeight: 700 }} onClick={() => {
                          setPmsHoldBills(prev => [...prev, { id: `HOLD-${Math.floor(800 + Math.random() * 100)}`, customerName: otcBillForm.customerName || 'Walk-in Customer', itemsCount: 1, total: 185, time: '11:52 AM' }]);
                          addToast('info', 'Hold Bill #HOLD-802 Saved for Customer');
                        }}>
                          ⏸️ Hold Current Bill
                        </button>
                        <button className="btn btn-primary" style={{ fontSize: '12px', padding: '6px 12px', fontWeight: 700 }} onClick={() => addToast('success', `Resumed Hold Bill #${pmsHoldBills[0]?.id || 'HOLD-801'}`)}>
                          ▶️ Resume Hold Bill ({pmsHoldBills.length})
                        </button>
                      </div>
                    </div>

                    <form onSubmit={(e) => {
                      handleOtcBillSubmit(e);
                      setPharmacyReceiptData({
                        billNo: `PHARM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                        customerName: otcBillForm.customerName || 'Walk-in POS Customer',
                        medicineName: otcBillForm.medicine || 'Dolo 650mg & Augmentin 625mg',
                        qty: otcBillForm.qty || '1',
                        totalAmount: (parseInt(otcBillForm.qty || '1') * parseInt(otcBillForm.price || '185')),
                        department: pmsEdition === 'hospital' ? 'Hospital Pharmacy (OPD)' : 'Retail Medical Shop Counter 1',
                        tpaStatus: 'Verified POS Tax Invoice',
                        date: '2026-08-08 11:52 AM'
                      });
                      setShowPharmacyReceiptModal(true);
                    }} className="flex gap-md align-end flex-wrap">
                      <div className="form-group" style={{ marginBottom: 0, width: '220px' }}>
                        <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Customer / Patient Name</label>
                        <input
                          type="text"
                          className="form-input pms-touch-input"
                          placeholder="e.g. Ramesh Kumar"
                          value={otcBillForm.customerName}
                          onChange={(e) => setOtcBillForm({ ...otcBillForm, customerName: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0, flexGrow: 1 }}>
                        <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Scan Barcode / Search Medicine Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Dolo 650mg / Paracetamol / Augmentin"
                          className="form-input pms-touch-input"
                          required
                          value={otcBillForm.medicine}
                          onChange={(e) => setOtcBillForm({ ...otcBillForm, medicine: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0, width: '90px' }}>
                        <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Quantity</label>
                        <input
                          type="number"
                          className="form-input pms-touch-input"
                          required
                          value={otcBillForm.qty}
                          onChange={(e) => setOtcBillForm({ ...otcBillForm, qty: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0, width: '110px' }}>
                        <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Price (₹)</label>
                        <input
                          type="number"
                          className="form-input pms-touch-input"
                          required
                          value={otcBillForm.price}
                          onChange={(e) => setOtcBillForm({ ...otcBillForm, price: e.target.value })}
                        />
                      </div>
                      <button type="submit" className="btn btn-success" style={{ height: '44px', padding: '0 24px', fontSize: '14px', fontWeight: 800 }}>
                        💵 CASH BILL & PRINT RECEIPT
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* WORKSPACE 2: MEDICINE MASTER REGISTRY */}
              {pmsSubTab === 'medicine_master' && (
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>💊 Master Medicine Database & Schedule Classification</h3>
                    <button className="btn btn-primary" style={{ fontSize: '11px' }} onClick={() => {
                      setPmsMedicines(prev => [...prev, { id: `MED-${Math.floor(104 + Math.random() * 90)}`, brand: 'Metformin 500mg', generic: 'Metformin Hydrochloride', composition: 'Metformin IP 500mg', schedule: 'Schedule H', hsn: '30049099', gst: 12, mrp: 45, purchasePrice: 28, sellingPrice: 38, stock: 600, expiry: '2027-12-31' }]);
                      addToast('success', 'Added Metformin 500mg to Master Medicine Database!');
                    }}>➕ Add New Medicine Master</button>
                  </div>

                  <div className="table-container">
                    <table className="data-table" style={{ fontSize: '11px' }}>
                      <thead>
                        <tr>
                          <th>Med ID</th>
                          <th>Brand Name</th>
                          <th>Generic Salt Composition</th>
                          <th>Schedule Class</th>
                          <th>HSN / GST %</th>
                          <th>MRP</th>
                          <th>Selling Price</th>
                          <th>Current Stock</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pmsMedicines.map(m => (
                          <tr key={m.id}>
                            <td className="font-semibold">{m.id}</td>
                            <td style={{ fontWeight: 700 }}>{m.brand}</td>
                            <td style={{ color: 'var(--primary)' }}>{m.composition}</td>
                            <td><span className="badge badge-warning">{m.schedule}</span></td>
                            <td>{m.hsn} ({m.gst}%)</td>
                            <td>₹{m.mrp}</td>
                            <td style={{ color: 'var(--success)', fontWeight: 700 }}>₹{m.sellingPrice}</td>
                            <td><strong>{m.stock} units</strong></td>
                            <td>
                              <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('info', `AI Suggested Alternatives for ${m.brand}: Pan-D, Rabeprazole 20mg`)}>🤖 AI Alternatives</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* WORKSPACE 3: LIVE FEFO BATCHES & INVENTORY */}
              {pmsSubTab === 'inventory_batches' && (
                <div className="card">
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>📦 FEFO Live Inventory & Near Expiry Auto-Discounting</h3>
                  <div className="grid grid-3" style={{ gap: '12px', marginBottom: '16px' }}>
                    <div style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '4px solid var(--success)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Stock Value</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--success)' }}>₹67,70,000</div>
                    </div>
                    <div style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '4px solid var(--warning)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Near Expiry Alerts (&lt; 60 days)</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--warning)' }}>14 Batches</div>
                    </div>
                    <div style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '4px solid var(--danger)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Out of Stock / Low Stock</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--danger)' }}>3 Medicines</div>
                    </div>
                  </div>

                  <button className="btn btn-warning" style={{ fontSize: '11px' }} onClick={() => addToast('success', 'Applied 30% Auto-Discount to 14 Near-Expiry Medicine Batches!')}>
                    🏷️ Apply Near-Expiry Auto-Discount (30% Off)
                  </button>
                </div>
              )}

              {/* WORKSPACE 4: PURCHASES & SUPPLIERS */}
              {pmsSubTab === 'purchases_suppliers' && (
                <div className="card">
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>🛒 Purchase Orders, GRN & Multi-Supplier Rate Matrix</h3>
                  <div style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', fontSize: '11px' }}>
                    <strong>Active Vendors:</strong> Sun Pharma Wholesale (Outstanding ₹1,40,000) • Cipla Direct (Outstanding ₹85,000)
                  </div>
                  <button className="btn btn-primary" style={{ marginTop: '12px', fontSize: '11px' }} onClick={() => addToast('success', 'Created Purchase Order #PO-2026-9041!')}>
                    ➕ Create New Purchase Order (PO)
                  </button>
                </div>
              )}

              {/* WORKSPACE 5: E-PRESCRIPTIONS & AI OCR */}
              {pmsSubTab === 'prescriptions_ocr' && (
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>📸 E-Prescriptions & AI OCR Prescription Reader</h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <select
                        value={pharmacyLanguage}
                        onChange={(e) => setPharmacyLanguage(e.target.value as any)}
                        className="form-input"
                        style={{ width: '120px', height: '30px', fontSize: '11px' }}
                      >
                        <option value="en">🇬🇧 English</option>
                        <option value="hi">🇮🇳 Hindi (हिंदी)</option>
                        <option value="te">🇮🇳 Telugu (తెలుగు)</option>
                        <option value="ta">🇮🇳 Tamil (தமிழ்)</option>
                        <option value="bn">🇮🇳 Bengali (বাংলা)</option>
                      </select>
                      <button className="btn btn-primary" style={{ fontSize: '11px' }} onClick={() => setShowOcrModal(true)}>📸 Scan Prescription (AI OCR)</button>
                    </div>
                  </div>

                  {/* Department Filter Pills */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                    <button onClick={() => setPharmacyDeptFilter('all')} className={`btn ${pharmacyDeptFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '2px 8px', fontSize: '10px' }}>All Queues</button>
                    <button onClick={() => setPharmacyDeptFilter('opd')} className={`btn ${pharmacyDeptFilter === 'opd' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '2px 8px', fontSize: '10px' }}>OPD Desk</button>
                    <button onClick={() => setPharmacyDeptFilter('ipd')} className={`btn ${pharmacyDeptFilter === 'ipd' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '2px 8px', fontSize: '10px' }}>IPD Wards</button>
                  </div>

                  <div className="table-container">
                    <table className="data-table" style={{ fontSize: '11px' }}>
                      <thead>
                        <tr>
                          <th>Rx ID</th>
                          <th>Patient Name</th>
                          <th>Department Source</th>
                          <th>Meds & Translated Instructions</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patients.filter(p => p.status === 'pharmacy-pending').map(p => (
                          <tr key={p.id}>
                            <td>{p.id}</td>
                            <td style={{ fontWeight: 600 }}>{p.name}</td>
                            <td><span className="badge badge-primary">OPD Consultation</span></td>
                            <td>
                              {p.prescriptions.map((pr, idx) => (
                                <div key={idx} style={{ fontSize: '11px' }}>
                                  <strong>{pr.medication} ({pr.dosage})</strong> — <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>{getDosageInstruction(pr.medication, pharmacyLanguage)}</span>
                                </div>
                              ))}
                            </td>
                            <td>
                              <button className="btn btn-success" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => handleDispenseMeds(p.id)}>Dispense Rx</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* WORKSPACE 6: MULTI-STORE & WAREHOUSE */}
              {pmsSubTab === 'multistore_chain' && (
                <div className="card">
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#9333EA', marginBottom: '12px' }}>🏢 Multi-Store Inventory & Central Warehouse Transfers</h3>
                  <div className="grid grid-3" style={{ gap: '12px' }}>
                    {pmsStores.map(s => (
                      <div key={s.id} style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
                        <div className="badge badge-primary">{s.type}</div>
                        <h4 style={{ fontSize: '13px', fontWeight: 700, margin: '6px 0' }}>{s.name}</h4>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Location: {s.location}</div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--success)', marginTop: '4px' }}>Stock: {s.stockValue}</div>
                        <button className="btn btn-secondary" style={{ width: '100%', marginTop: '8px', fontSize: '10px' }} onClick={() => {
                          setPmsStores(prev => prev.map(st => st.id === s.id ? { ...st, stockValue: '₹50,00,000 (Updated)' } : st));
                          addToast('info', `Initiated Stock Transfer request to ${s.name}`);
                        }}>
                          🔄 Stock Transfer
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WORKSPACE 7: HOME DELIVERY & WHATSAPP CRM */}
              {pmsSubTab === 'delivery_crm' && (
                <div className="card">
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>🛵 Online Home Delivery & WhatsApp Medicine Refill CRM</h3>
                  <div style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', fontSize: '11px' }}>
                    <strong>Active Online Orders:</strong> Order #DEL-901 (Aarav Sharma) — Assigned to Delivery Boy Rahul K (OTP: 8821)
                  </div>
                  <button className="btn btn-success" style={{ marginTop: '12px', fontSize: '11px' }} onClick={() => addToast('success', 'Dispatched 48 Automated WhatsApp Refill Reminders to Patients!')}>
                    📲 Dispatch WhatsApp Refill Reminders
                  </button>
                </div>
              )}

              {/* WORKSPACE 8: GST REPORTS & AI INTELLIGENCE */}
              {pmsSubTab === 'reports_ai' && (
                <div className="card">
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>🤖 GST Tax Reports & AI Demand Forecasting</h3>
                  <div style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div>• <strong>GSTR-1 Sales Tax Summary:</strong> Net Output GST Tax ₹48,420</div>
                    <div>• <strong>GSTR-3B Purchase Credit Summary:</strong> Net Input Tax Credit ₹32,150</div>
                    <div>• <strong>AI Auto Purchase Suggestion:</strong> Reorder 500 units of Dolo 650mg based on 14-day demand velocity.</div>
                  </div>
                </div>
              )}

              {/* AI OCR PRESCRIPTION MODAL */}
              {showOcrModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>📸 AI OCR Prescription Scanner</h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Upload Doctor Rx photo to extract medications & dosages automatically.</p>
                    <div style={{ border: '2px dashed var(--border)', padding: '20px', textAlign: 'center', borderRadius: '6px', margin: '12px 0' }}>
                      <span style={{ fontSize: '12px', color: 'var(--primary)' }}>Drag & Drop Doctor Rx Photo here or Click to Upload</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button className="btn btn-secondary" onClick={() => setShowOcrModal(false)}>Cancel</button>
                      <button className="btn btn-success" onClick={() => {
                        addToast('success', 'AI OCR Extracted: 1. Dolo 650mg 1-0-1, 2. Pan 40mg 1-0-0');
                        setShowOcrModal(false);
                      }}>Extract Meds via AI</button>
                    </div>
                  </div>
                </div>
              )}

              {/* AI VOICE BILLING MODAL */}
              {showVoiceBillingModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '420px', maxWidth: '90%' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>🎙️ AI Voice-to-Text Billing Terminal</h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Speak medicine names to add directly to POS invoice.</p>
                    <div style={{ padding: '16px', background: 'rgba(37, 99, 235, 0.08)', borderRadius: '6px', textAlign: 'center', margin: '12px 0' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--primary)' }}>🎙️ Listening... "Add 2 strips of Dolo 650mg and 1 syrup Benadryl"</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button className="btn btn-secondary" onClick={() => setShowVoiceBillingModal(false)}>Cancel</button>
                      <button className="btn btn-primary" onClick={() => {
                        addToast('success', 'Voice Command Applied: Added 2 strips Dolo 650mg to POS bill!');
                        setShowVoiceBillingModal(false);
                      }}>Add to POS Bill</button>
                    </div>
                  </div>
                </div>
              )}

              {/* POS THERMAL RECEIPT MODAL */}
              {showPharmacyReceiptModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card" style={{ width: '420px', maxWidth: '90%', background: 'white', color: 'black', padding: '20px', borderRadius: '8px' }}>
                    <div style={{ textAlign: 'center', borderBottom: '1px border #ccc', paddingBottom: '10px' }}>
                      <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'black' }}>🏥 HexenCare Pharmacy Tax Invoice</h2>
                      <div style={{ fontSize: '11px', color: '#555' }}>Central Hospital Complex • GSTIN: 07AAACH9011X1Z4</div>
                      <div style={{ fontSize: '10px', color: '#777', marginTop: '2px' }}>Invoice #{pharmacyReceiptData.billNo} • {pharmacyReceiptData.date}</div>
                    </div>

                    <div style={{ marginTop: '12px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div><strong>Customer / Patient:</strong> {pharmacyReceiptData.customerName}</div>
                      <div><strong>Department / Counter:</strong> {pharmacyReceiptData.department}</div>
                      <div><strong>Status:</strong> {pharmacyReceiptData.tpaStatus}</div>
                      
                      <div style={{ borderTop: '1px dashed #ccc', borderBottom: '1px dashed #ccc', padding: '8px 0', margin: '6px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                          <span>{pharmacyReceiptData.medicineName} x{pharmacyReceiptData.qty}</span>
                          <span>₹{pharmacyReceiptData.totalAmount}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold', color: 'black' }}>
                        <span>Total Paid (Net):</span>
                        <span>₹{pharmacyReceiptData.totalAmount}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowPharmacyReceiptModal(false)}>Close</button>
                      <button type="button" className="btn btn-primary" onClick={() => {
                        addToast('success', `Printed POS Thermal Receipt #${pharmacyReceiptData.billNo}!`);
                        setShowPharmacyReceiptModal(false);
                      }}>🖨️ Print Receipt</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==========================================
              TAB: ACCOUNTANT BILLING & FINANCE (with Expense Capture)
              ========================================== */}
          {activeTab === 'billing' && (
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
          )}

          {/* ==========================================
              TAB: MRD (Medical Records Dept)
              ========================================== */}
          {activeTab === 'mrd' && (
            <div className="grid gap-lg" style={{ gridTemplateColumns: '1.8fr 1.2fr' }}>
              <div className="card">
                <h2>Clinical Disease Coding (ICD-10 & ICD-11 Classifications)</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>Search and link WHO ICD codes to active patient profiles to ensure billing & insurance validity.</p>

                <div className="flex gap-sm" style={{ marginTop: '16px' }}>
                  <input
                    type="text"
                    placeholder="Search ICD database (e.g. Asthma, diabetes)..."
                    className="form-input"
                    value={mrdSearchTerm}
                    onChange={(e) => setMrdSearchTerm(e.target.value)}
                  />
                </div>

                {/* ICD results database */}
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {ICD_DISEASE_DB.filter(d => d.title.toLowerCase().includes(mrdSearchTerm.toLowerCase()) || d.code.toLowerCase().includes(mrdSearchTerm.toLowerCase())).map((icd, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedIcdCode(`${icd.code} (${icd.title})`);
                        addToast('info', `Selected ICD code: ${icd.code}`);
                      }}
                      style={{
                        padding: '12px',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: selectedIcdCode.includes(icd.code) ? 'rgba(37,99,235,0.05)' : 'var(--bg-card)',
                        borderColor: selectedIcdCode.includes(icd.code) ? 'var(--primary)' : 'var(--border)'
                      }}
                    >
                      <div className="flex justify-between font-semibold">
                        <span style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>{icd.code}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{icd.chapter}</span>
                      </div>
                      <div style={{ fontSize: '13px', marginTop: '4px' }}>{icd.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settle ICD link to patient */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h2>Link Code to Patient Profile</h2>
                <div style={{ backgroundColor: 'var(--bg-muted)', padding: '12px', borderRadius: '6px', fontSize: '12px' }}>
                  <strong>Selected Code:</strong>
                  <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '14px', marginTop: '4px', fontFamily: 'monospace' }}>
                    {selectedIcdCode || 'No code selected'}
                  </div>
                </div>

                <form onSubmit={handleAssignMrdCode} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Patient Target</label>
                    <select
                      className="form-input"
                      value={selectedPatientId}
                      onChange={(e) => setSelectedPatientId(e.target.value)}
                    >
                      {branchPatients.map(p => (
                        <option key={p.id} value={p.id}>{p.name} (ID: {p.id})</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={!selectedIcdCode} style={{ width: '100%' }}>
                    Commit Link to Medical Record
                  </button>
                </form>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: 'auto', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <strong>Clinical Audit Checks:</strong>
                  <ul style={{ paddingLeft: '16px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li>All diagnosis assignments trigger clinical log entries.</li>
                    <li>Insurance claims require valid ICD-10/11 links.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB: BLOOD BANK STOCK
              ========================================== */}
          {activeTab === 'bloodbank' && (
            <div className="grid gap-lg">
              <div className="card">
                <div className="card-header">
                  <h2>Blood Bank Storage Chambers</h2>
                  <span className="badge badge-success">Temperature controlled status</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>Real-time biological storage telemetry monitoring. Cryogenic chambers target stability range: 2.0°C to 6.0°C.</p>

                <div className="grid grid-4" style={{ marginTop: '20px' }}>
                  {bloodStock.map((b, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        borderLeft: `4px solid ${
                          b.status === 'optimal' ? 'var(--success)' :
                          b.status === 'low' ? 'var(--warning)' : 'var(--danger)'
                        }`,
                        background: 'var(--bg-card)'
                      }}
                    >
                      <div className="flex justify-between align-center">
                        <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Group: {b.bloodGroup}</h3>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{b.temp}°C</span>
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: 800, margin: '12px 0' }}>
                        {b.units} <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>Units</span>
                      </div>
                      <div className="flex justify-between align-center">
                        <span className={`badge ${
                          b.status === 'optimal' ? 'badge-success' :
                          b.status === 'low' ? 'badge-warning' : 'badge-danger'
                        }`}>
                          {b.status.toUpperCase()}
                        </span>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '2px 8px', fontSize: '10px' }}
                          onClick={() => {
                            setBloodStock(prev => prev.map(bl => bl.bloodGroup === b.bloodGroup ? { ...bl, units: bl.units + 1 } : bl));
                            addToast('success', `Added 1 Unit of ${b.bloodGroup} to stock.`);
                          }}
                        >
                          + Add Unit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB: VACCINE CLINIC
              ========================================== */}
          {activeTab === 'vaccination' && (
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
          )}

          {/* ==========================================
              TAB: PATIENT PORTAL
              ========================================== */}
          {activeTab === 'portal' && (
            <div className="grid gap-lg" style={{ gridTemplateColumns: '2fr 1fr' }}>
              <div className="flex flex-col gap-lg">
                {/* Health Overview */}
                <div className="card">
                  <h2>Welcome back, Aarav Sharma</h2>
                  <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Your medical health records dashboard.</p>
                  
                  <div className="grid grid-3" style={{ marginTop: '20px' }}>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Active Prescriptions</span>
                      <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--primary)' }}>1 Medication</div>
                    </div>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Latest Test Results</span>
                      <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', color: 'var(--success)' }}>Lipid Profile</div>
                    </div>
                    <div style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Linked ICD Code</span>
                      <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px', color: 'var(--warning)', fontFamily: 'monospace' }}>I10 Hypertension</div>
                    </div>
                  </div>
                </div>

                {/* Health record details */}
                <div className="card">
                  <h2>My Prescriptions & Reports</h2>
                  <div className="table-container" style={{ marginTop: '16px' }}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Medication</th>
                          <th>Dosage</th>
                          <th>Frequency</th>
                          <th>Duration</th>
                          <th>Instructions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patients[0].prescriptions.map(p => (
                          <tr key={p.id}>
                            <td className="font-semibold">{p.medication}</td>
                            <td>{p.dosage}</td>
                            <td>{p.frequency}</td>
                            <td>{p.duration}</td>
                            <td style={{ color: 'var(--text-muted)' }}>{p.instructions}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right column: Patient Portal Wellness companion chat */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header">
                  <h2>AI Wellness Companion</h2>
                  <span className="badge badge-success">Online AI</span>
                </div>
                <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px 0', fontSize: '11px' }}>
                  <div style={{ alignSelf: 'flex-start', backgroundColor: 'var(--bg-muted)', padding: '8px 12px', borderRadius: '8px' }}>
                    Hi Aarav, how can I assist you with your health today? I can help clarify prescription instructions or diet directions.
                  </div>
                </div>
                <div className="flex gap-sm">
                  <input
                    type="text"
                    placeholder="Ask about diet or medicines..."
                    className="form-input"
                    style={{ height: '32px', fontSize: '11px' }}
                  />
                  <button className="btn btn-primary" style={{ padding: '0 12px', height: '32px' }} onClick={() => addToast('info', "AI Wellness companion is processing...")}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB: ADMIN CONFIG & HR / PAYROLL / AUDIT LOGS
              ========================================== */}
          {activeTab === 'admin' && (
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
                          checked={val}
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
