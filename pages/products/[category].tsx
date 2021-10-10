import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import ProductsBody from "../../components/ProductsBody";
import { ProductProps } from "../../components/Product";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const feed = await prisma.product.findMany({
    where: {
      category: String(params?.category),
    },
    orderBy: [
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

const CategoryPage: React.FC<Products> = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();

  useEffect(() => {
    switch (router.query.category) {
      case "bags":
        setTitle("Bags | OmitPlastic");
        setDescription("Reusable bags made with no plastic or recycled plastic.");
        setImage("/public/images/ocean-plastic.jpg");
        break;
      case "bottles":
        setTitle("Bottles | OmitPlastic");
        setDescription("Reusable water bottles made with no or less plastic.");
        setImage("/public/images/ocean-plastic.jpg");
        break;
      case "household-supplies":
        setTitle("Household Supplies | OmitPlastic");
        setDescription("Plastic free and low plastic content household supplies.");
        setImage("/public/images/ocean-plastic.jpg");
        break;
      case "personal-care":
        setTitle("Personal Care | OmitPlastic");
        setDescription("Plastic free and low plastic content personal care products.");
        setImage("/public/images/ocean-plastic.jpg");
        break;
    }
  }, [router.query.category]);

  return (
    <div>
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
      </Head>
      <ProductsBody feed={props.feed} />
    </div>
  );
};

export default CategoryPage;
