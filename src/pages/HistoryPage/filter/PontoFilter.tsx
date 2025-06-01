import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Text, View } from "react-native";

interface PontoFilterProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const PontoFilter = ({
  selectedDate,
  setSelectedDate,
}: PontoFilterProps) => {
  return (
    <View className="mt-6">
      <Text className="mb-2 text-base font-semibold text-gray-700">
        Selecionar Data:
      </Text>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={(event, date) => {
          if (date) setSelectedDate(date);
        }}
      />
    </View>
  );
};
