import {TIME_RENT} from './type';

export const timeRent = payload => {
  return {
    type: TIME_RENT,
    payload,
  };
};
