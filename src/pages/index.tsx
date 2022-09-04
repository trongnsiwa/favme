import { Button } from "@material-tailwind/react";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fav.me</title>
        <meta name="description" content="An app made by trongnsi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto min-h-screen">
        <Button variant="gradient">Button</Button>
      </main>
    </>
  );
};

export default Home;
