const init = {
  setCards: [],
  loading: false,
  errors: [],
  newVal: {},
};

function setCardReducer(state = init, action) {
  switch (action.type) {
    case "CLEAR_NEW_VAL_SET_CARD":
      return {
        ...state,
        newVal: [],
      };
    case "FETCHING_SET_CARDS":
      return {
        ...state,
        setCards: action.payload,
        isUpdate: true,
        loading: false,
      };
    case "ADD_SET_CARD":
      return {
        ...state,
        setCards: [...state.setCards, action.payload],
      };
    case "NEW_VAL_SET_CARD":
      return {
        ...state,
        newVal: action.payload,
      };
    case "LOADING_SET_CARDS":
      return {
        ...state,
        loading: action.payload,
      };
    case "ERROR_SET_CARDS":
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
}

export default setCardReducer;
