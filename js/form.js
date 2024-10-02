const modal = document.querySelector('.modal--buy');
const modalTitle = modal.querySelector('.modal__description');
const closeButton = modal.querySelector('.modal__close-btn');
const userName = modal.querySelector('#user-name');
const verifiedStar = modal.querySelector('.transaction-info__item--name svg');
const exchangeRate = modal.querySelector('.transaction-info__item--exchangerate .transaction-info__data');
const form = modal.querySelector('.modal-buy');
const cashlimitMin = modal.querySelector('#cashlimit-min');
const cashlimitMax = modal.querySelector('#cashlimit-max');
const validateMessage = modal.querySelector('.modal__validation-message--success');
const errorMessage = modal.querySelector('.modal__validation-message--error');

const type = form.querySelector('[name="type"]');
const contractorId = form.querySelector('input[name="contractorId"]');
const exchangeRateInput = form.querySelector('input[name="exchangeRate"]');
const sendingCurrency = form.querySelector('input[name="sendingCurrency"]');
const receivingCurrency = form.querySelector('input[name="receivingCurrency"]');

const sendingAmount = form.querySelector('input[name="sendingAmount"]');
const receivingAmount = form.querySelector('input[name="receivingAmount"]');
const textBlueButton = form.querySelector('.btn--textblue');
const paymentMethods = form.querySelector('#paymentMethods');
const numberBankCard = form.querySelector('#number-bank-card');
const nubmerCryptoWallet = form.querySelector('#nubmer-crypto-wallet');
const password = form.querySelector('input[name="paymentPassword"]');
const cryptoWalletWrapper = form.querySelector('.modal__input-wrapper--crypto-wallet');

const pristine = new Pristine(form, {
  classTo: 'custom-input',
  errorTextParent: 'custom-input',
  errorTextClass: 'custom-input__error',
}, false);

const getCurrencyRate = (exchangeRateValue, value, currency) => {
  if (currency === 'RUB') {
    return exchangeRateValue * value;
  }
  if (currency === 'KEKS') {
    return value / exchangeRateValue;
  }
};

const closeModalHandler = () => {
  modal.style.display = 'none';
  pristine.reset();
  sendingAmount.value = null;
  receivingAmount.value = null;
  numberBankCard.value = '';
  validateMessage.style.display = 'none';
  errorMessage.style.display = 'none';
};

const escKeyDownHandler = (evt) => {
  if (evt.key === 'Escape') {
    closeModalHandler();
  }
};

