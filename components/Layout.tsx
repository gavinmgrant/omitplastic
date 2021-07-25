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
        content="Helping people omit plastic from their online purchase."
      />
    </Head>
    <Header />
    <div className="pt-16">{props.children}</div>
    <Footer />
  </div>
);

export default Layout;
