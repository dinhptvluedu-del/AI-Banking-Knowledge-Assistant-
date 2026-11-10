# SACOMBANK AI KNOWLEDGE ASSISTANT
**Trợ lý Tri thức AI Hỗ trợ Giao dịch viên Cập nhật Văn bản, Quy trình và Nghiệp vụ Ngân hàng**  
*Đơn vị áp dụng thử nghiệm: Phòng Dịch vụ Khách hàng, Sacombank – Chi nhánh Gò Vấp*

---

## 1. Giới thiệu tổng quan

Ứng dụng **Sacombank AI Knowledge Assistant** giải quyết bài toán tra cứu văn bản nghiệp vụ phân tán, thủ công tại quầy giao dịch. Hệ thống chuyển đổi căn bản từ phương thức *"tìm kiếm tài liệu"* sang *"tìm kiếm câu trả lời nghiệp vụ có căn cứ xác thực, có trích dẫn điều khoản và có thể kiểm chứng tức thì"*.

### Nguyên tắc vận hành cốt lõi:
1. **Chống ảo giác (Strictly Grounded)**: AI chỉ trả lời dựa trên các văn bản quy định đang có hiệu lực (`ACTIVE`). Tuyệt đối không tự suy diễn hoặc bịa đặt số văn bản, điều khoản hay ngày hiệu lực.
2. **Cảnh báo văn bản hết hiệu lực**: Tự động phát hiện và cảnh báo đỏ khi câu hỏi liên quan đến văn bản cũ đã bị bãi bỏ hoặc thay thế (ví dụ: QĐ-88/2024 về sinh trắc học đã bị thay thế bởi QĐ-284/2026).
3. **Trích dẫn có kiểm chứng (Clickable Verification)**: Mỗi câu trả lời đều đi kèm nhãn trích dẫn chi tiết gồm mã văn bản, điều khoản, trang và tỷ lệ khớp. Nhấn vào nhãn sẽ mở trực tiếp văn bản gốc với đoạn trích được bôi sáng.
4. **Phân quyền vai trò (RBAC)**: Phân tách rõ ràng quyền hạn giữa Giao dịch viên (`TELLER`), Trưởng phòng/Kiểm soát viên (`MANAGER`) và Quản trị viên hệ thống (`ADMIN`).

---

## 2. Kiến trúc Kỹ thuật

