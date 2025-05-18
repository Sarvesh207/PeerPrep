import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import * as yup from "yup";
import authApi from "../services/auth.api";
import { addUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Code, Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  mode?: "login" | "signup";
  onSuccess: () => void;
}

const AuthForm = ({ mode = "login", onSuccess }: AuthFormProps) => {
  const [activeTab, setActiveTab] = useState<string>(mode);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const initialValuesSignUp = {
    email: "",
    password: "",
  };
  const validationSchemaSignUp = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
  });

  async function handleSubmit(values) {
    if (activeTab === "login") {
      const { email, password } = values;
      try {
        const response = await authApi.login(email, password);

        if (response.status === 200) {
          dispatch(addUser(response.data.data));

          navigate("/home");
          onSuccess();
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    } else {
      const { firstName, lastName, email, password } = values;
      try {
        const response = await authApi.signUp(
          firstName,
          lastName,
          email,
          password
        );
        if (response.status === 201) {
          dispatch(addUser(response.data.user));

          navigate("/complete-profile");
          onSuccess();
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    }
  }

  const handleShowPassword = () => setShowPassword((prev) => !prev);
  return (
    <div className="space-y-6 py-4">
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-codemate-purple" />
          <span className="text-xl font-bold gradient-text">PeerPrep</span>
        </div>
      </div>

      <Tabs defaultValue={mode} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-4 mt-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {() => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className=""
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Field
                    as={Input}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className=""
                  />
                  <div className="absolute top-8 right-3">
                    {showPassword ? (
                      <Eye size={22} onClick={handleShowPassword} />
                    ) : (
                      <EyeOff size={22} onClick={handleShowPassword} />
                    )}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </Form>
            )}
          </Formik>
        </TabsContent>

        <TabsContent value="signup" className="space-y-4 mt-4">
          <Formik
            initialValues={initialValuesSignUp}
            validationSchema={validationSchemaSignUp}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {() => (
              <Form className="space-y-4">
                <div className="space-y-2 flex justify-center items-center gap-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Field
                      as={Input}
                      className=""
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Field
                      as={Input}
                      className=""
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    className=""
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Field
                    as={Input}
                    className=""
                    name="password"
                    type={showPassword ? "text" : "password"}
                  />
                  <div className="absolute top-8 right-3">
                    {showPassword ? (
                      <Eye size={22} onClick={handleShowPassword} />
                    ) : (
                      <EyeOff size={22} onClick={handleShowPassword} />
                    )}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </Form>
            )}
          </Formik>
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline hover:text-foreground">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-foreground">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

export default AuthForm;
