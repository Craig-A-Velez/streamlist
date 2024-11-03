// /app/CartContext.js
import React, { createContext } from 'react';
import usePersistedState from './usePersistedState';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [selectedMovies, setSelectedMovies] = usePersistedState('selectedMovies', []);
    const [selectedStreamingPlan, setSelectedStreamingPlan] = usePersistedState('selectedStreamingPlan', null);
    const [selectedStreamListPlan, setSelectedStreamListPlan] = usePersistedState('selectedStreamListPlan', null);

    const itemCount = {
        movies: selectedMovies.length,
        streamingPlan: selectedStreamingPlan ? 1 : 0,
        streamListPlan: selectedStreamListPlan ? 1 : 0,
    };

    return (
        <CartContext.Provider value={{ selectedMovies, setSelectedMovies, selectedStreamingPlan, setSelectedStreamingPlan, selectedStreamListPlan, setSelectedStreamListPlan, itemCount }}>
            {children}
        </CartContext.Provider>
    );
}
