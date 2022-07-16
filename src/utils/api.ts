const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_URL = "https://api.themoviedb.org/3";
const NOW_PLAYING_URL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const TRENDING_URL = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
const UPCOMING_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`;

const nowplaying = () => fetch(NOW_PLAYING_URL).then((res) => res.json());
const trending = () => fetch(TRENDING_URL).then((res) => res.json());
const upcoming = () => fetch(UPCOMING_URL).then((res) => res.json());

export const movies = { nowplaying, trending, upcoming };

export interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// 전체 API의 속성들 중 사용할것만 interface로 정의하자
interface IBaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

// BaseResponse를 extends해서 interface정의
export interface IMovieResponse extends IBaseResponse {
  results: IMovie[];
}
