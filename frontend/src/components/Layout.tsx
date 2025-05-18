import React, { useEffect } from "react";
import Navbar from "./Navigation";
import Footer from "./Footer";
import { Outlet } from "react-router";
import userApi from "../services/user.api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../store/slices/userSlice";

function Layout() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function getUserData() {
    if (user) return;

    try {
      const response = await userApi.profileView();
      if (response.status === 200) {
        dispatch(addUser(response.data.data));
      }
    } catch (error) {
      if (error.status == 400) {
        navigate("/");
      }
      console.log("Error", error);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
