import React, { useState } from 'react';
import { RoleType, User } from '../../types';
import { MOCK_USERS } from '../../data/mockUsers';
import {
  Users,
  Shield,
  UserCheck,
  Building,
  Check,
  Plus,
  KeyRound,
  ShieldAlert
} from 'lucide-react';

interface UserManagementProps {
  currentUser: User;
  onLogAudit: (action: any, desc: string, details?: any) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ currentUser, onLogAudit }) => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const permissionsMatrix = [
    { name: 'Hỏi đáp nghiệp vụ với AI', teller: true, manager: true, admin: true },
    { name: 'Tra cứu & Xem văn bản nội bộ', teller: true, manager: true, admin: true },
    { name: 'Gửi đánh giá & phản hồi câu trả lời', teller: true, manager: true, admin: true },
    { name: 'Xem văn bản cấp Mật (Confidential)', teller: false, manager: true, admin: true },
    { name: 'Tải lên & Khởi tạo phân đoạn RAG', teller: false, manager: true, admin: true },
    { name: 'Phê duyệt ban hành tài liệu mới', teller: false, manager: true, admin: true },
    { name: 'Rà soát ý kiến phản hồi tiêu cực', teller: false, manager: true, admin: true },
    { name: 'Xem Báo cáo thống kê toàn chi nhánh', teller: false, manager: true, admin: true },
    { name: 'Cấu hình mô hình AI & Tham số RAG', teller: false, manager: false, admin: true },
    { name: 'Quản lý tài khoản & Phân quyền RBAC', teller: false, manager: false, admin: true },
    { name: 'Xem Nhật ký kiểm toán hệ thống (Audit)', teller: false, manager: true, admin: true },
  ];

  const handleRoleChange = (userId: string, newRole: RoleType) => {
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, role: newRole } : u))
    );
    onLogAudit('CONFIG_UPDATE', `Cập nhật vai trò người dùng [${userId}] sang [${newRole}]`, {
      userId,
      newRole
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-[#004b91]" />
          Quản trị Người dùng & Phân quyền Vai trò (RBAC)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Quản lý tài khoản nhân sự Phòng Dịch vụ Khách hàng – Sacombank Chi nhánh Gò Vấp và ma trận kiểm soát truy cập
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Danh sách Cán bộ Nhân viên Chi nhánh ({users.length} tài khoản)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Cán bộ nhân viên</th>
                <th className="py-3 px-4">Chức danh / Quầy</th>
                <th className="py-3 px-4">Đơn vị công tác</th>
                <th className="py-3 px-4">Email nội bộ</th>
                <th className="py-3 px-4">Vai trò hệ thống</th>
                <th className="py-3 px-4 text-right">Phân quyền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-[#004b91] font-bold flex items-center justify-center text-xs">
                        {u.name.split(' ').slice(-1)[0][0]}
                      </div>
                      <span className="font-bold text-slate-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {u.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <div>{u.branch}</div>
                    <div className="text-[10px] text-slate-400">{u.department}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                    {u.email}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        u.role === 'ADMIN'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : u.role === 'MANAGER'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={u.role}
                      onChange={e => handleRoleChange(u.id, e.target.value as RoleType)}
                      className="text-xs p-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] bg-white font-medium"
                    >
                      <option value="TELLER">TELLER (Giao dịch viên)</option>
                      <option value="MANAGER">MANAGER (Trưởng phòng/KPV)</option>
                      <option value="ADMIN">ADMIN (Quản trị hệ thống)</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-blue-600" />
              <span>Ma trận Quyền hạn Nghiệp vụ (Role-Based Access Control)</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Quy tắc kiểm soát bảo mật tại Backend và Giao diện
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Hành động / Quyền hạn nghiệp vụ</th>
                <th className="py-3 px-4 text-center">TELLER (Giao dịch viên)</th>
                <th className="py-3 px-4 text-center">MANAGER (Kiểm soát / Quản lý)</th>
                <th className="py-3 px-4 text-center">ADMIN (Quản trị viên)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissionsMatrix.map((perm, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {perm.name}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {perm.teller ? (
                      <span className="inline-flex w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-slate-300 font-bold">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {perm.manager ? (
                      <span className="inline-flex w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-slate-300 font-bold">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {perm.admin ? (
                      <span className="inline-flex w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-slate-300 font-bold">—</span>
                    )}
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
