import React, { useState } from "react";
import { Link } from "react-router-dom";
import { adminRoutes } from "../../data/data";
import dreamcloud from "../../assets/images/navbar/download.svg";
import toggle_nav from "../../assets/icons/toggle.svg";
const Sidebar = ({ toggle }) => {
  let username = JSON.parse(localStorage.getItem("username")) || "User";
  const [activeRoute, setActiveRoute] = useState(
    JSON.parse(sessionStorage.getItem("activeRoute")) || 0
  );
  const isSuperAdmin =
    JSON.parse(localStorage.getItem("isSuperAdmin")) || false;
  return (
    <aside
      className={`flex flex-col fixed top-0 left-0 z-3 h-screen px-2 py-8 overflow-y-auto bg-gray-800 sidebar ${
        toggle ? "w-[50px] px-1" : "w-[350px] "
      } `}
    >
      <a className="flex gap-4 cursor-pointer" to="/admin/profile">
        {" "}
        {toggle ? (
          <img
            className={`w-full max-w-[40px] mx-auto rounded-full delay-0`}
            src={toggle_nav}
            alt="Your Company"
          />
        ) : (
          <img
            className={`w-[60%] mx-auto rounded-full delay-0`}
            src={dreamcloud}
            alt="Your Company"
          />
        )}
      </a>

      <div className="flex flex-col justify-between border-t border-gray-500 pt-4 flex-1 mt-6">
        <nav className="space-y-6 ">
          <div className="space-y-3 ">
            <label
              className={`px-3 text-xs text-gray-500 uppercase ${
                toggle ? "hidden" : "flex"
              }`}
            >
              analytics
            </label>

            {adminRoutes.map((item) => {
              if (item.path !== "/admin/admins") {
                return (
                  <Link
                    key={item.id}
                    className={`flex items-center px-3 py-2 text-white-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-700 hover:text-gray-700 ${
                      activeRoute === item.id ? "bg-gray-700 text-gray-700" : ""
                    } ${toggle ? "justify-center px-[5px] py-1" : "justify-start"}`}
                    to={item.path}
                    onClick={() => {
                      setActiveRoute(item.id);
                      sessionStorage.setItem("activeRoute", item.id);
                    }}
                  >
                    {item.icon}
                    <span
                      className={`${
                        toggle ? "hidden" : "flex"
                      } mx-2 text-lg text-white font-medium`}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              } else {
                if (isSuperAdmin) {
                  return (
                    <Link
                      key={item.id}
                      className={`flex items-center px-3 py-2 text-white-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-700 hover:text-gray-700 ${
                        activeRoute === item.id
                          ? "bg-gray-700 text-gray-700"
                          : ""
                      } ${toggle ? "justify-center" : "justify-start"}`}
                      to={item.path}
                      onClick={() => {
                        setActiveRoute(item.id);
                        sessionStorage.setItem("activeRoute", item.id);
                      }}
                    >
                      {item.icon}
                      <span
                        className={`${
                          toggle ? "hidden" : "flex"
                        } mx-2 text-lg text-white font-medium`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  );
                }
              }
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
