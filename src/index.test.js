"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("populationsHaveChanged", () => {
    it("should return right output if populations have changed or not", () => {
        const data1 = [
            {
                name: "Spain",
                population: 10000000,
            },
        ];
        const data2 = [
            {
                name: "Spain",
                population: 10000000,
            },
        ];
        const data3 = [
            {
                name: "Ukraine",
                population: 10000000,
            },
        ];
        const data4 = [
            {
                name: "Ukraine",
                population: 100000,
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
