import { getUser, getContractors, sendData } from './api.js';
import { renderUserProfile, errorRenderUserProfile } from './user-profile.js';
import { renderErrorContractors } from './contractors-list.js';
import { filterContractors, usersNav, handleClickUsersNav } from './filter.js';
import { setOnFormSubmit, onSucces, onError } from './form.js';

getUser((data) => renderUserProfile(data), errorRenderUserProfile);
getContractors((contractors) => getUser((user) => filterContractors(contractors, user), filterContractors(contractors)), renderErrorContractors);

usersNav.addEventListener('click', (evt) => {
  handleClickUsersNav(evt);
  getContractors((contractors) => getUser((user) => filterContractors(contractors, user), filterContractors(contractors)), renderErrorContractors);
});

setOnFormSubmit(async (data) => {
  await sendData(onSucces, onError, data);
});
