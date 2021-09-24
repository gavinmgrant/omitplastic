import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconMenu, IconX } from "@tabler/icons";
import { useSpring, animated } from "react-spring";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const all = router.pathname === "/products";
  const bags = router.query.category === "bags";
  const bottles = router.query.category === "bottles";
  const householdSupplies = router.query.category === "household-supplies";
  const personalCare = router.query.category === "personal-care";

  const backgroundStyles = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translate3d(0, 0, 0)" : "translate3d(125%, 0, 0)",
  });

  const textStyles = useSpring({
    opacity: isOpen ? 1 : 0,
  });

  return (
    <header>
      <nav className="flex fixed w-full top-0 left-0 px-4 md:px-8 h-16 items-center justify-between py-4 bg-white z-20">
        <Link href="/">
          <a className="font-serif text-2xl md:text-3xl text-black">
            OmitPlastic
          </a>
        </Link>
        <div className="flex items-center">
          {router.pathname.startsWith("/products") ? (
            <>
              <div className="hidden sm:block">
                <menu className="flex items-center justify-end pl-1">
                <Link href="/products">
                    <a className={`transition-all duration-500 lg:text-lg mx-2 lg:mx-4 leading-tight text-center text-black hover:border-black border-b-4 border-solid pb-1 pt-2 ${all ? "border-black" : "border-white"}`}>
                      All Products
                    </a>
                  </Link>
                  <Link href="/products/bags">
                    <a className={`transition-all duration-500 lg:text-lg mx-2 lg:mx-4 leading-tight text-center text-black hover:border-black border-b-4 border-solid pb-1 pt-2 ${bags ? "border-black" : "border-white"}`}>
                      Bags
                    </a>
                  </Link>
                  <Link href="/products/bottles">
                    <a className={`transition-all duration-500 lg:text-lg mx-2 lg:mx-4 leading-tight text-center text-black hover:border-black border-b-4 border-solid pb-1 pt-2 ${bottles ? "border-black" : "border-white"}`}>
                      Bottles
                    </a>
                  </Link>
                  <Link href="/products/household-supplies">
                    <a className={`transition-all duration-500 lg:text-lg mx-2 lg:mx-4 leading-tight text-center text-black hover:border-black border-b-4 border-solid pb-1 pt-2 ${householdSupplies ? "border-black" : "border-white"}`}>
                      Household Supplies
                    </a>
                  </Link>
                  <Link href="/products/personal-care">
                    <a className={`transition-all duration-500 lg:text-lg ml-2 lg:ml-4 leading-tight text-center text-black hover:border-black border-b-4 border-solid pb-1 pt-2 ${personalCare ? "border-black" : "border-white"}`}>
                      Personal Care
                    </a>
                  </Link>
                </menu>
              </div>
              <div
                className="block sm:hidden cursor-pointer z-50"
                onClick={() => setIsOpen(true)}
              >
                <IconMenu size={28} />
              </div>
            </>
          ) : (
            <Link href="/products">
              <a className="transitions-all duration-300 border-solid border-2 border-custom-green rounded-full py-2 px-3 bg-custom-green hover:bg-white font-sans text-xl text-white hover:text-custom-green shadow-md flex justify-center items-center">
                Products
              </a>
            </Link>
          )}
        </div>
      </nav>
      {isOpen && (
        <>
          <animated.div
            style={backgroundStyles}
            className="fixed h-screen w-screen bg-black z-50"
          />
          <animated.div
            style={textStyles}
            className="fixed flex flex-col justify-center items-center h-screen w-screen text-white text-xl z-50"
            onClick={() => setIsOpen(false)}
          >
            <IconX
              size={28}
              className="absolute top-5 right-4 cursor-pointer"
            />
            <Link href="/products">
              <a className={`mb-2 pt-3 pb-1 text-white border-b-4 ${all ? "border-white border-solid" : "border-none"}`}>All Products</a>
            </Link>
            <Link href="/products/bags">
              <a className={`mb-2 pt-3 pb-1 text-white border-b-4 ${bags ? "border-white border-solid" : "border-none"}`}>Bags</a>
            </Link>
            <Link href="/products/bottles">
              <a className={`mb-2 pt-3 pb-1 text-white border-b-4 ${bottles ? "border-white border-solid" : "border-none"}`}>Bottles</a>
            </Link>
            <Link href="/products/household-supplies">
              <a className={`mb-2 pt-3 pb-1 text-white border-b-4 ${householdSupplies ? "border-white border-solid" : "border-none"}`}>Household Supplies</a>
            </Link>
            <Link href="/products/personal-care">
              <a className={`mb-2 pt-3 pb-1 text-white border-b-4 ${personalCare ? "border-white border-solid" : "border-none"}`}>Personal Care</a>
            </Link>
          </animated.div>
        </>
      )}
    </header>
  );
};

export default Header;
