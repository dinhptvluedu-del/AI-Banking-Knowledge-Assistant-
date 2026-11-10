import React, { useState } from 'react';
import { AiConfig, BankDocument, User } from '../../types';
import { retrieveChunks } from '../../services/ragService';
import {
  Settings,
  Cpu,
  Database,
  Sliders,
  CheckCircle,
  Play,
  Save,
  RotateCcw,
  Zap,
  ShieldCheck,
  Key
} from 'lucide-react';

interface AiConfigViewProps {
  config: AiConfig;
  onUpdateConfig: (newConfig: AiConfig) => void;
  documents: BankDocument[];
  currentUser: User;
  onLogAudit: (action: any, desc: string, details?: any) => void;
}

export const AiConfigView: React.FC<AiConfigViewProps> = ({
  config,
  onUpdateConfig,
  documents,
  currentUser,
  onLogAudit,
}) => {
  const [formConfig, setFormConfig] = useState<AiConfig>({ ...config });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testQuery, setTestQuery] = useState('Hạn mức xác thực sinh trắc học NFC');
  const [testResults, setTestResults] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(formConfig);
    setSaveSuccess(true);
    onLogAudit('CONFIG_UPDATE', 'Cập nhật cấu hình tham số hệ thống RAG', {
      topK: formConfig.topK,
      threshold: formConfig.similarityThreshold,
      model: formConfig.modelName
    });
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleRunPlayground = () => {
    if (!testQuery.trim()) return;
    setTesting(true);

    setTimeout(() => {
      const { results, intent, keywords } = retrieveChunks(
        testQuery,
        documents,
        currentUser.role,
        { topK: formConfig.topK, threshold: formConfig.similarityThreshold }
      );

      setTestResults({
        results,
        intent,
        keywords,
        contextText: results.map(r => `[${r.document.docCode} - ${r.chunk.title}]: ${r.chunk.content}`).join('\n\n')
      });
      setTesting(false);
    }, 400);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#004b91]" />
          Cấu hình Hệ thống AI & RAG Engine
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Dành riêng cho Quản trị viên hệ thống • Tinh chỉnh tham số Retrieval, Reranking, mô hình ngôn ngữ và kiểm thử trực tiếp
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Settings Form */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>1. Mô hình Ngôn ngữ & Embedding</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Nhà cung cấp AI (Provider):</label>
                <select
                  value={formConfig.provider}
                  onChange={e => setFormConfig({ ...formConfig, provider: e.target.value as any })}
                  className="w-full text-xs p-2.5 mt-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] focus:outline-none bg-white"
                >
                  <option value="GEMINI">Google Gemini API (Cloud Run Engine)</option>
                  <option value="ON_PREMISE_LLM">Sacombank On-Premises (Private Server)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Tên mô hình (Model Name):</label>
                <select
                  value={formConfig.modelName}
                  onChange={e => setFormConfig({ ...formConfig, modelName: e.target.value })}
                  className="w-full text-xs p-2.5 mt-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] focus:outline-none bg-white font-mono"
                >
                  <option value="gemini-3.8-flash">gemini-3.8-flash (Tốc độ phản hồi cao)</option>
                  <option value="gemini-4-argon">gemini-4-argon (Suy luận phức tạp)</option>
                  <option value="sacombank-bge-70b">Sacombank-OnPremise-70B</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Embedding Model:</label>
                <input
                  type="text"
                  value={formConfig.embeddingModel}
                  onChange={e => setFormConfig({ ...formConfig, embeddingModel: e.target.value })}
                  className="w-full text-xs font-mono p-2.5 mt-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Vector Database:</label>
                <select
                  value={formConfig.vectorDb}
                  onChange={e => setFormConfig({ ...formConfig, vectorDb: e.target.value as any })}
                  className="w-full text-xs p-2.5 mt-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] focus:outline-none bg-white font-mono"
                >
                  <option value="POSTGRES_PGVECTOR">PostgreSQL + pgvector (Chuẩn ngân hàng)</option>
                  <option value="INTERNAL_HYBRID">In-memory Hybrid Search</option>
                </select>
              </div>
            </div>

            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 pt-3 pb-2 border-b border-slate-100">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>2. Tham số RAG & Ngưỡng Truy xuất</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700">Top-K (Số đoạn trích xuất):</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={formConfig.topK}
                  onChange={e => setFormConfig({ ...formConfig, topK: parseInt(e.target.value) || 4 })}
                  className="w-full text-xs p-2 mt-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Ngưỡng tương đồng (0.0 - 1.0):</label>
                <input
                  type="number"
                  step={0.05}
                  min={0.1}
                  max={0.9}
                  value={formConfig.similarityThreshold}
                  onChange={e => setFormConfig({ ...formConfig, similarityThreshold: parseFloat(e.target.value) || 0.6 })}
                  className="w-full text-xs p-2 mt-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Temperature (Độ sáng tạo):</label>
                <input
                  type="number"
                  step={0.1}
                  min={0.0}
                  max={1.0}
                  value={formConfig.temperature}
                  onChange={e => setFormConfig({ ...formConfig, temperature: parseFloat(e.target.value) || 0.2 })}
                  className="w-full text-xs p-2 mt-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91] font-mono"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="rerankToggle"
                checked={formConfig.enableReranking}
                onChange={e => setFormConfig({ ...formConfig, enableReranking: e.target.checked })}
                className="w-4 h-4 text-[#004b91] rounded border-slate-300 focus:ring-[#004b91]"
              />
              <label htmlFor="rerankToggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Bật mô hình Reranking (Cross-Encoder) để tái xếp hạng độ liên quan của điều khoản
              </label>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {saveSuccess ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Đã lưu và áp dụng cấu hình RAG thành công!
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">
                  Thay đổi sẽ có hiệu lực tức thì trên toàn bộ máy trạm quầy giao dịch.
                </span>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#004b91] hover:bg-[#00386d] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Lưu cấu hình</span>
              </button>
            </div>
          </form>
        </div>

        {/* AI Playground / Test Bench */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Play className="w-4 h-4 text-purple-600" />
              <span>Thử nghiệm truy xuất trực tiếp (Playground)</span>
            </h3>
            <span className="text-[10px] font-mono bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-bold">
              Test Bench
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">Câu hỏi thử nghiệm:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={testQuery}
                onChange={e => setTestQuery(e.target.value)}
                placeholder="Nhập câu hỏi thử nghiệm..."
                className="flex-1 text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#004b91]"
              />
              <button
                type="button"
                onClick={handleRunPlayground}
                disabled={testing}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
              >
                {testing ? 'Đang chạy...' : 'Kiểm tra'}
              </button>
            </div>
          </div>

          {testResults && (
            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-purple-900 space-y-1">
                <div className="font-bold flex justify-between">
                  <span>Ý định: {testResults.intent}</span>
                  <span>{testResults.results.length} chunks tìm thấy</span>
                </div>
                <div className="text-[11px] text-purple-700">
                  Từ khóa: {testResults.keywords.join(', ')}
                </div>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                <div className="font-bold text-slate-700 text-[11px] uppercase">
                  Các đoạn văn bản được trích xuất (Top {testResults.results.length}):
                </div>
                {testResults.results.map((r: any, idx: number) => (
                  <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between items-center font-bold text-[#004b91]">
                      <span>{r.document.docCode} - {r.chunk.clauseNumber}</span>
                      <span className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded text-[10px]">
                        Điểm: {r.hybridScore}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] font-mono line-clamp-2">
                      {r.chunk.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
