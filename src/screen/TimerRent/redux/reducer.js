import {TIME_RENT} from './type';

const initialState = {
  dataRent: '',
};

export const timeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TIME_RENT:
      return {
        ...state,
        dataRent: action.payload,
      };
    default:
      return state;
  }
};
