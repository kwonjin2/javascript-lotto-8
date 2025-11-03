import { Console, Random } from '@woowacourse/mission-utils';

class App {
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
}

export default App;
