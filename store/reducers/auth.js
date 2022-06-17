import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { TOKEN } from '../../constants/Auth';
import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
      };
    case LOGOUT:
      AsyncStorageLib.removeItem(TOKEN);
      return {
        token: null,
        user: null,
      };
    default:
      return state;
  }
};
