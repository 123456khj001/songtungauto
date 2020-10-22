import React, { useState, useRef } from "react";
import { Modal } from "antd";
import { addNew, deleteNew, updateNew } from "../../redux/actions/products";
import axios from "axios";

function News({ news, dispatch }) {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [newId, setNewId] = useState("");

  const fileRef = useRef();

  const handleAdd = () => {
    if (!title) {
      return alert("title field is required");
    }
    if (!image) {
      return alert("image field is required");
    }
    if (!content) {
      return alert("content field is required");
    }
    let formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    axios.post("/api/news", formData).then((res) => {
      setIsVisible(false);
      dispatch(addNew(res.data));
      resetState();
    });
    // .catch((err) => {
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err.response.data,
    //   });
    // });
  };

  const handleUpdate = () => {
    if (!title) {
      return alert("title field is required");
    }
    if (!content) {
      return alert("content field is required");
    }
    let formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (image) formData.append("image", image);

    axios.put(`/api/news/${newId}`, formData).then((res) => {
      setIsVisible(false);
      dispatch(updateNew(res.data));
      resetState();
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/brands/${id}`).then((res) => {
      dispatch(deleteNew(id));
    });
  };

  const showDataUpdate = (_new) => {
    setTitle(_new.title);
    setImage(null);
    setContent(_new.content);
    setNewId(_new._id);
    setIsUpdate(true);
    setIsVisible(true);
  };

  const resetState = () => {
    setTitle("");
    setImage(null);
    setContent("");
    setIsUpdate(false);
    fileRef.current.value = null;
  };

  return (
    <>
      <div>
        <button
          className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-yellow-800 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-2 rounded button"
          onClick={() => setIsVisible(true)}
        >
          Add
        </button>
      </div>
      <Modal
        style={{ top: "20px" }}
        title={!isUpdate ? "Add a new product" : "Update product"}
        visible={isVisible}
        footer={null}
        onCancel={() => {
          setIsVisible(false);
          resetState();
        }}
      >
        <form className="w-full max-w-md m-auto">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="image"
                name="image"
                type="file"
                ref={fileRef}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="description"
              >
                Content
              </label>
              <textarea
                className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                id="description"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded"
                type="button"
                onClick={() => {
                  if (!isUpdate) handleAdd();
                  else handleUpdate();
                }}
              >
                OK
              </button>
            </div>
            <div className="md:w-2/3" />
          </div>
        </form>
      </Modal>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>

                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>

                    <th className="px-4 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>

                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Content
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {typeof news !== "undefined" && news.length > 0 ? (
                    news.map((_new) => (
                      <tr>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {_new.title}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {_new.authorId.name}
                          </div>
                        </td>

                        <td className="px-2 py-4 h-8 w-8 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            <img
                              className="object-cover"
                              src={`/images/${_new.image}`}
                              alt="img"
                            />
                          </div>
                        </td>

                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">
                            {_new.content}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                          {/* <a href="" className="text-indigo-600 hover:text-indigo-900">Edit</a> */}
                          <div className="flex">
                            <button
                              className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-yellow-800 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-2 rounded button"
                              onClick={() => showDataUpdate(_new)}
                            >
                              Edit
                            </button>
                            <button
                              className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-red-800 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-2 rounded button"
                              onClick={() => handleDelete(_new._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="text-center py-4 uppercase font-medium"
                        colSpan={9}
                      >
                        No data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default News;
