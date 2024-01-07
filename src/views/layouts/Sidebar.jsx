
import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({isOpen,}) {
  const navigate = useNavigate()

  const elementDropdown = useRef(null)
  const dropdown = () => {
    elementDropdown.current.classList.toggle('hidden')
  }
  
  return (
    <aside id="sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}>
      <div className='overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800'>
        <p className='mb-3 font-semibold dark:text-white'>Main</p>
          <ul className='space-y-2'>
            <li>
              <a href="#" className='flex items-center primary-color-sidebar-hover p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
              <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M6.143 1H1.857A.857.857 0 0 0 1 1.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 7 6.143V1.857A.857.857 0 0 0 6.143 1Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 17 6.143V1.857A.857.857 0 0 0 16.143 1Zm-10 10H1.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 7 16.143v-4.286A.857.857 0 0 0 6.143 11Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z" />
                    </svg>
              <span className='ml-3'>Dashboard</span>
              </a>
            </li>

            <li>
                <button onClick={dropdown} id="icon-sidebar" type="button"
                    className="flex items-center primary-color-sidebar-hover w-full p-2 text-base font-medium primary-color-sidebar-hover transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                    <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                      <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
                      <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
                    </svg>
                    <span id="text-sidebar" className="flex-1 ml-3 text-left whitespace-nowrap"
                        >User</span>
                </button>
                <ul ref={elementDropdown} id="dropdown-pages"
                    className="hidden
                  py-2 space-y-2">
                    <li>
                        <NavLink to='/user/master' id="text-sidebar" href="#"
                            className="flex items-center primary-color-sidebar-hover p-2 text-base {{ request()->path() == 'pemasukan' ? 'primary-color-sidebar' : '' }} primary-color-sidebar-hover transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Data master</NavLink>
                    </li>
                    <li>
                        <NavLink to='/user/role' id="text-sidebar" href="#"
                            className="flex items-center primary-color-sidebar-hover p-2 text-base primary-color-sidebar-hover {{ request()->path() == 'pengeluaran' ? 'primary-color-sidebar' : '' }} transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Role&Permission</NavLink>
                    </li>
                </ul>
            </li>

          </ul>
          {/* <hr className='my-3' />
          <ul className='space-y-2'>
            <p className='font-semibold'>Management</p>

            <li>
              <a href="#" className='flex items-center primary-color-sidebar-hover p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
              <svg className="w-5 h-5 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                                </svg>
              <span className='ml-3'>Users</span>
              </a>
            </li>

            <li>
              <a href="#" className='flex items-center primary-color-sidebar-hover p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
              <svg className="w-5 h-5 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 5h8m-1-3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1m6 0v3H6V2m6 0h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m0 9.464 2.025 1.965L12 9.571" />
                                </svg>
              <span className='ml-3'>Feedback</span>
              </a>
            </li>

            <li>
              <a href="#" className='flex items-center primary-color-sidebar-hover p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
              <svg className="w-5 h-5 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25" />
                            </svg>
              <span className='ml-3'>Kategori</span>
              </a>
            </li>

            <li>
              <a href="#" className='flex items-center primary-color-sidebar-hover p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
              <svg className="w-5 h-5 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M18.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12.167v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
                                </svg>
              <span className='ml-3'>Akses Level</span>
              </a>
            </li>

            <li>
              <a href="#" className='flex items-center primary-color-sidebar-hover p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
              <svg className="w-5 h-5 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 21">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11.6 16.733c.234.268.548.456.895.534a1.4 1.4 0 0 0 1.75-.762c.172-.615-.445-1.287-1.242-1.481-.796-.194-1.41-.862-1.241-1.481a1.4 1.4 0 0 1 1.75-.763c.343.078.654.261.888.525m-1.358 4.017v.617m0-5.94v.726M1 10l5-4 4 1 7-6m0 0h-3.207M17 1v3.207M5 19v-6m-4 6v-4m17 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />
                            </svg>
              <span className='ml-3'>Pembayaran</span>
              </a>
            </li>
          </ul> */}
      </div>
    </aside>
  );
}

export default Sidebar