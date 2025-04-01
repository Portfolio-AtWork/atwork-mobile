import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import api from "../../../services/api";
import { PontosTable } from "./table/PontosTable";

interface Ponto {
  ID: string;
  DT_Ponto: Date;
  ST_Ponto: string;
}

export function HistoryScreen() {
  const [pontos, setPontos] = useState<Ponto[]>([]);

  const searchPontos = useCallback(async () => {
    api.get("Ponto").then((response) => {
      if (response.status === 200 && response.data.ok) {
        setPontos(response.data.value);
      }
    });
  }, []);

  const handlePostPonto = async () => {
    try {
      const response = await api.post("Ponto", {});

      if (response.status === 200 && response.data.ok) {
        searchPontos();
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    searchPontos();
  }, [searchPontos]);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 p-6">
        <View>
          <Text className="text-2xl font-bold text-gray-900">Histórico</Text>
        </View>
        <View className="mt-10">
          <PontosTable pontos={pontos} />
        </View>
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
