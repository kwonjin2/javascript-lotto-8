import { Console, Random } from '@woowacourse/mission-utils';

class App {
  async run() {
    const purchaseInput =
      await Console.readLineAsync('구매 금액을 입력해 주세요.\n');
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
}

export default App;
