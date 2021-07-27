import React from "react";
import Router from "next/router";
import Feature from "./Feature";

export type ProductProps = {
  id: number;
  upc: string;
  category: string;
  type: string;
  name: string;
  imageUrl: string;
  urls: object[];
  description: string;
  features: string[];
};

const Product: React.FC<{ product: ProductProps }> = ({ product }) => {
  return (
    <div
      onClick={() => Router.push("/product/[upc]", `/product/${product.upc}`)}
      className="h-60 lg:h-64 flex flex-col justify-between"
    >
      <div className="flex justify-between">
        <div className="pt-2 pr-6 w-2/5 md:pr-10">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <h2 className="w-3/5 font-serif text-lg">{product.name}</h2>
      </div>

      <div className="flex justify-between">
        <ul className="flex">
          {product.features.map((feature, index) => (
            <Feature key={index} feat={feature} text={false} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Product;
