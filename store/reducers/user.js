import { RESET_USER_INFO, SET_USER_INFO } from '../actions/user';

const initialState = {
  userInfo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        userInfo: action.userInfo,
      };
    case RESET_USER_INFO:
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};
