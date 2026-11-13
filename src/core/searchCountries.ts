import type { countries } from '../type/types';

async function searchCountries(query: string, signal: AbortSignal): Promise<countries[]> {
  const url = `https://countries.dev/name/${encodeURIComponent(query)}`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}

export default searchCountries;
