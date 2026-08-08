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
  age: number | string;
  gender: string;
  phone?: string;
  bloodType?: string;
  bloodGroup?: string;
  allergies?: any;
  diagnosis?: string;
  esiScore?: number;
  vitals?: any;
  visits?: PatientVisit[];
  prescriptions?: Prescription[];
  labResults?: LabResult[];
  bedNumber?: string;
  status?: string;
  totalBill?: number;
  paidBill?: number;
  refDoctor?: string;
  mrdCode?: string;
  linkedIcdCode?: string;
  fluidLogs?: FluidLog[];
  emarRecords?: EmarRecord[];
  gcsTotal?: number;
}

export interface Bed {
  id: string;
  number?: string;
  wardType?: string;
  dailyRate?: number;
  status: 'occupied' | 'vacant' | 'maintenance' | string;
  patientId?: string;
  patientName?: string;
  admissionDate?: string;
  assignedNurse?: string;
  oxyLevel?: number;
  ventilatorMode?: string;
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
  modality: string;
  studyName: string;
  priority: string;
  prepStatus: string;
  requestedBy: string;
  date: string;
  status: string;
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
