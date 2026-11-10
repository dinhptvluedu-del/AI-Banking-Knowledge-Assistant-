import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu, Database, Search, ShieldCheck, Zap } from 'lucide-react';

interface RagPipelineVisualizerProps {
  intent: string;
  keywords: string[];
  retrievedCount: number;
  rerankedCount: number;
  filteredCount: number;
  processingTimeMs?: number;
  modelUsed: string;
}

export const RagPipelineVisualizer: React.FC<RagPipelineVisualizerProps> = ({
  intent,
  keywords,
  retrievedCount,
  rerankedCount,
  filteredCount,
  processingTimeMs,
  modelUsed,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2 border border-slate-200 rounded-lg bg-slate-50/70 overflow-hidden text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-1.5 flex items-center justify-between text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Cpu className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-semibold text-slate-700">Quy trình xử lý RAG & Căn cứ kiểm chứng</span>
          {processingTimeMs && (
            <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              {processingTimeMs}ms
            </span>
          )}
          <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono">
            {modelUsed}
          </span>
        </div>
        <div className="flex items-center text-slate-400">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-3 border-t border-slate-200 bg-white grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
          {/* Step 1: Intent & Keywords */}
          <div className="p-2 rounded bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1 font-bold text-slate-700">
              <Search className="w-3 h-3 text-blue-500" />
              <span>1. Ý định & Từ khóa</span>
            </div>
            <div className="text-slate-600">
              <span className="font-semibold text-blue-700">Ý định:</span> {intent}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {keywords.map((kw, i) => (
                <span key={i} className="bg-slate-200/80 px-1 py-0.2 rounded text-[10px] text-slate-700">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Step 2: Vector & Hybrid Search */}
          <div className="p-2 rounded bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1 font-bold text-slate-700">
              <Database className="w-3 h-3 text-emerald-500" />
              <span>2. Vector & Hybrid</span>
            </div>
            <div className="text-slate-600">
              Truy xuất: <strong className="text-slate-900">{retrievedCount} đoạn</strong> từ kho pgvector
            </div>
            <div className="text-slate-500 text-[10px]">
              Cosine Sim + BM25 kết hợp
            </div>
          </div>

          {/* Step 3: Reranking & Filter */}
          <div className="p-2 rounded bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1 font-bold text-slate-700">
              <ShieldCheck className="w-3 h-3 text-amber-500" />
              <span>3. Lọc hiệu lực văn bản</span>
            </div>
            <div className="text-slate-600">
              Lọc văn bản còn hiệu lực: <strong className="text-emerald-700">Active Only</strong>
            </div>
            <div className="text-slate-500 text-[10px]">
              Loại trừ/cảnh báo văn bản Superseded
            </div>
          </div>

          {/* Step 4: Verification */}
          <div className="p-2 rounded bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1 font-bold text-slate-700">
              <Cpu className="w-3 h-3 text-purple-500" />
              <span>4. Tổng hợp có căn cứ</span>
            </div>
            <div className="text-slate-600">
              Mô hình: <strong className="text-purple-700">{modelUsed}</strong>
            </div>
            <div className="text-slate-500 text-[10px]">
              Chống ảo giác (Strictly Grounded)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
