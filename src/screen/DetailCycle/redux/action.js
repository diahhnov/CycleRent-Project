import {AVAILABLE_CYCLE, DETAIL_RENTAL} from './type';

export const setCycle = payload => {
  return {
    type: AVAILABLE_CYCLE,
    payload,
  };
};

export const setDetailRental = payload => {
  return {
    type: DETAIL_RENTAL,
    payload,
  };
};
