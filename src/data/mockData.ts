import { AiConfig, AuditLog, BenchmarkTestCase, ChatMessage } from '../types';

export const DEFAULT_AI_CONFIG: AiConfig = {
  provider: 'GEMINI',
  modelName: 'gemini-3.8-flash',
  embeddingModel: 'gemini-embedding-2',
  vectorDb: 'POSTGRES_PGVECTOR',
  chunkSize: 500,
  chunkOverlap: 50,
  topK: 4,
  similarityThreshold: 0.60,
  enableReranking: true,
  temperature: 0.2,
  maxOutputTokens: 2048,
  systemPrompt: `Bạn là Trợ lý Tri thức AI chuyên sâu về quy trình và nghiệp vụ ngân hàng Sacombank (Chi nhánh Gò Vấp - Phòng Dịch vụ Khách hàng).
Nhiệm vụ: Cung cấp câu trả lời chính xác, rõ ràng cho Giao dịch viên dựa DUY NHẤT trên các văn bản quy định chính thức đang có hiệu lực.
Nguyên tắc trả lời:
1. Không tự bịa đặt, không suy diễn quy định.
2. Trích dẫn rõ ràng: Tên tài liệu, Mã văn bản, Điều khoản, Trang, Ngày hiệu lực.
3. Nếu văn bản đã hết hiệu lực hoặc chưa được phê duyệt, phải đưa ra cảnh báo nghiêm ngặt.
4. Tuân thủ cấu trúc 4 phần: Trả lời ngắn gọn, Các bước thực hiện, Lưu ý nghiệp vụ & ngoại lệ, Nguồn tham chiếu.`,
  strictGroundedOnly: true
};

export const BENCHMARK_TEST_CASES: BenchmarkTestCase[] = [
  {
    id: 'tc-01',
    title: 'Xác thực sinh trắc học giao dịch chuyển tiền trực tuyến',
    category: 'EBANKING',
    question: 'Hạn mức chuyển tiền nào trên Sacombank Pay bắt buộc phải xác thực sinh trắc học khuôn mặt?',
    expectedDocCodes: ['QĐ-284/2026/QĐ-TGĐ'],
    expectedClauses: ['Điều 2'],
    referenceAnswer: 'Giao dịch chuyển tiền từng lần từ 10 triệu đồng trở lên hoặc tổng giá trị giao dịch trong ngày vượt quá 20 triệu đồng; và giao dịch kích hoạt thiết bị mới lần đầu.',
    testType: 'STANDARD'
  },
  {
    id: 'tc-02',
    title: 'Hồ sơ mở tài khoản cho người nước ngoài cư trú',
    category: 'THANH_TOAN',
    question: 'Khách hàng là người nước ngoài cần những giấy tờ gì để mở tài khoản thanh toán tại Sacombank?',
    expectedDocCodes: ['QĐ-142/2025/QĐ-TGĐ'],
    expectedClauses: ['Điều 7'],
    referenceAnswer: 'Hộ chiếu còn hạn tối thiểu 6 tháng; Thị thực/Visa còn hạn hoặc Thẻ tạm trú/thường trú; Hợp đồng lao động hoặc quyết định công tác từ 12 tháng trở lên; Giấy đề nghị mở tài khoản mẫu Sacombank.',
    testType: 'STANDARD'
  },
  {
    id: 'tc-03',
    title: 'Rút tiền gửi tiết kiệm trước hạn và cách tính lãi',
    category: 'TIEN_GUI',
    question: 'Khách hàng rút một phần sổ tiết kiệm trước ngày đáo hạn thì lãi suất được tính như thế nào?',
    expectedDocCodes: ['HD-56/2025/HD-NV'],
    expectedClauses: ['Điều 4'],
    referenceAnswer: 'Phần vốn rút trước hạn áp dụng lãi suất không kỳ hạn thấp nhất tại thời điểm rút. Phần vốn còn lại tiếp tục được hưởng nguyên lãi suất có kỳ hạn ban đầu.',
    testType: 'STANDARD'
  },
  {
    id: 'tc-04',
    title: 'Cảnh báo văn bản hết hiệu lực (Quy định 2024 vs 2026)',
    category: 'EBANKING',
    question: 'Văn bản QĐ-88/2024/QĐ-TGĐ về sinh trắc học hiện nay còn áp dụng không?',
    expectedDocCodes: ['QĐ-284/2026/QĐ-TGĐ', 'QĐ-88/2024/QĐ-TGĐ'],
    expectedClauses: ['Điều 1'],
    referenceAnswer: 'QĐ-88/2024/QĐ-TGĐ đã hết hiệu lực từ ngày 15/01/2026 và được thay thế toàn diện bởi QĐ-284/2026/QĐ-TGĐ.',
    testType: 'SUPERSEDED_WARNING'
  },
  {
    id: 'tc-05',
    title: 'Xử lý báo cáo giao dịch tiền mặt giá trị lớn (AML)',
    category: 'AML_KYC',
    question: 'Giao dịch viên phải lập báo cáo giao dịch giá trị lớn (CTR) với số tiền mặt từ bao nhiêu?',
    expectedDocCodes: ['QĐ-99/2025/QĐ-TGĐ'],
    expectedClauses: ['Điều 11'],
    referenceAnswer: 'Từ 400.000.000 VNĐ (bốn trăm triệu đồng) hoặc ngoại tệ tương đương trong ngày, đồng thời yêu cầu khách hàng xuất trình giấy tờ chứng minh nguồn gốc tiền hợp pháp.',
    testType: 'STANDARD'
  },
  {
    id: 'tc-06',
    title: 'Xử lý câu hỏi ngoài phạm vi nghiệp vụ ngân hàng',
    category: 'AML_KYC',
    question: 'Dự báo giá vàng thế giới ngày mai tăng hay giảm và Sacombank có bán bảo hiểm xe máy tại quầy không?',
    expectedDocCodes: [],
    expectedClauses: [],
    referenceAnswer: 'Hệ thống thông báo không đủ căn cứ trong tài liệu quy trình nội bộ của ngân hàng.',
    testType: 'OUT_OF_SCOPE'
  }
];

