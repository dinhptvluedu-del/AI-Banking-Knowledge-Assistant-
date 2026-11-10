import { BankDocument } from '../types';
import { generateLocalEmbedding } from '../utils/searchUtils';

export const MOCK_DOCUMENTS: BankDocument[] = [
  {
    id: 'doc-biometric-2026',
    docCode: 'QĐ-284/2026/QĐ-TGĐ',
    title: 'Quy định triển khai xác thực sinh trắc học và an toàn giao dịch thanh toán trực tuyến',
    category: 'EBANKING',
    categoryName: 'Ngân hàng điện tử & Sacombank Pay',
    issuer: 'Tổng Giám đốc Sacombank',
    issueDate: '2026-01-10',
    effectiveDate: '2026-01-15',
    currentVersion: '2.0',
    status: 'ACTIVE',
    securityLevel: 'INTERNAL',
    uploadedBy: 'Đào Minh Hải',
    approvedBy: 'Trần Thị Thu Trang',
    approvalDate: '2026-01-12',
    fileType: 'PDF',
    fileSize: '3.8 MB',
    supersedesDocCode: 'QĐ-88/2024/QĐ-TGĐ',
    summary: 'Quy định bắt buộc xác thực sinh trắc học khuôn mặt đối với giao dịch chuyển tiền trên 10 triệu đồng hoặc tổng giá trị giao dịch trong ngày vượt 20 triệu đồng theo Quyết định 2345/QĐ-NHNN. Hướng dẫn giao dịch viên hỗ trợ cài đặt NFC tại quầy.',
    totalViews: 1420,
    versions: [
      {
        version: '2.0',
        updatedAt: '2026-01-10',
        updatedBy: 'Đào Minh Hải',
        status: 'ACTIVE',
        changeSummary: 'Cập nhật bổ sung quy định xác thực căn cước công dân gắn chip qua NFC trên thiết bị di động và quy trình hỗ trợ khách hàng không có CCCD gắn chip tại quầy giao dịch.',
        fullText: `QUY ĐỊNH TRIỂN KHAI XÁC THỰC SINH TRẮC HỌC VÀ AN TOÀN GIAO DỊCH (Số: 284/2026/QĐ-TGĐ)
Căn cứ Quyết định 2345/QĐ-NHNN của Thống đốc Ngân hàng Nhà nước.
Điều 1. Phạm vi áp dụng
Áp dụng cho toàn bộ khách hàng cá nhân sử dụng ứng dụng Sacombank Pay và Internet Banking tại các Chi nhánh, Phòng giao dịch thuộc hệ thống Sacombank.
Điều 2. Ngưỡng giao dịch bắt buộc xác thực sinh trắc học
1. Giao dịch chuyển tiền từng lần có giá trị từ 10.000.000 VNĐ (mười triệu đồng) trở lên.
2. Tổng giá trị các giao dịch chuyển tiền trong ngày vượt quá 20.000.000 VNĐ (hai mươi triệu đồng).
3. Giao dịch thanh toán hàng hóa, dịch vụ qua Internet từng lần từ 100.000.000 VNĐ trở lên.
4. Giao dịch kích hoạt ứng dụng Sacombank Pay trên thiết bị di động mới lần đầu.
Điều 3. Phương thức thu thập và xác thực dữ liệu sinh trắc học
1. Thu thập tự động qua tính năng quét chip NFC trên thẻ CCCD gắn chip qua ứng dụng Sacombank Pay.
2. Đối với khách hàng sử dụng điện thoại không hỗ trợ NFC hoặc CCCD chưa đổi sang loại gắn chip: Khách hàng bắt buộc phải đến quầy giao dịch Sacombank gần nhất.
Điều 4. Quy trình xử lý của Giao dịch viên tại quầy
Bước 1: Tiếp nhận CCCD gắn chip hoặc Hộ chiếu còn hiệu lực của khách hàng.
Bước 2: Sử dụng đầu đọc thẻ căn cước chuyên dụng tại quầy (thiết bị ID Reader) để giải mã dữ liệu sinh trắc học từ chip.
Bước 3: Thực hiện chụp ảnh khuôn mặt khách hàng trực tiếp tại quầy qua camera kết nối hệ thống Core Banking.
Bước 4: Đối chiếu tỷ lệ trùng khớp (tối thiểu đạt 85%) và ký xác nhận trên biên bản cập nhật thông tin sinh trắc học.
Điều 5. Lưu ý bảo mật và xử lý trường hợp đặc biệt
- Nghiêm cấm giao dịch viên sử dụng điện thoại cá nhân để chụp hoặc lưu trữ thông tin sinh trắc học của khách hàng.
- Khách hàng là người nước ngoài không có CCCD gắn chip: Xác thực qua Hộ chiếu còn hạn và giấy tờ chứng minh cư trú hợp pháp tại Việt Nam kèm sinh trắc học khuôn mặt lưu trữ tại hệ thống.`
      },
      {
        version: '1.0',
        updatedAt: '2024-06-20',
        updatedBy: 'Lê Văn Bình',
        status: 'SUPERSEDED',
        changeSummary: 'Phiên bản ban đầu áp dụng thử nghiệm xác thực khuôn mặt thông thường chưa tích hợp chip NFC chuyên dụng.',
        fullText: `QUY ĐỊNH VỀ XÁC THỰC SINH TRẮC HỌC PHIÊN BẢN 2024 (Số: 88/2024/QĐ-TGĐ)
Điều 1. Phạm vi áp dụng
Áp dụng cho khách hàng sử dụng Sacombank mBanking.
Điều 2. Ngưỡng giao dịch
Chuyển tiền trên 10 triệu đồng cần chụp ảnh khuôn mặt (so khớp ảnh CMND cũ). Chưa áp dụng bắt buộc đọc dữ liệu chip NFC.
Điều 3. Hỗ trợ tại quầy
Giao dịch viên chụp ảnh khách hàng bằng webcam thông thường và lưu hồ sơ giấy.`
      }
    ],
    chunks: [
      {
        chunkId: 'chunk-bio-01',
        documentId: 'doc-biometric-2026',
        title: 'Điều 2. Ngưỡng giao dịch bắt buộc xác thực sinh trắc học',
        clauseNumber: 'Điều 2',
        pageNumber: 2,
        keywords: ['sinh trắc học', 'hạn mức', '10 triệu', '20 triệu', 'chuyển tiền', 'quyết định 2345'],
        content: 'Điều 2. Ngưỡng giao dịch bắt buộc xác thực sinh trắc học: 1. Giao dịch chuyển tiền từng lần có giá trị từ 10.000.000 VNĐ (mười triệu đồng) trở lên. 2. Tổng giá trị các giao dịch chuyển tiền trong ngày vượt quá 20.000.000 VNĐ. 3. Giao dịch kích hoạt ứng dụng Sacombank Pay trên thiết bị di động mới lần đầu.',
      },
      {
        chunkId: 'chunk-bio-02',
        documentId: 'doc-biometric-2026',
        title: 'Điều 4. Quy trình xử lý của Giao dịch viên tại quầy khi hỗ trợ sinh trắc học',
        clauseNumber: 'Điều 4',
        pageNumber: 3,
        keywords: ['quy trình quầy', 'hỗ trợ nfc', 'cccd gắn chip', 'đầu đọc thẻ', 'id reader', 'khuôn mặt'],
        content: 'Điều 4. Quy trình xử lý tại quầy: Bước 1: Tiếp nhận CCCD gắn chip hoặc Hộ chiếu còn hiệu lực. Bước 2: Sử dụng đầu đọc thẻ căn cước chuyên dụng (ID Reader) để giải mã dữ liệu từ chip. Bước 3: Chụp ảnh khuôn mặt khách hàng qua camera Core Banking. Bước 4: Đối chiếu tỷ lệ trùng khớp (đạt tối thiểu 85%) và hoàn tất phê duyệt trên hệ thống.',
      },
      {
        chunkId: 'chunk-bio-03',
        documentId: 'doc-biometric-2026',
        title: 'Điều 5. Lưu ý bảo mật và khách hàng nước ngoài',
        clauseNumber: 'Điều 5',
        pageNumber: 4,
        keywords: ['người nước ngoài', 'hộ chiếu', 'cư trú', 'bảo mật', 'nghiêm cấm lưu trữ'],
        content: 'Điều 5. Lưu ý bảo mật: Nghiêm cấm giao dịch viên sử dụng điện thoại cá nhân lưu trữ ảnh/dữ liệu khách hàng. Đối với khách hàng người nước ngoài không có CCCD gắn chip: xác thực qua Hộ chiếu còn hiệu lực và giấy tờ cư trú hợp pháp kèm chụp khuôn mặt trực tiếp tại quầy.',
      }
    ]
  },
  {
    id: 'doc-biometric-2024-old',
    docCode: 'QĐ-88/2024/QĐ-TGĐ',
    title: 'Quy định xác thực sinh trắc học phiên bản 2024 (Hết hiệu lực)',
    category: 'EBANKING',
    categoryName: 'Ngân hàng điện tử & Sacombank Pay',
    issuer: 'Tổng Giám đốc Sacombank',
    issueDate: '2024-06-20',
    effectiveDate: '2024-07-01',
    expirationDate: '2026-01-14',
    currentVersion: '1.0',
    status: 'SUPERSEDED',
    securityLevel: 'INTERNAL',
    uploadedBy: 'Lê Văn Bình',
    approvedBy: 'Trần Thị Thu Trang',
    fileType: 'PDF',
    fileSize: '1.5 MB',
    supersededByDocCode: 'QĐ-284/2026/QĐ-TGĐ',
    summary: 'Văn bản cũ về xác thực khuôn mặt đơn giản trước khi có chuẩn căn cước công dân gắn chip NFC. Đã bị bãi bỏ hoàn toàn bởi QĐ-284/2026/QĐ-TGĐ.',
    totalViews: 412,
    versions: [
      {
        version: '1.0',
        updatedAt: '2024-06-20',
        updatedBy: 'Lê Văn Bình',
        status: 'SUPERSEDED',
        changeSummary: 'Quy định ban đầu.',
        fullText: 'Quy định xác thực khuôn mặt thông thường năm 2024. Đã hết hiệu lực từ ngày 15/01/2026.'
      }
    ],
    chunks: [
      {
        chunkId: 'chunk-bio-old-01',
        documentId: 'doc-biometric-2024-old',
        title: 'Quy định cũ (Đã hết hiệu lực)',
        clauseNumber: 'Điều 1',
        pageNumber: 1,
        keywords: ['văn bản cũ', 'hết hiệu lực', 'sinh trắc học 2024'],
        content: 'LƯU Ý: VĂN BẢN NÀY ĐÃ HẾT HIỆU LỰC từ 15/01/2026 và được thay thế bởi QĐ-284/2026/QĐ-TGĐ. Không áp dụng để hướng dẫn giao dịch viên.',
      }
    ]
  },
  {
    id: 'doc-tiet-kiem-2025',
    docCode: 'HD-56/2025/HD-NV',
    title: 'Hướng dẫn nghiệp vụ nhận và chi trả tiền gửi tiết kiệm có kỳ hạn tại quầy',
    category: 'TIEN_GUI',
    categoryName: 'Tiền gửi & Tiết kiệm',
    issuer: 'Khối Vận hành & Dịch vụ Khách hàng',
    issueDate: '2025-03-15',
    effectiveDate: '2025-04-01',
    currentVersion: '3.1',
    status: 'ACTIVE',
    securityLevel: 'INTERNAL',
    uploadedBy: 'Đào Minh Hải',
    approvedBy: 'Trần Thị Thu Trang',
    fileType: 'DOCX',
    fileSize: '2.4 MB',
    summary: 'Quy trình chuẩn hướng dẫn giao dịch viên mở sổ tiết kiệm, chi trả lãi, rút tiền gửi tiết kiệm trước hạn và xử lý trường hợp mất sổ tiết kiệm hoặc người đứng tên qua đời.',
    totalViews: 2890,
    versions: [
      {
        version: '3.1',
        updatedAt: '2025-03-15',
        updatedBy: 'Đào Minh Hải',
        status: 'ACTIVE',
        changeSummary: 'Bổ sung hướng dẫn chi trả tiền gửi tiết kiệm từng phần trước hạn theo Thông tư 04/2022/TT-NHNN.',
        fullText: `HƯỚNG DẪN NGHIỆP VỤ TIỀN GỬI TIẾT KIỆM (Số: HD-56/2025/HD-NV)
Điều 4. Rút tiền gửi tiết kiệm trước ngày đáo hạn (Rút trước hạn)
1. Khách hàng có quyền rút toàn bộ hoặc một phần tiền gửi tiết kiệm trước ngày đến hạn.
2. Lãi suất áp dụng khi rút trước hạn:
- Phần vốn rút trước hạn: Áp dụng lãi suất tiền gửi không kỳ hạn thấp nhất của Sacombank tại thời điểm rút tiền.
- Phần vốn còn lại (nếu rút một phần): Tiếp tục được hưởng nguyên mức lãi suất có kỳ hạn ban đầu đã thỏa thuận theo kỳ hạn gửi.
3. Hồ sơ rút tiền tiết kiệm tại quầy:
- Bản chính Sổ tiết kiệm / Giấy chứng nhận tiền gửi.
- Bản chính CCCD gắn chip / Hộ chiếu còn hiệu lực của chủ tài khoản.
- Giấy lĩnh tiền tiết kiệm theo mẫu Sacombank có chữ ký đúng mẫu chữ ký đăng ký ban đầu.
Điều 6. Xử lý trường hợp báo mất Sổ tiết kiệm
1. Khách hàng phải lập tức đến quầy giao dịch Sacombank gần nhất thông báo mất sổ và lập Giấy báo mất sổ tiết kiệm.
2. Giao dịch viên thực hiện khóa tài khoản sổ tiết kiệm trên hệ thống Core Banking (Hold Balance) để phòng ngừa rủi ro.
3. Sau thời hạn 30 ngày kể từ ngày lập giấy báo mất, nếu không có tranh chấp hoặc khiếu nại, Chi nhánh sẽ tiến hành cấp lại Sổ tiết kiệm mới hoặc chi trả cho khách hàng.`
      }
    ],
    chunks: [
      {
        chunkId: 'chunk-tk-01',
        documentId: 'doc-tiet-kiem-2025',
        title: 'Điều 4. Quy định rút tiền gửi tiết kiệm trước hạn và cách tính lãi',
        clauseNumber: 'Điều 4',
        pageNumber: 6,
        keywords: ['rút trước hạn', 'tiết kiệm', 'lãi suất', 'không kỳ hạn', 'rút một phần', 'hồ sơ rút tiền'],
        content: 'Điều 4. Rút tiền gửi tiết kiệm trước hạn: Phần vốn rút trước hạn áp dụng mức lãi suất không kỳ hạn thấp nhất của Sacombank tại thời điểm rút. Phần vốn còn lại (khi rút một phần) tiếp tục hưởng nguyên lãi suất có kỳ hạn ban đầu. Hồ sơ bắt buộc gồm: Bản chính Sổ tiết kiệm, CCCD gắn chip/Hộ chiếu gốc và Giấy lĩnh tiền ký đúng chữ ký mẫu.',
      },
      {
        chunkId: 'chunk-tk-02',
        documentId: 'doc-tiet-kiem-2025',
        title: 'Điều 6. Thủ tục xử lý khi khách hàng báo mất Sổ tiết kiệm',
        clauseNumber: 'Điều 6',
        pageNumber: 9,
        keywords: ['mất sổ tiết kiệm', 'báo mất', 'khóa sổ', 'cấp lại', '30 ngày'],
        content: 'Điều 6. Báo mất sổ tiết kiệm: Khách hàng lập Giấy báo mất sổ tiết kiệm tại quầy. Giao dịch viên ngay lập tức thực hiện khóa tài khoản sổ tiết kiệm trên hệ thống Core Banking. Sau thời hạn 30 ngày kể từ ngày báo mất nếu không phát sinh khiếu nại hoặc tranh chấp, Chi nhánh cấp lại Sổ tiết kiệm mới cho khách hàng.',
      }
    ]
  },
  {
    id: 'doc-mo-tk-2025',
    docCode: 'QĐ-142/2025/QĐ-TGĐ',
    title: 'Quy trình mở và quản lý tài khoản thanh toán cá nhân và tổ chức',
    category: 'THANH_TOAN',
    categoryName: 'Thanh toán & Chuyển tiền',
    issuer: 'Tổng Giám đốc Sacombank',
    issueDate: '2025-05-10',
    effectiveDate: '2025-06-01',
    currentVersion: '2.5',
    status: 'ACTIVE',
    securityLevel: 'INTERNAL',
    uploadedBy: 'Đào Minh Hải',
    approvedBy: 'Trần Thị Thu Trang',
    fileType: 'PDF',
    fileSize: '4.1 MB',
    summary: 'Quy định chi tiết điều kiện, hồ sơ mở tài khoản cho cá nhân trong nước, cá nhân người nước ngoài cư trú và không cư trú, và tài khoản doanh nghiệp. Tuân thủ Thông tư 17/2024/TT-NHNN.',
    totalViews: 3240,
    versions: [
      {
        version: '2.5',
        updatedAt: '2025-05-10',
        updatedBy: 'Đào Minh Hải',
        status: 'ACTIVE',
        changeSummary: 'Quy định nghiêm ngặt về mở tài khoản cho người nước ngoài và tài khoản liên kết.',
        fullText: `QUY TRÌNH MỞ VÀ QUẢN LÝ TÀI KHOẢN THANH TOÁN (Số: 142/2025/QĐ-TGĐ)
Điều 7. Hồ sơ mở tài khoản cho Khách hàng cá nhân người nước ngoài
Khách hàng cá nhân là người nước ngoài khi mở tài khoản thanh toán tại Sacombank bắt buộc phải cung cấp:
1. Hộ chiếu còn thời hạn hiệu lực tối thiểu 06 tháng (bản chính để đối chiếu).
2. Thị thực (Visa) nhập cảnh Việt Nam còn thời hạn hiệu lực HOẶC Thẻ tạm trú / Thẻ thường trú / Giấy miễn thị thực hợp pháp.
3. Hợp đồng lao động hoặc Quyết định bổ nhiệm công tác tại Việt Nam từ 12 tháng trở lên (để xác định tình trạng cư trú theo Pháp lệnh Ngoại hối).
4. Giấy đề nghị mở tài khoản thanh toán kiêm bản đăng ký dịch vụ theo mẫu của Sacombank.
5. Thực hiện định danh trực tiếp và thu thập sinh trắc học tại quầy giao dịch (không áp dụng eKYC trực tuyến cho người nước ngoài).
Điều 9. Trường hợp giấy tờ tùy thân của khách hàng hết hạn
- Hệ thống Core Banking sẽ tự động gửi thông báo nhắc trước 30 ngày trước ngày hết hạn CCCD/Hộ chiếu.
- Nếu giấy tờ hết hạn mà khách hàng chưa cập nhật: Khóa chiều ghi nợ (tạm ngưng giao dịch rút tiền, chuyển khoản đi) trên mọi kênh thanh toán cho đến khi khách hàng hoàn tất bổ sung giấy tờ mới.`
      }
    ],
    chunks: [
      {
        chunkId: 'chunk-tktt-01',
        documentId: 'doc-mo-tk-2025',
        title: 'Điều 7. Hồ sơ mở tài khoản cho cá nhân người nước ngoài cư trú',
        clauseNumber: 'Điều 7',
        pageNumber: 8,
        keywords: ['người nước ngoài', 'hồ sơ mở tài khoản', 'visa', 'hộ chiếu', 'thẻ tạm trú', 'hợp đồng lao động'],
        content: 'Điều 7. Hồ sơ mở tài khoản người nước ngoài: 1. Hộ chiếu còn hạn tối thiểu 6 tháng. 2. Thị thực (Visa) còn hạn hoặc Thẻ tạm trú/thường trú hợp lệ. 3. Hợp đồng lao động/Quyết định công tác tại Việt Nam tối thiểu 12 tháng (xác định tình trạng người cư trú). 4. Giấy đề nghị mở tài khoản mẫu Sacombank. Lưu ý: Phải định danh trực tiếp tại quầy, không áp dụng eKYC.',
      },
      {
        chunkId: 'chunk-tktt-02',
        documentId: 'doc-mo-tk-2025',
        title: 'Điều 9. Xử lý khi giấy tờ tùy thân (CCCD/Hộ chiếu) hết hạn',
        clauseNumber: 'Điều 9',
        pageNumber: 11,
        keywords: ['hết hạn cccd', 'hộ chiếu hết hạn', 'khóa chiều ghi nợ', 'tạm ngưng rút tiền', 'thông tư 17'],
        content: 'Điều 9. Khi giấy tờ tùy thân hết hạn: Hệ thống gửi thông báo nhắc trước 30 ngày. Trường hợp đã hết hạn mà khách hàng chưa cập nhật, hệ thống tự động khóa chiều Ghi nợ (Debit Block - tạm dừng rút tiền, chuyển khoản) cho đến khi khách hàng đến quầy hoặc cập nhật giấy tờ mới hợp lệ.',
      }
    ]
  },
  {
    id: 'doc-the-tin-dung-2025',
    docCode: 'QTr-33/2025/QTr-KHCN',
    title: 'Quy trình phát hành và quản lý thẻ tín dụng quốc tế Sacombank',
    category: 'THE_NGAN_HANG',
    categoryName: 'Thẻ & Dịch vụ POS',
    issuer: 'Trung tâm Thẻ Sacombank',
    issueDate: '2025-04-18',
    effectiveDate: '2025-05-01',
    currentVersion: '4.0',
    status: 'ACTIVE',
    securityLevel: 'INTERNAL',
    uploadedBy: 'Đào Minh Hải',
    approvedBy: 'Trần Thị Thu Trang',
    fileType: 'PDF',
    fileSize: '3.1 MB',
    summary: 'Quy định phát hành thẻ tín dụng có tài sản bảo đảm và tín chấp qua thu nhập, thẩm định sao kê lương, hạn mức cấp tín dụng và kích hoạt thẻ bảo mật.',
    totalViews: 1950,
    versions: [
      {
        version: '4.0',
        updatedAt: '2025-04-18',
        updatedBy: 'Đào Minh Hải',
        status: 'ACTIVE',
        changeSummary: 'Áp dụng thẻ ảo (Virtual Card) cấp phát tức thì sau khi duyệt hồ sơ.',
        fullText: `QUY TRÌNH PHÁT HÀNH THẺ TÍN DỤNG QUỐC TẾ (Số: QTr-33/2025/QTr-KHCN)
Điều 8. Điều kiện phát hành thẻ tín dụng tín chấp qua thu nhập lương
1. Khách hàng là công dân Việt Nam từ đủ 18 tuổi đến 60 tuổi.
2. Thu nhập hàng tháng:
- Tối thiểu 5.000.000 VNĐ/tháng (đối với địa bàn TP.HCM và Hà Nội: tối thiểu 7.000.000 VNĐ/tháng).
- Thời gian làm việc tại đơn vị hiện tại tối thiểu 03 tháng chính thức.
3. Hồ sơ chứng minh thu nhập:
- Sao kê tài khoản nhận lương 03 tháng gần nhất có mộc ngân hàng hoặc Hợp đồng lao động kèm bảng lương.
Điều 15. Thủ tục báo mất thẻ khẩn cấp
Khi khách hàng báo mất thẻ qua Hotline 1800 5858 88 hoặc đến quầy: Giao dịch viên phải lập tức chuyển trạng thái thẻ sang "Card Lost/Stolen" trên module Card Management để chặn ngay mọi giao dịch phát sinh.`
      }
    ],
    chunks: [
      {
        chunkId: 'chunk-the-01',
        documentId: 'doc-the-tin-dung-2025',
        title: 'Điều 8. Điều kiện phát hành thẻ tín dụng tín chấp qua lương',
        clauseNumber: 'Điều 8',
        pageNumber: 5,
        keywords: ['thẻ tín dụng', 'lương', 'sao kê', 'hạn mức', 'điều kiện mở thẻ', 'tín chấp'],
        content: 'Điều 8. Điều kiện phát hành thẻ tín dụng qua lương: Khách hàng từ 18 - 60 tuổi; thu nhập tại TP.HCM/Hà Nội tối thiểu 7.000.000 VNĐ/tháng, tỉnh thành khác tối thiểu 5.000.000 VNĐ/tháng; hợp đồng lao động từ 3 tháng trở lên; sao kê lương 3 tháng gần nhất.',
      },
      {
        chunkId: 'chunk-the-02',
        documentId: 'doc-the-tin-dung-2025',
        title: 'Điều 15. Xử lý khẩn cấp khi khách hàng báo mất thẻ',
        clauseNumber: 'Điều 15',
        pageNumber: 12,
        keywords: ['mất thẻ', 'khóa thẻ khẩn cấp', 'gian lận', 'card lost', 'hotline'],
        content: 'Điều 15. Báo mất thẻ khẩn cấp: Giao dịch viên hoặc kiểm soát viên phải chuyển ngay trạng thái thẻ thành "Lost/Stolen" trên module CMS để khóa thẻ tức thì trong vòng 30 giây, hướng dẫn khách hàng kiểm tra sao kê giao dịch gần nhất nếu nghi ngờ gian lận.',
      }
    ]
  },
  {
    id: 'doc-aml-kyc-2025',
    docCode: 'QĐ-99/2025/QĐ-TGĐ',
    title: 'Quy định phòng chống rửa tiền, tài trợ khủng bố và nhận biết khách hàng (KYC/AML)',
    category: 'AML_KYC',
    categoryName: 'Phòng chống rửa tiền & Định danh',
    issuer: 'Ban Kiểm soát & Tuân thủ Sacombank',
    issueDate: '2025-02-15',
    effectiveDate: '2025-03-01',
    currentVersion: '3.0',
    status: 'ACTIVE',
    securityLevel: 'CONFIDENTIAL',
    uploadedBy: 'Đào Minh Hải',
    approvedBy: 'Trần Thị Thu Trang',
    fileType: 'PDF',
    fileSize: '5.2 MB',
    summary: 'Quy định bắt buộc về báo cáo giao dịch có giá trị lớn từ 400 triệu đồng trở lên, giao dịch đáng ngờ (STR), và sàng lọc danh sách trừng phạt (OFAC, LHQ) của cán bộ giao dịch viên.',
    totalViews: 1820,
    versions: [
      {
        version: '3.0',
        updatedAt: '2025-02-15',
        updatedBy: 'Đào Minh Hải',
        status: 'ACTIVE',
        changeSummary: 'Cập nhật ngưỡng báo cáo giao dịch tiền mặt từ 400 triệu đồng theo Quyết định của Thủ tướng Chính phủ.',
        fullText: `QUY ĐỊNH PHÒNG CHỐNG RỬA TIỀN VÀ NHẬN BIẾT KHÁCH HÀNG (Số: 99/2025/QĐ-TGĐ)
Điều 11. Báo cáo giao dịch có giá trị lớn
1. Giao dịch viên phải lập Báo cáo giao dịch có giá trị lớn (CTR) đối với các giao dịch bằng tiền mặt (gửi tiền, rút tiền, nộp tiền) của khách hàng có tổng giá trị từ 400.000.000 VNĐ (bốn trăm triệu đồng) hoặc ngoại tệ có giá trị tương đương trong ngày.
2. Hồ sơ yêu cầu: Giấy tờ chứng minh mục đích giao dịch, nguồn gốc số tiền hợp pháp đối với các giao dịch vượt ngưỡng trên.
Điều 14. Dấu hiệu giao dịch đáng ngờ (STR)
Giao dịch viên phải lập tức báo cáo Trưởng phòng Dịch vụ khách hàng khi phát hiện:
- Khách hàng chia nhỏ các khoản tiền mặt dưới ngưỡng 400 triệu đồng để tránh báo cáo.
- Khách hàng có thái độ bối rối, từ chối cung cấp thông tin mục đích sử dụng tiền.
- Tài khoản phát sinh doanh số đột biến gấp 5 lần so với thu nhập khai báo.`
      }
    ],
    chunks: [
      {
        chunkId: 'chunk-aml-01',
        documentId: 'doc-aml-kyc-2025',
        title: 'Điều 11. Ngưỡng báo cáo giao dịch tiền mặt giá trị lớn (CTR)',
        clauseNumber: 'Điều 11',
        pageNumber: 7,
        keywords: ['rửa tiền', 'giá trị lớn', '400 triệu', 'tiền mặt', 'báo cáo ctr', 'chứng minh nguồn gốc'],
        content: 'Điều 11. Giao dịch tiền mặt từ 400.000.000 VNĐ (bốn trăm triệu đồng) hoặc ngoại tệ tương đương trong một ngày: Bắt buộc lập báo cáo giao dịch giá trị lớn (CTR) gửi Cục Phòng chống rửa tiền NHNN và yêu cầu khách hàng cung cấp chứng từ chứng minh nguồn gốc tiền hợp pháp.',
      },
      {
        chunkId: 'chunk-aml-02',
        documentId: 'doc-aml-kyc-2025',
        title: 'Điều 14. Nhận diện giao dịch đáng ngờ và quy trình báo cáo STR',
        clauseNumber: 'Điều 14',
        pageNumber: 10,
        keywords: ['giao dịch đáng ngờ', 'str', 'chia nhỏ khoản tiền', 'doanh số đột biến', 'báo cáo trưởng phòng'],
        content: 'Điều 14. Giao dịch đáng ngờ: Khi khách hàng chia nhỏ tiền dưới 400 triệu để né kiểm soát, hoặc tài khoản phát sinh dòng tiền đột biến không rõ mục đích, giao dịch viên phải bí mật lập báo cáo STR trình Trưởng phòng và Bộ phận Tuân thủ chi nhánh trong ngày làm việc.',
      }
    ]
  },
  {
    id: 'doc-tra-soat-2025',
    docCode: 'HD-79/2025/HD-TT',
    title: 'Hướng dẫn tiếp nhận và xử lý tra soát khiếu nại giao dịch thẻ và thanh toán',
    category: 'THE_NGAN_HANG',
    categoryName: 'Thẻ & Dịch vụ POS',
    issuer: 'Trung tâm Dịch vụ Khách hàng 24/7',
    issueDate: '2025-07-01',
    effectiveDate: '2025-07-15',
    currentVersion: '2.0',
    status: 'ACTIVE',
    securityLevel: 'INTERNAL',
    uploadedBy: 'Đào Minh Hải',
    approvedBy: 'Trần Thị Thu Trang',
    fileType: 'PDF',
    fileSize: '2.9 MB',
    summary: 'Thời hạn tra soát, biểu mẫu khiếu nại giao dịch rút tiền ATM không nhả tiền nhưng tài khoản bị trừ, giao dịch thanh toán quẹt thẻ POS bị trùng lệnh.',
    totalViews: 1450,
    versions: [
      {
        version: '2.0',
        updatedAt: '2025-07-01',
        updatedBy: 'Đào Minh Hải',
        status: 'ACTIVE',
        changeSummary: 'Rút ngắn thời gian xử lý tra soát giao dịch nội bộ Sacombank xuống tối đa 05 ngày làm việc.',
        fullText: `HƯỚNG DẪN XỬ LÝ TRA SOÁT KHIẾU NẠI (Số: HD-79/2025/HD-TT)
Điều 5. Thời hạn xử lý khiếu nại tra soát
1. Giao dịch trong hệ thống Sacombank (ATM, POS, Sacombank Pay của Sacombank): Thời hạn xử lý tối đa không quá 05 ngày làm việc kể từ ngày nhận Giấy đề nghị tra soát.
2. Giao dịch liên ngân hàng (qua cổng Napas hoặc thẻ Visa/Mastercard tại ngân hàng khác): Thời hạn xử lý tối đa không quá 30 ngày làm việc (đối với thẻ nội địa) và 45 ngày làm việc (đối với thẻ quốc tế theo quy định của Tổ chức thẻ quốc tế).
Điều 6. Xử lý trường hợp ATM nuốt thẻ hoặc không nhả tiền
Giao dịch viên hướng dẫn khách hàng:
- Điền đầy đủ thông tin vào Phiếu yêu cầu tra soát khiếu nại (Mẫu SCB-TS01).
- Nếu ATM tại Chi nhánh Gò Vấp: Kiểm quỹ ATM và hoàn trả tiền cho khách hàng trong vòng 24h làm việc sau khi cân đối quỹ.`
      }
    ],
    chunks: [
      {
        chunkId: 'chunk-ts-01',
        documentId: 'doc-tra-soat-2025',
        title: 'Điều 5. Thời hạn tiếp nhận và xử lý tra soát khiếu nại thẻ',
        clauseNumber: 'Điều 5',
        pageNumber: 4,
        keywords: ['tra soát', 'khiếu nại', 'thời hạn tra soát', 'atm không nhả tiền', 'napas', 'visa'],
        content: 'Điều 5. Thời hạn tra soát: Giao dịch nội bộ Sacombank tối đa 05 ngày làm việc. Giao dịch liên ngân hàng qua Napas tối đa 30 ngày làm việc. Giao dịch thẻ quốc tế Visa/Mastercard tối đa 45 ngày làm việc theo quy định của tổ chức thẻ quốc tế.',
      }
    ]
  },
  {
    id: 'doc-tin-dung-2026',
    docCode: 'QTr-15/2026/QTr-TD',
    title: 'Quy trình cấp hạn mức thấu chi tiêu dùng không tài sản bảo đảm trên Sacombank Pay (Cập nhật 2026)',
    category: 'TIN_DUNG',
    categoryName: 'Tín dụng & Cho vay',
    issuer: 'Khối Khách hàng Cá nhân',
    issueDate: '2026-01-05',
    effectiveDate: '2026-01-15',
    currentVersion: '2.0',
    status: 'ACTIVE',
    securityLevel: 'INTERNAL',
    uploadedBy: 'Đào Minh Hải',
    approvedBy: 'Trần Thị Thu Trang',
    fileType: 'PDF',
    fileSize: '3.5 MB',
    supersedesDocCode: 'QTr-15/2024/QTr-TD',
    summary: 'Cập nhật quy định phê duyệt hạn mức thấu chi tự động qua điểm tín dụng ScoreCard và CCCD gắn chip, nâng hạn mức tối đa lên 150 triệu đồng.',
    totalViews: 1120,
    versions: [
      {
        version: '2.0',
        updatedAt: '2026-01-05',
        updatedBy: 'Đào Minh Hải',
        status: 'ACTIVE',
        changeSummary: 'Nâng hạn mức tối đa từ 50 triệu lên 150 triệu và tự động giải ngân sau 5 phút qua chấm điểm AI ScoreCard.',
        fullText: `QUY TRÌNH CHO VAY THẤU CHI TIÊU DÙNG NĂM 2026 (Số: QTr-15/2026/QTr-TD)
Điều 3. Hạn mức và thời hạn thấu chi
1. Hạn mức thấu chi tối đa: 150.000.000 VNĐ (một trăm năm mươi triệu đồng) đối với khách hàng có điểm tín dụng Hạng A.
2. Thời hạn cấp hạn mức: 12 tháng, tự động tái cấp nếu khách hàng trả lãi đầy đủ và không phát sinh nợ quá hạn.
Điều 4. Điều kiện đối với khách hàng
- Khách hàng có tài khoản thanh toán nhận lương tại Sacombank tối thiểu 06 tháng liên tục HOẶC có số dư tiền gửi tiết kiệm bình quân từ 50 triệu đồng trở lên.
- Không có nợ xấu tại CIC trong 24 tháng gần nhất.
- Bắt buộc hoàn thành xác thực sinh trắc học CCCD gắn chip NFC trên Sacombank Pay trước khi gửi yêu cầu vay.`
      },
      {
        version: '1.0',
        updatedAt: '2024-03-01',
        updatedBy: 'Đào Minh Hải',
        status: 'SUPERSEDED',
        changeSummary: 'Phiên bản cũ năm 2024 giới hạn hạn mức 50 triệu và yêu cầu thẩm định hồ sơ giấy.',
        fullText: `QUY TRÌNH THẤU CHI NĂM 2024 (Số: QTr-15/2024/QTr-TD - ĐÃ HẾT HIỆU LỰC)
Hạn mức thấu chi tối đa chỉ 50.000.000 VNĐ. Khách hàng phải nộp hợp đồng lao động bản công chứng và bảng lương giấy tại quầy giao dịch.`
      }
    ],
    chunks: [
      {
        chunkId: 'chunk-td-01',
        documentId: 'doc-tin-dung-2026',
        title: 'Điều 3. Hạn mức và thời hạn thấu chi tiêu dùng trên Sacombank Pay',
        clauseNumber: 'Điều 3',
        pageNumber: 3,
        keywords: ['thấu chi', 'hạn mức thấu chi', '150 triệu', '12 tháng', 'vay tiêu dùng', 'sacombank pay'],
        content: 'Điều 3. Hạn mức thấu chi: Tối đa 150.000.000 VNĐ cho khách hàng đạt xếp hạng tín dụng Hạng A. Thời hạn 12 tháng, hệ thống tự động đánh giá và tái cấp hàng năm nếu khách hàng trả nợ tốt.',
      },
      {
        chunkId: 'chunk-td-02',
        documentId: 'doc-tin-dung-2026',
        title: 'Điều 4. Điều kiện vay thấu chi và kiểm tra nợ xấu CIC',
        clauseNumber: 'Điều 4',
        pageNumber: 4,
        keywords: ['điều kiện thấu chi', 'không nợ xấu', 'cic', 'nhận lương sacombank', 'sinh trắc học nfc'],
        content: 'Điều 4. Điều kiện cấp thấu chi: Khách hàng nhận lương qua Sacombank tối thiểu 6 tháng liên tục hoặc có số dư tiết kiệm bình quân trên 50 triệu; không có nợ cần chú ý hoặc nợ xấu tại CIC trong 24 tháng; đã xác thực sinh trắc học CCCD gắn chip trên Sacombank Pay.',
      }
    ]
  },
  {
    id: 'doc-kieu-hoi-pending',
    docCode: 'QĐ-110/2026/QĐ-TGĐ',
    title: 'Hướng dẫn thu đổi ngoại tệ mặt và chi trả kiều hối tại quầy (Bản dự thảo sửa đổi)',
    category: 'NGOAI_HOI',
    categoryName: 'Ngoại hối & Kiều hối',
    issuer: 'Khối Kinh doanh Ngoại hối & Vốn',
    issueDate: '2026-02-01',
    effectiveDate: '2026-03-01',
    currentVersion: '1.2-DRAFT',
    status: 'PENDING_APPROVAL',
    securityLevel: 'CONFIDENTIAL',
    uploadedBy: 'Đào Minh Hải',
    fileType: 'DOCX',
    fileSize: '1.8 MB',
    summary: 'Dự thảo điều chỉnh hạn mức thu đổi ngoại tệ mặt cho khách hàng xuất cảnh du lịch, công tác. Đang chờ Trưởng phòng và Giám đốc Khối phê duyệt.',
    totalViews: 85,
    versions: [
      {
        version: '1.2-DRAFT',
        updatedAt: '2026-02-01',
        updatedBy: 'Đào Minh Hải',
        status: 'PENDING_APPROVAL',
        changeSummary: 'Điều chỉnh hạn mức bán ngoại tệ mặt lên mức tối đa tương đương 5.000 USD/người/chuyến đi.',
        fullText: 'Bản dự thảo đang chờ phê duyệt. Không áp dụng chính thức cho đến khi có chữ ký phê duyệt.'
      }
    ],
    chunks: [
      {
        chunkId: 'chunk-kh-01',
        documentId: 'doc-kieu-hoi-pending',
        title: 'Dự thảo hạn mức bán ngoại tệ tiền mặt',
        clauseNumber: 'Điều 2 (Dự thảo)',
        pageNumber: 2,
        keywords: ['ngoại tệ', 'thu đổi ngoại tệ', 'kiều hối', 'chờ phê duyệt', '5000 usd'],
        content: 'CẢNH BÁO: TÀI LIỆU CHỜ PHÊ DUYỆT. Chưa có giá trị áp dụng chính thức làm căn cứ trả lời khách hàng.',
      }
    ]
  }
];

// Initialize vector embeddings for all document chunks using searchUtils
for (const doc of MOCK_DOCUMENTS) {
  for (const chunk of doc.chunks) {
    chunk.vectorEmbedding = generateLocalEmbedding(`${chunk.title} ${chunk.content} ${chunk.keywords.join(' ')}`);
  }
}
