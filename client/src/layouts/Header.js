import jwt_decode from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout, setCurrentUser } from "../redux/actions/auth";
import { getBrands, getProducts, getNews } from "../redux/actions/products";
import setAuthToken from "../utils/setAuthToken";

function Header({ props }) {
  const [user, isAuthenticated] = useSelector(({ auth }) => [
    auth.user,
    auth.isAuthenticated,
  ]);
  const dispatch = useDispatch();
  const location = useLocation();

  const isAdminRoute = location.pathname.includes("/admin");

  const getToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwt_decode(token.split(" ")[1]);
      if (decoded.exp < new Date().getTime() / 1000) {
        localStorage.removeItem("jwtToken");
      } else {
        setAuthToken(token);
        dispatch(setCurrentUser(decoded));
      }
    }
  };

  useEffect(() => {
    getToken();
    dispatch(getBrands());
    dispatch(getProducts());
    dispatch(getNews());
  }, []);

  return (
    <>
      {!isAdminRoute ? (
        <div className="sticky top-0 z-10 bg-white shadow-xl">
          <div className="bg-red-800 h-10 pl-2 pr-2 xl:pl-24 xl:pr-24 lg:pl-24 lg:pr-24 md:pl-2 md:pr-2 sm:pl-2 sm:pr-2">
            <div className="h-full flex items-center xl:justify-between lg:justify-between md:justify-center sm:justify-center justify-center text-white">
              <div className="hidden xl:block lg:block md:hidden sm:hidden">
                Số 2 Tôn Thất Thuyết, P. Mỹ Đình 2, Quận Nam Từ Liêm, TP. Hà Nội
              </div>

              <div className="flex items-center justify-center">
                <div className="m-4">098 590 8888 - 093 564 6666</div>
                <div>sontungauto6666@gmail.com</div>
              </div>
            </div>
          </div>
          <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col flex-col items-center justify-center xl:pl-24 xl:pr-24 lg:pl-24 lg:pr-24 md:pl-2 md:pr-2 sm:pl-2 sm:pr-2 pl-2 pr-2 pt-4 pb-4">
            <Link to="/" className="w-48">
              <img
                className="object-fill"
                src="https://bizweb.dktcdn.net/100/134/646/themes/177778/assets/logo-home3.png?1594139451449"
                alt="logo"
              />
            </Link>

            <div className="hidden xl:block lg:hidden md:hidden sm:hidden">
              <Link
                className="inline-block m-4 cursor-pointer hover:text-red-800 font-semibold text-base"
                to="/new-products"
              >
                XE MỚI
              </Link>
              <Link
                className="inline-block m-4 cursor-pointer hover:text-red-800 font-semibold text-base"
                to="/old-products"
              >
                XE ĐÃ QUA SỬ DỤNG
              </Link>
              <Link
                className="inline-block m-4 cursor-pointer hover:text-red-800 font-semibold text-base"
                to="/news"
              >
                TIN TỨC
              </Link>
              <Link
                className="inline-block m-4 cursor-pointer hover:text-red-800 font-semibold text-base"
                to="/contact"
              >
                LIÊN HỆ
              </Link>
            </div>

            <div className="flex ml-0 xl:ml-auto lg:ml-auto items-center justify-center">
              {isAuthenticated ? (
                <>
                  <div className="py-2 px-6 rounded mr-2 font-bold">
                    {user.name}
                  </div>
                  <button
                    className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-red-800 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-6 rounded button"
                    onClick={() => dispatch(logout())}
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow hover:bg-red-400 focus:shadow-outline focus:outline-none hover:text-white text-md py-2 px-6 rounded mr-2 button"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-red-800 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-6 rounded button"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Header;
