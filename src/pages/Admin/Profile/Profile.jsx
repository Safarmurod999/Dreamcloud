import React, { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { Breadcrumb, Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, updateData } from "../../../utils/slice";
import { HiHome } from "react-icons/hi";
const Profile = () => {
  const [data, setData] = useState({
    username: null,
    password: null,
  });

  let accessToken = JSON.parse(localStorage.getItem("access_token")) || "";
  let username = JSON.parse(localStorage.getItem("username")) || "User";

  const dispatch = useDispatch();
  const admin = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchData(`admin/${username}`));
  }, [dispatch,username]);

  const updateAdmin = (e) => {
    e.preventDefault();
    let id = admin.data[0]?.id;
    let newData = data;
    console.log(accessToken);
    dispatch(updateData({ apiEndpoint: `admin`, id, newData, accessToken }));
  };
  if (isLoading) {
    return <Spinner position={"relative"} />;
  }

  console.log(admin);
  if (error) {
    console.log(error);
  }
  return (
    admin && (
      <main>
        <div className="flex-1 py-6">
          <Breadcrumb aria-label="admin page" className="ml-[48px] mb-4">
            <Breadcrumb.Item href="/admin" icon={HiHome}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Profile</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-3xl font-medium ml-[50px]">Profile</h1>
          <div className="w-full mx-auto px-4 py-6 sm:px-2 lg:px-12">
            <div className="border mb-6"></div>
            <div className="overflow-x-auto w-full rounded-lg">
              <div className="flex justify-between gap-4">
                <div className="flex grow-[0.4] flex-col">
                  <p>Joined {admin.data[0]?.createdAt.slice(0, 10)}</p>
                  <form
                    className="flex mt-4 flex-col gap-4"
                    onSubmit={updateAdmin}
                  >
                    <div className="w-full">
                      <div className="mb-2 block">
                        <Label htmlFor="username" value="Username" />
                      </div>
                      <TextInput
                        id="username"
                        className="w-full border rounded-md"
                        type="text"
                        placeholder="Safarmurod Urinov"
                        value={data.username ?? admin.data[0].username}
                        onChange={(e) =>
                          setData({ ...data, username: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="password" value="Password" />
                      </div>
                      <TextInput
                        id="password"
                        className="w-full border rounded-md"
                        type="password"
                        value={data.password ?? admin.data[0].password}
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="focus:outline-none focus:ring-0 border-none text-gray-800 bg-[#E6ECEE] hover:ring-2 font-medium rounded-lg text-sm mt-3 w-[150px] h-[40px]"
                    >
                      Saqlash
                    </button>
                  </form>
                </div>
                <img
                  className="h-[200px] w-[200px] rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Your Company"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default Profile;
