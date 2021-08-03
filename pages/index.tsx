import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Feature from "../components/Feature";
import { FeaturesList } from "../lib/featuresList";
import { useSpring, animated, config } from "react-spring";
import VisibilitySensor from "react-visibility-sensor";
import bottle from "../public/images/beach-bottle.jpg";
import ocean from "../public/images/ocean-above.jpg";
import plastic from "../public/images/plastic-pollution.jpg";

const Home: React.FC = () => {
  const [isVisible, setVisibility] = useState(false);
  const router = useRouter();

  const number = useSpring({
    delay: isVisible ? 100 : 10000,
    from: { val: 1000000 },
    to: { val: 8000000 },
    config: config.molasses,
    reset: !isVisible,
  });

  const onChange = (visible: boolean) => {
    setVisibility(visible);
  };

  return (
    <Layout>
      <div className="flex flex-row justify-center items-center h-screen md:px-2 lg:px-10 xl:px-16 relative md:pb-24">
        <div className="md:hidden opacity-80">
          <Image
            src={bottle}
            alt="Plastic bottle on the beach"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="hidden md:block pl-12 opacity-80">
          <Image
            src={bottle}
            alt="Plastic bottle on the beach"
            width={640}
            height={800}
          />
        </div>

        <h1 className="px-6 md:px-4 md:pl-8 font-serif text-center text-4xl xl:text-5xl absolute md:relative md:text-left pb-28 md:pb-0">
          We help people omit plastic from their online purchases.{" "}
          <Link href="/products">
            <div className="mt-4 text-green-600 cursor-pointer underline">
              Get started.
            </div>
          </Link>
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center h-screen md:px-2 lg:px-10 xl:px-16 relative">
        <VisibilitySensor onChange={onChange}>
          <h1 className="px-10 md:px-4 md:pr-8 font-serif text-center text-4xl xl:text-5xl absolute md:relative md:text-left text-white md:text-black z-10 pb-16 md:pb-0">
            Approximate tons of{" "}
            <a
              href="https://www.nationalgeographic.com/environment/article/plastic-pollution"
              target="_blank"
              className="text-gray-400 md:text-gray-600"
            >
              plastic waste
            </a>{" "}
            end up in the oceans from coastal nations every year:
            <animated.div className="mt-4 text-6xl xl:text-7xl">
              {number.val.to((val) =>
                new Intl.NumberFormat().format(Math.floor(val))
              )}
            </animated.div>
          </h1>
        </VisibilitySensor>
        <div className="md:hidden">
          <Image
            src={ocean}
            alt="Plastic pollution in ocean"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="hidden md:block pr-12">
          <Image
            src={ocean}
            alt="Plastic pollution in ocean"
            width={640}
            height={853}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center h-screen md:px-2 lg:px-10 xl:px-16 relative">
        <div className="md:hidden">
          <Image
            src={plastic}
            alt="Plastic pollution"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="hidden md:block pl-12">
          <Image
            src={plastic}
            alt="Plastic pollution"
            width={640}
            height={800}
          />
        </div>

        <h1 className="px-6 md:px-4 md:pl-8 font-serif text-center text-4xl xl:text-5xl absolute md:relative md:text-left text-white md:text-black">
          Scientists say the world is approaching a non-reversible{" "}
          <a
            href="https://scitechdaily.com/global-plastic-pollution-may-be-nearing-an-irreversible-tipping-point/"
            target="_blank"
            className="text-gray-400 md:text-gray-600"
          >
            tipping point
          </a>{" "}
          in plastic pollution.{" "}
          <Link href="/products">
            <div className="pt-4 text-green-300 md:text-green-600 underline cursor-pointer">
              Start buying less.
            </div>
          </Link>
        </h1>
      </div>
      <div className="md:h-screen flex flex-col justify-center items-center m-4 mb-12">
        <h1 className="md:w-3/4 my-12 mx-4 md:mx-12 text-4xl xl:text-5xl text-center">
          We've curated a collection of well-designed products that reduce
          plastic pollution.
        </h1>
        <h2 className="mb-8 text-center leading-7">
          Filter our collection of products by features that are important to
          you:
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
          {FeaturesList.map((feature, i) => (
            <div
              className="p-4 pt-6 rounded-lg border-2 border-gray-300 hover:border-black hover:shadow-lg cursor-pointer"
              onClick={() => router.push("/products")}
            >
              <Feature key={i} feat={feature.slug} text />
            </div>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
