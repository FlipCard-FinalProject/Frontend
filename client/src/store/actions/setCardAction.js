import axios from "axios";

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
    axios({
      method: "POST",
      url: "https://flip-cards-server.herokuapp.com/setcard",
      data: payload,
    })
      .then(({ data }) => {
        console.log("success add set card");
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
        dispatch(fetchingSuccess(data));
      })
      .catch((err) => {
        console.log(err);
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
        console.log("success update set card");
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
        console.log("success delete set card");
        dispatch(fetchingSetCards());
      })
      .catch((err) => {
        console.log(err);
        dispatch(sendError(err.response));
      });
  };
};
