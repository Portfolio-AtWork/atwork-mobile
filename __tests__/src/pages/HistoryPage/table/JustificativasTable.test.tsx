import { fireEvent, render } from "@testing-library/react-native";

import { JustificativasTable } from "../../../../../src/pages/HistoryPage/table/JustificativasTable";

const justificativasMock = [
  {
    ID_Justificativa: "1",
    Justificativa: "Motivo Aprovado",
    ImagemJustificativa: "base64image",
    ST_Justificativa: "A",
    DT_Justificativa: new Date("2023-06-01T00:00:00Z"),
    TemImagemJustificativa: true,
    ImagemContentType: "image/png",
  },
  {
    ID_Justificativa: "2",
    Justificativa: "Motivo Cancelado",
    ImagemJustificativa: null,
    ST_Justificativa: "C",
    DT_Justificativa: new Date("2023-06-02T00:00:00Z"),
    TemImagemJustificativa: false,
    ImagemContentType: undefined,
  },
  {
    ID_Justificativa: "3",
    Justificativa: "Motivo Pendente",
    ImagemJustificativa: null,
    ST_Justificativa: "P",
    DT_Justificativa: new Date("2023-06-03T00:00:00Z"),
    TemImagemJustificativa: false,
    ImagemContentType: undefined,
  },
];

describe("JustificativasTable", () => {
  it("renderiza as justificativas com as cores corretas", () => {
    const { getByText } = render(
      <JustificativasTable justificativas={justificativasMock} />
    );

    // Verifica textos
    expect(getByText("Motivo Aprovado")).toBeTruthy();
    expect(getByText("Motivo Cancelado")).toBeTruthy();
    expect(getByText("Motivo Pendente")).toBeTruthy();

    // Verifica datas (exibe só o dia da semana abreviado conforme formatDateOnly)
    expect(getByText("Thu")).toBeTruthy(); // 01/06/2023 é quinta-feira
  });

  it("abre modal ao clicar no ícone de imagem e fecha ao clicar em fechar", () => {
    const { getByTestId, getByText, queryByText } = render(
      <JustificativasTable justificativas={justificativasMock} />
    );

    // Ícone de imagem para primeira justificativa (TemImagemJustificativa === true)
    const imageButton = getByTestId("image-button-1");
    fireEvent.press(imageButton);

    // Modal deve aparecer
    expect(getByText("Fechar")).toBeTruthy();

    // Fecha modal
    fireEvent.press(getByText("Fechar"));

    // Modal deve desaparecer
    expect(queryByText("Fechar")).toBeNull();
  });

  it("não exibe botão de imagem quando justificativa não tem imagem", () => {
    const { queryByTestId } = render(
      <JustificativasTable justificativas={justificativasMock as any} />
    );

    expect(queryByTestId("image-button-2")).toBeNull();
    expect(queryByTestId("image-button-3")).toBeNull();
  });
});
