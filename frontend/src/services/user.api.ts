import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

export default {
  profileView: async () => {
    try {
      const response = await instance.get("/profile/view", {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async (data) => {
    try {
      const response = await instance.patch("/profile/edit", data, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
};
