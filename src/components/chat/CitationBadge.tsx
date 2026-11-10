import React from 'react';
import { Citation } from '../../types';
import { FileCheck, ExternalLink, Calendar } from 'lucide-react';

interface CitationBadgeProps {
  citation: Citation;
  onOpenDoc: (docId: string, clause?: string, pageNumber?: number) => void;
}

export const CitationBadge: React.FC<CitationBadgeProps> = ({ citation, onOpenDoc }) => {
  return (
    <button
      onClick={() => onOpenDoc(citation.documentId, citation.clause, citation.pageNumber)}
      className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/80 hover:bg-blue-100/90 text-[#004b91] border border-blue-200 rounded-md text-xs transition-all text-left shadow-2xs hover:shadow-xs hover:border-blue-400 cursor-pointer"
      title={`Bấm để kiểm chứng tài liệu gốc: ${citation.documentTitle}`}
    >
      <FileCheck className="w-3.5 h-3.5 text-[#004b91] shrink-0" />
      <span className="font-bold">{citation.docCode}</span>
      <span className="text-blue-400">•</span>
      <span className="font-semibold text-slate-700">{citation.clause}</span>
      <span className="text-slate-400">(Trang {citation.pageNumber})</span>
      <span className="ml-1 text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-700 font-mono font-bold rounded">
        {Math.round(citation.relevanceScore * 100)}% khớp
      </span>
      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#004b91] shrink-0 ml-0.5 transition-colors" />
    </button>
  );
};
