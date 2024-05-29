import { FileInput, Label, Modal, TextInput } from "flowbite-react";
import { useDispatch } from "react-redux";
import { addData, updateData } from "../../utils/slice";
import { BASE_URL } from "../../data/data";
import { toast } from "react-toastify";

const AdminAddresses = ({ address, openModal, setOpenModal, setAddress }) => {
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const requestaddress = async (e) => {
    e.preventDefault();
    const newData = new FormData();
    newData.append("address", address.address);
    newData.append("description", address.description);
    newData.append(
      "image",
      typeof address.image == "string" ? null : address.image
    );
    newData.append("location", address.location);
    if (address.id) {
      let id = address.id;
      newData.append("state", address.state ? 1 : 0);
      newData.append("isActive", true);
      dispatch(
        updateData({ apiEndpoint: "addresses", id, newData, accessToken })
      );
      toast.success("Texnologiya muvaffaqiyatli o'zgartirildi!");
    } else {
      dispatch(addData({ apiEndpoint: "addresses", newData }));
      toast.success("Texnologiya muvaffaqiyatli qo'shildi!");
    }
    setOpenModal(false);
    setAddress({ address: "", image: "", description: "", state: true });
  };
  return (
    <Modal
      className="backdrop-blur-sm"
      size={"3xl"}
      show={openModal}
      onClose={() => {
        setOpenModal(false);
        setAddress({ address: "", image: "", description: "", state: true });
      }}
    >
      <Modal.Header>
        {address.id ? "Texnologiya tahrirlash" : "Texnologiya qo'shish"}{" "}
      </Modal.Header>
      <Modal.Body>
        <form
          className="grid grid-cols-1 md:grid-cols-3 w-full gap-4"
          onSubmit={requestaddress}
        >
          {" "}
          <div className="max-w-full md:max-w-md">
            <Label
              htmlFor="dropzone-image"
              className="flex w-full h-[200px] relative cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                  MP4 format
                </p>
                {address.image?.type && (
                  <img
                    src={URL.createObjectURL(address.image)}
                    className="w-full h-full bg-gray-200 object-contain absolute top-0 left-0 rounded-lg"
                    alt=""
                  />
                )}
                {address?.image.length > 0 && (
                  <img
                    src={`${BASE_URL}uploads/addresses/${address.image}`}
                    className="w-full h-full bg-gray-200 object-contain absolute top-0 left-0 rounded-lg"
                    alt=""
                  />
                )}
              </div>
              <FileInput
                id="dropzone-image"
                className="hidden"
                name="image"
                onChange={(e) => {
                  setAddress({ ...address, image: e.target.files[0] });
                }}
              />
            </Label>
          </div>
          <div className="max-w-full md:max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="address" value="Texnologiya nomi" />
            </div>
            <TextInput
              id="address"
              className="border-2 rounded-lg"
              type="text"
              placeholder="Lyuks Soft"
              value={address.address}
              onChange={onChangeHandler}
              name="address"
              required
            />
            <div className="mb-2 block">
              <Label htmlFor="location" value="Texnologiya nomi" />
            </div>
            <TextInput
              id="location"
              className="border-2 rounded-lg"
              type="text"
              placeholder="Lyuks Soft"
              value={address.location}
              onChange={onChangeHandler}
              name="location"
              required
            />
            <div className="flex items-center justify-between gap-2 mt-4">
              <Label htmlFor="state">Holat</Label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={address.state}
                  className="sr-only peer"
                  checked={address.state}
                  id="state"
                  onChange={() => {
                    setAddress({
                      ...address,
                      state: !address.state,
                    });
                  }}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
              </label>
            </div>
          </div>
          <div className="max-w-full md:max-w-md">
            {" "}
            <div className="mb-2 block">
              <Label htmlFor="textarea" value="Ma'lumot" />
            </div>
            <TextInput
              id="textarea"
              className="border-2 rounded-lg"
              type="text"
              placeholder="Matn..."
              value={address.description}
              onChange={onChangeHandler}
              name="description"
              required
            />
            <button
              className="w-full py-2 mt-[32px] bg-white border-2 border-indigo-500 rounded-md"
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

export default AdminAddresses;
