'use client';

import { useState, useEffect } from 'react';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWFkMDhjZWI1NTEyNjBiZTIxNWRiNjZjYjhjMzhmZCIsIm5iZiI6MTcyOTgxMjg0MS4wMDMxNDIsInN1YiI6IjY3MWFkOGJlNGJlMTU0NjllNzBkOWQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.23_WM7hLCgTGuPIdKjvgWA0DT6GHd_Bd39j5hAfv4CM'
    }
};

export default function Movies() {
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedMovies = localStorage.getItem('favoriteMovies');

        fetch('https://api.themoviedb.org/3/account/21590425/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', options)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results);
                localStorage.setItem('favoriteMovies', JSON.stringify(data.results));
                setLoading(false);
            })
            .catch(err => {
                if (savedMovies) {
                    setMovies(JSON.parse(savedMovies));
                } else {
                    setError(err);
                }
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div id="movies-list">
            <h1>Favorite Movies</h1>
            {movies && movies.length > 0 ? (
                <div id="movie-list">
                    {movies.map(movie => (
                        <div className="card-holder" key={movie.id}>
                            <div className="movie-card">
                                <div className="poster" style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})` }}></div>
                                <div className="info-card">
                                    <h2>{movie.title}</h2>
                                    <p>Release Date: {movie.release_date}</p>
                                    <p>Overview: {movie.overview}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No favorite movies found.</p>
            )}
        </div>
    );
}
