import { ifPopulationsHaveChanged, checkIfDataExpired } from "./index";
import { Country } from "./interfaces";

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

describe('"checkIfDataExpired', () => {
  test.each([
    [100000000000000, new Date(), true],
    [100, new Date(), false],
  ])(".check checkIfDataExpired results", (timestamp, newDate, result) => {
    expect(checkIfDataExpired(timestamp, newDate)).toBe(result);
  });
});
