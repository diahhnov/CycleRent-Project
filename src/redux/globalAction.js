import {SET_LOAD} from './globalTypes';

export const setLoad = payload => {
  return {
    type: SET_LOAD,
    payload,
  };
};
