import React, { useEffect, useState } from "react";
import { IconChevronUp } from "@tabler/icons";

const ToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      setIsVisible(top > 100);
    };
    
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="bg-white fixed bottom-4 right-4 md:right-8 transition-all duration-500 p-3 border-black shadow-lg rounded-full border-2 border-solid z-40 hover:bg-black hover:text-white"
      >
        <IconChevronUp />
      </button>
    )
  );
};

export default ToTop;
