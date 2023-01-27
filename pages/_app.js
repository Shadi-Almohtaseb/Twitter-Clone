import { AuthContextProvider } from "../src/context/AuthContext";
import "../styles/globals.css";
import LoadingSpinner from "../src/components/LoadingSpinner.jsx";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { RecoilRoot } from "recoil";

function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return loading && <LoadingSpinner />;
}

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <RecoilRoot>
        <Loading />
        <Component {...pageProps} />
      </RecoilRoot>
    </AuthContextProvider>
  );
}

export default MyApp;
