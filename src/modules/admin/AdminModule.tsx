import React from 'react';
import type { UserRole } from '../../types';

interface AdminModuleProps {
  modulePermissions: Record<UserRole, string[]>;
}

export const AdminModule: React.FC<AdminModuleProps> = ({
  modulePermissions,
}) => {
  return (
    <div className="flex flex-col gap-lg">
      <div className="card">
        <h2>👑 SysAdmin Control Panel & Role-Based Module Visibility</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Configure role permissions & department visibility across HexenCare HMS.</p>

        <div className="grid grid-2" style={{ gap: '12px' }}>
          {Object.entries(modulePermissions).map(([role, mods]) => (
            <div key={role} style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-muted)' }}>
              <strong style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--primary)' }}>Role: {role}</strong>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Visible Modules ({mods.length}): {mods.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
