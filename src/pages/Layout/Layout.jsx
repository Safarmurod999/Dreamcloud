import Login from "../Admin/Login/Login";
import { useLocation } from "react-router-dom";
import { Navbar, Footer, AdminNavbar, Sidebar } from "../../components/index";
const Layout = ({ children }) => {
  const route = useLocation();
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
          <Sidebar />
          <div className="min-h-full w-full">
            <AdminNavbar />
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
