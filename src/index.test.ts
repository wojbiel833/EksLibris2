import {
  ifPopulationsHaveChanged,
  checkIfDataExpired,
  getCountriesEU,
  getCountriesWithoutA,
  sortCountriesByPopulation,
  sumTheBiggestCountries,
} from "./index";
import { Country, CountryEU } from "./interfaces";

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
  population: 90000000000000,
  regionalBlocs: [{ acronym: "SAARC" }],
} as Country;

const countries: Country[] = [austria, peru, poland];
const fake5SmallerCountries: Country[] = [
  austria,
  poland,
  poland,
  austria,
  poland,
];
const fake5BiggerCountries: Country[] = [austria, peru, poland, peru, poland];

describe("getCountriesEU", () => {
  it("returns right output with test data", () => {
    expect(getCountriesEU(countries)).toEqual([austria, poland]);
  });
});

describe("getCountriesWithoutA", () => {
  it("returns right output with test data", () => {
    expect(getCountriesWithoutA(countries)).toEqual([peru]);
  });
});

describe("sortCountriesByPopulation", () => {
  it("returns right output with test data", () => {
    console.log(sortCountriesByPopulation(countries));
    expect(sortCountriesByPopulation(countries)).toEqual([
      peru,
      poland,
      austria,
    ]);
  });
});

describe("sumTheBiggestCountries", () => {
  it("returns right output with test data", () => {
    test.each([
      countries,
      "You forgot about 2 countries.",
      [fake5BiggerCountries, true],
      [fake5SmallerCountries, false],
    ])(
      ".sumTheBiggestCountries",
      (countries: Country[], result: string | boolean): string | boolean => {
        expect(sumTheBiggestCountries(countries)).toBe(result);
      }
    );
  });
});
