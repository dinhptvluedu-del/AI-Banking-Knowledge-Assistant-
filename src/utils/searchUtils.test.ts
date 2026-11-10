import test from 'node:test';
import assert from 'node:assert/strict';
import {
  removeVietnameseTones,
  tokenizeVietnamese,
  cosineSimilarity,
  generateLocalEmbedding,
  calculateHybridScore,
  calculateKeywordScore
} from './searchUtils';

test('removeVietnameseTones converts accented Vietnamese text to plain ASCII', () => {
  const input = 'Quy trình rút tiền gửi tiết kiệm có kỳ hạn tại Sacombank';
  const expected = 'quy trinh rut tien gui tiet kiem co ky han tai sacombank';
  assert.equal(removeVietnameseTones(input), expected);
});

test('tokenizeVietnamese strips common stop words and returns keywords', () => {
  const query = 'Hồ sơ cần thiết để mở thẻ tín dụng cho khách hàng cá nhân';
  const tokens = tokenizeVietnamese(query);
  assert.ok(tokens.includes('tin'));
  assert.ok(tokens.includes('dung'));
  assert.ok(tokens.includes('the'));
  // Stopwords like 'cho' or 'de' should be filtered out
  assert.ok(!tokens.includes('cho'));
});

test('cosineSimilarity calculates exact 1 for identical vectors and 0 for orthogonal', () => {
  const v1 = [1, 0, 0];
  const v2 = [1, 0, 0];
  const v3 = [0, 1, 0];

  assert.equal(Math.round(cosineSimilarity(v1, v2) * 100) / 100, 1);
  assert.equal(cosineSimilarity(v1, v3), 0);
});

test('calculateHybridScore weights vector and keyword scores appropriately', () => {
  const score = calculateHybridScore(0.8, 0.6, 0.5);
  assert.equal(score, 0.7);
});

test('generateLocalEmbedding produces normalized vectors that score high on similar queries', () => {
  const emb1 = generateLocalEmbedding('rút tiền gửi tiết kiệm trước hạn');
  const emb2 = generateLocalEmbedding('tất toán sổ tiết kiệm trước hạn');
  const emb3 = generateLocalEmbedding('thủ tục mở thẻ visa quốc tế');

  const sim12 = cosineSimilarity(emb1, emb2);
  const sim13 = cosineSimilarity(emb1, emb3);

  assert.ok(sim12 > sim13, 'Similar banking intents should have higher cosine similarity');
});

test('calculateKeywordScore rewards title and content token hits', () => {
  const score = calculateKeywordScore('sinh trắc học', 'Khách hàng giao dịch trên 10 triệu cần xác thực sinh trắc học khuôn mặt', 'Quy định sinh trắc học');
  assert.ok(score > 0.5, 'Keyword score should be high for matching text');
});
