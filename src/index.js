"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumTheBiggestCountries = exports.sortCountriesByPopulation = exports.getCountriesWithoutA = exports.getCountriesEU = exports.ifPopulationsHaveChanged = exports.checkIfDataExpired = void 0;
const config_1 = require("../config");
const now = new Date();
let TP = [];
// Adding an date expiry object to localSorage under "fetchData"
const setDateWithExpiry = function (key, value, ttl) {
    const dateExpiry = {
        value: value,
        expiry: value.getTime() + ttl,
    };
    // Check if object is already there, if not add
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(dateExpiry));
    }
    else
        "";
    // console.log(`The local storage already has key "${key}" in use.`);
};
// 4) Przy starcie aplikacji sprawdź ile czasu minęło od poprzedniego ściągnięcia danych państw. Jeśli od ostatniego razu minęło co najmniej 7 dni, ściągnij i zapisz je ponownie.
const getAndCheckDateWithExpiry = function (key) {
    const itemString = localStorage.getItem(key);
    const dateExpiry = JSON.parse(itemString);
    return (0, exports.checkIfDataExpired)(dateExpiry.expiry, now);
};
const checkIfDataExpired = function (storageDateExpiryTimestamp, newDate) {
    const todaysTimestamp = newDate.getTime();
    if (storageDateExpiryTimestamp >= todaysTimestamp) {
        // console.log("Data is expired!");
        return true;
    }
    else {
        // console.log("Data doesn't exist or hasn't expired.");
        return false;
    }
};
exports.checkIfDataExpired = checkIfDataExpired;
// 5) Stwórz metodę, która przy ponownym ściąganiu danych państw porówna populację między starym i nowym zestawem danych oraz wyświetli wszystkie nazwy państw, których populacja uległa zmianie.
const ifPopulationsHaveChanged = function (oldData, newData) {
    if (!oldData)
        oldData = [];
    if (!newData)
        newData = [];
    // Fake population change
    // oldData[1].population = 20;
    // newData[100].population = 20000;
    let populationIsChanged = false;
    for (let i = 0; i < oldData.length; i++) {
        if (oldData[i].population !== newData[i].population) {
            console.log(oldData[i].name);
            populationIsChanged = true;
        }
    }
    if (populationIsChanged)
        return true;
    return false;
};
exports.ifPopulationsHaveChanged = ifPopulationsHaveChanged;
const saveDataInLocalStorage = function (data) {
    if (!localStorage.TP) {
        localStorage.setItem("TP", JSON.stringify(data));
    }
};
const fetchData = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(config_1.CONFIG.API_URL);
            TP = yield res.json();
            return TP;
        }
        catch (err) {
            console.log(err);
        }
    });
};
const checkLocalStorage = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Set new expiry date
            setDateWithExpiry(config_1.CONFIG.LOCAL_STORAGE_KEY, now, config_1.CONFIG.WEEK_TIMESTAMP);
            // Check if data expired
            const dataExpired = getAndCheckDateWithExpiry(config_1.CONFIG.LOCAL_STORAGE_KEY);
            // If data is expired -> fetchData and overwrite
            if (dataExpired) {
                const storageData = localStorage.getItem("TP");
                const oldData = JSON.parse(storageData);
                const newData = TP;
                if (newData) {
                    localStorage.setItem("TP", JSON.stringify(newData));
                    (0, exports.ifPopulationsHaveChanged)(oldData, newData);
                    JSON.parse(localStorage.getItem("TP"));
                }
                else {
                    // console.log("Fetch unsuccesful!");
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    });
};
const init = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 1) Ściągnij wszystkie możliwe dane państw z pomocą API: https://restcountries.com/v2/all. W dalszej części kursu będą one nazywane Tablicą Państw (TP).
            TP = yield fetchData();
            // 3) Przy starcie aplikacji sprawdź, czy dane państw istnieją w pamięci przeglądarki. Jeśli nie, ściągnij je,
            checkLocalStorage();
            // 2) Ściągnięte dane zapisz w sposób, który pozwoli na ich ponowne wykorzystanie po zamknięciu i ponownym otwarciu przeglądarki,
            saveDataInLocalStorage(TP);
        }
        catch (err) {
            console.log(err);
        }
    });
};
init();
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// Z Tablicy Państw z zadania 1 przefiltruj wszystkie należące do Unii Europejskiej.
const countriesLS = JSON.parse(localStorage.getItem("TP"));
const getCountriesEU = function (countries) {
    const countriesEU = [];
    if (countries) {
        countries.forEach((country) => {
            if (country !== undefined) {
                const blocs = country.regionalBlocs;
                if (blocs !== undefined) {
                    if (blocs.find((union) => union.acronym === "EU"))
                        countriesEU.push(country);
                }
            }
        });
    }
    return countriesEU;
};
exports.getCountriesEU = getCountriesEU;
const countriesEUOutput = (0, exports.getCountriesEU)(countriesLS);
console.log(countriesEUOutput);
// Z uzyskanej w ten sposób tablicy usuń wszystkie państwa posiadające w swojej nazwie literę a.
const getCountriesWithoutA = function (countries) {
    return countries.filter((country) => {
        if (country) {
            const name = country.name;
            return !name.includes("a");
        }
    });
};
exports.getCountriesWithoutA = getCountriesWithoutA;
const countriesWitroutA = (0, exports.getCountriesWithoutA)(countriesEUOutput);
// Z uzyskanej w ten sposób tablicy posortuj państwa według populacji, tak by najgęściej zaludnione znajdowały się na górze listy.
const sortCountriesByPopulation = function (countries) {
    return countries.sort((a, b) => b.population - a.population);
};
exports.sortCountriesByPopulation = sortCountriesByPopulation;
const sortedCountries = (0, exports.sortCountriesByPopulation)(countriesWitroutA);
// Zsumuj populację pięciu najgęściej zaludnionych państw i oblicz, czy jest większa od 500 milionów
const sumTheBiggestCountries = function (countries) {
    const fiveBiggestCountries = countries.slice(0, 5);
    const populations = fiveBiggestCountries.map((country) => country.population);
    const populationInSum = populations.reduce((pop, el) => (pop += el), 0);
    console.log(populationInSum > 500000000);
    return populationInSum > 500000000;
};
exports.sumTheBiggestCountries = sumTheBiggestCountries;
(0, exports.sumTheBiggestCountries)(sortedCountries);
