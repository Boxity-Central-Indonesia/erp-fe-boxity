'';
import React from "react";
import { Avatar, Dropdown } from 'flowbite-react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


function Navbar({onToggleSidebar, setAuth}) {
    
    const navigate = useNavigate()


     function darkMode() {
        return (
            <Flowbite>
            <DarkThemeToggle />
            </Flowbite>
        );
    }
      
      const dropdown = () => {
            return(
                <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">Bahari</span>
                  <span className="block truncate text-sm font-medium">baharihari49@gmail.com</span>
                </Dropdown.Header>
                <Dropdown.Item className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.109 17H1v-2a4 4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536 6.364-6.364a2 2 0 0 1 2.829 0Z"/>
                    </svg>
                    <NavLink to={'/profile'}>
                        Profile
                    </NavLink>
                </Dropdown.Item>
                <Dropdown.Item className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 4c0 1.657-3.582 3-8 3S1 5.657 1 4m16 0c0-1.657-3.582-3-8-3S1 2.343 1 4m16 0v6M1 4v6m0 0c0 1.657 3.582 3 8 3s8-1.343 8-3M1 10v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6"/>
                    </svg>
                    Ganti database
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="flex item-center gap-2" onClick={handleLogout}>
                    <svg className="w-4 h-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
                    </svg>
                    Keluar
                </Dropdown.Item>
              </Dropdown>
            )
      }


      const handleLogout = () => {
        Cookies.remove('token')
        setAuth(false)
        navigate('/login')
      }

  return (
    <nav
        className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
                <button id="btn-toogle-sidebar" onClick={onToggleSidebar} data-drawer-target="drawer-navigation" data-drawer-toggle="drawer-navigation"
                    aria-controls="drawer-navigation"
                    className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"></path>
                    </svg>
                    <svg aria-hidden="true" className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Toggle sidebar</span>
                </button>
                <a href="#" className="flex items-center justify-between mr-4">
                    <img src="https://res.cloudinary.com/boxity-id/image/upload/v1678791965/asset_boxity/logo/logo_primary_um5cgb.png"
                        className="mr-3 h-5 md:h-10 dark:hidden" alt="PT. Teknologi Naya Abadi" />
                {/* <p>PT Boxity Central Indonesia</p> */}
                <img src="https://res.cloudinary.com/boxity-id/image/upload/v1678791550/asset_boxity/logo/Asset_36_i0dcvz.png"
                        className="mr-3 h-5 md:h-12 hidden dark:block" alt="PT. Teknologi Naya Abadi" />
                {/* <p>PT Boxity Central Indonesia</p> */}
                </a>
            </div>
            <div className="flex items-center lg:order-2">
                <div className="flex items-center gap-3">
                {darkMode()}
                {dropdown()}
                </div>
            </div>
        </div>
    </nav>
    );
}


export default Navbar