import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';


const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTkyN2MxNGVkOGI5YjI0ZmY3MmJlYTJjMzY4Nzg1ZSIsIm5iZiI6MTc0MzcwMzkwNC44NDQsInN1YiI6IjY3ZWVjZjYwMmY3ZDQzNzAyNzk5MTRmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HuarCRZGgwY46-WSimZbpjySgB7DoxZ3JuJZuPmryIY';

const headers = {
    headers: { Authorization: TOKEN },
};

export const fetchMovieDetails = async (movieId) => {
    const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, headers);
    return data;
};


export const searchMovies = async (query) => {
    const { data } = await axios.get(
        `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        headers
    );
    return data.results;
};
