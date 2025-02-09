import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSpring, animated } from "react-spring"
import { Squeeze as Hamburger } from "hamburger-react"

const AnimatedDiv = animated.div as React.FC<any>

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const all = router.pathname === "/products"
  const bags = router.query.category === "bags"
  const bottles = router.query.category === "bottles"
  const householdSupplies = router.query.category === "household-supplies"
  const personalCare = router.query.category === "personal-care"

  const backgroundStyles = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translate3d(0, 0, 0)" : "translate3d(125%, 0, 0)",
  })

  const textStyles = useSpring({
    opacity: isOpen ? 1 : 0,
  })

  return (
    <header>
      <nav className="flex fixed w-full top-0 left-0 px-4 md:px-8 h-16 items-center justify-between py-4 bg-white z-20">
        <Link
          href="/"
          className="flex justify-center items-center font-serif text-xl md:text-2xl text-black"
        >
          OmitPlastic
        </Link>
        <div className="flex items-center">
          {router.pathname.startsWith("/products") ? (
            <>
              <div className="hidden sm:block">
                <menu className="flex items-center justify-end pl-1">
                  <Link
                    href="/products"
                    className={`transition-all duration-500 lg:text-lg mx-2 lg:mx-4 leading-tight text-center text-black hover:border-black border-b-4 border-solid pb-1 pt-2 ${
                      all ? "border-black" : "border-white"
                    }`}
                  >
                    All Products
                  </Link>
                  <Link
                    href="/products/bags"
                    className={`transition-all duration-500 lg:text-lg mx-2 lg:mx-4 leading-tight text-center text-black hover:border-black border-b-4 border-solid pb-1 pt-2 ${
                      bags ? "border-black" : "border-white"
                    }`}
                  >
                    Bags
                  </Link>
                  <Link
                    href="/products/bottles"
                    className={`transition-all duration-500 lg:text-lg mx-2 lg:mx-4 leading-tight text-center text-black hover:border-black border-b-4 border-solid pb-1 pt-2 ${
                      bottles ? "border-black" : "border-white"
                    }`}
                  >
                    Bottles
                  </Link>
                  <Link
                    href="/products/household-supplies"
                    className={`transition-all duration-500 lg:text-lg mx-2 lg:mx-4 leading-tight text-center text-black hover:border-black border-b-4 border-solid pb-1 pt-2 ${
                      householdSupplies ? "border-black" : "border-white"
                    }`}
                  >
                    Household Supplies
                  </Link>
                  <Link
                    href="/products/personal-care"
                    className={`transition-all duration-500 lg:text-lg ml-2 lg:ml-4 leading-tight text-center text-black hover:border-black border-b-4 border-solid pb-1 pt-2 ${
                      personalCare ? "border-black" : "border-white"
                    }`}
                  >
                    Personal Care
                  </Link>
                </menu>
              </div>
              <div
                className="block sm:hidden cursor-pointer z-50"
                onClick={() => setIsOpen(true)}
              >
                <Hamburger toggled={isOpen} toggle={setIsOpen} />
              </div>
            </>
          ) : (
            <Link
              href="/products"
              className="transitions-all duration-300 border-solid border-2 border-custom-green rounded-full py-2 px-3 bg-custom-green hover:bg-white font-sans text-xl text-white hover:text-custom-green shadow-md flex justify-center items-center"
            >
              Products
            </Link>
          )}
        </div>
      </nav>
      {isOpen && (
        <>
          <AnimatedDiv
            style={backgroundStyles}
            className="fixed h-screen w-screen bg-black z-50"
          />
          <AnimatedDiv
            style={textStyles}
            className="fixed flex flex-col justify-center items-center h-screen w-screen text-white text-xl z-50"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute top-2 right-4 cursor-pointer">
              <Hamburger toggled={isOpen} toggle={setIsOpen} />
            </div>
            <Link
              href="/products"
              className={`mb-2 pt-3 pb-1 text-white border-b-4 ${
                all ? "border-white border-solid" : "border-none"
              }`}
            >
              All Products
            </Link>
            <Link
              href="/products/bags"
              className={`mb-2 pt-3 pb-1 text-white border-b-4 ${
                bags ? "border-white border-solid" : "border-none"
              }`}
            >
              Bags
            </Link>
            <Link
              href="/products/bottles"
              className={`mb-2 pt-3 pb-1 text-white border-b-4 ${
                bottles ? "border-white border-solid" : "border-none"
              }`}
            >
              Bottles
            </Link>
            <Link
              href="/products/household-supplies"
              className={`mb-2 pt-3 pb-1 text-white border-b-4 ${
                householdSupplies ? "border-white border-solid" : "border-none"
              }`}
            >
              Household Supplies
            </Link>
            <Link
              href="/products/personal-care"
              className={`mb-2 pt-3 pb-1 text-white border-b-4 ${
                personalCare ? "border-white border-solid" : "border-none"
              }`}
            >
              Personal Care
            </Link>
          </AnimatedDiv>
        </>
      )}
    </header>
  )
}

export default Header
