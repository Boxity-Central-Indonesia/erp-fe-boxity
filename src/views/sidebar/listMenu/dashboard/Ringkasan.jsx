import { useEffect, useState } from "react";
import { useColor } from "../../../config/GlobalColour";
import { getApiData } from "../../../../function/Api";

export const Ringkasan = ({ data }) => {
  const { globalColor, changeColor } = useColor();
  const dataElement = [
    {
      mainIcon: (
        <div className="bg-red-200 p-3 rounded-md w-fit h-fit">
          <svg
            className="w-6 h-6 text-red-600 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 30 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"
            />
          </svg>
        </div>
      ),

      label: "Total Sales",
      amount: data.length > 0 ? data[0].amount : "Loading...",
      information: data.length > 0 ? data[0].information : "Loading...",
      secondaryIcon: (
        <svg
          className="w-6 h-6 text-green-500 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 30 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v13m0-13 4 4m-4-4-4 4"
          />
        </svg>
      ),
    },
    {
      mainIcon: (
        <div className="bg-blue-200 p-3 rounded-md w-fit h-fit">
          <svg
            className="w-6 h-6 text-blue-600 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 30 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
            />
          </svg>
        </div>
      ),

      label: "Total Purchase",
      amount: data.length > 0 ? data[1].amount : "Loading...",
      information: data.length > 0 ? data[1].information : "Loading...",
      secondaryIcon: (
        <svg
          className="w-6 h-6 text-green-500 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 30 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v13m0-13 4 4m-4-4-4 4"
          />
        </svg>
      ),
    },
    {
      mainIcon: (
        <div className="bg-violet-200 p-3 rounded-md w-fit h-fit">
          <svg
            className="w-6 h-6 text-violet-600 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 30 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"
            />
          </svg>
        </div>
      ),
      label: "Total Paid",
      amount: data.length > 0 ? data[2].amount : "Loading...",
      information: data.length > 0 ? data[2].information : "Loading...",
      secondaryIcon: (
        <svg
          className="w-6 h-6 text-green-500 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 30 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v13m0-13 4 4m-4-4-4 4"
          />
        </svg>
      ),
    },
    {
      mainIcon: (
        <div className="bg-green-200 p-3 rounded-md w-fit h-fit">
          <svg
            className="w-6 h-6 text-green-600 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 30 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.6 16.733c.234.269.548.456.895.534a1.4 1.4 0 0 0 1.75-.762c.172-.615-.446-1.287-1.242-1.481-.796-.194-1.41-.861-1.241-1.481a1.4 1.4 0 0 1 1.75-.762c.343.077.654.26.888.524m-1.358 4.017v.617m0-5.939v.725M4 15v4m3-6v6M6 8.5 10.5 5 14 7.5 18 4m0 0h-3.5M18 4v3m2 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
            />
          </svg>
        </div>
      ),
      label: "Total Profit",
      amount: data.length > 0 ? data[3].amount : "Loading...",
      information: data.length > 0 ? data[3].information : "Loading...",
      secondaryIcon: (
        <svg
          className="w-6 h-6 text-green-500 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 30 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v13m0-13 4 4m-4-4-4 4"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-xl font-medium mb-3 capitalize">Overall summary</h1>
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {dataElement &&
          dataElement.map((item, index) => (
            <div className="rounded-md bg-white p-4 shadow-sm border">
              <div className="flex gap-3 mb-5">
                {/* <div className="bg-[#f95b1240] p-2 rounded-md w-fit h-fit"> */}
                {item.mainIcon}
                {/* </div> */}
                <div className="w-full">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-gray-600 text-sm">{item.label}</p>
                    {item.secondaryIcon}
                  </div>
                  <h3 className="text-xl font-medium">{item.amount}</h3>
                </div>
              </div>
              <div className="text-gray-600 text-sm">{item.information}</div>
            </div>
          ))}
      </section>
    </>
  );
};
