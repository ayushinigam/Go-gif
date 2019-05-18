import { callGiphyAPI } from './api.utils';
import { APIKEY, GIF_LIMIT, BASE_URL } from '../constants';

describe('callGiphyAPI', () => {
  const mockApiSuccessResponse = { test: 'data' };

  beforeEach(() => {
    const mockJsonPromise = Promise.resolve(mockApiSuccessResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  it('should call the gif api based on the given path', (done) => {
    const searchUrl = `${BASE_URL}search?q=test&api_key=${APIKEY}&limit=${GIF_LIMIT}&offset=${(10 * GIF_LIMIT)}`;
    callGiphyAPI('search?q=test&', 10).then((value) => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(searchUrl);
      expect(value).toEqual(mockApiSuccessResponse);
      done();
    });
  });
  it('should call the trending api path is trending', (done) => {
    const trendingUrl = `${BASE_URL}trending?api_key=${APIKEY}&limit=${GIF_LIMIT}&offset=${(10 * GIF_LIMIT)}`;
    callGiphyAPI('trending?', 10).then((value) => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(trendingUrl);
      expect(value).toEqual(mockApiSuccessResponse);
      done();
    });
  });
});
