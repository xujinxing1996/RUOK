import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../../constants/Auth';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (token) => {
  return { type: AUTHENTICATE, token };
};

export const login = (phoneNumber, password, isLogin) => {
  return async (dispatch) => {
    let url = 'http://121.199.173.63:8007/api/login';
    let data = {
      code: 'CHUJIEKEJI',
      interfaceCode: 'TN0001',
      mobile: phoneNumber,
      password,
      uuid: '123',
    };
    if (!isLogin) {
      url = 'http://121.199.173.63:8007/api/authentication/mobile';
      data = {
        code: 'CHUJIEKEJI',
        mobile: phoneNumber,
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
    dispatch(authenticate(resData.token));
    saveDataToStorage(resData.token);
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

export const logout = () => {
  return { type: LOGOUT };
};

const saveDataToStorage = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN, token);
  } catch (error) {}
};
