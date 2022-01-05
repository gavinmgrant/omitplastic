import React from "react";
import Link from "next/link";
import { IconHeart } from "@tabler/icons";
import { IconBrandTwitter } from "@tabler/icons";

const Footer: React.FC = () => {
  const year =  new Date().getFullYear();

  return (
    <footer className="bg-custom-green text-white text-center pb-3">
      <section className="flex flex-col items-center justify-between px-4 py-8 md:px-8 md:py-12 md:text-left md:flex-row ">
        <div className="flex flex-col order-last pt-8 md:pt-0">
          <p className="pb-2">
            As an Amazon Associate we earn from qualifying purchases.
          </p>
          <p className="pb-2 text-white">
            Made with <IconHeart size={19} className="inline-block mb-1" /> in
            San Diego.
          </p>
          <Link href="/server-sitemap.xml">
            <a className="pb-2 text-white">Sitemap</a>
          </Link>
        </div>
        <div className="flex flex-col text-center md:text-right md:order-last">
          <Link href="/faq">
            <a className="pb-2 text-white">Frequently Asked Questions</a>
          </Link>
          <Link href="/terms">
            <a className="pb-2 text-white">Terms and Conditions</a>
          </Link>
          <Link href="/privacy">
            <a className="pb-2 text-white">Privacy Policy</a>
          </Link>
        </div>
      </section>
      <div className="flex justify-center">
        <a href="https://twitter.com/OmitPlastic" target="_blank" rel="noreferrer" className="text-white mr-3">
          <IconBrandTwitter />
        </a>
        <p className="pb-2 text-white">© {year} OmitPlastic</p>
      </div>
    </footer>
  );
};

export default Footer;
