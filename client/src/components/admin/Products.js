import React, { useState, useRef } from "react";
import { Modal } from "antd";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../redux/actions/products";
import axios from "axios";

function Products({ products, brands, dispatch }) {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [origin, setOrigin] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [isOld, setIsOld] = useState(false);
  const [images, setImages] = useState(null);
  const [description, setDescription] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [productId, setProductId] = useState("");

  const fileRef = useRef();

  const handleAdd = () => {
    if (!name) {
      return alert("Name field is required");
    }
    if (!brandId) {
      return alert("brand field is required");
    }
    if (!origin) {
      return alert("origin field is required");
    }
    if (!images) {
      return alert("images field is required");
    }
    if (!description) {
      return alert("description field is required");
    }
    let formData = new FormData();
    formData.append("name", name);
    formData.append("brandId", brandId);
    formData.append("origin", origin);
    formData.append("year", year);
    formData.append("isOld", isOld);
    formData.append("description", description);

    for (const file of images) {
      formData.append("image", file);
    }

    axios.post("/api/products", formData).then((res) => {
      setIsVisible(false);
      dispatch(addProduct(res.data));
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
    if (!brandId) {
      return alert("brand field is required");
    }
    if (!origin) {
      return alert("origin field is required");
    }
    if (!description) {
      return alert("description field is required");
    }
    let formData = new FormData();
    formData.append("name", name);
    formData.append("brandId", brandId);
    formData.append("origin", origin);
    formData.append("year", year);
    formData.append("isOld", isOld);
    formData.append("description", description);

    if (images && images.length > 0)
      for (const file of images) {
        formData.append("image", file);
      }

    axios.put(`/api/products/${productId}`, formData).then((res) => {
      setIsVisible(false);
      dispatch(updateProduct(res.data));
      resetState();
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/products/${id}`).then((res) => {
      dispatch(deleteProduct(id));
    });
  };

  const showDataUpdate = (product) => {
    setName(product.name);
    setOrigin(product.origin);
    setBrandId(product.brandId._id);
    setYear(product.year);
    setIsOld(product.isOld);
    setImages(null);
    setDescription(product.description);
    setIsVisible(true);
    setProductId(product._id);
    setIsUpdate(true);
  };

  const resetState = () => {
    setName("");
    setOrigin("");
    setBrandId("");
    setYear(new Date().getFullYear());
    setIsOld(false);
    setImages(null);
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
            <div className="w-full md:w-1/2 px-3">
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
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="brand"
              >
                Brand
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => setBrandId(e.target.value)}
                  value={brandId}
                >
                  <option value="">Choose a brand</option>
                  {typeof brands !== undefined
                    ? brands.map((brand) => (
                        <option value={brand._id}>{brand.name}</option>
                      ))
                    : null}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="origin"
              >
                Origin
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="origin"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="year"
              >
                Year
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                >
                  <option value={+year + 5}>{+year + 5}</option>
                  <option value={+year + 4}>{+year + 4}</option>
                  <option value={+year + 3}>{+year + 3}</option>
                  <option value={+year + 2}>{+year + 2}</option>
                  <option value={+year + 1}>{+year + 1}</option>
                  <option value={year}>{year}</option>
                  <option value={year - 1}>{year - 1}</option>
                  <option value={year - 2}>{year - 2}</option>
                  <option value={year - 3}>{year - 3}</option>
                  <option value={year - 4}>{year - 4}</option>
                  <option value={year - 5}>{year - 5}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                IsOld
              </label>
              <input
                type="checkbox"
                checked={isOld}
                // onChange={(e) => setEmail(e.target.value)}
                onChange={() => setIsOld(!isOld)}
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
                multiple={true}
                onChange={(e) => setImages(e.target.files)}
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
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Brand
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      IsNew
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Origin
                    </th>
                    {/* <th className="px-2 py-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th> */}
                    <th className="px-2 py-4 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {typeof products !== "undefined" && products.length > 0 ? (
                    products.map((product) => (
                      <tr>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {product.name}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {product.brandId.name}
                          </div>
                        </td>
                        <td className="px-2 py-4 h-8 w-8 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            <img
                              className="object-cover"
                              src={`/images/${product.images[0]}`}
                              alt="img"
                            />
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm text-center leading-5 text-gray-900">
                            {!product.isOld ? (
                              <i class="text-green-400 fas fa-check"></i>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">
                            {product.description}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          <div className="text-sm leading-5 text-gray-900">
                            {product.year}
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          <div className="text-sm leading-5 text-gray-900">
                            {product.origin}
                          </div>
                        </td>
                        {/* <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          <div className="text-sm leading-5 text-gray-900">
                            {product.price}
                          </div>
                        </td> */}
                        <td className="px-2 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                          {/* <a href="" className="text-indigo-600 hover:text-indigo-900">Edit</a> */}
                          <div className="flex">
                            <button
                              className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-yellow-800 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-2 rounded button"
                              onClick={() => showDataUpdate(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="whitespace-no-wrap uppercase leading-6 font-medium mx-auto shadow bg-red-800 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white hover:text-white text-md py-2 px-2 rounded button"
                              onClick={() => handleDelete(product._id)}
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

export default Products;
