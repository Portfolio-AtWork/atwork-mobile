import { cn } from "../../lib/cn";

describe("cn utility", () => {
  it("combina classes simples", () => {
    expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white");
  });

  it("ignora valores falsy", () => {
    expect(cn("p-4", null, undefined, false, "")).toBe("p-4");
  });

  it("resolve conflitos de Tailwind (twMerge)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4"); // tailwind-merge mantém o último
  });

  it("lida com objetos condicionais (clsx)", () => {
    expect(cn({ hidden: true, block: false })).toBe("hidden");
  });

  it("lida com arrays aninhados", () => {
    expect(cn(["text-sm", ["text-lg", false]])).toBe("text-lg");
  });
});
