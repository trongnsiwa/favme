import { useStore } from "src/store/store";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import favmeLogo from "@public/favme-white-text-logo.png";
import { trpc } from "src/utils/trpc";
import { DynamicFaIcon } from "@components/dynamic-icon";
import * as Icons from "react-icons/fa";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { BiCategory } from "react-icons/bi";

function Sidebar() {
  const router = useRouter();

  const openSidebar = useStore((state) => state.openSidebar);

  const { data, isLoading } = trpc.useQuery(["categories.categories"], {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });

  return (
    <AnimatePresence initial={false}>
      {openSidebar && (
        <motion.div
          className="bg-fav-600 h-screen top-0 left-0 fixed w-[280px]"
          initial={{ x: "-100%" }}
          animate={{
            x: "0%"
          }}
          exit={{
            x: "-100%"
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          <div className="border-b border-b-fav-200">
            <div className="w-3/5 p-3">
              <Image src={favmeLogo} alt="Favme" objectFit="fill" />
            </div>
          </div>

          <ul
            className={`flex flex-col p-4 ${
              openSidebar ? "overflow-y-auto h-[calc(100vh-80px)]" : ""
            } text-base-content relative`}
          >
            {isLoading
              ? Array.from(Array(20), (e, i) => i + 1).map((index) => (
                  <li className="bg-fav-500 rounded-lg mb-2 animate-pulse" key={`pulse_${index}`}>
                    <div className={`flex items-center m-4 cursor-pointer gap-3`}>
                      <div className="w-8 h-8 rounded-full bg-fav-400" />
                      <div className="w-32 h-4 rounded-sm bg-fav-400" />
                    </div>
                  </li>
                ))
              : data &&
                data.map((category, index) => (
                  <li
                    className={`mb-2 text-white ${
                      router.pathname.length > 1 &&
                      router.pathname.startsWith(category.slug) &&
                      category.slug.length > 1
                        ? `font-bold bg-fav-500 rounded-lg`
                        : `hover:bg-fav-500 hover:rounded-lg hover:font-bold`
                    }`}
                    key={`category_${index}`}
                  >
                    <Link href={category.slug}>
                      <div className={`flex items-center m-4 cursor-pointer gap-3`}>
                        <DynamicFaIcon
                          name={category.cover as keyof typeof Icons}
                          color={category.color}
                        />
                        <p>{category.name}</p>
                      </div>
                    </Link>
                  </li>
                ))}
          </ul>

          <div className="absolute z-10 bottom-10 left-1/2 -translate-x-1/2">
            <Tooltip
              content="Manage Category"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 }
              }}
            >
              <IconButton
                size="lg"
                className="!rounded-full bg-fav-200 !opacity-100 !w-16 !h-16 !max-w-none !max-h-fit shadow-fav-200/20 hover:!shadow-fav-200/40"
              >
                <BiCategory className="!w-8 !h-8 text-white" />
              </IconButton>
            </Tooltip>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
