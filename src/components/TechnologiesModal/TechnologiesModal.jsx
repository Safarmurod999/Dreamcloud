import { FileInput, Label, Modal, TextInput } from "flowbite-react";
import { postProduct, updateProduct } from "../../utils/postData";

const TechnologiesModal = ({
  technology,
  openModal,
  setOpenModal,
  setTechnology,
}) => {
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";
  const onChangeHandler = (e) => {
    setTechnology({ ...technology, [e.target.name]: e.target.value });
  };
  const requestTechnology = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", technology.name);
    data.append("description", technology.description);
    data.append("video", technology.video);
    data.append("state", technology.state ? 1 : 0);
    if (technology.id) {
      await updateProduct("technologies", data, technology.id, accessToken);
    } else {
      await postProduct("technologies", data);
    }
    setOpenModal(false);
    setTechnology({ name: "", video: "", description: "", state: 1 });
  };
  return (
    <>
      <Modal
        className="bg-opacity backdrop-blur-sm"
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setTechnology({ name: "", video: "", description: "", state: 1 });
        }}
      >
        <Modal.Header>
          {technology.id ? "Texnologiya tahrirlash" : "Texnologiya qo'shish"}
        </Modal.Header>
        <Modal.Body>
          <form
            className="grid grid-cols-2 w-full gap-4"
            onSubmit={requestTechnology}
          >
            {" "}
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="technology" value="Texnologiya nomi" />
              </div>
              <TextInput
                id="technology"
                className="border-2 rounded-lg"
                type="text"
                placeholder="Lyuks Soft"
                value={technology.name}
                onChange={onChangeHandler}
                name="name"
                required
              />
              <div className="mb-2 block">
                <Label htmlFor="textarea" value="Ma'lumot" />
              </div>
              <TextInput
                id="textarea"
                className="border-2 rounded-lg"
                type="text"
                placeholder="Matn..."
                value={technology.description}
                onChange={onChangeHandler}
                name="description"
                required
              />
              <button
                className="w-full py-2 mt-4 bg-white border-2 border-indigo-500 rounded-md"
                style={{ border: "1px solid" }}
                type="submit"
              >
                Submit
              </button>
            </div>
            <div className="max-w-md">
              <Label
                htmlFor="dropzone-video"
                className="flex w-full h-full relative cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    MP4 format
                  </p>
                </div>
                <FileInput
                  id="dropzone-video"
                  className="hidden"
                  name="video"
                  onChange={(e) => {
                    setTechnology({ ...technology, video: e.target.files[0] });
                  }}
                />
              </Label>
              <p className="text-center">{technology.video.name}</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="state">Holat</Label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={technology.state}
                  className="sr-only peer"
                  checked={technology.state}
                  id="state"
                  onChange={() => {
                    setTechnology({
                      ...technology,
                      state: !technology.state,
                    });
                  }}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
              </label>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default TechnologiesModal;
