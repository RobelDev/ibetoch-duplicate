import * as constants from "./constants";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { setAuth } from "../components/auth/Helper";

export const register = ({ name, email, password }) => async (dispatch) => {
  const userInfo = { name, email, password };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(userInfo);

  try {
    const response = await axios.post(
      "https://fathomless-escarpment-92562.herokuapp.com/api/users/register",
      body,
      config
    );

    dispatch({
      type: constants.REGISTER_SUCCESS,
      payload: response.data,
    });

    toast.success(response.data.msg);
  } catch (error) {
    const errList = error.response.data.errors;
    if (errList) {
      errList.forEach((err) => toast.error(err.msg));
    }

    dispatch({ type: constants.REGISTER_FAILED });
    //console.error(error.response.data.errors[0].msg);
    //toast.error(error.response.data.errors[0].msg);
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuth(localStorage.token);
  }

  try {
    const response = await axios.get(
      "https://fathomless-escarpment-92562.herokuapp.com/api/auth/signin"
    );

    //console.log(response.data);
    toast.success(response.data.msg);
    dispatch({
      type: constants.USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    // const errList = error.response.data.errors;
    // if (errList) {
    //   errList.forEach((err) => toast.error(err.msg));
    // }
    // toast.error(error.response.data.msg);
    dispatch({ type: constants.AUTHENTICATE_ERROR });
  }
};

export const activateAccount = (token) => async (dispatch) => {
  const userInfo = { token };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(userInfo);

  try {
    const response = await axios.post(
      "https://fathomless-escarpment-92562.herokuapp.com/api/users/activate",
      body,
      config
    );

    dispatch({
      type: constants.ACCTIVATE_SUCCESS,
      payload: response.data,
    });
    toast.success(response.data.msg);
    dispatch(loadUser());
    // console.log(response.data);
  } catch (error) {
    const errList = error.response.data.errors;
    if (errList) {
      errList.forEach((err) => toast.error(err.msg));
    }
    // toast.error(response.data.msg);
    dispatch({ type: constants.ACCTIVATE_FAILED });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const userInfo = { email, password };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(userInfo);

  try {
    const response = await axios.post(
      "https://fathomless-escarpment-92562.herokuapp.com/api/auth/signin",
      body,
      config
    );

    dispatch({
      type: constants.LOGIN_SUCCESS,
      payload: response.data,
    });
    // toast.success(response.data.msg);
    dispatch(loadUser());

    //console.log(res.data);
  } catch (error) {
    console.log(error);
    const errList = error.response.data.errors;
    if (errList) {
      errList.forEach((err) => toast.error(err.msg));
    }

    dispatch({ type: constants.LOGIN_FAILED });
  }
};

export const forgotPassword = ({ email }) => async (dispatch) => {
  const userInfo = { email };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(userInfo);
  try {
    const response = await axios.put(
      "https://fathomless-escarpment-92562.herokuapp.com/api/users/forgot",
      body,
      config
    );

    dispatch({
      type: constants.FORGOT_SUCCESS,
      payload: response.data,
    });
    toast.success(response.data.msg);
  } catch (error) {
    const errList = error.response.data.errors;
    if (errList) {
      errList.forEach((err) => toast.error(err.msg));
    }

    dispatch({ type: constants.FORGOT_FAILED });
  }
};

export const resetPassword = ({ newPassword, token }) => async (dispatch) => {
  const userInfo = { newPassword, token };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(userInfo);

  try {
    const response = await axios.put(
      "https://fathomless-escarpment-92562.herokuapp.com/api/users/reset",
      body,
      config
    );
    //console.log(response.data);

    dispatch({
      type: constants.RESET_SUCCESS,
      payload: response.data,
    });

    //dispatch(loadUser());
    toast.success(response.data.msg);
    dispatch(loadUser());
  } catch (error) {
    const errList = error.response.data.errors;
    if (errList) {
      errList.forEach((err) => toast.error(err.msg));
    }

    dispatch({ type: constants.RESET_FAILED });
  }
};

export const googleResponse = (idToken) => async (dispatch) => {
  const userInfo = { idToken };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(userInfo);

  try {
    const res = await axios.post(
      "https://fathomless-escarpment-92562.herokuapp.com/api/auth/google",
      body,
      config
    );

    dispatch({ type: constants.GOOGLE_LOGIN_SUCCESS, payload: res.data });
    toast.success(res.data.msg);
    dispatch(loadUser());

    //console.log(response.data);
  } catch (error) {
    console.log(error);
    // toast.error(error.response);
    dispatch({ type: constants.GOOGLE_LOGIN_FAILED });
  }
};

export const facebookResponse = ({ userID, accessToken }) => async (
  dispatch
) => {
  const userInfo = { userID, accessToken };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(userInfo);

  //console.log(userID, accessToken);
  try {
    const res = await axios.post(
      "https://fathomless-escarpment-92562.herokuapp.com/api/auth/facebook",
      body,
      config
    );
    dispatch({ type: constants.FACEBOOK_LOGIN_SUCCESS, payload: res.data });
    toast.success(res.data.msg);
    dispatch(loadUser());
    //console.log(res.data);
    //console.log(response.data);
  } catch (error) {
    //console.log(error);
    // toast.error(error.response);
    dispatch({ type: constants.FACEBOOK_LOGIN_FAILED });
  }
};
export const logout = () => async (dispatch) => {
  dispatch({ type: constants.LOGOUT, payload: "Signed out succesfully" });
  dispatch({ type: constants.CLEAR_PROPERTY_PROFILE });
};
