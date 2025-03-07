import React, { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import ProductsBody from "../../components/ProductsBody";
import { ProductProps } from "../../components/Product";
import prisma from "../../lib/prisma";

export const getStaticPaths: GetStaticPaths = async () => {
  const products: ProductProps[] = await prisma.product.findMany();
  const categories: string[] = [
    ...new Set(products.map((product) => product.category)),
  ];
  const paths = categories.map((category) => ({
    params: { category },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
        setDescription(
          "Reusable bags made with no plastic or recycled plastic. Plastic free bags."
        );
        setImage("/public/images/ocean-plastic.webp");
        break;
      case "bottles":
        setTitle("Bottles | OmitPlastic");
        setDescription(
          "Reusable water bottles made with no or less plastic. Plastic free bottles."
        );
        setImage("/public/images/ocean-plastic.webp");
        break;
      case "household-supplies":
        setTitle("Household Supplies | OmitPlastic");
        setDescription(
          "Plastic free and low plastic content household supplies. Plastic free laundry detergent."
        );
        setImage("/public/images/ocean-plastic.webp");
        break;
      case "personal-care":
        setTitle("Personal Care | OmitPlastic");
        setDescription(
          "Plastic free and low plastic content personal care products. Plastic free shampoo. Plastic free toothbrush. Plastic free deodorant."
        );
        setImage("/public/images/ocean-plastic.webp");
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
          content={`https://www.omitplastic.com/products/${router.query.category}`}
        />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <link
          rel="canonical"
          href={`/products/${router.query.category}`}
          key="canonical"
        />
      </Head>
      <ProductsBody feed={props.feed} />
    </div>
  );
};

export default CategoryPage;
