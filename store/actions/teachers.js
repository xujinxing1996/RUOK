export const SET_TEACHERS = 'SET_TEACHERS';

export const fetchGetTeachers = (page, size) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://124.71.1.231/api/open/interface/getResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interfaceCode: 'SI0003',
          page,
          size,
        }),
      });

      if (!response.ok) {
        throw new Error('请求错误');
      }

      const resData = await response.json();
      dispatch({ type: SET_TEACHERS, products: resData.data.rows })
    } catch (error) {}
  };
};
