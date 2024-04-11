import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Spinner from "../../../components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData, updateData } from "../../../utils/slice";
const Orders = () => {
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchData("orders"));
  }, [dispatch]);

  const deleteOrder = (id) => {
    dispatch(deleteData({ apiEndpoint: "orders", id }));
  };

  const updateOrder = (data, id) => {
    let newData = { recall: data };
    dispatch(updateData({ apiEndpoint: "orders", id, newData, accessToken }));
    location.reload();
  };

  if (isLoading) {
    return <Spinner position={"relative"} />;
  }
  console.log(orders);
  if (error) {
    console.log(error);
  }
  return (
    orders && (
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
                      Ismi
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Telefon Raqami
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Mahsulot Nomlari
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Miqdor
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Qayta Aloqa
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {[...orders.data]
                    .sort((a, b) => a.id - b.id)
                    .map((el) => (
                      <tr key={el.id}>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.id}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.customer_name}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.mobile_phone}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.product_name}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.count}
                        </td>
                        <td className="border-b border-gray-600 px-4 text-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value={el.recall}
                              className="sr-only peer"
                              checked={el.recall}
                              onChange={(e) => {
                                updateOrder(!el.recall, el.id);
                              }}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
                          </label>
                        </td>
                        <td className="border-b border-gray-600 px-4 py-1 text-center">
                          {" "}
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-[#FBE9E9] hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-[#FBE9E9] dark:focus:ring-red-900"
                            onClick={() => deleteOrder(el.id)}
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

export default Orders;
