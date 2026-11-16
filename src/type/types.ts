type languages = {
  name: string;
};

type flag = { png: string };

export type countries = {
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  languages: languages[];
  flags: flag;
};
