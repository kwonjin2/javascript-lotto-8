import { Console } from '@woowacourse/mission-utils';
import { MESSAGES, ERROR_MESSAGES } from '../constants/constants.js';

class InputHandler {
  static async readInputWithValidation(message, validateFn) {
    while (true) {
      try {
        const input = await Console.readLineAsync(message);
        validateFn(input);
        return input;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  static async readPurchaseAmount() {
    const input = await this.readInputWithValidation(
      MESSAGES.PURCHASE_AMOUNT_PROMPT,
      this.validatePurchaseAmount
    );

    return Number(input);
  }

  static async readWinningNumbers() {
    const input = await this.readInputWithValidation(
      MESSAGES.WINNING_NUMBERS_PROMPT,
      (raw) => this.validateWinningNumbers(this.parseWinningNumbers(raw))
    );

    return this.parseWinningNumbers(input);
  }

  static async readBonusNumber(winningNumbers) {
    const input = await this.readInputWithValidation(
      MESSAGES.BONUS_NUMBER_PROMPT,
      (raw) => this.validateBonusNumber(Number(raw), winningNumbers)
    );

    return Number(input);
  }

  static parseWinningNumbers(winningNumbers) {
    return winningNumbers.split(',').map((s) => Number(s));
  }

  static validatePurchaseAmount(purchaseAmount) {
    const money = Number(purchaseAmount);
    if (isNaN(money)) throw new Error(ERROR_MESSAGES.PURCHASE_NUMBER);
    if (money < 1000) throw new Error(ERROR_MESSAGES.MIN_PURCHASE);
    if (money % 1000 !== 0) throw new Error(ERROR_MESSAGES.UNIT_PURCHASE);
  }

  static validateWinningNumbers(numbers) {
    numbers.forEach((number) => {
      if (isNaN(number)) throw new Error(ERROR_MESSAGES.WINNING_NUMBER_FORMAT);
      if (number < 1 || number > 45)
        throw new Error(ERROR_MESSAGES.WINNING_NUMBER_RANGE);
    });

    if (numbers.length !== 6)
      throw new Error(ERROR_MESSAGES.WINNING_NUMBER_COUNT);
    const unique = new Set(numbers);
    if (unique.size !== numbers.length)
      throw new Error(ERROR_MESSAGES.WINNING_NUMBER_DUPLICATE);
  }

  static validateBonusNumber(bonusNumber, winningNumbers) {
    if (isNaN(bonusNumber)) throw new Error(ERROR_MESSAGES.BONUS_NUMBER_FORMAT);
    if (bonusNumber < 1 || bonusNumber > 45)
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_RANGE);
    if (winningNumbers.includes(bonusNumber))
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_DUPLICATE);
  }
}

export default InputHandler;
