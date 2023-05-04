import API_URL from '../../constants/Config';
import { LOGOUT } from './auth';

export const SET_USER_INFO = 'SET_USER_INFO';
export const RESET_USER_INFO = 'RESET_USER_INFO';

export const getUserInfo = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(`${API_URL}/system/user/profile`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const resData = await response.json();
      if (resData.code === 401) {
        dispatch({ type: LOGOUT });
        return;
      }
      dispatch({ type: SET_USER_INFO, userInfo: resData.data });
    } catch (error) {
      console.log(`error`, error);
    }
  };
};

export const resetUserInfo = () => {
  return (dispatch) => {
    dispatch({ type: RESET_USER_INFO });
  };
};

export const getValidCode = async (mobile) => {
  try {
    const response = await fetch(
      `${API_URL}/send/sms/validcode?mobile=${mobile}`,
      {
        method: 'POST',
      }
    );

    if (!response.ok) {
      throw new Error('获取失败');
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    console.log(`error`, error);
  }
};
