import { getUser, getContractors } from './api.js';
import { renderUserProfile, errorRenderUserProfile } from './user-profile.js';
import { renderErrorContractors } from './contractors-list.js';
import { filterContractors, usersNav, handleClickUsersNav } from './filter.js';

getUser((data) => renderUserProfile(data), errorRenderUserProfile);
getContractors((data) => filterContractors(data), renderErrorContractors);

usersNav.addEventListener('click', (evt) => {
  handleClickUsersNav(evt);
  getContractors((data) => filterContractors(data), renderErrorContractors);
});

