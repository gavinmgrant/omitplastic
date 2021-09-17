/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Router from "next/router";
import Feature from "./Feature";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons";

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
    if (product.name.length > 90) {
      setProductName(product.name.substring(0, 90) + "...");
    }
  }, [product.name]);

  return (
    <div className="h-60 lg:h-64 flex flex-col justify-between">
      <Link href={`/product/${product.slug}`}>
        <a className="flex justify-between cursor-pointer">
          <div className="pt-2 pr-6 w-2/5 md:pr-10">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-44"
            />
          </div>
          <h2 className="w-3/5 font-serif text-lg text-black">{productName}</h2>
        </a>
      </Link>

      <div className="flex justify-between">
        <ul className="flex">
          {product.features.map((feature) => (
            <Feature key={feature} feat={feature} text={false} />
          ))}
        </ul>
        <Link href={`/product/${product.slug}`}>
          <a className="flex justify-end">
            Details
            <IconChevronRight />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Product;
