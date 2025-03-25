import { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser, loginUser } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";

// Define Type for Login & Register Form Data
interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [pageType, setPageType] = useState<"login" | "register">("login");
  const [message, setMessage] = useState<string>("");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const registerSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string(),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
  });

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const initialValuesRegister: RegisterFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  const initialValuesLogin: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (
    values: LoginFormValues | RegisterFormValues,
    { resetForm }: FormikHelpers<LoginFormValues | RegisterFormValues>
  ) => {
    try {
      if (isLogin) {
        await dispatch(loginUser(values as LoginFormValues));
      } else {
        await dispatch(registerUser(values as RegisterFormValues));
      }
      navigate("/");
      toast.success("Action successful");
    } catch (error) {
      toast.error("Something went wrong");
    }
    resetForm();
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      enableReinitialize
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center flex-col gap-4 p-4">
            <div className="text-2xl">
              {isLogin ? "Login Now" : "Register Here"}
            </div>
            <div className="flex flex-col gap-4 items-center justify-center">
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    fullWidth
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    fullWidth
                  />
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    type="password"
                    name="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                  />
                  <TextField
                    label="Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name="phoneNumber"
                    error={
                      Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                    }
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    fullWidth
                  />
                </>
              )}
              {isLogin && (
                <>
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    type="password"
                    name="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                  />
                </>
              )}
              <div className="flex justify-center items-center">
                <Button type="submit">{isLogin ? "Login" : "Register"}</Button>
              </div>
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
              >
                <Button variant="ghost">
                  {isLogin
                    ? "Don't have an account? Register Here"
                    : "Already have an account? Login Now"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Login;
