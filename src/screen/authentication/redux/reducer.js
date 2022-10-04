import {SET_LOGIN, SET_LOGOUT, SET_TOKEN} from './type';

const initialState = {
  userInfo: {},
  signOut: false,
};

const initialToken = {
  dataToken: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        userInfo: action.payload,
        signOut: false,
      };
    case SET_LOGOUT:
      return {
        ...state,
        userInfo: {},
        signOut: true,
      };
    default:
      return state;
  }
};

export const tokenReducer = (state = initialToken, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        dataToken: action.payload,
      };
    default:
      return state;
  }
};
