import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

import setAuthToken from "../../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER } from "../types";

// // Register User
// export const registerUser = (userData, history) => dispatch => {
//   axios.post('/api/users/register', userData)
//     .then(res => history.push('/login'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       }))

// }

// Login && Set Token User
export const login = (data) => (dispatch) => {
  axios
    .post("/api/auth/login", data)
    .then((res) => {
      console.log(res);
      // Save to localStorage
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user infor
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      window.location.href = "/";
    })
    .catch((err) => {
      const { errors } = err.response.data;
      if (typeof errors !== "undefined" && errors.length > 0) {
        toast.warn(errors[0].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("ERROR!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data.errors,
      // });
    });
};

export const loginAdmin = (data) => (dispatch) => {
  axios
    .post("/api/auth/login", data)
    .then((res) => {
      console.log(res);
      // Save to localStorage
      const { token } = res.data;
      const decoded = jwt_decode(token);

      if (decoded.role === "admin" || decoded.role === "super-admin") {
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user infor

        // Set current user
        dispatch(setCurrentUser(decoded));
        window.location.href = "/admin";
      } else {
        alert("Username or password wrong");
      }
    })
    .catch((err) => {
      const { errors } = err.response.data;
      if (typeof errors !== "undefined" && errors.length > 0) {
        toast(errors[0].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast("ERROR!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const register = (data) => (dispatch) => {
  axios
    .post("/api/auth/register", data)
    .then((res) => {
      window.location.href = "/login";
    })
    .catch((err) => {
      console.log(err.response.data);
      const { errors } = err.response.data;
      if (typeof errors !== "undefined" && errors.length > 0) {
        toast.warn(errors[0].message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("ERROR!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
};
