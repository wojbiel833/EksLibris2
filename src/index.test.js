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
    population: 1000,
    regionalBlocs: [{ acronym: "SAARC" }],
};
describe("getCountriesEU", () => {
    it("returns right output with test data", () => {
        const countriesEU = [austria, poland, peru];
        expect((0, index_1.getCountriesEU)(countriesEU)).toEqual([
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
