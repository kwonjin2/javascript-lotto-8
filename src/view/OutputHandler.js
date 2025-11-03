import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGES } from '../constants/constants.js';

class OutputHandler {
  static printLottoCount(lottoCount) {
    Console.print(OUTPUT_MESSAGES.PURCHASED_COUNT(lottoCount));
  }

  static printLotto(lottos) {
    lottos.forEach((lotto) =>
      Console.print(`[${lotto.getNumbers().join(', ')}]`)
    );
  }

  static printStatistics(profitRate, winningRank) {
    Console.print(OUTPUT_MESSAGES.STATISTICS_HEADER);
    Console.print(OUTPUT_MESSAGES.STATISTICS_SEPARATOR);
    Console.print(OUTPUT_MESSAGES.STATISTICS_MATCH3(winningRank.match3));
    Console.print(OUTPUT_MESSAGES.STATISTICS_MATCH4(winningRank.match4));
    Console.print(OUTPUT_MESSAGES.STATISTICS_MATCH5(winningRank.match5));
    Console.print(
      OUTPUT_MESSAGES.STATISTICS_MATCH5_BONUS(winningRank.match5AndBonus)
    );
    Console.print(OUTPUT_MESSAGES.STATISTICS_MATCH6(winningRank.match6));
    Console.print(OUTPUT_MESSAGES.PROFIT_RATE(profitRate));
  }
}

export default OutputHandler;
