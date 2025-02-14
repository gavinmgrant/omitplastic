import React from "react";
import { useSpring, animated } from "react-spring";
import { IconLoader } from "@tabler/icons-react";

const AnimatedDiv = animated.div as React.FC<any>;

const Loader: React.FC = () => {
  const styles = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 180 },
  });
  return (
    <AnimatedDiv
      style={{
        width: 24,
        height: 24,
        ...styles,
      }}
    >
      <IconLoader />
    </AnimatedDiv>
  );
};

export default Loader;
