import axios from 'axios'
import * as firebase from 'firebase'
import { getAccess } from '../../helpers/AsyncStorage'

export const clearCards = () => {
  return (dispatch) => {
    dispatch(fetchingSuccess(''));
  };
}

export const clearForm = () => {
  return dispatch => {
    dispatch({ type: 'CLEAR_FORM' })
    dispatch({ type: 'CLEAR_NEW_VAL_SET_CARD' })
  }
};

export const loading = (payload) => {
  return { type: "LOADING", payload };
};

export const fetchingSuccess = (payload) => {
  console.log('in action otw fetch');
  return { type: "FETCHING_CARDS", payload };
};

export const sendError = (payload) => {
  return { type: "ERROR_CARDS", payload };
};

export const newVal = (payload) => {
  return { type: "NEW_VAL_CARD", payload };
};

export const fetchingCardBySetCardId = (set_card_id) => {
  console.log(set_card_id);
  console.log('in action hit fetch');
  return (dispatch) => {
    console.log(set_card_id);
    dispatch(loading(true));
    getAccess()
      .then(access_token => {
        return axios({
          method: "GET",
          url: `https://flip-cards-server.herokuapp.com/cards/${set_card_id}`,
          headers: { access_token }
        })
      })
      .then(({ data }) => {
        dispatch(loading(false));
        console.log('data berhasil didapatkan ');
        // console.log(data);
        dispatch(fetchingSuccess(data));
      })
      .catch((err) => {
        // console.log(err);
        // dispatch(error(false));
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
    dispatch(loading(true));
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
          .then(res => {
            dispatch(loading(false));
            console.log('success add card below this is the data')
            console.log(res.data);
            dispatch(fetchingCardBySetCardId(set_card_id, access))
          })
          .catch((err) => {
            dispatch(loading(false));
            console.log(err.response.data.errors);
            dispatch(sendError(err.response.data.errors));
          })
        })
        .catch((err) => {
          dispatch(loading(false));
          console.log(err.response);
          dispatch(sendError(err.response));
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
              dispatch(loading(false));
              console.log('success add card below this is the data')
              console.log(res.data);
              dispatch(fetchingCardBySetCardId(set_card_id, access))
            })
            .catch((err) => {
          dispatch(loading(false));
              console.log(err.response);
              dispatch(sendError(err.response));
            });
        })
        .catch((error) => {
          dispatch(sendError(["fail to upload"]))
          dispatch(loading(false));
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
              dispatch(loading(false));
              console.log('success add card below this is the data')
              console.log(res.data);
              dispatch(fetchingCardBySetCardId(set_card_id, access))
            })
            .catch((err) => {
              dispatch(loading(false));
              console.log(err.response);
              dispatch(sendError(err.response));
            });
        })
        .catch((error) => {
          dispatch(loading(false))
          dispatch(sendError(["fail to upload"]))
          console.log("error", error);
        });
      console.log("tembus sini");
    }
  };
};

export const updateCard = ( id, payload, setCardId ) => {
  return (dispatch) => {
    dispatch(loading(true))
    getAccess()
    .then(access_token => {
      return axios({
        method: "PUT",
        url: `https://flip-cards-server.herokuapp.com/cards/${id}`,
        data: payload,
        headers: { access_token }
      })
    })
      .then(({ data }) => {
        dispatch(loading(false))
        console.log("success update card");
        dispatch(fetchingCardBySetCardId(setCardId));
        dispatch(newVal(data));
      })
      .catch((err) => {
        dispatch(loading(false));
        console.log(err.response);
        dispatch(sendError(err.response));
      });
  };
};

export const deleteCard = (id, setCardId) => {
  return (dispatch) => {
    dispatch(loading(true))
    getAccess()
      .then(access_token => {
        return axios({
          method: "DELETE",
          url: `https://flip-cards-server.herokuapp.com/cards/${id}`,
          headers: { access_token }
        })
      })
      .then(({ data }) => {
        dispatch(loading(false))
        dispatch(fetchingCardBySetCardId(setCardId));
      })
      .catch((err) => {
        dispatch(loading(false))
        console.log(err.response);
        dispatch(sendError(err.response));
      });
  };
};
