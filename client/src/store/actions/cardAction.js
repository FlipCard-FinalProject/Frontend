import axios from "axios";
import * as firebase from "firebase";

export const loadingStart = () => {
  return { type: "LOADING_CARDS_START" };
};

export const loadingEnd = () => {
  return { type: "LOADING_CARDS_END" };
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

export const fetchingCardBySetCardId = (set_card_id, access_token) => {
  return (dispatch) => {
    dispatch(loadingStart());
    axios({
      method: "GET",
      url: `https://flip-cards-server.herokuapp.com/cards/${set_card_id}`,
      headers: { access_token },
    })
      .then(({ data }) => {
        dispatch(fetchingSuccess(data));
        dispatch(loadingEnd());
      })
      .catch((err) => {
        // console.log(err);
        dispatch(sendError(err.response));
        dispatch(loadingEnd());
      });
  };
};

uploadImage = async (uri, imageName) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase
    .storage()
    .ref()
    .child("images/" + imageName);
  return ref.put(blob);
};

export const insertCard = (set_card_id, payload) => {
  return (dispatch) => {
    console.log(payload.type);
    if (payload.type === "text") {
      console.log("here bos");
      axios({
        method: "POST",
        url: `https://flip-cards-server.herokuapp.com/cards/${set_card_id}`,
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiIwZHpha3lhbHJAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IlJvdGkiLCJsYXN0X25hbWUiOiJCYWphciIsImlhdCI6MTYxMzkxNDY2OH0.K2KKKuRcFM5Mn3yfstbAIvUyvLyWnTnepjBNfGufoFk",
        },
        data: payload,
      })
        .then((res) => {
          console.log("success add card below this is the data");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    if (payload.type === "image") {
      let uri = payload.hint;
      let stringName = uri.split("/");
      let getNameImage = stringName[stringName.length - 1];
      uploadImage(payload.hint, getNameImage)
        .then((data) => {
          console.log(data);
          payload.hint = `https://firebasestorage.googleapis.com/v0/b/flip-cards-server.appspot.com/o/images%2F${getNameImage}?alt=media`;
          console.log("success");
          axios({
            method: "POST",
            url: `https://flip-cards-server.herokuapp.com/cards/${set_card_id}`,
            headers: {
              access_token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiIwZHpha3lhbHJAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IlJvdGkiLCJsYXN0X25hbWUiOiJCYWphciIsImlhdCI6MTYxMzkxNDY2OH0.K2KKKuRcFM5Mn3yfstbAIvUyvLyWnTnepjBNfGufoFk",
            },
            data: payload,
          })
            .then((res) => {
              console.log("success add card below this is the data");
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err.response);
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
