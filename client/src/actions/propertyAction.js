import * as constants from "./constants";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

//Create a property profile
export const createProperty = (formData, history) => async (dispatch) => {
  //   const userInfo = { formData };

  //   const body = JSON.stringify(userInfo);

  try {
    const response = await axios.post("/api/property/profile", formData);

    dispatch({
      type: constants.CREATE_PROPERTY,
      payload: response.data,
    });

    history.push("/mypropertys");
    toast.success(response.data.msg);
  } catch (error) {
    const errList = error.response.data.errors;
    if (errList) {
      errList.forEach((err) => toast.error(err.msg));
    }
    // toast.error(error.response.data.msg);
    dispatch({
      type: constants.PROPERTY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    console.error(error);
    //dispatch({ type: constants.REGISTER_FAILED });
  }
};

//Update a property profile by property id
export const updateProperty = ({ formData, prop_id, history }) => async (
  dispatch
) => {
  try {
    const response = await axios.put(
      `/api/property/profile/${prop_id}`,
      formData
    );

    dispatch({
      type: constants.UPDATE_PROPERTY,
      payload: { property: response.data, prop_id },
    });
    //dispatch({ type: constants.CLEAR_PROPERTY });

    history.push("/mypropertys");

    toast.success(response.data.msg);
  } catch (error) {
    console.log(error);
    const errList = error.response.data.errors;
    if (errList) {
      errList.forEach((err) => toast.error(err.msg));
    }
    // toast.error(error.response.data.msg);
    dispatch({
      type: constants.PROPERTY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//get my property profiles by user
export const getMyPropertys = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/property/profile/me`);

    dispatch({
      type: constants.GET_MY_PROPERTYS,
      payload: response.data,
    });

    // toast.success(response.data.msg);
  } catch (error) {
    // toast.error(error.response.data.msg);
    dispatch({
      type: constants.PROPERTY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });

    console.error(error);
    //toast.error(response.data.msg);
  }
};

// get all property profiles
export const getPropertys = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/property/profile/all");

    dispatch({
      type: constants.GET_PROPERTYS,
      payload: response.data,
    });

    //toast.success(response.data.msg);
  } catch (error) {
    //toast.error(error.response.data.msg);
    dispatch({
      type: constants.PROPERTY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    console.error(error);
    //toast.error(response.data.msg);
  }
};

//Get a property by id
export const getProperty = (prop_id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/property/profile/${prop_id}`);

    dispatch({
      type: constants.GET_PROPERTY,
      payload: response.data,
    });

    // toast.success(response.data.msg);
  } catch (error) {
    // toast.error(error.response.data.msg);
    dispatch({
      type: constants.PROPERTY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    console.error(error);
    //toast.error(error.response.data.msg);
  }
};

// get all liked property profiles
export const getLikedPropertys = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/property/likedpropertys");

    dispatch({
      type: constants.GET_LIKED_LISTS,
      payload: response.data,
    });

    //toast.success(response.data.msg);
  } catch (error) {
    //toast.error(error.response.data.msg);
    console.error(error);
    dispatch({
      type: constants.PROPERTY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });

    //toast.error(response.data.msg);
  }
};

export const getSearchedPropertys = (
  address,
  purpose,
  bedroom,
  bathroom,
  homeType
) => async (dispatch) => {
  try {
    const response = await axios.get(
      `/api/property/search/${address}/${purpose}/${homeType}/${bedroom}/${bathroom}`
    );

    dispatch({
      type: constants.GET_SEARCHED_LISTS,
      payload: response.data,
    });

    //toast.success(response.data.msg);
  } catch (error) {
    //toast.error(error.response.data.msg);
    dispatch({
      type: constants.PROPERTY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    console.error(error);
    //toast.error(response.data.msg);
  }
};

//delete a property profile by property id
export const deleteProperty = (prop_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/property/profile/${prop_id}`);

    dispatch({ type: constants.DELETE_PROPERTY, payload: prop_id });
    // toast.success(response.data.msg);
    toast.success("Property removed");
  } catch (error) {
    console.error(error);
    // toast.error(error.response.data.msg);
    dispatch({
      type: constants.PROPERTY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//add interests/likes
export const addLike = (prop_id) => async (dispatch) => {
  try {
    ///profile/like/:prop_id
    const response = await axios.put(`/api/property/profile/like/${prop_id}`);

    dispatch({
      type: constants.ADD_LIKE,
      payload: { likes: response.data, prop_id },
    });

    toast.success("Image added");
  } catch (error) {
    console.log(error);
    // toast.error(error.response.data.msg);
    const errList = error.response.data.errors;
    if (errList) {
      errList.forEach((err) => toast.error(err.msg));
    }
    dispatch({
      type: constants.PROPERTY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    //dispatch({ type: constants.REGISTER_FAILED });
  }
};

//remove interests or likes

// add images to a property by property id
export const addImages = ({ image, prop_id, history }) => async (dispatch) => {
  try {
    //imagses is a key from back end
    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.put(
      `/api/property/profile/images/${prop_id}`,
      formData
    );

    dispatch({
      type: constants.ADD_IMAGE,
      payload: { images: response.data, prop_id },
    });

    toast.success(response.data.msg);

    history.push("/mypropertys");
  } catch (error) {
    console.log(error);
    const errList = error.response.data.errors;
    if (errList) {
      errList.forEach((err) => toast.error(err.msg));
    }
    dispatch({
      type: constants.PROPERTY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// remove an image from a property by property id and image id
export const deleteImage = ({ prop_id, image_id, history }) => async (
  dispatch
) => {
  try {
    // const response =
    await axios.delete(`/api/property/profile/images/${prop_id}/${image_id}`);

    dispatch({ type: constants.REMOVE_IMAGE, payload: image_id });
    toast.success("Image Removed");
    history.push(`/mypropertys`);
  } catch (error) {
    console.error(error);
    //toast.error(error.response.data.msg);
    dispatch({
      type: constants.PROPERTY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//address stuff goes here
// this will response with coordinates
// to do:
export const findOnMap = (address) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/property/google-maps/${address}`);

    dispatch({
      type: constants.GET_MAP,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.msg);
    dispatch({
      type: constants.PROPERTY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
