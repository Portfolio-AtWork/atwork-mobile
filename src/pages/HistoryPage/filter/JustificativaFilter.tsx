import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

interface JustificativasFilterProps {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
}

const years = Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i);
const months = [
  { label: "Janeiro", value: 1 },
  { label: "Fevereiro", value: 2 },
  { label: "Março", value: 3 },
  { label: "Abril", value: 4 },
  { label: "Maio", value: 5 },
  { label: "Junho", value: 6 },
  { label: "Julho", value: 7 },
  { label: "Agosto", value: 8 },
  { label: "Setembro", value: 9 },
  { label: "Outubro", value: 10 },
  { label: "Novembro", value: 11 },
  { label: "Dezembro", value: 12 },
];

export const JustificativasFilter = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
}: JustificativasFilterProps) => {
  return (
    <View className="mt-6 space-y-4">
      {/* Select de Ano */}
      <View>
        <Text className="mb-2 text-base font-semibold text-gray-700">
          Selecionar Ano:
        </Text>
        <View className="rounded-md border border-gray-300 bg-white p-3">
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
          >
            {years.map((year) => (
              <Picker.Item key={year} label={year.toString()} value={year} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Select de Mês */}
      <View>
        <Text className="mb-2 text-base font-semibold text-gray-700">
          Selecionar Mês:
        </Text>
        <View className="rounded-md border border-gray-300 bg-white p-3">
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            {months.map((month) => (
              <Picker.Item
                key={month.value}
                label={month.label}
                value={month.value}
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};
