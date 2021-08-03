import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";

const Footer: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const [session] = useSession();

  return (
    <div className="flex flex-col text-center items-center justify-between px-4 py-8 md:px-8 md:text-left md:flex-row bg-black text-white">
      <div className="flex flex-col order-last pt-8 md:pt-0">
        <p className="pb-1">
          As an Amazon Associate we earn from qualifying purchases.
        </p>
        <span>© 2021 OmitPlastic</span>
      </div>
      <div className="flex flex-col text-center md:text-right md:order-last">
        <div className="pb-1">
          <Link href="/terms">Terms and Conditions</Link>
        </div>
        <Link href="/privacy">Privacy Policy</Link>
      </div>
      {/* <nav>
        {!session ? (
          <div className="text-right">
            <Link href="/api/auth/signin">
              <a data-active={isActive("/signup")}>Log in</a>
            </Link>
          </div>
        ) : (
          <button onClick={() => signOut()} className="ml-4">
            <a>Log out</a>
          </button>
        )}
      </nav> */}
    </div>
  );
};

export default Footer;
