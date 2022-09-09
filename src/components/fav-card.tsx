import React from "react";
import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import { AiFillStar } from "react-icons/ai";
import { DynamicFaIcon } from "./dynamic-icon";
import * as Icons from "react-icons/fa";
import { Category, Favorite, FavoriteStatus } from "@prisma/client";
import { trpc } from "src/utils/trpc";
import { toast } from "react-toastify";
import Loader from "./loader";
import { useStore } from "src/store/store";

type FavCardProps = { favorite: Favorite & { category: Category }; refetch: () => void };

function FavCard({ favorite, refetch }: FavCardProps) {
  const setFavorite = useStore((state) => state.setFavorite);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  const { mutate, isLoading } = trpc.useMutation(["favorites.change-status"], {
    onSuccess: () => {
      toast.success(favorite.status === FavoriteStatus.FAVORED ? "Unfavored!" : "Favored!", {
        icon: favorite.status === FavoriteStatus.FAVORED ? "💔" : "💚"
      });
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  const changeStatus = () => {
    mutate({
      id: favorite.id,
      status:
        favorite.status === FavoriteStatus.FAVORED
          ? FavoriteStatus.UNFAVORED
          : FavoriteStatus.FAVORED
    });
  };

  return (
    <Card className="w-[22rem] hover:shadow-lg hover:shadow-fav-200">
      <CardBody className="flex flex-col justify-between h-full">
        <div>
          <img
            src={favorite.cover}
            alt={favorite.name}
            className="h-48 w-full rounded-xl cursor-pointer hover:opacity-90 object-cover"
            onClick={() => {
              setFavorite(favorite);
              toggleFavorite();
            }}
          />
          <Typography variant="h4" className="mt-5">
            {favorite.name}
          </Typography>
          <Typography className="mt-2 font-normal line-clamp-3 overflow-ellipsis">
            {favorite.description}
          </Typography>
          <Chip
            value={favorite.category.name}
            className={`mt-2 !normal-case text-sm bg-fav-500 text-white rounded-full !py-1.5 !pr-3 !pl-5`}
            icon={
              <DynamicFaIcon
                name={favorite.category.cover as keyof typeof Icons}
                color={favorite.category.color}
                size={18}
                className="ml-2"
              />
            }
          />
        </div>

        <div className="flex justify-end">
          {isLoading ? (
            <Loader size={45} inButton={false} />
          ) : (
            <>
              {favorite.status === "UNFAVORED" ? (
                <AiFillStar
                  className="text-gray-400 w-16 h-16 hover:text-fav-200 hover:cursor-pointer"
                  onClick={changeStatus}
                />
              ) : (
                <AiFillStar
                  className="text-fav-200 w-16 h-16 hover:text-gray-400 hover:cursor-pointer"
                  onClick={changeStatus}
                />
              )}
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default FavCard;