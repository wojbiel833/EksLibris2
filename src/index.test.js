"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("populationsHaveChanged", () => {
    const unchangedPopulationOld = [
        {
            name: "Spain",
            population: 10000000,
        },
    ];
    const unchangedPopulationNew = [
        {
            name: "Spain",
            population: 10000000,
        },
    ];
    const changedPopulationOld = [
        {
            name: "Ukraine",
            population: 10000000,
        },
    ];
    const changedPopulationNew = [
        {
            name: "Ukraine",
            population: 100000,
        },
    ];
    test.each([
        [unchangedPopulationOld, unchangedPopulationNew, false],
        [changedPopulationOld, changedPopulationNew, true],
    ])(".check populationsHaveChanged results", (oldPopulation, newPopulation, result) => {
        expect((0, index_1.ifPopulationsHaveChanged)(oldPopulation, newPopulation)).toBe(result);
    });
});
describe("checkIfDataExpired", () => {
    test.each([
        [100000000000000, new Date(), true],
        [100, new Date(), false],
    ])(".check checkIfDataExpired results", (timestamp, newDate, result) => {
        expect((0, index_1.checkIfDataExpired)(timestamp, newDate)).toBe(result);
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const austria = {
    name: "Austria",
    population: 1,
    regionalBlocs: [{ acronym: "EU" }],
};
const poland = {
    name: "Poland",
    population: 100,
    regionalBlocs: [{ acronym: "EU" }],
};
const peru = {
    name: "Peru",
    population: 90000000000000,
    regionalBlocs: [{ acronym: "SAARC" }],
};
const countries = [austria, peru, poland];
const fake5SmallerCountries = [
    austria,
    poland,
    poland,
    austria,
    poland,
];
const fake5BiggerCountries = [austria, peru, poland, peru, poland];
describe("getCountriesEU", () => {
    it("returns the countries that are in EU", () => {
        expect((0, index_1.getCountriesEU)(countries)).toEqual([austria, poland]);
    });
});
describe("getCountriesWithoutA", () => {
    it("returns the countries which don't have 'a' in the name", () => {
        expect((0, index_1.getCountriesWithoutA)(countries)).toEqual([peru]);
    });
});
describe("sortCountriesByPopulation", () => {
    it("returns the countries by populations in descending order", () => {
        console.log((0, index_1.sortCountriesByPopulation)(countries));
        expect((0, index_1.sortCountriesByPopulation)(countries)).toEqual([
            peru,
            poland,
            austria,
        ]);
    });
});
describe("sumTheBiggestCountries", () => {
    test.each([
        [fake5BiggerCountries, true],
        [fake5SmallerCountries, false],
    ])(".sumTheBiggestCountries returns true/false with different data", (countriesArray, result) => {
        expect((0, index_1.sumTheBiggestCountries)(countriesArray)).toBe(result);
    });
});
