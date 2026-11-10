import React from 'react';
import { BankDocument } from '../../types';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  PieChart as PieIcon,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid
} from 'recharts';

interface AnalyticsViewProps {
  documents: BankDocument[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ documents }) => {
  const ratingData = [
    { name: 'Hữu ích & Chính xác', value: 85, fill: '#10b981' },
    { name: 'Chưa đầy đủ', value: 9, fill: '#f59e0b' },
    { name: 'Cần cập nhật văn bản', value: 4, fill: '#6366f1' },
    { name: 'Sai thông tin', value: 2, fill: '#f43f5e' },
  ];

  const topQuestionsData = [
    { question: 'Xác thực sinh trắc học NFC CCCD gắn chip', count: 342 },
    { question: 'Hồ sơ mở tài khoản người nước ngoài cư trú', count: 215 },
    { question: 'Rút sổ tiết kiệm trước hạn và cách tính lãi', count: 184 },
    { question: 'Ngưỡng báo cáo tiền mặt giá trị lớn CTR 400M', count: 128 },
    { question: 'Khóa thẻ khẩn cấp và tra soát khiếu nại', count: 112 },
    { question: 'Hạn mức vay thấu chi tiêu dùng Sacombank Pay', count: 95 },
  ];

  const knowledgeGaps = [
    {
      title: 'Lúng túng về quy trình hỗ trợ khách hàng không có điện thoại NFC',
      description: 'Phát hiện 34 lượt hỏi về xử lý khi điện thoại khách hàng không có NFC để kích hoạt sinh trắc học trên Sacombank Pay.',
      recommendation: 'Đề xuất Phòng Dịch vụ Khách hàng chi nhánh Gò Vấp hướng dẫn bổ sung quy trình sử dụng đầu đọc thẻ ID Reader tại quầy.',
      severity: 'HIGH'
    },
    {
      title: 'Thắc mắc về tính lãi tiền gửi tiết kiệm rút từng phần',
      description: 'Giao dịch viên thường hỏi lại cách giữ nguyên lãi suất kỳ hạn đối với phần vốn còn lại sau khi rút một phần trước hạn.',
      recommendation: 'Tổ chức buổi đào tạo nội bộ 15 phút đầu giờ về Thông tư 04/2022/TT-NHNN.',
      severity: 'MEDIUM'
    },
    {
      title: 'Dự thảo QĐ-110 về thu đổi ngoại tệ chưa được phê duyệt',
      description: 'Có 18 câu hỏi về hạn mức 5.000 USD thu đổi ngoại tệ mặt nhưng văn bản vẫn đang ở trạng thái Chờ duyệt.',
      recommendation: 'Đề xuất Trưởng phòng sớm hoàn tất phê duyệt tài liệu để chính thức đưa vào kho tri thức RAG.',
      severity: 'MEDIUM'
    }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#004b91]" />
          Báo cáo Tri thức & Phân tích Đào tạo Chi nhánh
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Dành cho Cấp Quản lý (Manager & Admin) • Phân tích lỗ hổng tri thức (Knowledge Gaps), tần suất nghiệp vụ và đề xuất đào tạo bổ sung
        </p>
      </div>

      {/* Recharts Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Queried Topics Bar Chart */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Top 6 Chủ đề Giao dịch viên Tra cứu Nhiều nhất
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Tháng 11/2026</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topQuestionsData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="question"
                  tick={{ fontSize: 10, fill: '#334155' }}
                  axisLine={false}
                  tickLine={false}
                  width={140}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                />
                <Bar dataKey="count" fill="#004b91" radius={[0, 4, 4, 0]} name="Lượt tra cứu" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Satisfaction Rating Pie Chart */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Tỷ lệ Đánh giá Câu trả lời của AI
            </h3>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              85% Rất hữu ích
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {ratingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Knowledge Gaps & Training Recommendations */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Phát hiện Lỗ hổng Tri thức (Knowledge Gaps) & Đề xuất Đào tạo</span>
          </h3>
          <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold font-mono">
            AI Operational Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {knowledgeGaps.map((gap, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border space-y-2 text-xs ${
                gap.severity === 'HIGH'
                  ? 'bg-rose-50/30 border-rose-200'
                  : 'bg-amber-50/30 border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 leading-snug">
                  {gap.title}
                </span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono ${
                    gap.severity === 'HIGH'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {gap.severity}
                </span>
              </div>

              <p className="text-slate-600 leading-relaxed text-[11px]">
                {gap.description}
              </p>

              <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-800 font-medium">
                <strong className="text-[#004b91]">Kiến nghị Quản lý:</strong> {gap.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
