import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import api from "../../services/api";

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

  const handlePostPonto = async () => {
    try {
      const response = await api.post("Ponto", {});

      if (response.status === 200 && response.data.ok) {
        //
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 p-6">
        <Text className="text-2xl font-bold text-gray-900">Histórico</Text>
      </View>

      <TouchableOpacity
        onPress={handlePostPonto}
        className="mx-6 mb-6 rounded-lg bg-blue-500 p-4"
      >
        <Text className="text-center text-base font-bold text-white">
          Registrar Ponto
        </Text>
      </TouchableOpacity>
    </View>
  );
}
