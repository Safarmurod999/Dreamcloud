import React, { memo, useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../utils/slice";
import OrderItem from "../../../components/OrderItem/OrderItem";
import {
  Breadcrumb,
  Pagination,
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import ExportButton from "../../../components/ExportButton/ExportButton";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchData(`orders?page=${currentPage}&limit=8`));
  }, [dispatch, currentPage]);

  if (isLoading) {
    return <Spinner position={"relative"} />;
  }
  let filteredArray = orders?.data.map((obj) => {
    let { id, customer_name, product_name, mobile_phone, count, recall } = obj;
    return { id, customer_name, product_name, mobile_phone, count, recall };
  });
  console.log(filteredArray);
  if (error) {
    console.log(error);
  }

  return (
    orders &&
    filteredArray && (
      <main className="pt-[60px]">
        <div className="flex-1 py-6">
          <Breadcrumb
            aria-label="Orders page"
            className="px-3 sm:px-4 lg:px-6 xl:px-8 mb-4"
          >
            <Breadcrumb.Item href="/admin" icon={HiHome}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Buyurtmalar</Breadcrumb.Item>
          </Breadcrumb>
          <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-medium">Buyurtmalar</h1>
            <div className="flex gap-3">
              <ExportButton data={filteredArray} filename={"Orders"} />
            </div>
          </div>
          <div className="w-full mx-auto py-6 px-3 sm:px-4 lg:px-6 xl:px-8">
            <div className="border mb-6"></div>
            <div className="overflow-x-auto w-full shadow-lg">
              <Table hoverable className="table-auto min-w-full rounded-lg">
                <TableHead className="border-gray-800">
                  <TableHeadCell className="text-center whitespace-nowrap bg-gray-700 text-white py-4">
                    Id
                  </TableHeadCell>
                  <TableHeadCell className="text-center whitespace-nowrap bg-gray-700 text-white py-4">
                    Ismi
                  </TableHeadCell>
                  <TableHeadCell className="text-center whitespace-nowrap bg-gray-700 text-white py-4">
                    Telefon Raqami
                  </TableHeadCell>
                  <TableHeadCell className="text-center whitespace-nowrap bg-gray-700 text-white py-4">
                    Mahsulot Nomlari
                  </TableHeadCell>
                  <TableHeadCell className="text-center whitespace-nowrap bg-gray-700 text-white py-4">
                    Miqdor
                  </TableHeadCell>
                  <TableHeadCell className="text-center whitespace-nowrap bg-gray-700 text-white py-4">
                    Qayta Aloqa
                  </TableHeadCell>
                  <TableHeadCell className="text-center whitespace-nowrap bg-gray-700 text-white py-4">
                    Actions
                  </TableHeadCell>
                </TableHead>
                <TableBody>
                  {[...orders.data]
                    .sort((a, b) => a.id - b.id)
                    .map((el) => (
                      <OrderItem el={el} key={el.id} />
                    ))}
                </TableBody>
              </Table>
            </div>
            <div className="mx-auto flex justify-center mt-3">
              <Pagination
              className="text-center"
                layout="table"
                currentPage={currentPage}
                totalPages={orders?.pagination?.totalPages}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default memo(Orders);
