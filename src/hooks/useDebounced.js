import { useEffect, useState } from 'react';

export const useDebounced = (value, delay) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setDebounced(value);
        }, delay);
        return () => clearTimeout(timeoutID);
    }, [value]);

    return debounced;
};
