# 🏥 SiyanCare Enterprise Hospital Management System (HMS)

SiyanCare is a state-of-the-art, multi-tenant, cloud-native Enterprise Hospital Operating System and SaaS platform designed for single clinics, specialty hospitals, multi-city hospital chains, and government healthcare networks.

Built with a modular React + TypeScript architecture, SiyanCare provides seamless end-to-end integration across clinical, operational, diagnostic, financial, administrative, and AI-driven predictive intelligence domains.

---

## 📚 Module Index

1. [Executive Dashboard Hub](#1-executive-dashboard-hub)
2. [Patient Registration & Reception](#2-patient-registration--reception)
3. [OPD & Appointment Management](#3-opd--appointment-management)
4. [Doctor Consultation & EMR](#4-doctor-consultation--emr)
5. [IPD & Ward Bed Management](#5-ipd--ward-bed-management)
6. [ICU & High Dependency Unit Telemetry](#6-icu--high-dependency-unit-telemetry)
7. [Operation Theatre (OT) & Anaesthesia](#7-operation-theatre-ot--anaesthesia)
8. [Pathology & Clinical Diagnostics (NABL)](#8-pathology--clinical-diagnostics-nabl)
9. [Radiology & PACS Imaging](#9-radiology--pacs-imaging)
10. [Blood Bank & Component Registry](#10-blood-bank--component-registry)
11. [Pharmacy & Point of Sale (POS)](#11-pharmacy--point-of-sale-pos)
12. [Vaccination & Immunization Tracking](#12-vaccination--immunization-tracking)
13. [Inventory & Medical Consumables Supply Chain](#13-inventory--medical-consumables-supply-chain)
14. [4.10 Medical Records Department (MRD)](#14-410-medical-records-department-mrd)
15. [4.11 Patient & Enterprise Billing](#15-411-patient--enterprise-billing)
16. [4.12 Expense & Unit Cost Management](#16-412-expense--unit-cost-management)
17. [4.13 AI Insights & Clinical Intelligence](#17-413-ai-insights--clinical-intelligence)
18. [4.14 Employee HR & Payroll](#18-414-employee-hr--payroll)
19. [4.15 MIS Reporting & Live Command Center](#19-415-mis-reporting--live-command-center)
20. [4.16 Ambulance & Emergency Fleet Dispatch](#20-416-ambulance--emergency-fleet-dispatch)
21. [4.17 Insurance & TPA Management Engine](#21-417-insurance--tpa-management-engine)
22. [Patient & Family Portal](#22-patient--family-portal)
23. [System Administration & RBAC](#23-system-administration--rbac)

---

## 🛠️ Detailed Module Specifications

### 1. Executive Dashboard Hub
* **Overview**: The central operational command hub providing real-time KPI metrics, clinical alerts, and 1-click navigation across all hospital departments.
* **Key Actions & Capabilities**:
  * Displays live bed occupancy rates, daily revenue collections, active emergency admissions, and pending lab tests.
  * Provides quick-launcher shortcuts for fast patient intake, emergency triage, and prescription issuing.
  * Filters operational analytics by hospital branch (Metro Hub, North Clinic, South Specialty).
  * Real-time notifications for critical lab panic values and emergency ambulance calls.

### 2. Patient Registration & Reception
* **Overview**: Manages the 360° intake lifecycle of OPD, IPD, Emergency, and International patients with universal Digital UHID generation.
* **Key Actions & Capabilities**:
  * Instant generation of unique 10-digit Digital UHID cards with barcode/QR integration.
  * Captures demographic details, emergency contacts, insurance policies, and blood groups.
  * 1-Click print function for physical patient wristbands and registration slips.
  * Captures initial triage vital signs (BP, Pulse, Temperature, SpO2, Respiratory Rate).

### 3. OPD & Appointment Management
* **Overview**: Manages doctor schedules, walk-in queues, digital token issuance, and tele-consultation video links.
* **Key Actions & Capabilities**:
  * Real-time token display queue with estimated wait-time calculation.
  * Doctor availability calendar with multi-shift roster alignment.
  * Automated WhatsApp & SMS appointment confirmation notifications.
  * Integrated HD video conferencing links for remote telemedicine consultations.

### 4. Doctor Consultation & EMR
* **Overview**: A clinical workstation for doctors featuring WHO ICD-10/11 AI diagnostic assistant, voice-to-text typing, and e-prescriptions.
* **Key Actions & Capabilities**:
  * AI-assisted disease diagnosis lookup using WHO ICD-10/11 clinical taxonomy.
  * Voice-to-text clinical dictation for fast history taking and physical examination notes.
  * E-Prescription generator with automated drug-to-drug interaction and allergy warning checks.
  * Direct order placement for Pathology lab tests, Radiology imaging scans, and IPD ward transfers.

### 5. IPD & Ward Bed Management
* **Overview**: Digital floor plan grid managing bed admissions, transfers, nursing flowsheets, and discharge planning.
* **Key Actions & Capabilities**:
  * Visual color-coded bed map showing Available, Occupied, Under Cleaning, and Reserved beds.
  * Digital nursing flowsheets for hourly vital recording, medication administration, and fluid intake/output balance.
  * Doctor daily ward visit logs and clinical progress note entry.
  * Streamlined bed transfer workflows between General Wards, Semi-Private, Deluxe, and ICU suites.

### 6. ICU & High Dependency Unit Telemetry
* **Overview**: Specialized critical care monitoring system tracking continuous vital telemetry, mechanical ventilator parameters, and Sepsis risk.
* **Key Actions & Capabilities**:
  * Live vital wave-form simulations (ECG, Arterial Line, SpO2, EtCO2).
  * Mechanical ventilator setting management (PEEP, FiO2, Tidal Volume, Mode).
  * Automated qSOFA and APACHE II Sepsis risk score calculations with early warning popups.
  * Arterial Blood Gas (ABG) analysis calculator and central venous line infection tracking.

### 7. Operation Theatre (OT) & Anaesthesia
* **Overview**: End-to-end surgical suite management covering surgery scheduling, WHO surgical safety checklists, and intra-operative anaesthesia logs.
* **Key Actions & Capabilities**:
  * Multi-OT room scheduling with surgeon, anesthetist, scrub nurse, and equipment allocation.
  * Mandatory WHO 3-stage Surgical Safety Checklist enforcement (Sign In, Time Out, Sign Out).
  * Real-time intra-operative anaesthesia monitoring log recording drug boluses and gas flows.
  * Post-operative recovery room (PACU) handover checklists and Aldrete scoring.

### 8. Pathology & Clinical Diagnostics (NABL)
* **Overview**: NABL-compliant diagnostic laboratory engine handling sample barcoding, analyzer interfacing, critical value alerts, and digital signatures.
* **Key Actions & Capabilities**:
  * Automated specimen barcode generation (Blood, Urine, Tissue, Swabs).
  * Real-time panic value alerts notifying attending doctors of life-threatening lab results.
  * Multi-level report verification workflow (Technician ➔ Senior Pathologist Approval).
  * Cryptographic SHA-256 digital signature embedding on PDF report downloads.

### 9. Radiology & PACS Imaging
* **Overview**: DICOM-compliant radiology workflow system supporting X-Ray, CT, MRI, Ultrasound, and PNDT Form-F compliance.
* **Key Actions & Capabilities**:
  * Integrated DICOM image viewer with multi-planar reconstruction (MPR) and windowing tools.
  * Statutory Pre-Conception & Pre-Natal Diagnostic Techniques (PNDT) Form-F mandatory digital filing.
  * STAT priority flagging for trauma and stroke CT/MRI scans.
  * Voice-enabled radiology reporting template engine for fast transcription.

### 10. Blood Bank & Component Registry
* **Overview**: Complete donor registry and blood component inventory system tracking Whole Blood, Packed Red Blood Cells (PRBC), Platelets, and FFP.
* **Key Actions & Capabilities**:
  * Real-time stock matrix organized by blood group (A+, B+, O+, AB+, Negative types) and expiry date.
  * Cross-matching compatibility verification workflow before blood bag dispatch.
  * Voluntary blood donor registry with automated eligibility donation date reminders.
  * Adverse blood transfusion reaction logging and reporting.

### 11. Pharmacy & Point of Sale (POS)
* **Overview**: Touch-friendly pharmacy POS operating as both an integrated HMS module and a standalone retail/chain pharmacy product.
* **Key Actions & Capabilities**:
  * First-Expiry-First-Out (FEFO) batch tracking to eliminate medicine expiry losses.
  * Optical Character Recognition (OCR) scanner for instant paper prescription parsing.
  * Voice-activated medicine search and fast cashier billing.
  * GST-compliant tax invoicing and Schedule H1 narcotic drug register logging.

### 12. Vaccination & Immunization Tracking
* **Overview**: Pediatric and adult immunization tracking with automated WHO vaccine schedule reminders.
* **Key Actions & Capabilities**:
  * Automated age-based pediatric immunization chart generation from birth date.
  * Cold chain storage temperature tracking (2°C - 8°C) for vaccine vials.
  * SMS and WhatsApp milestone reminders sent to parents for upcoming booster doses.
  * Digital vaccination certificates with QR verification.

### 13. Inventory & Medical Consumables Supply Chain
* **Overview**: Enterprise inventory management handling purchase requisitions, supplier POs, GRN inspection, and department stock issues.
* **Key Actions & Capabilities**:
  * Minimum stock re-order level triggers with auto-generated Purchase Orders (POs).
  * Goods Receipt Note (GRN) quality inspection and batch quantity reconciliation.
  * Departmental stock indent request and approval workflows.
  * Real-time tracking of high-value surgical implants and consumables.

### 14. 4.10 Medical Records Department (MRD)
* **Overview**: Complete paperless electronic health record archive, WHO ICD-10/11 coding assistant, and Release of Information (ROI) sharing desk.
* **Key Actions & Capabilities**:
  * 8-Step MRD record lifecycle (Inpatient Discharge ➔ Coding ➔ Defect Audit ➔ Archival).
  * Chronological 360° patient timeline consolidating all IPD, OPD, Lab, and OT files into a unified master dossier.
  * WHO ICD-10/11 search assistant for accurate medical record indexing.
  * Encrypted 72-hour temporary link generator for external medico-legal and insurance sharing.

### 15. 4.11 Patient & Enterprise Billing
* **Overview**: Unified billing engine handling OPD registration fees, IPD interim bills, package bills, and referral doctor commissions.
* **Key Actions & Capabilities**:
  * 9-Step Billing Pipeline (Registration ➔ Package Estimate ➔ Advance ➔ Charge Accumulation ➔ Audit ➔ Final Bill).
  * Multi-mode payment processing (Cash, Credit Card, UPI, Net Banking, Split Payments).
  * Surgical and maternity package cost estimator and variance tracker.
  * Referral doctor commission calculation and revenue sharing reports.

### 16. 4.12 Expense & Unit Cost Management
* **Overview**: Operational expense tracking system calculating cost per patient, cost per bed per day, and cost per surgery.
* **Key Actions & Capabilities**:
  * AI-powered OCR receipt scanner for instant vendor invoice expense capture.
  * Multi-level role-based approval matrix for high-value petty cash and operational expenses.
  * Unit cost allocation models analyzing department-wise overheads (Electricity, Maintenance, Reagents).
  * Real-time Net Operating Income (NOI) calculations.

### 17. 4.13 AI Insights & Clinical Intelligence
* **Overview**: AI engine featuring executive clinical summaries, personalized AI diet generators, smart appointment matching, 24/7 patient chatbot, and ML predictive models.
* **Key Actions & Capabilities**:
  * Machine learning prediction models for Sepsis onset, 30-day readmission risk, and seasonal Dengue outbreaks.
  * Automated condition-specific AI diet management plan generator (Diabetic, Renal, Cardiac).
  * 24/7 conversational AI patient assistance chatbot for appointment booking and report status inquiries.
  * Natural language executive query engine ("Show OPD revenue for August").

### 18. 4.14 Employee HR & Payroll
* **Overview**: Healthcare human resource management featuring face recognition and GPS attendance, digital QR employee ID cards, medical license expiry tracking, and payroll processing.
* **Key Actions & Capabilities**:
  * Geo-fenced mobile GPS and AI face recognition attendance marking.
  * Instant generation of digital employee QR ID cards with emergency blood group tags.
  * Automated tracking of doctor and nurse medical council registration license expiry dates.
  * Monthly payroll calculator with PF, ESI, overtime, shift allowance, and tax deductions.

### 19. 4.15 MIS Reporting & Live Command Center
* **Overview**: Enterprise data warehouse pipeline providing TV Command Center display mode, Red/Amber/Green KPI indicators, and NABH compliance audit bundles.
* **Key Actions & Capabilities**:
  * 7-Step Data Warehouse pipeline transforming raw operational logs into executive dashboards.
  * Full-screen TV Command Center mode for hospital boardrooms and control rooms with 10s live refresh.
  * NABH & JCI quality indicator reporting (ALOS, Hospital Acquired Infection rate, Surgical Site Infection rate).
  * Drag-and-drop custom report builder with Excel and PDF export options.

### 20. 4.16 Ambulance & Emergency Fleet Dispatch
* **Overview**: Fleet management console featuring live GPS Google Maps tracking, 1-click AI proximity dispatch, paramedic vital sync, and per-km distance billing.
* **Key Actions & Capabilities**:
  * 10-Step Emergency Dispatch Pipeline from emergency call intake to digital hospital handover.
  * AI proximity engine identifying and dispatching the nearest available vehicle in under 30 seconds.
  * Real-time GPS satellite map tracking with speed monitoring and ETA calculation.
  * En-route paramedic mobile app syncing live patient vitals with the receiving ER trauma team.

### 21. 4.17 Insurance & TPA Management Engine
* **Overview**: Cashless admissions portal, online pre-authorization engine, Ayushman Bharat (PMJAY) scheme management, TPA SLA monitoring, and AI fraud rejection predictor.
* **Key Actions & Capabilities**:
  * 11-Step Claim Lifecycle Pipeline (Verification ➔ Pre-Auth ➔ Charge Capture ➔ Claim Gen ➔ Settlement).
  * Direct online pre-authorization submission to Star Health, FHPL, and Medi Assist portals.
  * 100% cashless package mapping for PMJAY, CGHS, and ECHS government health schemes.
  * AI rejection predictor analyzing pre-auth documents to flag missing files and achieve 98% approval rates.

### 22. Patient & Family Portal
* **Overview**: Self-service portal enabling patients to view medical records, download diagnostic lab reports, pay outstanding bills, and schedule doctor visits.
* **Key Actions & Capabilities**:
  * Mobile-responsive patient dashboard with secure OTP login.
  * Direct access to historical discharge summaries, OPD prescriptions, and radiology DICOM links.
  * Online bill settlement via UPI, Credit Card, and Net Banking.
  * Family member profile linking under a single master account.

### 23. System Administration & RBAC
* **Overview**: System configuration suite governing multi-tenant settings, role-based access control (RBAC), and security audit logs.
* **Key Actions & Capabilities**:
  * Granular role permission matrix (Admin, Doctor, Nurse, Anesthetist, Receptionist, Pharmacist, Lab Tech, Accountant).
  * Global feature flag toggles to enable or disable specific modules per hospital branch.
  * Immutable audit log tracking user logins, record modifications, and data exports.
  * System backup management and security compliance enforcement.

---

## 🛠️ Technology Stack

* **Frontend Framework**: React 19 + TypeScript
* **Styling & Design System**: Vanilla CSS3 (Custom CSS Tokens, Dark Mode, Glassmorphism, Micro-animations)
* **Iconography**: Lucide React Icons
* **Build System**: Vite 8 + TypeScript Compiler (`tsc -b`)
* **Deployment Platform**: Vercel Cloud Architecture
