import { Console } from '@woowacourse/mission-utils';
import Lotto from './lotto/Lotto.js';
import LottoResult from './lotto/LottoResult.js';
import InputHandler from './view/InputHandler.js';

class App {
  async run() {
    const purchaseInput = await InputHandler.readPurchaseAmount();

    const lottoCount = this.getLottoCount(purchaseInput);
    const lottos = Lotto.generateLottos(lottoCount);
    Console.print(`${lottoCount}개를 구매했습니다.\n`);
    lottos.forEach((lotto) =>
      Console.print(`[${lotto.getNumbers().join(', ')}]`)
    );

    const winnerLottoNumbers = await InputHandler.readWinningNumbers();
    const bonusLottoNumber =
      await InputHandler.readBonusNumber(winnerLottoNumbers);

    const lottoResult = new LottoResult();
    lottoResult.updateWinningStatistics(
      lottos,
      winnerLottoNumbers,
      bonusLottoNumber
    );
    const totalPrize = lottoResult.getTotalPrize();
    const profitRate = lottoResult.calculateProfitRate(purchaseInput);
    const winningRank = lottoResult.getWinningRank();

    this.printStatistics(totalPrize, profitRate, winningRank);
  }

  getLottoCount(purchaseAmount) {
    const count = Number(purchaseAmount) / 1000;
    return count;
  }

  printStatistics(totalPrize, profitRate, winningRank) {
    Console.print('\n당첨 통계');
    Console.print('---');
    Console.print(`3개 일치 (5,000원) - ${winningRank.match3}개`);
    Console.print(`4개 일치 (50,000원) - ${winningRank.match4}개`);
    Console.print(`5개 일치 (1,500,000원) - ${winningRank.match5}개`);
    Console.print(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningRank.match5AndBonus}개`
    );
    Console.print(`6개 일치 (2,000,000,000원) - ${winningRank.match6}개`);
    Console.print(`총 당첨금: ${totalPrize.toLocaleString()}원`);
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  }
}

export default App;
