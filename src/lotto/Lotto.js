import { Random } from '@woowacourse/mission-utils';
import { LOTTO, ERROR_MESSAGES } from '../constants/constants.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGES.LOTTO_NUMBER_COUNT);
    }

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length)
      throw new Error(ERROR_MESSAGES.LOTTO_NUMBER_DUPLICATE);

    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] < LOTTO.MIN_NUMBER || numbers[i] > LOTTO.MAX_NUMBER)
        throw new Error(ERROR_MESSAGES.LOTTO_NUMBER_RANGE);
    }
  }

  static generateLottos(lottoCount) {
    const result = [];

    for (let i = 0; i < lottoCount; i++) {
      const numbers = Random.pickUniqueNumbersInRange(
        LOTTO.MIN_NUMBER,
        LOTTO.MAX_NUMBER,
        LOTTO.NUMBER_COUNT
      );
      result.push(new Lotto(numbers));
    }

    return result;
  }

  getNumbers() {
    return this.#numbers;
  }

  compareWithWinningNumbers(winningNumbers, bonusNumber) {
    const matchCount = this.#numbers.filter((n) =>
      winningNumbers.includes(n)
    ).length;
    const hasBonus = this.#numbers.includes(bonusNumber);

    return { matchCount, hasBonus };
  }
}

export default Lotto;
