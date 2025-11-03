import { Console, Random } from '@woowacourse/mission-utils';

class App {
  winningRank = {
    match3: 0,
    match4: 0,
    match5: 0,
    match5AndBonus: 0,
    match6: 0,
  };

  prizeTable = {
    1: 2000000000,
    2: 30000000,
    3: 1500000,
    4: 50000,
    5: 5000,
  };

  async run() {
    const purchaseInput =
      await Console.readLineAsync('구매 금액을 입력해 주세요.\n');

    const winnerLottoNumbersInput =
      await Console.readLineAsync('당첨 번호를 입력해 주세요.\n');

    const bonusLottoNumberInput =
      await Console.readLineAsync('보너스 번호를 입력해 주세요.\n');
  }

  getLottoCount(purchaseAmount) {
    const count = Number(purchaseAmount) / 1000;
    this.winningRank.match3++;
    return count;
  }

  generateLottos(lottoCount) {
    const result = [];

    for (let i = 0; i < lottoCount; i++) {
      result.push(
        this.sortLottoNumbers(Random.pickUniqueNumbersInRange(1, 45, 6))
      );
    }

    return result;
  }

  sortLottoNumbers(lotto) {
    return lotto.sort((a, b) => a - b);
  }

  parseWinningNumbers(winningNumbers) {
    return winningNumbers.split(',').map((s) => Number(s));
  }

  compareWithWinningNumbers(lotto, winningNumbers, bonusNumber) {
    let matchCount = 0;
    let hasBonus = false;

    for (let i = 0; i < lotto.length; i++) {
      if (winningNumbers.includes(lotto[i])) matchCount++;
      if (lotto[i] === bonusNumber) hasBonus = true;
    }

    return { matchCount, hasBonus };
  }

  updateWinningStatistics(lottos, winningNumbers, bonusNumber) {
    for (const lotto of lottos) {
      const { matchCount, hasBonus } = this.compareWithWinningNumbers(
        lotto,
        winningNumbers,
        bonusNumber
      );

      if (matchCount === 3) this.winningRank.match3++;
      if (matchCount === 4) this.winningRank.match4++;
      if (matchCount === 5 && hasBonus) this.winningRank.match5++;
      if (matchCount === 5 && !hasBonus) this.winningRank.match5AndBonus++;
      if (matchCount === 6) this.winningRank.match6++;
    }
  }

  getTotalPrize() {
    const prizeMap = {
      match3: this.prizeTable[5],
      match4: this.prizeTable[4],
      match5: this.prizeTable[3],
      match5AndBonus: this.prizeTable[2],
      match6: this.prizeTable[1],
    };

    return Object.entries(this.winningRank).reduce(
      (sum, [rank, count]) => sum + (prizeMap[rank] ?? 0) * count,
      0
    );
  }
}

export default App;
