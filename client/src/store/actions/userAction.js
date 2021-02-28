import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccess } from "../../helpers/AsyncStorage";

export const fetchingUser = (payload) => {
  return { type: "FETCHING_USER", payload };
};

export const fetchingProfile = (payload) => {
  return { type: "FETCHING_PROFILE", payload };
};

export const setNewVal = (payload) => {
  return { type: "NEW_VAL_USER", payload };
};

export const loading = (payload) => {
  return { type: "LOADING", payload };
};

export const sendError = (payload) => {
  return { type: "ERROR_USER", payload };
};

export const logout = (payload) => {
  return { type: "LOGOUT", payload };
};

export const register = (payload) => {
  return (dispatch) => {
    dispatch(loading(true))
    axios({
      method: "POST",
      url: "https://flip-cards-server.herokuapp.com/register",
      data: payload,
    })
      .then(({ data }) => {
        dispatch(loading(false))
        dispatch(setNewVal(data));
      })
      .catch((err) => {
        dispatch(loading(false))
        dispatch(sendError(err.response.data.errors));
      });
  };
};

export const login = (payload) => {
  return (dispatch) => {
    dispatch(loading(true))
    axios({
      method: "POST",
      url: "https://flip-cards-server.herokuapp.com/login",
      data: payload,
    })
      .then(({ data }) => {
        dispatch({
          type: "SET_ACCESS_TOKEN",
          payload: data.access_token,
        });
        dispatch(fetchingUser(data.payload));
        const access = ["access_token", data.access_token];
        const user = ["userid", `${data.payload.id}`];
        return AsyncStorage.multiSet([access, user]);
      })
      .then(() => {
        dispatch(loading(false))
        console.log("passed away, userAction: ln 69");
      })
      .catch((err) => {
        dispatch(loading(false))
        console.log(err.response.data.errors);
        dispatch(sendError(err.response.data.errors));
      });
  };
};

export const getUser = (id) => {
  return (dispatch) => {
    dispatch(loading(true))
    return axios({
      method: "GET",
      url: `https://flip-cards-server.herokuapp.com/user/${id}`,
    })
      .then(({ data }) => {
        dispatch(loading(false))
        dispatch(fetchingProfile(data));
      })
      .catch((err) => {
        dispatch(loading(false))
        console.log(err.response);
        dispatch(sendError(err.response));
      });
  };
};

export const updateUser = (id, payload) => {
  return (dispatch) => {
    dispatch(loading(true))
    getAccess()
      .then((access_token) => {
        return axios({
          method: "PUT",
          url: `https://flip-cards-server.herokuapp.com/user/${id}`,
          data: payload,
          headers: { access_token },
        });
      })
      .then(({ data }) => {
        dispatch(loading(false))
        dispatch(getUser(id));
      })
      .catch((err) => {
        dispatch(loading(false))
        console.log(err.response);
        dispatch(sendError(err.response));
      });
  };
};
