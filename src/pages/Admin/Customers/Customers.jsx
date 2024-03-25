import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { MdDeleteOutline } from "react-icons/md";
import { deleteData, updateData } from "../../../utils/postData";

const Customers = () => {
    const { data: orders, loading } = useFetch("orders");
    const [accessToken, setAccessToken] = useState(
      JSON.parse(localStorage.getItem("access_token")) || ""
    );
    console.log(orders);
    const deleteCustomer = (id) => {
      deleteData("orders", id);
      location.reload();
    };
    const updateCustomer = (data, id) => {
      updateData("orders", { recall: data }, id, accessToken);
      location.reload();
    };
  return (
    !loading && (
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
                        Sana
                      </th>
                      <th className="border-b border-gray-600 px-4 py-2 text-center">
                        Telefon Raqami
                      </th>
                      <th className="border-b border-gray-600 px-4 py-2 text-center">
                        Qayta Aloqa
                      </th>
                      <th className="border-b border-gray-600 px-4 py-2 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.data.sort((a,b)=>a.id-b.id).map((el) => (
                      <tr key={el.id}>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.id}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.createdAt}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.mobile_phone}
                        </td>
                        <td className="border-b border-gray-600 px-4 text-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value={el.recall}
                              className="sr-only peer"
                              checked={el.recall}
                              onChange={() => updateCustomer(!el.recall, el.id)}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
                          </label>
                        </td>
                        <td className="border-b border-gray-600 px-4 py-1 text-center">
                          {" "}
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => deleteCustomer(el.id)}
                          >
                            <MdDeleteOutline
                              style={{ fill: "#fff", fontSize: "20px" }}
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
  )
}

export default Customers