import React, { useState, useRef, useEffect } from 'react';
import { BankDocument, ChatMessage, User } from '../../types';
import { executeRagQuery } from '../../services/ragService';
import { CitationBadge } from './CitationBadge';
import { RagPipelineVisualizer } from './RagPipelineVisualizer';
import { FeedbackModal } from './FeedbackModal';
import {
  Send,
  Sparkles,
  Bot,
  User as UserIcon,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  ThumbsUp,
  MessageSquarePlus,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileQuestion
} from 'lucide-react';

interface AiChatAssistantProps {
  currentUser: User;
  documents: BankDocument[];
  onOpenDoc: (docId: string, clause?: string, pageNumber?: number) => void;
  onLogAudit: (action: any, description: string, details?: any) => void;
}

const PRESET_QUESTIONS = [
  {
    category: 'Sinh trắc học',
    query: 'Hạn mức chuyển tiền nào trên Sacombank Pay bắt buộc phải xác thực sinh trắc học khuôn mặt?'
  },
  {
    category: 'Mở tài khoản',
    query: 'Khách hàng cá nhân người nước ngoài cần giấy tờ gì để mở tài khoản thanh toán tại Sacombank?'
  },
  {
    category: 'Tiền gửi tiết kiệm',
    query: 'Khách hàng rút một phần sổ tiết kiệm trước hạn thì tính lãi suất như thế nào?'
  },
  {
    category: 'Rửa tiền (AML)',
    query: 'Giao dịch viên phải lập Báo cáo giao dịch tiền mặt giá trị lớn (CTR) từ bao nhiêu tiền?'
  },
  {
    category: 'Hiệu lực văn bản',
    query: 'Văn bản QĐ-88/2024/QĐ-TGĐ về sinh trắc học hiện nay còn hiệu lực áp dụng không?'
  },
  {
    category: 'Thẻ & Gian lận',
    query: 'Thủ tục xử lý khẩn cấp khi khách hàng đến quầy báo mất thẻ hoặc nghi ngờ gian lận?'
  }
];

