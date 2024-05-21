import Login from "../Admin/Login/Login";
import { useLocation } from "react-router-dom";
import { Navbar, Footer, AdminNavbar, Sidebar } from "../../components/index";
import { useState } from "react";
const Layout = ({ children }) => {
  const route = useLocation();
  const [toggle, setToggle] = useState(false);
  return (
    <main className="main">
      {route.pathname == "/" ? (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      ) : route.pathname.startsWith("/admin") ? (
        <div className="flex flex-row min-h-full flex-1 w-full">
          <Sidebar toggle={toggle} setToggle={setToggle}/>
          <div
            className={`min-h-full absolute right-0 ${
              toggle ? "toggle" : "layout "
            }`}
          >
            <AdminNavbar toggle={toggle} setToggle={setToggle} />
            {children}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </main>
  );
};

export default Layout;
