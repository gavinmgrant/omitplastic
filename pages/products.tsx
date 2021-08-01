import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Product, { ProductProps } from "../components/Product";
import SearchBar from "../components/SearchBar";
import useSWR from "swr";

const fetcher = url => fetch(url).then(r => r.json());

export const getStaticProps: GetStaticProps = async () => {
  const feed = await fetcher ('https://www.omitplastic.com/api/products');
  return { props: { feed } };
};

type Products = {
  feed: ProductProps[];
};

const ProductsPage: React.FC<Products> = (props) => {
  const [products, setProducts] = useState([]);
  const [queryValue, setQueryValue] = useState("");
  const router = useRouter();

  const { data } = useSWR('/api/products', fetcher, { initialData: props.feed })

  const showAll = () => {
    setProducts(data);
    setQueryValue("");
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
    const filteredProducts = filterProducts(data, query).sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      return aName.localeCompare(bName);
    });
    
    setProducts(filteredProducts);
    query ? setQueryValue(query) : setQueryValue("");
    router.push("/products");
  }, [queryValue]);

  return (
    <Layout>
      <div className="fixed w-full top-16 left-0 h-20 px-4 pb-1 bg-white shadow-lg">
        <div>
          <SearchBar value={queryValue} />
        </div>
        <div className="flex justify-between pt-2">
          <p>{products.length} products found</p>
          {queryValue && <button onClick={showAll}>Show all</button>}
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
