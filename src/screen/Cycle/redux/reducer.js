import {ALL_RENTAL, RENTAL_ID} from './type';

const initialState = {
  rentalId: 0,
  allRental: [],
};

export const rentalReducer = (state = initialState, action) => {
  switch (action.type) {
    case RENTAL_ID:
      return {
        ...state,
        rentalId: action.payload,
      };
    case ALL_RENTAL:
      return {
        ...state,
        allRental: action.payload,
      };
    default:
      return state;
  }
};
