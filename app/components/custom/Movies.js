import React from 'react';

const MoviesPager = ({ movies, loading, addToCart }) => {
    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div id="movie-list">
            {movies && movies.length > 0 ? (
                movies.map((movie, index) => ( // Corrected parentheses around parameters
                    <div className="card-holder" key={movie.id}>
                        <div className="movie-card" key={index}>
                            <div className="poster" style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})` }}></div>
                            <div className="info-card">
                                <h3>{movie.title}</h3>
                                <span>Release Date: {movie.release_date}</span>
                                <p>Overview: {movie.overview}</p>
                                <button className="addCart" onClick={() => addToCart(movie.title)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No favorite movies found.</p>
            )}
        </div>
    );
};

export default MoviesPager;
