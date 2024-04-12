import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Spinner from "../../../components/Spinner/Spinner";
import { deleteData, fetchData, updateData } from "../../../utils/slice";
import { useDispatch, useSelector } from "react-redux";
import { TechnologiesModal } from "../../../components";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
const Technologies = () => {
  const [technology, setTechnology] = useState({
    name: "",
    video: {},
    description: "",
    state: 1,
  });
  const [openModal, setOpenModal] = useState(false);
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
    return <Spinner position={"relative"} />;
  }
  if (error) {
    console.log(error);
  }
  return (
    technologies && (
      <main>
        <div className="flex-1 py-6">
          <div className="mx-auto px-4 py-6 sm:px-2 lg:px-12">
            <div className="overflow-x-auto w-full rounded-lg">
              <Table className="rounded-lg border border-gray-2">
                <TableHead>
                  <TableHeadCell className="text-center bg-gray-200 py-4">
                    Id
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">
                    Nomi
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">
                    Matn
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">
                    Video
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">
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
                        <TableCell className="text-center py-1">
                          {el.id}
                        </TableCell>
                        <TableCell className="text-center py-1">
                          {el.name}
                        </TableCell>
                        <TableCell className="text-center py-1 text-ellipsis overflow-hidden">
                          {el.description.length > 30
                            ? el.description.slice(0, 30) + "..."
                            : el.description}
                        </TableCell>
                        <TableCell className="px-4 text-center">
                          {el.video}
                        </TableCell>
                        <TableCell className="flex justify-center gap-2 py-1 text-center">
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
              <Button
                color={"primary"}
                className="focus:outline-none border-none text-white bg-[#E6ECEE] hover:bg-[#E6ECEE] font-medium rounded-lg text-sm mt-3 py-2"
                onClick={() => setOpenModal(true)}
              >
                Qo'shish
              </Button>
              <TechnologiesModal
                technology={technology}
                openModal={openModal}
                setTechnology={setTechnology}
                setOpenModal={setOpenModal}
              />
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default Technologies;
