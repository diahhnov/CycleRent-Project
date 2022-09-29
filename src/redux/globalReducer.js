import {SET_LOAD} from './globalTypes';

const initialState = {
  load: false,
};

export const GlobalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOAD:
      return {
        ...state,
        load: action.payload,
      };
    default:
      return state;
  }
};
