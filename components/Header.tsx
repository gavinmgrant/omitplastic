import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header>
      <nav className="flex fixed w-full top-0 left-0 px-4 md:px-8 h-16 items-center justify-between py-4 bg-white z-20">
        <Link href="/">
          <a className="font-serif text-2xl sm:text-3xl">OmitPlastic</a>
        </Link>
        <div className="flex items-center">
          <a
            href="/products"
            className="transitions-all duration-300 border-solid border-2 border-custom-green rounded-full py-1 px-3 bg-custom-green hover:bg-white text-white hover:text-custom-green shadow-md"
          >
            Products
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
