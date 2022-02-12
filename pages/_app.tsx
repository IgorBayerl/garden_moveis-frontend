import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* <link rel="icon" href="/images/favicon.png" /> */}
        {/* <meta name="google-site-verification" content="rL0WQyAInIZEBhPV5C40ssChKzgnRDx3heD93UtoJfs" /> */}
        <title>Garden Moveis</title>
        <meta name="description" content="" />
        <meta
          name="keywords"
          content="Garden, Wood, Moveis, Furniture, Madeira"
        />
        <meta name="author" content="Igor Bayerl" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
