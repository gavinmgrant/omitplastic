import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "./Layout";
import Feature from "./Feature";
import Product, { ProductProps } from "./Product";
import SearchBar from "./SearchBar";
import { FeaturesList } from "../lib/featuresList";
import { IconFilter, IconX } from "@tabler/icons-react";
import useOnclickOutside from "react-cool-onclickoutside";
import { useSpring, animated } from "react-spring";

type Products = {
  feed: ProductProps[];
};

const AnimatedUl = animated.ul as React.FC<any>;

const ProductsBody: React.FC<Products> = (props) => {
  const [graybg, setGraybg] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [queryValue, setQueryValue] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [menuOn, setMenuOn] = useState(false);
  const [startOver, setStartOver] = useState(false);

  const router = useRouter();

  const menuStyle = useSpring({
    transform: menuOn ? "translate3d(0, 0, 0)" : "translate3d(125%, 0, 0)",
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
      const filterProducts = (
        prods: ProductProps[],
        query: string
      ): ProductProps[] => {
        return prods.filter((product: ProductProps) => {
          const features = product.features.toLowerCase().replace(/-/g, " ");
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

      const filteredProducts = filterProducts(props.feed, query || "").sort(
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
    interface FilterProducts {
      (prods: ProductProps[], features: string[]): ProductProps[];
    }

    const filterProducts: FilterProducts = (prods, features) => {
      return prods.filter((product) => {
        return features.every((f) => product.features.includes(f));
      });
    };

    let filteredProducts: ProductProps[] = [];

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

  interface AddFeature {
    (feature: string): void;
  }

  const addFeature: AddFeature = (feature) => {
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
    setQueryValue("");
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
        <AnimatedUl
          ref={ref}
          style={menuStyle}
          className="fixed w-screen sm:w-auto top-36 sm:top-28 sm:right-4 md:right-8 px-5 py-2 border-solid border-2 border-black rounded-lg bg-white z-30 shadow-lg text-base sm:text-lg"
        >
          <h2>Filter by feature:</h2>
          {FeaturesList.map((feature) => (
            <div
              key={feature.slug}
              className={
                features.includes(feature.slug)
                  ? "leading-9 sm:leading-10 opacity-100"
                  : "leading-9 sm:leading-10 opacity-40"
              }
              onClick={() => addFeature(feature.slug)}
            >
              <Feature key={feature.slug} feat={feature.slug} text />
            </div>
          ))}
          <button className="w-full mt-3 mb-2" onClick={clearFeatures}>
            <p
              className={`text-center ${
                features.length !== 0 ? "opacity-100" : "opacity-40"
              }`}
            >
              Clear filters
            </p>
          </button>
        </AnimatedUl>
      )}

      {products.length === 0 ? (
        <div className="pt-28 text-center h-screen">
          <p>No products found.</p>
        </div>
      ) : (
        <div>
          {queryValue && (
            <h2 className="px-2 pt-24 sm:pt-16 text-center leading-tight">
              Search results for &quot;{queryValue}&quot;.
            </h2>
          )}
          {category && (
            <h1
              className={`pt-24 pb-2 sm:pb-0 sm:pt-16 text-center leading-tight ${
                graybg ? "opacity-50" : "opacity-100"
              }`}
            >
              {category}
            </h1>
          )}
          <main
            className={
              (queryValue || category ? "pt-2 sm:pt-4" : "pt-24 sm:pt-16") +
              " px-4 pb-4 md:px-8 grid grid-cols-1 w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
            }
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`transition-all duration-500 p-4 hover:shadow-lg hover:border-black rounded-lg border-2 border-solid ${
                  graybg ? "opacity-50" : "opacity-100"
                }`}
              >
                <Link href={`/product/${product.slug}`} passHref>
                  <Product key={product.id} product={product} />
                </Link>
              </div>
            ))}
          </main>
        </div>
      )}
    </Layout>
  );
};

export default ProductsBody;
