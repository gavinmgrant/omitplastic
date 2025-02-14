import React from "react";
import { useSpring, animated } from "react-spring";
import { IconPlus } from "@tabler/icons-react";

interface FAQProps {
  question: string;
  answer: any;
}

const AnimatedArticle = animated.article as React.FC<
  React.HTMLAttributes<HTMLElement>
>;
const AnimatedDiv = animated.div as React.FC<any>;

const FAQ: React.FC<FAQProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const rotate = useSpring({
    from: { rotateZ: 0 },
    to: { rotateZ: isOpen ? 45 : 0 },
  });
  const expand = useSpring({
    from: { opacity: 0, height: 0, paddingBottom: 0 },
    to: {
      opacity: isOpen ? 1 : 0,
      height: isOpen ? "auto" : 0,
      paddingBottom: isOpen ? 16 : 0,
    },
  });

  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="font-sans leading-tight mb-4 mr-4">{question}</h2>
        <AnimatedArticle
          className="cursor-pointer"
          style={{
            width: 30,
            height: 30,
            ...rotate,
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconPlus size={30} />
        </AnimatedArticle>
      </div>
      <AnimatedDiv
        className="text-lg mr-8"
        style={{ overflowY: "hidden", ...expand }}
      >
        {answer}
      </AnimatedDiv>
    </div>
  );
};

export default FAQ;
