// /app/usePersistedState.js
import { useState, useEffect } from 'react';

function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(() => {
        if (typeof window !== "undefined") {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        }
        return defaultValue;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(state));
        }
    }, [key, state]);

    return [state, setState];
}

export default usePersistedState;
