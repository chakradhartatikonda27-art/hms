import React from 'react';
import { Truck, Navigation, MapPin, Phone, ShieldAlert, Clock, Activity, DollarSign, CheckCircle2, AlertTriangle, UserCheck, HeartPulse, RefreshCw, Smartphone, QrCode, FileText, Send, Radio, BatteryCharging } from 'lucide-react';

export interface AmbulanceModuleProps {
  [key: string]: any;
}

export const AmbulanceModule: React.FC<AmbulanceModuleProps> = (props) => {
  const {
    activeTab = 'ambulance',
    setActiveTab = () => {},
    addToast = () => {},
    patients = [],
    ambulances = [],
    setAmbulances = () => {},
    handleDispatchAmbulance = () => {},
    ...rest
  } = props;

  const [ambTab, setAmbTab] = React.useState<'workflow' | 'fleet_live' | 'dispatch' | 'gps_tracking' | 'paramedic_care' | 'billing_trips' | 'maintenance_fuel' | 'edition_mode' | 'ai_routing' | 'driver_crew'>('workflow');
  const [selectedFleetType, setSelectedFleetType] = React.useState('all');
  const [showDispatchModal, setShowDispatchModal] = React.useState(false);
  const [showParamedicModal, setShowParamedicModal] = React.useState(false);

  // Dispatch Form State
  const [dispatchPatient, setDispatchPatient] = React.useState('Aarav Sharma');
  const [dispatchPickup, setDispatchPickup] = React.useState('Hitech City Metro Station, Gate 2');
  const [dispatchCategory, setDispatchCategory] = React.useState('ALS (Advanced Life Support)');
  const [dispatchPriority, setDispatchPriority] = React.useState('P1 - Critical Sepsis / Cardiac');

  // 10-Step Ambulance Operational Workflow Pipeline Steps
  const ambulancePipelineSteps = [
    { step: 1, title: 'Emergency Call / SOS', icon: '📞', count: 12, desc: 'Call Registration' },
    { step: 2, title: 'AI Nearest Allocation', icon: '🤖', count: 12, desc: 'GPS Proximity' },
    { step: 3, title: 'Driver & Crew Assigned', icon: '👨‍✈️', count: 12, desc: 'Paramedic Match' },
    { step: 4, title: 'Live GPS Navigation', icon: '📍', count: 4, desc: 'Google Maps Traffic' },
    { step: 5, title: 'Patient Pickup', icon: '🏥', count: 4, desc: 'Location Verified' },
    { step: 6, title: 'En-Route Care', icon: '🩺', count: 4, desc: 'Vitals Monitoring' },
    { step: 7, title: 'Hospital Arrival', icon: '🚑', count: 4, desc: 'ER Bay Handover' },
    { step: 8, title: 'Digital Handover', icon: '📱', count: 4, desc: 'EHR Vitals Sync' },
    { step: 9, title: 'Billing & Payment', icon: '💳', count: 4, desc: 'Per-KM / Flat Rate' },
    { step: 10, title: 'Trip Completion', icon: '🏁', count: 128, desc: 'Fleet Reset' }
  ];

  // Active Ambulance Fleet List
  const [fleetList, setFleetList] = React.useState([
    { id: 'AMB-101', plate: 'TS-09-EX-4412', type: 'ALS (Advanced Life Support)', driver: 'Vikram Singh', paramedic: 'Nurse Divya', status: 'Available', fuel: '88%', oxygen: '2x 40L Cylinders', location: 'Emergency Bay 1' },
    { id: 'AMB-102', plate: 'TS-09-EX-8841', type: 'ICU Ventilator Unit', driver: 'Ramesh Babu', paramedic: 'EMT Rajesh', status: 'On Trip', fuel: '74%', oxygen: 'Liquid O2 Tank (92%)', location: 'En-Route Hitech City (ETA 6 mins)' },
    { id: 'AMB-103', plate: 'TS-09-EX-1204', type: 'BLS (Basic Life Support)', driver: 'Suresh Kumar', paramedic: 'N/A', status: 'Available', fuel: '95%', oxygen: '1x 20L Cylinder', location: 'North Branch Bay' },
    { id: 'AMB-104', plate: 'TS-09-EX-9921', type: 'Neonatal Incubator ALS', driver: 'Mohammed Ali', paramedic: 'Sister Leela', status: 'On Trip', fuel: '62%', oxygen: 'Incubator O2 Feed', location: 'Inter-Hospital Transfer (KIMS to SiyanCare)' },
    { id: 'AMB-105', plate: 'TS-09-EX-3310', type: 'Mortuary Transport', driver: 'Kiran V', paramedic: 'N/A', status: 'Under Maintenance', fuel: '40%', oxygen: 'N/A', location: 'Central Service Garage' }
  ]);

  const handleCreateDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newDispatch = {
      id: `TRIP-2026-${Math.floor(800 + Math.random() * 90)}`,
      patient: dispatchPatient,
      pickup: dispatchPickup,
      category: dispatchCategory,
      priority: dispatchPriority,
      ambId: 'AMB-101',
      eta: '8 Mins',
      status: 'Dispatched & En-Route'
    };
    addToast('success', `Dispatched Emergency Ambulance ${newDispatch.ambId} to ${newDispatch.pickup}! ETA: 8 Mins`);
    setShowDispatchModal(false);
  };

  return (
    <div className="flex flex-col gap-lg">
      {/* Ambulance Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.14) 0%, rgba(245, 158, 11, 0.08) 100%)', borderLeft: '6px solid var(--danger)', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🚑 Enterprise Fleet & Emergency Ambulance System (4.16)</span>
              <span className="badge badge-danger" style={{ fontSize: '11px', padding: '4px 10px' }}>⭐ 108 Command & Live GPS Ready</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
              Live GPS Google Maps Tracking, AI Nearest Dispatch, En-Route Paramedic Vital Sync, ICU/Neonatal Fleet, and Distance Billing.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-danger" style={{ fontSize: '12px', fontWeight: 800 }} onClick={() => setShowDispatchModal(true)}>
              🚨 1-Click Emergency Dispatch
            </button>
            <button className="btn btn-secondary" style={{ fontSize: '12px', fontWeight: 700 }} onClick={() => setShowParamedicModal(true)}>
              🩺 Paramedic En-Route Vitals
            </button>
          </div>
        </div>

        {/* 10-Step Ambulance Operational Workflow Pipeline Flow Bar */}
        <div style={{ marginTop: '20px', background: 'var(--bg-card)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--danger)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔄 10-Step Ambulance Emergency Lifecycle Pipeline Flow</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {ambulancePipelineSteps.map((s, idx) => (
              <React.Fragment key={s.step}>
                <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-muted)', border: '1px solid var(--border)', minWidth: '125px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>STEP {s.step}</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, marginTop: '2px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{s.icon}</span>
                    <span>{s.title}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--danger)', marginTop: '4px', fontWeight: 700 }}>{s.count} Active</div>
                </div>

                {idx < ambulancePipelineSteps.length - 1 && (
                  <span style={{ fontSize: '14px', color: 'var(--danger)', fontWeight: 800 }}>➔</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 10 Navigation Sub-Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setAmbTab('workflow')}
            className={`btn ${ambTab === 'workflow' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔄 Emergency Lifecycle Pipeline
          </button>
          <button
            onClick={() => setAmbTab('fleet_live')}
            className={`btn ${ambTab === 'fleet_live' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🚑 Fleet Master & Live Status
          </button>
          <button
            onClick={() => setAmbTab('dispatch')}
            className={`btn ${ambTab === 'dispatch' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🚨 Emergency Dispatch Console
          </button>
          <button
            onClick={() => setAmbTab('gps_tracking')}
            className={`btn ${ambTab === 'gps_tracking' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📍 Live GPS Google Maps Tracking
          </button>
          <button
            onClick={() => setAmbTab('paramedic_care')}
            className={`btn ${ambTab === 'paramedic_care' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🩺 Paramedic App & ER Handover
          </button>
          <button
            onClick={() => setAmbTab('billing_trips')}
            className={`btn ${ambTab === 'billing_trips' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            💳 Per-KM Billing & Digital Trips
          </button>
          <button
            onClick={() => setAmbTab('maintenance_fuel')}
            className={`btn ${ambTab === 'maintenance_fuel' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            ⛽ Fuel, Oxygen & Maintenance
          </button>
          <button
            onClick={() => setAmbTab('driver_crew')}
            className={`btn ${ambTab === 'driver_crew' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            👨‍✈️ Driver & Paramedic Crew Roster
          </button>
          <button
            onClick={() => setAmbTab('edition_mode')}
            className={`btn ${ambTab === 'edition_mode' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🏛️ 108 Govt & Private SaaS Edition
          </button>
          <button
            onClick={() => setAmbTab('ai_routing')}
            className={`btn ${ambTab === 'ai_routing' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🤖 AI Traffic & Nearest Allocation
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: EMERGENCY LIFECYCLE PIPELINE BOARD */}
      {ambTab === 'workflow' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>
            🔄 Active Ambulance Trips Moving Through 10-Step Emergency Pipeline
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Real-time status tracking from initial 108 emergency call registration to AI nearest dispatch, live GPS navigation, and digital ER handover.
          </p>

          <div className="table-container">
            <table className="data-table" style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Vehicle ID</th>
                  <th>Ambulance Type</th>
                  <th>Assigned Crew</th>
                  <th>Fuel & O2 Levels</th>
                  <th>Current Location / ETA</th>
                  <th>Fleet Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fleetList.map((f) => (
                  <tr key={f.id}>
                    <td className="font-semibold">{f.id} ({f.plate})</td>
                    <td><span className="badge badge-primary">{f.type}</span></td>
                    <td>
                      <div style={{ fontWeight: 700 }}>Driver: {f.driver}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Staff: {f.paramedic}</div>
                    </td>
                    <td>
                      <div>⛽ Fuel: {f.fuel}</div>
                      <div style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 700 }}>💨 {f.oxygen}</div>
                    </td>
                    <td>{f.location}</td>
                    <td>
                      <span className={`badge ${f.status === 'Available' ? 'badge-success' : f.status === 'On Trip' ? 'badge-warning' : 'badge-danger'}`}>
                        {f.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '2px 6px', fontSize: '10px' }} onClick={() => addToast('info', `Tracking Live GPS for ${f.id}`)}>
                        📍 Live GPS Map
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: FLEET MASTER & LIVE STATUS */}
      {ambTab === 'fleet_live' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🚑 Ambulance Fleet Master Registry & Availability</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Basic Life Support (BLS), Advanced Life Support (ALS), ICU Ventilator Units, Neonatal Incubators, and Mortuary Vans.</p>
          
          <div className="grid grid-3" style={{ gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '10px', borderLeft: '4px solid var(--success)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Available & Ready</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--success)', marginTop: '4px' }}>2 Units</div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Stationed at Main Bay & North Branch Bay.</p>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '10px', borderLeft: '4px solid var(--warning)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Active On Trip</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--warning)', marginTop: '4px' }}>2 Units</div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>ICU Ventilator Unit & Neonatal Transfer active.</p>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '10px', borderLeft: '4px solid var(--danger)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Under Garage Maintenance</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--danger)', marginTop: '4px' }}>1 Unit</div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Mortuary Transport routine brake service.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: EMERGENCY DISPATCH CONSOLE */}
      {ambTab === 'dispatch' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--danger)', marginBottom: '12px' }}>🚨 1-Click Emergency Ambulance Dispatch Console</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>AI proximity engine selects the nearest available vehicle and dispatches driver & paramedic in under 30 seconds.</p>

          <form onSubmit={handleCreateDispatch} className="grid grid-2" style={{ gap: '14px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Patient Name / Caller Name</label>
              <input type="text" className="form-input" required value={dispatchPatient} onChange={(e) => setDispatchPatient(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Pickup Location Address / GPS Coordinates</label>
              <input type="text" className="form-input" required value={dispatchPickup} onChange={(e) => setDispatchPickup(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Required Vehicle Category</label>
              <select className="form-input" value={dispatchCategory} onChange={(e) => setDispatchCategory(e.target.value)}>
                <option value="ALS (Advanced Life Support)">ALS (Advanced Life Support)</option>
                <option value="ICU Ventilator Unit">ICU Ventilator Unit</option>
                <option value="BLS (Basic Life Support)">BLS (Basic Life Support)</option>
                <option value="Neonatal Incubator ALS">Neonatal Incubator ALS</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '12px', fontWeight: 700 }}>Emergency Priority Level</label>
              <select className="form-input" value={dispatchPriority} onChange={(e) => setDispatchPriority(e.target.value)}>
                <option value="P1 - Critical Sepsis / Cardiac">P1 - Critical Sepsis / Cardiac</option>
                <option value="P2 - Severe Trauma / Road Accident">P2 - Severe Trauma / Road Accident</option>
                <option value="P3 - Routine Hospital Transfer">P3 - Routine Hospital Transfer</option>
              </select>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <button type="submit" className="btn btn-danger" style={{ width: '100%', padding: '12px', fontWeight: 800, fontSize: '13px' }}>
                🚀 Dispatch Nearest Ambulance Instantly (AI Match AMB-101)
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUB-TAB 4: LIVE GPS GOOGLE MAPS TRACKING */}
      {ambTab === 'gps_tracking' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📍 Live GPS Google Maps Vehicle Location & Route History</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Real-time location, speed monitoring (&lt; 80 km/h limit), geofencing, and ETA calculation.</p>
          
          <div style={{ height: '320px', background: '#1E293B', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
            <MapPin size={48} style={{ color: 'var(--danger)', marginBottom: '10px' }} />
            <h4 style={{ fontSize: '16px', fontWeight: 800 }}>LIVE GPS SATELLITE MAP RENDERER</h4>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>Active Vehicle: AMB-102 (TS-09-EX-8841) • Speed: 62 km/h • ETA to ER: 6 Mins</div>
            <span className="badge badge-success" style={{ marginTop: '12px', fontSize: '11px' }}>● Live Signal 100% Active</span>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: PARAMEDIC APP & ER HANDOVER */}
      {ambTab === 'paramedic_care' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🩺 Paramedic Mobile App & Digital ER Handover</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>En-route patient vital signs entry (SpO2, Pulse, BP, ECG), oxygen therapy, and pre-arrival ER alert.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => addToast('success', 'Synced En-Route Vitals (BP 120/80, SpO2 98%) with ER Trauma Team!')}>
            🩺 Sync En-Route Vitals to ER Trauma Room
          </button>
        </div>
      )}

      {/* SUB-TAB 6: PER-KM BILLING & DIGITAL TRIPS */}
      {ambTab === 'billing_trips' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>💳 Distance-Based & Flat Rate Ambulance Billing</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Automated distance computation via GPS odometer, emergency surgeon surcharge, and insurance claims.</p>
          
          <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '8px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Base Emergency Charge (ALS Unit):</span><strong>₹1,500</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}><span>Distance Traveled (18.4 km @ ₹35/km):</span><strong>₹644</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}><span>En-Route Oxygen & Ventilator Usage:</span><strong>₹850</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '8px', fontWeight: 800, fontSize: '15px', color: 'var(--primary)' }}>
              <span>Total Ambulance Trip Invoice:</span><span>₹2,994</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: FUEL, OXYGEN & MAINTENANCE */}
      {ambTab === 'maintenance_fuel' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>⛽ Fuel Consumption, Oxygen Cylinder Tracking & Preventive Service</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Diesel fuel logs, defibrillator calibration schedules, and medical gas cylinder pressure alerts.</p>
          <button className="btn btn-secondary" style={{ fontSize: '12px' }} onClick={() => addToast('info', 'Logged Fuel Fill for AMB-101: 45 Liters Diesel (₹4,050)')}>
            ⛽ Log Fuel Refill Voucher
          </button>
        </div>
      )}

      {/* SUB-TAB 8: DRIVER & PARAMEDIC CREW ROSTER */}
      {ambTab === 'driver_crew' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>👨‍✈️ Driver & Paramedic Crew Shift Roster</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>24/7 emergency shift rosters for heavy vehicle drivers, EMT paramedics, and emergency nurses.</p>
          <div style={{ padding: '14px', background: 'var(--bg-muted)', borderRadius: '8px', fontSize: '12px' }}>
            <div>• <strong>Morning Shift:</strong> Vikram Singh (Driver) & Nurse Divya (Paramedic)</div>
            <div>• <strong>Night Shift:</strong> Ramesh Babu (Driver) & EMT Rajesh (Paramedic)</div>
          </div>
        </div>
      )}

      {/* SUB-TAB 9: 108 GOVT & PRIVATE SAAS EDITIONS */}
      {ambTab === 'edition_mode' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🏛️ Multi-Hospital & Government 108 Emergency Network Edition</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Support for multi-control room dispatch, multi-city fleet management, and SLA compliance monitoring.</p>
          <button className="btn btn-primary" style={{ fontSize: '12px' }} onClick={() => addToast('info', 'Switched to Government 108 Multi-Control Room Dispatch Mode')}>
            🏛️ Activate 108 Command Center View
          </button>
        </div>
      )}

      {/* SUB-TAB 10: AI TRAFFIC & NEAREST ALLOCATION */}
      {ambTab === 'ai_routing' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🤖 AI Traffic Prediction & Smart Route Optimization</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>AI algorithms analyze live traffic congestion and suggest fastest green corridor routes.</p>
          <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--success)' }}>⚡ AI Optimized Green Corridor Route Suggested</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Avoided Outer Ring Road due to construction delay. Alternative route via ORR Flyover saves 11 minutes (ETA reduced to 7 mins).
            </p>
          </div>
        </div>
      )}

      {/* DISPATCH MODAL */}
      {showDispatchModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '480px', maxWidth: '90%' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--danger)' }}>🚨 Emergency Ambulance Dispatch</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Instantly allocate nearest available ambulance unit.</p>
            
            <div style={{ margin: '14px 0', fontSize: '12px', lineHeight: '1.6' }}>
              <div>• <strong>Caller:</strong> {dispatchPatient}</div>
              <div>• <strong>Location:</strong> {dispatchPickup}</div>
              <div>• <strong>Nearest Unit:</strong> AMB-101 (ALS Unit - 1.4 km away)</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary" onClick={() => setShowDispatchModal(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleCreateDispatch} style={{ fontWeight: 800 }}>
                🚀 Confirm & Dispatch AMB-101
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
