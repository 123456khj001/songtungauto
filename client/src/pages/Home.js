import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Carousel } from "antd";

import Brands from "../components/Brands";
import GridProducts from "../components/GridProducts";

function Home() {
  const [products, isLoading] = useSelector(({ products, errors }) => [
    products.products,
    errors.isLoading,
  ]);

  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  return (
    <>
      <Carousel autoplay className="z-0">
        <div>
          <img
            src="https://bizweb.dktcdn.net/100/134/646/themes/177778/assets/bg4-banner7.jpg?1594139451449"
            alt="image"
          />
        </div>
        <div className="">
          <img
            src="https://bizweb.dktcdn.net/100/134/646/themes/177778/assets/bg4-banner7.jpg?1594139451449"
            alt="image"
            //  style={{width: '100%', height: 'auto', position: 'relative', top: '50%', "-ms-transform": 'translateY(-50%)', '-webkit-transform': 'translateY(-50%)', transform: 'translateY(-50%)'}}
          />
        </div>
        <div>
          <img
            src="https://bizweb.dktcdn.net/100/134/646/themes/177778/assets/bg4-banner7.jpg?1594139451449"
            alt="image"
          />
        </div>
        <div>
          <img
            src="https://bizweb.dktcdn.net/100/134/646/themes/177778/assets/bg4-banner7.jpg?1594139451449"
            alt="image"
          />
        </div>
      </Carousel>
      <div className="bg-gray-100 min-height-main">
        <div className="grid grid-cols-4 pl-2 pr-2 xl:pl-24 xl:pr-24 lg:pl-24 lg:pr-24 text-center pt-8 pb-8">
          <div className="hidden xl:block lg:block ">
            <Brands />
          </div>
          <div className="col-span-4 xl:col-span-3 lg:col-span-3 mx-4 ">
            <div>
              <div className="text-left text-2xl text-black-400 uppercase pb-2 font-semibold">
                SẢN PHẨM NỔI BẬT
              </div>
              <GridProducts products={products.slice(0, 6)} />
            </div>
            <div className="text-left my-4">
              <div className="text-2xl  text-black-400 uppercase mb-4 font-semibold">
                <Link to="/new-products" className="hover:text-red-400">
                  XE MỚI
                </Link>
              </div>

              <GridProducts
                products={products
                  .filter((product) => !product.isOld)
                  .slice(0, 6)}
              />
            </div>
            <div className="text-left my-4">
              <div className="text-2xl  text-black-400 uppercase mb-4 font-semibold">
                <Link to="/old-products" className="hover:text-red-400">
                  XE ĐÃ QUA SỬ DỤNG
                </Link>
              </div>
              <GridProducts
                products={products
                  .filter((product) => product.isOld)
                  .slice(0, 6)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
