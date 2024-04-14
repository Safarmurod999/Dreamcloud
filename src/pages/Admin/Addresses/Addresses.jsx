import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Spinner from "../../../components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData, updateData } from "../../../utils/slice";
import { Breadcrumb, Button, Table } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { AdminAddresses } from "../../../components";
const Addresses = () => {
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";
  const [address, setAddress] = useState({
    address: "",
    description: "",
    location: "",
    image: "",
    state: true,
  });
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchData("addresses"));
  }, [dispatch]);

  const deleteAddress = (id) => {
    dispatch(deleteData({ apiEndpoint: "addresses", id }));
  };

  const updateAddress = (data, id) => {
    let newData = { recall: data };
    dispatch(
      updateData({ apiEndpoint: "addresses", id, newData, accessToken })
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
    addresses && (
      <main>
        <div className="flex-1 py-6">
          <Breadcrumb aria-label="Orders page" className="ml-[48px] mb-4">
            <Breadcrumb.Item href="/admin" icon={HiHome}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Manzillar</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-3xl font-medium ml-[50px]">Manzillar</h1>
          <div className="w-full mx-auto px-4 py-6 sm:px-2 lg:px-12">
            <div className="border mb-6"></div>
            <div className="overflow-x-auto w-full rounded-lg">
              <Table hoverable className="rounded-lg border border-gray-800">
                <Table.Head className="border border-gray-800">
                  <Table.HeadCell className="bg-gray-200 py-4 text-center">
                    Id
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-gray-200 py-4 text-center">
                    Manzil
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-gray-200 py-4 text-center">
                    Matn
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-gray-200 py-4 text-center">
                    Location
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-gray-200 py-4 text-center">
                    Edit
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {[...addresses.data]
                    .sort((a, b) => a.id - b.id)
                    .map((el) => (
                      <Table.Row
                        key={el.id}
                        className="dark:bg-gray-800  border-gray-800"
                      >
                        <Table.Cell className="py-1 text-center whitespace-nowrap font-medium text-gray-900">
                          {el.id}
                        </Table.Cell>
                        <Table.Cell className="py-1 text-center text-ellipsis overflow-hidden">
                          {el.address}
                        </Table.Cell>
                        <Table.Cell className="py-1 text-center text-ellipsis overflow-hidden">
                          {el?.description}
                        </Table.Cell>
                        <Table.Cell className="py-1 text-center max-w-[250px] text-ellipsis overflow-hidden">
                          {el?.location}
                        </Table.Cell>
                        <Table.Cell className="py-1 text-center flex items-center gap-2 px-4">
                          {" "}
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-[#FBE9E9] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-3 dark:bg-red-600 dark:hover:bg-[#FBE9E9] dark:focus:ring-red-900"
                            onClick={() => deleteAddress(el.id)}
                          >
                            <MdDeleteOutline
                              style={{ fill: "#f00", fontSize: "20px" }}
                            />
                          </button>
                          <button
                            className="focus:outline-none text-white bg-[#E6ECEE] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3"
                            onClick={() => {
                              setOpenModal(true);
                              setAddress(el);
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
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            </div>
          </div>
          <Button
            color={"primary"}
            className="ml-[48px] focus:outline-none border-none text-white bg-[#E6ECEE] hover:ring-2 font-medium rounded-lg text-sm mt-3 px-4 py-2"
            onClick={() => setOpenModal(true)}
          >
            Qo'shish
          </Button>
          <AdminAddresses
            address={address}
            openModal={openModal}
            setAddress={setAddress}
            setOpenModal={setOpenModal}
          />
        </div>
      </main>
    )
  );
};

export default Addresses;
