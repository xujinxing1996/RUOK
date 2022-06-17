export const SET_SWIPERS = 'SET_SWIPERS';
export const SET_ACTIVITY_IMG = 'SET_ACTIVITY_IMG';
export const SET_COURSES_SWIPERS = 'SET_COURSES_SWIPERS';

export const fetchSiwpers = (interfaceCode) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'http://124.71.1.231/api/open/interface/getResult',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            interfaceCode,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('请求出错');
      }
      
      const resData = await response.json();
      dispatch({ type: interfaceCode === 'SI0001' ? SET_SWIPERS : SET_COURSES_SWIPERS, products: resData.data });
    } catch (error) {}
  };
};

export const fetchActivityImg = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'http://124.71.1.231/api/open/interface/getResult',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            interfaceCode: 'SI0002',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('请求出错');
      }

      const resData = await response.json();
      dispatch({ type: SET_ACTIVITY_IMG, products: resData.data });
    } catch (error) {}
  };
};
