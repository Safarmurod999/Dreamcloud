import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { MdDeleteOutline } from "react-icons/md";
import { deleteData, updateData } from "../../../utils/postData";
import Spinner from "../../../components/Spinner/Spinner";
import AdminModal from "../../../components/AdminModal/AdminModal";

const Categories = () => {
  const { data: categories, loading, error } = useFetch("categories");
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";
  console.log(categories);
  const deleteCategory = (id) => {
    deleteData("categories", id);
    location.reload();
  };
  const updateCategory = (data, id) => {
    updateData("categories", { isActive: data }, id, accessToken);
    location.reload();
  };
  if (loading) {
    return <Spinner position={"full"} />;
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
                    {categories.data
                      .sort((a, b) => a.id - b.id)
                      .map((el) => (
                        <tr key={el.id} className="border-b border-gray-600">
                          <td className="px-4 py-2 text-center">{el.id}</td>
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
                          <td className=" px-4 py-1 flex gap-x-2 justify-end text-center">
                            {" "}
                            <button
                              type="button"
                              className="focus:outline-none text-white bg-[#FBE9E9] hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-[#FBE9E9] dark:focus:ring-red-900"
                              onClick={() => deleteCategory(el.id)}
                            >
                              <MdDeleteOutline
                                style={{ fill: "#f00", fontSize: "20px" }}
                              />
                            </button>
                            <AdminModal {...el} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  );
};

export default Categories;
