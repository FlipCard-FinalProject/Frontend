const init = {
  setCards: [],
  loading: false,
  errors: [],
  newVal: {},
};

function setCardReducer(state = init, action) {
  switch (action.type) {
    case "FETCHING_SET_CARDS":
      return {
        ...state,
        setCards: action.payload,
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
    case "LOADING_SET_CARDS_START":
      return {
        ...state,
        loading: true,
      };
    case "LOADING_SET_CARDS_END":
      return {
        ...state,
        loading: false,
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
