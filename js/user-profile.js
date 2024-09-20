const userProfile = document.querySelector('.user-profile');
const cryptoBalance = userProfile.querySelector('#user-crypto-balance');
const fiatBalance = userProfile.querySelector('#user-fiat-balance');
const user = userProfile.querySelector('.user-profile__name').lastChild;

const renderUserProfile = (data) => {
  const { userName, balances } = data;
  user.textContent = userName;
  cryptoBalance.textContent = balances[1].amount;
  fiatBalance.textContent = balances[0].amount;
};

const errorRenderUserProfile = () => {
  userProfile.remove();
};

export { renderUserProfile, errorRenderUserProfile };
