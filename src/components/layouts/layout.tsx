import Navbar from "../common/navbar";

type LayoutProps = { children: React.ReactNode };

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <div className="w-full bg-fav-400 h-screen">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default Layout;
