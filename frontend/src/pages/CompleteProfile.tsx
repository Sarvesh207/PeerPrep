import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  CircleUser,
  SquareUser,
  Search,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "@/store/slices/userSlice";
import userApi from "@/services/user.api";

const ProfileForm = () => {
  // const { toast } = useToast();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    userName: user?.userName ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    countryCode: user?.countryCode ?? "+91",
    about: user?.about ?? "",
    gender: user?.gender ?? "",
    skills: user?.skills[0] ?? "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("first name is required")
      .min(2, "first name should be at least 2 characters"),
    lastName: Yup.string()
      .required("last name is required")
      .min(2, "last name should be at least 2 characters"),

    userName: Yup.string()
      .required("userName is required")
      .min(3, "userName should be at least 3 characters"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),

    countryCode: Yup.string()
      .matches(/^\+\d{1,4}$/, "Invalid country code")
      .required("Country code is required"),

    about: Yup.string().max(200, "about must be 200 characters or less"),

    gender: Yup.string().oneOf(
      ["male", "female", "other", ""],
      "Invalid gender selection"
    ),
    skills: Yup.string().required("Skill required"),
  });

  const handleSubmit = async (values) => {
    if (!values) return;
    try {
      setIsLoading(true);
      const data = { ...values, skills: [values.skills] };

      const response = await userApi.updateProfile(data);
      if (response.status === 200) {
        dispatch(addUser(response.data.data));
        setIsLoading(false);

        navigate("/home");
      }
    } catch (error) {
      console.log("Error", error);
      setIsLoading(false);
    }

    // Display success message
    // toast({
    //   title: "Profile Updated",
    //   description: "Your profile information has been updated successfully",
    // });
  };

  return (
    <div className="flex justify-center items-center bg-[#0f172a]">
      <div className="w-full max-w-lg  bg-[#020617] my-[2rem] flex justify-center items-center flex-col py-[2.5rem] rounded-lg">
        <div className=" mb-8 mr-[5.5rem]">
          <h1 className="text-3xl font-bold text-white">
            Complete your profile
          </h1>
          <p className="text-profile-text mt-2 text-[#64748b]">
            Let's get to know you better
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(values) => (
            <Form>
              <label
                htmlFor="firstName"
                className="profile-label text-[#64748b]"
              >
                First Name <span className="required-mark text-red-500">*</span>
              </label>
              <div className="relative w-[25em]">
                <CircleUser
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="profile-input pl-10 py-2 rounded-md bg-[#1e293b] w-full "
                  placeholder="Enter your first name"
                />
              </div>
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm"
              />
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="profile-label text-[#64748b]"
                >
                  Last Name{" "}
                  <span className="required-mark text-red-500">*</span>
                </label>
                <div className="relative w-[25em]">
                  <SquareUser
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="profile-input pl-10 py-2 rounded-md bg-[#1e293b] w-full "
                    placeholder="Enter your last name"
                  />
                </div>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="userName"
                  className="profile-label text-[#64748b]"
                >
                  username <span className="required-mark text-red-500">*</span>
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Field
                    type="text"
                    id="userName"
                    name="userName"
                    className="profile-input pl-10 py-2 rounded-md bg-[#1e293b] w-full"
                    placeholder="Choose a userName"
                  />
                </div>
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="profile-label text-[#64748b]">
                  Email <span className="required-mark text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="profile-input pl-10 py-2 rounded-md bg-[#1e293b] w-full"
                    placeholder="Enter your email address"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4 ">
                <label
                  htmlFor="phoneNumber"
                  className="profile-label text-[#64748b]"
                >
                  Mobile Number{" "}
                  <span className="required-mark text-red-500">*</span>
                </label>
                <div className="flex ">
                  <div className="w-20 mr-2">
                    <Field
                      as="select"
                      id="countryCode"
                      name="countryCode"
                      className="profile-input py-2 rounded-md bg-[#1e293b] w-full"
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+61">+61</option>
                      <option value="+81">+81</option>
                    </Field>
                  </div>
                  <ErrorMessage
                    name="countryCode"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <div className="w-[20rem]">
                    <div className="relative flex-1 ">
                      <Phone
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <Field
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="profile-input pl-10 py-2 rounded-md bg-[#1e293b] w-full"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="profile-label text-[#64748b]">
                  Gender <span className="required-mark text-red-500">*</span>
                </label>
                <div className="flex space-x-6 mt-2">
                  <label className="inline-flex items-center text-[#64748b]">
                    <Field
                      type="radio"
                      name="gender"
                      value="male"
                      className="form-radio h-5 w-5 text-profile-accent border-gray-600 accent-[#5e52e0]"
                    />
                    <span className="ml-2 text-white">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="gender"
                      value="female"
                      className="form-radio h-5 w-5 text-profile-accent border-gray-600 accent-[#5e52e0]"
                    />
                    <span className="ml-2 text-white">Female</span>
                  </label>

                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="gender"
                      value="other"
                      className="form-radio h-5 w-5 text-profile-accent border-gray-600 accent-[#5e52e0]"
                    />
                    <span className="ml-2 text-white">Other</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="skills"
                  className="profile-label text-[#64748b]"
                >
                  Skills <span className="required-mark text-red-500">*</span>
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Field
                    type="skills"
                    id="skills"
                    name="skills"
                    className="profile-input pl-10 py-2 rounded-md bg-[#1e293b] w-full"
                    placeholder="Enter Skills"
                  />
                </div>
                <ErrorMessage
                  name="skills"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="about" className="profile-label text-[#64748b]">
                  About
                </label>
                <Field
                  as="textarea"
                  id="about"
                  name="about"
                  className="profile-input min-h-[100px] pt-2 pl-2 rounded-md bg-[#1e293b] w-full"
                  placeholder="Tell us about yourself"
                ></Field>
                <ErrorMessage
                  name="about"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full  hover:bg-profile-accent/90 text-white py-3 px-4 rounded-md"
              >
                {isLoading ? "Saving Details..." : "Save Profile"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileForm;
