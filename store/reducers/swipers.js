import {
  SET_ACTIVITY_IMG,
  SET_COURSES_SWIPERS,
  SET_SWIPERS,
} from '../actions/swipers';

const initialState = {
  swiperImgs: [],
  coursesSwiperImgs: [],
  activityImg: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SWIPERS:
      return {
        ...state,
        swiperImgs: action.products,
      };
    case SET_COURSES_SWIPERS:
      return {
        ...state,
        coursesSwiperImgs: action.products,
      };
    case SET_ACTIVITY_IMG:
      return {
        ...state,
        activityImg: action.products,
      };
  }
  return state;
};
