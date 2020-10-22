import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../redux/actions/auth";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [birthday, setBirthday] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [address, setAddress] = useState("");

  // const auth = useSelector(({auth}) => auth)
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Đăng ký";
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
            htmlFor="name"
          >
            Họ và tên *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="name"
            type="text"
            placeholder="Ví dụ: Trần Văn A"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="username"
          >
            Tên đăng nhập *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Ví dụ: user1"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Mật khẩu *
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="Mật khẩu của bạn"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password2"
          >
            Nhập lại mật khẩu *
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password2"
            type="password"
            placeholder="Nhập lại mật khẩu của bạn"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="birthday"
          >
            Ngày sinh *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="birthday"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="address"
          >
            Địa chỉ *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="address"
            type="text"
            placeholder="Ví dụ: 123 Street"
            onChange={(e) => setAddress(e.target.value)}
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
                dispatch(
                  register({
                    name,
                    username,
                    password,
                    password2,
                    birthday,
                    address,
                  })
                );
              }
            }}
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
