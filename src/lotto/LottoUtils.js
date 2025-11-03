class LottoUtils {
  static getLottoCount(purchaseAmount) {
    return Number(purchaseAmount) / 1000;
  }
}

export default LottoUtils;
