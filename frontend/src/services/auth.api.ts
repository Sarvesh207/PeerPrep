import axios from "axios";
import SignUp from "../pages/SignUp";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});
export default {
  login: async (email, password) => {
    try {
      const response = await instance.post(
        "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  signUp: async (firstName, lastName, email, password) => {
    try {
      const response = await instance.post(
        "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = instance.post(
        "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  },
};
