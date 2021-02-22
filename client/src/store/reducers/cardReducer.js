const init = {
  cards: [],
  loading: false,
  errors: [],
  newVal: {},
};

function cardReducer(state = init, action) {
  switch (action.type) {
    case "FETCHING_CARDS":
      return {
        ...state,
        cards: action.payload,
      };
    case "ADD_CARD":
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    case "NEW_VAL_CARD":
      return {
        ...state,
        newVal: action.payload,
      };
    case "LOADING_CARDS_START":
      return {
        ...state,
        loading: true,
      };
    case "LOADING_CARDS_END":
      return {
        ...state,
        loading: false,
      };
    case "ERROR_CARDS":
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
}

export default cardReducer;
