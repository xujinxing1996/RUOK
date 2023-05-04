import { Alert } from 'react-native';
import API_URL from '../../constants/Config';
import { LOGOUT } from './auth';

export const SET_BOUTIQUE_COURSES = 'SET_BOUTIQUE_COURSES';
export const SET_FREE_COURSES = 'SET_FREE_COURSES';
export const SET_DETAIL_COURSE = 'SET_DETAIL_COURSE';
export const SET_ALL_COURSES = 'SET_ALL_COURSES';
export const SET_USER_COURSES = 'SET_USER_COURSES';
export const SET_MY_COURSES_ID = 'SET_MY_COURSES_ID';
export const SET_PROJECT_OPTIONS = 'SET_PROJECT_OPTIONS';
export const SEt_PROJECT_CLASSES = SEt_PROJECT_CLASSES;
export const SET_CLASS_OPTIONS = 'SET_CLASS_OPTIONS';
export const SET_SUBJECT_OPTIONS = 'SET_SUBJECT_OPTIONS';

const loadMoreData = (getState, isFooter, data) => {
  const products = isFooter
    ? getState().courses.allCourses.concat(data.rows)
    : data.rows;
  if (isFooter && data.rows.length === 0) {
    throw new Error('NoMoreData');
  }
  return products;
};

export const fetchGetCourses = (
  page,
  size,
  params,
  isFooter,
  interfaceCode
) => {
  return async (dispatch, getState) => {
    const response = await fetch(`${API_URL}/open/interface/getResult`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        interfaceCode,
        page,
        size,
        params,
      }),
    });

    if (!response.ok) {
      throw new Error('请求错误');
    }

    const resData = await response.json();
    const products = loadMoreData(getState, isFooter, resData.data);
    dispatch({ type: SET_ALL_COURSES, products });
  };
};

export const fetchFreeCourses = (page, size, params, isFooter) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${API_URL}/open/interface/getResult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interfaceCode: 'SI0008',
          page,
          size,
          params,
        }),
      });

      if (!response.ok) {
        throw new Error('请求错误');
      }

      const resData = await response.json();
      const products = loadMoreData(getState, isFooter, resData.data);
      dispatch({ type: SET_FREE_COURSES, products });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchBoutiqueCourses = (page, size, params, isFooter) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${API_URL}/open/interface/getResult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interfaceCode: 'SI0007',
          page,
          size,
          params,
        }),
      });

      if (!response.ok) {
        throw new Error('请求错误');
      }

      const resData = await response.json();
      const products = loadMoreData(getState, isFooter, resData.data);
      dispatch({ type: SET_BOUTIQUE_COURSES, products });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchProjectOptions = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/open/interface/getResult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interfaceCode: 'SI0004',
        }),
      });

      if (!response.ok) {
        throw new Error('请求错误');
      }
      const resData = await response.json();
      dispatch({ type: SET_PROJECT_OPTIONS, products: resData.data });
    } catch (error) {}
  };
};

export const fetchSubjectOptions = (projectCode) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/open/interface/getResult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interfaceCode: 'SI0005',
          params: {
            projectCode,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('请求错误');
      }
      const resData = await response.json();
      dispatch({ type: SET_SUBJECT_OPTIONS, products: resData.data });
    } catch (error) {}
  };
};

export const fetchProjectClass = (projectCodecode) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/open/interface/getResult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interfaceCode: 'SI0005',
          projectCode,
        }),
      });

      if (!response.ok) {
        throw new Error('请求错误');
      }
      const resData = await response.json();
      dispatch({ type: SEt_PROJECT_CLASSES, products: resData.data });
    } catch (error) {}
  };
};

export const fetchDetailCourse = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${API_URL}/open/interface/getCourseDetail`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            classId: id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('请求错误');
      }

      const resData = await response.json();
      dispatch({ type: SET_DETAIL_COURSE, products: resData.data });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchMyCoursesId = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(`${API_URL}/train/studentClassRl/ownclass`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      if (!response.ok) {
        throw new Error('请求错误');
      }
      const resData = await response.json();
      if (resData.code === 500) {
        Alert.alert('错误', resData.msg, [
          {
            text: '确认',
          },
        ]);
        dispatch({ type: SET_MY_COURSES_ID, products: [] });
        return;
      }
      if (resData.code === 401) {
        dispatch({ type: LOGOUT });
        return;
      }
      const ids = resData.data.map((course) => course.classId);
      dispatch({ type: SET_MY_COURSES_ID, products: ids });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const fetchUserCourses = (finishOver = '') => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `${API_URL}/train/studentClassRl/ownclass?finishOver=${finishOver}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      if (!response.ok) {
        throw new Error('请求错误');
      }
      const resData = await response.json();
      if (resData.code === 500) {
        Alert.alert('错误', resData.msg, [
          {
            text: '确认',
          },
        ]);
        dispatch({ type: SET_USER_COURSES, products: [] });
        return;
      }
      if (resData.code === 401) {
        dispatch({ type: LOGOUT });
        return;
      }
      dispatch({ type: SET_USER_COURSES, products: resData.data });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
