import { Dropdown } from "flowbite-react";
import { IconApp } from "./icons/iconApp";
import { getApiData } from "../../function/Api";
import Cookies from "js-cookie"; // Import js-cookie untuk mengakses cookie

export const AppsForNavbar = () => {
  const handleLink = async () => {
    localStorage.setItem('bearer', Cookies.get("token"))
  };

  return (
    <Dropdown
      className="border-none"
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <span>
          <IconApp />
        </span>
      )}
    >
      <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        Apps
      </div>
      <div className="w-80 grid grid-cols-3 p-2">
        <a
          onClick={handleLink}
          href={import.meta.env.VITE_URL_LIVESTOCK}
          target="_blank"
          className="block p-4 text-center h-fit w-fit rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          {/* Isi dengan ikon SVG yang sesuai */}
          <div className="text-sm font-medium text-gray-600 dark:text-white">
            Timbangan
          </div>
        </a>
      </div>
    </Dropdown>
  );
};
