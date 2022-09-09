import FavCard from "@components/fav-card";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { trpc } from "src/utils/trpc";

function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const { ref, inView } = useInView();

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    trpc.useInfiniteQuery(
      [
        "favorites.get-favorites",
        {
          category: "/" + slug,
          limit: 10
        }
      ],
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor
      }
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {data &&
          data.pages.map((page) => (
            <div key={page.nextCursor ?? "lastPage"}>
              {page.favorites.map((favorite) => (
                <FavCard key={favorite.categoryId} favorite={favorite} />
              ))}
            </div>
          ))}
      </div>

      <span style={{ visibility: "hidden" }} ref={ref}>
        intersection observer marker
      </span>
    </>
  );
}

export default CategoryPage;
