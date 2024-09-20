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

const getContractors = async (onSuccess) => {
  const response = await fetch(
    'https://cryptostar.grading.htmlacademy.pro/contractors'
  );

  const data = await response.json();
  onSuccess(data);

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
      onFail();
    }
    onSuccess();
  } catch (error) {
    onFail();
  }
};

export { getUser, getContractors, sendData };
