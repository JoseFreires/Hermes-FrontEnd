import { useEffect, useState } from "react";

export default function useDebounce(valor, delay = 500) {

    const [debounce, setDebounce] = useState(valor);

    useEffect(() => {

        const timer = setTimeout(() => {
            setDebounce(valor);
        }, delay);

        return () => clearTimeout(timer);

    }, [valor, delay]);

    return debounce;

}