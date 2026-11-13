import { describe, it, expect, vi, afterEach } from 'vitest';
import searchCountries from '../core/searchCountries';
import type { countries } from '../type/types';

describe('searchCountries', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockCountries: countries[] = [
    {
      name: 'Poland',
      capital: 'Warsaw',
      region: 'Europe',
      subregion: 'Central Europe',
      population: 37950802,
      languages: [{ name: 'Polish' }],
      flags: { png: 'https://flagcdn.com/w320/pl.png' },
    },
    {
      name: 'China',
      flags: { png: 'https://flagcdn.com/w320/cn.png' },
      region: 'Asia',
      capital: 'Beijing',
      languages: [{ name: 'Chinese' }],
      subregion: 'Eastern Asia',
      population: 1402112000,
    },
  ];

  it('should return an array of countries', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockCountries),
    } as unknown as Response);

    const controller = new AbortController();

    const result = await searchCountries('Poland', controller.signal);

    expect(result).toEqual(mockCountries);
  });

  it('should encode the search query in URL', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockCountries),
    } as unknown as Response);

    const controller = new AbortController();

    await searchCountries('United States', controller.signal);

    expect(fetchSpy).toHaveBeenCalledWith('https://countries.dev/name/United%20States', {
      signal: controller.signal,
    });
  });

  it('should pass AbortSignal to fetch', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockCountries),
    } as unknown as Response);

    const controller = new AbortController();

    await searchCountries('Poland', controller.signal);

    expect(fetchSpy).toHaveBeenCalledWith(expect.any(String), { signal: controller.signal });
  });

  it('should throw an error when response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    const controller = new AbortController();

    await expect(searchCountries('Unknown', controller.signal)).rejects.toThrow('HTTP error: 404');
  });

  it('should reject when fetch fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new TypeError('Failed to fetch'));

    const controller = new AbortController();

    await expect(searchCountries('Poland', controller.signal)).rejects.toThrow('Failed to fetch');
  });
});
