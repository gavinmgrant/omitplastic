import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

const fetcher = (url) => fetch(url).then((r) => r.json());

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const products = await fetcher("https://www.omitplastic.com/api/products");

  const mainFields: ISitemapField[] = [
    { loc: "https://www.omitplastic.com", lastmod: new Date().toISOString() },
    { loc: "https://www.omitplastic.com/products", lastmod: new Date().toISOString() },
    { loc: "https://www.omitplastic.com/faq", lastmod: new Date().toISOString() },
  ];

  const productFields: ISitemapField[] = products.map((product) => ({
    loc: `https://www.omitplastic.com/product/${product.slug}`,
    lastmod: new Date().toISOString(),
  }));

  const fields = [...mainFields, ...productFields];

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
