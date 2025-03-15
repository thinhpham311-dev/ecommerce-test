import { useState, useEffect } from "react";

function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const updateMatch = () => setMatches(mediaQuery.matches);

        updateMatch(); // Set initial value
        mediaQuery.addEventListener("change", updateMatch);

        return () => mediaQuery.removeEventListener("change", updateMatch);
    }, [query]);

    return matches;
}

export default useMediaQuery;
