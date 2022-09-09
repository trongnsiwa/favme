import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Typography, Chip } from "@material-tailwind/react";
import { AiFillStar } from "react-icons/ai";
import { DynamicFaIcon } from "./dynamic-icon";
import * as Icons from "react-icons/fa";
import { Category, Favorite } from "@prisma/client";

function FavCard({ favorite }: { favorite: Favorite & { category: Category } }) {
  return (
    <Card className="w-96">
      <CardHeader className="relative h-56 bg-fav-200">
        <img src={favorite.cover} alt={favorite.name} className="h-full w-full" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {favorite.name}
        </Typography>
        <Typography>{favorite.description}</Typography>
        <Chip
          value={favorite.category.name}
          className={`mt-2 bg-fav-500 text-white`}
          icon={
            <DynamicFaIcon
              name={favorite.category.cover as keyof typeof Icons}
              color={favorite.category.color}
            />
          }
        />
      </CardBody>
      <CardFooter className="flex items-center justify-end">
        {favorite.status === "FAVORED" ? (
          <AiFillStar className="text-white" />
        ) : (
          <AiFillStar className="text-fav-200" />
        )}
      </CardFooter>
    </Card>
  );
}

export default FavCard;
