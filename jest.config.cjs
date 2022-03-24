"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Sync object
const config = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    window: {},
  },
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(spec|test).ts"],
};
exports.default = config;
