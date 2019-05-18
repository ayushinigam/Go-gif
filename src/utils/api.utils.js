import { APIKEY, GIF_LIMIT, BASE_URL } from '../constants';

export const getSearchAPIPath = searchValue => `search?q=${searchValue}&`;
export const getTrendingAPIPath = () => 'trending?';

export const callGiphyAPI = (searchValue, count = 0) => {
  const apiPath = searchValue ? getSearchAPIPath(searchValue) : getTrendingAPIPath();
  return fetch(`${BASE_URL}${apiPath}api_key=${APIKEY}&limit=${GIF_LIMIT}&offset=${(count * GIF_LIMIT)}`)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));
};
