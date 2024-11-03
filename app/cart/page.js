'use client';

import { useContext, useEffect, useState } from 'react';
import { CartContext } from '/app/components/custom/CartContext';

export default function Cart() {
    // Get selection states and setters from CartContext
    const {
        selectedMovies,
        setSelectedMovies,
        selectedStreamingPlan,
        setSelectedStreamingPlan,
        selectedStreamListPlan,
        setSelectedStreamListPlan,
    } = useContext(CartContext);

    // Define options for Streaming Plans
    const streamingPlans = [
        { name: 'No Plan', detail: 'Remove Selected Plan.', price: 0.0 },
        { name: 'Individual Plan', detail: 'Stream one movie to a single device at a time. This is the most common plan.', price: 9.99 },
        { name: 'Friendly Plan', detail: 'Stream movies to up to two devices simultaneously in high definition (HD) if available.', price: 14.99 },
        { name: 'Family Plan', detail: 'Stream movies to up to four devices simultaneously in ultra-high definition (UHD) if available.', price: 19.99 },
    ];

    // Define options for StreamList Plans
    const streamListPlans = [
        { name: 'No Subscription', detail: 'Remove Selected Plan.', price: 0.0 },
        { name: 'Basic Subscription', detail: 'Maintain a single personal Watch List.', price: 4.99 },
        { name: 'Gold Subscription', detail: 'Maintain 1 to 5 personal Watch Lists.', price: 9.99 },
        { name: 'Premium Subscription', detail: 'Features multiple lists with built-in sharing capabilities among family members.', price: 14.99 },
        { name: 'Social Media Sharing Subscription', detail: 'Merges premium access so you can share your movie lists on social media platforms, allowing other users to comment on and react to your lists.', price: 19.99 },
    ];

    // Sales Tax
    const salesTaxRate = 0.0725;

    // Local state for favorite movies, total price, sales tax, and payment information.
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [salesTax, setSalesTax] = useState(0);
    const [paymentInfo, setPaymentInfo] = useState({
        name: '',
        cardNumber: '',
        expiration: '',
        cvv: '',
    });

    // On component mount, load favorite movies from localStorage, if available.
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedFavoriteMovies = localStorage.getItem('favoriteMovies');
            setFavoriteMovies(storedFavoriteMovies ? JSON.parse(storedFavoriteMovies) : []);
        }
    }, []);

    // Update the selected streaming plan based on user choice.
    const handleStreamingPlanSelect = (plan) => {
        setSelectedStreamingPlan(plan.name === 'No Plan' ? null : plan);
    };

    // Update the selected StreamList plan based on user choice.
    const handleStreamListPlanSelect = (plan) => {
        setSelectedStreamListPlan(plan.name === 'No Subscription' ? null : plan);
    };

    // Toggle movie selection based on its title. Adds the movie to selectedMovies
    // if not present; otherwise, removes it. This keeps selectedMovies in sync with the UI.
    const handleMovieSelect = (title) => {
        setSelectedMovies((prevSelected) =>
            prevSelected.includes(title)
                ? prevSelected.filter((t) => t !== title)
                : [...prevSelected, title]
        );
    };

    // Calculate and update total price and sales tax based on current selections.
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

    // Recalculate total price whenever there is a change in the selection.
    useEffect(() => {
        updateTotalPrice();
    }, [selectedStreamingPlan, selectedStreamListPlan, selectedMovies]);

    // Update payment information fields as the user types.
    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    // Log the payment information to the console when the payment form is submitted. Prevents default form submission.
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

            <div className="section">
                <h2>StreamList Experience Plans</h2>
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

            <div className="section">
                <h2>Selected Movie Titles</h2>
                <ul className="movie-titles">
                    {selectedMovies.length > 0 ? (
                        selectedMovies.map((movie, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedMovies.includes(movie)}
                                        onChange={() => handleMovieSelect(movie)}
                                    />
                                    {movie} - $3.99
                                </label>
                            </li>
                        ))
                    ) : (
                        <p>No favorite movies found in local storage.</p>
                    )}
                </ul>
            </div>

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
                            <li key={index}>{movie} - $3.99</li>
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
