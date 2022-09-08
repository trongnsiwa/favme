import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
  Typography
} from "@material-tailwind/react";
import Image from "next/image";
import React, { useRef } from "react";
import noImage from "@public/no-image.png";
import addIcon from "@public/add.png";
import { IoAddOutline } from "react-icons/io5";

type AddNewDialogProps = {
  open: boolean;
  handleOpen: () => void;
};

function AddNewDialog({ open, handleOpen }: AddNewDialogProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 }
      }}
      className="p-5"
      size="lg"
    >
      <DialogHeader className="!font-bold !text-3xl text-fav-300">
        <Image
          src={addIcon}
          alt="Plus icons created by AB Design - Flaticon"
          width={45}
          height={45}
        />
        Add New Favourite
      </DialogHeader>
      <DialogBody className="block max-h-[60vh] overflow-y-auto">
        <Typography
          variant="paragraph"
          className="font-semibold text-fav-500 mb-2 flex justify-between items-center"
        >
          1. Choose image cover: <span className="text-red-300 text-xs">Bắt buộc(*)</span>
        </Typography>
        <div className="flex items-start gap-3 w-full">
          <div className="border-dashed border-2 border-gray-400 py-12 px-5 flex flex-col justify-center items-center w-full">
            <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center text-center">
              <span>Drag and drop your image here or</span>
            </p>
            <input type="file" multiple={false} className="hidden" ref={fileRef} accept="image/*" />
            <button
              className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-fav-300 hover:text-white focus:shadow-outline focus:outline-none"
              onClick={() => fileRef?.current?.click()}
            >
              Upload a file
            </button>
          </div>
          <div className="border-dashed border-2 border-gray-400 flex flex-col justify-center items-center relative w-full">
            <Image src={noImage} alt="No Image Selected" objectFit="cover" />
            <span className="text-gray-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              No image selected
            </span>
          </div>
        </div>
        <Typography
          variant="paragraph"
          className="font-semibold text-fav-500 mb-2 flex justify-between mt-5 items-center"
        >
          2. Information about favorite: <span className="text-red-300 text-xs">Bắt buộc(*)</span>
        </Typography>
        <div className="mt-3">
          <Input
            variant="outlined"
            size="lg"
            label="Name"
            color="light-green"
            className="text-base"
          />
        </div>
        <div className="mt-3">
          <Textarea
            variant="outlined"
            size="lg"
            label="Description"
            color="light-green"
            className="text-base"
          />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Input
            variant="outlined"
            size="lg"
            label="Slug"
            color="light-green"
            className="text-base placeholder-transparent focus:placeholder-gray-500 flex-1 w-max"
            placeholder="/your-fav"
          />
          <Button
            variant="text"
            color="gray"
            type="button"
            className="!normal-case text-fav-500 text-sm hover:!bg-fav-100 hover:!text-black !text-center w-1/4"
          >
            Generate
          </Button>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="gray"
          onClick={handleOpen}
          className="mr-1 !normal-case"
          size="lg"
        >
          <span>Cancel</span>
        </Button>
        <Button
          className="!normal-case btn-add !bg-fav-200 hover:!bg-fav-300 hover:!text-white"
          onClick={handleOpen}
        >
          <IoAddOutline className="w-6 h-6 mr-1" />
          <span>Add Fav</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default AddNewDialog;
