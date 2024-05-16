import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { MdDeleteOutline } from "react-icons/md";
import Spinner from "../../../components/Spinner/Spinner";
import { deleteData, fetchData, updateData } from "../../../utils/slice";
import { useDispatch, useSelector } from "react-redux";
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
import { ProductModal } from "../../../components";
import { HiHome } from "react-icons/hi";
import ExportButton from "../../../components/ExportButton/ExportButton";
const Products = () => {
  const { data: categories, loading } = useFetch("categories");
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);
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
    dispatch(fetchData(`products?page=${currentPage}&limit=8`));
  }, [dispatch, currentPage]);

  const deleteProduct = (id) => {
    dispatch(deleteData({ apiEndpoint: "products", id }));
  };

  const updateProduct = (data, id) => {
    let newData = { status: data };
    dispatch(updateData({ apiEndpoint: "products", id, newData, accessToken }));
  };

  if (isLoading || loading) {
    return <Spinner position={"relative"} />;
  }
  let filteredArray = products?.data.map((obj) => {
    let {
      id,
      category_id,
      product_name,
      count,
      price,
      overweight,
      capacity,
      size,
      discount,
      guarantee,
      description,
      image,
      status,
    } = obj;
    return {
      id,
      category_id,
      product_name,
      count,
      price,
      overweight,
      capacity,
      size,
      discount,
      guarantee,
      description,
      image,
      status,
    };
  });

  if (error) {
    console.log(error);
  }
  if (products && !loading && !isLoading) {
    var productsArr = products.data.map((product) => {
      let category_name = categories.data.find(
        (c) => c.id == product.category_id
      )?.category_name;

      return { ...product, category_name };
    });
  }
  console.log(products);
  return (
    products &&
    productsArr &&
    filteredArray && (
      <main className="pt-[90px]">
        <div className="flex-1 py-6">
          <Breadcrumb aria-label="Products page" className="ml-[48px] mb-4">
            <Breadcrumb.Item href="/admin" icon={HiHome}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Mahsulotlar</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-3xl font-medium ml-[50px]">Mahsulotlar</h1>
          <div className="w-full mx-auto px-4 py-6 sm:px-2 lg:px-12">
            <div className="border mb-6"></div>
            <div className="overflow-x-auto w-full rounded-lg shadow-lg">
              <Table hoverable className="table-auto w-full rounded-lg">
                <TableHead className="border-gray-800">
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Id
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Mahsulot nomi
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Kategoriyasi
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Narxi
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Yuklama
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    O'lchami
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Miqdori
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Status
                  </TableHeadCell>
                  <TableHeadCell className="text-center bg-gray-700 text-white py-4">
                    Actions
                  </TableHeadCell>
                </TableHead>
                <TableBody>
                  {productsArr
                    .sort((a, b) => a.id - b.id)
                    .map((el, index) => (
                      <TableRow
                        key={el.id}
                        className="border-b border-gray-200"
                      >
                        <TableCell className="py-1 text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="py-1 text-center">
                          {el.product_name}
                        </TableCell>
                        <TableCell className="py-1 text-center">
                          {el.category_name}
                        </TableCell>
                        <TableCell className="py-1 text-center">
                          {el.price}
                        </TableCell>
                        <TableCell className="py-1 text-center">
                          {el.overweight}
                        </TableCell>
                        <TableCell className="py-1 text-center">
                          {el.size}
                        </TableCell>
                        <TableCell className="py-1 text-center">
                          {el.count}
                        </TableCell>
                        <TableCell className="py-1 text-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value={el.status}
                              className="sr-only peer"
                              checked={el.status}
                              onChange={() => updateProduct(!el.status, el.id)}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
                          </label>
                        </TableCell>
                        <TableCell className="py-1 px-4 py-1 flex gap-x-2 justify-center text-center">
                          {" "}
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-[#FBE9E9] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-3 dark:bg-red-600 dark:hover:bg-[#FBE9E9] dark:focus:ring-red-900"
                            onClick={() => deleteProduct(el.id)}
                          >
                            <MdDeleteOutline
                              style={{ fill: "#f00", fontSize: "20px" }}
                            />
                          </button>
                          <button
                            className="focus:outline-none text-white bg-[#E6ECEE] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3"
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
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow className="border-b border-gray-200">
                    <TableCell className="py-1 text-center" colSpan={9}>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={products?.pagination?.totalPages}
                        onPageChange={onPageChange}
                        showIcons
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="ml-[48px] w-[150px] justify-center text-white p-3 mt-4 bg-gray-700 rounded-md flex items-center"
              onClick={() => setProductModal(true)}
            >
              Qo'shish
            </button>
            <ExportButton data={filteredArray} filename={"Products"} />
          </div>
          <ProductModal
            product={product}
            categories={categories}
            setProductModal={setProductModal}
            productModal={productModal}
            setProduct={setProduct}
          />
        </div>
      </main>
    )
  );
};

export default Products;
