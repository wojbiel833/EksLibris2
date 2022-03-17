"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("populationsHaveChanged", () => {
    it("should return right output if populations have changed or not", () => {
        const data1 = [
            {
                name: "Spain",
                population: 10000000,
                regionalBlocs: [{ acronym: "SP" }],
            },
        ];
        const data2 = [
            {
                name: "Spain",
                population: 10000000,
                regionalBlocs: [{ acronym: "SP" }],
            },
        ];
        const data3 = [
            {
                name: "Ukraine",
                population: 10000000,
                regionalBlocs: [{ acronym: "UK" }],
            },
        ];
        const data4 = [
            {
                name: "Ukraine",
                population: 100000,
                regionalBlocs: [{ acronym: "UK" }],
            },
        ];
        const unchangedPopulations = (0, index_1.populationsHaveChanged)(data1, data2);
        const changedPopulations = (0, index_1.populationsHaveChanged)(data3, data4);
        expect(unchangedPopulations).toBe(false);
        expect(changedPopulations).toBe(true);
    });
});
describe('"checkIfDataExpired', () => {
    it("return right output if data is expired", () => {
        expect((0, index_1.checkIfDataExpired)(100000000000000, new Date())).toBe(true);
        expect((0, index_1.checkIfDataExpired)(100, new Date())).toBe(false);
    });
});
const countries = [
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
        console.log((0, index_1.getCountriesEU)(countries));
    });
});
