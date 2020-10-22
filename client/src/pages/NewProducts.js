import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Brands from "../components/Brands";
import GridProducts from "../components/GridProducts";

function NewProducts() {
  const [searchInput, setSearchInput] = useState("");

  const [products, isLoading] = useSelector(({ products, errors }) => [
    products.products,
    errors.isLoading,
  ]);

  useEffect(() => {
    document.title = "Xe mới";
  }, []);

  return (
    <div className="bg-gray-100 min-height-main">
      <div className="grid grid-cols-4 pl-2 pr-2 xl:pl-24 xl:pr-24 lg:pl-24 lg:pr-24 text-center pt-8 pb-8">
        <div className="hidden xl:block lg:block ">
          <Brands />
        </div>
        <div className="col-span-4 xl:col-span-3 lg:col-span-3 ml-4">
          <div className="relative flex justify-end text-gray-600 mb-4">
            <input
              type="search"
              name="serch"
              placeholder="Search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
          <GridProducts
            products={products.filter(
              (product) =>
                !product.isOld &&
                new RegExp(searchInput, "gi").test(product.name)
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default NewProducts;
