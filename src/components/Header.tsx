import { ReactNode } from "react";
import { Text, View } from "react-native";

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

export function Header({ title, children }: HeaderProps) {
  return (
    <View className="flex flex-row justify-between">
      <Text className="text-2xl font-bold text-gray-900">{title}</Text>
      {children}
    </View>
  );
}
