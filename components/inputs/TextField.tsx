import { Text, TextInput } from "react-native";

type TextFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
  onBlur?: () => void;
};

export const TextField = ({
  value,
  onChangeText,
  placeholder,
  label,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  error,
  onBlur,
}: TextFieldProps) => {
  return (
    <>
      <Text className="mb-1 text-sm font-medium text-gray-700">{label}</Text>
      <TextInput
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onBlur={onBlur}
      />
      {error && <Text className="text-red-500">{error}</Text>}
    </>
  );
};
