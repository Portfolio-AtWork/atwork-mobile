// JustificativasFilter.test.tsx
import { fireEvent, render } from "@testing-library/react-native";

import { JustificativasFilter } from "../../../../../src/pages/HistoryPage/filter/JustificativaFilter";

describe("JustificativasFilter", () => {
  it("renders pickers and handles selection changes", () => {
    const setSelectedYear = jest.fn();
    const setSelectedMonth = jest.fn();

    const { getByTestId } = render(
      <JustificativasFilter
        selectedYear={2024}
        setSelectedYear={setSelectedYear}
        selectedMonth={6}
        setSelectedMonth={setSelectedMonth}
      />
    );

    const yearPicker = getByTestId("year-picker");
    const monthPicker = getByTestId("month-picker");

    fireEvent(yearPicker, "valueChange", 2023);
    expect(setSelectedYear).toHaveBeenCalledWith(2023);

    fireEvent(monthPicker, "valueChange", 5);
    expect(setSelectedMonth).toHaveBeenCalledWith(5);
  });
});
