import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../components/Layout";
import Product, { ProductProps } from "../../components/Product";
import SearchBar from "../../components/SearchBar";
import Feature from "../../components/Feature";
import { FeaturesList } from "../../lib/featuresList";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const feed = await prisma.product.findMany({
    where: {
      features: {
        has: String(params?.features),
      },
    },
  });
  return {
    props: { feed },
  };
};

type Products = {
  feed: ProductProps[];
};

const FilteredProducts: React.FC<Products> = (props) => {
  const [products, setProducts] = useState([]);
  const [featureName, setFeatureName] = useState("");
  const [queryValue, setQueryValue] = useState("");
  const router = useRouter();
  const feature = router.query.features;

  const showAll = () => {
    router.push("/products");
  };

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
    const filteredProducts = filterProducts(props.feed, query);
    setProducts(filteredProducts);
    query ? setQueryValue(query) : setQueryValue("");
  }, [queryValue]);

  useEffect(() => {
    const feat = FeaturesList.find(name => Object.keys(name) == feature);
    setFeatureName(Object.values(feat)[0].toLowerCase());
  }, [feature]);
  
  return (
    <Layout>
      <Head>
        <title>Find {featureName} products</title>
        <meta property="og:title" content={`Find ${featureName} products`} />
      </Head>
      <div className="fixed w-full top-16 left-0 h-20 px-4 pb-1 bg-white shadow-lg">
        <div>
          <SearchBar value={queryValue} feature={feature} />
        </div>
        <div className="flex justify-between">
          <div className="flex pt-2">
            <p className="pr-2 relative">{products.length} products</p>
            <div className="relative right-0">
              <Feature key={feature.toString()} feat={feature.toString()} text={false} />
            </div>
          </div>
          <button onClick={showAll}>Show all</button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="pt-28 text-center h-screen">
          <p>No products found.</p>
        </div>
      ) : (
        <main className="pt-24 px-4 grid grid-cols-1 w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer p-4 hover:shadow-lg rounded-lg border-solid border border-gray-200"
            >
              <Product product={product} />
            </div>
          ))}
        </main>
      )}
    </Layout>
  );
};

export default FilteredProducts;
