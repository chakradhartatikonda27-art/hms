import React from 'react';
import type { MedicineMaster, StoreBranch, Patient } from '../../types';

interface PharmacyModuleProps {
  pmsEdition: 'hospital' | 'retail' | 'chain';
  setPmsEdition: (edition: 'hospital' | 'retail' | 'chain') => void;
  pmsSubTab: string;
  setPmsSubTab: (tab: any) => void;
  pharmacyLanguage: string;
  setPharmacyLanguage: (lang: any) => void;
  pharmacyDeptFilter: string;
  setPharmacyDeptFilter: (filter: string) => void;
  otcBillForm: { customerName: string; medicine: string; qty: string; price: string };
  setOtcBillForm: (form: any) => void;
  handleOtcBillSubmit: (e: React.FormEvent) => void;
  setPharmacyReceiptData: (data: any) => void;
  setShowPharmacyReceiptModal: (show: boolean) => void;
  setShowVoiceBillingModal: (show: boolean) => void;
  setShowOcrModal: (show: boolean) => void;
  setPmsHoldBills: React.Dispatch<React.SetStateAction<any[]>>;
  pmsHoldBills: any[];
  pmsMedicines: MedicineMaster[];
  setPmsMedicines: React.Dispatch<React.SetStateAction<MedicineMaster[]>>;
  pmsStores: StoreBranch[];
  setPmsStores: React.Dispatch<React.SetStateAction<StoreBranch[]>>;
  patients: Patient[];
  getDosageInstruction: (med: string, lang: string) => string;
  handleDispenseMeds: (patientId: string) => void;
  addToast: (type: any, msg: string) => void;
}

export const PharmacyModule: React.FC<PharmacyModuleProps> = ({
  pmsEdition,
  setPmsEdition,
  pmsSubTab,
  setPmsSubTab,
  pharmacyLanguage,
  setPharmacyLanguage,
  pharmacyDeptFilter,
  setPharmacyDeptFilter,
  otcBillForm,
  setOtcBillForm,
  handleOtcBillSubmit,
  setPharmacyReceiptData,
  setShowPharmacyReceiptModal,
  setShowVoiceBillingModal,
  setShowOcrModal,
  setPmsHoldBills,
  pmsHoldBills,
  pmsMedicines,
  setPmsMedicines,
  pmsStores,
  setPmsStores,
  patients,
  getDosageInstruction,
  handleDispenseMeds,
  addToast,
}) => {
  return (
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
    </div>
  );
};
