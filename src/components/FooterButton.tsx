import { cn } from "lib/cn";
import { Text, TouchableOpacity } from "react-native";

interface FooterButtonProps {
  label: string;
  onPress: () => void;
  className?: string;
}

export const FooterButton = ({
  label,
  onPress,
  className,
}: FooterButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn("mx-6 mb-6 rounded-lg bg-blue-500 p-4", className)}
    >
      <Text className="text-center text-base font-bold text-white">
        {label}
      </Text>
    </TouchableOpacity>
  );
};
