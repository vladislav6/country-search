import { describe, expect, it } from 'vitest';
import { mockCountries } from './searchCountries.test';
import mapCountryResponse from '../core/mapCountryResponse';

const rawCountry = mockCountries[0];

describe('mapCountryResponse', () => {
  it('should correctly map all country fields', () => {
    const result = mapCountryResponse(rawCountry);

    expect(result).toEqual({
      name: 'Poland',
      capital: 'Warsaw',
      region: 'Europe',
      subregion: 'Central Europe',
      population: 37950802,
      languages: [{ name: 'Polish' }],
      flags: { png: 'https://flagcdn.com/w320/pl.png' },
    });
  });

  it('should correctly map multiple languages', () => {
    const raw = {
      ...rawCountry,
      languages: [
        {
          name: 'English',
        },
        {
          name: 'French',
        },
      ],
    };

    const result = mapCountryResponse(raw);

    expect(result.languages).toEqual([{ name: 'English' }, { name: 'French' }]);
  });

  it('should not modify the original object', () => {
    const raw = structuredClone(rawCountry);

    mapCountryResponse(raw);

    expect(raw).toEqual(rawCountry);
  });
});
