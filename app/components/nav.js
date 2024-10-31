'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ezstreamLogo from '/home/streamlist/streamlist/app/components/images/EZStreamLogo.png';

export default function Navigation() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [itemCount, setItemCount] = useState({ movies: 0, streamingPlan: 0, streamListPlan: 0 });

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        // Function to count items in local storage
        const countItemsInLocalStorage = () => {
            const selectedMovies = JSON.parse(localStorage.getItem('selectedMovies')) || [];
            const selectedStreamingPlan = JSON.parse(localStorage.getItem('selectedStreamingPlan'));
            const selectedStreamListPlan = JSON.parse(localStorage.getItem('selectedStreamListPlan'));

            setItemCount({
                movies: selectedMovies.length,
                streamingPlan: selectedStreamingPlan ? 1 : 0,
                streamListPlan: selectedStreamListPlan ? 1 : 0,
            });
        };

        // Count items when the component mounts
        countItemsInLocalStorage();

        // Listen for the custom cartUpdated event
        const handleCartUpdated = () => {
            countItemsInLocalStorage();
        };

        window.addEventListener('cartUpdated', handleCartUpdated);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdated);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link href="/">
                    <Image src={ezstreamLogo} alt="EZStream Logo" width={160} height={50} priority={true} />
                </Link>
            </div>

            <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
                <span className="material-symbols-outlined">menu</span>
            </button>

            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <li>
                    <Link href="/">
                        <span className="material-symbols-outlined">movie</span>
                        <span>StreamList</span>
                    </Link>
                </li>
                <li>
                    <Link href="/movies">
                        <span className="material-symbols-outlined">live_tv</span>
                        <span>Movies</span>
                    </Link>
                </li>
                <li>
                    <Link href="/cart">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span>Cart</span>
                        {/* Show the number of movies selected */}
                        <span className="item-count">{itemCount.movies + itemCount.streamingPlan + itemCount.streamListPlan}</span>
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        <span className="material-symbols-outlined">help</span>
                        <span>About</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
