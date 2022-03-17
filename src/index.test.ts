import {
  populationsHaveChanged,
  checkIfDataExpired,
  getCountriesEU,
} from "./index";

interface Country {
  name: string;
  regionalBlocs: [{ acronym: string }];
  population: number;
}

interface CountryEU {
  name: string;
  regionalBlocks: [{ acronym: string }];
  population: number;
}
describe("populationsHaveChanged", () => {
  it("should return right output if populations have changed or not", () => {
    const data1: Country[] = [
      {
        name: "Spain",
        population: 10000000,
        regionalBlocs: [{ acronym: "SP" }],
      },
    ];
    const data2: Country[] = [
      {
        name: "Spain",
        population: 10000000,
        regionalBlocs: [{ acronym: "SP" }],
      },
    ];

    const data3: Country[] = [
      {
        name: "Ukraine",
        population: 10000000,
        regionalBlocs: [{ acronym: "UK" }],
      },
    ];
    const data4: Country[] = [
      {
        name: "Ukraine",
        population: 100000,
        regionalBlocs: [{ acronym: "UK" }],
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

const countries: Country[] = [
  {
    name: "Poland",
    regionalBlocs: [{ acronym: "EU" }],
    population: 10000000000,
  },
  {
    name: "Tailand",
    regionalBlocs: [{ acronym: "TAI" }],
    population: 100000000000000,
  },
  {
    name: "USA",
    regionalBlocs: [{ acronym: "USA" }],
    population: 1000000000000,
  },
  {
    name: "Germany",
    regionalBlocs: [{ acronym: "EU" }],
    population: 15000000000,
  },
];

describe("getCountriesEU", () => {
  it("returns right output with right data type", () => {
    console.log(getCountriesEU(countries));
  });
});
