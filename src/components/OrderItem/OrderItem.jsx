import React, { memo } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { deleteData, updateData } from "../../utils/slice";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { TableCell, TableRow } from "flowbite-react";
const OrderItem = ({ el }) => {
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";
  const { data: products, loading, error } = useFetch("products");
  const dispatch = useDispatch();
  if (products && !loading) {
    var el_name = products.data.find((product) => product.id == el.product_id);
  }
  const updateOrder = (data, id) => {
    let newData = { recall: data };
    dispatch(updateData({ apiEndpoint: "orders", id, newData, accessToken }));
  };
  const deleteOrder = (id) => {
    dispatch(deleteData({ apiEndpoint: "orders", id }));
  };
  return (
    <TableRow key={el.id} className="border-b border-gray-200">
      <TableCell className="py-1 text-center">
        {el.id}
      </TableCell>
      <TableCell className="py-1 text-center">
        {el.customer_name}
      </TableCell>
      <TableCell className="py-1 text-center">
        {el.mobile_phone}
      </TableCell>
      <TableCell className="py-1 text-center">
        {el_name?.product_name}
      </TableCell>
      <TableCell className="py-1 text-center">
        {el.count}
      </TableCell>
      <TableCell className="py-1 px-4 text-center">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value={el.recall}
            className="sr-only peer"
            checked={el.recall}
            onChange={() => {
              updateOrder(!el.recall, el.id);
            }}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
        </label>
      </TableCell>
      <TableCell className="py-1 px-4 text-center">
        {" "}
        <button
          type="button"
          className="focus:outline-none text-white bg-[#FBE9E9] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  px-3 py-3 dark:bg-red-600 dark:hover:bg-[#FBE9E9] dark:focus:ring-red-900"
          onClick={() => deleteOrder(el.id)}
        >
          <MdDeleteOutline style={{ fill: "#f00", fontSize: "20px" }} />
        </button>
      </TableCell>
    </TableRow>
  );
};

export default memo(OrderItem);