export const AiChatAssistant: React.FC<AiChatAssistantProps> = ({
  currentUser,
  documents,
  onOpenDoc,
  onLogAudit,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-01',
      sender: 'AI',
      timestamp: new Date().toISOString(),
      text: `Xin chào ${currentUser.name}! Tôi là Trợ lý Tri thức AI của Sacombank Chi nhánh Gò Vấp. Hệ thống đã kết nối trực tiếp với ${documents.filter(d => d.status === 'ACTIVE').length} văn bản nghiệp vụ đang có hiệu lực. Bạn cần tra cứu hoặc đối chiếu quy trình nghiệp vụ nào tại quầy hôm nay?`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<ChatMessage | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    setInputQuery('');

    // Add User Message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'USER',
      timestamp: new Date().toISOString(),
      text: query,
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Visual step sequence
    setLoadingStep('Đang phân tích ý định & tìm kiếm ngữ nghĩa...');
    setTimeout(() => {
      setLoadingStep('Đang lọc văn bản đang hiệu lực và trích dẫn điều khoản...');
    }, 400);

    try {
      // Execute RAG
      const ragResult = await executeRagQuery(query, currentUser, documents);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'AI',
        timestamp: new Date().toISOString(),
        structuredAnswer: ragResult.structuredAnswer,
        processingTimeMs: ragResult.processingTimeMs,
        ragPipelineSteps: {
          intent: ragResult.intent,
          keywords: ragResult.keywords,
          retrievedCount: ragResult.retrievalResults.length,
          rerankedCount: ragResult.retrievalResults.length,
          filteredCount: ragResult.retrievalResults.filter(r => !r.isSuperseded).length,
          modelUsed: ragResult.modelUsed
        }
      };

      setMessages(prev => [...prev, aiMsg]);

      // Audit log
      onLogAudit('AI_QUERY', `Truy vấn nghiệp vụ: "${query.slice(0, 80)}"`, {
        latencyMs: ragResult.processingTimeMs,
        citationsCount: ragResult.structuredAnswer.citations.length,
        intent: ragResult.intent
      });
    } catch (err: any) {
      console.error('RAG Error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'AI',
        timestamp: new Date().toISOString(),
        text: 'Có lỗi phát sinh trong quá trình truy xuất tri thức. Vui lòng thử lại hoặc liên hệ Quản trị viên hệ thống.'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'AI',
        timestamp: new Date().toISOString(),
        text: `Phiên làm việc mới đã bắt đầu. Sẵn sàng hỗ trợ Giao dịch viên ${currentUser.name} tra cứu quy trình nghiệp vụ.`
      }
    ]);
  };

  const handleFeedbackSubmit = (
    messageId: string,
    feedbackType: 'HELPFUL' | 'INCOMPLETE' | 'INCORRECT' | 'WRONG_CITATION' | 'OUT_OF_SCOPE',
    comment: string
  ) => {
    setMessages(prev =>
      prev.map(m => {
        if (m.id === messageId) {
          return {
            ...m,
            feedback: {
              type: feedbackType,
              comment,
              submittedAt: new Date().toISOString(),
              status: 'PENDING'
            }
          };
        }
        return m;
      })
    );

    onLogAudit('FEEDBACK_SUBMIT', `Gửi đánh giá câu trả lời (${feedbackType})`, {
      messageId,
      feedbackType,
      comment
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50 relative">
      {/* Top Banner / Actions */}
      <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-md bg-blue-100 text-[#004b91] flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-800 leading-tight">
              Hỏi đáp Nghiệp vụ có Căn cứ Xác thực
            </h2>
            <p className="text-[11px] text-slate-500">
              Trợ lý đối chiếu văn bản quy định chính thức • Tự động loại trừ văn bản hết hiệu lực
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleNewChat}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Phiên mới</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {messages.map((msg) => {
          const isUser = msg.sender === 'USER';
          const ans = msg.structuredAnswer;

          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 max-w-4xl ${
                isUser ? 'ml-auto flex-row-reverse space-x-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                  isUser
                    ? 'bg-[#004b91] text-white shadow-2xs'
                    : 'bg-gradient-to-tr from-[#004b91] to-blue-500 text-white shadow-xs'
                }`}
              >
                {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Content Container */}
              <div className="space-y-2 flex-1 max-w-3xl">
                {isUser ? (
                  <div className="bg-[#004b91] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium shadow-xs leading-relaxed">
                    {msg.text}
                  </div>
                ) : ans ? (
                  /* Structured AI Answer (Bank Format) */
                  <div className="bg-white border border-slate-200 rounded-xl rounded-tl-xs p-4 sm:p-5 shadow-xs space-y-4 text-slate-800">
                    {/* Header info */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#004b91] uppercase tracking-wide bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          Câu trả lời có căn cứ
                        </span>
                        {ans.isVerified && (
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Độ tin cậy: {Math.round(ans.confidenceScore * 100)}%
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleCopy(ans.summary + '\n' + (ans.steps?.join('\n') || ''), msg.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                          title="Sao chép nội dung"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => setFeedbackMessage(msg)}
                          className="flex items-center gap-1 px-2 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md text-[11px] font-medium transition-colors"
                          title="Đánh giá câu trả lời"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Đánh giá</span>
                        </button>
                      </div>
                    </div>

                    {/* Warning Banners if any (Superseded, Draft, Out of Scope) */}
                    {ans.warnings && ans.warnings.length > 0 && (
                      <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg space-y-1">
                        {ans.warnings.map((w, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-amber-900">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>{w}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Section 1: Trả lời ngắn gọn */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <span>1. Trả lời ngắn gọn</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed bg-slate-50/80 p-3 rounded-lg border border-slate-100">
                        {ans.summary}
                      </p>
                    </div>

                    {/* Section 2: Các bước thực hiện */}
                    {ans.steps && ans.steps.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          2. Các bước thực hiện cho Giao dịch viên
                        </div>
                        <div className="space-y-1.5">
                          {ans.steps.map((step, idx) => (
                            <div
                              key={idx}
                              className="text-xs text-slate-800 flex items-start gap-2 bg-white p-2 rounded-md border border-slate-200/60 shadow-2xs"
                            >
                              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#004b91] font-bold flex items-center justify-center shrink-0 text-[10px]">
                                {idx + 1}
                              </span>
                              <span className="leading-snug">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section 3: Lưu ý nghiệp vụ & Ngoại lệ */}
                    {ans.notes && ans.notes.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          3. Lưu ý nghiệp vụ & Cảnh báo rủi ro
                        </div>
                        <ul className="space-y-1 text-xs text-slate-700 bg-amber-50/40 border border-amber-100 p-2.5 rounded-lg list-disc list-inside">
                          {ans.notes.map((note, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Section 4: Nguồn tham chiếu */}
                    {ans.citations && ans.citations.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                          <span>4. Nguồn tham chiếu căn cứ ({ans.citations.length} tài liệu)</span>
                          <span className="text-[10px] text-slate-400 font-normal">Nhấn vào để đối chiếu toàn văn</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {ans.citations.map((citation) => (
                            <CitationBadge
                              key={citation.citationId}
                              citation={citation}
                              onOpenDoc={onOpenDoc}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* RAG Pipeline Inspection Accordion */}
                    {msg.ragPipelineSteps && (
                      <RagPipelineVisualizer
                        intent={msg.ragPipelineSteps.intent}
                        keywords={msg.ragPipelineSteps.keywords}
                        retrievedCount={msg.ragPipelineSteps.retrievedCount}
                        rerankedCount={msg.ragPipelineSteps.rerankedCount}
                        filteredCount={msg.ragPipelineSteps.filteredCount}
                        processingTimeMs={msg.processingTimeMs}
                        modelUsed={msg.ragPipelineSteps.modelUsed}
                      />
                    )}

                    {/* Display existing feedback status if submitted */}
                    {msg.feedback && (
                      <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center justify-between">
                        <span>Đã ghi nhận phản hồi: <strong>{msg.feedback.type}</strong></span>
                        <span className="text-slate-400 text-[10px]">Đang gửi Quản lý duyệt</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Standard Plain Text Message */
                  <div className="bg-white border border-slate-200 text-slate-800 px-4 py-3 rounded-xl rounded-tl-xs text-xs font-normal shadow-2xs leading-relaxed">
                    {msg.text}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start space-x-3 mr-auto max-w-xl">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-xl rounded-tl-xs shadow-2xs space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-xs font-semibold text-slate-700">Trợ lý AI đang xử lý...</span>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                {loadingStep || 'Đang tra cứu cơ sở dữ liệu tri thức...'}
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Suggestions Pills for Frontline Tellers */}
      {messages.length <= 2 && (
        <div className="px-6 py-2 bg-slate-100/70 border-t border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-[#004b91]" />
            <span>Tình huống quầy giao dịch thường gặp tại Sacombank Gò Vấp:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_QUESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.query)}
                className="px-2.5 py-1 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-xs text-slate-700 hover:text-[#004b91] font-medium transition-all text-left shadow-2xs cursor-pointer flex items-center gap-1"
              >
                <span className="text-[10px] font-bold text-blue-600 uppercase">[{item.category}]</span>
                <span className="truncate max-w-xs">{item.query}</span>
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="max-w-4xl mx-auto flex items-center space-x-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Đặt câu hỏi nghiệp vụ (Ví dụ: Hồ sơ mở tài khoản người nước ngoài, Hạn mức sinh trắc học 10 triệu...)"
              className="w-full text-xs sm:text-sm pl-4 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004b91] focus:border-transparent transition-all placeholder:text-slate-400"
              disabled={isLoading}
            />
            {inputQuery && (
              <button
                type="button"
                onClick={() => setInputQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0 ${
              !inputQuery.trim() || isLoading
                ? 'bg-slate-300 cursor-not-allowed text-slate-100'
                : 'bg-[#004b91] hover:bg-[#00386d] active:scale-98'
            }`}
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Gửi câu hỏi</span>
          </button>
        </form>
        <div className="text-center text-[10px] text-slate-400 mt-1.5">
          Trợ lý AI chỉ đưa ra câu trả lời dựa trên các văn bản quy định đã được phê duyệt. Vui lòng kiểm chứng nguồn tài liệu gốc trước khi hướng dẫn khách hàng.
        </div>
      </div>

      {/* Feedback Modal */}
      {feedbackMessage && (
        <FeedbackModal
          messageId={feedbackMessage.id}
          queryText={feedbackMessage.structuredAnswer?.summary}
          onClose={() => setFeedbackMessage(null)}
          onSubmitFeedback={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};
