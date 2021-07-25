import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <nav className="flex fixed w-screen top-0 left-0 px-4 h-16 items-center justify-between py-4 bg-white z-20">
      <Link href="/">
        <a data-active={isActive("/")} className="font-serif text-3xl">OmitPlastic</a>
      </Link>
      <Link href="/products">
        <a data-active={isActive("/products")}>Products</a>
      </Link>
    </nav>
  );
};

export default Header;
