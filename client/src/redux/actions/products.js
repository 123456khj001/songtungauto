import axios from "axios";

import {
  GET_PRODUCTS,
  GET_ERRORS,
  SET_LOADING,
  GET_BRANDS,
  GET_NEWS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_BRAND,
  DELETE_BRAND,
  UPDATE_BRAND,
  ADD_NEW,
  DELETE_NEW,
  UPDATE_NEW,
} from "../types";

export const getProducts = () => (dispatch) => {
  // set isLoading === true
  // dispatch({
  //   type: SET_LOADING,
  //   payload: true
  // })
  axios
    .get("/api/products")
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors,
      });
    });

  // dispatch({
  //   type: SET_LOADING,
  //   payload: false
  // })
};

export const getBrands = () => (dispatch) => {
  // set isLoading === true
  // dispatch({
  //   type: SET_LOADING,
  //   payload: true
  // })
  axios
    .get("/api/brands")
    .then((res) => {
      dispatch({
        type: GET_BRANDS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data,
      // });
    });

  // dispatch({
  //   type: SET_LOADING,
  //   payload: false
  // })
};

export const getNews = () => (dispatch) => {
  // set isLoading === true
  // dispatch({
  //   type: SET_LOADING,
  //   payload: true
  // })
  axios
    .get("/api/news")
    .then((res) => {
      dispatch({
        type: GET_NEWS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });

  // dispatch({
  //   type: SET_LOADING,
  //   payload: false
  // })
};

export const addProduct = (data) => (dispatch) => {
  console.log(data);
  dispatch({
    type: ADD_PRODUCT,
    payload: data,
  });
};

export const deleteProduct = (data) => (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT,
    payload: data,
  });
};

export const updateProduct = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT,
    payload: data,
  });
};

export const addBrand = (data) => (dispatch) => {
  console.log(data);
  dispatch({
    type: ADD_BRAND,
    payload: data,
  });
};

export const deleteBrand = (data) => (dispatch) => {
  dispatch({
    type: DELETE_BRAND,
    payload: data,
  });
};

export const updateBrand = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_BRAND,
    payload: data,
  });
};

export const addNew = (data) => (dispatch) => {
  console.log(data);
  dispatch({
    type: ADD_NEW,
    payload: data,
  });
};

export const deleteNew = (data) => (dispatch) => {
  dispatch({
    type: DELETE_NEW,
    payload: data,
  });
};

export const updateNew = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_NEW,
    payload: data,
  });
};
