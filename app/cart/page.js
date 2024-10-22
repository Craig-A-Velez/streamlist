'use client';  // This directive is necessary for client-side functionality like useState

import { useState } from 'react';

export default function Cart() {
    const [selectedStreamingPlan, setSelectedStreamingPlan] = useState(null);
    const [selectedStreamListPlan, setSelectedStreamListPlan] = useState(null);
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
        { name: 'Individual Plan', price: 9.99 },
        { name: 'Friendly Plan', price: 14.99 },
        { name: 'Family Plan', price: 19.99 },
    ];

    // StreamList plans with price info
    const streamListPlans = [
        { name: 'Basic Subscription', price: 4.99 },
        { name: 'Gold Subscription', price: 9.99 },
        { name: 'Premium Subscription', price: 14.99 },
        { name: 'Social Media Sharing Subscription', price: 19.99 },
    ];

    // California sales tax rate
    const salesTaxRate = 0.0725;

    // Handle selecting a streaming plan
    const handleStreamingPlanSelect = (plan) => {
        setSelectedStreamingPlan(plan);
        updateTotalPrice(plan, selectedStreamListPlan);
    };

    // Handle selecting a StreamList plan
    const handleStreamListPlanSelect = (plan) => {
        setSelectedStreamListPlan(plan);
        updateTotalPrice(selectedStreamingPlan, plan);
    };

    // Update total price including sales tax
    const updateTotalPrice = (streamingPlan, streamListPlan) => {
        const streamingPrice = streamingPlan ? streamingPlan.price : 0;
        const streamListPrice = streamListPlan ? streamListPlan.price : 0;
        const subtotal = streamingPrice + streamListPrice;
        const tax = subtotal * salesTaxRate;
        setTotalPrice(subtotal + tax);
        setSalesTax(tax);
    };

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
                                {plan.name} - ${plan.price.toFixed(2)}
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
                                {plan.name} - ${plan.price.toFixed(2)}
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
