import React from 'react';
import { Sparkles, Bot, Calendar, Utensils, TrendingUp, AlertTriangle, FileText, Send, Activity, Brain, ShieldCheck, Heart, User, CheckCircle2, RefreshCw } from 'lucide-react';

export interface AiInsightsModuleProps {
  [key: string]: any;
}

export const AiInsightsModule: React.FC<AiInsightsModuleProps> = (props) => {
  const {
    activeTab = 'ai_insights',
    setActiveTab = () => {},
    addToast = () => {},
    patients = [],
    setPatients = () => {},
    branchPatients = [],
    computedPredictions = {},
    handleSendAIChat = () => {},
    ...rest
  } = props;

  const [aiTab, setAiTab] = React.useState<'reports' | 'diet' | 'booking' | 'chatbot' | 'ml_predictions'>('reports');
  const [chatMessages, setChatMessages] = React.useState([
    { sender: 'bot', text: 'Hello! I am your HexenCare AI Health & Hospital Assistant. How can I help you today? You can ask me to book appointments, generate diet plans, or check lab report status.' }
  ]);
  const [userQuery, setUserQuery] = React.useState('');
  const [selectedPatientForDiet, setSelectedPatientForDiet] = React.useState('PX-2026-9041');
  const [generatedDietPlan, setGeneratedDietPlan] = React.useState<any>(null);

  // ML Predictions Mock Data
  const mlPredictionsData = [
    { metric: '30-Day IPD Readmission Risk', value: '14.2%', riskLevel: 'Low Risk', recommendation: 'Schedule Follow-up Call in 7 Days' },
    { metric: 'ICU Bed Demand (Next 7 Days)', value: '88% Occupancy', riskLevel: 'High Demand', recommendation: 'Reserve 2 Step-Down Beds in Ward B' },
    { metric: 'Patient Sepsis Deterioration Risk', value: '3.1%', riskLevel: 'Stable', recommendation: 'Routine Telemetry Vitals Monitoring' },
    { metric: 'Seasonal Dengue Outbreak Velocity', value: '+ 18% Spike', riskLevel: 'Watch Alert', recommendation: 'Stock Extra IV Fluids & Platelet Packs' }
  ];

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user', text: userQuery }];
    setChatMessages(newMsgs);
    const q = userQuery.toLowerCase();
    setUserQuery('');

    setTimeout(() => {
      let botReply = 'I have processed your request. Is there anything else I can assist you with regarding hospital services?';
      if (q.includes('book') || q.includes('appointment') || q.includes('doctor')) {
        botReply = '📅 AI Appointment Matcher: Found open slot for Dr. Sandeep Mehta (Cardiology) tomorrow at 10:30 AM. Would you like me to confirm booking?';
      } else if (q.includes('diet') || q.includes('food') || q.includes('nutrition')) {
        botReply = '🥗 AI Diet Engine: Generated Low-Sodium Cardiac Diet Plan (1,800 kcal) tailored for patient hypertension profile.';
      } else if (q.includes('report') || q.includes('lab') || q.includes('blood')) {
        botReply = '🔬 Lab Report Status: NABL Blood Test Report #LAB-BILL-301 for Aarav Sharma is VERIFIED and COMPLETED.';
      }
      setChatMessages([...newMsgs, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  const handleGenerateDiet = () => {
    setGeneratedDietPlan({
      title: 'Cardiac & Diabetic Tailored Medical Diet Plan',
      calories: '1,800 kcal / day',
      macros: 'Carbs 50% | Protein 25% | Healthy Fats 25%',
      breakfast: 'Oatmeal with almonds & flaxseeds + Skimmed milk (Low GI)',
      lunch: 'Brown Rice / Whole Wheat Roti + Dal + Boiled Vegetables & Spinach',
      snacks: 'Walnuts + Roasted Chana + Green Tea',
      dinner: 'Grilled Paneer / Fish + Mixed Vegetable Soup (Low Sodium < 2g Salt)',
      restrictions: '🚫 Avoid Refined Sugar, Trans Fats, Excess Salt, & Carbonated Drinks.'
    });
    addToast('success', 'AI Generated Custom Diet Management Plan for Patient!');
  };

  return (
    <div className="flex flex-col gap-lg">
      {/* AI Insights Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.12) 0%, rgba(37, 99, 235, 0.08) 100%)', borderLeft: '6px solid #9333EA', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🤖 AI Insights & ML Clinical Intelligence (4.13)</span>
              <span className="badge badge-primary" style={{ fontSize: '11px', padding: '4px 10px', background: '#9333EA' }}>Deep Learning & Predictive Analytics</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
              Customized AI Reports, AI Diet Plans, AI-Powered Appointment Booking, 24/7 Patient Chatbot, and ML Future Predictions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-success" style={{ fontSize: '12px', padding: '6px 12px' }}>⚡ Powered by Gemini Medical LLM</span>
          </div>
        </div>

        {/* 5 AI Sub-Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setAiTab('reports')}
            className={`btn ${aiTab === 'reports' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📊 Customised AI Reports
          </button>
          <button
            onClick={() => setAiTab('diet')}
            className={`btn ${aiTab === 'diet' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🥗 AI Diet Management Plans
          </button>
          <button
            onClick={() => setAiTab('booking')}
            className={`btn ${aiTab === 'booking' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            📅 AI Appointment Matcher
          </button>
          <button
            onClick={() => setAiTab('chatbot')}
            className={`btn ${aiTab === 'chatbot' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            💬 24/7 Patient Assistance Chatbot
          </button>
          <button
            onClick={() => setAiTab('ml_predictions')}
            className={`btn ${aiTab === 'ml_predictions' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}
          >
            🔮 ML Future Predictions & Risk Models
          </button>
        </div>
      </div>

      {/* PILLAR 1: CUSTOMISED AI REPORTS */}
      {aiTab === 'reports' && (
        <div className="grid gap-lg" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="card">
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📊 Executive Clinical AI Summary Report</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>AI-generated synthesis of hospital operational throughput, bed turnover rates, and clinical outcomes.</p>
            <div style={{ padding: '14px', background: 'var(--bg-muted)', borderRadius: '8px', fontSize: '12px', lineHeight: '1.6' }}>
              <div>• <strong>OPD Patient Volume:</strong> 184 Consultations (94% Satisfaction Rate)</div>
              <div>• <strong>IPD Occupancy:</strong> 82% Ward Capacity (Average Length of Stay: 3.4 Days)</div>
              <div>• <strong>Pathology Turnaround Time (TAT):</strong> 42 minutes (NABL Standard Met)</div>
              <div>• <strong>AI Quality Index Score:</strong> 96.4% Compliance across EHR Documentation</div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: '14px', fontSize: '11px' }} onClick={() => addToast('success', 'Exported Custom AI Executive Report PDF!')}>
              📄 Export AI Report PDF
            </button>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🚨 AI Financial & Operational Risk Report</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Real-time machine learning detection of revenue leakages, high-risk patient readmissions, and stock out warnings.</p>
            <div style={{ padding: '14px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '8px', fontSize: '12px', lineHeight: '1.6', borderLeft: '4px solid var(--warning)' }}>
              <div>• <strong>Zero Unbilled OT Surgeries:</strong> 100% OT Consumable Charge Capture.</div>
              <div>• <strong>Pharmacy FEFO Alert:</strong> 14 Near-Expiry Drug Batches Discounted to 30% Off.</div>
              <div>• <strong>TPA Claim Clearance Velocity:</strong> Average Claim Approval Time 4.2 Hours.</div>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 2: AI DIET MANAGEMENT PLANS */}
      {aiTab === 'diet' && (
        <div className="grid gap-lg" style={{ gridTemplateColumns: '1.2fr 1.8fr' }}>
          <div className="card">
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🥗 AI Clinical Diet Generator</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Generate tailored nutritional meal plans based on patient ICD-10 diagnosis, lab vitals, and dietary preferences.</p>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Select Target Patient</label>
              <select
                className="form-input"
                value={selectedPatientForDiet}
                onChange={(e) => setSelectedPatientForDiet(e.target.value)}
              >
                {(patients || branchPatients).map((p: any) => (
                  <option key={p.id} value={p.id}>{p.name} (UHID: {p.id})</option>
                ))}
              </select>
            </div>

            <button className="btn btn-success" style={{ width: '100%', padding: '12px', fontWeight: 800 }} onClick={handleGenerateDiet}>
              🥗 Generate AI Custom Diet Plan
            </button>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📋 Patient Personalized Medical Nutrition Plan</h3>
            {generatedDietPlan ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '6px', fontWeight: 800, color: 'var(--success)' }}>
                  {generatedDietPlan.title} ({generatedDietPlan.calories})
                </div>
                <div style={{ background: 'var(--bg-muted)', padding: '10px', borderRadius: '6px' }}>
                  <strong>Macro Split:</strong> {generatedDietPlan.macros}
                </div>
                <div><strong>🥣 Breakfast:</strong> {generatedDietPlan.breakfast}</div>
                <div><strong>🥗 Lunch:</strong> {generatedDietPlan.lunch}</div>
                <div><strong>🍎 Evening Snack:</strong> {generatedDietPlan.snacks}</div>
                <div><strong>🍲 Dinner:</strong> {generatedDietPlan.dinner}</div>
                <div style={{ color: 'var(--danger)', fontWeight: 700, marginTop: '6px' }}>{generatedDietPlan.restrictions}</div>
              </div>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                Click "Generate AI Custom Diet Plan" to create a personalized medical nutrition chart.
              </div>
            )}
          </div>
        </div>
      )}

      {/* PILLAR 3: AI APPOINTMENT BOOKING MATCHING */}
      {aiTab === 'booking' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>📅 AI-Powered Appointment Booking & Slot Matcher</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Natural language symptom matching to recommend the ideal specialist doctor and available time slot.</p>

          <div className="grid grid-3" style={{ gap: '16px' }}>
            <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-card)' }}>
              <div className="badge badge-primary">Cardiology Specialty</div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '6px 0' }}>Dr. Sandeep Mehta</h4>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>AI Confidence Score: 98% Match</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--success)', marginTop: '8px' }}>Next Open Slot: Tomorrow 10:30 AM</div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px', fontSize: '11px' }} onClick={() => addToast('success', 'AI Confirmed Appointment with Dr. Sandeep Mehta for Tomorrow 10:30 AM!')}>
                📅 Confirm AI Booking
              </button>
            </div>

            <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-card)' }}>
              <div className="badge badge-primary">Neurology Specialty</div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '6px 0' }}>Dr. Ananya Ray</h4>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>AI Confidence Score: 94% Match</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--success)', marginTop: '8px' }}>Next Open Slot: Tomorrow 02:00 PM</div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px', fontSize: '11px' }} onClick={() => addToast('success', 'AI Confirmed Appointment with Dr. Ananya Ray for Tomorrow 02:00 PM!')}>
                📅 Confirm AI Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 4: 24/7 PATIENT ASSISTANCE CHATBOT */}
      {aiTab === 'chatbot' && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '480px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>💬 24/7 Patient Assistance AI Assistant</h3>

          <div style={{ flexGrow: 1, overflowY: 'auto', background: 'var(--bg-muted)', padding: '16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-card)',
                  color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
                  border: msg.sender === 'bot' ? '1px solid var(--border)' : 'none',
                  fontSize: '12px',
                  lineHeight: '1.5'
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleChatSend} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Ask AI Assistant (e.g., Book appointment, Check lab report, Diet plan)..."
              className="form-input"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              style={{ flexGrow: 1 }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 20px', fontWeight: 800 }}>
              Send 🚀
            </button>
          </form>
        </div>
      )}

      {/* PILLAR 5: ML-BASED FUTURE PREDICTIONS & REPORTING */}
      {aiTab === 'ml_predictions' && (
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>🔮 Machine Learning Predictive Models & Outbreak Risk Reporting</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Predictive algorithms for 30-day readmissions, ICU bed demand velocity, sepsis deterioration, and disease outbreaks.</p>

          <div className="grid grid-2" style={{ gap: '16px' }}>
            {mlPredictionsData.map((ml, idx) => (
              <div key={idx} style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-primary">{ml.metric}</span>
                  <span className={`badge ${ml.riskLevel.includes('High') || ml.riskLevel.includes('Watch') ? 'badge-danger' : 'badge-success'}`}>{ml.riskLevel}</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)', margin: '8px 0' }}>{ml.value}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}><strong>AI Action Plan:</strong> {ml.recommendation}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
