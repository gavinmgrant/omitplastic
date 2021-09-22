import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "./Layout";
import Feature from "./Feature";
import Product, { ProductProps } from "./Product";
import SearchBar from "./SearchBar";
import { FeaturesList } from "../lib/featuresList";
import { IconFilter, IconX } from "@tabler/icons";
import useOnclickOutside from "react-cool-onclickoutside";
import { useSpring, animated } from "react-spring";

type Products = {
  feed: ProductProps[];
};

const ProductsBody: React.FC<Products> = (props) => {
  const [graybg, setGraybg] = useState(false);
  const [products, setProducts] = useState([]);
  const [queryValue, setQueryValue] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState([]);
  const [menuOn, setMenuOn] = useState(false);
  const [startOver, setStartOver] = useState(false);

  const router = useRouter();

  const menuStyle = useSpring({
    transform: "translateX(125%)",
    to: { transform: menuOn ? "translateX(0)" : "translateX(125%)" },
  });

  const ref = useOnclickOutside(() => {
    setMenuOn(false);
    setGraybg(false);
  });

  const handleClickBtn = () => {
    setMenuOn(!menuOn);
    setGraybg(!graybg);
  };

  useEffect(() => {
    if (!startOver) {
      const { search } = window.location;
      const query = new URLSearchParams(search.toLowerCase()).get("s");
      const filterProducts = (prods, query) => {
        return prods.filter((product) => {
          const features = product.features
            .join(" ")
            .toLowerCase()
            .replace(/-/g, " ");
          const content =
            product.name.toLowerCase() +
            " " +
            product.category.toLowerCase() +
            " " +
            product.description.toLowerCase() +
            " " +
            product.type.toLowerCase() +
            " " +
            features;

          return content.includes(query);
        });
      };

      const filteredProducts = filterProducts(props.feed, query).sort(
        (a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          return aName.localeCompare(bName);
        }
      );

      setProducts(filteredProducts);
      query ? setQueryValue(query) : setQueryValue("");
    }
  }, [queryValue, startOver, props.feed]);

  useEffect(() => {
    const filterProducts = (prods, features) => {
      return prods.filter((product) => {
        return features.every((f) => product.features.includes(f));
      });
    };

    let filteredProducts;

    if (features.length > 0) {
      filteredProducts = filterProducts(props.feed, features).sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        return aName.localeCompare(bName);
      });
    }

    features.length > 0
      ? setProducts(filteredProducts)
      : setProducts(props.feed);
  }, [features, props.feed]);

  const addFeature = (feature) => {
    if (!features.includes(feature)) {
      setFeatures(features.concat(feature));
    } else {
      setFeatures(features.filter((item) => item !== feature));
    }
  };

  const clearFeatures = () => {
    setFeatures([]);
  };

  const showAll = () => {
    setQueryValue(null);
    setStartOver(true);
    router.push("/products");
  };

  useEffect(() => {
    setProducts(props.feed);
  }, [props.feed, startOver]);

  useEffect(() => {
    // Get the category name and format it with capitalized first letter
    if (router.query.category) {
      const name = String(router.query.category).split("-");
      for (let i = 0; i < name.length; i++) {
        name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
      }
      const formattedName = name.join(" ");
      setCategory(formattedName);
    }
  }, [router.query.category, category]);

  return (
    <Layout>
      <div
        className="fixed flex flex-col w-full top-16 left-0 h-20 sm:h-12 sm:flex-row px-4 md:px-8 pb-1 bg-white shadow-lg z-30"
        ref={ref}
      >
        <SearchBar value={queryValue} onClick={() => setGraybg(!graybg)} />
        <div className="flex flex-row justify-between items-center mt-2 sm:ml-2 sm:mt-0 sm:mb-2 sm:w-full">
          <p>{products.length} products found</p>
          <div className="flex">
            {queryValue && (
              <a className="cursor-pointer" onClick={showAll}>
                Show all
              </a>
            )}
            {!queryValue && (
              <div onClick={handleClickBtn} className="cursor-pointer">
                {menuOn ? <IconX size={28} /> : <IconFilter size={28} />}
              </div>
            )}
          </div>
        </div>
      </div>

      {menuOn && (
        <animated.ul
          ref={ref}
          style={menuStyle}
          className="fixed top-36 sm:top-28 right-4 md:right-8 px-5 pb-2 pt-2 border-solid border-2 border-black rounded-lg bg-white z-30 shadow-lg text-sm sm:text-base md:text-lg"
        >
          <h2>Filter by feature:</h2>
          {FeaturesList.map((feature) => (
            <div
              key={feature.slug}
              className={
                features.includes(feature.slug)
                  ? "leading-8 opacity-100"
                  : "leading-8 opacity-40"
              }
              onClick={() => addFeature(feature.slug)}
            >
              <Feature key={feature.slug} feat={feature.slug} text />
            </div>
          ))}
          <button className="w-full my-2" onClick={clearFeatures}>
            <p
              className={`text-center ${
                features.length !== 0 ? "opacity-100" : "opacity-40"
              }`}
            >
              Clear filters
            </p>
          </button>
        </animated.ul>
      )}

      {products.length === 0 ? (
        <div className="pt-28 text-center h-screen">
          <p>No products found.</p>
        </div>
      ) : (
        <div>
          {queryValue && (
            <h2 className="pt-24 sm:pt-16 text-center">
              Search results for &quot;{queryValue}&quot;.
            </h2>
          )}
          {graybg && (
            <div className="h-screen w-screen fixed z-20 bg-black bg-opacity-50"></div>
          )}
          {category && (
            <h1 className={`pt-24 pb-2 sm: pb-0 sm:pt-16 text-center ${graybg ? "opacity-50" : "opacity-100"}`}>
              {category}
            </h1>
          )}
          <main
            className={`${
              (queryValue || category) ? "pt-2 sm:pt-4" : "pt-24 sm:pt-16"
            } px-4 pb-4 md:px-8 grid grid-cols-1 w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4`}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`transition-all duration-500 p-4 hover:shadow-lg hover:border-black rounded-lg border-2 border-solid ${
                  graybg ? "opacity-50" : "opacity-100"
                }`}
              >
                <Product key={product.id} product={product} />
              </div>
            ))}
          </main>
        </div>
      )}
    </Layout>
  );
};

export default ProductsBody;
