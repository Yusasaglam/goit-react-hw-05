import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') ?? '';

    useEffect(() => {
        if (!query) return;

        setLoading(true);
        searchMovies(query)
            .then(results => {
                setMovies(results);
                setError(null);
            })
            .catch(() => setError('Failed to load movies.'))
            .finally(() => setLoading(false));
    }, [query]);

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const inputValue = form.elements.query.value.trim();

        if (!inputValue) {
            alert('Please enter a search query.');
            return;
        }

        setSearchParams({ query: inputValue });
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input
                    name="query"
                    type="text"
                    defaultValue={query}
                    placeholder="Search movies"
                    autoComplete="off"
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading movies...</p>}
            {error && <p>{error}</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </main>
    );
}
