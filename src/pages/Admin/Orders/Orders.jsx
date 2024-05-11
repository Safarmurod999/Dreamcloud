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
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import ExportButton from "../../../components/ExportButton/ExportButton";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.data.data);
  console.log(orders);
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
  if (error) {
    console.log(error);
  }

  return (
    orders && (
      <main className="pt-[60px]">
        <div className="flex-1 py-6">
          <Breadcrumb aria-label="Orders page" className="ml-[48px] mb-4">
            <Breadcrumb.Item href="/admin" icon={HiHome}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/admin/orders">Buyurtmalar</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-3xl font-medium ml-[50px]">Buyurtmalar</h1>

          <div className="w-full mx-auto px-4 py-6 sm:px-2 lg:px-12">
            <div className="border mb-6"></div>
            <div className="overflow-x-auto w-full rounded-lg shadow-lg">
              <Table hoverable className="table-auto w-full rounded-lg">
                <TableHead className="border-gray-800">
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Id
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Ismi
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Telefon Raqami
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Mahsulot Nomlari
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Miqdor
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Qayta Aloqa
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Actions
                  </TableHeadCell>
                </TableHead>
                <TableBody>
                  {[...orders.data]
                    .sort((a, b) => a.id - b.id)
                    .map((el) => (
                      <OrderItem el={el} key={el.id} />
                    ))}
                  <TableRow className="border-b border-gray-200">
                    <TableCell className="py-1 text-center" colSpan={6}>
                      <Pagination 
                        currentPage={currentPage}
                        totalPages={orders?.pagination?.totalPages}
                        onPageChange={onPageChange}
                        showIcons
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between">
              <Pagination
                currentPage={currentPage}
                totalPages={orders?.pagination?.totalPages}
                onPageChange={onPageChange}
                showIcons
              />
              <ExportButton data={filteredArray} filename={"Orders"} />
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default memo(Orders);
