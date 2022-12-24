import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.amboss.space/graphql",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Amboss Demo - Channel Explorer</title>
        <meta
          name="description"
          content="Explore lightning network nodes and channels."
        />
        <meta name="theme-color" content="#FF0080" />
        <meta
          name="keywords"
          content="bitcoin, lightning, nodes, explorer, channels, amboss, secondl1ght"
        />
        <meta name="author" content="secondl1ght" />
        <meta property="og:type" content="website" />
        <meta
          property="twitter:description"
          content="Explore lightning network nodes and channels."
        />
        <meta property="twitter:site" content="@secondl1ght" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="lightning" content="lnurlp:secondl1ght@getalby.com" />
        <meta property="alby:image" content="/images/secondl1ght.png" />
        <meta property="alby:name" content="Amboss Demo - secondl1ght" />
        <meta
          property="og:image"
          content="https://amboss-demo.vercel.app/images/opengraph.png"
        />
        <meta
          property="twitter:title"
          content="Amboss Demo - Channel Explorer"
        />
        <meta
          property="twitter:image"
          content="https://amboss-demo.vercel.app/images/opengraph.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
