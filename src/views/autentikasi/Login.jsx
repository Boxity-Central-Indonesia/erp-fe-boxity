import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Spinner } from "flowbite-react";
import { useColor } from "../config/GlobalColour";
import Button from "../layouts/Button";

const Login = ({ setAuth }) => {
  const { globalColor, changeColor } = useColor();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [response, setResponse] = useState(null); // Initialize with null
  const [validationEmail, setValidationEmail] = useState();
  const [validationPassword, setValidationPassword] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cleanup = () => {
      // Clear response to prevent memory leaks
      setResponse(null);
    };

    return cleanup; // Return the cleanup function
  }, []);

  useEffect(() => {
    if (response) {
      setValidationEmail(response.message.email?.[0] ?? ""); // Handle potential undefinedt
      setValidationPassword(response.message.password?.[0] ?? "");
      setLoading(() => !loading);
    }
  }, [response]);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(() => !loading);

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "login",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: {
            headers: {
              "X-CSRF-TOKEN": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
            },
          },
        }
      );

      setResponse(response.data);

      if (response.data.status === 200) {
        setAuth(true); // Update auth state
        Cookies.set("token", response.data.access_token, {secure: true, expires:1, domain: import.meta.env.VITE_SESSION_URL});
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        // Handle specific error messages from the API
        setValidationPassword(error.response.data.message);
        setLoading(() => loading);
      } else {
        // Handle generic errors
        setValidationPassword("An error occurred. Please try again.");
        setLoading(() => loading);
      }
      // setResponse(error.response.data)
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div
        modal-backdrop=""
        className={`${
          loading ? `hidden` : `fixed z-10 inset-0`
        } bg-gray-900 bg-opacity-50 dark:bg-opacity-80  flex items-center justify-center`}
      >
        {/* <Spinner className={`${loading ? `hidden` : ``}`} aria-label="Extra large spinner example" size="xl" /> */}
        <div role="status">
          <svg
            aria-hidden="true"
            className={`inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-[#f95b12]`}
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <div className="logo-container">
            {" "}
            <img
              src={import.meta.env.VITE_CLIENT_LOGO_DARK}
              className="mr-3 h-5 md:h-12"
              alt="Logo image"
            />
          </div>
          {/* <p>PT Boxity Central Indonesia</p> */}
        </a>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6 z-20" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
                <p
                  className={`${
                    !!validationEmail ? `` : `hidden`
                  } text-red-500 text-sm font-medium mt-2`}
                >
                  {validationEmail}
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <p
                  className={`${
                    !!validationPassword ? `` : `hidden`
                  } text-red-500 text-sm font-medium mt-2`}
                >
                  {validationPassword}
                </p>
              </div>
              <Button
                event={handleFormSubmit}
                type={"submit"}
                bgColour={"primary"}
                label={"Sign In"}
                paddingY={2.5}
                className={`w-full`}
              />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <NavLink
                  style={{ color: globalColor }}
                  to={"/register"}
                  className="font-medium hover:underline dark:text-primary-500"
                >
                  Sign up
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
