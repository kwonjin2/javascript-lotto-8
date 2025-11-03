import Lotto from '../src/lotto/Lotto.js';
import LottoResult from '../src/lotto/LottoResult.js';

describe('LottoResult 단위 테스트', () => {
  let lottoResult;
  beforeEach(() => {
    lottoResult = new LottoResult();
  });

  test('당첨 통계 업데이트 및 총 상금 계산', () => {
    const lottos = [
      new Lotto([1, 2, 3, 4, 5, 6]), // match6
      new Lotto([1, 2, 3, 4, 5, 7]), // match5 + bonus
      new Lotto([1, 2, 3, 4, 8, 9]), // match4
      new Lotto([1, 2, 3, 10, 11, 12]), // match3
      new Lotto([13, 14, 15, 16, 17, 18]), // 0개
    ];

    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    lottoResult.updateWinningStatistics(lottos, winningNumbers, bonusNumber);

    const winningRank = lottoResult.getWinningRank();
    const totalPrize = lottoResult.getTotalPrize();
    const profitRate = lottoResult.calculateProfitRate(5000);

    // 맞은 개수 검증
    expect(winningRank.match3).toBe(1);
    expect(winningRank.match4).toBe(1);
    expect(winningRank.match5).toBe(0);
    expect(winningRank.match5AndBonus).toBe(1);
    expect(winningRank.match6).toBe(1);

    // 총 상금 검증
    const expectedTotal = 5000 + 50000 + 30000000 + 2000000000;
    expect(totalPrize).toBe(expectedTotal);

    // 수익률 검증
    expect(profitRate).toBe(((expectedTotal / 5000) * 100).toFixed(1));
  });
});
