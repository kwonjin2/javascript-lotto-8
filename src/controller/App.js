import Lotto from '../lotto/Lotto.js';
import LottoResult from '../lotto/LottoResult.js';
import LottoUtils from '../lotto/LottoUtils.js';
import InputHandler from '../view/InputHandler.js';
import OutputHandler from '../view/OutputHandler.js';

class App {
  async run() {
    // 1. 구매 금액 입력
    const purchaseInput = await InputHandler.readPurchaseAmount();

    // 2. 로또 생성
    const lottoCount = LottoUtils.getLottoCount(purchaseInput);
    const lottos = Lotto.generateLottos(lottoCount);

    // 3. 로또 결과 출력
    OutputHandler.printLottoCount(lottoCount);
    OutputHandler.printLotto(lottos);

    // 4. 당첨 번호 입력
    const winnerLottoNumbers = await InputHandler.readWinningNumbers();
    const bonusLottoNumber =
      await InputHandler.readBonusNumber(winnerLottoNumbers);

    // 5. 당첨 통계 계산
    const lottoResult = new LottoResult();
    lottoResult.updateWinningStatistics(
      lottos,
      winnerLottoNumbers,
      bonusLottoNumber
    );

    // 6. 통계 출력
    const totalPrize = lottoResult.getTotalPrize();
    const profitRate = lottoResult.calculateProfitRate(purchaseInput);
    const winningRank = lottoResult.getWinningRank();

    OutputHandler.printStatistics(profitRate, winningRank);
  }
}

export default App;
