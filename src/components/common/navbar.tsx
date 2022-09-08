import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useStore } from "src/store/store";
import { useBoolean, useOnClickOutside } from "usehooks-ts";
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
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";

function Navbar() {
  const { setFalse, toggle } = useBoolean(false);

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
        className={`bg-fav-200 shadow-lg px-3 fixed rounded-none border-none right-0 ${
          openSidebar ? "w-[calc(100%-280px)]" : "w-full"
        } h-[80px] max-w-none`}
      >
        <div className="flex items-center justify-between h-full w-full">
          <IconButton
            className="btn-icon"
            variant="outlined"
            onClick={() => toggleSidebar(!openSidebar)}
            size="lg"
          >
            <RiBarChartHorizontalFill className="w-8 h-8" />
          </IconButton>
          <Menu lockScroll={true}>
            <MenuHandler>
              <Button variant="text" onClick={toggle} className="btn-avatar">
                <Avatar
                  className="avatar cursor-pointer bg-white"
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
                  Logout
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
