import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Text, View } from "react-native";

import { validateToken } from "~/utils/auth";

export function HistoryScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    if (!navigation) return;

    validateToken().then((response) => {
      if (!response) {
        AsyncStorage.removeItem("@App:token");
        navigation.navigate("Login" as never);
      }
    });
  }, [navigation]);

  return (
    <View className="flex-1 justify-center bg-white p-6">
      <Text className="text-2xl font-bold text-gray-900">Histórico</Text>
    </View>
  );
}
