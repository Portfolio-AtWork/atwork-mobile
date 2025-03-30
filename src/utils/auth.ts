import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const validateToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@App:token");

    if (!token) {
      return false;
    }

    const decodedToken = jwtDecode(token);

    if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
