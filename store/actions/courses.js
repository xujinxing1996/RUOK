export const SET_COURSES = 'SET_COURSES';
export const SET_BOUTIQUE_COURSES = 'SET_BOUTIQUE_COURSES';
export const SET_FREE_COURSES = 'SET_FREE_COURSES';
export const SET_DETAIL_COURSE = 'SET_DETAIL_COURSE';
export const SET_ALL_COURSES = 'SET_ALL_COURSES';

export const fetchGetAllCourses = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'http://121.199.173.63:8007/api/open/interface/getResult',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            interfaceCode: 'SI0009',
            page: 1,
            size: 2,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('请求错误');
      }

      const resData = await response.json();
      dispatch({ type: SET_ALL_COURSES, products: resData.data.rows });
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

export const fetchFreeCourses = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'http://121.199.173.63:8007/api/open/interface/getResult',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            interfaceCode: 'SI0008',
            page: 1,
            size: 2,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('请求错误');
      }

      const resData = await response.json();
      dispatch({ type: SET_FREE_COURSES, products: resData.data.rows });
    } catch (error) {
      throw error.message;
    }
  };
};

export const fetchBoutiqueCourses = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'http://121.199.173.63:8007/api/open/interface/getResult',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            interfaceCode: 'SI0007',
            page: 1,
            size: 2,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('请求错误');
      }

      const resData = await response.json();
      dispatch({ type: SET_BOUTIQUE_COURSES, products: resData.data.rows });
    } catch (error) {
      throw error.message;
    }
  };
};

export const fetchCourses = () => {
  return async (dispatch) => {
    const response = await fetch('');
  };
};
