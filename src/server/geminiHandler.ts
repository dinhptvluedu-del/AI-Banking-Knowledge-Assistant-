import { GoogleGenAI } from '@google/genai';

let cachedAi: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!cachedAi) {
    cachedAi = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return cachedAi;
}

export async function generateGroundedResponse(
  query: string,
  contextSnippets: string[]
): Promise<{ text: string; error?: string }> {
  const ai = getAiClient();
  if (!ai) {
    return {
      text: '',
      error: 'GEMINI_API_KEY is not configured. Falling back to Sacombank local RAG knowledge engine.'
    };
  }

  const systemInstruction = `Bạn là Trợ lý Tri thức AI của Sacombank Chi nhánh Gò Vấp - Phòng Dịch vụ Khách hàng.
Nhiệm vụ: Cung cấp câu trả lời nghiệp vụ ngân hàng dựa DUY NHẤT trên các đoạn tài liệu được cung cấp dưới đây.
Tuyệt đối không suy diễn quy định ngoài tài liệu. Nếu tài liệu không đủ thông tin, thông báo rõ.
Định dạng trả lời theo 3 mục:
1. Trả lời ngắn gọn
2. Các bước thực hiện
3. Lưu ý nghiệp vụ & Ngoại lệ`;

  const contextText = contextSnippets.map((c, i) => `[Tài liệu tham chiếu ${i + 1}]:\n${c}`).join('\n\n');
  const fullPrompt = `TÀI LIỆU CĂN CỨ:\n${contextText}\n\nCÂU HỎI CỦA GIAO DỊCH VIÊN: ${query}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: fullPrompt,
      config: {
        systemInstruction,
      },
    });

    return { text: response.text ?? '' };
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    return {
      text: '',
      error: err?.message || 'Lỗi kết nối Gemini API'
    };
  }
}
