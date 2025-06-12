import { Image as ImageIcon } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Justificativa {
  ID_Justificativa: string;
  Justificativa: string;
  ImagemJustificativa: string | null | undefined;
  ST_Justificativa: string;
  DT_Justificativa: Date;
  TemImagemJustificativa: boolean;
  ImagemContentType:
    | "image/jpeg"
    | "image/png"
    | "image/gif"
    | "image/bmp"
    | "image/webp"
    | "image/jpg"
    | undefined;
}

interface JustificativasTableProps {
  justificativas: Justificativa[];
}

function getStatusColor(status: string) {
  if (status === "A") return "bg-green-200";
  else if (status === "C") return "bg-red-200";
  else return "bg-yellow-200";
}

function formatDateOnly(date: Date) {
  try {
    const s = date.toString();
    const split = s.split(" ");
    return split[0];
  } catch {
    return date.toString();
  }
}

export function JustificativasTable({
  justificativas,
}: JustificativasTableProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(
    null
  );
  const [imagemSelecionadaContentType, setImagemSelecionadaContentType] =
    useState<string | undefined>();

  const abrirModal = (
    imagem: string | null | undefined,
    contentType: string | undefined
  ) => {
    if (imagem) {
      setImagemSelecionada(imagem);
      setImagemSelecionadaContentType(contentType);
      setModalVisible(true);
    }
  };

  return (
    <View>
      {/* Modal de visualização da imagem */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/70 justify-center items-center p-4">
          <View className="bg-white rounded-lg p-4 w-full max-w-md">
            {imagemSelecionada && (
              <Image
                source={{
                  uri: imagemSelecionada.startsWith("data:")
                    ? imagemSelecionada
                    : `data:${imagemSelecionadaContentType};base64,${imagemSelecionada}`,
                }}
                className="w-full h-80 rounded-md"
                resizeMode="contain"
              />
            )}
            <Pressable
              onPress={() => setModalVisible(false)}
              className="mt-4 bg-blue-500 py-2 px-4 rounded"
            >
              <Text className="text-white text-center">Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Cabeçalho */}
      <View className="flex-row bg-gray-100 p-3 rounded-t-lg">
        <Text className="flex-1 font-bold text-gray-700">Justificativa</Text>
        <Text className="w-28 font-bold text-gray-700">Data</Text>
        <Text className="w-20 font-bold text-gray-700">Imagem</Text>
      </View>

      {/* Tabela */}
      <ScrollView className="border-x border-b border-gray-200 rounded-b-lg">
        {justificativas.map((j, index) => (
          <View
            key={index}
            className={`flex-row p-3 border-t border-gray-200 ${getStatusColor(
              j.ST_Justificativa
            )}`}
          >
            <Text className="flex-1 text-gray-600" numberOfLines={1}>
              {j.Justificativa}
            </Text>
            <Text className="w-28 text-gray-600">
              {formatDateOnly(j.DT_Justificativa)}
            </Text>

            {j.TemImagemJustificativa ? (
              <TouchableOpacity
                className="w-20 items-center"
                onPress={() =>
                  abrirModal(j.ImagemJustificativa, j.ImagemContentType)
                }
              >
                <ImageIcon color="#4B5563" size={20} />
              </TouchableOpacity>
            ) : (
              <View className="w-20" />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
