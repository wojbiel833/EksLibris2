export type RegionalBlocs = {
  name: string;
  acronym: string;
};

export interface Country {
  name: string;
  population: number;
  regionalBlocs?: RegionalBlocs[];
}
