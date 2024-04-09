import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Spinner from "../../../components/Spinner/Spinner";
import { deleteData, fetchData, updateData } from "../../../utils/slice";
import { useDispatch, useSelector } from "react-redux";

const Technologies = () => {
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";

  const dispatch = useDispatch();
  const technologies = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchData("technologies"));
  }, [dispatch]);

  const deleteTechnology = (id) => {
    dispatch(deleteData({ apiEndpoint: "technologies", id }));
  };

  const updateTechnology = (data, id) => {
    let newData = { recall: data };
    dispatch(
      updateData({ apiEndpoint: "technologies", id, newData, accessToken })
    );
    location.reload();
  };

  if (isLoading) {
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
                  {[...technologies.data]
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
                            onClick={() => deleteTechnology(el.id)}
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
