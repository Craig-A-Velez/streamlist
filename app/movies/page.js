'use client';

import { useState, useEffect, useContext } from 'react';
import { CartContext } from '/app/components/custom/CartContext';
import MoviesPager from '/app/components/custom/Movies';
import Pagination from '/app/components/custom/Pagination';

// Configuration options for API call
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_API_BEARER_TOKEN, // Use environment variable
    }
};

export default function Movies() {
    // State to hold movies data, loading status, errors, and selected movies list
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const { selectedMovies, setSelectedMovies } = useContext(CartContext);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch favorite movies from API and store them in local storage
    useEffect(() => {
        const savedMovies = localStorage.getItem('favoriteMovies');
        setLoading(true); // Start loading when fetching new data

        fetch(`https://api.themoviedb.org/3/account/21590425/favorite/movies?language=en-US&page=${currentPage}&sort_by=created_at.asc`, options)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results); // Save movies to state
                setTotalPages(data.total_pages);
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
    }, [currentPage]);

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
        if (!selectedMovies.includes(title)) {
            setSelectedMovies([...selectedMovies, title]);
        }
    };

    // Pagination function to change the current page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
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
            <MoviesPager movies={movies} loading={loading} addToCart={addToCart} />
            <Pagination totalPages={totalPages} paginate={paginate} />
        </div>
    );
}
