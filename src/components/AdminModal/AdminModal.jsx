import { Label, Modal, TextInput } from "flowbite-react";
import { postData, updateData } from "../../utils/postData";

const AdminModal = ({ category, openModal, setOpenModal, setCategory }) => {
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";
  const onChangeHandler = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  const requestCategory = async (e) => {
    e.preventDefault();
    if (category.id) {
      await updateData(
        "categories",
        { category_name: category.category_name, isActive: category.isActive },
        category.id,
        accessToken
      );
    } else {
      await postData("categories", {
        category_name: category.category_name,
      });
    }
    setOpenModal(false);
    setCategory({ category_name: "", isActive: false });
  };
  return (
    <>
      <Modal
        className="bg-opacity backdrop-blur-sm"
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setCategory({ category_name: "", isActive: false });
        }}
      >
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
