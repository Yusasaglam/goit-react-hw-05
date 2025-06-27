import { useEffect, useState, useRef } from 'react';
import { useParams, Outlet, NavLink, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/tmdbApi';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const location = useLocation();
    const backLinkRef = useRef(location.state?.from ?? '/movies');

    useEffect(() => {
        setLoading(true);
        fetchMovieDetails(movieId)
            .then(data => {
                setMovie(data);
                setError(null);
            })
            .catch(() => setError('Failed to load movie details.'))
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
