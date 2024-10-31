'use client';

import { useState, useEffect } from 'react';

// Configuration options for API call
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWFkMDhjZWI1NTEyNjBiZTIxNWRiNjZjYjhjMzhmZCIsIm5iZiI6MTcyOTgxMjg0MS4wMDMxNDIsInN1YiI6IjY3MWFkOGJlNGJlMTU0NjllNzBkOWQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.23_WM7hLCgTGuPIdKjvgWA0DT6GHd_Bd39j5hAfv4CM'
    }
};

export default function Movies() {
    // State to hold movies data, loading status, errors, and selected movies list
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovies, setSelectedMovies] = useState([]);

    // Fetch favorite movies from API and store them in local storage
    useEffect(() => {
        const savedMovies = localStorage.getItem('favoriteMovies');

        fetch('https://api.themoviedb.org/3/account/21590425/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', options)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results); // Save movies to state
                localStorage.setItem('favoriteMovies', JSON.stringify(data.results)); // Cache in local storage
                setLoading(false); // Set loading to false
            })
            .catch(err => {
                // If there's an error, load cached movies if available
                if (savedMovies) {
                    setMovies(JSON.parse(savedMovies));
                } else {
                    setError(err); // Set error if no cached movies
                }
                setLoading(false); // Set loading to false
            });
    }, []);

    // Load selected movies from local storage on component mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedMovies = localStorage.getItem('selectedMovies');
            setSelectedMovies(storedMovies ? JSON.parse(storedMovies) : []); // Initialize from local storage if available
        }
    }, []);

    // Update local storage and trigger 'cartUpdated' event whenever selectedMovies changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('selectedMovies', JSON.stringify(selectedMovies)); // Sync with local storage
            window.dispatchEvent(new Event('cartUpdated')); // Trigger 'cartUpdated' event
        }
    }, [selectedMovies]);

    // Function to add a movie to the selectedMovies array if it isn't already included
    const addToCart = (title) => {
        setSelectedMovies((prevSelected) => {
            // Only add movie if it's not already in the array
            if (!prevSelected.includes(title)) {
                return [...prevSelected, title];
            }
            return prevSelected;
        });
    };
    
    // Display loading indicator if still fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display error message if there was an issue fetching data
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Main content rendering the list of movies with an "Add to Cart" button for each movie
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
                                    <h3>{movie.title}</h3>
                                    <span>Release Date: {movie.release_date}</span>
                                    <p>Overview: {movie.overview}</p>
                                    <button className="addCart" onClick={() => addToCart(movie.title)}>Add to Cart</button>
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
