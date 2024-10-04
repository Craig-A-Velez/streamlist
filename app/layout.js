import Link from 'next/link';
import './globals.css';  // Optional for global styling
import Fonts from './fonts/fonts';

export const metadata = {
    title: 'StreamList App',
    description: 'Create and manage your streaming list!',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head />
            <body>
            <Fonts />
                <nav>
                    <ul>
                        <li><Link href="/">StreamList</Link></li>
                        <li><Link href="/movies">Movies</Link></li>
                        <li><Link href="/cart">Cart</Link></li>
                        <li><Link href="/about">About</Link></li>
                    </ul>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    );
}