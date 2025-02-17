const getUser = async (onSuccess, onError) => {
  try {
    const response = await fetch(
      'https://cryptostar.grading.htmlacademy.pro/user'
    );
    if (!response.ok) {
      onError();
    }
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError();
  }
};

const getContractors = async (onSuccess, onError) => {
  try {
    const response = await fetch(
      'https://cryptostar.grading.htmlacademy.pro/contractors'
    );
    if (!response.ok) {
      onError();
    }
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError();
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://cryptostar.grading.htmlacademy.pro/',
      {
        method: 'POST',
        body,
      },
    );
    if (!response.ok) {
      throw new Error('Не удалось отправить форму');
    }
    onSuccess();
  } catch (error) {
    onFail(error);
  }
};

export { getUser, getContractors, sendData };
