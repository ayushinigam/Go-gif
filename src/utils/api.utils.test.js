import {getGif} from './api.utils';
import {APIKEY, GIF_LIMIT, BASE_URL} from '../constants'

describe('getGif', () => {
    const mockApiSuccessResponse = {"test": "data"};
    
    beforeAll(() => {
        const mockJsonPromise = Promise.resolve(mockApiSuccessResponse); 
        const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise});
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    });

    afterAll(() => {
        global.fetch.mockClear(); 
    });
    it('should call the gif api with the search keyword and return value', done => {
        getGif('test', 10).then((value) => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}search?q=test&api_key=${APIKEY}&limit=${GIF_LIMIT}&offset=${(10*GIF_LIMIT)}`);
            expect(value).toEqual(mockApiSuccessResponse);
            done();
        });
    });

})