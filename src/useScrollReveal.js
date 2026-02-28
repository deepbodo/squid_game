import { useEffect, useRef } from "react";

const useScrollReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  return ref;
};

export default useScrollReveal;
