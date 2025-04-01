import { ScrollView, Text, View } from "react-native";

interface Ponto {
  ID: string;
  DT_Ponto: Date;
  ST_Ponto: string;
}

interface PontosTableProps {
  pontos: Ponto[];
}

function formatStatus(status: string) {
  if (status === "A") {
    return "Aprovado";
  }

  if (status === "C") {
    return "Cancelado";
  }

  return "Pendente";
}

function getStatusColor(status: string) {
  if (status === "A") return "bg-green-200";
  else if (status === "C") return "bg-red-200";
  else return "bg-yellow-200";
}

export function PontosTable({ pontos }: PontosTableProps) {
  return (
    <View>
      {/* Cabeçalho da Tabela */}
      <View className="flex-row bg-gray-100 p-3 rounded-t-lg">
        <Text className="flex-1 font-bold text-gray-700">Data/Hora</Text>
        <Text className="w-24 font-bold text-gray-700">Status</Text>
      </View>

      {/* Corpo da Tabela */}
      <ScrollView className="border-x border-b border-gray-200 rounded-b-lg">
        {pontos.map((ponto, index) => (
          <View
            key={index}
            className={`flex-row p-3 border-t border-gray-200 ${getStatusColor(ponto.ST_Ponto)}`}
          >
            <Text className="flex-1 text-gray-600">
              {new Date(ponto.DT_Ponto).toLocaleString()}
            </Text>
            <Text className="w-24 text-gray-600">
              {formatStatus(ponto.ST_Ponto)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
