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
    <div className="flex flex-col text-center items-center justify-between px-4 py-6 md:text-left md:flex-row">
      <span>© 2021 OmitPlastic</span>
      <p>As an Amazon Associate I earn from qualifying purchases.</p>
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
