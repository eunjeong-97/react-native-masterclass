// 영화와 TV데이터를 불러올 fetcher들을 만든다

const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_URL = "https://api.themoviedb.org/3";
const NOW_PLAYING_URL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const TRENDING_URL = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
const UPCOMING_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`;

// url들을 fetch하고 json을 반환한다
const nowplaying = () => fetch(NOW_PLAYING_URL).then((res) => res.json());
const trending = () => fetch(TRENDING_URL).then((res) => res.json());
const upcoming = () => fetch(UPCOMING_URL).then((res) => res.json());

// TV api와 구분되도록 object로 export한다
export const movies = { nowplaying, trending, upcoming };
