const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_URL = "https://api.themoviedb.org/3";
const NOW_PLAYING_URL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const TRENDING_URL = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
const UPCOMING_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`;

const nowplaying = () => fetch(NOW_PLAYING_URL).then((res) => res.json());
const trending = () => fetch(TRENDING_URL).then((res) => res.json());
const upcoming = () => fetch(UPCOMING_URL).then((res) => res.json());

export const movies = { nowplaying, trending, upcoming };
