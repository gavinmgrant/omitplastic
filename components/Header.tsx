import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconFilter, IconX } from "@tabler/icons";
import { FeaturesList } from "../lib/featuresList";
import Feature from "./Feature";

const Header: React.FC = () => {
  const router = useRouter();
  const [menuOn, setMenuOn] = useState(false);

  return (
    <header>
      <nav className="flex fixed w-full top-0 left-0 px-4 h-16 items-center justify-between py-4 bg-white z-20">
        <Link href="/">
          <a className="font-serif text-2xl sm:text-3xl">OmitPlastic</a>
        </Link>
        <div className="flex items-center">
          <a href="/products" className="mr-2">
            Products
          </a>
          {router.pathname.startsWith("/products") && (
            <div onClick={() => setMenuOn(!menuOn)} className="cursor-pointer">
              {menuOn ? <IconX size={30} /> : <IconFilter size={30} />}
            </div>
          )}
        </div>
      </nav>
      <div className={menuOn ? "block" : "hidden"}>
        <ul className="fixed top-12 right-4 px-4 pb-2 pt-2 border-solid border-2 border-black rounded-lg bg-white z-20 shadow-lg">
          <h2 className="mb-2">Filter by feature:</h2>
          {FeaturesList.map((feature, index) => (
            <a
              key={index}
              href={`/products/${Object.keys(feature).toString()}`}
            >
              <div key={index} className="leading-8">
                <Feature
                  key={index}
                  feat={Object.keys(feature).toString()}
                  text
                />
              </div>
            </a>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
