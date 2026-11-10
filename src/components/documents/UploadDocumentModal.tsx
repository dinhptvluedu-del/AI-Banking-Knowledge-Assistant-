import React, { useState } from 'react';
import { BankDocument, BusinessCategory, SecurityLevel, User } from '../../types';
import { generateLocalEmbedding } from '../../utils/searchUtils';
import {
  Upload,
  FileText,
  CheckCircle,
  Clock,
  Cpu,
  Database,
  X,
  FileCheck2,
  AlertCircle
} from 'lucide-react';

interface UploadDocumentModalProps {
  currentUser: User;
  onClose: () => void;
  onDocumentAdded: (doc: BankDocument) => void;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  currentUser,
  onClose,
  onDocumentAdded,
}) => {
  const [docCode, setDocCode] = useState('QĐ-310/2026/QĐ-TGĐ');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<BusinessCategory>('TIEN_GUI');
  const [issuer, setIssuer] = useState('Tổng Giám đốc Sacombank');
  const [effectiveDate, setEffectiveDate] = useState('2026-03-01');
  const [securityLevel, setSecurityLevel] = useState<SecurityLevel>('INTERNAL');
  const [content, setContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);

  const categoryNames: Record<BusinessCategory, string> = {
    TIEN_GUI: 'Tiền gửi & Tiết kiệm',
    TIN_DUNG: 'Tín dụng & Cho vay',
    THANH_TOAN: 'Thanh toán & Chuyển tiền',
    THE_NGAN_HANG: 'Thẻ & Dịch vụ POS',
    EBANKING: 'Ngân hàng điện tử & Sacombank Pay',
    NGOAI_HOI: 'Ngoại hối & Kiều hối',
    AML_KYC: 'Phòng chống rửa tiền & Định danh',
  };

  const handleStartPipeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsProcessing(true);
    setPipelineStep(1); // 1: Extract & Clean

    setTimeout(() => {
      setPipelineStep(2); // 2: OCR & Clause Segmentation
    }, 700);

    setTimeout(() => {
      setPipelineStep(3); // 3: Semantic Chunking & Metadata
    }, 1400);

    setTimeout(() => {
      setPipelineStep(4); // 4: Vector Embedding & pgvector Indexing
    }, 2100);

    setTimeout(() => {
      // Chunking simulation
      const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
      const docId = `doc-${Date.now()}`;
      
      const chunks = paragraphs.map((p, idx) => {
        const titleMatch = p.match(/(Điều\s+\d+[^.]+)/i);
        const chunkTitle = titleMatch ? titleMatch[1] : `Khoản mục ${idx + 1}`;
        return {
          chunkId: `chunk-${docId}-${idx + 1}`,
          documentId: docId,
          title: chunkTitle,
          clauseNumber: titleMatch ? titleMatch[1].trim() : `Mục ${idx + 1}`,
          pageNumber: Math.floor(idx / 2) + 1,
          keywords: [category.toLowerCase(), 'quy trình', 'nghiệp vụ'],
          content: p.trim(),
          vectorEmbedding: generateLocalEmbedding(p)
        };
      });

      const newDoc: BankDocument = {
        id: docId,
        docCode,
        title,
        category,
        categoryName: categoryNames[category],
        issuer,
        issueDate: new Date().toISOString().split('T')[0],
        effectiveDate,
        currentVersion: '1.0',
        status: 'PENDING_APPROVAL', // New document must be approved by Manager/Admin
        securityLevel,
        uploadedBy: currentUser.name,
        fileType: 'PDF',
        fileSize: '1.6 MB',
        summary: content.slice(0, 180) + '...',
        totalViews: 0,
        versions: [
          {
            version: '1.0',
            updatedAt: new Date().toISOString().split('T')[0],
            updatedBy: currentUser.name,
            status: 'PENDING_APPROVAL',
            changeSummary: 'Tải lên ban đầu từ bản dự thảo.',
            fullText: content
          }
        ],
        chunks
      };

      onDocumentAdded(newDoc);
      setIsProcessing(false);
      onClose();
    }, 2800);
  };

  const steps = [
    'Tải tập tin & Trích xuất văn bản thô',
    'Chuẩn hóa OCR & Phân tích cấu trúc Điều khoản',
    'Phân đoạn logic (Chunking theo mục & ngữ nghĩa)',
    'Sinh Vector Embedding & Indexing vào pgvector',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Tải lên & Số hóa Tài liệu Nghiệp vụ mới
            </h3>
            <p className="text-xs text-slate-500">
              Quy trình tự động: Extract → Clean → OCR → Chunking → Metadata → Embedding → Chờ phê duyệt
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isProcessing ? (
          <div className="py-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 text-[#004b91] rounded-full flex items-center justify-center mx-auto animate-spin">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                Đang xử lý pipeline trích xuất tri thức...
              </h4>
              <p className="text-xs text-slate-500">
                Hệ thống đang chuẩn hóa cấu trúc để sẵn sàng cho RAG vector search.
              </p>
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              {steps.map((st, i) => {
                const isDone = pipelineStep > i + 1;
                const isCurrent = pipelineStep === i + 1;
                return (
                  <div key={i} className="flex items-center space-x-3 text-xs">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        isDone
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-blue-600 text-white animate-pulse'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isDone ? <CheckCircle className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={isCurrent ? 'font-bold text-blue-900' : isDone ? 'text-slate-700' : 'text-slate-400'}>
                      {st}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <form onSubmit={handleStartPipeline} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Mã văn bản:</label>
                <input
                  type="text"
                  required
                  value={docCode}
                  onChange={e => setDocCode(e.target.value)}
                  className="w-full text-xs p-2.5 mt-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Nhóm nghiệp vụ:</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as BusinessCategory)}
                  className="w-full text-xs p-2.5 mt-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] focus:outline-none bg-white"
                >
                  {Object.entries(categoryNames).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">Tên văn bản / Quy trình:</label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Quy chế phê duyệt giải ngân hạn mức tiêu dùng qua ứng dụng Sacombank Pay"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full text-xs p-2.5 mt-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Đơn vị ban hành:</label>
                <input
                  type="text"
                  value={issuer}
                  onChange={e => setIssuer(e.target.value)}
                  className="w-full text-xs p-2.5 mt-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Ngày hiệu lực:</label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={e => setEffectiveDate(e.target.value)}
                  className="w-full text-xs p-2.5 mt-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Mức độ bảo mật:</label>
                <select
                  value={securityLevel}
                  onChange={e => setSecurityLevel(e.target.value as SecurityLevel)}
                  className="w-full text-xs p-2.5 mt-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] focus:outline-none bg-white"
                >
                  <option value="INTERNAL">Nội bộ (Internal)</option>
                  <option value="CONFIDENTIAL">Mật / Cán bộ QL</option>
                  <option value="PUBLIC">Công khai</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Nội dung quy trình (Văn bản số hóa & các Điều khoản):
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setTitle('Quy định chi trả tiền thưởng tích điểm Sacombank Sapphire 2026');
                    setContent(`Điều 1. Phạm vi áp dụng
Áp dụng cho toàn bộ chủ thẻ tín dụng và khách hàng thanh toán qua Sacombank Pay.

Điều 2. Tỷ lệ quy đổi điểm thưởng Sapphire
Cứ mỗi 1.000 VNĐ chi tiêu thanh toán qua thẻ tín dụng Sacombank, khách hàng nhận được 1 điểm Sapphire. Điểm có giá trị quy đổi sang dặm bay Lotusmiles hoặc hoàn tiền trực tiếp vào thẻ.

Điều 3. Quy trình thực hiện đổi điểm thưởng tại quầy
Bước 1: Tiếp nhận CCCD gắn chip và thẻ tín dụng của khách hàng.
Bước 2: Tra cứu số dư điểm Sapphire trên phần mềm Loyalty.
Bước 3: Nhập lệnh hoàn tiền hoặc chuyển đổi dặm bay theo đề nghị của khách hàng. Thời gian hoàn tất tối đa 24h làm việc.`);
                  }}
                  className="text-[11px] text-[#004b91] hover:underline font-medium"
                >
                  Điền dữ liệu mẫu nhanh
                </button>
              </div>
              <textarea
                required
                rows={6}
                placeholder="Nhập nội dung các Điều khoản (Ví dụ: Điều 1... Điều 2...)"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full text-xs font-mono p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] focus:outline-none"
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg flex items-start gap-2 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Quy định phê duyệt:</strong> Tài liệu sau khi tải lên sẽ ở trạng thái <em>Chờ phê duyệt (Pending Approval)</em>. Trưởng phòng Dịch vụ khách hàng hoặc Quản trị viên phải phê duyệt thì tài liệu mới được đưa vào kho tri thức RAG chính thức của AI.
              </span>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-[#004b91] hover:bg-[#00386d] rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Bắt đầu xử lý & Đưa vào kho</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
