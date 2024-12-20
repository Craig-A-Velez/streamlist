"use client"; // Ensure this is a Client Component

import './globals.css';  // Optional for global styling
import Icons from './fonts/icons';
import { CartProvider } from './components/custom/CartContext';
import { useEffect } from 'react';
import { Roboto } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import Navigation from './components/nav';
import ProtectedRoute from './components/custom/ProtectedRoute';


// Configure Roboto font
const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
});



export default function Layout({ children, session }) {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then(
                (registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                },
                (error) => {
                    console.error('Service Worker registration failed:', error);
                }
            );
        }
    }, []);

    return (
        <html lang="en" className={roboto.classname}>
            <body>
                <SessionProvider session={session}>
                    <ProtectedRoute>
                        <CartProvider>
                            <div className="content"><Icons />
                                    <Navigation />
                                    <main>{children}</main>
                            </div>
                            <footer className="footer">
                                <a href="https://github.com/Craig-A-Velez/streamlist"><span>Craig Velez - 2024</span></a>
                            </footer>
                        </CartProvider>
                    </ProtectedRoute>
                </SessionProvider>
            </body>
            
        </html>
    );
}