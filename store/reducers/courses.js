import { COURSES } from '../../data/dummy-data';
import {
  SET_ALL_COURSES,
  SET_BOUTIQUE_COURSES,
  SET_DETAIL_COURSE,
  SET_FREE_COURSES,
  SET_MY_COURSES_ID,
  SEt_PROJECT_CLASSES,
  SET_PROJECT_OPTIONS,
  SET_SUBJECT_OPTIONS,
  SET_USER_COURSES,
} from '../actions/courses';

const initialState = {
  availableCourses: COURSES,
  myCoursesId: [],
  boutiqueCourses: [],
  freeCourses: [],
  courseInfo: null,
  allCourses: [],
  userCourses: [],
  projectOptions: [],
  subjectOptions: [],
  classOptions: [],
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
        courseInfo: action.products || null,
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
    case SET_MY_COURSES_ID:
      return {
        ...state,
        myCoursesId: action.products,
      };
    case SET_PROJECT_OPTIONS:
      return {
        ...state,
        projectOptions: action.products,
      };
    case SET_SUBJECT_OPTIONS:
      return {
        ...state,
        subjectOptions: action.products,
      };
    case SEt_PROJECT_CLASSES:
      return {
        ...state,
        projectClasses: action.products,
      };
  }
  return state;
};
