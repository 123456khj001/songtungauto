import React, { useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { formatDate } from "../../utils/formatDate";

function Users({ users, addUser, deleteUser }) {
  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [birthday, setBirthday] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("user");

  const [userId, setUserId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const handleAdd = () => {
    if (!name) {
      alert("Name field is required");
    }
    if (!username) {
      alert("username field is required");
    }
    if (!password) {
      alert("password field is required");
    }
    if (!password2) {
      alert("password confirm field is required");
    }
    if (!address) {
      alert("address field is required");
    }

    axios
      .post("/api/users", {
        name,
        username,
        password,
        password2,
        role,
        birthday,
        gender,
        address,
      })
      .then((res) => {
        setIsVisible(false);
        addUser(res.data);
        resetState();
      })
      .catch((err) => {
        const { errors } = err.response.data;
        if (typeof errors !== "undefined" && errors.length > 0) {
          alert(errors[0].message);
        }
      });
  };

  const handleUpdate = () => {
    // if (!name) {
    //   return alert("Name field is required");
    // }
    // if (!description) {
    //   return alert("description field is required");
    // }
    // let formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);
    // if (image) formData.append("image", image);
    // axios.put(`/api/brands/${brandId}`, formData).then((res) => {
    //   setIsVisible(false);
    //   dispatch(updateBrand(res.data));
    //   resetState();
    // });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/users/${id}`)
      .then((res) => {
        deleteUser(id);
      })
      .catch((err) => {
        const { errors } = err.response.data;
        if (typeof errors !== "undefined" && errors.length > 0) {
          alert(errors[0].message);
        }
      });
  };

  const showDataUpdate = (u) => {
    setName(u.name);
    setUsername(u.username);
    setBirthday(u.birthday);
    setGender("male");
    setAddress(u.address);
    setRole(u.role);
    setUserId(u._id);
    setIsUpdate(true);
    setIsVisible(true);
  };

  const resetState = () => {
    setName("");
    setUsername("");
    setPassword("");
    setPassword2("");
    setBirthday("null");
    setGender(true);
    setAddress("");
    setRole("user");
    setIsUpdate(false);
  };

  return (
    <>
      <div>
        <button
          className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-yellow-800 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-2 rounded button"
          onClick={() => setIsVisible(true)}
        >
          Add
        </button>
      </div>
      <Modal
        style={{ top: "20px" }}
        title={!isUpdate ? "Add a new product" : "Update product"}
        visible={isVisible}
        footer={null}
        onCancel={() => {
          setIsVisible(false);
          resetState();
        }}
      >
        <form className="w-full max-w-md m-auto">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          {!isUpdate ? (
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="password1"
                >
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="password1"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="password2"
                >
                  Password Confirm
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="password2"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
            </div>
          ) : null}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="role"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="super-admin">Super Admin</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="birthday"
              >
                Birthday
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="birthday"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="gender"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded"
                type="button"
                onClick={() => {
                  if (!isUpdate) handleAdd();
                  else handleUpdate();
                }}
              >
                OK
              </button>
            </div>
            <div className="md:w-2/3" />
          </div>
        </form>
      </Modal>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Birthday
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {typeof users !== "undefined" && users.length > 0 ? (
                    users.map((u) => (
                      <tr>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {u.name}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {u.username}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">
                            {formatDate(u.birthday)}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">
                            {u.gender}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          <div className="text-sm leading-5 text-gray-900">
                            {u.address}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          <div className="text-sm leading-5 text-gray-900">
                            {u.role}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                          {/* <a href="" className="text-indigo-600 hover:text-indigo-900">Edit</a> */}
                          <div className="flex">
                            <button className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-yellow-800 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-2 rounded button">
                              Edit
                            </button>
                            <button
                              className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-red-800 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-2 rounded button"
                              onClick={() => handleDelete(u._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="text-center py-4 uppercase font-medium"
                        colSpan={9}
                      >
                        No data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
