import { Console } from '@woowacourse/mission-utils';

class InputHandler {
  static async readPurchaseAmount() {
    const input = await Console.readLineAsync('구매 금액을 입력해 주세요.\n');
    this.validatePurchaseAmount(input);
    return Number(input);
  }

  static async readWinningNumbers() {
    const input = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
    const numbers = this.parseWinningNumbers(input);
    this.validateWinningNumbers(numbers);
    return numbers;
  }

  static async readBonusNumber(winningNumbers) {
    const input = await Console.readLineAsync(
      '\n보너스 번호를 입력해 주세요.\n'
    );
    const bonusNumber = Number(input);
    this.validateBonusNumber(bonusNumber, winningNumbers);
    return bonusNumber;
  }

  static parseWinningNumbers(winningNumbers) {
    return winningNumbers.split(',').map((s) => Number(s));
  }

  static validatePurchaseAmount(purchaseAmount) {
    const money = Number(purchaseAmount);
    if (isNaN(money))
      throw new Error('[ERROR] 구매 금액은 숫자로 입력해 주세요.');
    if (money < 1000)
      throw new Error('[ERROR] 구매 금액은 1,000원 이상이어야 합니다.');
    if (money % 1000 !== 0)
      throw new Error('[ERROR] 구매 금액은 1,000원 단위로 입력해 주세요.');
  }

  static validateWinningNumbers(numbers) {
    numbers.forEach((number) => {
      if (isNaN(number))
        throw new Error('[ERROR] 당첨 번호는 숫자로 입력해 주세요.');
      if (number < 1 || number > 45)
        throw new Error('[ERROR] 당첨 번호는 1 ~ 45 범위로 입력해 주세요.');
    });

    if (numbers.length !== 6)
      throw new Error('[ERROR] 당첨 번호는 6개여야 합니다.');
    const unique = new Set(numbers);
    if (unique.size !== numbers.length)
      throw new Error('[ERROR] 당첨 번호는 중복될 수 없습니다.');
  }

  static validateBonusNumber(bonusNumber, winningNumbers) {
    if (isNaN(bonusNumber))
      throw new Error('[ERROR] 보너스 번호는 숫자로 입력해 주세요.');
    if (bonusNumber < 1 || bonusNumber > 45)
      throw new Error('[ERROR] 보너스 번호는 1 ~ 45 범위로 입력해 주세요.');
    if (winningNumbers.includes(bonusNumber))
      throw new Error('[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.');
  }
}

export default InputHandler;
