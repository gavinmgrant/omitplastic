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
    <div className="flex items-center justify-between p-4 h-16">
      <span>© 2021 OmitPlastic</span>
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
