import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
  Textarea,
  Typography
} from "@material-tailwind/react";
import Image from "next/image";
import React, { useRef } from "react";
import noImage from "@public/no-image.png";
import infoImage from "@public/about.png";
import { IoAddOutline } from "react-icons/io5";
import { useStore } from "src/store/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import slugify from "slugify";
import { testImage } from "src/utils/valid-image";
import { trpc } from "src/utils/trpc";
import Loader from "@components/loader";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useBoolean, useOnClickOutside } from "usehooks-ts";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { VscOpenPreview } from "react-icons/vsc";

interface EditValues {
  name: string;
  description: string;
  slug: string;
  category: string;
  cover: string;
}

function FavDetailDialog() {
  const open = useStore((state) => state.showFavorite);
  const handleOpen = useStore((state) => state.toggleFavorite);
  const favorite = useStore((state) => state.favorite);

  const { toggle, setFalse: backToView, value: isEdit } = useBoolean(false);
  const menuRef = useRef(null);
  const { setFalse, setTrue, value: outsideMenu } = useBoolean(true);

  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const ownCategories = useStore((state) => state.ownCategories);

  const { mutate, isLoading } = trpc.useMutation(["favorites.create-favorite"], {
    onSuccess: () => {
      formik.resetForm();
      handleOpen();
      router.push(`/category${ownCategories.find((c) => c.id === formik.values.category)?.slug}`);
      toast.success("Create favorite successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  const initialValues: EditValues = {
    name: favorite?.name || "",
    description: favorite?.description || "",
    slug: favorite?.slug || "",
    category: favorite?.category.id || "",
    cover: favorite?.cover || ""
  };

  const editSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too short!").max(100, "Too long!").required("Name is required"),
    description: Yup.string()
      .min(5, "Too short!")
      .max(300, "Too long!")
      .required("Description is required"),
    slug: Yup.string()
      .min(2, "Too short!")
      .max(30, "Too long!")
      .required("Slug is required")
      .matches(/^\/[a-z0-9-]+$/, 'Slug must start with "/", lowercase, numbers and dashes only'),
    category: Yup.string().required("Category is required"),
    cover: Yup.string()
      .required("Cover is required")
      .test("valid-image-url", "Must use valid image URL", (value) =>
        testImage(value!, 1000).then((status) => status === "success")
      )
  });

  const handleSubmit = (values: EditValues) => {
    mutate(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: editSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    onReset(values, formikHelpers) {
      formikHelpers.setValues(initialValues);
    }
  });

  useOnClickOutside(menuRef, () => setTrue());

  return (
    <Dialog
      open={open && favorite != null}
      handler={() => {
        backToView();
        handleOpen();
        formik.resetForm();
      }}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 }
      }}
      className="p-5"
      size="lg"
      dismiss={{
        outsidePointerDown: outsideMenu ? true : false
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogHeader className="flex justify-between items-center">
          <div className="!font-bold !text-3xl text-fav-300 flex items-center gap-1">
            <Image
              src={infoImage}
              alt="Plus icons created by AB Design - Flaticon"
              width={45}
              height={45}
            />
            {favorite?.name}
          </div>
          <Menu placement="bottom-end">
            <MenuHandler onClick={() => setFalse()} ref={menuRef}>
              <IconButton className="btn-icon !rounded-full" variant="outlined" size="md">
                <BiDotsVerticalRounded className="w-8 h-8" />
              </IconButton>
            </MenuHandler>
            <MenuList className="z-[10000]">
              <MenuItem>
                <Button
                  type="button"
                  variant="text"
                  className="btn-menu !normal-case !py-2"
                  ripple={false}
                  onClick={() => {
                    toggle();
                    formik.resetForm();
                  }}
                >
                  {isEdit ? (
                    <>
                      <VscOpenPreview className="inline-block w-5 h-5 mr-2" />
                      View favorite
                    </>
                  ) : (
                    <>
                      <AiOutlineEdit className="inline-block w-5 h-5 mr-2" />
                      Edit favorite
                    </>
                  )}
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  type="button"
                  variant="text"
                  className="btn-menu !normal-case !py-2"
                  ripple={false}
                  onClick={() => {
                    console.log("first");
                  }}
                >
                  <AiOutlineDelete className="inline-block w-5 h-5 mr-2" />
                  Delete favorite
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </DialogHeader>
        <DialogBody className="block max-h-[60vh] overflow-y-auto">
          <Typography
            variant="paragraph"
            className={`font-semibold text-fav-500 mb-2 flex justify-between items-center ${
              isEdit ? "" : "hidden"
            }`}
          >
            1. Choose image cover: <span className="text-red-300 text-xs">Bắt buộc(*)</span>
          </Typography>
          <div className="flex flex-col-reverse items-center gap-5 w-full">
            <div className="flex flex-col justify-center w-full">
              <div className="border-dashed border-2 border-gray-400 py-12 px-5 flex-col justify-center items-center bg-blue-gray-50 cursor-not-allowed hidden">
                <p className="font-semibold text-gray-900 flex flex-wrap justify-center text-center">
                  <span>Drag and drop your image here or</span>
                </p>
                <input
                  type="file"
                  multiple={false}
                  className="hidden"
                  ref={fileRef}
                  accept="image/*"
                />
                <button
                  className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-fav-300 hover:text-white disabled:hover:text-inherit focus:shadow-outline focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={true}
                  onClick={() => fileRef?.current?.click()}
                >
                  Upload a file
                </button>
              </div>
              <span className="text-sm text-center my-3 hidden">Or</span>
              <div className={`${isEdit ? "" : "hidden"}`}>
                <Input
                  variant="outlined"
                  size="lg"
                  label="Image link"
                  color="light-green"
                  className="text-base placeholder-transparent focus:placeholder-gray-500 flex-1 w-max"
                  placeholder="https://"
                  name="cover"
                  onChange={formik.handleChange}
                  value={formik.values.cover}
                  error={formik.errors.cover != null && formik.touched.cover != null}
                  success={formik.errors.cover == null && formik.touched.cover != null}
                />
              </div>
              {isEdit && formik.errors.cover && formik.touched.cover && (
                <div className="error-msg">{formik.errors.cover}</div>
              )}
            </div>

            <div className="border-dashed border-2 border-gray-400 flex flex-col justify-center items-center relative cursor-default">
              {(isEdit && formik.errors.cover != null) ||
              (!isEdit && formik.values.cover === "") ? (
                <>
                  <Image
                    src={noImage}
                    alt="No Image Selected"
                    objectFit="cover"
                    width={300}
                    height={300}
                  />
                  <span className="text-gray-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:opacity-80">
                    No image selected
                  </span>
                </>
              ) : (
                <img src={formik.values.cover} alt={formik.values.cover} className="object-cover" />
              )}
            </div>
          </div>
          <Typography
            variant="paragraph"
            className={`font-semibold text-fav-500 mb-2 flex justify-between mt-5 items-center ${
              isEdit ? "" : "hidden"
            }`}
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
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.errors.name != null && formik.touched.name != null}
              success={formik.errors.name == null && formik.touched.name != null}
              readOnly={!isEdit}
            />
            {isEdit && formik.errors.name && formik.touched.name && (
              <div className="error-msg">{formik.errors.name}</div>
            )}
          </div>
          <div className="mt-3">
            <Textarea
              variant="outlined"
              size="lg"
              label="Description"
              color="light-green"
              className="text-base"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              error={formik.errors.description != null && formik.touched.description != null}
              success={formik.errors.description == null && formik.touched.description != null}
              readOnly={!isEdit}
            />
            {isEdit && formik.errors.description && formik.touched.description && (
              <div className="error-msg">{formik.errors.description}</div>
            )}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <Input
              variant="outlined"
              size="lg"
              label="Slug"
              color="light-green"
              className="text-base placeholder-transparent focus:placeholder-gray-500 flex-1 w-max"
              placeholder="/your-fav"
              name="slug"
              onChange={formik.handleChange}
              value={formik.values.slug}
              error={formik.errors.slug != null && formik.touched.slug != null}
              success={formik.errors.slug == null && formik.touched.slug != null}
              readOnly={!isEdit}
            />
            <Button
              variant="text"
              color="gray"
              type="button"
              className={`!normal-case text-fav-500 text-sm hover:!bg-fav-100 hover:!text-black !text-center w-1/4 ${
                isEdit ? "" : "hidden"
              }`}
              onClick={() =>
                formik.setFieldValue(
                  "slug",
                  "/" + slugify(formik.values.name, { remove: /[*+~.()'"!:@]/g, lower: true })
                )
              }
            >
              Generate
            </Button>
          </div>
          {isEdit && formik.errors.slug && formik.touched.slug && (
            <div className="error-msg">{formik.errors.slug}</div>
          )}
          <Typography
            variant="paragraph"
            className={`font-semibold text-fav-500 mb-2 flex justify-between mt-5 items-center ${
              isEdit ? "" : "hidden"
            }`}
          >
            3. Choose category: <span className="text-red-300 text-xs">Bắt buộc(*)</span>
          </Typography>
          <div className={`${isEdit ? "" : "mt-3"}`}></div>
          <Select
            label="Select Category"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 }
            }}
            color="light-green"
            onChange={(value) => formik.setFieldValue("category", value)}
            value={formik.values.category}
            error={formik.errors.category != null && formik.touched.category != null}
            success={formik.errors.category == null && formik.touched.category != null}
            disabled={!isEdit}
          >
            {ownCategories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
          {isEdit && formik.errors.category && formik.touched.category && (
            <div className="error-msg">{formik.errors.category}</div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={() => formik.resetForm()}
            className={`mr-1 !normal-case ${isEdit ? "" : "hidden"}`}
            size="lg"
          >
            <span>Reset</span>
          </Button>
          <Button
            className={`!normal-case btn-add !bg-fav-200 hover:!bg-fav-300 hover:!text-white ${
              isEdit ? "" : "hidden"
            }`}
            type="submit"
            disabled={formik.isSubmitting || isLoading}
          >
            {isLoading ? <Loader /> : <AiOutlineEdit className="w-6 h-6 mr-1" />}
            <span>Edit Fav</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}

export default FavDetailDialog;
