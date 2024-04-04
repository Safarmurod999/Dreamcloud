import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { MdDeleteOutline } from "react-icons/md";
import { deleteData, updateData } from "../../../utils/postData";
import Spinner from "../../../components/Spinner/Spinner";
const Products = () => {
  const { data: products } = useFetch("products");
  const { data: categories, loading, error } = useFetch("categories");
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";
  console.log(products.data);

  const deleteProduct = (id) => {
    deleteData("products", id);
    location.reload();
  };
  const updateProduct = (data, id) => {
    updateData("products", { status: data }, id, accessToken);
    location.reload();
  };
  if (loading) {
    return <Spinner position={"full"} />;
  }
  if (error) {
    console.log(error);
  }
  if (!loading && products&&categories) {
    products.data.forEach((product) => {
      product.category_name = categories.data.find(
        (c) => c.id == product.category_id
      ).category_name;
      return product;
    });
    console.log(products.data);
  }
  return (
    products && (
      <main>
        <div className="flex-1 py-6">
          <div className="w-full mx-auto px-4 py-6 sm:px-2 lg:px-12">
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full border-collapse border border-gray-800">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Id
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Mahsulot nomi
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Kategoriyasi
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Narxi
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Yuklama
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      O'lchami
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Miqdori
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center">
                      Status
                    </th>
                    <th className="border-b border-gray-600 px-4 py-2 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.data
                    .sort((a, b) => a.id - b.id)
                    .map((el) => (
                      <tr key={el.id}>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.id}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.product_name}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.category_name}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.price}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.overweight}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.size}
                        </td>
                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                          {el.count}
                        </td>
                        <td className="border-b border-gray-600 px-4 text-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value={el.status}
                              className="sr-only peer"
                              checked={el.status}
                              onChange={() => updateProduct(!el.status, el.id)}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
                          </label>
                        </td>
                        <td className="border-b border-gray-600 px-4 py-1 text-center">
                          {" "}
                          <button
                              type="button"
                              className="focus:outline-none text-white bg-[#FBE9E9] hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-[#FBE9E9] dark:focus:ring-red-900"
                              onClick={() => deleteCategory(el.id)}
                            >
                              <MdDeleteOutline
                                style={{ fill: "#f00", fontSize: "20px" }}
                              />
                            </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default Products;
