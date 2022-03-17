import { stringify } from "ts-jest";
import { WEEK_TIMESTAMP, API_URL, LOCAL_STORAGE_KEY } from "../config";

const now = new Date();

interface Country {
  name: string;
  regionalBlocs: [{ acronym: string }];
  population: number;
}

// Adding an date expiry object to localSorage under "fetchData"
const setDateWithExpiry = function (key: string, value: Date, ttl: number) {
  const dateExpiry = {
    value: value,
    expiry: value.getTime() + ttl,
  };

  // Check if object is already there, if not add
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(dateExpiry));
  }
  // else console.log(`The local storage already has key "${key}" in use.`);
};

export const checkIfDataExpired = function (
  storageDateExpiryTimestamp: number,
  newDate: Date
) {
  const todaysTimestamp = newDate.getTime();

  if (storageDateExpiryTimestamp >= todaysTimestamp) {
    // console.log("Data is expired!");
    return true;
  } else {
    // console.log("Data doesn't exist or hasn't expired.");
    return false;
  }
};

// 4) Przy starcie aplikacji sprawdź ile czasu minęło od poprzedniego ściągnięcia danych państw. Jeśli od ostatniego razu minęło co najmniej 7 dni, ściągnij i zapisz je ponownie.
export const getAndCheckDateWithExpiry = function (key: string) {
  const itemString = localStorage.getItem(key)!;
  const dateExpiry = JSON.parse(itemString);

  const checkedData = !checkIfDataExpired(dateExpiry.expiry, now);
  return checkedData;
};

// 5) Stwórz metodę, która przy ponownym ściąganiu danych państw porówna populację między starym i nowym zestawem danych oraz wyświetli wszystkie nazwy państw, których populacja uległa zmianie.
export const populationsHaveChanged = function (
  oldData: Country[],
  newData: Country[]
) {
  if (!oldData) oldData = [];
  if (!newData) newData = [];

  const oldPopulationsData: Country[] = [];
  const newPopulationsData: Country[] = [];

  oldData.forEach((country: Country) => {
    oldPopulationsData.push({
      name: country.name,
      regionalBlocs: country.regionalBlocs,
      population: country.population,
    });
  });

  newData.forEach((country: Country) => {
    newPopulationsData.push({
      name: country.name,
      regionalBlocs: country.regionalBlocs,
      population: country.population,
    });
  });

  // Fake population change
  // oldPopulationsData[1].population = 20;
  // newPopulationsData[100].population = 20000;

  let populationIsChanged = false;
  for (let i = 0; i < oldPopulationsData.length; i++) {
    if (oldPopulationsData[i].population !== newPopulationsData[i].population) {
      console.log(oldPopulationsData[i].name);
      populationIsChanged = true;
    }
  }

  if (populationIsChanged) return true;
  else return false;
};

// 1)
let TP: [] = [];
export const fetchData = async function () {
  try {
    const res = await fetch(API_URL);
    TP = await res.json();

    if (!localStorage.TP) {
      localStorage.setItem("TP", JSON.stringify(TP));
    }

    return TP;
  } catch (err) {
    console.log(err);
  }
};

export const checkLocalStorage = async function () {
  try {
    // Set new expiry date
    setDateWithExpiry(LOCAL_STORAGE_KEY, now, WEEK_TIMESTAMP);

    // Check if data expired
    const dataExpired = getAndCheckDateWithExpiry(LOCAL_STORAGE_KEY);

    // If data is expired -> fetchData and overwrite
    if (dataExpired) {
      // 1) Ściągnij wszystkie możliwe dane państw z pomocą API: https://restcountries.com/v2/all. W dalszej części kursu będą one nazywane Tablicą Państw (TP).
      const storageData = localStorage.getItem("TP")!;

      const oldData: [] = JSON.parse(storageData);
      const newData: any = await fetchData();

      // 2) Ściągnięte dane zapisz w sposób, który pozwoli na ich ponowne wykorzystanie po zamknięciu i ponownym otwarciu przeglądarki,
      if (newData) {
        localStorage.setItem("TP", JSON.stringify(newData));

        populationsHaveChanged(oldData, newData);

        return JSON.parse(localStorage.getItem("TP")!);
      } else {
        console.log("Fetch unsuccesful!");
        return "Fetch unsuccesful!";
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// 3) Przy starcie aplikacji sprawdź, czy dane państw istnieją w pamięci przeglądarki. Jeśli nie, ściągnij je,
fetchData();
checkLocalStorage();

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
const countries = JSON.parse(localStorage.getItem("TP")!);

export const getCountriesEU = function (countries: []) {
  const countriesEU: [] = [];

  if (countries !== null) {
    countries.forEach((country: Country) => {
      const countriesInUnions: [] = [];

      if (country.regionalBlocs) countriesInUnions.push(country.regionalBlocs);

      countriesInUnions.forEach((unions: Country[]) => {
        unions.filter((union: { acronym: string }) => {
          if (union.acronym === "EU") countriesEU.push(country);
        });
      });
    });
  }

  return countriesEU;
};
const countriesEU: [] = getCountriesEU(countries);
// console.log(countriesEU);

// Z uzyskanej w ten sposób tablicy usuń wszystkie państwa posiadające w swojej nazwie literę a.
const getCountriesWithoutA = function (countries: []) {
  const countriesWitroutA: [] = [];

  if (countries !== null) {
    countries.forEach((country: Country) => {
      const [...names] = country.name;

      if (!names.includes("a")) countriesWitroutA.push(country);
    });
  }

  return countriesWitroutA;
};
const countriesWitroutA: [] = getCountriesWithoutA(countriesEU);
// console.log(countriesWitroutA);

// Z uzyskanej w ten sposób tablicy posortuj państwa według populacji, tak by najgęściej zaludnione znajdowały się na górze listy.
const sortCountriesByPopulation = function (countries: []) {
  const sortedCountries = countries.sort(
    (a: { population: number }, b: { population: number }) =>
      b.population - a.population
  );

  return sortedCountries;
};

const sortedCountries = sortCountriesByPopulation(countriesWitroutA);
console.log(sortedCountries);

// Zsumuj populację pięciu najgęściej zaludnionych państw i oblicz, czy jest większa od 500 milionów
const sumTheBiggestCountries = function (countries: []) {
  const fiveBiggestCountries = countries.splice(0, 5);
  console.log(fiveBiggestCountries);
  const populations: [] = [];
  fiveBiggestCountries.forEach((country: { population: number }) => {
    populations.push(country.population);
  });

  const populationInSum = populations.reduce((pop, el) => (pop += el), 0);

  if (populationInSum > 500000000) {
    console.log(`${populationInSum} is greater than 500 mln.`);
    return true;
  } else {
    console.log(`${populationInSum} is smaller than 500 mln.`);
    return false;
  }
};

sumTheBiggestCountries(sortedCountries);
