// TabelHeading.jsx
import React from "react";
import Button from "./Button";
import { useColor } from "../config/GlobalColour";
import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";

const TabelHeading = ({
  toggleOpenModal,
  icon,
  label,
  globalFilter,
  setGlobalFilter,
  handleClickHeading,
  showNavHeading,
  dataNavHeading,
  activeButton,
  routes,
  hidden
}) => {
  const { globalColor, changeColor } = useColor();

  return (
    <>
      <section>
        <div
          className={`flex relative mb-5 mt-3 ${
            showNavHeading ? `` : `hidden`
          }`}
        >
          {dataNavHeading &&
            dataNavHeading.map((item) => (
              <button
                style={{
                  borderColor: globalColor,
                }}
                className={`btn_akses px-8 pb-3 ${
                  activeButton === item.path ? "border-b-4 z-10" : "border-b-2"
                }`}
                onClick={() => handleClickHeading(item.path)}
              >
                {item.label}
              </button>
            ))}
          {/* <button className={`btn_akses px-8 pb-3 ${activeButton==='employee-categories' ? 'border-b-4 border-[#9345a3] z-10'
            : 'border-b-2' }`} onClick={()=> handleClick('employee-categories')}
            >
            Employes category
          </button> */}
          <hr className="w-full absolute bottom-0 z-0 border-2" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 30 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <DebouncedInput
                  value={globalFilter ?? ""}
                  onChange={(value) => setGlobalFilter(String(value))}
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                  rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
                  dark:focus:border-primary-500"
                  placeholder="Search"
                  required=""
                />
              </div>
            </form>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <Button
              className={`${hidden ? `hidden` : ``}`}
              event={() => toggleOpenModal(activeButton || routes)}
              label={label}
              icon={icon}
              type={"button"}
              bgColour={"primary"}
              paddingY={"2.5"}
            />
            {/* <DropdownComponent /> */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              {/* Elemen-elemen lain seperti tombol Actions, Delete All, dan Filter */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const DropdownComponent = () => {
  return (
    <div className="border border-gray-400 py-2 dark:text-white text-sm px-4 rounded-md">
      <Dropdown
        dismissOnClick={false}
        label="Employment status"
        size={"lg"}
        inline
        className=""
      >
        <Dropdown.Item>Home</Dropdown.Item>
        <Dropdown.Item>External link</Dropdown.Item>
      </Dropdown>
    </div>
  );
};

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoFocus
    />
  );
}

export default TabelHeading;
