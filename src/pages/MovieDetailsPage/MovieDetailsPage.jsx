import { useEffect, useState, useRef } from 'react';
import { useParams, NavLink, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/tmdbApi';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const location = useLocation();
    const backLinkRef = useRef(location.state?.from ?? '/movies');

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchMovieDetails(movieId)
            .then(data => setMovie(data))
            .catch(() => setError('Failed to load movie details'))
            .finally(() => setLoading(false));
    }, [movieId]);

    if (loading) return <p>Loading movie details...</p>;
    if (error) return <p>{error}</p>;
    if (!movie) return null;

    return (
        <main className={styles.container}>
            <NavLink to={backLinkRef.current} className={styles.backLink}>
                &larr; Go back
            </NavLink>

            {/* Film Afişi */}
            {movie.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.poster}
                />
            )}

            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average}</p>

            <nav className={styles.subNav}>
                <NavLink to="cast" className={({ isActive }) => isActive ? styles.active : ''}>Cast</NavLink>
                <NavLink to="reviews" className={({ isActive }) => isActive ? styles.active : ''}>Reviews</NavLink>
            </nav>

            <Outlet />
        </main>
    );
}
