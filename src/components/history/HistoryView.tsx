import React, { useState } from 'react';
import { RoleType, User } from '../../types';
import {
  History,
  ThumbsUp,
  AlertTriangle,
  Search,
  Filter,
  CheckCircle,
  MessageSquare,
  FileCheck,
  Calendar,
  Clock
} from 'lucide-react';

interface HistoryViewProps {
  currentUser: User;
  onOpenDoc: (docId: string) => void;
}

interface HistoricalQueryItem {
  id: string;
  userName: string;
  userRole: RoleType;
  timestamp: string;
  question: string;
  answerSummary: string;
  citedDocCode: string;
  citedDocId: string;
  feedbackType?: 'HELPFUL' | 'INCOMPLETE' | 'INCORRECT' | 'WRONG_CITATION';
  feedbackComment?: string;
  status: 'RESOLVED' | 'PENDING_REVIEW';
}

export const HistoryView: React.FC<HistoryViewProps> = ({ currentUser, onOpenDoc }) => {
  const isManagerOrAdmin = currentUser.role === 'MANAGER' || currentUser.role === 'ADMIN';

  const [historyItems, setHistoryItems] = useState<HistoricalQueryItem[]>([
    {
      id: 'hist-01',
      userName: 'Nguyễn Văn An',
      userRole: 'TELLER',
      timestamp: '2026-11-10 08:30:11',
      question: 'Hạn mức chuyển tiền nào trên Sacombank Pay bắt buộc phải xác thực sinh trắc học khuôn mặt?',
      answerSummary: 'Từ 10 triệu đồng/giao dịch hoặc tổng trên 20 triệu đồng/ngày.',
      citedDocCode: 'QĐ-284/2026/QĐ-TGĐ',
      citedDocId: 'doc-biometric-2026',
      feedbackType: 'HELPFUL',
      feedbackComment: 'Đầy đủ căn cứ, giao dịch viên đã giải thích nhanh cho khách.',
      status: 'RESOLVED'
    },
    {
      id: 'hist-02',
      userName: 'Lê Thuỳ Dung',
      userRole: 'TELLER',
      timestamp: '2026-11-10 09:15:20',
      question: 'Khách hàng cá nhân người nước ngoài cần những giấy tờ gì để mở tài khoản thanh toán?',
      answerSummary: 'Hộ chiếu còn hạn 6 tháng, visa hoặc thẻ tạm trú, hợp đồng lao động trên 12 tháng.',
      citedDocCode: 'QĐ-142/2025/QĐ-TGĐ',
      citedDocId: 'doc-mo-tk-2025',
      feedbackType: 'HELPFUL',
      status: 'RESOLVED'
    },
    {
      id: 'hist-03',
      userName: 'Phạm Minh Tuấn',
      userRole: 'TELLER',
      timestamp: '2026-11-10 10:02:44',
      question: 'Quy trình thu đổi ngoại tệ mặt tại quầy có thay đổi hạn mức lên 5000 USD không?',
      answerSummary: 'Văn bản QĐ-110/2026 hiện đang là dự thảo Chờ phê duyệt, chưa áp dụng chính thức.',
      citedDocCode: 'QĐ-110/2026/QĐ-TGĐ',
      citedDocId: 'doc-kieu-hoi-pending',
      feedbackType: 'INCOMPLETE',
      feedbackComment: 'Cần Trưởng phòng duyệt sớm để chi nhánh có căn cứ phục vụ khách xuất cảnh.',
      status: 'PENDING_REVIEW'
    },
    {
      id: 'hist-04',
      userName: 'Nguyễn Văn An',
      userRole: 'TELLER',
      timestamp: '2026-11-09 14:22:18',
      question: 'Khách hàng rút một phần tiền gửi tiết kiệm trước hạn thì tính lãi thế nào?',
      answerSummary: 'Phần rút trước hạn áp dụng lãi không kỳ hạn, phần còn lại giữ nguyên lãi suất thỏa thuận.',
      citedDocCode: 'HD-56/2025/HD-NV',
      citedDocId: 'doc-tiet-kiem-2025',
      feedbackType: 'HELPFUL',
      status: 'RESOLVED'
    }
  ]);

  const [filterType, setFilterType] = useState<string>('ALL');

  const filtered = historyItems.filter(item => {
    if (filterType === 'NEEDS_REVIEW') {
      return item.status === 'PENDING_REVIEW' || item.feedbackType === 'INCOMPLETE' || item.feedbackType === 'INCORRECT';
    }
    if (filterType === 'MY_QUERIES') {
      return item.userName === currentUser.name;
    }
    return true;
  });

  const handleResolveFeedback = (id: string) => {
    setHistoryItems(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'RESOLVED' } : item))
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <History className="w-5 h-5 text-[#004b91]" />
          Lịch sử Hỏi đáp Nghiệp vụ & Quản lý Phản hồi
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Theo dõi nhật ký truy vấn của giao dịch viên • Rà soát các câu hỏi có phản hồi chưa rõ để Trưởng phòng cập nhật quy trình
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setFilterType('ALL')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            filterType === 'ALL'
              ? 'bg-[#004b91] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Tất cả truy vấn ({historyItems.length})
        </button>
        <button
          onClick={() => setFilterType('MY_QUERIES')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            filterType === 'MY_QUERIES'
              ? 'bg-[#004b91] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Câu hỏi của tôi ({historyItems.filter(i => i.userName === currentUser.name).length})
        </button>
        {isManagerOrAdmin && (
          <button
            onClick={() => setFilterType('NEEDS_REVIEW')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              filterType === 'NEEDS_REVIEW'
                ? 'bg-amber-600 text-white'
                : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Cần Trưởng phòng xử lý (1)</span>
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map(item => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-bold text-slate-900">{item.userName}</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                  {item.userRole}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.timestamp}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.feedbackType === 'HELPFUL' ? (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" /> Hữu ích
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {item.feedbackType}
                  </span>
                )}
                {item.status === 'RESOLVED' ? (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Đã kiểm duyệt
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Chờ xử lý
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-800 flex items-start gap-2">
                <span className="text-blue-600 shrink-0 font-bold">Hỏi:</span>
                <span>{item.question}</span>
              </div>
              <div className="text-xs text-slate-600 flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-emerald-700 shrink-0 font-bold">Đáp:</span>
                <span>{item.answerSummary}</span>
              </div>
            </div>

            {item.feedbackComment && (
              <div className="text-xs bg-amber-50/60 p-2.5 rounded-lg border border-amber-200 text-amber-900 flex items-start gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Ý kiến đóng góp của giao dịch viên:</strong> {item.feedbackComment}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <button
                onClick={() => onOpenDoc(item.citedDocId)}
                className="text-[#004b91] hover:underline font-semibold flex items-center gap-1 text-[11px]"
              >
                <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Căn cứ: [{item.citedDocCode}]</span>
              </button>

              {isManagerOrAdmin && item.status === 'PENDING_REVIEW' && (
                <button
                  onClick={() => handleResolveFeedback(item.id)}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Xác nhận đã xử lý
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
