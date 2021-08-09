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
      <div className="grid grid-cols-1 sm:grid-cols-4 sm:gap-8 p-4 md:px-8">
        <div className="col-span-2 flex flex-row justify-center items-start my-2 md:my-6">
          <img src={props.imageUrl} alt={props.name} className="max-h-96" />
        </div>
        <div className="col-span-2">
          <h2 className="font-serif text-xl py-4">{props.name}</h2>
          <p>{props.description}</p>
          <div className="mt-8">
            <h2 className="font-serif text-xl mb-2">Features:</h2>
            <ul>
              {props.features.map((feature, index) => (
                <a key={index} href={`/products/?s=${feature.replace(/-/g, " ")}`} className="text-black">
                  <Feature key={index} feat={feature} text />
                </a>
              ))}
            </ul>
            <p className="my-8">
              When you buy this product using our links, we may earn an
              affiliate commission.
            </p>
          </div>

          <ul className="sticky bottom-0 flex justify-center items-center flex-col mt-8">
            {props.urls.map((url, index) => (
              <li key={index} className="mb-3">
                <button key={index} className="h-14">
                  <a
                    key={index}
                    href={Object.values(url)[0]}
                    target="_blank"
                    className="transitions-all duration-300 border-solid border-2 border-black rounded-full py-3 px-5 bg-black hover:bg-white font-serif text-xl text-white hover:text-black shadow-md"
                  >
                    Buy now at {Object.keys(url)[0]}
                  </a>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="py-8 px-4 md:px-8 text-gray-500">
        <p>
          Disclaimer: While we work to ensure that product information is
          correct, on occasion manufacturers may alter their ingredient lists.
          Actual product packaging and materials may contain more and/or
          different information than that shown on this web site. We recommend
          that you do not solely rely on the information presented and that you
          always read labels, warnings, and directions before using or consuming
          a product. For additional information about a product, please contact
          the manufacturer. Content on this site is for reference purposes only.
          OmitPlastic.com assumes no liability for inaccuracies or misstatements
          about products.
        </p>
      </div>
    </Layout>
  );
};

export default Product;
