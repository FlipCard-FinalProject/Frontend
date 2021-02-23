import axios from "axios";
import { FULLSCREEN_UPDATE_PLAYER_DID_PRESENT } from "expo-av/build/Video";
import { getAccess } from "../../helpers/AsyncStorage";

export const loading = (isLoading) => {
  return { type: "LOADING_SET_CARDS", payload: isLoading };
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

export const fetchingSetCards = () => {
  return (dispatch) => {
    dispatch(loading(true));
    let access = "";
    getAccess()
      .then((access_token) => {
        access = access_token;
        return axios({
          method: "GET",
          url: "https://flip-cards-server.herokuapp.com/setcard",
          headers: { access_token },
        });
      })
      .then(({ data }) => {
        dispatch(fetchingSuccess(data));
        dispatch(loading(false));
      })
      .catch((err) => {
        dispatch(sendError(err.response));
        dispatch(loading(false));
      });
  };
};

export const fetchByCategory = () => {
  return (dispatch) => {
    let access = "";
    getAccess()
      .then((access_token) => {
        access = access_token;
        return axios({
          method: "GET",
          url: "https://flip-cards-server.herokuapp.com/setcard",
          headers: { access_token },
        });
      })
      .then(({ data }) => {
        dispatch(fetchingSuccess(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(sendError(err.response));
      });
  };
};

export const insertSetCard = (payload) => {
  return (dispatch) => {
    let access = "";
    getAccess()
      .then((access_token) => {
        access = access_token;
        return axios({
          method: "POST",
          url: `https://flip-cards-server.herokuapp.com/setcard`,
          headers: { access_token },
          data: payload,
        });
      })
      .then(({ data }) => {
        dispatch(newVal(data));
        dispatch(fetchingSetCards(access));
      })
      .catch((err) => {
        console.log(err);
        dispatch(sendError(err.response));
      });
  };
};

export const findSetCardByTitle = (query) => {
  return (dispatch) => {
    let access = "";
    getAccess()
      .then((access_token) => {
        access = access_token;
        return axios({
          method: "GET",
          url: `https://flip-cards-server.herokuapp.com/setcard/${query}`,
          headers: { access_token },
        });
      })
      .then(({ data }) => {
        dispatch(fetchingSuccess(data));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(sendError(err.response));
      });
  };
};

export const updateSetCard = ({ id, payload }) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: `https://flip-cards-server.herokuapp.com/setcard/${id}`,
      data: payload,
    })
      .then(({ data }) => {
        dispatch(fetchingSetCards());
        dispatch(newVal(data));
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
        dispatch(fetchingSetCards());
      })
      .catch((err) => {
        console.log(err);
        dispatch(sendError(err.response));
      });
  };
};
