<<<<<<< HEAD
import axios from "axios";
=======
import axios from 'axios'
import { getAccess } from '../../helpers/AsyncStorage'
>>>>>>> 49837d7362991a28671c097442b973dd699dfc15

export const loading = () => {
  return { type: "LOADING_SET_CARDS" };
};

export const fetchingSuccess = (payload) => {
  return { type: "FETCHING_SET_CARDS", payload };
};

export const sendError = (payload) => {
  return { type: "ERROR_SET_CARDS", payload };
};

export const newVal = (payload) => {
  return { type: "NEW_VAL_SET_CARD", payload };
};

export const fetchingSetCards = (payload) => {
  return (dispatch) => {
    dispatch(loading());
    axios({
      method: "GET",
      url: "https://flip-cards-server.herokuapp.com/setcard",
      headers: { access_token: payload },
    })
      .then(({ data }) => {
<<<<<<< HEAD
        dispatch(fetchingSuccess(data));
=======
        dispatch(fetchingSuccess(data))
>>>>>>> 49837d7362991a28671c097442b973dd699dfc15
      })
      .catch((err) => {
        console.log(err);
        dispatch(sendError(err.response));
      });
  };
};

export const insertSetCard = (payload) => {
<<<<<<< HEAD
  return (dispatch) => {
    axios({
      method: "POST",
      url: "https://flip-cards-server.herokuapp.com/setcard",
      data: payload,
    })
      .then(({ data }) => {
        console.log("success add set card");
=======
  return dispatch => {
    getAccess()
      .then(access_token => {
        return axios({
          method: 'POST',
          url: `https://flip-cards-server.herokuapp.com/setcard`,
          headers: { access_token },
          data: payload
        })
      })
      .then(({ data }) => {
        console.log(data);
        console.log('success add set card')
>>>>>>> 49837d7362991a28671c097442b973dd699dfc15
        dispatch({
          type: "ADD_SET_CARD",
          payload: data,
        });
        dispatch(newVal(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(sendError(err.response));
      });
  };
};

export const findSetCardByTitle = (query) => {
  return (dispatch) => {
    dispatch(loading());
    axios({
      method: "GET",
      url: `https://flip-cards-server.herokuapp.com/setcard/${query}`,
    })
      .then(({ data }) => {
<<<<<<< HEAD
        dispatch(fetchingSuccess(data));
=======
        dispatch(fetchingSuccess(data))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(sendError(err.response))
>>>>>>> 49837d7362991a28671c097442b973dd699dfc15
      })
      .catch((err) => {
        console.log(err);
        dispatch(sendError(err.response));
      });
  };
};

export const updateSetCard = ({ id, payload }) => {
<<<<<<< HEAD
  return (dispatch) => {
=======
  return dispatch => {
>>>>>>> 49837d7362991a28671c097442b973dd699dfc15
    axios({
      method: "PUT",
      url: `https://flip-cards-server.herokuapp.com/setcard/${id}`,
      data: payload,
    })
      .then(({ data }) => {
<<<<<<< HEAD
        console.log("success update set card");
        dispatch(fetchingSetCards());
        dispatch(newVal(data));
=======
        console.log('success update set card')
        dispatch(fetchingSetCards())
        dispatch(newVal(data))
>>>>>>> 49837d7362991a28671c097442b973dd699dfc15
      })
      .catch((err) => {
        console.log(err);
        dispatch(sendError(err.response));
      });
  };
};

export const deleteSetCard = (id) => {
  return (dispatch) => {
    axios({
      method: "DELETE",
      url: `https://flip-cards-server.herokuapp.com/setcard/${id}`,
    })
      .then(({ data }) => {
<<<<<<< HEAD
        console.log("success delete set card");
        dispatch(fetchingSetCards());
=======
        console.log('success delete set card')
        dispatch(fetchingSetCards())
      })
      .catch(err => {
        console.log(err.response)
        dispatch(sendError(err.response))
>>>>>>> 49837d7362991a28671c097442b973dd699dfc15
      })
      .catch((err) => {
        console.log(err);
        dispatch(sendError(err.response));
      });
  };
};
