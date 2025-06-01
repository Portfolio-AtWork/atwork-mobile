import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

interface PontoFilterProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const PontoFilter = ({
  selectedDate,
  setSelectedDate,
}: PontoFilterProps) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleChange = (event: any, date?: Date) => {
    setIsPickerVisible(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <View className="mt-6">
      <Text className="mb-2 text-base font-semibold text-gray-700">
        Selecionar Data:
      </Text>

      <TouchableOpacity
        onPress={() => setIsPickerVisible(true)}
        className="rounded-md border border-gray-300 bg-white px-4 py-3"
      >
        <Text className="text-gray-800">
          {selectedDate.toLocaleDateString("pt-BR")}
        </Text>
      </TouchableOpacity>

      {isPickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
        />
      )}
    </View>
  );
};
