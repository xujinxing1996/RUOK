import { LOGIN } from '../actions/auth';

const initialState = {
  token: null,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
