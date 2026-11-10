/**
 * Core type definitions for Sacombank AI Knowledge Assistant
 */

export type RoleType = 'ADMIN' | 'MANAGER' | 'TELLER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  title: string;
  department: string;
  branch: string;
  avatar: string;
}

export type DocumentStatus = 'ACTIVE' | 'PENDING_APPROVAL' | 'DRAFT' | 'SUPERSEDED' | 'EXPIRED';

export type SecurityLevel = 'INTERNAL' | 'CONFIDENTIAL' | 'PUBLIC';

export type BusinessCategory = 
  | 'TIEN_GUI' // Tiền gửi & Tiết kiệm
  | 'TIN_DUNG' // Tín dụng & Cho vay
  | 'THANH_TOAN' // Thanh toán & Chuyển tiền
  | 'THE_NGAN_HANG' // Thẻ & POS
  | 'EBANKING' // Ngân hàng điện tử & Sacombank Pay
  | 'NGOAI_HOI' // Ngoại hối & Kiều hối
  | 'AML_KYC' // Phòng chống rửa tiền & Định danh;

export interface DocumentChunk {
  chunkId: string;
  documentId: string;
  title: string; // e.g. "Điều 5. Hồ sơ mở tài khoản cho người nước ngoài"
  content: string;
  pageNumber: number;
  clauseNumber?: string;
  keywords: string[];
  vectorEmbedding?: number[];
}

export interface DocumentVersion {
  version: string;
  updatedAt: string;
  updatedBy: string;
  changeSummary: string;
  filePath?: string;
  status: DocumentStatus;
  fullText: string;
}

export interface BankDocument {
  id: string;
  docCode: string; // e.g. "QĐ-142/2025/TGĐ-SCB"
  title: string;
  category: BusinessCategory;
  categoryName: string;
  issuer: string; // e.g. "Tổng Giám đốc Sacombank", "NHNN Việt Nam"
  issueDate: string;
  effectiveDate: string;
  expirationDate?: string;
  currentVersion: string;
  status: DocumentStatus;
  securityLevel: SecurityLevel;
  uploadedBy: string;
  approvedBy?: string;
  approvalDate?: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'SCAN_OCR';
  fileSize: string;
  supersededByDocCode?: string; // If superseded, code of replacement document
  supersedesDocCode?: string; // If this replaced an older document
  versions: DocumentVersion[];
  chunks: DocumentChunk[];
  summary: string;
  totalViews: number;
}

export interface Citation {
  citationId: string;
  documentId: string;
  docCode: string;
  documentTitle: string;
  clause: string;
  pageNumber: number;
  version: string;
  effectiveDate: string;
  snippet: string;
  relevanceScore: number;
}

export interface StructuredAiAnswer {
  summary: string; // Trả lời ngắn gọn
  steps?: string[]; // Các bước thực hiện tuần tự
  notes?: string[]; // Lưu ý nghiệp vụ & ngoại lệ & AML checks
  citations: Citation[]; // Nguồn tham chiếu căn cứ
  confidenceScore: number;
  isVerified: boolean;
  warnings?: string[]; // Cảnh báo văn bản hết hiệu lực hoặc mâu thuẫn
}

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI' | 'SYSTEM';
  timestamp: string;
  text?: string;
  structuredAnswer?: StructuredAiAnswer;
  processingTimeMs?: number;
  ragPipelineSteps?: {
    intent: string;
    keywords: string[];
    retrievedCount: number;
    rerankedCount: number;
    filteredCount: number;
    modelUsed: string;
  };
  feedback?: {
    type: 'HELPFUL' | 'INCOMPLETE' | 'INCORRECT' | 'WRONG_CITATION' | 'OUT_OF_SCOPE';
    comment?: string;
    submittedAt: string;
    status: 'PENDING' | 'RESOLVED';
  };
}

export interface ChatConversation {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: RoleType;
  action: 'LOGIN' | 'DOCUMENT_UPLOAD' | 'DOCUMENT_APPROVE' | 'DOCUMENT_UPDATE' | 'AI_QUERY' | 'FEEDBACK_SUBMIT' | 'CONFIG_UPDATE' | 'BENCHMARK_RUN';
  description: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  details?: Record<string, any>;
}

export interface AiConfig {
  provider: 'GEMINI' | 'ON_PREMISE_LLM';
  modelName: string;
  embeddingModel: string;
  vectorDb: 'POSTGRES_PGVECTOR' | 'INTERNAL_HYBRID';
  chunkSize: number;
  chunkOverlap: number;
  topK: number;
  similarityThreshold: number;
  enableReranking: boolean;
  temperature: number;
  maxOutputTokens: number;
  systemPrompt: string;
  strictGroundedOnly: boolean;
}

export interface BenchmarkTestCase {
  id: string;
  title: string;
  category: BusinessCategory;
  question: string;
  expectedDocCodes: string[];
  expectedClauses: string[];
  referenceAnswer: string;
  testType: 'STANDARD' | 'MULTI_DOC' | 'SUPERSEDED_WARNING' | 'OUT_OF_SCOPE' | 'EXCEPTION_HANDLING';
}

export interface BenchmarkResult {
  runId: string;
  timestamp: string;
  totalTests: number;
  passedCount: number;
  precisionAtK: number;
  recallAtK: number;
  faithfulnessRate: number;
  citationAccuracy: number;
  avgResponseTimeMs: number;
  details: {
    testId: string;
    passed: boolean;
    retrievedDocs: string[];
    citationsCorrect: boolean;
    notes: string;
  }[];
}
