const baloonTemplate = document
  .querySelector('#map-baloon__template')
  .content.querySelector('.user-card');

const createBaloon = (data) => {
  const baloonElement = baloonTemplate.cloneNode(true);
  const { userName, isVerified, balance, exchangeRate, paymentMethods, minAmount, status } = data;

  baloonElement.querySelector('.user-card__user-name svg').style.display = isVerified ? 'block' : 'none';
  baloonElement.querySelector('.user-card__user-name span').textContent = userName;
  baloonElement.querySelector('#currency').textContent = balance.currency;
  baloonElement.querySelector('#exchangerate').textContent = `${Math.round(exchangeRate)} ₽`;
  baloonElement.querySelector('.user-card__badges-list').innerHTML = paymentMethods
    ? paymentMethods.map((element) =>
      `<li class="user-card__badges-item badge">${element.provider}</li>`
    ).join(' ') : '';
  baloonElement.querySelector('#cashlimit').textContent = `
    ${status === 'seller' ? `${Math.round(minAmount * exchangeRate)} ₽ - ${Math.round(balance.amount * exchangeRate)} ₽` : `${Math.round(minAmount)} ₽ - ${Math.round(balance.amount)} ₽`}
  `;

  return baloonElement;
};

export { createBaloon };
