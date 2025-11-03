class LottoResult {
  #winningRank = {
    match3: 0,
    match4: 0,
    match5: 0,
    match5AndBonus: 0,
    match6: 0,
  };

  #prizeTable = {
    1: 2000000000,
    2: 30000000,
    3: 1500000,
    4: 50000,
    5: 5000,
  };

  updateWinningStatistics(lottos, winningNumbers, bonusNumber) {
    for (const lotto of lottos) {
      const { matchCount, hasBonus } = lotto.compareWithWinningNumbers(
        winningNumbers,
        bonusNumber
      );

      if (matchCount === 3) this.#winningRank.match3++;
      if (matchCount === 4) this.#winningRank.match4++;
      if (matchCount === 5 && !hasBonus) this.#winningRank.match5++;
      if (matchCount === 5 && hasBonus) this.#winningRank.match5AndBonus++;
      if (matchCount === 6) this.#winningRank.match6++;
    }
  }
}
