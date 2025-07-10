import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../api/AxiosInstance";

const LoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await loginApi.post("/login", values);
        const token = response.data.access_token;
        if (token) {
          localStorage.setItem("token", JSON.stringify(token));
          toast.success("Login success!");
          resetForm();
          navigate("/");
        }
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Invalid email or password. Please try again.");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full rounded-lg border border-gray-400  shadow sm:max-w-md">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Login your account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600  focus:border-primary-600 block w-full p-2.5 "
                placeholder="Please Enter Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik?.errors?.email && formik?.touched?.email ? (
                <p style={{ color: "red" }}> {formik?.errors?.email}</p>
              ) : (
                ""
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Please Enter Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik?.errors?.password && formik?.touched?.password ? (
                <p style={{ color: "red" }}>{formik?.errors?.password}</p>
              ) : (
                ""
              )}
            </div>

            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
