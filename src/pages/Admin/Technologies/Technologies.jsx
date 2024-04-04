import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { MdDeleteOutline } from "react-icons/md";
import { deleteData, updateData } from "../../../utils/postData";
import Spinner from "../../../components/Spinner/Spinner";

const Technologies = () => {
  const { data: technologies, loading, error } = useFetch("technologies");
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";
  console.log(technologies);
  const deleteTechnology = (id) => {
    deleteData("technologies", id);
    location.reload();
  };
  const updateTechnology = (data, id) => {
    updateData("technologies", { recall: data }, id, accessToken);
    location.reload();
  };
  if (loading) {
    return <Spinner position={"full"} />;
  }
  if (error) {
    console.log(error);
  }
  return (
    technologies && (
      <main>
        <div className="flex-1 py-6">
          <div className="w-full mx-auto px-4 py-6 sm:px-2 lg:px-12">
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full border-collapse border border-gray-800">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Id
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Nomi
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Matn
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Video
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {technologies.data
                    .sort((a, b) => a.id - b.id)
                    .map((el) => (
                      <tr key={el.id}>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.id}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.name}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.description.slice(0, 50)}...
                        </td>
                        <td className="border-b border-gray-600 px-4 text-center">
                          {el.video}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-1 text-center">
                          {" "}
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-[#FBE9E9] hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-[#FBE9E9] dark:focus:ring-red-900"
                            onClick={() => deleteCategory(el.id)}
                          >
                            <MdDeleteOutline
                              style={{ fill: "#f00", fontSize: "20px" }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default Technologies;
