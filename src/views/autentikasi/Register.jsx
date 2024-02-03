import { NavLink, useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { useColor } from "../conifg/GlobalColour"
import Button from "../layouts/Button"
import { Spinner } from "flowbite-react"


const Register = ({setAuth}) => {
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)

    const [response, setResponse] = useState()
    const [emailValidation, setEmailValidation] = useState()
    const [passwordValidation, setPasswordValidation] = useState()
    const [nameValidation, setNameValidation] = useState()
    const [loading, setLoading] = useState(true);

    const { globalColor, changeColor } = useColor();


    useEffect(() => {
        if(!!response){
            setEmailValidation(!!response.email ? response.email[0] : '')
            setPasswordValidation(!!response.password ? response.password[0] : '')
            setNameValidation(!!response.name ? response.name[0] : '')
            setLoading(!loading)
        }
    }, [response]) 

    const navigate = useNavigate()

    const handelRegister = async (e) => {
        e.preventDefault()
        setLoading(!loading);

        try {
            const formData = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                password_confirmation: confirmPasswordRef.current.value
            }

            const response = await axios.post(import.meta.env.VITE_API_URL + "register", formData, {
                withCredentials:true
            })

            setResponse(response.data)
            
            if(response.data.status === 201) {
                Cookies.set('token',response.data.access_token)
            
                setAuth(true); // Update auth state
                navigate('/')
            }


        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false); // Set loading to false after the request completes
        }


    }

    return(
        <section className="bg-gray-50 dark:bg-gray-900">
            <div modal-backdrop="" className={`${loading ? `hidden` : `fixed z-10 inset-0`} bg-gray-900 bg-opacity-50 dark:bg-opacity-80  flex items-center justify-center`}>
            <Spinner className={`${loading ? `hidden` : ``}`} aria-label="Extra large spinner example" size="xl" />
          </div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                <input type="text" ref={nameRef} name="name" id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com" required=""/>
                                     <p className={`${!!emailValidation ? `` : `hidden`} text-red-500 text-sm font-medium mt-2`}>{emailValidation}</p>
                            </div>
                            <div>
                                <label htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    email</label>
                                <input type="email" ref={emailRef} name="email" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com" required=""/>
                                     <p className={`${!!emailValidation ? `` : `hidden`} text-red-500 text-sm font-medium mt-2`}>{emailValidation}</p>
                            </div>
                            <div>
                                <label htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" ref={passwordRef} name="password" id="password" placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""/>
                                      <p className={`${!!passwordValidation ? `` : `hidden`} text-red-500 text-sm font-medium mt-2`}>{passwordValidation}</p>
                            </div>
                            <div>
                                <label htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                    password</label>
                                <input type="confirm-password" ref={confirmPasswordRef} name="confirm-password" id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""/>
                                  
                            </div>
                            < Button 
                            event={handelRegister}
                            label={'Create account'} 
                            bgColour={'primary'}
                            paddingY={2.5}
                            className={`w-full`}
                            />
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <NavLink style={{color: globalColor}} to={'/login'}
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login
                                    here</NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Register