import {ALL_RENTAL, RENTAL_ID} from './type';

export const rentalId = payload => {
  return {
    type: RENTAL_ID,
    payload,
  };
};

export const setAllRental = payload => {
  return {
    type: ALL_RENTAL,
    payload,
  };
};
