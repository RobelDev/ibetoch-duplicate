import * as constants from "../actions/constants";
const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  loading: true,
  user: null,
  msg: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.REGISTER_SUCCESS:
    case constants.FORGOT_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuth: false,
        loading: false,
      };

    case constants.LOGIN_SUCCESS:
    case constants.ACCTIVATE_SUCCESS:
    case constants.RESET_SUCCESS:
    case constants.GOOGLE_LOGIN_SUCCESS:
    case constants.FACEBOOK_LOGIN_SUCCESS:
      // case constants.USER_LOADED:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        // ...action.payload,
        token: action.payload.token,
        isAuth: true,
        loading: false,
      };

    case constants.USER_LOADED:
      // localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        isAuth: true,
        loading: false,
      };

    case constants.REGISTER_FAILED:
    case constants.AUTHENTICATE_ERROR:
    case constants.LOGIN_FAILED:
    case constants.LOGOUT:
    case constants.FORGOT_FAILED:
    case constants.GOOGLE_LOGIN_FAILED:
    case constants.FACEBOOK_LOGIN_FAILED:
      localStorage.removeItem("token");
      return {
        ...state,

        token: null,
        isAuth: false,
        loading: false,
        user: null,
        msg: null,
      };
    case constants.ACCTIVATE_FAILED:
    case constants.RESET_FAILED:
      return {
        ...state,

        isAuth: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
