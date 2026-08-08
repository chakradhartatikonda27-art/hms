import React from 'react';

interface BillingModuleProps {
  branchRevenue: number;
}

export const BillingModule: React.FC<BillingModuleProps> = ({
  branchRevenue,
}) => {
  return (
    <div className="flex flex-col gap-lg">
      <div className="card">
        <h2>💰 Finance, Billing & TPA Insurance Claims Desk</h2>
        <div className="grid grid-3" style={{ gap: '12px', margin: '16px 0' }}>
          <div style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '4px solid var(--success)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Gross Collections</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--success)' }}>₹{branchRevenue.toLocaleString()}</div>
          </div>
          <div style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '4px solid var(--warning)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pending TPA Cashless Claims</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--warning)' }}>₹2,45,000</div>
          </div>
          <div style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '4px solid var(--danger)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>OpEx Expenses Today</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--danger)' }}>₹38,500</div>
          </div>
        </div>
      </div>
    </div>
  );
};
