import { Console } from '@woowacourse/mission-utils';
import Lotto from './lotto/Lotto.js';

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

    const lottoCount = this.getLottoCount(purchaseInput);
    const lottos = Lotto.generateLottos(lottoCount);

    Console.print(`${lottoCount}개를 구매했습니다.\n`);
    lottos.forEach((lotto) =>
      Console.print(`[${lotto.getNumbers().join(', ')}]`)
    );

    const winnerLottoNumbersInput = await Console.readLineAsync(
      '\n당첨 번호를 입력해 주세요.\n'
    );
    const bonusLottoNumberInput = await Console.readLineAsync(
      '\n보너스 번호를 입력해 주세요.\n'
    );

    const winningNumbers = this.parseWinningNumbers(winnerLottoNumbersInput);
    const bonusNumber = Number(bonusLottoNumberInput);

    this.updateWinningStatistics(lottos, winningNumbers, bonusNumber);

    const totalPrize = this.getTotalPrize();
    const profitRate = this.calculateProfitRate(purchaseInput);

    this.printStatistics(totalPrize, profitRate);
  }

  getLottoCount(purchaseAmount) {
    const count = Number(purchaseAmount) / 1000;
    return count;
  }

  parseWinningNumbers(winningNumbers) {
    return winningNumbers.split(',').map((s) => Number(s));
  }

  updateWinningStatistics(lottos, winningNumbers, bonusNumber) {
    for (const lotto of lottos) {
      const { matchCount, hasBonus } = lotto.compareWithWinningNumbers(
        winningNumbers,
        bonusNumber
      );

      if (matchCount === 3) this.winningRank.match3++;
      if (matchCount === 4) this.winningRank.match4++;
      if (matchCount === 5 && !hasBonus) this.winningRank.match5++;
      if (matchCount === 5 && hasBonus) this.winningRank.match5AndBonus++;
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

  calculateProfitRate(purchaseAmount) {
    const totalPrize = this.getTotalPrize();
    const profitRate = (totalPrize / purchaseAmount) * 100;
    return profitRate.toFixed(1);
  }

  printStatistics(totalPrize, profitRate) {
    Console.print('\n당첨 통계');
    Console.print('---');
    Console.print(`3개 일치 (5,000원) - ${this.winningRank.match3}개`);
    Console.print(`4개 일치 (50,000원) - ${this.winningRank.match4}개`);
    Console.print(`5개 일치 (1,500,000원) - ${this.winningRank.match5}개`);
    Console.print(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${this.winningRank.match5AndBonus}개`
    );
    Console.print(`6개 일치 (2,000,000,000원) - ${this.winningRank.match6}개`);
    Console.print(`총 당첨금: ${totalPrize.toLocaleString()}원`);
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  }
}

export default App;
