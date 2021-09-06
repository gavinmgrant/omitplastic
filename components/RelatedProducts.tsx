import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Product, { ProductProps } from "./Product";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export const getStaticProps: GetStaticProps = async () => {
  const feed = await fetcher("https://www.omitplastic.com/api/products");
  return { props: { feed } };
};

type Products = {
  id: number;
  type: string;
  feed?: ProductProps[];
};

const RelatedProducts: React.FC<Products> = ({ id, type }, props) => {
  const [products, setProducts] = useState([]);
  console.log(products);

  const { data } = useSWR("/api/products", fetcher, {
    initialData: props.feed,
  });

  useEffect(() => {
    if (data) {
      const typeProducts = data.filter((product) => product.type === type);
      const notIncludingThisProduct = typeProducts.filter(
        (product) => product.id !== id
      );
      const randomProducts = notIncludingThisProduct
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setProducts(randomProducts);
    }
  }, [data, id, type]);

  return (
    <div className="px-4 pb-4 md:px-8">
      <h2 className="font-serif leading-snug pb-4">Other {type.toLowerCase()}:</h2>
      <div className="grid grid-cols-1 w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="transition-all duration-500 p-4 hover:shadow-lg hover:border-black rounded-lg border-2 border-solid"
          >
            <Product key={product.id} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
