import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import Feature from "../../components/Feature";
import { ProductProps } from "../../components/Product";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: {
      upc: String(params?.upc),
    },
  });
  return {
    props: product,
  };
};

const Product: React.FC<ProductProps> = (props) => {
  return (
    <Layout>
      <Head>
        <title>{props.name}</title>
        <meta name="description" content={props.description} />
      </Head>
      <div className="grid grid-cols-1 sm:grid-cols-5 sm:gap-8 p-4">
        <div className="col-span-2">
          <img src={props.imageUrl} alt={props.name} />
        </div>
        <div className="col-span-3">
          <h2 className="font-serif text-xl py-4">{props.name}</h2>
          <p>{props.description}</p>
          <p className="pt-2">When you buy this product using our links, we earn an affiliate commission to support the site. Thank you!</p>
          <ul className="flex">
            {props.urls.map((url) => (
              <li key={Object.keys(url)[0]} className="mr-4">
                <button className="border-solid border-2 border-black rounded-full p-3 my-4 bg-black text-white hover:bg-white hover:text-black font-serif text-xl">
                  <a href={Object.values(url)[0]} target="_blank">
                    {Object.keys(url)[0]}
                  </a>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-serif text-xl mb-2">Features:</h2>
        <ul>
          {props.features.map((feature, index) => (
            <Feature key={index} feat={feature} text />
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Product;
