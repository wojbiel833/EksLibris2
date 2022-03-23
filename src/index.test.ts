import {
  ifPopulationsHaveChanged,
  checkIfDataExpired,
  getCountriesEU,
  getCountriesWithoutA,
  sortCountriesByPopulation,
  sumTheBiggestCountries,
} from "./index";
import { Country, RegionalBlocs } from "./interfaces";

describe("populationsHaveChanged", () => {
  const unchangedPopulationOld: Country[] = [
    {
      name: "Spain",
      population: 10000000,
    },
  ];
  const unchangedPopulationNew: Country[] = [
    {
      name: "Spain",
      population: 10000000,
    },
  ];

  const changedPopulationOld: Country[] = [
    {
      name: "Ukraine",
      population: 10000000,
    },
  ];
  const changedPopulationNew: Country[] = [
    {
      name: "Ukraine",
      population: 100000,
    },
  ];

  test.each([
    [unchangedPopulationOld, unchangedPopulationNew, false],
    [changedPopulationOld, changedPopulationNew, true],
  ])(
    ".check populationsHaveChanged results",
    (oldPopulation, newPopulation, result) => {
      expect(ifPopulationsHaveChanged(oldPopulation, newPopulation)).toBe(
        result
      );
    }
  );
});

describe("checkIfDataExpired", () => {
  test.each([
    [100000000000000, new Date(), true],
    [100, new Date(), false],
  ])(".check checkIfDataExpired results", (timestamp, newDate, result) => {
    expect(checkIfDataExpired(timestamp, newDate)).toBe(result);
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const austria = {
  name: "Austria",
  population: 1,
  regionalBlocs: [{ acronym: "EU" }],
} as Country;
const poland = {
  name: "Poland",
  population: 100,
  regionalBlocs: [{ acronym: "EU" }],
} as Country;
const peru = {
  name: "Peru",
  population: 1000,
  regionalBlocs: [{ acronym: "SAARC" }],
} as Country;

describe("getCountriesEU", () => {
  it("returns right output with test data", () => {
    const countriesEU: Country[] = [austria, poland, peru];

    expect(getCountriesEU(countriesEU)).toEqual([
      {
        name: "Austria",
        population: 1,
        regionalBlocs: [{ acronym: "EU" }],
      },

      {
        name: "Poland",
        population: 100,
        regionalBlocs: [{ acronym: "EU" }],
      },
    ]);
  });
});
