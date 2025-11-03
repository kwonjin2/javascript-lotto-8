import { Console } from '@woowacourse/mission-utils';
import Lotto from './lotto/Lotto.js';
import LottoResult from './lotto/LottoResult.js';

class App {
  async run() {
    const purchaseInput =
      await Console.readLineAsync('구매 금액을 입력해 주세요.\n');
    this.validatePurchaseAmount(purchaseInput);

    const lottoCount = this.getLottoCount(purchaseInput);
    const lottos = Lotto.generateLottos(lottoCount);
    Console.print(`${lottoCount}개를 구매했습니다.\n`);
    lottos.forEach((lotto) =>
      Console.print(`[${lotto.getNumbers().join(', ')}]`)
    );

    const winnerLottoNumbersInput = await Console.readLineAsync(
      '\n당첨 번호를 입력해 주세요.\n'
    );
    const winningNumbers = this.parseWinningNumbers(winnerLottoNumbersInput);
    this.validateWinningNumbers(winningNumbers);

    const bonusLottoNumberInput = await Console.readLineAsync(
      '\n보너스 번호를 입력해 주세요.\n'
    );
    const bonusNumber = Number(bonusLottoNumberInput);
    this.validateBonusNumber(bonusNumber, winningNumbers);

    const lottoResult = new LottoResult();
    lottoResult.updateWinningStatistics(lottos, winningNumbers, bonusNumber);
    const totalPrize = lottoResult.getTotalPrize();
    const profitRate = lottoResult.calculateProfitRate(purchaseInput);
    const winningRank = lottoResult.getWinningRank();

    this.printStatistics(totalPrize, profitRate, winningRank);
  }

  getLottoCount(purchaseAmount) {
    const count = Number(purchaseAmount) / 1000;
    return count;
  }

  parseWinningNumbers(winningNumbers) {
    return winningNumbers.split(',').map((s) => Number(s));
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

  validatePurchaseAmount(purchaseAmount) {
    const money = Number(purchaseAmount);
    if (isNaN(money))
      throw new Error('[ERROR] 구매 금액은 숫자로 입력해 주세요.');
    if (money < 1000)
      throw new Error('[ERROR] 구매 금액은 1,000원 이상이어야 합니다.');
    if (money % 1000 !== 0)
      throw new Error('[ERROR] 구매 금액은 1,000원 단위로 입력해 주세요.');
  }

  validateWinningNumbers(numbers) {
    const parsedNumbers = numbers.map((n) => Number(n));

    parsedNumbers.forEach((number) => {
      if (isNaN(number))
        throw new Error('[ERROR] 당첨 번호는 숫자로 입력해 주세요.');
      if (number < 1 || number > 45)
        throw new Error('[ERROR] 당첨 번호는 1 ~ 45 범위로 입력해 주세요.');
    });

    if (parsedNumbers.length !== 6)
      throw new Error('[ERROR] 당첨 번호는 6개여야 합니다.');

    const unique = new Set(parsedNumbers);
    if (unique.size !== parsedNumbers.length)
      throw new Error('[ERROR] 당첨 번호는 중복될 수 없습니다.');
  }

  validateBonusNumber(number, winningNumbers) {
    const bonusNumber = Number(number);

    if (isNaN(bonusNumber))
      throw new Error('[ERROR] 보너스 번호는 숫자로 입력해 주세요.');
    if (bonusNumber < 1 || bonusNumber > 45)
      throw new Error('[ERROR] 보너스 번호는 1 ~ 45 범위로 입력해 주세요.');

    if (winningNumbers.includes(bonusNumber))
      throw new Error('[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.');
  }
}

export default App;
