import React from "react";
import Link from "next/link";
import { IconHeart } from "@tabler/icons";

const Footer: React.FC = () => {

  return (
    <div className="flex flex-col text-center items-center justify-between px-4 py-12 md:px-8 md:py-16 md:text-left md:flex-row bg-custom-green text-white">
      <div className="flex flex-col order-last pt-8 md:pt-0">
        <p className="pb-2">
          As an Amazon Associate we earn from qualifying purchases.
        </p>
        <p className="pb-2 text-white">
          Made with <IconHeart size={19} className="inline-block mb-1" /> in San Diego.
        </p>
        <span className="pb-2 text-white">© 2021 OmitPlastic</span>
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
    </div>
  );
};

export default Footer;
