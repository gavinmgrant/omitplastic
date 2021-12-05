/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Feature from "./Feature";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons";

export type ProductProps = {
  id: number;
  barcode: string;
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

  useEffect(() => {
    if (product.name.length > 90) {
      setProductName(product.name.substring(0, 90) + "...");
    }
  }, [product.name]);

  return (
    <div className="h-60 lg:h-64 flex flex-col justify-between">
      <div className="flex justify-between cursor-pointer">
        <div className="pt-2 pr-6 w-2/5">
          <img src={product.imageUrl} alt={product.name} className="max-h-44" />
        </div>
        <div className="w-3/5">
          <h2 className="font-sans leading-snug text-lg text-black">
            {productName}
          </h2>
          <p className="mt-2">{product.price}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <ul className="flex">
          {product.features.map((feature) => (
            <Feature key={feature} feat={feature} text={false} />
          ))}
        </ul>
        <div className="flex justify-end">
          Details
          <IconChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Product;
