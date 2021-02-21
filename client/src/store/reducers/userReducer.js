const init = {
  user: {},
  profile: {},
  access_token: "",
  loading: false,
  errors: [],
  newVal: {},
};

function userReducer(state = init, action) {
  switch (action.type) {
    case "FETCHING_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "FETCHING_PROFILE":
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        access_token: action.payload,
      };
    case "NEW_VAL_USER":
      return {
        ...state,
        newVal: action.payload,
      };
    case "LOADING_USER_START":
      return { ...state, loading: true };
    case "LOADING_USER_END":
      return { ...state, loading: false };
    case "ERROR_USER":
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
