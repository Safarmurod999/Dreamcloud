import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Spinner from "../../../components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData, updateData } from "../../../utils/slice";
import {
  Breadcrumb,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
const Customers = () => {
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchData("orders"));
  }, [dispatch]);

  const deleteCustomer = (id) => {
    dispatch(deleteData({ apiEndpoint: "orders", id }));
  };

  const updateCustomer = (data, id) => {
    let newData = { recall: data };
    dispatch(updateData({ apiEndpoint: "orders", id, newData, accessToken }));
  };

  if (isLoading) {
    return <Spinner position={"relative"} />;
  }
  if (error) {
    console.log(error);
  }
  return (
    orders && (
      <main>
        <div className="flex-1 py-6">
        <Breadcrumb aria-label="Customers page" className="ml-[48px] mb-4">
            <Breadcrumb.Item href="/admin" icon={HiHome}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Mijozlar</Breadcrumb.Item>
          </Breadcrumb>
        <h1 className="text-3xl font-medium ml-[50px]">Mijozlar</h1>
          <div className="w-full mx-auto px-4 py-6 sm:px-2 lg:px-12">
          <div className="border mb-6"></div>
            <div className="overflow-x-auto w-full rounded-lg border">
              <Table hoverable className="table-auto w-full rounded-lg border border-gray-800">
                <TableHead className="border border-gray-800">
                  <TableHeadCell className="text-center bg-gray-200 py-4">Id</TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">Sana</TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">
                    Telefon Raqami
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">
                    Qayta Aloqa
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">Edit</TableHeadCell>
                </TableHead>
                <TableBody>
                  {[...orders.data]
                    .sort((a, b) => a.id - b.id)
                    .map((el) => (
                      <TableRow
                        key={el.id}
                        className=" border-b border-gray-800"
                      >
                        <TableCell className="py-1 text-center">{el.id}</TableCell>
                        <TableCell className="py-1 text-center">
                          {el.createdAt}
                        </TableCell>
                        <TableCell className="py-1 text-center">
                          {el.mobile_phone}
                        </TableCell>
                        <TableCell className="py-1 px-4 text-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value={el.recall}
                              className="sr-only peer"
                              checked={el.recall}
                              onChange={() => updateCustomer(!el.recall, el.id)}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
                          </label>
                        </TableCell>
                        <TableCell className="py-1 px-4 text-center">
                          {" "}
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-[#FBE9E9] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-3 dark:focus:ring-red-900"
                            onClick={() => deleteCustomer(el.id)}
                          >
                            <MdDeleteOutline
                              style={{ fill: "#f00", fontSize: "20px" }}
                            />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default Customers;
