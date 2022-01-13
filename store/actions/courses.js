import { LOGOUT } from './auth';

export const SET_BOUTIQUE_COURSES = 'SET_BOUTIQUE_COURSES';
export const SET_FREE_COURSES = 'SET_FREE_COURSES';
export const SET_DETAIL_COURSE = 'SET_DETAIL_COURSE';
export const SET_ALL_COURSES = 'SET_ALL_COURSES';
export const SET_USER_COURSES = 'SET_USER_COURSES';
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

export const fetchGetCourses = (page, size, isFooter, interfaceCode) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      'http://121.199.173.63:8007/api/open/interface/getResult',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interfaceCode,
          page,
          size,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('请求错误');
    }

    const resData = await response.json();
    const products = loadMoreData(getState, isFooter, resData.data);
    dispatch({ type: SET_ALL_COURSES, products });
  };
};

export const fetchFreeCourses = (page, size, isFooter) => {
  return async (dispatch, getState) => {
    try {
      console.log('free课程');
      const response = await fetch(
        'http://121.199.173.63:8007/api/open/interface/getResult',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            interfaceCode: 'SI0008',
            page,
            size,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('请求错误');
      }

      const resData = await response.json();
      const products = loadMoreData(getState, isFooter, resData.data);
      dispatch({ type: SET_FREE_COURSES, products });
    } catch (error) {
      throw error.message;
    }
  };
};

export const fetchBoutiqueCourses = (page, size, isFooter) => {
  return async (dispatch, getState) => {
    try {
      console.log('精品课程');
      const response = await fetch(
        'http://121.199.173.63:8007/api/open/interface/getResult',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            interfaceCode: 'SI0007',
            page,
            size,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('请求错误');
      }

      const resData = await response.json();
      const products = loadMoreData(getState, isFooter, resData.data);
      dispatch({ type: SET_BOUTIQUE_COURSES, products });
    } catch (error) {
      throw error.message;
    }
  };
};

export const fetchProjectOptions = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'http://121.199.173.63:8007/api/open/interface/getResult',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            interfaceCode: 'SI0004',
          }),
        }
      );

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
      const response = await fetch(
        'http://121.199.173.63:8007/api/open/interface/getResult',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            interfaceCode: 'SI0005',
            params: {
              projectCode,
            },
          }),
        }
      );

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
      const response = await fetch(
        'http://121.199.173.63:8007/api/open/interface/getResult',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            interfaceCode: 'SI0005',
            projectCode,
          }),
        }
      );

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
        'http://121.199.173.63:8007/api/open/interface/getCourseDetail',
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
      throw error.message;
    }
  };
};

export const fetchUserCourses = (finishOver = '') => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `http://121.199.173.63:8007/api/train/studentClassRl/ownclass?finishOver=${finishOver}`,
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
        throw new Error(resData.msg);
      }
      if (resData.code === 401) {
        dispatch({ type: LOGOUT });
        return;
      }
      dispatch({ type: SET_USER_COURSES, products: resData.data });
    } catch (error) {
      throw error.msg;
    }
  };
};
