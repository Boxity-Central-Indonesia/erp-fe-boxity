'use client';
import React from "react";
import { Avatar, Dropdown } from 'flowbite-react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';

function Navbar({onToggleSidebar}) {



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
                  <span className="block text-sm">Bonnie Green</span>
                  <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            )
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
                    {/* <img src="https://res.cloudinary.com/du0tz73ma/image/upload/w_1000/q_auto:best/f_auto/v1702445620/octansidnByBoxity_vwv8wi.png"
                        className="mr-3 h-10 md:h-12" alt="Flowbite Logo" /> */}
                    <span className="text-xl lg:text-3xl font-semibold dark:text-white">Logo bisnis</span>
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