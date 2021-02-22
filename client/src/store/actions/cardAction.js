import axios from 'axios'

export const loading = () => {
  return { type: 'LOADING_CARDS' }
}

export const fetchingSuccess = (payload) => {
  return { type: 'FETCHING_CARDS', payload }
}

export const sendError = (payload) => {
  return { type: 'ERROR_CARDS', payload }
}

export const newVal = (payload) => {
  return { type: 'NEW_VAL_CARD', payload }
}

export const fetchingCardBySetCardId = (set_card_id) => {
  return dispatch => {
    dispatch(loading())
    axios({
      method: 'GET',
      url: `http://localhost:3000/cards/${set_card_id}`
    })
      .then(({data}) => {
        dispatch(fetchingSuccess(data))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(sendError(err.response))
      })
  }
}

export const insertCard = ({ set_card_id, payload }) => {
  return dispatch => {
    axios({
      method: 'POST',
      url: `http://localhost:3000/cards/${set_card_id}`,
      data: payload
    })
      .then(({data}) => {
        console.log('success add card')
        dispatch({
          type: 'ADD_CARD',
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

export const updateCard = ({id, payload}) => {
  return dispatch => {
    axios({
      method: 'PUT',
      url: `http://localhost:3000/cards/${id}`,
      data: payload
    })
      .then(({data}) => {
        console.log('success update card')
        dispatch(fetchingCardBySetCardId())
        dispatch(newVal(data))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(sendError(err.response))
      })
  }
}

export const deleteCard = (id) => {
  return dispatch => {
    axios({
      method: 'DELETE',
      url: `http://localhost:3000/cards/${id}`
    })
      .then(({data}) => {
        console.log(data)
        dispatch(fetchingCardBySetCardId())
      })
      .catch(err => {
        console.log(err.response)
        dispatch(sendError(err.response))
      })
  }
}
