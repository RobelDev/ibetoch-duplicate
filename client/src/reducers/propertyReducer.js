import * as constants from "../actions/constants";
const initialState = {
  property: null,
  propertys: [],
  mypropertys: [],
  mylikedpropertys: [],
  mysearchedpropertys: [],
  coordinates: {},
  loading: true,

  error: {},
  msg: null,
};

export default function (state = initialState, action) {
  //   const { type, payload } = action;

  switch (action.type) {
    case constants.CREATE_PROPERTY:
      return {
        ...state,
        mypropertys: [action.payload.property, ...state.mypropertys],
        // propertys: [action.payload.property, ...state.propertys],
        //property: action.payload.property,
        // msg: action.payload.msg,
        loading: false,
      };

    case constants.UPDATE_PROPERTY:
      return {
        ...state,
        mypropertys: state.mypropertys.map(
          (property) =>
            property._id === action.payload.prop_id && [
              action.payload.property.property,
              ...state.mypropertys,
            ]
          // : property
        ),
        // propertys: state.propertys.map((property) =>
        //   property._id === action.payload.prop_id
        //     ? [action.payload.property.property, ...state.propertys]
        //     : property
        // ),
        // msg: action.payload.property.msg,
        loading: false,
      };

    case constants.GET_MY_PROPERTYS:
      return {
        ...state,
        mypropertys: action.payload,
        // msg: action.payload.msg,
        loading: false,
      };

    case constants.GET_PROPERTYS:
      return {
        ...state,
        propertys: action.payload,
        // msg: action.payload.msg,
        loading: false,
      };

    case constants.GET_PROPERTY:
      return {
        ...state,
        property: action.payload,
        // msg: action.payload.msg,
        loading: false,
      };

    case constants.GET_LIKED_LISTS:
      return {
        ...state,
        mylikedpropertys: action.payload,
        loading: false,
      };

    case constants.GET_SEARCHED_LISTS:
      return {
        ...state,
        mysearchedpropertys: action.payload,
        loading: false,
      };

    case constants.GET_MAP:
      return {
        ...state,
        coordinates: action.payload,
        loading: false,
      };

    case constants.DELETE_PROPERTY:
      return {
        ...state,
        mypropertys: state.mypropertys.filter(
          (property) => property._id !== action.payload
        ),
        loading: false,
        // msg: action.payload.msg,
      };

    case constants.CLEAR_PROPERTY:
      return {
        ...state,
        property: null,
        loading: false,
      };

    case constants.CLEAR_PROPERTY_PROFILE:
      return {
        ...state,
        property: null,
        mypropertys: [],
        mylikedpropertys: [],
        mysearchedpropertys: [],
        propertys: [],
        loading: false,
        msg: null,
      };

    case constants.ADD_IMAGE:
    case constants.REMOVE_IMAGE:
      return {
        ...state,
        mypropertys: state.mypropertys.map((property) =>
          property._id === action.payload.prop_id
            ? { ...property, images: action.payload.images.images }
            : property
        ),
        //  [action.payload.images, ...state.mypropertys.images],
        loading: false,
      };

    // case constants.REMOVE_IMAGE:
    //   return {
    //     ...state,
    //     mypropertys: state.mypropertys.images.filter(
    //       ({ image }) => image !== action.payload
    //     ),
    //     loading: false,
    //   };

    case constants.ADD_LIKE:
    case constants.UNLIKE:
      return {
        ...state,
        propertys: state.propertys.map((property) =>
          property._id === action.payload.prop_id
            ? { ...property, interests: action.payload.likes }
            : property
        ),
        mysearchedpropertys: state.mysearchedpropertys.map((property) =>
          property._id === action.payload.prop_id
            ? { ...property, interests: action.payload.likes }
            : property
        ),
        mylikedpropertys: state.mylikedpropertys.map((property) =>
          property._id === action.payload.prop_id
            ? { ...property, interests: action.payload.likes }
            : property
        ),

        mypropertys: state.mypropertys.map((property) =>
          property._id === action.payload.prop_id
            ? { ...property, interests: action.payload.likes }
            : property
        ),

        loading: false,
      };

    case constants.PROPERTY_ERROR:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
