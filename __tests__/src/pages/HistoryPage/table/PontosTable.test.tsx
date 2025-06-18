import { render } from "@testing-library/react-native";

import { PontosTable } from "../../../../../src/pages/HistoryPage/table/PontosTable";

describe("PontosTable", () => {
  const pontosMock = [
    {
      ID: "1",
      DT_Ponto: new Date("2023-06-01T08:30:00"),
      ST_Ponto: "A", // Aprovado
      TP_Ponto: "E", // Entrada
    },
    {
      ID: "2",
      DT_Ponto: new Date("2023-06-01T17:30:00"),
      ST_Ponto: "C", // Cancelado
      TP_Ponto: "S", // Saída
    },
    {
      ID: "3",
      DT_Ponto: new Date("2023-06-02T12:00:00"),
      ST_Ponto: "P", // Pendente
      TP_Ponto: "E", // Entrada
    },
  ];

  it("deve renderizar os pontos com tipo, data/hora e status corretamente", () => {
    const { getByText, getAllByText } = render(
      <PontosTable pontos={pontosMock} />
    );

    // Verifica tipo formatado
    const entradas = getAllByText("Entrada");
    expect(entradas.length).toBeGreaterThan(0);
    const saidas = getAllByText("Saída");
    expect(saidas.length).toBeGreaterThan(0);

    // Verifica data/hora formatada no padrão pt-BR
    expect(getByText("01/06/2023 08:30:00")).toBeTruthy();
    expect(getByText("01/06/2023 17:30:00")).toBeTruthy();
    expect(getByText("02/06/2023 12:00:00")).toBeTruthy();

    // Verifica status formatado
    expect(getByText("Aprovado")).toBeTruthy();
    expect(getByText("Cancelado")).toBeTruthy();
    expect(getByText("Pendente")).toBeTruthy();
  });
});
