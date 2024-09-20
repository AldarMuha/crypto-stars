import { getUser, getContractors } from './api.js';
import { renderUserProfile, errorRenderUserProfile } from './user-profile.js';
import { renderContractors, renderErrorContractors } from './contractors-list.js';
import { tabsControls, filterContractors, onClickTabBuySell, checkedVerified } from './filter.js';

getUser((data) => renderUserProfile(data), errorRenderUserProfile);
getContractors((data) => filterContractors(data));

tabsControls.addEventListener('click', (evt) => {
  onClickTabBuySell(evt);
  getContractors((data) => filterContractors(data));
});

checkedVerified.addEventListener('click', () => {
  getContractors((data) => filterContractors(data));
});
