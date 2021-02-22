import axios from 'axios'
import { getAccess } from '../../helpers/AsyncStorage'

export const loading = () => {
  return { type: 'LOADING_SET_CARDS' }
}

export const fetchingSuccess = (payload) => {
  return { type: 'FETCHING_SET_CARDS', payload }
}

export const sendError = (payload) => {
  return { type: 'ERROR_SET_CARDS', payload }
}

export const newVal = (payload) => {
  return { type: 'NEW_VAL_SET_CARD', payload }
}

export const fetchingSetCards = () => {
  return dispatch => {
    dispatch(loading())
    axios({
      method: 'GET',
      url: 'http://localhost:3000/setcard'
    })
      .then(({ data }) => {
        dispatch(fetchingSuccess(data))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(sendError(err.response))
      })
  }
}

export const insertSetCard = (payload) => {
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
        dispatch({
          type: 'ADD_SET_CARD',
          payload: data
        })
        dispatch(newVal(data))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(sendError(err.response))
      })
  }
}

export const findSetCardByTitle = (query) => {
  return dispatch => {
    dispatch(loading())
    axios({
      method: 'GET',
      url: `http://localhost:3000/setcard/${query}`
    })
      .then(({ data }) => {
        dispatch(fetchingSuccess(data))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(sendError(err.response))
      })
  }
}

export const updateSetCard = ({ id, payload }) => {
  return dispatch => {
    axios({
      method: 'PUT',
      url: `http://localhost:3000/setcard/${id}`,
      data: payload
    })
      .then(({ data }) => {
        console.log('success update set card')
        dispatch(fetchingSetCards())
        dispatch(newVal(data))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(sendError(err.response))
      })
  }
}

export const deleteSetCard = (id) => {
  return dispatch => {
    axios({
      method: 'DELETE',
      url: `http://localhost:3000/setcard/${id}`
    })
      .then(({ data }) => {
        console.log('success delete set card')
        dispatch(fetchingSetCards())
      })
      .catch(err => {
        console.log(err.response)
        dispatch(sendError(err.response))
      })
  }
}
