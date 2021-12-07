import { SET_USER_INFO } from '../actions/user';

const initialState = {
  userInfo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
};
