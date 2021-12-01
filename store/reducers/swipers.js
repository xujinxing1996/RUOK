import { SET_ACTIVITY_IMG, SET_SWIPERS } from '../actions/swipers';

const initialState = {
  swiperImgs: [],
  activityImg: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SWIPERS:
      return {
        ...state,
        swiperImgs: action.products,
      };
    case SET_ACTIVITY_IMG:
      return {
        ...state,
        activityImg: action.products,
      };
  }
  return state;
};
