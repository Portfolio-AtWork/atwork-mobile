import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import { Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";

import { TextField } from "../components/inputs/TextField";
import { RootStackParamList } from "../routes/types";

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
    onSubmit: (values) => {
      const loginData = {
        Login: values.login,
        Senha: values.password,
        TP_Login: "F",
      };

      console.log("Login:", loginData);
      navigation.navigate("History");
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
            />
          </View>

          <View>
            <TextField
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              placeholder="Sua senha"
              label="Senha"
              secureTextEntry
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
            />
          </View>
        </View>

        <TouchableOpacity
          className="rounded-lg bg-blue-600 py-4"
          onPress={() => formik.handleSubmit()}
        >
          <Text className="text-center text-lg font-semibold text-white">
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-center text-blue-600">Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
