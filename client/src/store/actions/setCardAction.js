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
        dispatch(sendError(err.response.data.errors));
        dispatch(loading(false));
      });
  };
};

export const fetchByCategory = () => {
  return (dispatch) => {
    dispatch(loading(true))
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
        dispatch(loading(false))
        dispatch(fetchingSuccess(data));
      })
      .catch((err) => {
        dispatch(loading(false))
        console.log(err);
        dispatch(sendError(err.response.data.errors));
      });
  };
};

export const insertSetCard = (payload) => {
  return (dispatch) => {
    dispatch(loading(true))
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
        dispatch(loading(false))
        console.log('success add set card')
        dispatch(newVal(data));
        dispatch(fetchingSetCards(access));
      })
      .catch((err) => {
        dispatch(loading(false))
        console.log(err);
        dispatch(sendError(err.response.data.errors));
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
        dispatch(sendError(err.response.data.errors));
      });
  };
};


export const updateSetCard = ( id, payload ) => {
  return dispatch => {
    dispatch(loading(true))
    getAccess()
      .then(access_token => {
        return axios({
          method: "PUT",
          url: `https://flip-cards-server.herokuapp.com/setcard/${id}`,
          data: payload,
          headers: { access_token }
        })
      })
      .then(({ data }) => {
        dispatch(loading(false))
        dispatch(fetchingSetCards());
        dispatch(newVal(data));
      })
      .catch((err) => {
        dispatch(loading(false))
        console.log(err);
        dispatch(sendError(err.response.data.errors));
      });
  };
};

export const deleteSetCard = (id) => {
  return (dispatch) => {
    dispatch(loading(true))
    getAccess()
    .then(access_token => {
      return axios({
        method: "DELETE",
        url: `https://flip-cards-server.herokuapp.com/setcard/${id}`,
        headers: { access_token }
      })
    })
      .then(({ data }) => {
        dispatch(loading(false))
        dispatch(fetchingSetCards());
      })
      .catch((err) => {
        dispatch(loading(false))
        console.log(err);
        dispatch(sendError(err.response.data.errors));
      });
  };
};
