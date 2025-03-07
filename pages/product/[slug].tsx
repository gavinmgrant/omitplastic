/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import Feature from "../../components/Feature";
import { ProductProps } from "../../components/Product";
import Loader from "../../components/Loader";
import RelatedProducts from "../../components/RelatedProducts";
import {
  IconBrandThreads,
  IconBrandFacebook,
  IconSend,
  IconMoodSad,
} from "@tabler/icons-react";
import prisma from "../../lib/prisma";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export const getStaticPaths: GetStaticPaths = async () => {
  const feed = await prisma.product.findMany();
  const paths: { params: { slug: string } }[] = feed.map(
    (product: { slug: string }) => ({
      params: { slug: product.slug },
    })
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: {
      slug: String(params?.slug),
    },
  });

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: product,
  };
};

const Product: React.FC<ProductProps> = (props) => {
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState(props.name);
  const [productDescription, setProductDescription] = useState(
    props.description
  );
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (props.name.length > 55) {
      setProductName(props.name.substring(0, 55) + "...");
    }
    if (props.description.length > 155) {
      setProductDescription(props.description.substring(0, 155) + "...");
    }
  }, [props.name, props.description]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/price", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ASIN: props.asin, currentPrice: props.price }),
    })
      .then((res) => res.json())
      .then((data) => {
        const priceString = data.price;
        if (priceString) {
          setPrice(`$${priceString}`);
        } else {
          setPrice(`$${props.price}`);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [props.asin, props.price]);

  return (
    <Layout>
      <Head>
        <title>{productName}</title>
        <meta name="description" content={productDescription} />
        <meta
          property="og:url"
          content={`https://www.omitplastic.com/product/${props.slug}`}
        />
        <meta property="og:title" content={productName} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={productDescription} />
        <meta property="og:image" content={props.imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={productName} />
        <meta name="twitter:description" content={productDescription} />
        <meta name="twitter:image" content={props.imageUrl} />
      </Head>
      <div className="grid grid-cols-1 sm:grid-cols-4 sm:gap-8 p-4 md:px-8">
        <div className="col-span-2 flex flex-col justify-start items-start my-2 md:my-6">
          <div
            className="w-full flex justify-center cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          >
            <img src={props.imageUrl} alt={props.name} className="max-h-96" />
          </div>
          {lightboxOpen && (
            <Lightbox
              slides={[{ src: props.imageUrl }]}
              open={lightboxOpen}
              close={() => setLightboxOpen(false)}
            />
          )}
          <div className="w-full flex justify-center items-center mt-6 md:mt-8">
            <div className="transitions-all duration-500 border-2 border-black border-solid rounded-full mx-2 p-2 hover:text-white hover:bg-black">
              <a
                href={`https://www.threads.net/intent/post?text=Check%20out%20the%20${props.name}:%20omitplastic.com/product/${props.slug}`}
                target="_blank"
                rel="noreferrer"
                className="transitions-all duration-500 text-black hover:text-white"
              >
                <IconBrandThreads size={28} stroke={1.5} />
              </a>
            </div>
            <div className="transitions-all duration-500 border-2 border-black border-solid rounded-full mx-2 p-2 hover:text-white hover:bg-black">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://omitplastic.com/product/${props.slug}`}
                target="_blank"
                rel="noreferrer"
                className="transitions-all duration-500 text-black hover:text-white"
              >
                <IconBrandFacebook size={28} stroke={1.5} />
              </a>
            </div>
            <div className="transitions-all duration-500 border-2 border-black border-solid rounded-full mx-2 p-2 hover:text-white hover:bg-black">
              <a
                href={`mailto:?subject=${props.name}%20&body=Check%20out%20the%20${props.name}%20at%20https://omitplastic.com/product/${props.slug}.`}
                className="transitions-all duration-500 text-black hover:text-white"
              >
                <IconSend size={28} stroke={1.5} />
              </a>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <h1 className="font-serif py-4 leading-snug">{props.name}</h1>
          <p className="text-lg">{props.description}</p>
          <div className="mt-8">
            <h2 className="font-serif mb-2">Features:</h2>
            <ul>
              {props.features.split(",").map((feature, index) => (
                <a
                  key={index}
                  href={`/products/?s=${feature.replace(/-/g, " ")}`}
                  className="text-black"
                >
                  <Feature key={index} feat={feature} text />
                </a>
              ))}
            </ul>
            <p className="mt-8 mb-2">
              When you buy this product using our links, we may earn an
              affiliate commission.
            </p>
            <p>ASIN: {props.asin}</p>
          </div>

          <ul className="sticky bottom-0 flex justify-center items-center flex-col mt-8 md:flex-row">
            <li className="mb-3 mx-2">
              <button className="h-14">
                <a
                  href={props.url}
                  target="_blank"
                  rel="noreferrer"
                  className="transitions-all duration-300 border-solid border-2 border-black rounded-full py-2 px-3 bg-black hover:bg-white font-sans text-xl text-white hover:text-black shadow-md flex justify-center items-center"
                >
                  {props.price === "Unavailable" ? (
                    <p className="flex items-center gap-2">
                      <IconMoodSad size={28} stroke={1.5} />
                      <span>Unavailable</span>
                    </p>
                  ) : (
                    <>
                      <p>Buy at Amazon</p>
                      <div className="ml-1">
                        {loading ? (
                          <Loader />
                        ) : price === "$0.00" ? (
                          "- Click for price"
                        ) : (
                          price
                        )}
                      </div>
                    </>
                  )}
                </a>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <RelatedProducts id={props.id} type={props.type} />
      <div className="py-8 px-4 md:px-8 text-gray-500">
        <p>
          Disclaimer: While we strive to ensure that product information is
          correct, manufacturers may change their product&apos;s specifications.
          Actual product packaging and materials may contain different
          information than that shown on this web site. Content on this site is
          for reference purposes only. OmitPlastic.com assumes no liability for
          inaccuracies or misstatements about products.
        </p>
      </div>
    </Layout>
  );
};

export default Product;
