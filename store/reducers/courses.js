import { COURSES } from '../../data/dummy-data';
import {
  SET_ALL_COURSES,
  SET_BOUTIQUE_COURSES,
  SET_DETAIL_COURSE,
  SET_FREE_COURSES,
  SET_USER_COURSES,
} from '../actions/courses';

const initialState = {
  availableCourses: COURSES,
  boutiqueCourses: [],
  freeCourses: [],
  courseInfo: null,
  allCourses: [],
  userCourses: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOUTIQUE_COURSES:
      return {
        ...state,
        boutiqueCourses: action.products,
      };
    case SET_FREE_COURSES:
      return {
        ...state,
        freeCourses: action.products,
      };
    case SET_DETAIL_COURSE:
      return {
        ...state,
        courseInfo: action.products,
      };
    case SET_ALL_COURSES:
      return {
        ...state,
        allCourses: action.products,
      };
    case SET_USER_COURSES:
      return {
        ...state,
        userCourses: action.products,
      };
  }
  return state;
};
