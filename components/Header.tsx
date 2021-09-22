import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header>
      <nav className="flex fixed w-full top-0 left-0 px-4 md:px-8 h-16 items-center justify-between py-4 bg-white z-20">
        <Link href="/">
          <a className="font-serif text-2xl sm:text-3xl text-black">
            OmitPlastic
          </a>
        </Link>
        <div className="flex items-center">
          {router.pathname.startsWith("/products") ? (
            <menu className="font-serif flex items-center justify-end pl-2">
              <Link href="/products/bags">
                <a className="text-sm sm:text-base md:text-lg mx-1 sm:mx-2 leading-tight text-center">
                  Bags
                </a>
              </Link>
              <Link href="/products/bottles">
                <a className="text-sm sm:text-base md:text-lg mx-1 sm:mx-2 leading-tight text-center">
                  Bottles
                </a>
              </Link>
              <Link href="/products/household-supplies">
                <a className="text-sm sm:text-base md:text-lg mx-1 sm:mx-2 leading-tight text-center">
                  Household Supplies
                </a>
              </Link>
              <Link href="/products/personal-care">
                <a className="text-sm sm:text-base md:text-lg mx-1 sm:mx-2 leading-tight text-center">
                  Personal Care
                </a>
              </Link>
            </menu>
          ) : (
            <Link href="/products">
              <a className="transitions-all duration-300 border-solid border-2 border-custom-green rounded-full py-2 px-3 bg-custom-green hover:bg-white font-serif text-xl text-white hover:text-custom-green shadow-md flex justify-center items-center">
                Products
              </a>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
