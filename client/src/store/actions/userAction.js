import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAccess } from '../../helpers/AsyncStorage'

export const fetchingUser = (payload) => {
  return { type: "FETCHING_USER", payload };
};

export const fetchingProfile = (payload) => {
  return { type: "FETCHING_PROFILE", payload };
};

export const newVal = (payload) => {
  return { type: "NEW_VAL_USER", payload };
};

export const loadingStart = () => {
  return { type: "LOADING_USER_START" };
};

export const loadingEnd = () => {
  return { type: "LOADING_USER_END" };
};

export const sendError = (payload) => {
  return { type: "ERROR_USER", payload };
};

export const logout = (payload) => {
  return { type: "LOGOUT", payload };
};

export const register = (payload) => {
  return (dispatch) => {
    dispatch(loadingStart());
    axios({
      method: "POST",
      url: "https://flip-cards-server.herokuapp.com/register",
      data: payload,
    })
      .then(({ data }) => {
        dispatch(newVal(data));
        dispatch(sendError([]));
        dispatch(loadingEnd());
      })
      .catch((err) => {
        dispatch(sendError(err.response.data.errors));
        dispatch(loadingEnd());
      });
  };
};

export const login = (payload) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: "https://flip-cards-server.herokuapp.com/login",
      data: payload,
    })
      .then(({ data }) => {
        // console.log(data.access_token, 'access_token')
        dispatch({
          type: "SET_ACCESS_TOKEN",
          payload: data.access_token,
        });
        dispatch(fetchingUser(data.payload))
        const access = ['access_token', data.access_token]
        const user = ['userid', `${data.payload.id}`]
        return AsyncStorage.multiSet([access, user])
      })
      .then(() => {
        console.log('passed away, userAction: ln 69')
      })
      .catch((err) => {
        console.log(err.response.data.errors)
        dispatch(sendError(err.response.data.errors))
      });
  };
};

export const getUser = (id) => {
  console.log('masuk get user')
  return (dispatch) => {
      return axios({
        method: "GET",
        url: `https://flip-cards-server.herokuapp.com/user/${id}`,
      })
      .then(({ data }) => {
        dispatch(fetchingProfile(data));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(sendError(err.response));
      });
  };
};

export const updateUser = (id, payload) => {
  return (dispatch) => {
    getAccess()
      .then(access_token => {
        return axios({
          method: "PUT",
          url: `https://flip-cards-server.herokuapp.com/user/${id}`,
          data: payload,
          headers: {access_token}
        })
      })
      .then(({ data }) => {
        console.log(data, 'hasil update')
        dispatch(getUser(id));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(sendError(err.response));
      });
  };
};