export const MOCK_INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome-01',
    sender: 'AI',
    timestamp: '2026-11-10T08:00:00Z',
    text: 'Xin chào Giao dịch viên Nguyễn Văn An! Tôi là Trợ lý Tri thức AI của Sacombank Chi nhánh Gò Vấp. Tôi đã được đồng bộ với 18 văn bản quy định, quy trình nghiệp vụ mới nhất. Bạn cần tra cứu hoặc đối chiếu quy trình nghiệp vụ nào hôm nay?',
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit-001',
    timestamp: '2026-11-10 08:15:22',
    userName: 'Nguyễn Văn An',
    userRole: 'TELLER',
    action: 'LOGIN',
    description: 'Đăng nhập thành công vào hệ thống Trợ lý Tri thức AI từ máy trạm Quầy 03',
    ipAddress: '10.24.18.42',
    status: 'SUCCESS'
  },
  {
    id: 'audit-002',
    timestamp: '2026-11-10 08:30:11',
    userName: 'Nguyễn Văn An',
    userRole: 'TELLER',
    action: 'AI_QUERY',
    description: 'Truy vấn RAG: "Hạn mức sinh trắc học bắt buộc trên Sacombank Pay"',
    ipAddress: '10.24.18.42',
    status: 'SUCCESS',
    details: { docCode: 'QĐ-284/2026/QĐ-TGĐ', latencyMs: 980 }
  },
  {
    id: 'audit-003',
    timestamp: '2026-11-10 09:12:45',
    userName: 'Trần Thị Thu Trang',
    userRole: 'MANAGER',
    action: 'DOCUMENT_APPROVE',
    description: 'Phê duyệt ban hành tài liệu QĐ-284/2026/QĐ-TGĐ (Phiên bản 2.0)',
    ipAddress: '10.24.18.10',
    status: 'SUCCESS'
  },
  {
    id: 'audit-004',
    timestamp: '2026-11-10 09:45:00',
    userName: 'Đào Minh Hải',
    userRole: 'ADMIN',
    action: 'CONFIG_UPDATE',
    description: 'Cập nhật ngưỡng tương đồng Similarity Threshold từ 0.55 lên 0.60',
    ipAddress: '10.24.1.5',
    status: 'SUCCESS'
  },
  {
    id: 'audit-005',
    timestamp: '2026-11-10 10:05:14',
    userName: 'Đào Minh Hải',
    userRole: 'ADMIN',
    action: 'BENCHMARK_RUN',
    description: 'Chạy bộ kiểm thử RAG Benchmark (6/6 test cases đạt chuẩn)',
    ipAddress: '10.24.1.5',
    status: 'SUCCESS'
  }
];
