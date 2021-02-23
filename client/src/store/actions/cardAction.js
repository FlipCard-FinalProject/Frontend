import axios from 'axios'
import * as firebase from 'firebase'
import { getAccess } from '../../helpers/AsyncStorage'

export const clearCards = () => {
  return (dispatch) => {
    dispatch(fetchingSuccess(''));
  };

export const clearForm = () => {
  return dispatch => {
    dispatch({ type: 'CLEAR_FORM' })
    dispatch({ type: 'CLEAR_NEW_VAL_SET_CARD' })
  }
};

export const loading = () => {
  return { type: "LOADING_CARDS" };
};

export const fetchingSuccess = (payload) => {
  return { type: "FETCHING_CARDS", payload };
};

export const sendError = (payload) => {
  return { type: "ERROR_CARDS", payload };
};

export const newVal = (payload) => {
  return { type: "NEW_VAL_CARD", payload };
};

export const fetchingCardBySetCardId = (set_card_id ) => {
  return (dispatch) => {
    console.log(set_card_id);
    dispatch(loading());
    getAccess()
      .then(access_token => {
        return axios({
          method: "GET",
          url: `https://flip-cards-server.herokuapp.com/cards/${set_card_id}`,
          headers: { access_token }
        })
      })
      .then(({ data }) => {
        console.log(data);
        dispatch(fetchingSuccess(data));
      })
      .catch((err) => {
        // console.log(err);
        dispatch(sendError(err.response));
      });
  };
};

uploadImage = async (uri, imageName) => {
  const response = await fetch(uri)
  const blob = await response.blob()
  var ref = firebase.storage().ref().child("images/" + imageName)
  return ref.put(blob)
}
uploadSound = async (uri, soundName) => {
  const response = await fetch(uri)
  const blob = await response.blob()
  var ref = firebase.storage().ref().child("audio/" + soundName)
  return ref.put(blob)
}

export const insertCard = (set_card_id, payload) => {
  return dispatch => {
    console.log(payload.type);
    let access = ''
    if (payload.type === 'text') {
      console.log('here bos');
      getAccess()
        .then(access_token => {
          access = access_token
          return axios({
            method: 'POST',
            url: `https://flip-cards-server.herokuapp.com/cards/${set_card_id}`,
            headers: { access_token },
            data: payload
          })
        })
        .then(res => {
          console.log('success add card below this is the data')
          console.log(res.data);
          dispatch(fetchingCardBySetCardId(set_card_id, access))
        })
        .catch((err) => {
          console.log(err.response);
          // dispatch(sendError(err.response));
        });
    }
    if (payload.type === "image") {
      let uri = payload.hint;
      let stringName = uri.split("/");
      let getNameImage = stringName[stringName.length - 1];
      uploadImage(payload.hint, getNameImage)
        .then((data) => {
          console.log(data);
          payload.hint = `https://firebasestorage.googleapis.com/v0/b/flip-cards-server.appspot.com/o/images%2F${getNameImage}?alt=media`
          console.log('success');
          getAccess()
            .then(access_token => {
              return axios({
                method: 'POST',
                url: `https://flip-cards-server.herokuapp.com/cards/${set_card_id}`,
                headers: { access_token },
                data: payload
              })
            })
            .then(res => {
              console.log('success add card below this is the data')
              console.log(res.data);
              dispatch(fetchingCardBySetCardId(set_card_id, access))
            })
            .catch((err) => {
              console.log(err.response);
              // dispatch(sendError(err.response));
            });
        })
        .catch((error) => {
          console.log('error', error);
        })
      console.log('tembus sini');
    }
    if (payload.type === "sound") {
      let uri = payload.hint
      let stringName = uri.split("/");
      let getSoundName = stringName[stringName.length - 1]
      uploadSound(payload.hint, getSoundName)
        .then((data) => {
          console.log(data);
          payload.hint = `https://firebasestorage.googleapis.com/v0/b/flip-cards-server.appspot.com/o/audio%2F${getSoundName}?alt=media`
          console.log('success');
          getAccess()
            .then(access_token => {
              return axios({
                method: 'POST',
                url: `https://flip-cards-server.herokuapp.com/cards/${set_card_id}`,
                headers: { access_token },
                data: payload
              })
            })
            .then(res => {
              console.log('success add card below this is the data')
              console.log(res.data);
              dispatch(fetchingCardBySetCardId(set_card_id, access))
            })
            .catch((err) => {
              console.log(err.response);
              // dispatch(sendError(err.response));
            });
        })
        .catch((error) => {
          console.log("error", error);
        });
      console.log("tembus sini");
    }
  };
};

export const updateCard = ({ id, payload }) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: `https://flip-cards-server.herokuapp.com/${id}`,
      data: payload,
    })
      .then(({ data }) => {
        console.log("success update card");
        dispatch(fetchingCardBySetCardId());
        dispatch(newVal(data));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(sendError(err.response));
      });
  };
};

export const deleteCard = (id) => {
  return (dispatch) => {
    axios({
      method: "DELETE",
      url: `https://flip-cards-server.herokuapp.com/${id}`,
    })
      .then(({ data }) => {
        console.log(data);
        dispatch(fetchingCardBySetCardId());
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(sendError(err.response));
      });
  };
};
