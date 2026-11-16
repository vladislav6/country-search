import type { countries } from '../type/types';
import { HttpError } from './httpError.js';

async function searchCountries(query: string, signal: AbortSignal): Promise<countries[]> {
  const url = `https://countries.dev/name/${encodeURIComponent(query)}`;
  const response = await fetch(url, { signal });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  return response.json();
}

export default searchCountries;
