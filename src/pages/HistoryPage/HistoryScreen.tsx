import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import api from "../../../services/api";
import { LancarJustificativaModal } from "./lancar-justificativa-modal/LancarJustificativaModal";
import { LancarPontoModal } from "./lancar-ponto-modal/LancarPontoModal";
import { PontosTable } from "./table/PontosTable";

interface Ponto {
  ID: string;
  DT_Ponto: Date;
  ST_Ponto: string;
}

export function HistoryScreen() {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalJustificativaVisible, SetIsModalJustificativaVisible] =
    useState(false);

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

  const handleLaunchPonto = () => {
    setIsModalVisible(true);
  };

  const handleLaunchJustificativa = () => {
    SetIsModalJustificativaVisible(true);
  };

  const handleConfirmDate = async (date: Date) => {
    try {
      const response = await api.post("Ponto/createPontoManual", {
        DT_Ponto: date.toISOString(),
      });

      if (response.status === 200 && response.data.ok) {
        searchPontos();
      }
    } catch (error) {
      console.error("Erro ao lançar ponto com data:", error);
    }
  };

  const handleConfirmJustificativa = async (
    justificatica: string,
    anexo?: string
  ) => {
    console.log(justificatica, anexo);
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

      <View className="flex-row mx-6 mb-6 space-x-4">
        <TouchableOpacity
          onPress={handleLaunchPonto}
          className="flex-1 rounded-lg bg-yellow-500 p-4"
        >
          <Text className="text-center text-base font-bold text-white">
            Lançar Ponto
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLaunchJustificativa}
          className="flex-1 rounded-lg bg-purple-500 p-4"
        >
          <Text className="text-center text-base font-bold text-white">
            Lançar Justificativa
          </Text>
        </TouchableOpacity>
      </View>

      <LancarPontoModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirmDate}
      />

      <LancarJustificativaModal
        visible={isModalJustificativaVisible}
        onConfirm={handleConfirmJustificativa}
        onClose={() => SetIsModalJustificativaVisible(false)}
      />
    </View>
  );
}
