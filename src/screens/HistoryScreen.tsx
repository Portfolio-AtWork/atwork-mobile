import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function HistoryScreen() {
  const navigation = useNavigation();

  const handlePostRequest = async () => {
    try {
      const response = await fetch("SUA_URL_AQUI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // seus dados aqui
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      console.log("Sucesso:", data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{/* Seu conteúdo aqui */}</View>

      <TouchableOpacity style={styles.button} onPress={handlePostRequest}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
