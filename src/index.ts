import { CONFIG } from "../config";
import { Country, CountryEU, RegionalBlocs } from "./interfaces";

const now = new Date();
let TP: [] | undefined = [];

// Adding an date expiry object to localSorage under "fetchData"
const setDateWithExpiry = function (key: string, value: Date, ttl: number) {
  const dateExpiry = {
    value: value,
    expiry: value.getTime() + ttl,
  };

  // Check if object is already there, if not add
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(dateExpiry));
  } else "";
  // console.log(`The local storage already has key "${key}" in use.`);
};

// 4) Przy starcie aplikacji sprawdź ile czasu minęło od poprzedniego ściągnięcia danych państw. Jeśli od ostatniego razu minęło co najmniej 7 dni, ściągnij i zapisz je ponownie.
const getAndCheckDateWithExpiry = function (key: string) {
  const itemString = localStorage.getItem(key)!;
  const dateExpiry = JSON.parse(itemString);

  return checkIfDataExpired(dateExpiry.expiry, now);
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

// 5) Stwórz metodę, która przy ponownym ściąganiu danych państw porówna populację między starym i nowym zestawem danych oraz wyświetli wszystkie nazwy państw, których populacja uległa zmianie.
export const ifPopulationsHaveChanged = function (
  oldData: Country[],
  newData: Country[]
) {
  if (!oldData) oldData = [];
  if (!newData) newData = [];

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

  if (populationIsChanged) return true;
  return false;
};

const saveDataInLocalStorage = function (data: [] | undefined) {
  if (!localStorage.TP) {
    localStorage.setItem("TP", JSON.stringify(data));
  }
};

const fetchData = async function () {
  try {
    const res = await fetch(CONFIG.API_URL);
    TP = await res.json();

    return TP;
  } catch (err) {
    console.log(err);
  }
};

const checkLocalStorage = async function () {
  try {
    // Set new expiry date
    setDateWithExpiry(CONFIG.LOCAL_STORAGE_KEY, now, CONFIG.WEEK_TIMESTAMP);

    // Check if data expired
    const dataExpired = getAndCheckDateWithExpiry(CONFIG.LOCAL_STORAGE_KEY);

    // If data is expired -> fetchData and overwrite
    if (dataExpired) {
      const storageData = localStorage.getItem("TP")!;

      const oldData: [] = JSON.parse(storageData);
      const newData: [] | undefined = TP;

      if (newData) {
        localStorage.setItem("TP", JSON.stringify(newData));

        ifPopulationsHaveChanged(oldData, newData);

        JSON.parse(localStorage.getItem("TP")!);
      } else {
        // console.log("Fetch unsuccesful!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const init = async function () {
  try {
    // 1) Ściągnij wszystkie możliwe dane państw z pomocą API: https://restcountries.com/v2/all. W dalszej części kursu będą one nazywane Tablicą Państw (TP).
    TP = await fetchData();
    // 3) Przy starcie aplikacji sprawdź, czy dane państw istnieją w pamięci przeglądarki. Jeśli nie, ściągnij je,
    checkLocalStorage();
    // 2) Ściągnięte dane zapisz w sposób, który pozwoli na ich ponowne wykorzystanie po zamknięciu i ponownym otwarciu przeglądarki,
    saveDataInLocalStorage(TP);
  } catch (err) {
    console.log(err);
  }
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
const countriesLS: Country[] = JSON.parse(localStorage.getItem("TP")!);

export const getCountriesEU = function (countries: Country[]) {
  const countriesEU = [] as Country[];

  if (countries !== null) {
    countries.forEach((country: CountryEU) => {
      const blocs = country.regionalBlocs as unknown as [];
      if (blocs?.find((union: RegionalBlocs) => union.acronym === "EU"))
        countriesEU.push(country);
    });
  }

  return countriesEU;
};
const countriesEU: Country[] = getCountriesEU(countriesLS);

// Z uzyskanej w ten sposób tablicy usuń wszystkie państwa posiadające w swojej nazwie literę a.
export const getCountriesWithoutA = function (countries: Country[]) {
  if (countries !== null) {
    const countriesWitroutA = countries.filter((country: Country) => {
      const name = country.name;
      if (!name) return console.log("No country name found.");

      return !name.includes("a");
    });
    return countriesWitroutA;
  }
};

const countriesWitroutA = getCountriesWithoutA(countriesEU) as Country[];

// Z uzyskanej w ten sposób tablicy posortuj państwa według populacji, tak by najgęściej zaludnione znajdowały się na górze listy.
export const sortCountriesByPopulation = function (countries: Country[]) {
  const sortedCountries: Country[] = countries.sort(
    (a: { population: number }, b: { population: number }) =>
      b.population - a.population
  );

  return sortedCountries;
};

const sortedCountries = sortCountriesByPopulation(countriesWitroutA);

// Zsumuj populację pięciu najgęściej zaludnionych państw i oblicz, czy jest większa od 500 milionów
export const sumTheBiggestCountries = function (countries: Country[]) {
  const fiveBiggestCountries = countries.slice(0, 5) as Country[];

  const populations: number[] = fiveBiggestCountries.map(
    (country) => country.population
  );

  // populations[1] = 100000000000000;
  // console.log("populations", populations);
  const populationInSum = populations.reduce((pop, el) => (pop += el), 0);

  console.log(populationInSum > 500000000);
  return populationInSum > 500000000;
};

sumTheBiggestCountries(sortedCountries);
