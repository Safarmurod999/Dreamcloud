import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { MdDeleteOutline } from "react-icons/md";
import Spinner from "../../../components/Spinner/Spinner";
import { deleteData, fetchData, updateData } from "../../../utils/slice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "flowbite-react";
import { ProductModal } from "../../../components";
const Products = () => {
  const { data: categories, loading } = useFetch("categories");
  const [product, setProduct] = useState({
    image: "",
    product_name: "",
    category_id: "",
    price: "",
    overweight: "",
    guarantee: "",
    size: "",
    count: "",
    status: false,
    discount: "",
    capacity: "",
    description: "",
  });
  const [productModal, setProductModal] = useState(false);

  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";

  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchData("products"));
  }, [dispatch]);

  const deleteProduct = (id) => {
    dispatch(deleteData({ apiEndpoint: "products", id }));
  };

  const updateProduct = (data, id) => {
    let newData = { status: data };
    dispatch(updateData({ apiEndpoint: "products", id, newData, accessToken }));
    console.log({ apiEndpoint: "products", id, newData, accessToken });
    // location.reload();
  };

  if (isLoading || loading) {
    return <Spinner position={"relative"} />;
  }
  console.log(product);
  if (error) {
    console.log(error);
  }
  if (!isLoading && !loading) {
    var productsArr = products.data.map((product) => {
      let category_name = categories.data.find(
        (c) => c.id == product.category_id
      ).category_name;

      return { ...product, category_name };
    });
  }
  return (
    products && (
      <main>
        <div className="flex-1 py-6">
          <div className="w-full mx-auto px-4 py-6 sm:px-2 lg:px-12">
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full border-collapse border border-gray-800">
                <thead>
                  <tr className="border-b border-gray-600 px-4 bg-gray-200">
                    <th className="py-2 text-center">Id</th>
                    <th className="py-2 text-center">Mahsulot nomi</th>
                    <th className="py-2 text-center">Kategoriyasi</th>
                    <th className="py-2 text-center">Narxi</th>
                    <th className="py-2 text-center">Yuklama</th>
                    <th className="py-2 text-center">O'lchami</th>
                    <th className="py-2 text-center">Miqdori</th>
                    <th className="py-2 text-center">Status</th>
                    <th className="py-2 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {productsArr
                    .sort((a, b) => a.id - b.id)
                    .map((el, index) => (
                      <tr
                        key={el.id}
                        className="border-b border-gray-600 px-4 "
                      >
                        <td className="py-2 text-center">{index + 1}</td>
                        <td className="py-2 text-center">{el.product_name}</td>
                        <td className="py-2 text-center">{el.category_name}</td>
                        <td className="py-2 text-center">{el.price}</td>
                        <td className="py-2 text-center">{el.overweight}</td>
                        <td className="py-2 text-center">{el.size}</td>
                        <td className="py-2 text-center">{el.count}</td>
                        <td className="text-center">
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
                        <td className="px-4 py-1 flex gap-x-2 justify-end text-center">
                          {" "}
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-[#FBE9E9] hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-[#FBE9E9] dark:focus:ring-red-900"
                            onClick={() => deleteProduct(el.id)}
                          >
                            <MdDeleteOutline
                              style={{ fill: "#f00", fontSize: "20px" }}
                            />
                          </button>
                          <Button
                            className="focus:outline-none text-white bg-[#E6ECEE] hover:bg-[#E6ECEE] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2"
                            onClick={() => {
                              setProductModal(true);
                              setProduct(el);
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
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Button
                color={"primary"}
                className="focus:outline-none border-none text-white bg-[#E6ECEE] hover:bg-[#E6ECEE] font-medium rounded-lg text-sm mt-3 py-2"
                onClick={() => setProductModal(true)}
              >
                Qo'shish
              </Button>
              <ProductModal
                product={product}
                categories={categories}
                setProductModal={setProductModal}
                productModal={productModal}
                setProduct={setProduct}
              />
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default Products;
