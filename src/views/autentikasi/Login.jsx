import React, { useState, useEffect } from "react"
import axios from "axios";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom"; 
import Cookies from "js-cookie";
import { Spinner } from 'flowbite-react';
import { useColor } from "../conifg/GlobalColour";
import Button from "../sidebar/layouts/Button";

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
      setValidationEmail(response.message.email?.[0] ?? ''); // Handle potential undefinedt
      setValidationPassword(response.message.password?.[0] ?? '')
      setLoading(!loading)
    }
  }, [response]);

    const navigate = useNavigate();
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      setLoading(!loading);
  
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + "login", {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }, {
          headers: {
            headers: {
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
          }
        });
  
        setResponse(response.data);
        
        if (response.data.status === 200) {
          setAuth(true); // Update auth state
          Cookies.set('token', response.data.access_token);
            navigate('/');
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          // Handle specific error messages from the API
          setValidationPassword(error.response.data.message);
        } else {
          // Handle generic errors
          setValidationPassword('An error occurred. Please try again.');
        }
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };
  
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div modal-backdrop="" className={`${loading ? `hidden` : `fixed z-10 inset-0`} bg-gray-900 bg-opacity-50 dark:bg-opacity-80  flex items-center justify-center`}>
          <Spinner className={`${loading ? `hidden` : ``}`} aria-label="Extra large spinner example" size="xl" />
          </div>
            <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img src="https://res.cloudinary.com/boxity-id/image/upload/v1678791965/asset_boxity/logo/logo_primary_um5cgb.png"
                        className="mr-3 h-5 md:h-12" alt="PT. Teknologi Naya Abadi" />
                {/* <p>PT Boxity Central Indonesia</p> */}
                </a>
                
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6 z-20" action="#">
                            <div>
                                <label htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    email</label>
                                <input ref={emailRef} type="email" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com" required="" />
                                    <p className={`${!!validationEmail ? `` : `hidden`} text-red-500 text-sm font-medium mt-2`}>{validationEmail}</p>
                            </div>
                            <div>
                                <label htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input ref={passwordRef} type="password" id="password" placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required="" />
                                    <p className={`${!!validationPassword ? `` : `hidden`} text-red-500 text-sm font-medium mt-2`}>{validationPassword}</p>
                            </div>
                            {/* <button style={{ backgroundColor: globalColor }} onClick={handleFormSubmit} type="submit"
                                className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                                in</button> */}
                                < Button event={handleFormSubmit} type={'submit'} bgColour={globalColor} label={'Signt In'}/>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <NavLink style={{color: globalColor}} to={'/register'}
                                    className="font-medium hover:underline dark:text-primary-500">Sign
                                    up</NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Login