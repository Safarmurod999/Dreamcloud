import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Spinner from "../../../components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData, updateData } from "../../../utils/slice";
import {
  Breadcrumb,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Toast,
} from "flowbite-react";
import { HiCheck, HiHome, HiX } from "react-icons/hi";
import { AdminModal } from "../../../components";
import ExportButton from "../../../components/ExportButton/ExportButton";
const Admins = () => {
  const [update, setUpdate] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
    isSuperAdmin: true,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData(`admin?page=${currentPage}&limit=10`));
  }, [dispatch, currentPage]);
  const admin = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);

  const deleteAdmin = (id) => {
    dispatch(deleteData({ apiEndpoint: "admin", id }));
    setDeleted(true);
    setTimeout(() => {
      setDeleted(false);
    }, 3000);
  };

  const updateAdmin = (data, id) => {
    let newData = { isSuperAdmin: data };
    dispatch(updateData({ apiEndpoint: "admin", id, newData, accessToken }));
    setUpdate(true);
    localStorage.setItem("isSuperAdmin", JSON.stringify(newData.isSuperAdmin));
    setTimeout(() => {
      setUpdate(false);
    }, 3000);
  };

  if (isLoading) {
    return <Spinner position={"relative"} />;
  }
  let filteredArray = admin?.data.map((obj) => {
    let { id, username, password, createdAt, isSuperAdmin } = obj;
    return { id, username, password, createdAt, isSuperAdmin };
  });
  console.log(admin);
  if (error) {
    console.log(error);
  }
  return (
    admin &&
    filteredArray && (
      <main className="pt-[90px]">
        <Toast
          className={`hidden absolute bottom-[30px] right-[40px] ${
            update ? "flex" : ""
          }`}
        >
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Item updated successfully.
          </div>
          <Toast.Toggle onDismiss={() => setUpdate(false)} />
        </Toast>
        <Toast
          className={`hidden absolute bottom-[30px] right-[40px] ${
            deleted ? "flex" : ""
          }`}
        >
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Item deleted successfully.
          </div>
          <Toast.Toggle onDismiss={() => setDeleted(false)} />
        </Toast>
        <Toast
          className={`hidden absolute bottom-[30px] right-[40px] ${
            update ? "flex" : ""
          }`}
        >
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Item updated successfully.
          </div>
          <Toast.Toggle onDismiss={() => setUpdate(false)} />
        </Toast>
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
              <Table hoverable className="rounded-lg">
                <TableHead className="border-gray-800">
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Id
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Username
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Paroli
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Tizimga qo'shilgan sana
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    SuperAdmin
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Delete
                  </TableHeadCell>
                </TableHead>
                <TableBody>
                  {[...admin.data]
                    .sort((a, b) => a.id - b.id)
                    .map((el) => (
                      <TableRow
                        key={el.id}
                        className=" border-b border-gray-200"
                      >
                        <TableCell className="py-1 text-center">
                          {el.id}
                        </TableCell>
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
                              onChange={() =>
                                updateAdmin(!el.isSuperAdmin, el.id)
                              }
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
                          </label>
                        </TableCell>
                        <TableCell className="py-1 px-4 flex justify-center gap-2 text-center">
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
                          <button
                            className="focus:outline-none text-white bg-[#E6ECEE] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3"
                            onClick={() => {
                              setOpenModal(true);
                              setAdminData(el);
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
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow className="border-b border-gray-200">
                    <TableCell className="py-1 text-center" colSpan={6}>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={admin?.pagination?.totalPages}
                        onPageChange={onPageChange}
                        showIcons
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="p-3 w-[150px] text-white mt-4 bg-gray-700 rounded-md flex items-center justify-center"
                onClick={() => setOpenModal(true)}
              >
                Qo'shish
              </button>

              <ExportButton data={filteredArray} filename={"Admins"} />
            </div>
          </div>

          <AdminModal
            admin={adminData}
            setAdminData={setAdminData}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </div>
      </main>
    )
  );
};

export default Admins;
