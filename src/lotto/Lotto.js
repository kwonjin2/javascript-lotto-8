import { Random } from '@woowacourse/mission-utils';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
  }

  static generateLottos(lottoCount) {
    const result = [];

    for (let i = 0; i < lottoCount; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
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
