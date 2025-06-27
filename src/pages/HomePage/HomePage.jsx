import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchTrendingMovies()
            .then(setMovies)
            .catch(() => setError('Failed to load movies.'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading trending movies...</p>;
    if (error) return <p>{error}</p>;

    return <MovieList movies={movies} />;
}
