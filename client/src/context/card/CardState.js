import React, { useReducer } from 'react';
import axios from 'axios';
import CardContext from './cardContext';
import cardReducer from './cardReducer';
import {
  GET_CARDS,
  ADD_CARD,
  DELETE_CARD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CARD,
  FILTER_CARDS,
  CLEAR_CARDS,
  CLEAR_FILTER,
  CARD_ERROR,
} from '../types';

const CardState = (props) => {
  const initialState = {
    cards: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(cardReducer, initialState);

  // Get cards
  const getCards = async () => {
    try {
      const res = await axios.get('/api/cards');

      dispatch({
        type: GET_CARDS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CARD_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add card
  const addCard = async (card) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/cards', card, config);

      dispatch({
        type: ADD_CARD,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CARD_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete card
  const deleteCard = async (id) => {
    try {
      await axios.delete(`/api/cards/${id}`);

      dispatch({
        type: DELETE_CARD,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CARD_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update card
  const updateCard = async (card) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/cards/${card._id}`, card, config);

      dispatch({
        type: UPDATE_CARD,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CARD_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Clear cards
  const clearCards = () => {
    dispatch({ type: CLEAR_CARDS });
  };

  // Set Current card
  const setCurrent = (card) => {
    dispatch({ type: SET_CURRENT, payload: card });
  };

  // Clear Current card
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter cards
  const filterCards = (text) => {
    dispatch({ type: FILTER_CARDS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <CardContext.Provider
      value={{
        cards: state.cards,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addCard,
        deleteCard,
        setCurrent,
        clearCurrent,
        updateCard,
        filterCards,
        clearFilter,
        getCards,
        clearCards,
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};

export default CardState;
