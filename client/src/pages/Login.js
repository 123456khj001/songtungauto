import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../redux/actions/auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const auth = useSelector(({auth}) => auth)
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  return (
    <div className="min-height-main pt-10 mb-10">
      <div
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col ml-auto mr-auto
    pl-4 pr-4 xl:pl-24 xl:pr-24 lg:pl-24 lg:pr-24 w-full xl:w-1/3 lg:w-1/2 md:w-1/2"
      >
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="username"
          >
            Tên đăng nhập
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Mật khẩu
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-800 hover:bg-red-400 text-white font-bold py-2 px-4 rounded uppercase"
            type="button"
            onClick={() => {
              if (!username || !password) {
                alert("please fill all field");
              } else {
                dispatch(login({ username, password }));
              }
            }}
          >
            Đăng nhập
          </button>
          {/* <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
          Quên mật khẩu?
        </a> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
