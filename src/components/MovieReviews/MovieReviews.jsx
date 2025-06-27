import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/tmdbApi';
import styles from './MovieReviews.module.css';

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchMovieReviews(movieId)
            .then(data => {
                setReviews(data);
                setError(null);
            })
            .catch(() => setError('Failed to load reviews.'))
            .finally(() => setLoading(false));
    }, [movieId]);

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>{error}</p>;
    if (reviews.length === 0) return <p>No reviews available.</p>;

    return (
        <ul className={styles.reviewList}>
            {reviews.map(({ id, author, content }) => (
                <li key={id} className={styles.reviewItem}>
                    <p><strong>{author}</strong></p>
                    <p>{content}</p>
                </li>
            ))}
        </ul>
    );
}
