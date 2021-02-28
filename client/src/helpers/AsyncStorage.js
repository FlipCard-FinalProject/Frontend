import AsyncStorage from "@react-native-async-storage/async-storage";

// helper untuk dapat access_token
export const getAccess = async () => {
  try {
    const value = await AsyncStorage.getItem("access_token");
    // console.log(value);
    return value;
  } catch (error) {
    // error reading value
    return error;
  }
};

// aturan pakai
/**
 * getAccess()
 *  .then(<data> => {
 *   axios()
 *  })
 *  .catch({})
 */
