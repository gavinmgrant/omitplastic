import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Head>
      <title>OmitPlastic</title>
      <meta
        name="description"
        content="Find plastic-free products, compostable products, reusable products, and more to reduce plastic pollution."
      />
      <meta
          property="og:title"
          content="OmitPlastic"
        />
        <meta
          property="og:description"
          content="Find plastic-free products, compostable products, reusable products, and more to reduce plastic pollution."
        />
        <meta
          property="og:image"
          content="/public/images/beach-bottle.jpg"
        />
    </Head>
    <Header />
    <div className="pt-16 min-h-screen">{props.children}</div>
    <Footer />
  </div>
);

export default Layout;
