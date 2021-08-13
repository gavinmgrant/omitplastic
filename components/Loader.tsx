import React from "react";
import { useSpring, animated } from "react-spring";
import { IconLoader } from "@tabler/icons";

const Loader: React.FC = () => {
  const styles = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 180 },
  });
  return (
    <animated.div
      style={{
        width: 24,
        height: 24,
        ...styles,
      }}
    >
      <IconLoader />
    </animated.div>
  );
};

export default Loader;
