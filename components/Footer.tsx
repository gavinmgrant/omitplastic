import React from "react";
import Link from "next/link";
import { IconHeart } from "@tabler/icons-react";
import { IconBrandGithub } from "@tabler/icons-react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-custom-green text-white text-center pb-3">
      <section className="flex flex-col items-center justify-between px-4 py-8 md:px-8 md:py-12 md:text-left md:flex-row ">
        <div className="flex flex-col order-last pt-8 md:pt-0">
          <p className="pb-2">
            As an Amazon Associate we earn from qualifying purchases.
          </p>
          <p className="pb-2 text-white">
            Made with <IconHeart size={19} className="inline-block mb-1" /> in
            San Diego, California.
          </p>
          <Link href="/server-sitemap.xml" className="pb-2 text-white">
            Sitemap
          </Link>
        </div>
        <div className="flex flex-col text-center md:text-right md:order-last">
          <Link href="/faq" className="pb-2 text-white">
            Frequently Asked Questions
          </Link>
          <Link href="/terms" className="pb-2 text-white">
            Terms and Conditions
          </Link>
          <Link href="/privacy" className="pb-2 text-white">
            Privacy Policy
          </Link>
        </div>
      </section>
      <div className="flex justify-center">
        <a
          href="https://github.com/gavinmgrant/omitplastic"
          target="_blank"
          rel="noreferrer"
          className="text-white mr-3"
        >
          <IconBrandGithub />
        </a>
        <p className="pb-2 text-white">© {year} OmitPlastic</p>
      </div>
    </footer>
  );
};

export default Footer;