const renderForm = (contractor, user) => {
  contractorId.value = contractor.id;
  exchangeRateInput.value = contractor.exchangeRate;
  verifiedStar.style.display = contractor.isVerified ? 'block' : 'none';
  userName.textContent = contractor.userName;
  exchangeRate.textContent = `${contractor.exchangeRate} ₽`;
  closeButton.addEventListener('click', closeModalHandler);
  document.addEventListener('keydown', escKeyDownHandler);
  if (contractor.status === 'seller') {
    sendingCurrency.value = user.balances[0].currency;
    receivingCurrency.value = contractor.balance.currency;
    cryptoWalletWrapper.style.order = 0;
    modalTitle.textContent = 'Покупка криптоволюты';
    type.value = 'BUY';
    cashlimitMin.textContent = contractor.minAmount * contractor.exchangeRate;
    cashlimitMax.textContent = contractor.balance.amount * contractor.exchangeRate;
    paymentMethods.innerHTML = `<option selected disabled>Выберите платёжную систему</option> ${contractor.paymentMethods.map((paymentMethod) => `<option>${paymentMethod.provider}</option>`).join(' ')}`;
    sendingAmount.addEventListener('input', () => {
      receivingAmount.value = getCurrencyRate(contractor.exchangeRate, sendingAmount.value, contractor.balance.currency);
    });
    receivingAmount.addEventListener('input', () => {
      sendingAmount.value = getCurrencyRate(contractor.exchangeRate, receivingAmount.value, user.balances[0].currency);
    });
    textBlueButton.addEventListener('click', () => {
      sendingAmount.value = Number(cashlimitMax.textContent) < user.balances[0].amount ? Number(cashlimitMax.textContent) : user.balances[0].amount;
      receivingAmount.value = sendingAmount.value / contractor.exchangeRate;
    });
    paymentMethods.addEventListener('change', () => {
      const paymentMethod = contractor.paymentMethods.find((item) => item.provider === paymentMethods.value);
      numberBankCard.value = paymentMethod.provider === 'Cash in person' ? '' : paymentMethod.accountNumber;
    });
    nubmerCryptoWallet.value = user.wallet.address;
  }
  if (contractor.status === 'buyer') {
    sendingCurrency.value = user.balances[1].currency;
    cryptoWalletWrapper.style.order = -1;
    modalTitle.textContent = 'Продажа криптовалюты';
    type.value = 'SELL';
    cashlimitMin.textContent = contractor.minAmount;
    cashlimitMax.textContent = contractor.balance.amount;
    paymentMethods.innerHTML = `<option selected disabled>Выберите платёжную систему</option> ${user.paymentMethods.map((paymentMethod) => `<option>${paymentMethod.provider}</option>`).join(' ')}`;
    paymentMethods.addEventListener('change', () => {
      const paymentMethod = user.paymentMethods.find((item) => item.provider === paymentMethods.value);
      numberBankCard.value = paymentMethod.provider === 'Cash in person' ? '' : paymentMethod.accountNumber;
    });
    sendingAmount.addEventListener('input', () => {
      receivingAmount.value = getCurrencyRate(contractor.exchangeRate, sendingAmount.value, user.balances[1].currency);
    });
    receivingAmount.addEventListener('input', () => {
      sendingAmount.value = getCurrencyRate(contractor.exchangeRate, receivingAmount.value, contractor.balance.currency);
    });
    textBlueButton.addEventListener('click', () => {
      sendingAmount.value = (Number(cashlimitMax.textContent) > (user.balances[1].amount * contractor.exchangeRate)) ? (user.balances[1].amount * contractor.exchangeRate) : Number(cashlimitMax.textContent);
      receivingAmount.value = sendingAmount.value / contractor.exchangeRate;
    });
    nubmerCryptoWallet.value = contractor.wallet.address;
  }
};

const showModalHandler = (contractor, user) => {
  modal.style.display = 'block';
  modal.style.zIndex = 400;
  renderForm(contractor, user);
};

const validateSendingAmount = (value) =>
  value >= Number(cashlimitMin.textContent) && value <= Number(cashlimitMax.textContent) && value > 0;

const getSendingAmountErrorMessage = (value) => {
  if (value <= 0) {
    return 'Не указали сумму';
  } else if (value <= Number(cashlimitMin.textContent)) {
    return `Минимальная сумма - ${cashlimitMin.textContent} ₽`;
  } else {
    return `Максимальная сумма - ${cashlimitMax.textContent} ₽`;
  }
};

pristine.addValidator(
  sendingAmount,
  validateSendingAmount,
  getSendingAmountErrorMessage,
);

const validatePaymantMethods = () =>
  paymentMethods.value !== 'Выберите платёжную систему';

const getPaymantMethodsErrorMesage = () =>
  'Не выбрали тип платежной системы';

pristine.addValidator(
  numberBankCard,
  validatePaymantMethods,
  getPaymantMethodsErrorMesage,
);

const validatePassword = (value) => value <= 180712 && value >= 180712;

const getPasswordErrorMessage = () =>
  'Неверный пароль';


pristine.addValidator(
  password,
  validatePassword,
  getPasswordErrorMessage,
);

const onSucces = () => {
  pristine.reset();
  errorMessage.style.display = 'none';
  validateMessage.style.display = 'flex';
};

const onError = () => {
  validateMessage.style.display = 'none';
  errorMessage.style.display = 'flex';
};

const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    pristine.validate();
    const isValid = pristine.validate();
    if (isValid) {
      await cb(new FormData(form));
    }
  });
};

export { modal, showModalHandler, closeModalHandler, setOnFormSubmit, onSucces, onError };
