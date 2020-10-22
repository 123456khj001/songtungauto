import _ from "lodash";

import {
  GET_PRODUCTS,
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

const initialState = {
  products: [],
  brands: [],
  rates: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
      };

    case GET_BRANDS:
      return {
        ...state,
        brands: [...action.payload],
      };

    case GET_NEWS:
      return {
        ...state,
        news: [...action.payload],
      };

    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id != action.payload
        ),
      };

    case UPDATE_PRODUCT:
      let i = _.findIndex(state.products, { _id: action.payload._id });
      if (i > -1) state.products[i] = action.payload;
      else state.products.unshift(action.payload);
      return {
        ...state,
        products: state.products,
      };

    case ADD_BRAND:
      return {
        ...state,
        brands: [action.payload, ...state.brands],
      };

    case DELETE_BRAND:
      return {
        ...state,
        brands: state.brands.filter((brand) => brand._id != action.payload),
      };

    case UPDATE_BRAND:
      let _i = _.findIndex(state.brands, { _id: action.payload._id });
      if (_i > -1) state.brands[_i] = action.payload;
      else state.brands.unshift(action.payload);
      return {
        ...state,
        brands: state.brands,
      };

    case ADD_NEW:
      return {
        ...state,
        news: [action.payload, ...state.news],
      };

    case DELETE_NEW:
      return {
        ...state,
        news: state.news.filter((brand) => brand._id != action.payload),
      };

    case UPDATE_NEW:
      let x = _.findIndex(state.news, { _id: action.payload._id });
      if (x > -1) state.news[x] = action.payload;
      else state.news.unshift(action.payload);
      return {
        ...state,
        news: state.news,
      };

    default:
      return state;
  }
}
