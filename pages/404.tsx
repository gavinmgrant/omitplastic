import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import { CallToAction } from "./index";

export const NotFoundPage: React.FC = () => (
  <Layout>
    <Head>
      <title>Page not found | OmitPlastic</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
    <div className="flex flex-col justify-center items-center h-screen">
      <section className="mb-32 text-center">
        <h1>Page not found.</h1>
        <CallToAction />
      </section>
    </div>
  </Layout>
);

export default NotFoundPage;
