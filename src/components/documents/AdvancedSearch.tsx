import React, { useState } from 'react';
import { BankDocument, BusinessCategory } from '../../types';
import { retrieveChunks } from '../../services/ragService';
import { Search, Filter, BookOpen, ExternalLink, Calendar, ShieldCheck, Tag } from 'lucide-react';

interface AdvancedSearchProps {
  documents: BankDocument[];
  onOpenDoc: (docId: string, clause?: string, pageNumber?: number) => void;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  documents,
  onOpenDoc,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ACTIVE');

  // Perform search using hybrid retrieval
  const handleSearch = () => {
    // Triggers re-render
  };

  const results = query.trim()
    ? retrieveChunks(query, documents, 'ADMIN', { topK: 12, threshold: 0.25, includeSuperseded: statusFilter === 'ALL' || statusFilter === 'SUPERSEDED' }).results
    : [];

  const filteredResults = results.filter((r) => {
    const matchesCat = category === 'ALL' || r.document.category === category;
    const matchesStat = statusFilter === 'ALL' || r.document.status === statusFilter;
    return matchesCat && matchesStat;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Search className="w-5 h-5 text-[#004b91]" />
          Tra cứu & Tìm kiếm Văn bản Nghiệp vụ Nâng cao
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Tìm kiếm kết hợp ngữ nghĩa Vector Search và từ khóa BM25 • Hỗ trợ tiếng Việt không dấu và tra cứu theo điều khoản
        </p>
      </div>

      {/* Search Input and Filters */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập nội dung cần tra cứu (ví dụ: 'thủ tục mở thẻ tín dụng', 'lãi suất rút trước hạn', 'định danh khách hàng')..."
            className="w-full text-xs sm:text-sm pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004b91] transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Nhóm nghiệp vụ:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs p-2.5 mt-1 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004b91]"
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
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Trạng thái hiệu lực:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs p-2.5 mt-1 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004b91]"
            >
              <option value="ACTIVE">Đang có hiệu lực (Active Only)</option>
              <option value="ALL">Tất cả (bao gồm văn bản cũ/thay thế)</option>
              <option value="SUPERSEDED">Đã hết hiệu lực / Thay thế</option>
            </select>
          </div>

          <div className="flex items-end">
            <div className="w-full text-xs text-slate-500 p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <span>Đã tìm thấy:</span>
              <strong className="text-slate-900 font-mono">{filteredResults.length} kết quả</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {query.trim() === '' ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400 text-xs">
            Nhập từ khóa hoặc câu hỏi nghiệp vụ phía trên để tra cứu toàn bộ văn bản quy định.
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs space-y-1">
            <p className="font-bold text-slate-700">Không tìm thấy điều khoản phù hợp</p>
            <p className="text-slate-400">Thử tìm kiếm với từ khóa ngắn gọn hơn hoặc bỏ dấu tiếng Việt.</p>
          </div>
        ) : (
          filteredResults.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onOpenDoc(item.document.id, item.chunk.clauseNumber, item.chunk.pageNumber)}
              className="bg-white hover:bg-blue-50/30 p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-2xs transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#004b91] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {item.document.docCode}
                  </span>
                  <span className="font-bold text-xs text-slate-900">
                    {item.chunk.title}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    (Trang {item.chunk.pageNumber})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Độ khớp: {Math.round(item.hybridScore * 100)}%
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#004b91] transition-colors" />
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-mono bg-slate-50 p-3 rounded-lg border border-slate-100">
                {item.chunk.content}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-1">
                <span className="truncate max-w-md font-medium text-slate-600">
                  Tài liệu: {item.document.title}
                </span>
                <span className="font-mono">
                  Hiệu lực từ: {item.document.effectiveDate} • v{item.document.currentVersion}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
