import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Spinner from "../../../components/Spinner/Spinner";
import { deleteData, fetchData, updateData } from "../../../utils/slice";
import { useDispatch, useSelector } from "react-redux";
import { TechnologiesModal } from "../../../components";
import {
  Breadcrumb,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import ExportButton from "../../../components/ExportButton/ExportButton";
const Technologies = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);
  const [technology, setTechnology] = useState({
    name: "",
    video: {},
    description: "",
    state: 1,
  });
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const technologies = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);
  let filteredArray = technologies?.data.map((obj) => {
    let { id, name, video, description } = obj;
    return { id, name, video, description };
  });
  useEffect(() => {
    dispatch(fetchData(`technologies?page=${currentPage}&limit=8`));
  }, [dispatch, currentPage]);

  const deleteTechnology = (id) => {
    dispatch(deleteData({ apiEndpoint: "technologies", id }));
  };

  if (isLoading) {
    return <Spinner position={"relative"} />;
  }
  console.log(technologies);
  if (error) {
    console.log(error);
  }
  return (
    technologies &&
    filteredArray && (
      <main className="pt-[60px]">
        <div className="flex-1 py-6">
          <Breadcrumb
            aria-label="Technologies page"
            className="px-4 sm:px-2 lg:px-6 xl:px-12 mb-4"
          >
            <Breadcrumb.Item href="/admin" icon={HiHome}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Texnologiyalar</Breadcrumb.Item>
          </Breadcrumb>
          <div className="w-full px-4 sm:px-2 lg:px-12 flex flex-col sm:flex-row gap-y-3 justify-between items-start sm:items-center">
            <h1 className="text-3xl font-medium">Texnologiyalar</h1>
            <div className="flex gap-3">
              <button
                className="text-white px-3 bg-gray-700 rounded-md"
                onClick={() => setOpenModal(true)}
              >
                Qo'shish
              </button>
              <ExportButton data={filteredArray} filename={"Technologies"} />
            </div>
          </div>
          <div className="mx-auto px-4 py-6 sm:px-2 lg:px-12">
            <div className="border mb-6"></div>
            <div className="overflow-x-auto shadow-lg">
              <Table hoverable className="rounded-lg">
                <TableHead className="border-gray-800">
                  <TableHeadCell className="text-center whitespace-nowrap bg-gray-700 text-white py-4">
                    Id
                  </TableHeadCell>
                  <TableHeadCell className="text-center whitespace-nowrap bg-gray-700 text-white py-4">
                    Nomi
                  </TableHeadCell>
                  <TableHeadCell className="text-center whitespace-nowrap bg-gray-700 text-white py-4">
                    Matn
                  </TableHeadCell>
                  <TableHeadCell className="text-center whitespace-nowrap bg-gray-700 text-white py-4">
                    Video
                  </TableHeadCell>
                  <TableHeadCell className="text-center whitespace-nowrap bg-gray-700 text-white py-4">
                    Edit
                  </TableHeadCell>
                </TableHead>
                <TableBody>
                  {[...technologies.data]
                    .sort((a, b) => a.id - b.id)
                    .map((el) => (
                      <TableRow
                        className="border-b border-gray-200"
                        key={el.id}
                      >
                        <TableCell className="text-center whitespace-nowrap py-1">
                          {el.id}
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap py-1">
                          {el.name}
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap py-1 text-ellipsis overflow-hidden">
                          {el.description && el.description.length > 30
                            ? el.description.slice(0, 30) + "..."
                            : el.description}
                        </TableCell>
                        <TableCell className="px-4 text-center whitespace-nowrap">
                          {el.video}
                        </TableCell>
                        <TableCell className="flex justify-center gap-2 py-1 text-center whitespace-nowrap">
                          {" "}
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-[#FBE9E9] hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-3 dark:bg-red-600 dark:hover:bg-[#FBE9E9] dark:focus:ring-red-900"
                            onClick={() => deleteTechnology(el.id)}
                          >
                            <MdDeleteOutline
                              style={{ fill: "#f00", fontSize: "20px" }}
                            />
                          </button>
                          <button
                            className="focus:outline-none text-white bg-[#E6ECEE] hover:bg-[#E6ECEE] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3"
                            onClick={() => {
                              setOpenModal(true);
                              setTechnology(el);
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
                </TableBody>
              </Table>
            </div>
            <div className="mx-auto flex justify-center mt-3">
              <Pagination
                className="text-center"
                layout="table"
                currentPage={currentPage}
                totalPages={technologies?.pagination?.totalPages}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          </div>
          <TechnologiesModal
            technology={technology}
            openModal={openModal}
            setTechnology={setTechnology}
            setOpenModal={setOpenModal}
          />
        </div>
      </main>
    )
  );
};

export default Technologies;
