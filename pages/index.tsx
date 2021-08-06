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
            width={360}
            height={450}
            layout="fixed"
          />
        </div>

        <h1 className="px-6 md:px-4 md:pl-8 font-serif text-center text-3xl xl:text-4xl absolute md:relative md:text-left pb-28 md:pb-0">
          We help people omit plastic from their online purchases.{" "}
          <Link href="/products">
            <a className="underline">Get started.</a>
          </Link>
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center h-screen md:px-2 lg:px-10 xl:px-16 relative">
        <VisibilitySensor onChange={onChange}>
          <h2 className="px-10 md:px-4 md:pr-8 font-serif text-center text-3xl xl:text-4xl absolute md:relative md:text-left text-white md:text-black z-10 pb-16 md:pb-0">
            Approximate tons of{" "}
            <a
              href="https://www.nationalgeographic.com/environment/article/plastic-pollution"
              target="_blank"
            >
              plastic waste
            </a>{" "}
            end up in the oceans from coastal nations every year:
            <animated.div className="mt-1 text-5xl xl:text-6xl">
              {number.val.to((val) =>
                new Intl.NumberFormat().format(Math.floor(val))
              )}
            </animated.div>
          </h2>
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
            width={360}
            height={450}
            layout="fixed"
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
            width={360}
            height={450}
            layout="fixed"
          />
        </div>

        <h2 className="px-6 md:px-4 md:pl-8 font-serif text-center text-3xl xl:text-4xl absolute md:relative md:text-left text-white md:text-black">
          Scientists say the world is approaching a non-reversible{" "}
          <a
            href="https://scitechdaily.com/global-plastic-pollution-may-be-nearing-an-irreversible-tipping-point/"
            target="_blank"
            className="text-gray-300 md:text-custom-green"
          >
            tipping point
          </a>{" "}
          in plastic pollution.{" "}
          <Link href="/products">
            <a className="underline cursor-pointer text-gray-300 md:text-custom-green">
              Start buying less.
            </a>
          </Link>
        </h2>
      </div>
      <div className="md:h-screen flex flex-col justify-center items-center m-2 mb-12">
        <h2 className="md:w-3/4 my-12 mx-4 md:mx-12 text-4xl xl:text-5xl text-center">
          We've curated a collection of well-designed products that reduce
          plastic pollution.
        </h2>
        <h3 className="mb-8 text-center leading-7">
          Filter our collection of products by features that are important to
          you:
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
          {FeaturesList.map((feature, i) => (
            <div
              key={feature.slug}
              className="p-4 pt-6 rounded-lg border-2 border-gray-300 hover:border-black hover:shadow-lg cursor-pointer"
              onClick={() => router.push("/products")}
            >
              <Feature key={i} feat={feature.slug} text />
            </div>
          ))}
        </ul>
      </div>
      <div className="md:h-screen flex flex-col justify-center items-center m-4 mb-12 md:mx-24 lg:mx-36 xl:mx-48">
        <h2 className="my-8 text-3xl xl:text-4xl text-center">
          Five reasons to reduce the use of plastics now.
        </h2>
        <ul>
          <li className="pb-4">
            <h3 className="leading-5 mb-2 flex items-center relative left-0">
              <span className="text-4xl">1.</span>
              <span className="relative left-2">
                Plastic production contributes to climate change.
              </span>
            </h3>
            <p className="ml-12">
              Oil, gas, and coal are the fossil-fuel building blocks of
              plastics. Studies show that fossil fuel air pollution causes
              almost{" "}
              <a
                href="https://www.cnn.com/2021/02/09/world/climate-fossil-fuels-pollution-intl-scn/index.html"
                target="_blank"
              >
                1 in 5 deaths globally
              </a>{" "}
              each year.
            </p>
          </li>
          <li className="pb-4">
            <h3 className="leading-5 mb-2 flex items-center relative left-0">
              <span className="text-4xl">2.</span>
              <span className="relative left-2">
                Plastics pollution is killing vulnerable wildlife.
              </span>
            </h3>
            <p className="ml-12">
              Thousands of seabirds and sea turtles, seals, and other marine
              mammals are killed each year after inadvertently eating plastic or
              getting caught in it. Endangered wildlife like Hawaiian monk seals
              and Pacific loggerhead sea turtles are among nearly 700 species
              that eat and get caught in{" "}
              <a
                href="biologicaldiversity.org/campaigns/ocean_plastics/"
                target="_blank"
              >
                plastic waste
              </a>
              .
            </p>
          </li>
          <li className="pb-4">
            <h3 className="leading-5 mb-2 flex items-center relative left-0">
              <span className="text-4xl">3.</span>
              <span className="relative left-2">
                Enormous amounts of plastic waste are thrown away into
                landfills, taking up valuable space.
              </span>
            </h3>
            <p className="ml-12">
              It's estimated that over{" "}
              <a
                href="https://www.nationalgeographic.com/science/article/plastic-produced-recycling-waste-ocean-trash-debris-environment"
                target="_blank"
              >
                90% of plastic waste isn't recycled
              </a>
              . If present trends continue, by 2050, there will be 12 billion
              metric tons of plastic in landfills. That amount is 35,000 times
              as heavy as the Empire State Building!
            </p>
          </li>
          <li className="pb-4">
            <h3 className="leading-5 mb-2 flex items-center relative left-0">
              <span className="text-4xl">4.</span>
              <span className="relative left-2">
                The amount of plastic polluting oceans could nearly triple by
                2040 without urgent action.
              </span>
            </h3>
            <p className="ml-12">
              Fortunately, we can do something to avoid this. Studies show
              reducing plastic production and consumption can affect this the
              most and would{" "}
              <a
                href="https://www.pewtrusts.org/en/trust/archive/winter-2021/ocean-plastic-pollution-is-a-huge-but-solvable-problem"
                target="_blank"
              >
                lessen plastic waste generation by 30%
              </a>
              .
            </p>
          </li>
          <li className="pb-4">
            <h3 className="leading-5 mb-2 flex items-center relative left-0">
              <span className="text-4xl">5.</span>
              <span className="relative left-2">
                Reusing products rather than using single-use plastic saves
                money.
              </span>
            </h3>
            <p className="ml-12">
              Using single-use plastic products ends up costing more over time
              than using, well-made reusable products. Not only that, reuse
              beats single-use on{" "}
              <a
                href="https://upstreamsolutions.org/reuse-vs-single-use-environment"
                target="_blank"
              >
                every environmental metric
              </a>
              , such as greenhouse gas emissions, water consumption, resource
              extraction, and plastic pollution.
            </p>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
