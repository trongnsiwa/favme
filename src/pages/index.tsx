import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { trpc } from "src/utils/trpc";
import { defaultCategories } from "src/schemas/category.schema";
import { useStore } from "src/store/store";

const Home = ({ pageVisited }: { pageVisited: boolean }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const ownCategories = useStore((state) => state.ownCategories);

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
    if (ownCategories.length !== 0 && ownCategories[0]) {
      router.replace(`/category${ownCategories[0].slug}`);
    } else {
      if (!pageVisited && session?.user) {
        generateDefaultCategories();
      }
    }
  }, [ownCategories]);

  return <></>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { pageVisited } = ctx.req.cookies;

  return { props: { pageVisited: pageVisited ?? null } };
};

export default Home;
