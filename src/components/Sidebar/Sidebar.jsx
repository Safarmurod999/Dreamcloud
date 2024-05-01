import React, { useState } from "react";
import { Link } from "react-router-dom";
import { adminRoutes } from "../../data/data";

const Sidebar = () => {
  let username = JSON.parse(localStorage.getItem("username")) || "User";
  const [activeRoute, setActiveRoute] = useState(0);
  const isSuperAdmin =
  JSON.parse(localStorage.getItem("isSuperAdmin")) || false;
  return (
    <aside className="flex flex-col w-[350px] h-screen px-5 py-8 overflow-y-auto bg-gray-800 sidebar">
      <a className="flex gap-4 cursor-pointer" to="/admin/profile">
        {" "}
        <img
          className="h-12 w-12 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Your Company"
        />
        <span className="text-white text-xl mt-3 text-center capitalize">
          {username}
        </span>
      </a>

      <div className="flex flex-col justify-between border-t border-gray-500 pt-4 flex-1 mt-6">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-xs text-gray-500 uppercase">
              analytics
            </label>

            {adminRoutes.map((item) => {
              if (item.path !== "/admin/admins") {
                return (
                  <Link
                    key={item.id}
                    className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-700 hover:text-gray-700 ${
                      activeRoute === item.id ? "bg-gray-700 text-gray-700" : ""
                    }`}
                    to={item.path}
                    onClick={() => setActiveRoute(item.id)}
                  >
                    {item.icon}
                    <span className="mx-2 text-lg font-medium">
                      {item.name}
                    </span>
                  </Link>
                );
              } else {
                if (isSuperAdmin) {
                  return (
                    <Link
                      key={item.id}
                      className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-700 hover:text-gray-700 ${
                        activeRoute === item.id
                          ? "bg-gray-700 text-gray-700"
                          : ""
                      }`}
                      to={item.path}
                      onClick={() => setActiveRoute(item.id)}
                    >
                      {item.icon}
                      <span className="mx-2 text-lg font-medium">
                        {item.name}
                      </span>
                    </Link>
                  );
                }
              }
            })}
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
              Customization
            </label>

            <Link
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-700 hover:text-gray-700"
              to="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                />
              </svg>

              <span className="mx-2 text-lg text-white font-medium">
                Themes
              </span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-700 hover:text-gray-700"
              to="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <span className="mx-2 text-lg text-white font-medium">
                Setting
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
