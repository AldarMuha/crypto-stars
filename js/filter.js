import { renderContractors } from './contractors-list.js';

const tabsControls = document.querySelector('.tabs--toggle-buy-sell .tabs__controls');
const tabBuy = tabsControls.querySelector('#tab-buy');
const tabSell = tabsControls.querySelector('#tab-sell');

const checkedVerified = document.querySelector('#checked-users');

const tabsMap = document.querySelector('.tabs--toggle-list-map .tabs__controls');

const onClickTabBuySell = (evt) => {
  if (evt.target === tabBuy && !tabBuy.classList.contains('is-active')) {
    tabSell.classList.remove('is-active');
    tabBuy.classList.add('is-active');
  }
  if (evt.target === tabSell && !tabSell.classList.contains('is-active')) {
    tabBuy.classList.remove('is-active');
    tabSell.classList.add('is-active');
  }
};

const filterContractors = (contractors) => {
  const users = contractors;
  if (tabBuy.classList.contains('is-active')) {
    const items = users.filter((user) => user.status === 'buyer');
    renderContractors(checkedVerified.checked ? items.filter((item) => item.isVerified) : items);
  }
  if (tabSell.classList.contains('is-active')) {
    const items = users.filter((user) => user.status === 'seller');
    renderContractors(checkedVerified.checked ? items.filter((item) => item.isVerified) : items);
  }
};

export { tabsControls, filterContractors, onClickTabBuySell, tabBuy, tabSell, checkedVerified };
