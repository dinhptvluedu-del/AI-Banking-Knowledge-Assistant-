import React, { useState } from 'react';
import { AuditLog } from '../../types';
import {
  ShieldAlert,
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  Terminal,
  User,
  ShieldCheck
} from 'lucide-react';

interface AuditLogViewProps {
  logs: AuditLog[];
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('ALL');

  const filteredLogs = logs.filter(log => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);
    const matchesAction = selectedAction === 'ALL' || log.action === selectedAction;
    return matchesSearch && matchesAction;
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'LOGIN':
        return <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold">LOGIN</span>;
      case 'AI_QUERY':
        return <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-[10px] font-bold">AI_QUERY</span>;
      case 'DOCUMENT_APPROVE':
        return <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">APPROVE_DOC</span>;
      case 'DOCUMENT_UPLOAD':
        return <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold">UPLOAD_DOC</span>;
      case 'CONFIG_UPDATE':
        return <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-[10px] font-bold">CONFIG_UPDATE</span>;
      case 'BENCHMARK_RUN':
        return <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-[10px] font-bold">BENCHMARK</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">{action}</span>;
    }
  };

  const handleExportCsv = () => {
    const headers = 'ID,Thời gian,Người dùng,Vai trò,Hành động,Mô tả,IP,Trạng thái\n';
    const rows = filteredLogs
      .map(l => `"${l.id}","${l.timestamp}","${l.userName}","${l.userRole}","${l.action}","${l.description}","${l.ipAddress}","${l.status}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sacombank_Audit_Logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#004b91]" />
            Nhật ký Hoạt động & Kiểm toán Tuân thủ (Audit Trail)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Lưu vết toàn bộ truy cập, truy vấn AI, phê duyệt văn bản và thay đổi cấu hình bảo mật phục vụ công tác thanh tra nội bộ
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shrink-0"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Xuất báo cáo CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên cán bộ, mô tả hành động, hoặc địa chỉ IP..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004b91]"
          />
        </div>

        <select
          value={selectedAction}
          onChange={e => setSelectedAction(e.target.value)}
          className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004b91] text-slate-700 w-full sm:w-auto"
        >
          <option value="ALL">Tất cả hành động</option>
          <option value="AI_QUERY">Truy vấn AI (AI_QUERY)</option>
          <option value="LOGIN">Đăng nhập (LOGIN)</option>
          <option value="DOCUMENT_APPROVE">Phê duyệt văn bản</option>
          <option value="DOCUMENT_UPLOAD">Tải lên văn bản</option>
          <option value="CONFIG_UPDATE">Thay đổi cấu hình</option>
          <option value="BENCHMARK_RUN">Chạy kiểm thử</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-4">Người thực hiện</th>
                <th className="py-3 px-4">Vai trò</th>
                <th className="py-3 px-4">Hành động</th>
                <th className="py-3 px-4">Chi tiết hoạt động</th>
                <th className="py-3 px-4">Địa chỉ IP</th>
                <th className="py-3 px-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/60 font-mono">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800 font-sans">
                    {log.userName}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-sans font-semibold">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {getActionBadge(log.action)}
                  </td>
                  <td className="py-3 px-4 font-sans text-slate-700 max-w-md">
                    <div>{log.description}</div>
                    {log.details && (
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {JSON.stringify(log.details)}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {log.ipAddress}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                      SUCCESS
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
