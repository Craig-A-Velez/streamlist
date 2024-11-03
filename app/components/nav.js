'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { CartContext } from '/app/components/custom/CartContext';
import ezstreamLogo from '/app/components/images/EZStreamLogo.png';

export default function Navigation() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { itemCount } = useContext(CartContext);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

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
