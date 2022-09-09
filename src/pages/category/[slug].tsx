import FavCard from "@components/fav-card";
import Loader from "@components/loader";
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { trpc } from "src/utils/trpc";
import noFoundImage from "@public/bookmark.png";
import Image from "next/image";

function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, refetch, isLoading, status } = trpc.useInfiniteQuery(
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
                <FavCard key={favorite.categoryId} favorite={favorite} refetch={refetch} />
              ))}
            </div>
          ))}
      </div>
      {data && data.pages[0]?.favorites.length === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-center mb-5">
            <Image
              src={noFoundImage}
              alt="Save icons created by bqlqn - Flaticon"
              width="120"
              height="120"
            />
          </div>

          <Typography variant="h3" className="w-full text-white font-bold">
            No favorites found
          </Typography>
        </div>
      )}
      {isLoading && <Loader size={50} inButton={false} />}

      <span style={{ visibility: "hidden" }} ref={ref}>
        intersection observer marker
      </span>
    </>
  );
}

export default CategoryPage;
