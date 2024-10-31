'use client';  // This directive is necessary for client-side functionality like useState

import { useState, useEffect } from 'react';

export default function Cart() {
    const [selectedStreamingPlan, setSelectedStreamingPlan] = useState(null);
    const [selectedStreamListPlan, setSelectedStreamListPlan] = useState(null);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [salesTax, setSalesTax] = useState(0);
    const [paymentInfo, setPaymentInfo] = useState({
        name: '',
        cardNumber: '',
        expiration: '',
        cvv: '',
    });

    // Streaming plans with price info
    const streamingPlans = [
        { name: 'No Plan', detail: 'Remove Selected Plan.', price: 0.00 },
        { name: 'Individual Plan', detail: 'Stream one movie to a single device at a time. This is the most common plan.', price: 9.99 },
        { name: 'Friendly Plan', detail: 'Stream movies to up to two devices simultaneously in high definition (HD) if available.', price: 14.99 },
        { name: 'Family Plan', detail: 'Stream movies to up to four devices simultaneously in ultra-high definition (UHD) if available.', price: 19.99 },
    ];

    // StreamList plans with price info
    const streamListPlans = [
        { name: 'No Subscription', detail: 'Remove Selected Plan.', price: 0.00 },
        { name: 'Basic Subscription', detail: 'Maintain a single personal Watch List.', price: 4.99 },
        { name: 'Gold Subscription', detail: 'Maintain 1 to 5 personal Watch Lists.', price: 9.99 },
        { name: 'Premium Subscription', detail: 'Features multiple lists with built-in sharing capabilities among family members.', price: 14.99 },
        { name: 'Social Media Sharing Subscription', detail: 'Merges premium access so you can share your movie lists on social media platforms, allowing other users to comment on and react to your lists.', price: 19.99 },
    ];

    const salesTaxRate = 0.0725;

    // Load data from localStorage only on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedStreamingPlan = localStorage.getItem('selectedStreamingPlan');
            const storedStreamListPlan = localStorage.getItem('selectedStreamListPlan');
            const storedMovies = localStorage.getItem('selectedMovies');
            const storedFavoriteMovies = localStorage.getItem('favoriteMovies');

            setSelectedStreamingPlan(storedStreamingPlan ? JSON.parse(storedStreamingPlan) : null);
            setSelectedStreamListPlan(storedStreamListPlan ? JSON.parse(storedStreamListPlan) : null);
            setSelectedMovies(storedMovies ? JSON.parse(storedMovies) : []);
            setFavoriteMovies(storedFavoriteMovies ? JSON.parse(storedFavoriteMovies) : []);
        }
    }, []);

    // Save selections to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('selectedStreamingPlan', JSON.stringify(selectedStreamingPlan));
            window.dispatchEvent(new Event('cartUpdated'));
        }
    }, [selectedStreamingPlan]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('selectedStreamListPlan', JSON.stringify(selectedStreamListPlan));
            window.dispatchEvent(new Event('cartUpdated'));
        }
    }, [selectedStreamListPlan]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('selectedMovies', JSON.stringify(selectedMovies));
            window.dispatchEvent(new Event('cartUpdated'));
        }
    }, [selectedMovies]);

    const handleStreamingPlanSelect = (plan) => {
        setSelectedStreamingPlan(plan.name === 'No Plan' ? null : plan);
    };

    const handleStreamListPlanSelect = (plan) => {
        setSelectedStreamListPlan(plan.name === 'No Subscription' ? null : plan);
    };

    const handleMovieSelect = (title) => {
        setSelectedMovies((prevSelected) =>
            prevSelected.includes(title)
                ? prevSelected.filter((t) => t !== title)
                : [...prevSelected, title]
        );
    };

    const updateTotalPrice = () => {
        const streamingPrice = selectedStreamingPlan ? selectedStreamingPlan.price : 0;
        const streamListPrice = selectedStreamListPlan ? selectedStreamListPlan.price : 0;
        const moviePrice = selectedMovies.reduce((total, movie) => {
            const movieData = favoriteMovies.find((m) => m.title === movie);
            return total + (movieData ? 3.99 : 0);
        }, 0);
        const subtotal = streamingPrice + streamListPrice + moviePrice;
        const tax = subtotal * salesTaxRate;
        setTotalPrice(subtotal + tax);
        setSalesTax(tax);
    };

    useEffect(() => {
        updateTotalPrice();
    }, [selectedStreamingPlan, selectedStreamListPlan, selectedMovies]);

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        console.log('Payment Information:', paymentInfo);
    };

    
    return (
        <div id="cart">
            <div className="section">
                <h1>Customer Plans</h1>
                <p><b>Ready to Experience More?</b></p>
                <p>At EZTechMovie, we offer streaming plans designed to fit your lifestyle. Whether you're an individual streamer or part of a family of movie lovers, our plans deliver quality, convenience, and entertainment.</p>
            </div>

            {/* Streaming Plans */}
            <div className="section">
                <h2>Streaming Experience Plans</h2>
                <ul>
                    {streamingPlans.map((plan, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type="radio"
                                    name="streamingPlan"
                                    checked={selectedStreamingPlan?.name === plan.name}
                                    onChange={() => handleStreamingPlanSelect(plan)}
                                />
                                {plan.name}: {plan.detail} - ${plan.price.toFixed(2)}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* StreamList Plans */}
            <div className="section">
                <h2>StreamList Experience Plans (Minimum)</h2>
                <ul>
                    {streamListPlans.map((plan, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type="radio"
                                    name="streamListPlan"
                                    checked={selectedStreamListPlan?.name === plan.name}
                                    onChange={() => handleStreamListPlanSelect(plan)}
                                />
                                {plan.name}: {plan.detail} - ${plan.price.toFixed(2)}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Available Movies */}
            <div className="section">
                <h2>Available Movie Titles</h2>
                <ul className="movie-titles">
                    {favoriteMovies.length > 0 ? (
                        favoriteMovies.map((movie, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedMovies.includes(movie.title)}
                                        onChange={() => handleMovieSelect(movie.title)}
                                    />
                                    {movie.title} - $3.99
                                </label>
                            </li>
                        ))
                    ) : (
                        <p>No favorite movies found in local storage.</p>
                    )}
                </ul>
            </div>

            {/* Cart Section */}
            <div className="section">
                <h2>Your Cart</h2>
                <ul>
                    {selectedStreamingPlan ? (
                        <li>{selectedStreamingPlan.name} - ${selectedStreamingPlan.price.toFixed(2)}</li>
                    ) : (
                        <li>No Streaming Experience Plan Selected</li>
                    )}
                    {selectedStreamListPlan ? (
                        <li>{selectedStreamListPlan.name} - ${selectedStreamListPlan.price.toFixed(2)}</li>
                    ) : (
                        <li>No StreamList Experience Plan Selected</li>
                    )}
                    {selectedMovies.length > 0 ? (
                        selectedMovies.map((movie, index) => (
                            <li key={index}>{movie} - $3.99</li> // Assuming fixed price for now
                        ))
                    ) : (
                        <li>No Movies Selected</li>
                    )}
                </ul>
                <p>
                    <b>Total Items in Cart: {
                        (selectedStreamingPlan ? 1 : 0) +
                        (selectedStreamListPlan ? 1 : 0) +
                        selectedMovies.length
                    }</b>
                </p>
                <p>
                    <b>Subtotal: ${totalPrice.toFixed(2)}</b> <br />
                    <b>Sales Tax: ${salesTax.toFixed(2)}</b>
                </p>
            </div>


            {/* Payment Form */}
            <div className="section payment-details">
                <h2>Payment</h2>
                <form onSubmit={handlePaymentSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={paymentInfo.name}
                            onChange={handlePaymentChange}
                        />
                    </label>
                    <label>
                        Card Number:
                        <input
                            type="text"
                            name="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentChange}
                        />
                    </label>
                    <label>
                        Expiration:
                        <input
                            type="text"
                            name="expiration"
                            value={paymentInfo.expiration}
                            onChange={handlePaymentChange}
                        />
                    </label>
                    <label>
                        CVV:
                        <input
                            type="text"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentChange}
                        />
                    </label>
                    <button type="submit">Submit Payment</button>
                </form>
            </div>
        </div>
    );
}