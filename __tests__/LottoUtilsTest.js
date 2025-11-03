import LottoUtils from '../src/lotto/LottoUtils.js';

describe('LottoUtils 단위 테스트', () => {
  test('구매 금액에 따라 로또 개수 계산', () => {
    expect(LottoUtils.getLottoCount(1000)).toBe(1);
    expect(LottoUtils.getLottoCount(8000)).toBe(8);
  });
});
