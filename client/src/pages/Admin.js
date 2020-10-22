import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminAuth from "../components/admin/AdminAuth";
import Brands from "../components/admin/Brands";
import Contacts from "../components/admin/Contacts";
import Dashboard from "../components/admin/Dashboard";
import News from "../components/admin/News";
import Products from "../components/admin/Products";
import Ratings from "../components/admin/Ratings";
import Users from "../components/admin/Users";
import { logout } from "../redux/actions/auth";

function Admin() {
  const dispatch = useDispatch();
  const [route, setRoute] = useState("users");
  const [users, setUsers] = useState([]);
  const [rates, setRates] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [
    isAuthenticated,
    user,
    products,
    brands,
    news,
  ] = useSelector(({ auth, products }) => [
    auth.isAuthenticated,
    auth.user,
    products.products,
    products.brands,
    products.news,
  ]);

  const getData = () => {
    axios
      .get("/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/rates")
      .then((res) => {
        setRates(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/contacts")
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    document.title = "Admin";
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getData();
    }
  }, [isAuthenticated]);

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact._id != id));
  };

  const deleteRate = (id) => {
    setRates(rates.filter((rate) => rate._id != id));
  };

  const addUser = (user) => {
    setUsers([user, ...users]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u._id != id));
  };

  const bodyContainer =
    route === "dashboard" ? (
      <Dashboard
        products={products}
        brands={brands}
        news={news}
        users={users}
        rates={rates}
        contacts={contacts}
      />
    ) : route === "users" ? (
      <Users users={users} addUser={addUser} deleteUser={deleteUser} />
    ) : route === "products" ? (
      <Products products={products} brands={brands} dispatch={dispatch} />
    ) : route === "brands" ? (
      <Brands brands={brands} dispatch={dispatch} />
    ) : route === "ratings" ? (
      <Ratings rates={rates} deleteRate={deleteRate} />
    ) : route === "contacts" ? (
      <Contacts contacts={contacts} deleteContact={deleteContact} />
    ) : route === "news" ? (
      <News news={news} dispatch={dispatch} />
    ) : null;

  return (
    <>
      {isAuthenticated &&
      (user.role === "admin" || user.role === "super-admin") ? (
        <div>
          <nav id="header" className="bg-white fixed w-full z-10 top-0 shadow">
            <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
              <div
                className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white z-20"
                id="nav-content"
              >
                <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                  <li className="mr-6 my-2 md:my-0">
                    <div
                      onClick={() => setRoute("dashboard")}
                      className="cursor-pointer block py-1 md:py-3 pl-1 align-middle hover:border-orange-600"
                    >
                      <i className="fas fa-home fa-fw mr-3" />
                      <span className="pb-1 md:pb-0 text-sm">Dashboard</span>
                    </div>
                  </li>
                  <li className="mr-6 my-2 md:my-0">
                    <div
                      onClick={() => setRoute("users")}
                      className="cursor-pointer block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-pink-500"
                    >
                      <i className="fas fa-users fa-fw mr-3" />
                      <span className="pb-1 md:pb-0 text-sm">Users</span>
                    </div>
                  </li>
                  <li className="mr-6 my-2 md:my-0">
                    <div
                      onClick={() => setRoute("products")}
                      className="cursor-pointer block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500"
                    >
                      <i className="fa fa-truck fa-fw mr-3" />
                      <span className="pb-1 md:pb-0 text-sm">Products</span>
                    </div>
                  </li>
                  <li className="mr-6 my-2 md:my-0">
                    <div
                      onClick={() => setRoute("brands")}
                      className="cursor-pointer block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-green-500"
                    >
                      <i className="fas fa-copyright fa-fw mr-3" />
                      <span className="pb-1 md:pb-0 text-sm">Brands</span>
                    </div>
                  </li>
                  <li className="mr-6 my-2 md:my-0">
                    <div
                      onClick={() => setRoute("news")}
                      className="cursor-pointer block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-green-500"
                    >
                      <i className="fas fa-newspaper fa-fw mr-3" />
                      <span className="pb-1 md:pb-0 text-sm">News</span>
                    </div>
                  </li>
                  <li className="mr-6 my-2 md:my-0">
                    <div
                      onClick={() => setRoute("ratings")}
                      className="cursor-pointer block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-red-500"
                    >
                      <i className="fa fa-chart-bar fa-fw mr-3" />
                      <span className="pb-1 md:pb-0 text-sm">Ratings</span>
                    </div>
                  </li>
                  <li className="mr-6 my-2 md:my-0">
                    <div
                      onClick={() => setRoute("contacts")}
                      className="cursor-pointer block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-red-500"
                    >
                      <i className="fa fa-tasks fa-fw mr-3" />
                      <span className="pb-1 md:pb-0 text-sm">Contacts</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex-1">
                <div className="flex relative inline-block float-right">
                  <div className="relative text-sm">
                    <button
                      id="userButton"
                      className="flex items-center focus:outline-none mr-3"
                    >
                      <span className="hidden md:inline-block">
                        Hi, {user.name}
                      </span>
                      {/* <svg className="pl-2 h-2" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlnsXlink="http://www.w3.org/1999/xlink" enableBackground="new 0 0 129 129">
                      <g>
                        <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" />
                      </g>
                    </svg> */}
                      <button
                        className="ml-4 whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-red-800 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-6 rounded button"
                        onClick={() => dispatch(logout())}
                      >
                        Logout
                      </button>
                    </button>
                    {/* <div id="userMenu" className="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible">
                    <ul className="list-reset">
                      <li><div onClick={() => setRoute('dashboard')} className="cursor-pointer px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">My account</div></li>
                      <li><div onClick={() => setRoute('dashboard')} className="cursor-pointer px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">Notifications</div></li>
                      <li>
                        <hr className="border-t mx-2 border-gray-400" />
                      </li>
                      <li><div onClick={() => setRoute('dashboard')} className="cursor-pointer px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">Logout</div></li>
                    </ul>
                  </div> */}
                  </div>
                  <div className="block lg:hidden pr-4">
                    <button
                      id="nav-toggle"
                      className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none"
                    >
                      <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          {/*Container*/}
          <div className="container w-full mx-auto pt-20">{bodyContainer}</div>
          {/*/container*/}
        </div>
      ) : (
        <AdminAuth />
      )}
    </>
  );
}

export default Admin;
