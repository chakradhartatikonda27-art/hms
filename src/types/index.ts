export type BranchId = 'metro' | 'north' | 'south';

export type UserRole = 
  | 'doctor' 
  | 'anesthetist'
  | 'nurse' 
  | 'receptionist' 
  | 'lab_tech' 
  | 'pharmacist' 
  | 'accountant' 
  | 'admin';

export type AppTab = 
  | 'dashboard' 
  | 'registration' 
  | 'appointments'
  | 'consultation' 
  | 'wards' 
  | 'icu' 
  | 'ot'
  | 'lab' 
  | 'radiology'
  | 'pharmacy' 
  | 'bloodbank'
  | 'billing' 
  | 'admin';

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface LabResult {
  id: string;
  testName: string;
  category: string;
  requestedDate: string;
  status: 'pending' | 'processing' | 'completed';
  resultValue?: string;
  referenceRange?: string;
  findings?: string;
  verifiedBy?: string;
  refDoctorShare?: number;
}

export interface PatientVisit {
  id: string;
  date: string;
  department: string;
  doctor: string;
  reason: string;
  notes: string;
}

export interface FluidLog {
  id: string;
  timestamp: string;
  intakeIv: number;
  intakeOral: number;
  outputUrine: number;
  outputDrain: number;
}

export interface EmarRecord {
  id: string;
  medication: string;
  dosage: string;
  route: string;
  scheduledTime: string;
  status: 'pending' | 'administered' | 'refused';
  administeredAt?: string;
  administeredBy?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  bloodType: string;
  allergies: string[];
  diagnosis: string;
  vitals: {
    bp: string;
    pulse: number;
    temp: number;
    spO2: number;
  };
  visits: PatientVisit[];
  prescriptions: Prescription[];
  labResults: LabResult[];
  bedNumber?: string;
  status: 'admitted' | 'discharged' | 'in-consultation' | 'waiting' | 'pathology-pending' | 'pharmacy-pending' | 'opd-completed';
  totalBill: number;
  paidBill: number;
  pendingBill: number;
  branch: BranchId;
  mrdCode?: string;
  esiScore?: number;
  chiefComplaints?: { complaint: string; duration: string }[];
  pregnancyStatus?: boolean;
  systemicExam?: {
    cvs: string;
    rs: string;
    git: string;
    cns: string;
  };
  gcsEye?: number;
  gcsVerbal?: number;
  gcsMotor?: number;
  gcsScore?: number;
  fluidLogs?: FluidLog[];
  emarList?: EmarRecord[];
}

export interface Bed {
  id: string;
  number: string;
  wardType: 'general' | 'private' | 'icu' | 'vip';
  status: 'occupied' | 'available' | 'maintenance';
  patientId?: string;
  patientName?: string;
  dailyRate: number;
  npoStatus?: boolean;
  fallRisk?: 'Low' | 'Moderate' | 'High';
  isolationTag?: string;
}

export interface ExpenseRecord {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  vendor: string;
  approvedBy: string;
  receiptNumber: string;
  branch: BranchId;
}

export interface RadiologyStudy {
  id: string;
  patientName: string;
  modality: 'X-Ray' | 'CT' | 'MRI' | 'USG' | 'Echo' | 'Mammography';
  studyName: string;
  priority: 'Routine' | 'Urgent' | 'STAT';
  prepStatus: string;
  requestedBy: string;
  date: string;
  status: 'Order Placed' | 'Patient Prepared' | 'Imaging Completed' | 'PACS Captured' | 'Awaiting Sign-off' | 'Report Signed Off';
  formFSigned: boolean;
  criticalFlag: boolean;
}

export interface MedicineMaster {
  id: string;
  brand: string;
  generic: string;
  composition: string;
  schedule: string;
  hsn: string;
  gst: number;
  mrp: number;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  expiry: string;
}

export interface StoreBranch {
  id: string;
  name: string;
  type: string;
  location: string;
  stockValue: string;
  manager: string;
}
