import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { parseDateTimeLocalAsSaoPaulo } from "lib/dateFormatter";
import mime from "mime";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface LancarJustificativaModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (
    justificativa: string,
    anexo: string | null | undefined,
    dt_justificativa: Date
  ) => void;
}

export function LancarJustificativaModal({
  visible,
  onClose,
  onConfirm,
}: LancarJustificativaModalProps) {
  const [justificativa, setJustificativa] = useState("");
  const [anexo, setAnexo] = useState<{ name: string; uri: string } | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnexar = async () => {
    try {
      const mediaTypes: ImagePicker.MediaType = "images";

      // Usando ImagePicker para selecionar apenas imagens
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: [mediaTypes],
        allowsEditing: false,
        quality: 1,
        base64: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setAnexo({
          name: selectedImage.fileName || `image_${Date.now()}.jpg`,
          uri: selectedImage.uri,
        });
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível selecionar a imagem");
    }
  };

  const handleRemoverAnexo = () => {
    setAnexo(null);
  };

  const handleSubmit = async () => {
    if (!justificativa.trim()) {
      Alert.alert("Atenção", "Por favor, informe a justificativa");
      return;
    }

    setIsSubmitting(true);

    try {
      let anexoBase64 = undefined;

      if (anexo) {
        const fileContent = await FileSystem.readAsStringAsync(anexo.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const mimeType = mime.getType(anexo.uri) || "application/octet-stream";

        anexoBase64 = `data:${mimeType};base64,${fileContent}`;
      }

      const dt_justificativa = parseDateTimeLocalAsSaoPaulo(
        new Date().toISOString()
      );

      onConfirm(justificativa, anexoBase64, dt_justificativa);
      onClose();
    } catch (error) {
      console.log("Erro", "Ocorreu um erro ao processar a imagem", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (visible) {
      setAnexo(null);
      setJustificativa("");
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-11/12 rounded-lg bg-white p-6">
          <Text className="text-xl font-bold mb-4">Lançar Justificativa</Text>

          <Text className="text-sm font-medium mb-1">Justificativa *</Text>
          <TextInput
            className="border border-gray-300 rounded p-3 mb-4"
            multiline
            numberOfLines={4}
            placeholder="Descreva sua justificativa..."
            value={justificativa}
            onChangeText={setJustificativa}
          />

          <Text className="text-sm font-medium mb-1">
            Anexo (Opcional - Apenas imagens)
          </Text>

          {anexo ? (
            <View className="mb-4">
              <Image
                source={{ uri: anexo.uri }}
                className="w-full h-40 rounded mb-2"
                resizeMode="contain"
              />
              <View className="flex-row items-center justify-between">
                <Text className="text-blue-500 flex-1" numberOfLines={1}>
                  {anexo.name}
                </Text>
                <TouchableOpacity onPress={handleRemoverAnexo}>
                  <Text className="text-red-500 ml-2">Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleAnexar}
              className="border border-dashed border-gray-400 rounded p-3 mb-4 items-center"
            >
              <Text className="text-gray-500">
                Clique para selecionar uma imagem
              </Text>
            </TouchableOpacity>
          )}

          <View className="flex-row justify-end space-x-4 mt-4">
            <TouchableOpacity
              onPress={onClose}
              className="rounded bg-red-500 px-4 py-2"
              disabled={isSubmitting}
            >
              <Text className="text-white font-bold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              className="rounded bg-green-500 px-4 py-2"
              disabled={isSubmitting}
            >
              <Text className="text-white font-bold">
                {isSubmitting ? "Enviando..." : "Confirmar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
