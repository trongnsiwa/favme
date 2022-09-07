import { Button } from "@material-tailwind/react";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useStore } from "src/store/store";
import LoginPage from "./login";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    router.replace("/login");
  }

  return (
    <>
      <main className="container mx-auto min-h-screen">
        <Button variant="gradient" onClick={() => signOut()}>
          Logout
        </Button>
      </main>
    </>
  );
};

export default Home;
