import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useFormik } from "formik";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";

import { RootStackParamList } from "../../routes/types";
import api from "../../services/api";
import { TextField } from "../components/inputs/TextField";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const loginSchema = yup.object().shape({
  login: yup.string().required("Obrigatório"),
  password: yup.string().required("Obrigatório"),
});

export function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const loginData = {
          Login: values.login,
          Senha: values.password,
          TP_Login: "F",
        };

        const response = await api.post("/login/auth", loginData);

        await AsyncStorage.setItem("@App:token", response.data.token);
        await AsyncStorage.setItem("@App:nome", response.data.nome);

        api.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token}`;

        navigation.navigate("History");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            formik.setErrors({
              login: "Usuário ou senha inválidos",
              password: "Usuário ou senha inválidos",
            });
          } else {
            formik.setErrors({
              login: "Erro ao realizar login. Tente novamente.",
            });
          }
        }
      }
    },
  });

  return (
    <View className="flex-1 justify-center bg-white px-6">
      <View className="gap-y-6">
        <View className="gap-y-2">
          <Text className="text-3xl font-bold text-gray-900">Bem-vindo</Text>
          <Text className="text-gray-600">Faça login para continuar</Text>
        </View>

        <View className="gap-y-4">
          <View>
            <TextField
              value={formik.values.login}
              onChangeText={formik.handleChange("login")}
              placeholder="Seu Login"
              label="Login"
              error={formik.touched.login ? formik.errors.login : undefined}
              editable={!formik.isSubmitting}
            />
          </View>

          <View>
            <TextField
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              //onBlur={formik.handleBlur("password")}
              placeholder="Sua senha"
              label="Senha"
              secureTextEntry
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
              editable={!formik.isSubmitting}
            />
          </View>
        </View>

        <TouchableOpacity
          className={`rounded-lg py-4 ${
            formik.isSubmitting ? "bg-blue-400" : "bg-blue-600"
          }`}
          onPress={() => formik.handleSubmit()}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <View className="flex-row items-center justify-center gap-x-2">
              <ActivityIndicator color="white" />
              <Text className="text-center text-lg font-semibold text-white">
                Entrando...
              </Text>
            </View>
          ) : (
            <Text className="text-center text-lg font-semibold text-white">
              Entrar
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity disabled={formik.isSubmitting}>
          <Text className="text-center text-blue-600">Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
