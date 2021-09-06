import React, { useState, useEffect } from "react";
import Router from "next/router";
import Feature from "./Feature";

export type ProductProps = {
  id: number;
  barcode: string;
  asin: string;
  category: string;
  type: string;
  name: string;
  slug: string;
  imageUrl: string;
  urls: object[];
  description: string;
  features: string[];
};

const Product: React.FC<{ product: ProductProps }> = ({ product }) => {
  const [productName, setProductName] = useState(product.name);

  useEffect(() => {
    if (product.name.length > 110) {
      setProductName(product.name.substring(0, 110) + "...");
    }
  }, [product.name]);

  return (
    <div className="h-60 lg:h-64 flex flex-col justify-between">
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => Router.push("/product/[slug]", `/product/${product.slug}`)}
      >
        <div className="pt-2 pr-6 w-2/5 md:pr-10">
          <img src={product.imageUrl} alt={product.name} className="max-h-44" />
        </div>
        <h2 className="w-3/5 font-serif text-lg">{productName}</h2>
      </div>

      <div className="flex justify-between">
        <ul className="flex">
          {product.features.map((feature) => (
            <Feature key={feature} feat={feature} text={false} />
          ))}
        </ul>
        <button onClick={() => Router.push("/product/[slug]", `/product/${product.slug}`)}>Details</button>
      </div>
    </div>
  );
};

export default Product;
