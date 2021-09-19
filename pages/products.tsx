import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Feature from "../components/Feature";
import Product, { ProductProps } from "../components/Product";
import SearchBar from "../components/SearchBar";
import useSWR from "swr";
import { FeaturesList } from "../lib/featuresList";
import { IconFilter, IconX } from "@tabler/icons";
import useOnclickOutside from "react-cool-onclickoutside";
import { useSpring, animated } from "react-spring";

const fetcher = (url) => fetch(url).then((r) => r.json());

export const getStaticProps: GetStaticProps = async () => {
  const feed = await fetcher("https://www.omitplastic.com/api/products");
  return { props: { feed } };
};

type Products = {
  feed: ProductProps[];
};

const ProductsPage: React.FC<Products> = (props) => {
  const [graybg, setGraybg] = useState(false);
  const [products, setProducts] = useState([]);
  const [queryValue, setQueryValue] = useState("");
  const [features, setFeatures] = useState([]);
  const [menuOn, setMenuOn] = useState(false);
  const [startOver, setStartOver] = useState(false);
  const router = useRouter();

  const { data } = useSWR("/api/products", fetcher, {
    initialData: props.feed,
  });

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

      const filteredProducts = filterProducts(data, query).sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        return aName.localeCompare(bName);
      });

      setProducts(filteredProducts);
      query ? setQueryValue(query) : setQueryValue("");
    }
  }, [queryValue, startOver, data]);

  useEffect(() => {
    const filterProducts = (prods, features) => {
      return prods.filter((product) => {
        return features.every((f) => product.features.includes(f));
      });
    };

    let filteredProducts;

    if (features.length > 0) {
      filteredProducts = filterProducts(data, features).sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        return aName.localeCompare(bName);
      });
    }

    features.length > 0 ? setProducts(filteredProducts) : setProducts(data);
  }, [features, data]);

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
    setProducts(data);
  }, [data, startOver]);

  const title =
    "Find plastic free products and plastic free packaging. | OmitPlastic";
  const description =
    "Reduce plastic use by purchasing plastic free products, plastic free packaging, and reusable products.";
  const image = "/public/images/ocean-plastic.jpg";

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          property="og:url"
          content="https://www.omitplastic.com/products"
        />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
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
          className="fixed top-36 sm:top-28 right-4 md:right-8 px-5 pb-2 pt-2 border-solid border-2 border-black rounded-lg bg-white z-30 shadow-lg"
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
          <main
            className={`${
              queryValue ? "pt-2 sm:pt-4" : "pt-24 sm:pt-16"
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

export default ProductsPage;
