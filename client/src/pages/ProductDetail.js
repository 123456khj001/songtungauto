import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Brands from "../components/Brands";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";

function ProductDetail() {
  const [star, setStar] = useState(5);
  const [description, setDescription] = useState("");

  const [
    isAuthenticated,
    products,
    isLoading,
  ] = useSelector(({ auth, products, errors }) => [
    auth.isAuthenticated,
    products.products,
    errors.isLoading,
  ]);

  let { id } = useParams();

  const product = products.find((p) => p._id == id);

  const sendRate = () => {
    if (!isAuthenticated)
      toast.warn("Bạn cần phải đăng nhập để có thể đánh giá.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    else {
      axios
        .post("/api/rates", { productId: id, star, description })
        .then((res) => {
          setDescription("");
          setStar(5);
          toast.success("Bạn đã gửi thành công!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="bg-gray-100 min-height-main">
      <div className="grid grid-cols-4 pl-2 pr-2 xl:pl-24 xl:pr-24 lg:pl-24 lg:pr-24 text-center pt-8 pb-8">
        <div className="hidden xl:block lg:block ">
          <Brands />
        </div>
        <div className="col-span-4 xl:col-span-3 lg:col-span-3 px-8">
          {!!product ? (
            <>
              <div className="text-left text-2xl text-black-400 uppercase pb-2 font-semibold">
                {product.name}
                {/* <div>
              <StarRatings
                rating={star}
                starRatedColor="blue"
                changeRating={value => setStar(value)}
                starRatedColor="yellow"
                starHoverColor="yellow"
                name='rating'
              />
            </div> */}
              </div>
              <div className="flex">
                <div className="flex-1">
                  <img
                    className="w-full h-64 object-cover"
                    src={`/images/${product.images[0]}`}
                    alt="image"
                  />
                </div>
                <div className="flex-1 mx-4">
                  <div className="text-left text-xl text-black-400 uppercase pb-2 font-medium">
                    Thông số kỹ thuật
                  </div>
                  <div className="flex">
                    <div className="flex-1 border py-2 text-left text-xl text-black-400 font-medium pl-4">
                      Xuất xứ
                    </div>
                    <div className="flex-1 border py-2 text-center text-xl text-black-400 font-medium pl-4">
                      {product.origin}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 border py-2 text-left text-xl text-black-400 font-medium pl-4">
                      Năm sản xuất
                    </div>
                    <div className="flex-1 border py-2 text-center text-xl text-black-400 font-medium pl-4">
                      {product.year}
                    </div>
                  </div>
                  {/* <div className="flex">
                    <div className="flex-1 border py-2 text-left text-xl text-black-400 font-medium pl-4">
                      Giá
                    </div>
                    <div className="flex-1 border py-2 text-center text-xl text-black-400 font-medium pl-4">
                      1000000 VND
                    </div>
                  </div> */}
                </div>
              </div>
              <div>
                <div className="text-left text-xl text-black-400 uppercase py-2 font-medium">
                  Mô tả sản phẩm
                </div>
                <div className="text-left">{product.description}</div>
              </div>

              <div>
                <div className="text-left text-xl text-black-400 uppercase py-2 font-medium">
                  Đánh giá
                </div>
                <StarRatings
                  rating={star}
                  starRatedColor="blue"
                  changeRating={(value) => setStar(value)}
                  starRatedColor="yellow"
                  starHoverColor="yellow"
                  name="rating"
                />
                <textarea
                  className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 my-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                  id="message"
                  value={description}
                  placeholder="Bạn nghĩ gì về sản phẩm?"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button
                  className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none  text-white font-bold py-2 px-8 rounded"
                  type="button"
                  onClick={sendRate}
                >
                  GỬI
                </button>
              </div>
            </>
          ) : (
            <div>Không có sản phẩm này</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
