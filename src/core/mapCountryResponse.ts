import type { countries } from '../type/types';

function mapCountryResponse(raw: countries): countries {
  return {
    name: raw.name,
    capital: raw.capital,
    region: raw.region,
    subregion: raw.subregion,
    population: raw.population,
    languages: raw.languages,
    flags: raw.flags,
  };
}

export default mapCountryResponse;
