import React, { useState } from 'react';
import { BankDocument, RoleType } from '../../types';
import {
  X,
  FileText,
  Calendar,
  Building,
  Shield,
  Layers,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Share2,
  Search,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface DocumentDetailModalProps {
  document: BankDocument;
  initialClause?: string;
  initialPage?: number;
  userRole: RoleType;
  onClose: () => void;
  onApproveDoc?: (docId: string) => void;
}

export const DocumentDetailModal: React.FC<DocumentDetailModalProps> = ({
  document,
  initialClause,
  initialPage,
  userRole,
  onClose,
  onApproveDoc,
}) => {
  const [activeTab, setActiveTab] = useState<'CONTENT' | 'METADATA' | 'CHUNKS' | 'VERSIONS'>('CONTENT');
  const [searchTerm, setSearchTerm] = useState('');

  const isManagerOrAdmin = userRole === 'MANAGER' || userRole === 'ADMIN';
  const currentVersion = document.versions.find(v => v.version === document.currentVersion) || document.versions[0];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded text-xs font-bold">ĐANG HIỆU LỰC</span>;
      case 'PENDING_APPROVAL':
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-0.5 rounded text-xs font-bold">CHỜ PHÊ DUYỆT</span>;
      case 'SUPERSEDED':
        return <span className="bg-rose-100 text-rose-800 border border-rose-300 px-2.5 py-0.5 rounded text-xs font-bold">HẾT HIỆU LỰC (ĐÃ THAY THẾ)</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 bg-blue-100 text-[#004b91] rounded">
                {document.docCode}
              </span>
              {getStatusBadge(document.status)}
              <span className="text-xs text-slate-500 font-medium bg-slate-200/80 px-2 py-0.5 rounded">
                Phiên bản {document.currentVersion}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {document.categoryName}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {document.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" /> Ban hành: {document.issuer}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Ngày hiệu lực: {document.effectiveDate}
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-slate-400" /> Bảo mật: {document.securityLevel}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight Banner if opened from Citation */}
        {initialClause && (
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-2.5 flex items-center justify-between text-xs text-[#004b91]">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Đang kiểm chứng căn cứ trích dẫn: <strong>{initialClause}</strong> (Trang {initialPage || 1})
              </span>
            </div>
            <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-blue-300 text-blue-700">
              Vị trí được AI tham chiếu
            </span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 px-6 border-b border-slate-200 bg-white">
          <button
            onClick={() => setActiveTab('CONTENT')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'CONTENT'
                ? 'border-[#004b91] text-[#004b91]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Toàn văn văn bản & Trích dẫn
          </button>
          <button
            onClick={() => setActiveTab('CHUNKS')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'CHUNKS'
                ? 'border-[#004b91] text-[#004b91]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Phân đoạn RAG ({document.chunks.length} đoạn)
          </button>
          <button
            onClick={() => setActiveTab('VERSIONS')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'VERSIONS'
                ? 'border-[#004b91] text-[#004b91]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Lịch sử phiên bản ({document.versions.length})
          </button>
          <button
            onClick={() => setActiveTab('METADATA')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'METADATA'
                ? 'border-[#004b91] text-[#004b91]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Metadata quản trị
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          {activeTab === 'CONTENT' && (
            <div className="space-y-4">
              {/* Document Summary Box */}
              <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-xl text-xs space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>Tóm tắt nội dung chính sách:</span>
                </div>
                <p className="text-amber-800 leading-relaxed font-medium">
                  {document.summary}
                </p>
              </div>

              {/* Full Text View */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                {currentVersion?.fullText || 'Nội dung văn bản chưa được cập nhật.'}
              </div>
            </div>
          )}

          {activeTab === 'CHUNKS' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500">
                Các đoạn nội dung đã được trích xuất (clean, chunking & sinh embedding) sẵn sàng cho Vector Search:
              </div>
              {document.chunks.map((chunk, idx) => {
                const isTarget = initialClause && chunk.title.includes(initialClause);
                return (
                  <div
                    key={chunk.chunkId}
                    className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                      isTarget
                        ? 'bg-blue-50/90 border-blue-400 ring-2 ring-blue-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{chunk.title}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        Trang {chunk.pageNumber} • {chunk.chunkId}
                      </span>
                    </div>

                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {chunk.content}
                    </p>

                    <div className="flex flex-wrap gap-1 items-center pt-1">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">Từ khóa:</span>
                      {chunk.keywords.map((kw, i) => (
                        <span key={i} className="text-[10px] bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'VERSIONS' && (
            <div className="space-y-3">
              {document.versions.map((ver) => (
                <div key={ver.version} className="bg-white border border-slate-200 p-4 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">Phiên bản {ver.version}</span>
                      {getStatusBadge(ver.status)}
                    </div>
                    <span className="text-slate-400 text-[11px]">Cập nhật: {ver.updatedAt}</span>
                  </div>
                  <div className="text-slate-600">
                    <strong>Nội dung thay đổi:</strong> {ver.changeSummary}
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Người thực hiện: <span className="font-semibold text-slate-700">{ver.updatedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'METADATA' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400">Mã văn bản nội bộ:</span>
                <p className="font-bold text-slate-800 font-mono mt-0.5">{document.docCode}</p>
              </div>
              <div>
                <span className="text-slate-400">Nhóm nghiệp vụ:</span>
                <p className="font-bold text-slate-800 mt-0.5">{document.categoryName}</p>
              </div>
              <div>
                <span className="text-slate-400">Đơn vị ban hành:</span>
                <p className="font-bold text-slate-800 mt-0.5">{document.issuer}</p>
              </div>
              <div>
                <span className="text-slate-400">Ngày hiệu lực chính thức:</span>
                <p className="font-bold text-slate-800 mt-0.5">{document.effectiveDate}</p>
              </div>
              <div>
                <span className="text-slate-400">Người tải lên & Người duyệt:</span>
                <p className="font-bold text-slate-800 mt-0.5">
                  Tải lên bởi: {document.uploadedBy} • Phê duyệt: {document.approvedBy || 'Chưa phê duyệt'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Tài liệu thay thế / Thay thế cho:</span>
                <p className="font-bold text-slate-800 font-mono mt-0.5">
                  {document.supersedesDocCode ? `Thay thế cho ${document.supersedesDocCode}` : 'Văn bản gốc'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Định dạng & Dung lượng:</span>
                <p className="font-bold text-slate-800 mt-0.5">{document.fileType} ({document.fileSize})</p>
              </div>
              <div>
                <span className="text-slate-400">Lượt tra cứu tại quầy:</span>
                <p className="font-bold text-blue-700 mt-0.5">{document.totalViews.toLocaleString()} lượt</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Tài liệu số hóa nội bộ Sacombank • Nghiêm cấm sao chép ra bên ngoài
          </div>
          <div className="flex items-center space-x-2">
            {document.status === 'PENDING_APPROVAL' && isManagerOrAdmin && onApproveDoc && (
              <button
                onClick={() => onApproveDoc(document.id)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Phê duyệt ban hành</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Đóng lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
