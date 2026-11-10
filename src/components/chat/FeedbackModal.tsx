import React, { useState } from 'react';
import { ThumbsUp, AlertTriangle, HelpCircle, XCircle, Send, Check } from 'lucide-react';

interface FeedbackModalProps {
  messageId: string;
  queryText?: string;
  onClose: () => void;
  onSubmitFeedback: (messageId: string, feedbackType: 'HELPFUL' | 'INCOMPLETE' | 'INCORRECT' | 'WRONG_CITATION' | 'OUT_OF_SCOPE', comment: string) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  messageId,
  queryText,
  onClose,
  onSubmitFeedback,
}) => {
  const [selectedType, setSelectedType] = useState<'HELPFUL' | 'INCOMPLETE' | 'INCORRECT' | 'WRONG_CITATION' | 'OUT_OF_SCOPE'>('HELPFUL');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitFeedback(messageId, selectedType, comment);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const feedbackOptions = [
    { type: 'HELPFUL' as const, label: 'Hữu ích & Chính xác', icon: ThumbsUp, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { type: 'INCOMPLETE' as const, label: 'Chưa đầy đủ quy trình', icon: HelpCircle, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { type: 'INCORRECT' as const, label: 'Sai thông tin nghiệp vụ', icon: AlertTriangle, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { type: 'WRONG_CITATION' as const, label: 'Sai nguồn trích dẫn / điều khoản', icon: XCircle, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { type: 'OUT_OF_SCOPE' as const, label: 'Chưa có văn bản quy định', icon: AlertTriangle, color: 'text-slate-600 bg-slate-50 border-slate-200' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Đánh giá câu trả lời của Trợ lý AI
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Phản hồi của bạn giúp Ban Quản lý Phòng Dịch vụ Khách hàng rà soát tài liệu và hoàn thiện hệ thống RAG.
        </p>

        {queryText && (
          <div className="mb-4 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 italic">
            "{queryText}"
          </div>
        )}

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <div className="font-bold text-sm text-slate-900">Cảm ơn phản hồi của bạn!</div>
            <div className="text-xs text-slate-500">Ý kiến đã được ghi nhận vào nhật ký kiểm duyệt của Quản lý chi nhánh.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Mức độ hài lòng & Loại phản hồi:</label>
              <div className="grid grid-cols-1 gap-2">
                {feedbackOptions.map(opt => {
                  const Icon = opt.icon;
                  const isSelected = selectedType === opt.type;
                  return (
                    <button
                      key={opt.type}
                      type="button"
                      onClick={() => setSelectedType(opt.type)}
                      className={`flex items-center space-x-2.5 p-2 rounded-lg border text-xs font-medium transition-all text-left ${
                        isSelected
                          ? `${opt.color} ring-2 ring-offset-1 ring-blue-500`
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Ghi chú chi tiết (nếu có nội dung cần đính chính):
              </label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={3}
                placeholder="Ví dụ: Quy định mới số 284/2026 đã nâng hạn mức thấu chi lên 150 triệu, câu trả lời đang ghi 100 triệu..."
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004b91] focus:border-transparent resize-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#004b91] hover:bg-[#00386d] rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi phản hồi</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
