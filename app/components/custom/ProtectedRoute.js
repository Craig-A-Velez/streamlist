// components/custom/ProtectedRoute.js
"use client";

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            signIn('google'); // Automatically trigger Google OAuth if unauthenticated
        }
    }, [status]);

    if (status === 'loading') return <p>Loading...</p>; // Show loading while checking session status

    return status === 'authenticated' ? children : null; // Only render children if authenticated
}
