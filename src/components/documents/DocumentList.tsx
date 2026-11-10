import React, { useState } from 'react';
import { BankDocument, BusinessCategory, DocumentStatus, RoleType, User } from '../../types';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock,
  Layers,
  ArrowUpDown,
  BookOpenCheck
} from 'lucide-react';

interface DocumentListProps {
  documents: BankDocument[];
  currentUser: User;
  onOpenDoc: (docId: string) => void;
  onOpenUpload: () => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  currentUser,
  onOpenDoc,
  onOpenUpload,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const isManagerOrAdmin = currentUser.role === 'MANAGER' || currentUser.role === 'ADMIN';

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.docCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'ALL' || doc.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            ĐANG HIỆU LỰC
          </span>
        );
      case 'PENDING_APPROVAL':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-amber-500" />
            CHỜ PHÊ DUYỆT
          </span>
        );
      case 'SUPERSEDED':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <AlertTriangle className="w-3 h-3 text-rose-500" />
            ĐÃ THAY THẾ
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5 text-[#004b91]" />
            Kho Tài liệu & Quy trình Nghiệp vụ Ngân hàng
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Chi nhánh Sacombank Gò Vấp • Quản lý tập trung các văn bản quy định, hướng dẫn và phân đoạn RAG
          </p>
        </div>

        {isManagerOrAdmin && (
          <button
            onClick={onOpenUpload}
            className="px-4 py-2 bg-[#004b91] hover:bg-[#00386d] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tải lên văn bản mới</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên văn bản, mã số (QĐ, HD, QTr), hoặc nội dung tóm tắt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004b91] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004b91] text-slate-700"
          >
            <option value="ALL">Tất cả nghiệp vụ</option>
            <option value="EBANKING">Ngân hàng điện tử & Sacombank Pay</option>
            <option value="TIEN_GUI">Tiền gửi & Tiết kiệm</option>
            <option value="THANH_TOAN">Thanh toán & Chuyển tiền</option>
            <option value="THE_NGAN_HANG">Thẻ & Dịch vụ POS</option>
            <option value="TIN_DUNG">Tín dụng & Cho vay</option>
            <option value="AML_KYC">Phòng chống rửa tiền (AML/KYC)</option>
            <option value="NGOAI_HOI">Ngoại hối & Kiều hối</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004b91] text-slate-700"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="ACTIVE">Đang hiệu lực</option>
            <option value="PENDING_APPROVAL">Chờ phê duyệt</option>
            <option value="SUPERSEDED">Đã thay thế</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Mã văn bản</th>
                <th className="py-3 px-4">Tên quy trình / Văn bản</th>
                <th className="py-3 px-4">Nghiệp vụ</th>
                <th className="py-3 px-4">Hiệu lực</th>
                <th className="py-3 px-4">Phiên bản</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4">Phân đoạn RAG</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Không tìm thấy văn bản phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    onClick={() => onOpenDoc(doc.id)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#004b91]">
                      {doc.docCode}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-md">
                      <div className="truncate">{doc.title}</div>
                      <div className="text-[11px] text-slate-400 font-normal line-clamp-1">
                        {doc.summary}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {doc.categoryName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                      {doc.effectiveDate}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-bold font-mono">
                      v{doc.currentVersion}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(doc.status)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      <span className="font-bold text-slate-800">{doc.chunks.length}</span> chunks
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onOpenDoc(doc.id)}
                        className="px-2.5 py-1 text-[11px] font-bold text-[#004b91] hover:bg-blue-100 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem chi tiết</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>Hiển thị <strong>{filteredDocs.length}</strong> trên tổng số <strong>{documents.length}</strong> văn bản</span>
          <span className="font-mono text-[11px]">pgvector indexed • Cập nhật tự động</span>
        </div>
      </div>
    </div>
  );
};
