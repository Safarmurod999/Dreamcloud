import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Spinner from "../../../components/Spinner/Spinner";
import AdminModal from "../../../components/AdminModal/AdminModal";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData, updateData } from "../../../utils/slice";
const Categories = () => {
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState({
    category_name: "",
    isActive: false,
  });
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchData("categories"));
  }, [dispatch]);

  const deleteCategory = (id) => {
    dispatch(deleteData({ apiEndpoint: "categories", id }));
  };

  const updateCategory = (data, id) => {
    let newData = { isActive: data };
    dispatch(
      updateData({ apiEndpoint: "categories", id, newData, accessToken })
    );
    location.reload();
  };

  if (isLoading) {
    return <Spinner position={"relative"} />;
  }
  if (error) {
    console.log(error);
  }
  return (
    categories && (
      <>
        <main>
          <div className="flex-1 py-6">
            <div className="w-full mx-auto px-4 py-6 sm:px-2 lg:px-12">
              <div className="overflow-x-auto w-full">
                <table className="table-auto w-full border-collapse border border-gray-800">
                  <thead>
                    <tr className="bg-gray-200 border-b border-gray-600 ">
                      <th className="px-4 py-2 text-center">Id</th>
                      <th className="px-4 py-2 text-center">Kategoriyalar</th>
                      <th className="px-4 py-2 text-center">Aktiv</th>
                      <th className="px-4 py-2 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...categories.data]
                      .sort((a, b) => a.id - b.id)
                      .map((el, index) => (
                        <tr key={el.id} className="border-b border-gray-600">
                          <td className="px-4 py-2 text-center">{index + 1}</td>
                          <td className="px-4 py-2 text-center">
                            {el.category_name}
                          </td>
                          <td className="px-4 text-center">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                value={el.isActive}
                                className="sr-only peer"
                                checked={el.isActive}
                                onChange={() =>
                                  updateCategory(!el.isActive, el.id)
                                }
                              />
                              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
                            </label>
                          </td>
                          <td className="px-4 py-1 flex gap-x-2 justify-end text-center">
                            {" "}
                            <button
                              type="button"
                              className="focus:outline-none text-white bg-[#FBE9E9] hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2"
                              onClick={() => deleteCategory(el.id)}
                            >
                              <MdDeleteOutline
                                style={{ fill: "#f00", fontSize: "20px" }}
                              />
                            </button>
                            <Button
                              className="focus:outline-none text-white bg-[#E6ECEE] hover:bg-[#E6ECEE] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2"
                              onClick={() => {
                                setOpenModal(true);
                                setCategory(el);
                              }}
                            >
                              <svg
                                width="21"
                                height="21"
                                viewBox="0 0 21 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_452_355)">
                                  <path
                                    d="M2.625 15.2775V17.9375C2.625 18.1825 2.8175 18.375 3.0625 18.375H5.7225C5.83625 18.375 5.95 18.3312 6.02875 18.2437L15.5837 8.69749L12.3025 5.41624L2.75625 14.9625C2.66875 15.05 2.625 15.155 2.625 15.2775ZM18.1212 6.15999C18.4625 5.81874 18.4625 5.26749 18.1212 4.92624L16.0738 2.87874C15.7325 2.53749 15.1812 2.53749 14.84 2.87874L13.2388 4.47999L16.52 7.76124L18.1212 6.15999Z"
                                    fill="black"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_452_355">
                                    <rect width="21" height="21" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <Button
                  color={"primary"}
                  className="focus:outline-none border-none text-white bg-[#E6ECEE] hover:bg-[#E6ECEE] font-medium rounded-lg text-sm mt-3 py-2"
                  onClick={() => setOpenModal(true)}
                >
                  Qo'shish
                </Button>
                <AdminModal
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  category={category}
                  setCategory={setCategory}
                />
              </div>
            </div>
          </div>
        </main>
      </>
    )
  );
};

export default Categories;
