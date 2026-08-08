export const InventoryModule: React.FC = () => {
  return (
    <div className="flex flex-col gap-lg">
      <div className="card">
        <h2>🩸 Blood Bank & Central Sterile Inventory Store</h2>
        <div className="grid grid-4" style={{ gap: '12px', marginTop: '16px' }}>
          <div style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '4px solid var(--danger)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>A+ Blood Units</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--danger)' }}>18 Units</div>
          </div>
          <div style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '4px solid var(--danger)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>O- Universal Donor</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--danger)' }}>6 Units</div>
          </div>
          <div style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '4px solid var(--primary)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>B+ Blood Units</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)' }}>24 Units</div>
          </div>
          <div style={{ padding: '12px', background: 'var(--bg-muted)', borderRadius: '6px', borderLeft: '4px solid var(--success)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>AB+ Blood Units</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--success)' }}>12 Units</div>
          </div>
        </div>
      </div>
    </div>
  );
};
