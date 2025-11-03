export const LOTTO = {
  NUMBER_COUNT: 6,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  MIN_PURCHASE_AMOUNT: 1000,
  UNIT: 1000,
};

export const PRIZE = {
  MATCH3: 5000,
  MATCH4: 50000,
  MATCH5: 1500000,
  MATCH5_BONUS: 30000000,
  MATCH6: 2000000000,
};

export const MESSAGES = {
  PURCHASE_AMOUNT_PROMPT: '구매 금액을 입력해 주세요.\n',
  WINNING_NUMBERS_PROMPT: '\n당첨 번호를 입력해 주세요.\n',
  BONUS_NUMBER_PROMPT: '\n보너스 번호를 입력해 주세요.\n',
};

export const ERROR_MESSAGES = {
  PURCHASE_NUMBER: '[ERROR] 구매 금액은 숫자로 입력해 주세요.',
  MIN_PURCHASE: '[ERROR] 구매 금액은 1,000원 이상이어야 합니다.',
  UNIT_PURCHASE: '[ERROR] 구매 금액은 1,000원 단위로 입력해 주세요.',
  LOTTO_NUMBER_COUNT: '[ERROR] 로또 번호는 6개여야 합니다.',
  LOTTO_NUMBER_DUPLICATE: '[ERROR] 로또 번호는 중복될 수 없습니다.',
  LOTTO_NUMBER_RANGE: '[ERROR] 로또 번호는 1~45 범위여야 합니다.',
  WINNING_NUMBER_FORMAT: '[ERROR] 당첨 번호는 숫자로 입력해 주세요.',
  WINNING_NUMBER_RANGE: '[ERROR] 당첨 번호는 1 ~ 45 범위로 입력해 주세요.',
  WINNING_NUMBER_COUNT: '[ERROR] 당첨 번호는 6개여야 합니다.',
  WINNING_NUMBER_DUPLICATE: '[ERROR] 당첨 번호는 중복될 수 없습니다.',
  BONUS_NUMBER_FORMAT: '[ERROR] 보너스 번호는 숫자로 입력해 주세요.',
  BONUS_NUMBER_RANGE: '[ERROR] 보너스 번호는 1 ~ 45 범위로 입력해 주세요.',
  BONUS_NUMBER_DUPLICATE:
    '[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.',
};

export const OUTPUT_MESSAGES = {
  PURCHASED_COUNT: (count) => `\n${count}개를 구매했습니다.`,
  STATISTICS_HEADER: '\n당첨 통계',
  STATISTICS_SEPARATOR: '---',
  STATISTICS_MATCH3: (count) => `3개 일치 (5,000원) - ${count}개`,
  STATISTICS_MATCH4: (count) => `4개 일치 (50,000원) - ${count}개`,
  STATISTICS_MATCH5: (count) => `5개 일치 (1,500,000원) - ${count}개`,
  STATISTICS_MATCH5_BONUS: (count) =>
    `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개`,
  STATISTICS_MATCH6: (count) => `6개 일치 (2,000,000,000원) - ${count}개`,
  PROFIT_RATE: (rate) => `총 수익률은 ${rate}%입니다.`,
};
