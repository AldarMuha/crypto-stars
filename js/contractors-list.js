import { showModalHandler } from './form.js';

const container = document.querySelector('.users-list__table-body');
const contractorTemplate = document
  .querySelector('#user-table-row__template')
  .content.querySelector('.users-list__table-row');

const createContractor = (contractorData, user) => {
  const { userName, balance, exchangeRate, paymentMethods, minAmount, status, isVerified } = contractorData;
  document.querySelector('main .container').style.display = 'block';
  document.querySelector('#container-error').style.display = 'none';
  const contractor = contractorTemplate.cloneNode(true);

  contractor.querySelector('.users-list__table-name svg').style.display = isVerified ? 'block' : 'none';
  contractor.querySelector('.users-list__table-name span').textContent = userName;
  contractor.querySelector('.users-list__table-currency').textContent = balance.currency;
  contractor.querySelector('.users-list__table-exchangerate').textContent = `${Math.round(exchangeRate)} ₽`;
  contractor.querySelector('.users-list__badges-list').innerHTML = paymentMethods
    ? paymentMethods.map((element) =>
      `<li class="users-list__badges-item badge">${element.provider}</li>`
    ).join(' ') : '';
  contractor.querySelector('.users-list__table-cashlimit').textContent = `
    ${status === 'seller' ? `${Math.round(minAmount * exchangeRate)} ₽ - ${Math.round(balance.amount * exchangeRate)} ₽` : `${Math.round(minAmount)} ₽ - ${Math.round(balance.amount)} ₽`}
  `;

  contractor.querySelector('.btn--greenborder').addEventListener('click', () => {
    showModalHandler(contractorData, user);
  });

  return contractor;
};

const renderContractors = (contractors, user) => {
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();
  contractors.forEach((contractorData) => {
    const contractorElement = createContractor(contractorData, user);
    fragment.append(contractorElement);
  });
  container.append(fragment);
};

const renderErrorContractors = () => {
  document.querySelector('#container-contactors').style.display = 'none';
  document.querySelector('#container-map').style.display = 'none';
  document.querySelector('#container-error').style.display = 'block';
};

export { renderContractors, renderErrorContractors };
