import React from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  let route = useLocation();
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="text-indigo-500 font-bold text-7xl">404</div>

        <div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
          Bunday sahifa mavjud emas
        </div>

        <div className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
          Siz qidirayotgan sahifa topilmadi.
        </div>
        {route.pathname.startsWith("/admin") ? (
          <Link
            to={"/admin"}
            className="mt-5 border-2 px-6 py-4 rounded-lg text-indigo-500 border-indigo-500"
          >
            Bosh sahifa
          </Link>
        ) : (
          <Link
            to={"/"}
            className="mt-5 border-2 px-6 py-4 rounded-lg text-indigo-500 border-indigo-500"
          >
            Bosh sahifa
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFound;
