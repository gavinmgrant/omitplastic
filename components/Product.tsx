/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Feature from "./Feature";
import { IconBan } from "@tabler/icons";

export type ProductProps = {
  id: number;
  asin: string;
  price: string;
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
  const [productPrice, setProductPrice] = useState(product.price);
  const isUnavailable = product.price === "Unavailable";

  useEffect(() => {
    if (product.name.length > 90) {
      setProductName(product.name.substring(0, 90) + "...");
    }
  }, [product.name]);

  useEffect(() => {
    if (product.price === "0.00") {
      setProductPrice("Click for price");
    } else if (isUnavailable) {
      setProductPrice("Unavailable");
    } else {
      setProductPrice(`$${product.price}`);
    }
  }, [product.price, isUnavailable]);

  return (
    <div className="relative h-60 lg:h-64 flex flex-col justify-between">
      <div
        className={`flex justify-between cursor-pointer ${
          isUnavailable && "opacity-30"
        }`}
      >
        <div className="pt-2 pr-6 w-2/5">
          <img src={product.imageUrl} alt={product.name} className="max-h-44" />
        </div>
        <div className="w-3/5">
          <h2 className="font-sans leading-snug text-lg text-black">
            {productName}
          </h2>
        </div>
      </div>

      <div className="flex justify-between">
        <ul className={`flex ${isUnavailable && "opacity-30"}`}>
          {product.features.map((feature) => (
            <Feature key={feature} feat={feature} text={false} />
          ))}
        </ul>
        <p className="transitions-all duration-300 flex justify-end text-black border-2 border-black border-solid rounded-full py-2 px-3 text-center hover:bg-black hover:text-white">
          {isUnavailable && (
            <span className="mr-1">
              <IconBan />
            </span>
          )}
          {productPrice}
        </p>
      </div>
    </div>
  );
};

export default Product;
