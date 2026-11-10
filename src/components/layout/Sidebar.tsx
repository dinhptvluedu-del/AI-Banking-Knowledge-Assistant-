import React from 'react';
import { RoleType } from '../../types';
import {
  LayoutDashboard,
  Bot,
  FileText,
  GitCompare,
  Search,
  History,
  BarChart3,
  Users,
  Settings,
  ShieldAlert,
  FlaskConical,
  BookOpenCheck
} from 'lucide-react';

export type NavItem =
  | 'dashboard'
  | 'assistant'
  | 'documents'
  | 'diff'
  | 'search'
  | 'history'
  | 'analytics'
  | 'users'
  | 'config'
  | 'benchmark'
  | 'audit';

interface SidebarProps {
  currentTab: NavItem;
  onSelectTab: (tab: NavItem) => void;
  userRole: RoleType;
}

interface SidebarItem {
  id: NavItem;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  restricted?: boolean;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab, userRole }) => {
  const isManagerOrAdmin = userRole === 'MANAGER' || userRole === 'ADMIN';
  const isAdmin = userRole === 'ADMIN';

  const menuSections: SidebarSection[] = [
    {
      title: 'TỔNG QUAN & HỎI ĐÁP',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard Tổng quan',
          icon: LayoutDashboard,
          badge: undefined
        },
        {
          id: 'assistant',
          label: 'Trợ lý AI Hỏi đáp',
          icon: Bot,
          badge: 'Trọng tâm',
          badgeColor: 'bg-red-500 text-white'
        },
        {
          id: 'search',
          label: 'Tra cứu nâng cao',
          icon: Search,
          badge: undefined
        }
      ]
    },
    {
      title: 'KHO TRI THỨC NGHIỆP VỤ',
      items: [
        {
          id: 'documents',
          label: 'Kho tài liệu văn bản',
          icon: FileText,
          badge: '18 văn bản',
          badgeColor: 'bg-blue-100 text-[#004b91]'
        },
        {
          id: 'diff',
          label: 'Đối chiếu phiên bản',
          icon: GitCompare,
          badge: undefined
        },
        {
          id: 'history',
          label: 'Lịch sử hỏi đáp & Góp ý',
          icon: History,
          badge: undefined
        }
      ]
    },
    {
      title: 'QUẢN TRỊ & BÁO CÁO',
      items: [
        {
          id: 'analytics',
          label: 'Báo cáo & Phân tích',
          icon: BarChart3,
          badge: isManagerOrAdmin ? undefined : 'Xem hạn chế'
        },
        {
          id: 'users',
          label: 'Quản lý người dùng',
          icon: Users,
          restricted: !isAdmin,
          badge: 'Admin'
        },
        {
          id: 'config',
          label: 'Cấu hình hệ thống AI',
          icon: Settings,
          restricted: !isAdmin,
          badge: 'Admin'
        },
        {
          id: 'benchmark',
          label: 'Kiểm thử RAG Benchmark',
          icon: FlaskConical,
          badge: 'Đánh giá AI'
        },
        {
          id: 'audit',
          label: 'Nhật ký hoạt động (Audit)',
          icon: ShieldAlert,
          restricted: !isManagerOrAdmin,
          badge: 'Tuân thủ'
        }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] border-r border-slate-800 select-none">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <BookOpenCheck className="w-4 h-4 text-[#E5A93B]" />
          <span>Hệ thống Quản trị Tri thức</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {menuSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
              {section.title}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const isRestricted = item.restricted;

              return (
                <button
                  key={item.id}
                  disabled={isRestricted}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                    isActive
                      ? 'bg-[#004b91] text-white font-semibold shadow-xs'
                      : isRestricted
                      ? 'opacity-40 cursor-not-allowed hover:bg-transparent text-slate-400'
                      : 'hover:bg-slate-800 hover:text-white text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tight shrink-0 ${
                        item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 space-y-1">
        <div className="flex justify-between items-center text-slate-400">
          <span>Phiên bản Core:</span>
          <span className="text-slate-300 font-mono">v2.6.4</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Vector DB:</span>
          <span className="text-emerald-400 font-mono">pgvector</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Mô hình LLM:</span>
          <span className="text-blue-400 font-mono">gemini-3.8-flash</span>
        </div>
      </div>
    </aside>
  );
};
