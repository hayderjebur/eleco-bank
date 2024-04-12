import {
  GET_CARDS,
  ADD_CARD,
  DELETE_CARD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CARD,
  FILTER_CARDS,
  CLEAR_FILTER,
  CARD_ERROR,
  CLEAR_CARDS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload,
        loading: false,
      };
    case ADD_CARD:
      return {
        ...state,
        cards: [action.payload, ...state.cards],
        loading: false,
      };
    case UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.map((card) =>
          card._id === action.payload._id ? action.payload : card
        ),
        loading: false,
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card._id !== action.payload),
        loading: false,
      };
    case CLEAR_CARDS:
      return {
        ...state,
        cards: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_CARDS:
      return {
        ...state,
        filtered: state.cards.filter((card) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return card.name.match(regex) || card.email.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case CARD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
