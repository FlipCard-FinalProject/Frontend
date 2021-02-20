import axios from 'axios'

export const fetchingUser = (payload) => {
  return { type: 'FETCHING_USER', payload }
}

export const fetchingProfile = (payload) => {
  return { type: 'FETCHING_PROFILE', payload }
}

export const newVal = (payload) => {
  return { type: 'NEW_VAL_USER', payload }
}

export const loading = () => {
  return { type: 'LOADING_USER' }
}

export const sendError = (payload) => {
  return { type: 'ERROR_USER', payload }
}

export const register = (payload) => {
  return dispatch => {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/register',
      data: payload
    })
      .then(({data}) => {
        console.log('success register')
        dispatch(newVal(data))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(sendError(err.response))
      })
  }
}

export const login = (payload) => {
  return dispatch => {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/login',
      data: payload
    })
      .then(({data}) => { // data { accesstoken, payload }
        console.log('success login')
        dispatch({
          type: 'SET_ACCESS_TOKEN',
          payload: data.access_token
        })
        dispatch(fetchingUser(data.payload))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(sendError(err.response))
      })
  }
}

export const getUser = (id) => {
  return dispatch => {
    dispatch(loading())
    axios({
      method: 'GET',
      url: `http://localhost:3000/user/${id}`
    })
      .then(({data}) => {
        dispatch(fetchingProfile(data))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(sendError(err.response))
      })
  }
}
