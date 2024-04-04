import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { MdDeleteOutline } from "react-icons/md";
import { deleteData, updateData } from "../../../utils/postData";
import Spinner from "../../../components/Spinner/Spinner";

const Addresses = () => {
  const { data: addresses, loading, error } = useFetch("addresses");
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";
  console.log(addresses);
  const deleteAddress = (id) => {
    deleteData("addresses", id);
    location.reload();
  };
  const updateAddress = (data, id) => {
    updateData("addresses", { recall: data }, id, accessToken);
    location.reload();
  };
  if (loading) {
    return <Spinner position={"full"} />;
  }
  if (error) {
    console.log(error);
  }
  return (
    addresses && (
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
                      Manzil
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Matn
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Location
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {addresses.data
                    .sort((a, b) => a.id - b.id)
                    .map((el) => (
                      <tr key={el.id}>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.id}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.address}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.description.slice(0, 50)}...
                        </td>
                        <td className="border-b border-gray-600 px-4 text-center">
                          {el.location.slice(0, 50)}...
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

export default Addresses;
