import { APIKEY, GIF_LIMIT, BASE_URL } from '../constants';

export const getSearchAPIPath = searchValue => `search?q=${searchValue}&`;
export const getTrendingAPIPath = () => 'trending?';

export const callGiphyAPI = (apiPath, count = 0) => fetch(`${BASE_URL}${apiPath}api_key=${APIKEY}&limit=${GIF_LIMIT}&offset=${(count * GIF_LIMIT)}`)
  .then(response => response.json())
  .then(response => response)
  .catch(err => console.error(err));