```
├── Frontend (Client-side)
│   ├── React 19 + TypeScript
│   ├── Tailwind CSS v4 (Phong cách thương hiệu Sacombank: Xanh dương #004b91 & Đỏ điểm nhấn)
│   ├── Recharts (Biểu đồ phân tích xu hướng, chủ đề & đánh giá)
│   └── Lucide Icons
│
├── Server-side & AI Backend
│   ├── Node.js / Express Server API Proxy (`/api/*`)
│   ├── @google/genai SDK (Mô hình Gemini 3.8 Flash, Server-side telemetry)
│   └── API Key an toàn lưu tại Server (không bao giờ lộ ra trình duyệt)
│
├── RAG & Vector Engine
│   ├── Hybrid Retrieval: Vector Search (Cosine Similarity) + BM25 Keyword Search
│   ├── Vietnamese Text Normalization (xử lý tiếng Việt có dấu/không dấu chuẩn xác)
│   ├── Phân đoạn logic (Chunking theo Điều khoản & Mục văn bản)
│   └── Re-ranking & Lọc trạng thái văn bản (Active / Pending / Superseded)
│
└── Database & Caching
    ├── PostgreSQL 16 + pgvector
    └── Redis Cache
```

---

## 3. Các Trang & Module Chức năng

1. **Dashboard Tổng quan**: Theo dõi KPI vận hành tại Chi nhánh Gò Vấp (tổng văn bản, lượt hỏi đáp, độ chính xác trích dẫn, thời gian phản hồi TB, biểu đồ Recharts và cảnh báo quy trình mới bắt buộc).
2. **Trợ lý AI – Hỏi đáp Nghiệp vụ**: Giao diện hội thoại thông minh, câu hỏi gợi ý theo các tình huống quầy thường gặp, câu trả lời định dạng 4 phần chuẩn ngân hàng, bộ trực quan hóa quy trình RAG Pipeline, và gửi phản hồi đánh giá.
3. **Kho Tài liệu Văn bản**: Quản lý tập trung 18 văn bản nghiệp vụ, tìm kiếm theo mã, xem phân đoạn chunks, theo dõi lịch sử cập nhật và tải lên tài liệu mới.
4. **Đối chiếu Phiên bản (Diff Viewer)**: So sánh trực quan văn bản cũ vs văn bản mới thay thế, phân biệt màu sắc các đoạn sửa đổi/bổ sung/bãi bỏ và tổng hợp thay đổi bằng AI.
5. **Tra cứu Văn bản Nâng cao**: Tìm kiếm hybrid theo từ khóa, nhóm nghiệp vụ, trạng thái hiệu lực và khoảng thời gian.
6. **Lịch sử Hỏi đáp & Quản lý Phản hồi**: Lưu vết toàn bộ câu hỏi của giao dịch viên, lọc các phản hồi tiêu cực để Trưởng phòng rà soát.
7. **Báo cáo & Phân tích Tri thức**: Phát hiện lỗ hổng tri thức (Knowledge Gaps), tổng hợp top câu hỏi và đề xuất đào tạo bổ sung.
8. **Quản trị Người dùng & Phân quyền**: Quản lý tài khoản cán bộ nhân viên, ma trận quyền hạn RBAC chi tiết.
9. **Cấu hình Hệ thống AI**: Tinh chỉnh LLM Provider, Embedding, Chunk Size, Overlap, Top-K, Ngưỡng tương đồng, Reranking, và Test Bench Playground.
10. **Module Kiểm thử RAG (Benchmark)**: Bộ kiểm thử đánh giá tự động Precision@K, Recall@K, Faithfulness, Citation Accuracy và Average Latency.
11. **Nhật ký Hoạt động (Audit Trail)**: Ghi vết toàn bộ hành vi đăng nhập, truy vấn, duyệt tài liệu và thay đổi cấu hình phục vụ thanh tra tuân thủ.

---

## 4. Cài đặt và Vận hành

### Yêu cầu môi trường:
- Node.js >= 20.x
- Docker & Docker Compose (tùy chọn khi triển khai cụm dịch vụ)

### Các bước chạy Local:
```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy kiểm thử tự động (Unit Tests)
npx --yes tsx --test src/utils/searchUtils.test.ts

# 3. Khởi động môi trường phát triển
npm run dev
# Mở trình duyệt tại http://localhost:3000
```

### Triển khai bằng Docker Compose:
```bash
docker-compose up -d --build
```

---

## 5. Dữ liệu Thử nghiệm

Ứng dụng được cài đặt sẵn bộ dữ liệu giả lập chuẩn nghiệp vụ ngân hàng:
- **Tài khoản**:
  - `TELLER`: Nguyễn Văn An (`teller.govap@sacombank.com`) - Giao dịch viên Quầy 03
  - `MANAGER`: Trần Thị Thu Trang (`manager.govap@sacombank.com`) - Trưởng phòng Dịch vụ Khách hàng
  - `ADMIN`: Đào Minh Hải (`admin.govap@sacombank.com`) - Quản trị viên Hệ thống
- **Văn bản quy định**:
  - `QĐ-284/2026/QĐ-TGĐ`: Xác thực sinh trắc học và an toàn thanh toán trực tuyến (Mới 2026 - Active)
  - `QĐ-88/2024/QĐ-TGĐ`: Xác thực sinh trắc học bản cũ 2024 (Superseded - Đã hết hiệu lực)
  - `HD-56/2025/HD-NV`: Nhận và chi trả tiền gửi tiết kiệm có kỳ hạn tại quầy
  - `QĐ-142/2025/QĐ-TGĐ`: Mở và quản lý tài khoản thanh toán cá nhân & tổ chức (Thông tư 17)
  - `QTr-33/2025/QTr-KHCN`: Phát hành và quản lý thẻ tín dụng quốc tế Sacombank
  - `QĐ-99/2025/QĐ-TGĐ`: Phòng chống rửa tiền (AML/CFT) & báo cáo CTR 400 triệu đồng
  - `QTr-15/2026/QTr-TD`: Cấp hạn mức thấu chi tiêu dùng trên Sacombank Pay
  - `QĐ-110/2026/QĐ-TGĐ`: Thu đổi ngoại tệ mặt (Bản dự thảo Chờ phê duyệt)
