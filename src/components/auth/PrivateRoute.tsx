import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ReactNode, useEffect } from "react";

import { validateToken } from "~/utils/auth";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!navigation) return;

    validateToken().then((response) => {
      console.log("validando token jwt -> ", response);
      if (!response) {
        AsyncStorage.removeItem("@App:token");
        navigation.navigate("Login" as never);
      }
    });
  }, [navigation]);

  return children;
};
