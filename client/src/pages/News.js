import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

function News() {
  const news = useSelector(({ products }) => products.news);

  useEffect(() => {
    document.title = "Tin tức";
  }, []);

  return (
    <div className="min-height-main pl-2 pr-2 xl:pl-24 xl:pr-24 lg:pl-24 lg:pr-24">
      <div className="flex flex-col my-4">
        {typeof news !== "undefined" ? (
          news.map((e) => (
            <div className="flex h-60 my-4">
              <img
                className="w-1/4 object-cover mr-8"
                src={`/images/${e.image}`}
                alt="img"
              />
              <div className="flex flex-col justify-between flex-1 py-8">
                <div>
                  <div className="uppercase text-xl text-gray-600">
                    {formatDate(e.createdAt)}
                  </div>
                  <Link
                    to={`/news/${e._id}`}
                    className="uppercase text-xl font-semibold hover:text-red-400"
                  >
                    {e.title}
                  </Link>
                </div>
                <div>
                  <Link to={`/news/${e._id}`} className="hover:text-red-400">
                    Xem them
                  </Link>
                  <div>Đăng bởi: {e.authorId.name}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Không có bài viết nào</div>
        )}
      </div>
    </div>
  );
}

export default News;
