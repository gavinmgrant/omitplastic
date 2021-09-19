import React, { ReactNode } from "react"
import Header from "./Header";
import Footer from "./Footer";
import ToTop from "./ToTop";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="pt-16 min-h-screen">{props.children}</div>
    <Footer />
    <ToTop />
  </div>
);

export default Layout;
