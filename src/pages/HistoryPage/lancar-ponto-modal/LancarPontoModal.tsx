import { useEffect, useState } from "react";
import { Modal, Platform, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface LancarPontoModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
}

const maxDate = new Date();
const getFirstDayOfMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
};
const minDate = getFirstDayOfMonth();

export function LancarPontoModal({
  visible,
  onClose,
  onConfirm,
}: LancarPontoModalProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleConfirm = () => {
    onConfirm(selectedDate);
    onClose();
    hideDatePicker();
  };

  useEffect(() => {
    if (visible) {
      setSelectedDate(new Date());
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
          <Text className="text-xl font-bold mb-4">Lançar Ponto</Text>

          <TouchableOpacity
            onPress={showDatePicker}
            className="mb-4 rounded bg-gray-200 p-4"
            activeOpacity={0.7}
          >
            <Text className="text-center">
              {selectedDate.toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            maximumDate={maxDate}
            minimumDate={minDate}
            date={selectedDate}
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            is24Hour
            locale="pt_BR"
            display={Platform.OS === "ios" ? "spinner" : "default"}
          />

          <View className="flex-row justify-end space-x-4 mt-4">
            <TouchableOpacity
              onPress={onClose}
              className="rounded bg-red-500 px-4 py-2"
              activeOpacity={0.7}
            >
              <Text className="text-white font-bold">Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              className="rounded bg-green-500 px-4 py-2"
              activeOpacity={0.7}
            >
              <Text className="text-white font-bold">Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
