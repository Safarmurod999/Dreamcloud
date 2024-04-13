import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Spinner from "../../../components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData, updateData } from "../../../utils/slice";
import { Breadcrumb, Table } from "flowbite-react";
import { HiHome } from "react-icons/hi";
const Addresses = () => {
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";

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
                  <Table.HeadCell className="bg-gray-200 py-4 text-center">Edit</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {[...addresses.data]
                    .sort((a, b) => a.id - b.id)
                    .map((el) => (
                      <Table.Row key={el.id} className="dark:bg-gray-800  border-gray-800">
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
                        <Table.Cell className="py-1 text-center px-4">
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
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default Addresses;
