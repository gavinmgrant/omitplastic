import { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import * as ga from "../lib/ga";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
};

export default App;
