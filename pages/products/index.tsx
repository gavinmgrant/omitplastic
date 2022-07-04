import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import ProductsBody from "../../components/ProductsBody";
import { ProductProps } from "../../components/Product";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.product.findMany({
    orderBy: [
      {
        category: "asc",
      },
      {
        type: "asc",
      },
      {
        name: "asc",
      },
    ],
  });
  return {
    props: { feed },
  };
};

type Products = {
  feed: ProductProps[];
};

const ProductsPage: React.FC<Products> = (props) => {
  const title =
    "Find plastic free products and plastic free packaging. | OmitPlastic";
  const description =
    "Reduce plastic use by purchasing plastic free products, plastic free packaging, and reusable products.";
  const image = "/public/images/ocean-plastic.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          property="og:url"
          content="https://www.omitplastic.com/products"
        />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <link rel="canonical" href="/products" key="canonical" />
      </Head>
      <ProductsBody feed={props.feed} />
    </>
  );
};

export default ProductsPage;
