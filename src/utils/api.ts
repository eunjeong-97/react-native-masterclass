const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_URL = "https://api.themoviedb.org/3";
const NOW_PLAYING_URL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const TRENDING_URL = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
const UPCOMING_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`;

// const nowplaying = () => fetch(NOW_PLAYING_URL).then((res) => res.json());
// const trending = () => fetch(TRENDING_URL).then((res) => res.json());
// const upcoming = () => fetch(UPCOMING_URL).then((res) => res.json());

// export const movies = { nowplaying, trending, upcoming };

// 인라인으로 작성: 위 내용과 동일하다
export const movies = {
  trending: () => fetch(TRENDING_URL).then((res) => res.json()),
  upcoming: () => fetch(UPCOMING_URL).then((res) => res.json()),
  nowPlaying: () => fetch(NOW_PLAYING_URL).then((res) => res.json()),
};

export const tvs = {
  trending: () => fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) => res.json()),
  airingToday: () => fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) => res.json()),
  topRated: () => fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((res) => res.json()),
};
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

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: object;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
    }[];
  };
  images: object;
}

export interface ITV {
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}

export interface ITVDetails {
  backdrop_path: string;
  created_by: object;
  episode_run_time: object;
  first_air_date: string;
  genres: object;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: object;
  last_air_date: string;
  last_episode_to_air: object;
  name: string;
  next_episode_to_air: object;
  networks: object;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: object;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  seasons: object;
  spoken_languages: object;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
    }[];
  };
  images: object;
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
