export type RegionalBlocs = {
  regionalBlocs: [] | { acronym: string };
  acronym: string;
};

export interface Country {
  name: string;
  population: number;
  regionalBlocs?: RegionalBlocs[];
}
