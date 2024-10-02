import { renderContractors } from './contractors-list.js';
import { renderMarkers } from './map.js';

const usersNav = document.querySelector('.users-nav');
const tabBuy = usersNav.querySelector('#tab-buy');
const tabSell = usersNav.querySelector('#tab-sell');
const checkedVerified = usersNav.querySelector('#checked-users');
const tabList = usersNav.querySelector('#tab-list');
const tabMap = usersNav.querySelector('#tab-map');

const containerUsersList = document.querySelector('.users-list');
const containerMap = document.querySelector('#container-map');

const handleClickUsersNav = (evt) => {
  if (evt.target === tabBuy && !tabBuy.classList.contains('is-active')) {
    tabSell.classList.remove('is-active');
    tabBuy.classList.add('is-active');
  }
  if (evt.target === tabSell && !tabSell.classList.contains('is-active')) {
    if (tabMap.classList.contains('is-active')) {
      tabMap.classList.remove('is-active');
      tabList.classList.add('is-active');
    }
    tabBuy.classList.remove('is-active');
    tabSell.classList.add('is-active');
  }
  if (evt.target === tabList && !tabList.classList.contains('is-active')) {
    tabMap.classList.remove('is-active');
    tabList.classList.add('is-active');
  }
  if (evt.target === tabMap && !tabMap.classList.contains('is-active') && tabBuy.classList.contains('is-active')) {
    tabList.classList.remove('is-active');
    tabMap.classList.add('is-active');
  }
};

const filterContractors = (contractors, user) => {
  if (tabSell.classList.contains('is-active')) {
    containerMap.style.display = 'none';
    containerUsersList.style.display = 'block';
    const items = contractors.filter((contactor) => contactor.status === 'buyer');
    renderContractors(checkedVerified.checked ? items.filter((item) => item.isVerified) : items, user);
  }
  if (tabBuy.classList.contains('is-active')) {
    const items = contractors.filter((contactor) => contactor.status === 'seller');
    if (tabMap.classList.contains('is-active')) {
      containerUsersList.style.display = 'none';
      containerMap.style.display = 'block';
      renderMarkers(checkedVerified.checked ? items.filter((item) => item.isVerified) : items, user);
    } else {
      containerMap.style.display = 'none';
      containerUsersList.style.display = 'block';
      renderContractors(checkedVerified.checked ? items.filter((item) => item.isVerified) : items, user);
    }
  }
};

export { filterContractors, handleClickUsersNav, usersNav };
