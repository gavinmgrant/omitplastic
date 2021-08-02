import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Feature from "../components/Feature";
import Product, { ProductProps } from "../components/Product";
import SearchBar from "../components/SearchBar";
import useSWR from "swr";
import { FeaturesList } from "../lib/featuresList";
import { IconFilter, IconX } from "@tabler/icons";

const fetcher = (url) => fetch(url).then((r) => r.json());

export const getStaticProps: GetStaticProps = async () => {
  const feed = await fetcher("https://www.omitplastic.com/api/products");
  return { props: { feed } };
};

type Products = {
  feed: ProductProps[];
};

const ProductsPage: React.FC<Products> = (props) => {
  const [products, setProducts] = useState([]);
  const [queryValue, setQueryValue] = useState("");
  const [features, setFeatures] = useState([]);
  const [menuOn, setMenuOn] = useState(false);
  const router = useRouter();

  const { data } = useSWR("/api/products", fetcher, {
    initialData: props.feed,
  });

  useEffect(() => {
    const { search } = window.location;
    const query = new URLSearchParams(search.toLowerCase()).get("s");
    const filterProducts = (products, query) => {
      if (!query) {
        return products;
      }

      return products.filter((product) => {
        const name = product.name.toLowerCase();
        return name.includes(query);
      });
    };

    const filteredProducts = filterProducts(products, query).sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      return aName.localeCompare(bName);
    });

    setProducts(filteredProducts);
    query ? setQueryValue(query) : setQueryValue("");
    // router.push("/products");
  }, [queryValue]);

  useEffect(() => {
    const filterProducts = (products, features) => {
      if (!features) {
        return products;
      }
      return products.filter((product) => {
        return features.every((f) => product.features.includes(f));
      });
    };

    const filteredProducts = filterProducts(data, features).sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      return aName.localeCompare(bName);
    });

    setProducts(filteredProducts);
  }, [features]);

  const addFeature = (feature) => {
    if (!features.includes(feature)) {
      setFeatures(features.concat(feature));
    } else {
      setFeatures(features.filter((item) => item !== feature));
    }
  };

  useEffect(() => {
    setProducts(data);
  }, []);

  return (
    <Layout>
      <div className="fixed flex flex-col w-full top-16 left-0 h-20 sm:h-12 sm:flex-row px-4 pb-1 bg-white shadow-lg">
        <SearchBar value={queryValue} />
        <div className="flex flex-row justify-between items-center mt-2 sm:ml-2 sm:mt-0 sm:mb-2 sm:w-full">
          <p>{products.length} products found</p>
          <div className="flex">
            {queryValue && <a href="/products">Show all</a>}
            {!queryValue && (
              <div
                onClick={() => setMenuOn(!menuOn)}
                className="cursor-pointer"
              >
                {menuOn ? <IconX /> : <IconFilter />}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={menuOn ? "block" : "hidden"}>
        <ul className="fixed top-36 sm:top-28 right-4 px-4 pb-2 pt-2 border-solid border-2 border-black rounded-lg bg-white z-20 shadow-lg">
          <h2>Filter by feature:</h2>
          {FeaturesList.map((feature, index) => (
            <div
              key={index}
              className={
                features.includes(feature.slug)
                  ? "leading-8 opacity-100"
                  : "leading-8 opacity-40"
              }
              onClick={() => addFeature(feature.slug)}
            >
              <Feature key={index} feat={feature.slug} text />
            </div>
          ))}
        </ul>
      </div>

      {products.length === 0 ? (
        <div className="pt-28 text-center h-screen">
          <p>No products found.</p>
        </div>
      ) : (
        <main className="pt-24 sm:pt-16 px-4 grid grid-cols-1 w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 hover:shadow-lg hover:border-black rounded-lg border-solid border-2 border-gray-200"
            >
              <Product key={product.id} product={product} />
            </div>
          ))}
        </main>
      )}
    </Layout>
  );
};

export default ProductsPage;
