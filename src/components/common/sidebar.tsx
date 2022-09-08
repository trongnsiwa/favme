import { useStore } from "src/store/store";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import favmeLogo from "@public/favme-white-text-logo.png";
import { trpc } from "src/utils/trpc";
import { DynamicFaIcon } from "@components/dynamic-icon";
import * as Icons from "react-icons/fa";

function Sidebar() {
  const router = useRouter();

  const openSidebar = useStore((state) => state.openSidebar);

  const { data, isLoading } = trpc.useQuery(["categories.categories"]);

  return (
    <AnimatePresence initial={false}>
      {openSidebar && (
        <motion.div
          className="bg-fav-600 h-screen fixed"
          initial={{ width: "0", x: "-100%" }}
          animate={{
            width: "280px",
            x: 0
          }}
          exit={{
            width: "0",
            x: "-100%"
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          <div className="border-b border-b-fav-200">
            <div className="w-3/5 p-3">
              <Image src={favmeLogo} alt="Favme" objectFit="fill" />
            </div>
          </div>

          <ul className="flex flex-col p-4 overflow-y-auto text-base-content h-[calc(100vh-80px)] relative">
            {isLoading
              ? Array.from(Array(20), (e, i) => i + 1).map(() => (
                  <>
                    <li className="bg-fav-500 rounded-lg mb-2 animate-pulse">
                      <div className={`flex items-center m-4 cursor-pointer gap-3`}>
                        <div className="w-8 h-8 rounded-full bg-fav-400" />
                        <div className="w-32 h-4 rounded-sm bg-fav-400" />
                      </div>
                    </li>
                  </>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
