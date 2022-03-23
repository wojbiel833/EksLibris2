export type RegionalBlocs = {
  regionalBlocs: [] | { acronym: string };
  acronym: string;
};

export interface Country {
  name: string;
  population: number;
}

export interface CountryEU extends Country {
  regionalBlocs?: RegionalBlocs;
}
