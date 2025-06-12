import { parseDateTimeLocalAsSaoPaulo } from "lib/dateFormatter";
import { Calendar1, NotebookPen } from "lucide-react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import api from "../../../services/api";
import { JustificativasFilter } from "./filter/JustificativaFilter";
import { PontoFilter } from "./filter/PontoFilter";
import { LancarJustificativaModal } from "./lancar-justificativa-modal/LancarJustificativaModal";
import { LancarPontoModal } from "./lancar-ponto-modal/LancarPontoModal";
import { JustificativasTable } from "./table/JustificativasTable";
import { PontosTable } from "./table/PontosTable";

import { FooterButton } from "~/components/FooterButton";
import { Header } from "~/components/Header";

interface Ponto {
  ID: string;
  DT_Ponto: Date;
  ST_Ponto: string;
  TP_Ponto: string;
}

interface Justificativa {
  ID_Justificativa: string;
  Justificativa: string;
  ImagemJustificativa: string | null | undefined;
  ST_Justificativa: string;
  DT_Justificativa: Date;
  TemImagemJustificativa: boolean;
  ImagemContentType:
    | "image/jpeg"
    | "image/png"
    | "image/gif"
    | "image/bmp"
    | "image/webp"
    | "image/jpg"
    | undefined;
}

const TABS = {
  PONTOS: "pontos",
  JUSTIFICATIVAS: "justificativas",
} as const;

export function HistoryScreen() {
  const [tab, setTab] = useState<string>(TABS.PONTOS);

  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [justificativas, setJustificativas] = useState<Justificativa[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalJustificativaVisible, setIsModalJustificativaVisible] =
    useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ano, setAno] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth() + 1);

  const fetchPontos = useCallback(async () => {
    try {
      const { data, status } = await api.get("Ponto", {
        params: { DT_Ponto: selectedDate },
      });

      if (status === 200 && data.ok) {
        setPontos(data.value);
      }
    } catch (error) {
      console.error("Erro ao buscar pontos:", error);
    }
  }, [selectedDate]);

  const fetchJustificativas = useCallback(async () => {
    try {
      const { data, status } = await api.get("Justificativa", {
        params: { Ano: ano, Mes: mes },
      });

      if (status === 200 && data.ok) {
        setJustificativas(data.value);
      }
    } catch (error) {
      console.error("Erro ao buscar justificativas:", error);
    }
  }, [ano, mes]);

  const registrarPonto = useCallback(async () => {
    try {
      const { data, status } = await api.post("Ponto", {});
      if (status === 200 && data.ok) fetchPontos();
    } catch (error) {
      console.error("Erro ao registrar ponto:", error);
    }
  }, [fetchPontos]);

  const confirmarLancamentoPonto = useCallback(
    async (date: Date) => {
      try {
        const dt_ponto = parseDateTimeLocalAsSaoPaulo(date.toISOString());

        const { data, status } = await api.post("Ponto/createPontoManual", {
          DT_Ponto: dt_ponto,
        });
        if (status === 200 && data.ok) fetchPontos();
      } catch (error) {
        console.error("Erro ao lançar ponto manual:", error);
      }
    },
    [fetchPontos]
  );

  const confirmarJustificativa = useCallback(
    async (
      justificativa: string,
      anexo: string | null | undefined,
      dt_justificativa: Date
    ) => {
      try {
        const { data, status } = await api.post("Justificativa", {
          Justificativa: justificativa,
          DT_Justificativa: dt_justificativa,
          ImagemJustificativa: anexo,
        });
        if (status === 200 && data.ok) fetchJustificativas();
      } catch (error) {
        console.error("Erro ao lançar ponto manual:", error);
      }
    },
    []
  );

  const alternarTab = () =>
    setTab((current) =>
      current === TABS.PONTOS ? TABS.JUSTIFICATIVAS : TABS.PONTOS
    );

  const renderConteudo = useMemo(() => {
    if (tab === TABS.PONTOS) {
      return (
        <View className="mt-10 gap-3">
          <PontoFilter
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <PontosTable pontos={pontos} />
        </View>
      );
    }

    return (
      <View className="mt-10 gap-3">
        <JustificativasFilter
          selectedMonth={mes}
          setSelectedMonth={setMes}
          selectedYear={ano}
          setSelectedYear={setAno}
        />
        <JustificativasTable justificativas={justificativas} />
      </View>
    );
  }, [tab, selectedDate, pontos, mes, ano, justificativas]);

  const renderBotoes = useMemo(() => {
    if (tab === TABS.PONTOS) {
      return (
        <>
          <FooterButton label="Registrar Ponto" onPress={registrarPonto} />
          <FooterButton
            label="Lançar Ponto Manual"
            onPress={() => setIsModalVisible(true)}
            className="bg-yellow-500"
          />
        </>
      );
    }

    return (
      <FooterButton
        label="Lançar Justificativa"
        onPress={() => setIsModalJustificativaVisible(true)}
        className="bg-purple-500"
      />
    );
  }, [tab, registrarPonto]);

  useEffect(() => {
    fetchPontos();
  }, [fetchPontos]);

  useEffect(() => {
    fetchJustificativas();
  }, [fetchJustificativas]);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 p-6">
        <Header title="Histórico">
          <TouchableOpacity onPress={alternarTab}>
            {tab === TABS.PONTOS ? <Calendar1 /> : <NotebookPen />}
          </TouchableOpacity>
        </Header>

        {renderConteudo}
      </View>

      {renderBotoes}

      <LancarPontoModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={confirmarLancamentoPonto}
      />

      <LancarJustificativaModal
        visible={isModalJustificativaVisible}
        onClose={() => setIsModalJustificativaVisible(false)}
        onConfirm={confirmarJustificativa}
      />
    </View>
  );
}
