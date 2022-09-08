import { useCallback, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { trpc } from "src/utils/trpc";
import { defaultCategories } from "src/schemas/category.schema";

const Home = ({ pageVisited }: { pageVisited: boolean }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    router.replace("/login");
  }

  const { mutate } = trpc.useMutation(["categories.create-category"]);

  const generateDefaultCategories = useCallback(() => {
    defaultCategories.forEach((category, index) => {
      if (index === defaultCategories.length + 1) {
        setCookie("pageVisited", true);
      } else {
        mutate(category);
      }
    });
  }, []);

  useEffect(() => {
    if (!pageVisited && session?.user) {
      generateDefaultCategories();
    }
  }, []);

  return <></>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { pageVisited } = ctx.req.cookies;

  return { props: { pageVisited: pageVisited ?? null } };
};

export default Home;
