import {AVAILABLE_CYCLE, DETAIL_RENTAL} from './type';

const initialState = {
  availableCycle: [],
  dataDetailRental: {},
};

export const cycleReducer = (state = initialState, action) => {
  switch (action.type) {
    case AVAILABLE_CYCLE:
      return {
        ...state,
        availableCycle: action.payload,
      };
    case DETAIL_RENTAL:
      return {
        ...state,
        dataDetailRental: action.payload,
      };
    default:
      return state;
  }
};
