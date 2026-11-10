import React, { useState } from 'react';
import { BankDocument } from '../../types';
import {
  GitCompare,
  ArrowRight,
  PlusCircle,
  MinusCircle,
  FileText,
  Sparkles,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface DocumentDiffViewerProps {
  documents: BankDocument[];
  onOpenDoc: (docId: string) => void;
}

export const DocumentDiffViewer: React.FC<DocumentDiffViewerProps> = ({
  documents,
  onOpenDoc,
}) => {
  // Pre-select Biometric 2024 (Old) vs Biometric 2026 (New) as the primary realistic comparison case
  const [docAId, setDocAId] = useState<string>('doc-biometric-2024-old');
  const [docBId, setDocBId] = useState<string>('doc-biometric-2026');

  const docA = documents.find(d => d.id === docAId) || documents[0];
  const docB = documents.find(d => d.id === docBId) || documents[1];

  const versionA = docA?.versions[0];
  const versionB = docB?.versions[0];

  // Specific highlighted difference items for banking operations
  const differences = [
    {
      clause: 'Ngưỡng giá trị giao dịch',
      type: 'MODIFIED',
      oldText: 'Chỉ yêu cầu xác thực khuôn mặt thông thường với chuyển tiền trên 10 triệu đồng. Chưa có quy định hạn mức tích lũy trong ngày.',
      newText: 'Bắt buộc xác thực khuôn mặt đối chiếu dữ liệu thẻ CCCD gắn chip (NFC) khi chuyển tiền từ 10.000.000 VNĐ HOẶC tổng giá trị giao dịch trong ngày vượt 20.000.000 VNĐ. Áp dụng cho cả kích hoạt Sacombank Pay trên máy mới.',
      impact: 'Rất cao - Giao dịch viên phải hướng dẫn khách hàng mang CCCD gắn chip ra quầy nếu điện thoại không có NFC.'
    },
    {
      clause: 'Công nghệ & Phương thức thu thập',
      type: 'ADDED',
      oldText: '(Không có quy định đầu đọc chip NFC chuyên dụng tại quầy)',
      newText: 'Trang bị đầu đọc thẻ căn cước chuyên dụng (ID Reader) tại quầy giao dịch. Tỷ lệ khớp khuôn mặt tối thiểu đạt 85% kết nối Core Banking.',
      impact: 'Nâng cao - Chuẩn hóa thiết bị phần cứng tại toàn bộ Chi nhánh Gò Vấp.'
    },
    {
      clause: 'Quy định đối với khách hàng nước ngoài',
      type: 'ADDED',
      oldText: 'Chưa có hướng dẫn cụ thể về sinh trắc học đối với người nước ngoài.',
      newText: 'Khách hàng người nước ngoài xác thực qua Hộ chiếu còn hạn và giấy tờ chứng minh cư trú hợp pháp tại Việt Nam kèm thu thập sinh trắc học trực tiếp tại quầy.',
      impact: 'Trung bình - Tránh gián đoạn giao dịch cho chuyên gia và người nước ngoài cư trú.'
    },
    {
      clause: 'Biện pháp an ninh & Bảo mật giao dịch viên',
      type: 'ADDED',
      oldText: '(Chưa quy định chế tài cụ thể)',
      newText: 'Nghiêm cấm giao dịch viên sử dụng điện thoại cá nhân chụp hoặc lưu trữ thông tin sinh trắc học của khách hàng.',
      impact: 'Nghiêm ngặt - Tuân thủ quy định bảo vệ dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP.'
    }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-[#004b91]" />
          Đối chiếu Phiên bản & Phân tích Thay đổi Quy trình
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          So sánh trực quan giữa văn bản cũ và văn bản thay thế mới • Tự động bóc tách các điểm sửa đổi, bổ sung và bãi bỏ
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Document A (Old) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              Văn bản cũ / Phiên bản trước:
            </span>
            <span className="font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded text-[11px] font-bold">
              {docA?.status === 'SUPERSEDED' ? 'ĐÃ THAY THẾ' : docA?.status}
            </span>
          </div>
          <select
            value={docAId}
            onChange={(e) => setDocAId(e.target.value)}
            className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#004b91] focus:outline-none"
          >
            {documents.map((d) => (
              <option key={d.id} value={d.id}>
                [{d.docCode}] {d.title} (v{d.currentVersion})
              </option>
            ))}
          </select>
          <div className="text-[11px] text-slate-500 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Ngày hiệu lực: {docA?.effectiveDate}</span>
            <span>•</span>
            <span>Ban hành: {docA?.issuer}</span>
          </div>
        </div>

        {/* Document B (New) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Văn bản mới / Phiên bản hiện hành:
            </span>
            <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold">
              {docB?.status}
            </span>
          </div>
          <select
            value={docBId}
            onChange={(e) => setDocBId(e.target.value)}
            className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#004b91] focus:outline-none"
          >
            {documents.map((d) => (
              <option key={d.id} value={d.id}>
                [{d.docCode}] {d.title} (v{d.currentVersion})
              </option>
            ))}
          </select>
          <div className="text-[11px] text-slate-500 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Ngày hiệu lực: {docB?.effectiveDate}</span>
            <span>•</span>
            <span>Ban hành: {docB?.issuer}</span>
          </div>
        </div>
      </div>

      {/* AI Summary of Changes Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-5 rounded-2xl shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-xs text-[#004b91]">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Tóm tắt Điểm thay đổi cốt lõi (AI Synthesis có căn cứ văn bản):</span>
          </div>
          <span className="text-[11px] bg-white px-2.5 py-0.5 rounded-full border border-blue-200 text-blue-700 font-semibold font-mono">
            Đối chiếu {docA?.docCode} ➔ {docB?.docCode}
          </span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          Văn bản mới bổ sung cơ chế xác thực NFC qua thẻ CCCD gắn chip, nâng tỷ lệ bảo mật giao dịch trực tuyến và quy định chặt chẽ ngưỡng giao dịch 10 triệu và 20 triệu/ngày. Giao dịch viên cần lưu ý thiết bị ID Reader tại quầy và không được chụp ảnh thông tin khách hàng bằng thiết bị cá nhân.
        </p>
      </div>

      {/* Side-by-side Structured Diff Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-slate-500" />
          <span>Bảng so sánh chi tiết từng điều khoản:</span>
        </h3>

        <div className="space-y-3">
          {differences.map((diff, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden"
            >
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">
                  {idx + 1}. {diff.clause}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#004b91] uppercase">
                  {diff.type === 'MODIFIED' ? 'Sửa đổi, bổ sung' : 'Quy định mới hoàn toàn'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-xs">
                {/* Old Text */}
                <div className="p-4 bg-rose-50/20 space-y-1">
                  <div className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
                    <MinusCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span>Nội dung cũ ({docA?.docCode}):</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-mono text-[11px]">
                    {diff.oldText}
                  </p>
                </div>

                {/* New Text */}
                <div className="p-4 bg-emerald-50/20 space-y-1">
                  <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                    <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Nội dung mới ({docB?.docCode}):</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed font-mono text-[11px] font-medium">
                    {diff.newText}
                  </p>
                </div>
              </div>

              {/* Operational Impact */}
              <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] flex items-center gap-2">
                <span className="font-bold text-slate-600">Tác động nghiệp vụ tại quầy:</span>
                <span className="text-slate-800">{diff.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
