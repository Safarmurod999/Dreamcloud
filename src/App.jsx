import "./App.css";
import Home from "./pages/Home/Home";
import { Route, Router, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Admin/Login/Login";
import AdminPanel from "./pages/Admin/AdminPanel/AdminPanel";
function App() {
  const route = useLocation();
  return (
    <>
      {route.pathname == "/" ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </>
      ) : route.pathname.startsWith("/admin") ? (
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;
