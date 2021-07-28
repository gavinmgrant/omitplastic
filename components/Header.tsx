import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconFilter } from "@tabler/icons";

const Header: React.FC = () => {
  const router = useRouter();
  const [menuOn, setMenuOn] = useState(false);

  return (
    <header>
      <nav className="flex fixed w-screen top-0 left-0 px-4 h-16 items-center justify-between py-4 bg-white z-20">
        <Link href="/">
          <a className="font-serif text-2xl sm:text-3xl">OmitPlastic</a>
        </Link>
        <div className="flex">
          <a href="/products" className="mr-2">
            Products
          </a>
          {router.pathname.startsWith("/products") && (
            <div onClick={() => setMenuOn(!menuOn)} className="cursor-pointer">
              <IconFilter />
            </div>
          )}
        </div>
      </nav>
      <div className={menuOn ? "block" : "hidden"}>
        <ul className="fixed top-12 right-2 lg:right-4 p-5 border-solid border-2 border-black rounded-md bg-white z-20 shadow-lg">
          <h3>Filter by feature:</h3>
          <li>
            <a href="/products/bpa-free">BPA-free</a>
          </li>
          <li>
            <a href="/products/compostable">Compostable</a>
          </li>
          <li>
            <a href="/products/organic">Organic</a>
          </li>
          <li>
            <a href="/products/plant-based">Plant-based</a>
          </li>
          <li>
            <a href="/products/plastic-free-packaging">
              Plastic-free packaging
            </a>
          </li>
          <li>
            <a href="/products/plastic-free-product">Plastic-free product</a>
          </li>
          <li>
            <a href="/products/recycled-content">Recycled content</a>
          </li>
          <li>
            <a href="/products/reusable">Reusable</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
