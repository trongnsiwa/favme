import Sidebar from "@components/common/sidebar";
import { useStore } from "src/store/store";
import Navbar from "../common/navbar";

type LayoutProps = { children: React.ReactNode };

function Layout({ children }: LayoutProps) {
  const openSidebar = useStore((state) => state.openSidebar);

  return (
    <div className="bg-fav-400 h-screen w-screen">
      <Sidebar />
      <Navbar />
      <main
        className={`overflow-auto h-[calc(100%-80px)] ${
          openSidebar ? "w-[calc(100vw-280px)]" : "w-full"
        } right-0 bottom-0 fixed p-10`}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
