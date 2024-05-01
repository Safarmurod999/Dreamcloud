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
const Admins = () => {
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";

  const dispatch = useDispatch();
  const admin = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchData("admin"));
  }, [dispatch]);

  const deleteAdmin = (id) => {
    dispatch(deleteData({ apiEndpoint: "admin", id }));
  };

  const updateAdmin = (data, id) => {
    let newData = { isSuperAdmin: data };
    dispatch(updateData({ apiEndpoint: "admin", id, newData, accessToken }));
  };

  if (isLoading) {
    return <Spinner position={"relative"} />;
  }
  console.log(admin);
  if (error) {
    console.log(error);
  }
  return (
    admin && (
      <main>
        <div className="flex-1 py-6">
        <Breadcrumb aria-label="admin page" className="ml-[48px] mb-4">
            <Breadcrumb.Item href="/admin" icon={HiHome}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Adminlar</Breadcrumb.Item>
          </Breadcrumb>
        <h1 className="text-3xl font-medium ml-[50px]">Adminlar</h1>
          <div className="w-full mx-auto px-4 py-6 sm:px-2 lg:px-12">
          <div className="border mb-6"></div>
            <div className="overflow-x-auto w-full rounded-lg shadow-lg">
              <Table hoverable className="table-auto w-full rounded-lg">
                <TableHead className="border-gray-800">
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">Id</TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">Username</TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Paroli
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Tizimga qo'shilgan sana
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    SuperAdmin
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">Delete</TableHeadCell>
                </TableHead>
                <TableBody>
                  {[...admin.data]
                    .sort((a, b) => a.id - b.id)
                    .map((el) => (
                      <TableRow
                        key={el.id}
                        className=" border-b border-gray-200"
                      >
                        <TableCell className="py-1 text-center">{el.id}</TableCell>
                        <TableCell className="py-1 text-center">
                          {el.username}
                        </TableCell>
                        <TableCell className="py-1 text-center">
                          {el.password}
                        </TableCell>
                        <TableCell className="py-1 text-center">
                          {el.createdAt}
                        </TableCell>
                        <TableCell className="py-1 px-4 text-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value={el.isSuperAdmin}
                              className="sr-only peer"
                              checked={el.isSuperAdmin}
                              onChange={() => updateAdmin(!el.isSuperAdmin, el.id)}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
                          </label>
                        </TableCell>
                        <TableCell className="py-1 px-4 text-center">
                          {" "}
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-[#FBE9E9] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-3 dark:focus:ring-red-900"
                            onClick={() => deleteAdmin(el.id)}
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

export default Admins;
