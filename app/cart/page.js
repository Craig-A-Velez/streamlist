'use client';  // This directive is necessary for client-side functionality like useState

import { useState, useEffect } from 'react';

export default function Cart() {
    const [selectedStreamingPlan, setSelectedStreamingPlan] = useState(null);
    const [selectedStreamListPlan, setSelectedStreamListPlan] = useState(null);
    const [selectedMovies, setSelectedMovies] = useState([]); // Array to hold selected movie titles
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
        { name: 'Individual Plan', detail: 'Stream one movie to a single device at a time. This is the most common plan.', price: 9.99 },
        { name: 'Friendly Plan', detail: 'Stream movies to up to two devices simultaneously in high definition (HD) if available.', price: 14.99 },
        { name: 'Family Plan', detail: 'Stream movies to up to four devices simultaneously in ultra-high definition (UHD) if available.', price: 19.99 },
    ];

    // StreamList plans with price info
    const streamListPlans = [
        { name: 'Basic Subscription', detail: 'Maintain a single personal Watch List.', price: 4.99 },
        { name: 'Gold Subscription', detail: 'Maintain 1 to 5 personal Watch Lists.', price: 9.99 },
        { name: 'Premium Subscription', detail: 'Features multiple lists with built-in sharing capabilities among family members.', price: 14.99 },
        { name: 'Social Media Sharing Subscription', detail: 'Merges premium access so you can share your movie lists on social media platforms, allowing other users to comment on and react to your lists.', price: 19.99 },
    ];

    // Movie titles and rental prices
    const movieTitles = [
        { title: 'Inception', rentalPrice: 3.99 },
        { title: 'The Dark Knight', rentalPrice: 4.99 },
        { title: 'Interstellar', rentalPrice: 3.99 },
        { title: 'The Matrix', rentalPrice: 2.99 },
        { title: 'Fight Club', rentalPrice: 3.49 },
    ];

    // California sales tax rate
    const salesTaxRate = 0.0725;

    // Load selections from local storage
    useEffect(() => {
        const storedStreamingPlan = JSON.parse(localStorage.getItem('selectedStreamingPlan'));
        const storedStreamListPlan = JSON.parse(localStorage.getItem('selectedStreamListPlan'));
        const storedMovies = JSON.parse(localStorage.getItem('selectedMovies')) || [];

        if (storedStreamingPlan) setSelectedStreamingPlan(storedStreamingPlan);
        if (storedStreamListPlan) setSelectedStreamListPlan(storedStreamListPlan);
        setSelectedMovies(storedMovies); // Make sure this works
    }, []);

    // Save selections to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('selectedStreamingPlan', JSON.stringify(selectedStreamingPlan));
        localStorage.setItem('selectedStreamListPlan', JSON.stringify(selectedStreamListPlan));
        localStorage.setItem('selectedMovies', JSON.stringify(selectedMovies)); // Ensure this updates correctly
    }, [selectedStreamingPlan, selectedStreamListPlan, selectedMovies]);

    // Handle selecting/deselecting a streaming plan
    const handleStreamingPlanSelect = (plan) => {
        // Toggle the selected plan if it's already selected, or set a new one
        if (selectedStreamingPlan?.name === plan.name) {
            setSelectedStreamingPlan(null); // Deselect
        } else {
            setSelectedStreamingPlan(plan); // Select new plan
        }
    };

    // Handle selecting/deselecting a StreamList plan
    const handleStreamListPlanSelect = (plan) => {
        // Toggle the selected plan if it's already selected, or set a new one
        if (selectedStreamListPlan?.name === plan.name) {
            setSelectedStreamListPlan(null); // Deselect
        } else {
            setSelectedStreamListPlan(plan); // Select new plan
        }
    };

    // Handle selecting/deselecting a movie title
    const handleMovieSelect = (title) => {
        setSelectedMovies((prevSelected) => {
            if (prevSelected.includes(title)) {
                return prevSelected.filter((t) => t !== title); // Deselect the movie if already selected
            } else {
                return [...prevSelected, title]; // Select the new movie
            }
        });
    };

    // Update total price including sales tax
    const updateTotalPrice = () => {
        const streamingPrice = selectedStreamingPlan ? selectedStreamingPlan.price : 0;
        const streamListPrice = selectedStreamListPlan ? selectedStreamListPlan.price : 0;
        const moviePrice = selectedMovies.reduce((total, movie) => {
            const movieData = movieTitles.find((m) => m.title === movie);
            return total + (movieData ? movieData.rentalPrice : 0);
        }, 0);
        const subtotal = streamingPrice + streamListPrice + moviePrice;
        const tax = subtotal * salesTaxRate;
        setTotalPrice(subtotal + tax);
        setSalesTax(tax);
    };

    // Update total price whenever selections change
    useEffect(() => {
        updateTotalPrice();
    }, [selectedStreamingPlan, selectedStreamListPlan, selectedMovies]);

    // Handle form input for payment information
    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    // Handle payment submission (stub for now)
    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Payment processing logic goes here
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
                <ul>
                    {movieTitles.map((movie, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedMovies.includes(movie.title)}
                                    onChange={() => handleMovieSelect(movie.title)}
                                />
                                {movie.title} - ${movie.rentalPrice.toFixed(2)}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cart Section */}
            <div className="section">
                <h2>Your Cart</h2>
                <ul>
                    {selectedStreamingPlan && (
                        <li>{selectedStreamingPlan.name} - ${selectedStreamingPlan.price.toFixed(2)}</li>
                    )}
                    {selectedStreamListPlan && (
                        <li>{selectedStreamListPlan.name} - ${selectedStreamListPlan.price.toFixed(2)}</li>
                    )}
                    {selectedMovies.map((movie, index) => (
                        <li key={index}>{movie} - ${movieTitles.find(m => m.title === movie).rentalPrice.toFixed(2)}</li>
                    ))}
                    <p><b>Subtotal: ${((totalPrice / (1 + salesTaxRate))).toFixed(2)}</b></p>
                    <p><b>Sales Tax (7.25%): ${salesTax.toFixed(2)}</b></p>
                    <p><b>Total Price: ${totalPrice.toFixed(2)}</b></p>
                </ul>
            </div>

            {/* Payment Details */}
            <div className="section payment-details">
                <h2>Payment Details</h2>
                <form onSubmit={handlePaymentSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name on Card"
                        value={paymentInfo.name}
                        onChange={handlePaymentChange}
                        required
                    />
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        required
                    />
                    <input
                        type="text"
                        name="expiration"
                        placeholder="Expiration Date (MM/YY)"
                        value={paymentInfo.expiration}
                        onChange={handlePaymentChange}
                        required
                    />
                    <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        required
                    />
                    <button type="submit">Complete Order</button>
                </form>
            </div>
        </div>
    );
}
