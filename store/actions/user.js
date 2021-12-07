import { LOGOUT } from './auth';

export const SET_USER_INFO = 'SET_USER_INFO';

export const getUserInfo = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        'http://121.199.173.63:8007/api/system/user/profile',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
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
