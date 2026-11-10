import React from 'react';
import { BankDocument, User } from '../../types';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Bot,
  Zap,
  TrendingUp,
  ShieldCheck,
  Building2,
  ArrowRight,
  Sparkles,
  BookOpen
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
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

interface DashboardViewProps {
  documents: BankDocument[];
  currentUser: User;
  onNavigateTab: (tab: any) => void;
  onOpenDoc: (docId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  documents,
  currentUser,
  onNavigateTab,
  onOpenDoc,
}) => {
  const activeDocs = documents.filter(d => d.status === 'ACTIVE').length;
  const pendingDocs = documents.filter(d => d.status === 'PENDING_APPROVAL').length;
  const supersededDocs = documents.filter(d => d.status === 'SUPERSEDED').length;

  // Chart data: Queries by business category
  const categoryChartData = [
    { name: 'eBanking & NFC', count: 485, fill: '#004b91' },
    { name: 'Tiền gửi & Tiết kiệm', count: 390, fill: '#0284c7' },
    { name: 'Thẻ & POS', count: 260, fill: '#0ea5e9' },
    { name: 'Tín dụng & Cho vay', count: 185, fill: '#38bdf8' },
    { name: 'AML / Rửa tiền', count: 110, fill: '#e03e2d' },
    { name: 'Ngoại hối & Kiều hối', count: 52, fill: '#eab308' },
  ];

  // Daily query trends over past 7 days
  const queryTrendData = [
    { date: '04/11', queries: 180, latency: 1.1 },
    { date: '05/11', queries: 210, latency: 1.2 },
    { date: '06/11', queries: 195, latency: 1.0 },
    { date: '07/11', queries: 240, latency: 1.3 },
    { date: '08/11', queries: 275, latency: 1.2 },
    { date: '09/11', queries: 160, latency: 0.9 },
    { date: '10/11', queries: 222, latency: 1.1 },
  ];

  const topDocuments = [...documents]
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, 4);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Branch Welcome Header */}
      <div className="bg-gradient-to-r from-[#004b91] via-[#00386d] to-[#002447] text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Sacombank – Chi nhánh Gò Vấp • P. Dịch vụ Khách hàng</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Hệ thống Trợ lý Tri thức Nghiệp vụ & Văn bản Quy trình
          </h1>
          <p className="text-xs text-blue-100 leading-relaxed">
            Hỗ trợ Giao dịch viên tra cứu quy trình, hồ sơ mẫu và đối chiếu văn bản quy định chính thức. Chuyển từ tìm kiếm tài liệu sang tìm kiếm câu trả lời có căn cứ và có thể kiểm chứng.
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => onNavigateTab('assistant')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>Hỏi đáp Trợ lý AI ngay</span>
            </button>
            <button
              onClick={() => onNavigateTab('diff')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Đối chiếu quy định sinh trắc học 2026</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Documents */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Tổng văn bản quản trị</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#004b91] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{documents.length}</div>
          <div className="flex items-center gap-2 text-[11px] text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{activeDocs} đang hiệu lực</span>
            <span className="text-slate-300">•</span>
            <span className="text-amber-600">{pendingDocs} chờ duyệt</span>
          </div>
        </div>

        {/* AI Queries this month */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Lượt tra cứu tháng này</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">1,482</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.5% so với tháng trước</span>
          </div>
        </div>

        {/* Citation Accuracy */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Độ chính xác trích dẫn</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">98.6%</div>
          <div className="text-[11px] text-slate-500">
            100% có số hiệu văn bản & trang
          </div>
        </div>

        {/* Average Processing Time */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Thời gian phản hồi TB</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">1.18s</div>
          <div className="text-[11px] text-emerald-600 font-semibold">
            Tối ưu hóa tốc độ phục vụ quầy
          </div>
        </div>
      </div>

      {/* Operational Alert Banner for Frontline Tellers */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs text-amber-950">
            <div className="font-bold flex items-center gap-2">
              <span>CẢNH BÁO QUY TRÌNH MỚI TẠI QUẦY GIAO DỊCH (Số: 284/2026/QĐ-TGĐ)</span>
              <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded font-bold uppercase">Bắt buộc</span>
            </div>
            <p className="text-amber-900 leading-relaxed">
              Từ 15/01/2026, toàn bộ giao dịch chuyển tiền trên 10 triệu đồng hoặc lũy kế 20 triệu/ngày bắt buộc phải xác thực khuôn mặt khớp dữ liệu chip NFC. Giao dịch viên sử dụng thiết bị ID Reader để hỗ trợ khách hàng không có điện thoại NFC.
            </p>
          </div>
        </div>
        <button
          onClick={() => onOpenDoc('doc-biometric-2026')}
          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
        >
          Xem toàn văn QĐ-284
        </button>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Line Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Xu hướng Lượt truy vấn 7 ngày gần nhất
              </h3>
              <p className="text-[11px] text-slate-500">Số lượng câu hỏi nghiệp vụ được giao dịch viên gửi tới AI</p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              TB: 210 lượt/ngày
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={queryTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                />
                <Line type="monotone" dataKey="queries" stroke="#004b91" strokeWidth={2.5} dot={{ r: 4, fill: '#004b91' }} activeDot={{ r: 6 }} name="Số câu hỏi" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Phân bổ Chủ đề Nghiệp vụ được tra cứu
              </h3>
              <p className="text-[11px] text-slate-500">Các nhóm nghiệp vụ giao dịch viên thường gặp vướng mắc</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} width={90} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} name="Lượt tra cứu">
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Queried Documents & Recent updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Documents */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#004b91]" />
              <span>Văn bản có tần suất tra cứu cao nhất tại Quầy Gò Vấp</span>
            </h3>
            <button
              onClick={() => onNavigateTab('documents')}
              className="text-xs text-[#004b91] hover:underline font-semibold flex items-center gap-1"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {topDocuments.map((doc, idx) => (
              <div
                key={doc.id}
                onClick={() => onOpenDoc(doc.id)}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-3 truncate">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-[#004b91] font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <div className="font-bold text-xs text-slate-900 group-hover:text-[#004b91] truncate flex items-center gap-2">
                      <span className="font-mono text-blue-700">[{doc.docCode}]</span>
                      <span className="truncate">{doc.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {doc.categoryName} • Hiệu lực từ: {doc.effectiveDate}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-3">
                  <span className="text-xs font-extrabold text-blue-700 font-mono">
                    {doc.totalViews.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 block">lượt xem</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Help Guide for Teller */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Quy trình phối hợp nghiệp vụ
          </h3>
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#004b91] block">1. Tra cứu câu hỏi nghiệp vụ</span>
              <p className="text-[11px] text-slate-600">Sử dụng Trợ lý AI để lấy câu trả lời có trích dẫn điều khoản.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#004b91] block">2. Kiểm chứng tài liệu gốc</span>
              <p className="text-[11px] text-slate-600">Nhấn vào nhãn nguồn để mở toàn văn văn bản đối chiếu.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#004b91] block">3. Báo cáo vướng mắc</span>
              <p className="text-[11px] text-slate-600">Nếu tài liệu chưa rõ, bấm "Đánh giá" để chuyển Trưởng phòng kiểm duyệt.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
