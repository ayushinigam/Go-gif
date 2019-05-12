import {APIKEY, GIF_LIMIT, BASE_URL} from '../constants'

export const getGif = (searchValue, count=0) => 
fetch(`${BASE_URL}search?q=${searchValue}&api_key=${APIKEY}&limit=${GIF_LIMIT}&offset=${(count*GIF_LIMIT)}`)
.then((response) => response.json())
.then((response) => response)
.catch((err) => console.error(err));

