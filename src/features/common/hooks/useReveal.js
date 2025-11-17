import { useEffect, useRef, useState } from "react";

const useReveal = (options = {}) => {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const callback = (entries) => {
      const [entry] = entries;
        setIsRevealed(entry.isIntersecting)
    };

    const observer = new IntersectionObserver(callback, {
      threshold: [0.5, 0.4],
      ...options,
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isRevealed };
};

export default useReveal;