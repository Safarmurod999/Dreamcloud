import {
  FileInput,
  Label,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useDispatch } from "react-redux";
import { addData, updateData } from "../../utils/slice";
import React from "react";

const ProductModal = ({
  product,
  setProduct,
  productModal,
  setProductModal,
  categories,
}) => {
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const onChangeNumber = (e) => {
    setProduct({ ...product, [e.target.name]: +e.target.value });
  };
  const requestProduct = (e) => {
    e.preventDefault();
    const newData = new FormData();
    newData.append("product_name", product.product_name);
    newData.append("category_id", product.category_id);
    newData.append("price", product.price);
    newData.append("count", product.count);
    newData.append("discount", product.discount);
    newData.append("overweight", product.overweight);
    newData.append("size", product.size);
    newData.append("capacity", product.capacity);
    newData.append("guarantee", product.guarantee);
    newData.append("description", product.description);
    newData.append("image", product.image);
    newData.append("status", product.status);
    if (product.id) {
      let id = product.id;
      dispatch(
        updateData({ apiEndpoint: "products", id, newData, accessToken })
      );
    } else {
      dispatch(addData({ apiEndpoint: "products", newData }));
    }
    setProductModal(false);
    setProduct({
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
  };
  return (
    <Modal
      className=" bg-opacity backdrop-blur-sm"
      show={productModal}
      size={"6xl"}
      onClose={() => {
        setProductModal(false);
        setProduct({
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
      }}
    >
      <Modal.Header>
        {product.id ? "Mahsulot tahrirlash" : "Mahsulot qo'shish"}{" "}
        {product.product_name.length > 0 && `- ${product.product_name}`}
      </Modal.Header>
      <Modal.Body>
        <form
          encType="multipart/form-data"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-[30px]"
          onSubmit={requestProduct}
        >
          <div className="max-w-full md:max-w-md">
            <Label
              htmlFor="dropzone-file"
              className="flex w-full relative cursor-pointer flex-col items-center  justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG
                </p>
                {product.image?.type && (
                  <img
                    src={URL.createObjectURL(product.image)}
                    className="w-full h-full bg-gray-200 object-contain absolute top-0 left-0 rounded-lg"
                    alt=""
                  />
                )}
              </div>
              <FileInput
                id="dropzone-file"
                className="hidden"
                name="image"
                onChange={(e) => {
                  setProduct({ ...product, image: e.target.files[0] });
                  console.log(e.target.files[0]);
                }}
              />
            </Label>
            <p className="text-center">{product.image.name}</p>
          </div>
          <div className="max-w-full md:max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="categories" value="Toifalar" />
            </div>
            <Select
              id="categories"
              className="border rounded-md"
              value={product.category_id}
              name="category_id"
              onChange={(e) =>
                setProduct({ ...product, category_id: e.target.value })
              }
            >
              {categories.data.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.category_name}
                </option>
              ))}
            </Select>
            <div className="mb-2 block">
              <Label htmlFor="product_name" value="Mahsulot nomi" />
            </div>
            <TextInput
              id="product_name"
              name="product_name"
              className="border rounded-md"
              value={product.product_name}
              type="text"
              sizing="sm"
              placeholder="Ortopedik lux"
              onChange={onChangeHandler}
            />
            <div className="mb-2 block">
              <Label htmlFor="price" value="Mahsulot narxi" />
            </div>
            <TextInput
              id="price"
              name="price"
              className="border rounded-md"
              type="text"
              sizing="sm"
              placeholder="3 000 000"
              value={product.price}
              onChange={onChangeNumber}
            />
            <div className="mb-2 block">
              <Label htmlFor="overweight" value="Yuklama" />
            </div>
            <TextInput
              id="overweight"
              name="overweight"
              className="border rounded-md"
              type="number"
              sizing="sm"
              placeholder="300 kg"
              value={product.overweight}
              onChange={onChangeNumber}
            />
          </div>
          <div className="max-w-full md:max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="size" value="O'lchami" />
            </div>
            <TextInput
              id="size"
              className="border rounded-md"
              name="size"
              type="string"
              sizing="sm"
              placeholder="200 x 140 x 40"
              value={product.size}
              onChange={onChangeHandler}
            />
            <div className="mb-2 block">
              <Label htmlFor="guarantee" value="Kafolat" />
            </div>
            <TextInput
              id="guarantee"
              className="border rounded-md"
              name="guarantee"
              type="text"
              sizing="sm"
              placeholder="1 yil"
              value={product.guarantee}
              onChange={onChangeHandler}
            />
            <div className="mb-2 block">
              <Label htmlFor="capacity" value="Sig'imi" />
            </div>
            <TextInput
              id="capacity"
              name="capacity"
              className="border rounded-md"
              type="text"
              sizing="sm"
              placeholder="3"
              value={product.capacity}
              onChange={onChangeNumber}
            />
            <div className="mb-2 block">
              <Label htmlFor="discount" value="Aksiya narxi" />
            </div>
            <TextInput
              id="discount"
              className="border rounded-md"
              name="discount"
              type="number"
              sizing="sm"
              placeholder="1 200 000"
              value={product.discount}
              onChange={onChangeNumber}
            />
          </div>
          <div className="max-w-full md:max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="count" value="Soni" />
            </div>
            <TextInput
              id="count"
              className="border rounded-md"
              name="count"
              type="number"
              sizing="sm"
              placeholder="1 200 000"
              value={product.count}
              onChange={onChangeNumber}
            />
            <div className="mb-2 block">
              <Label htmlFor="description" value="Ma'lumot" />
            </div>
            <Textarea
              id="description"
              className="border ring-1 ring-gray-200 rounded-md"
              name="description"
              placeholder="Ma'lumot kiriting ..."
              value={product.description}
              onChange={onChangeHandler}
              required
              rows={4}
            />
            <button
              className="w-full mt-5 py-3 bg-white border-2 border-indigo-500 rounded-md"
              style={{ border: "1px solid" }}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
