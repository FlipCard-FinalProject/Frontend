const init = {
  cards: [],
  loading: false,
  errors: [],
  newVal: {},
};

function cardReducer(state = init, action) {
  switch (action.type) {
    case "CLEAR_FORM":
      return {
        ...state,
        cards: [],

      };
    case 'FETCHING_CARDS':
      // console.log('in reducer');
      // console.log(action.payload);
      // console.log('in reducer');
      return { 

        ...state,
        cards: action.payload,
        loading: false,
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
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
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
