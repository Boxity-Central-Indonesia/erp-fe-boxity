import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useColor } from "../config/GlobalColour";
import Button from "../layouts/Button";
import { Spinner } from "flowbite-react";

const Register = ({ setAuth }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [response, setResponse] = useState();
  const [emailValidation, setEmailValidation] = useState();
  const [passwordValidation, setPasswordValidation] = useState();
  const [nameValidation, setNameValidation] = useState();
  const [loading, setLoading] = useState(true);

  const { globalColor, changeColor } = useColor();

  useEffect(() => {
    if (!!response) {
      setEmailValidation(!!response.email ? response.email[0] : "");
      setPasswordValidation(!!response.password ? response.password[0] : "");
      setNameValidation(!!response.name ? response.name[0] : "");
      setLoading(!loading);
    }
  }, [response]);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(!loading);

    try {
      const formData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: confirmPasswordRef.current.value,
      };

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "register",
        formData,
        {
          withXSRFToken: true,
          withCredentials: false,
        }
      );

      setResponse(response.data);

      if (response.data.status === 201) {
        Cookies.set("token", response.data.access_token);

        setAuth(true); // Update auth state
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
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
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <div className="logo-container">
            {" "}
            <img
              src="https://res.cloudinary.com/boxity-id/image/upload/v1678791965/asset_boxity/logo/logo_primary_um5cgb.png"
              className="mr-3 h-5 md:h-12"
              alt="Logo image"
            />
          </div>
          {/* <p>PT Boxity Central Indonesia</p> */}
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  ref={nameRef}
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Full name"
                  required=""
                />
                <p
                  className={`${
                    !!emailValidation ? `` : `hidden`
                  } text-red-500 text-sm font-medium mt-2`}
                >
                  {emailValidation}
                </p>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  ref={emailRef}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
                <p
                  className={`${
                    !!emailValidation ? `` : `hidden`
                  } text-red-500 text-sm font-medium mt-2`}
                >
                  {emailValidation}
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
                  type="password"
                  ref={passwordRef}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <p
                  className={`${
                    !!passwordValidation ? `` : `hidden`
                  } text-red-500 text-sm font-medium mt-2`}
                >
                  {passwordValidation}
                </p>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  ref={confirmPasswordRef}
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <Button
                event={handleRegister}
                label={"Create account"}
                bgColour={"primary"}
                paddingY={2.5}
                className={`w-full`}
              />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <NavLink
                  style={{ color: globalColor }}
                  to={"/login"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
