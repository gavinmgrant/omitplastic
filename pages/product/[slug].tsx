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
      slug: String(params?.slug),
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
        <meta property="og:title" content={props.name} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content={props.imageUrl} />
      </Head>
      <div className="grid grid-cols-1 sm:grid-cols-5 sm:gap-8 p-4 md:px-8">
        <div className="col-span-2 flex flex-row justify-center items-center">
          <img src={props.imageUrl} alt={props.name} className="max-h-96" />
        </div>
        <div className="col-span-3">
          <h2 className="font-serif text-xl py-4">{props.name}</h2>
          <p>{props.description}</p>
          <p className="pt-2">
            When you buy this product using our links, we earn an affiliate
            commission to support the site. Thank you!
          </p>
          <ul className="flex">
            {props.urls.map((url, index) => (
              <li key={index} className="mr-4">
                <button
                  key={index}
                  className="border-solid border-2 border-black rounded-full p-3 my-4 bg-black text-white hover:bg-white hover:text-black font-serif text-xl"
                >
                  <a key={index} href={Object.values(url)[0]} target="_blank">
                    {Object.keys(url)[0]}
                  </a>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-4 md:px-8">
        <h2 className="font-serif text-xl mb-2">Features:</h2>
        <ul>
          {props.features.map((feature, index) => (
            <a key={index} href={`/products/${feature}`}>
              <Feature key={index} feat={feature} text />
            </a>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Product;
