import React from "react";
import { useSpring, animated } from "react-spring";
import { IconPlus } from "@tabler/icons";

interface FAQProps {
  question: JSX.Element;
  answer: JSX.Element;
}

const FAQ: React.FC<FAQProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const styles = useSpring({
    from: { rotateZ: 0 },
    to: { rotateZ: isOpen ? 45 : 0 },
  });

  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="font-sans leading-tight mb-4 mr-4">{question}</h2>
        <animated.article
          className="cursor-pointer"
          style={{
            width: 30,
            height: 30,
            ...styles,
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconPlus size={30} />
        </animated.article>
      </div>
      {isOpen && <p className="mr-2 rounded-lg border-2 border-solid border-gray-300 p-4 text-lg">{answer}</p>}
    </div>
  );
};

export default FAQ;
