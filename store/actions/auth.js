export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: '',
        password: '',
      }),
    });

    if (!response.ok) {
      throw new Error('请求错误');
    }

    const resData = await response.json();
    dispatch(SIGNUP, resDta.data);
  };
};

export const login = (phoneNumber, password, isLogin) => {
  return async (dispatch) => {
    let url = 'http://121.199.173.63:8007/api/login';
    let data = {
      code: 'CHUJIEKEJI',
      interfaceCode: 'TN0001',
      mobile: '15888888888',
      password: 'admin123',
      uuid: '123',
    };
    if (!isLogin) {
      url = 'http://121.199.173.63:8007/api/authentication/mobile';
      data = {
        code: 'CHUJIEKEJI',
        mobile: '15652547467',
      };
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('请求错误');
    }
    const resData = await response.json();
    if (resData.code === 500) {
      throw new Error(resData.msg);
    }
    dispatch({ type: LOGIN, token: resData.token });
  };
};

export const getCode = (phoneNumber) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://121.199.173.63:8007/api/send/sms/validcode?mobile=${phoneNumber}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('请求错误');
    }
    const resData = await response.json();
  };
};
