import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../components/Layout";
import Product, { ProductProps } from "../../components/Product";
import SearchBar from "../../components/SearchBar";
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

  return (
    <Layout>
      <div className="fixed w-screen top-16 left-0 h-20 px-4 pb-1 bg-white shadow-lg">
        <div>
          <SearchBar value={queryValue} feature={feature} />
        </div>
        <div className="flex justify-between pt-2">
          <p>{products.length} products found</p>
          <button onClick={showAll}>Show all products</button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="pt-28 text-center">
          <p>No products found.</p>
        </div>
      ) : (
        <main className="pt-24 px-4 grid grid-cols-1 w-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
