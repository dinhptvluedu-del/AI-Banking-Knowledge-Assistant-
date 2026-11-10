/**
 * Text processing and search algorithms for Vietnamese banking RAG
 */

/**
 * Normalize Vietnamese text for flexible search (remove accents and special chars)
 */
export function removeVietnameseTones(str: string): string {
  if (!str) return '';
  let res = str.toLowerCase();
  res = res.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  res = res.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  res = res.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  res = res.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  res = res.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  res = res.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  res = res.replace(/đ/g, 'd');
  // Combine diacritical marks removal
  res = res.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return res;
}

/**
 * Tokenize Vietnamese text into meaningful search tokens
 */
export function tokenizeVietnamese(text: string): string[] {
  if (!text) return [];
  const normalized = removeVietnameseTones(text);
  // Match alphanumeric words
  const words = normalized.match(/[a-z0-9_/-]+/g) || [];
  // Stopwords list for banking search
  const stopWords = new Set([
    'la', 'va', 'cua', 'cho', 'trong', 'cac', 'nhung', 'co', 'duoc',
    'khi', 'thi', 'o', 'tai', 'nhu', 'theo', 'den', 'tu', 'voi', 've'
  ]);
  return words.filter(w => w.length > 1 && !stopWords.has(w));
}

/**
 * Calculate Cosine Similarity between two numerical vectors
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0 || vecA.length !== vecB.length) {
    return 0;
  }
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Generate a pseudo-deterministic embedding vector from text
 * (Used for in-browser client vector search simulation when external API is offline)
 */
export function generateLocalEmbedding(text: string, dimensions = 64): number[] {
  const tokens = tokenizeVietnamese(text);
  const vector = new Array(dimensions).fill(0);
  
  if (tokens.length === 0) return vector;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    let hash = 0;
    for (let c = 0; c < token.length; c++) {
      hash = (hash << 5) - hash + token.charCodeAt(c);
      hash |= 0;
    }
    const idx = Math.abs(hash) % dimensions;
    const sign = (hash % 2 === 0) ? 1 : -1;
    vector[idx] += sign * (1 / (1 + Math.log(1 + i)));
  }

  // Normalize to unit vector
  let sumSq = 0;
  for (let i = 0; i < dimensions; i++) {
    sumSq += vector[i] * vector[i];
  }
  const norm = Math.sqrt(sumSq);
  if (norm > 0) {
    for (let i = 0; i < dimensions; i++) {
      vector[i] /= norm;
    }
  }

  return vector;
}

/**
 * Calculate BM25-like keyword relevance score
 */
export function calculateKeywordScore(query: string, content: string, title = ''): number {
  const queryTokens = tokenizeVietnamese(query);
  if (queryTokens.length === 0) return 0;

  const contentNormalized = removeVietnameseTones(content);
  const titleNormalized = removeVietnameseTones(title);

  let matchCount = 0;
  let titleMatchCount = 0;

  for (const token of queryTokens) {
    // Exact phrase match bonus
    if (contentNormalized.includes(token)) {
      matchCount++;
    }
    if (titleNormalized.includes(token)) {
      titleMatchCount++;
    }
  }

  const contentScore = matchCount / queryTokens.length;
  const titleScore = titleMatchCount / queryTokens.length;

  return Math.min(1.0, contentScore * 0.7 + titleScore * 0.6);
}

/**
 * Compute combined hybrid search score
 */
export function calculateHybridScore(
  vectorScore: number,
  keywordScore: number,
  alpha = 0.65
): number {
  const v = Math.max(0, Math.min(1, vectorScore));
  const k = Math.max(0, Math.min(1, keywordScore));
  return Number((alpha * v + (1 - alpha) * k).toFixed(4));
}
