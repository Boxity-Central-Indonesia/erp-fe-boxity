import { Dropdown } from "flowbite-react"
import { IconApp } from "./icons/iconApp"

export const AppsForNavbar = () => {
    return (
        <Dropdown className="border-none" label="" dismissOnClick={false} renderTrigger={()=> <span><IconApp /></span>}>
            <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                Apps
            </div>
            <div className="w-80 grid grid-cols-3 p-2">
                <a href="#"
                    className="block p-4 text-center h-fit w-fit rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                    <svg className="w-7 h-7 mx-auto text-gray-600 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5.5 21h13M12 21V7m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm2-1.8c3.073.661 2.467 2.8 5 2.8M5 8c3.359 0 2.192-2.115 5.012-2.793M7 9.556V7.75m0 1.806-1.95 4.393a.773.773 0 0 0 .37.962.785.785 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.776.776 0 0 0 .09-.716L7 9.556Zm10 0V7.313m0 2.243-1.95 4.393a.773.773 0 0 0 .37.962.786.786 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.775.775 0 0 0 .09-.716L17 9.556Z" />
                    </svg>

                    <div className="text-sm font-medium text-gray-600 dark:text-white">Timbang</div>
                </a>
            </div>
        </Dropdown>
      );
}