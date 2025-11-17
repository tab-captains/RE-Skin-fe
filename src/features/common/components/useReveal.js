import { useEffect, useRef, useState } from "react";

export const useReveal = (options = {}) => {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const callback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsRevealed(true);
      }
    };

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      ...options,
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isRevealed };
};