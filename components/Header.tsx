import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header>
      <nav className="flex fixed w-full top-0 left-0 px-4 h-16 items-center justify-between py-4 bg-white z-20">
        <Link href="/">
          <a className="font-serif text-2xl sm:text-3xl">OmitPlastic</a>
        </Link>
        <div className="flex items-center">
          <a href="/products">
            Products
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
