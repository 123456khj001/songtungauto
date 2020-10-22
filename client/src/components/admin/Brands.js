import React, { useState, useRef } from "react";
import { Modal } from "antd";
import {
  addBrand,
  deleteBrand,
  updateBrand,
} from "../../redux/actions/products";
import axios from "axios";

function Brands({ brands, dispatch }) {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [brandId, setBrandId] = useState("");

  const fileRef = useRef();

  const handleAdd = () => {
    if (!name) {
      return alert("Name field is required");
    }
    if (!image) {
      return alert("image field is required");
    }
    if (!description) {
      return alert("description field is required");
    }
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    axios.post("/api/brands", formData).then((res) => {
      setIsVisible(false);
      dispatch(addBrand(res.data));
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
    if (!name) {
      return alert("Name field is required");
    }
    if (!description) {
      return alert("description field is required");
    }
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (image) formData.append("image", image);

    axios.put(`/api/brands/${brandId}`, formData).then((res) => {
      setIsVisible(false);
      dispatch(updateBrand(res.data));
      resetState();
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/brands/${id}`).then((res) => {
      dispatch(deleteBrand(id));
    });
  };

  const showDataUpdate = (brand) => {
    setName(brand.name);
    setImage(null);
    setDescription(brand.description);
    setBrandId(brand._id);
    setIsUpdate(true);
    setIsVisible(true);
  };

  const resetState = () => {
    setName("");
    setImage(null);
    setDescription("");
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
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                Description
              </label>
              <textarea
                className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                      Name
                    </th>

                    <th className="px-4 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>

                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {typeof brands !== "undefined" && brands.length > 0 ? (
                    brands.map((brand) => (
                      <tr>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {brand.name}
                          </div>
                        </td>

                        <td className="px-2 py-4 h-8 w-8 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            <img
                              className="object-cover"
                              src={`/images/${brand.image}`}
                              alt="img"
                            />
                          </div>
                        </td>

                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">
                            {brand.description}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                          {/* <a href="" className="text-indigo-600 hover:text-indigo-900">Edit</a> */}
                          <div className="flex">
                            <button
                              className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-yellow-800 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-2 rounded button"
                              onClick={() => showDataUpdate(brand)}
                            >
                              Edit
                            </button>
                            <button
                              className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-red-800 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-2 rounded button"
                              onClick={() => handleDelete(brand._id)}
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

export default Brands;
