import { AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useStore } from "src/store/store";
import { useBoolean, useMediaQuery, useOnClickOutside } from "usehooks-ts";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar as MTNavbar
} from "@material-tailwind/react";
import { RiBarChartHorizontalFill, RiMenu2Line } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const { setFalse, toggle } = useBoolean(false);
  const matches = useMediaQuery("(min-width: 1440px)");

  const router = useRouter();
  const menuRef = useRef(null);

  const openSidebar = useStore((state) => state.openSidebar);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  const { data: session } = useSession();

  const logOut = () => {
    signOut();
    router.replace("/login");
    router.reload();
  };

  useOnClickOutside(menuRef, setFalse);

  return (
    <AnimatePresence initial={false}>
      <MTNavbar
        className={`mb-2 bg-fav-200 shadow-lg px-3 fixed rounded-none border-none ${
          !openSidebar ? "w-[calc(100%-80px)]" : "w-[calc(100%-280px)]"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between w-full">
          <IconButton
            className={matches ? "hidden" : "btn-icon"}
            variant="outlined"
            onClick={() => toggleSidebar()}
            size="lg"
          >
            <RiBarChartHorizontalFill className="w-8 h-8" />
          </IconButton>
          <Menu lockScroll={true}>
            <MenuHandler>
              <Button variant="text" onClick={toggle} className="btn-avatar">
                <Avatar
                  className="avatar cursor-pointer"
                  variant="circular"
                  src={
                    session && session.user?.image
                      ? session.user?.image
                      : "https://vectorified.com/images/unknown-avatar-icon-7.jpg"
                  }
                  size="lg"
                />
              </Button>
            </MenuHandler>
            <MenuList>
              <p className="text-sm font-semibold text-fav-600 mb-2" suppressHydrationWarning>
                {session ? `Hi, ${session.user?.name}!` : ""}
              </p>
              <MenuItem className="menu-item">
                <Button variant="text" onClick={logOut} className="btn-menu" ripple={false}>
                  <IoLogOutOutline className="inline-block w-5 h-5 mr-2" />
                  Đăng xuất
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </MTNavbar>
    </AnimatePresence>
  );
}

export default Navbar;
