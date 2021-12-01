import { SET_TEACHERS } from "../actions/teachers";

const initialState = {
  teacherList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TEACHERS:
      return {
        ...state,
        teacherList: action.products,
      };
  }

  return state;
};
