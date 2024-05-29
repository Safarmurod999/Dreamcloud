import { Label, Modal, TextInput } from "flowbite-react";
import { useDispatch } from "react-redux";
import { addData, updateData } from "../../utils/slice";
import { toast } from "react-toastify";
const AdminModal = ({ admin, openModal, setOpenModal, setAdminData }) => {
  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";
  const onChangeHandler = (e) => {
    setAdminData({ ...admin, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const requestadmin = (e) => {
    e.preventDefault();
    if (admin.id) {
      let id = admin.id;
      let newData = {
        username: admin.username,
        password: admin.password,
        email: admin.email,
        isSuperAdmin: admin.isSuperAdmin,
      };
      dispatch(updateData({ apiEndpoint: "admin", id, newData, accessToken }));
      toast.success("Admin muvaffaqiyatli o'zgartirildi!");
    } else {
      let newData = {
        username: admin.username,
        password: admin.password,
        email: admin.email,
      };
      dispatch(addData({ apiEndpoint: "admin", newData }));
      toast.success("Admin muvaffaqiyatli qo'shildi!");
    }
    setOpenModal(false);
    setAdminData({ username: "", password: "", isSuperAdmin: false });
  };
  return (
    <>
      <Modal
        className="bg-opacity backdrop-blur-sm"
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setAdminData({ username: "", isSuperAdmin: false });
        }}
        size={"sm"}
      >
        <Modal.Header>
          {admin.id ? "Kategoriya tahrirlash" : "Kategoriya qo'shish"}
        </Modal.Header>
        <Modal.Body>
          <form className="flex w-full flex-col gap-4" onSubmit={requestadmin}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="admin" value="Username" />
              </div>
              <TextInput
                id="admin"
                type="text"
                placeholder="Aliyev Vali"
                value={admin.username}
                onChange={onChangeHandler}
                name="username"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="******"
                value={admin.password}
                onChange={onChangeHandler}
                name="password"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                value={admin.email}
                onChange={onChangeHandler}
                name="email"
                required
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="super">Super Admin</Label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={admin.isSuperAdmin}
                  className="sr-only peer"
                  checked={admin.isSuperAdmin}
                  id="super"
                  onChange={() => {
                    setAdminData({
                      ...admin,
                      isSuperAdmin: !admin.isSuperAdmin,
                    });
                  }}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
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
