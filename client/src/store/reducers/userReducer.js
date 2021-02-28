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
    case "LOGOUT":
      return {
        ...state,
        access_token: "",
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
    case "LOADING":
      return { ...state, loading: action.payload };
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
