import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/tmdbApi';
import styles from './MovieCast.module.css';

export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchMovieCast(movieId)
            .then(data => {
                setCast(data);
                setError(null);
            })
            .catch(() => setError('Failed to load cast.'))
            .finally(() => setLoading(false));
    }, [movieId]);

    if (loading) return <p>Loading cast...</p>;
    if (error) return <p>{error}</p>;
    if (cast.length === 0) return <p>No cast information available.</p>;

    return (
        <ul className={styles.castList}>
            {cast.map(({ id, name, character, profile_path }) => (
                <li key={id} className={styles.castItem}>
                    {profile_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                            alt={name}
                            className={styles.castImage}
                        />
                    ) : (
                        <div className={styles.noImage}>No Image</div>
                    )}
                    <p><strong>{name}</strong></p>
                    <p>as {character}</p>
                </li>
            ))}
        </ul>
    );
}
