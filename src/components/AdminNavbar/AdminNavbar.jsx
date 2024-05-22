import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { IoMenuSharp } from "react-icons/io5";

import Spinner from "../Spinner/Spinner";
import useFetch from "../../hooks/useFetch";

const userNavigation = [
  { name: "Your Profile", path: "/admin/profile" },
  { name: "Settings", path: "/admin/settings" },
  { name: "Sign out", path: "/admin" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const AdminNavbar = ({ toggle, setToggle }) => {
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("username")) || "User"
  );
  const { data: admin, loading, error } = useFetch(`admin/${username}`);

  if (loading) {
    return <Spinner position={"relative"} />;
  }
  if (error) {
    console.log(error);
  }
  const user = {
    name: admin?.data[0]?.username,
    email: `${admin?.data[0]?.username}@gmail.com`,
    imageUrl: admin?.data[0]?.image
      ? `https://dreamcloud-backend-e4327b791528.herokuapp.com/uploads/avatar/${admin?.data[0]?.image}`
      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80  ",
  };
  const logOut = () => {
    localStorage.clear();
  };
  return (
    admin && (
      <Disclosure
        as="nav"
        className={`bg-white h-[68px] fixed layout grow shadow shadow-gray-300 admin-navbar ${
          toggle ? "toggle" : "layout "
        } flex items-center justify-between`}
      >
        {({ open }) => (
          <>
            <div className={`w-full mx-auto px-3 sm:px-4 lg:px-6 xl:px-8`}>
              <div className="flex py-2 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0"></div>
                  <div
                    className="cursor-pointer admin-toggle"
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  >
                    <IoMenuSharp />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-5 flex items-baseline space-x-4">
                      <form className="w-[400px] mx-auto">
                        <label
                          htmlFor="default-search"
                          className="mb-2 text-sm font-medium text-gray-900 sr-only"
                        >
                          Search
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                            </svg>
                          </div>
                          <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border-2 border-gray-500 rounded-lg bg-gray-100  focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Qidirish"
                            required
                          />
                          <button
                            type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                          >
                            Qidirish
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#fff"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                        />
                      </svg>
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full text-sm">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                          <span className="hidden md:flex ml-3">{user.name}</span>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => {
                            if (item.name !== "Sign out") {
                              return (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.path}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              );
                            } else {
                              return (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.path}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                      onClick={() => logOut()}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              );
                            }
                          })}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    )
  );
};

export default AdminNavbar;
