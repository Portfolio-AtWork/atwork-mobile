// __tests__/auth/validateToken.test.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import { validateToken } from "../../../src/utils/auth";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

describe("validateToken", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("retorna false se não houver token", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const result = await validateToken();
    expect(result).toBe(false);
  });

  it("retorna false se o token estiver expirado", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("fake-token");
    (jwtDecode as jest.Mock).mockReturnValue({
      exp: Math.floor(Date.now() / 1000) - 10, // expirado
    });

    const result = await validateToken();
    expect(result).toBe(false);
  });

  it("retorna true se o token for válido e não expirado", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("fake-token");
    (jwtDecode as jest.Mock).mockReturnValue({
      exp: Math.floor(Date.now() / 1000) + 60, // válido por mais 60s
    });

    const result = await validateToken();
    expect(result).toBe(true);
  });

  it("retorna false em caso de erro inesperado", async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error("fail"));

    const result = await validateToken();
    expect(result).toBe(false);
  });
});
