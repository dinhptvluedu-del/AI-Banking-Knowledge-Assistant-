import React from 'react';
import { User } from '../../types';
import { MOCK_USERS } from '../../data/mockUsers';
import { Building2, Shield, Bell, CheckCircle2, UserCheck, RefreshCw } from 'lucide-react';

interface HeaderProps {
  currentUser: User;
  onSwitchUser: (user: User) => void;
  activeView: string;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onSwitchUser, activeView }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 lg:px-6 flex items-center justify-between shadow-xs">
      {/* Brand & Branch Info */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#004b91] to-[#002f5c] flex items-center justify-center text-white font-black tracking-wider shadow-sm text-sm">
            SCB
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight text-[#004b91]">
                SACOMBANK
              </span>
              <span className="bg-red-50 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-200 uppercase">
                AI Knowledge
              </span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
              <Building2 className="w-3 h-3 text-slate-400" />
              <span>CN Gò Vấp</span>
              <span className="text-slate-300">•</span>
              <span>P. Dịch vụ Khách hàng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Status Indicator */}
      <div className="hidden md:flex items-center space-x-2 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full border border-emerald-200">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="font-medium">RAG Hybrid Engine v2.6 • Sẵn sàng hỗ trợ quầy</span>
      </div>

      {/* Right controls: Role Quick-Switcher & Profile */}
      <div className="flex items-center space-x-3">
        {/* Role Quick Switcher for Demo testing */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <span className="text-[11px] text-slate-500 px-1.5 font-medium flex items-center gap-1">
            <UserCheck className="w-3 h-3" /> Vai trò:
          </span>
          {MOCK_USERS.map((user) => {
            const isActive = user.id === currentUser.id;
            return (
              <button
                key={user.id}
                onClick={() => onSwitchUser(user)}
                title={`Đổi sang: ${user.name} (${user.role})`}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  isActive
                    ? 'bg-[#004b91] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {user.role}
              </button>
            );
          })}
        </div>

        {/* Current User Badge */}
        <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-300 bg-slate-100 flex items-center justify-center font-bold text-xs text-[#004b91]">
            {currentUser.name.split(' ').slice(-1)[0][0]}
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1.5">
              {currentUser.name}
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                currentUser.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                currentUser.role === 'MANAGER' ? 'bg-amber-100 text-amber-800' :
                'bg-blue-100 text-blue-700'
              }`}>
                {currentUser.role}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 leading-tight">
              {currentUser.title}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
