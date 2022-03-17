import { populationsHaveChanged, checkIfDataExpired } from "./index";

interface Country {
  name: string;
  population: number;
}

describe("populationsHaveChanged", () => {
  it("should return right output if populations have changed or not", () => {
    const data1: Country[] = [
      {
        name: "Spain",
        population: 10000000,
      },
    ];
    const data2: Country[] = [
      {
        name: "Spain",
        population: 10000000,
      },
    ];

    const data3: Country[] = [
      {
        name: "Ukraine",
        population: 10000000,
      },
    ];
    const data4: Country[] = [
      {
        name: "Ukraine",
        population: 100000,
      },
    ];
    const unchangedPopulations = populationsHaveChanged(data1, data2);
    const changedPopulations = populationsHaveChanged(data3, data4);

    expect(unchangedPopulations).toBe(false);
    expect(changedPopulations).toBe(true);
  });
});

describe('"checkIfDataExpired', () => {
  it("return right output if data is expired", () => {
    expect(checkIfDataExpired(100000000000000, new Date())).toBe(true);
    expect(checkIfDataExpired(100, new Date())).toBe(false);
  });
});
