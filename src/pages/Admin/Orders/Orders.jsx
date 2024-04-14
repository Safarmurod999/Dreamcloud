import React, { memo, useEffect } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../utils/slice";
import OrderItem from "../../../components/OrderItem/OrderItem";
import {
  Breadcrumb,
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);
  useEffect(() => {
    dispatch(fetchData("orders"));
  }, [dispatch]);

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
          <Breadcrumb aria-label="Orders page" className="ml-[48px] mb-4">
            <Breadcrumb.Item href="/admin" icon={HiHome}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/admin/orders">Buyurtmalar</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-3xl font-medium ml-[50px]">Buyurtmalar</h1>
          <div className="w-full mx-auto px-4 py-6 sm:px-2 lg:px-12">
            <div className="border mb-6"></div>
            <div className="overflow-x-auto w-full rounded-lg border">
              <Table className="table-auto w-full border border-gray-800 rounded-lg">
                <TableHead className="border-b border-gray-800">
                  <TableHeadCell className="text-center bg-gray-200 py-4">
                    Id
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">
                    Ismi
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">
                    Telefon Raqami
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">
                    Mahsulot Nomlari
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">
                    Miqdor
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">
                    Qayta Aloqa
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-200 py-4">
                    Edit
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
          </div>
        </div>
      </main>
    )
  );
};

export default memo(Orders);
