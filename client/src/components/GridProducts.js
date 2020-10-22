import React from "react";
import { Link } from "react-router-dom";

function GridProducts({ products }) {
  console.log(products);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 text-center">
      {products.length > 0 ? (
        products.map((product, index) => (
          <Link
            to={`/products/${product._id}`}
            key={index}
            className="mx-auto mb-4 max-h-56 w-full cursor-pointer text-white hover:text-white"
          >
            <div className="items-center mx-8 bg-red-800 rounded overflow-hidden shadow-lg">
              <div className="h-1/4">
                <img
                  className="w-full h-48 object-cover"
                  src={`/images/${product.images[0]}`}
                  alt="image"
                />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center text-xl text-black-400  font-semibold">
          Không có sản phẩm nào
        </div>
      )}
    </div>
  );
}

export default GridProducts;
