import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const sendNewContact = () => {
    axios
      .post("/api/contacts", { name, email, phone, message })
      .then((res) => {
        toast.success("Bạn đã gửi thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      })
      .catch((err) => {});
  };

  useEffect(() => {
    document.title = "Liên hệ";
  }, []);

  return (
    <div className="min-height-main mt-8 mb-8">
      <form className="w-full max-w-md m-auto">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Họ và tên
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              placeholder="Ví dụ: Trần Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="phone-number"
            >
              Số điện thoại
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="phone-number"
              type="text"
              value={phone}
              placeholder="Ví dụ: 0966777666"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              value={email}
              placeholder="Ví dự: example@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Lời nhắn
            </label>
            <textarea
              className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              id="message"
              value={message}
              placeholder="Bạn muốn liên hệ với chúng tôi?"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <button
              className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded"
              type="button"
              onClick={sendNewContact}
            >
              GỬI
            </button>
          </div>
          <div className="md:w-2/3" />
        </div>
      </form>
    </div>
  );
}

export default Contact;
