import {
  Button,
  Checkbox,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { postData, updateData } from "../../utils/postData";

const AdminModal = ({ id, category_name, isActive }) => {
  const [openModal, setOpenModal] = useState(false);
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";
  let [category, setCategory] = useState({
    category_name: category_name,
    isActive: isActive,
  });
  const onChangeHandler = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
    console.log({ ...category, [e.target.name]: e.target.value });
  };
  const requestCategory = async (e) => {
    e.preventDefault();
    if (id) {
      await updateData("categories", category, id, accessToken);
    } else {
      await postData("categories", category);
    }
    setOpenModal(false);
  };
  return (
    <>
      <Button
        className="focus:outline-none text-white bg-[#E6ECEE] hover:bg-[#E6ECEE] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2 dark:bg-blue-200 dark:hover:bg-[#E6ECEE] dark:focus:ring-blue-600"
        onClick={() => setOpenModal(true)}
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

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Kategoriya tahrirlash</Modal.Header>
        <Modal.Body>
          <form
            className="flex w-full flex-col gap-4"
            onSubmit={requestCategory}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category" value="Kategoriya nomi" />
              </div>
              <TextInput
                id="category"
                type="text"
                placeholder="Model A"
                value={category.category_name}
                onChange={onChangeHandler}
                name="category_name"
                required
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="remember">Holat</Label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={category.isActive}
                  className="sr-only peer"
                  checked={category.isActive}
                  id="remember"
                  onChange={() => {
                    setCategory({ ...category, isActive: !category.isActive });
                    console.log({ ...category, isActive: !category.isActive });
                  }}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
              </label>
            </div>
            <button
              className="py-3 bg-white border-2 border-indigo-500 rounded-md"
              style={{ border: "1px solid" }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AdminModal;
