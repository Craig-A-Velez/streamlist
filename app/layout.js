import './globals.css';  // Optional for global styling
import Icons from './fonts/icons';
import { Roboto } from 'next/font/google';
import Navigation from './components/nav';

// Configure Roboto font
const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
});

export const metadata = {
    title: 'StreamList App',
    description: 'Create and manage your streaming list!',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" classname={roboto.classname}>
        <head />
            <body>
                <div class="content"><Icons />
                        <Navigation />
                        <main>{children}</main>
                </div>
                <footer class="footer">
                    <a href="https://github.com/Craig-A-Velez/streamlist"><span>Craig Velez - 2024</span></a>
                </footer>
            </body>
            
        </html>
    );
}