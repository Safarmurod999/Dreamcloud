import { useState } from "react";

import "./App.css";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Admin/Login/Login";
import AdminPanel from "./pages/Admin/AdminPanel/AdminPanel";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
