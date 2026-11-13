import type { countries } from '../type/types';

async function searchCountries(query: string, signal: AbortSignal): Promise<countries[]> {
  const url = `https://countries.dev/name/${encodeURIComponent(query)}`;
  await fetch(url, { signal });
  throw new Error('Not implemented');
}

export default searchCountries;
