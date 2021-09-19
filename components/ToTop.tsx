import React from "react";
import { IconChevronUp } from "@tabler/icons";

const ToTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="bg-white fixed bottom-4 right-4 md:right-8 transition-all duration-500 p-3 border-black shadow-lg rounded-full border-2 border-solid z-40"
    >
      <IconChevronUp />
    </button>
  );
};

export default ToTop;
