import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { hasCookie, setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { trpc } from "src/utils/trpc";
import { defaultCategories } from "src/schemas/category.schema";
import { useStore } from "src/store/store";

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const ownCategories = useStore((state) => state.ownCategories);
  const refetchCategories = useStore((state) => state.refetchCategories);

  if (status === "unauthenticated") {
    router.replace("/login");
  }

  const { mutate } = trpc.useMutation(["categories.create-category"]);

  const generateDefaultCategories = useCallback(() => {
    defaultCategories.forEach((category, index) => {
      if (index === defaultCategories.length - 1) {
        refetchCategories();
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
      if (!hasCookie("pageVisited") && session?.user) {
        generateDefaultCategories();
      } else {
        refetchCategories();
      }
    }
  }, [ownCategories]);

  return <></>;
};

export default Home;
