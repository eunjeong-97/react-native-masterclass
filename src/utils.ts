export const makeImgPath = (img: string, width: string = "500") => `https://image.tmdb.org/t/p/w${width}${img}`;

export const MOVIE_URL = (API_KEY: string, type: string) => `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&language=en-US&page=1&region=KR`;
