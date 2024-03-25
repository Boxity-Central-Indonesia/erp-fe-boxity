import React, { useEffect, useState } from "react";
import { LineChart, DropdownForLineChart } from "./chart/lineChart";
import { useColor } from "../../../config/GlobalColour";
import { getApiData } from "../../../../function/Api";

export const StatistikOrder = ({ data }) => {
  const { globalColor, changeColor } = useColor();
  const [totalSalesThisMonth, setTotalSalesThisMonth] = useState(null);

  useEffect(() => {
    // Fetch total sales this month from API/dashboard
    const fetchTotalSalesThisMonth = async () => {
      try {
        const response = await getApiData("dashboard");
        const totalSalesThisMonth = response.data[5].total_sales_this_month;
        setTotalSalesThisMonth(totalSalesThisMonth);
      } catch (error) {
        console.error("Error fetching total sales this month:", error);
      }
    };

    fetchTotalSalesThisMonth();
  }, []);

  return (
    <div className="bg-white rounded-md p-5 max-h-68 border">
      <h2 className="text-xl font-semibold mb-1 capitalize">
        Transaction statistics
      </h2>
      {totalSalesThisMonth !== null && (
        <h4 className="text-md text-gray-600">{totalSalesThisMonth}</h4>
      )}
      <div className="my-3">
        <LineChart />
      </div>
      <hr className="my-3" />
      <div className="mt-7 mb-3 flex items-center justify-between">
        <DropdownForLineChart />
        <div
          style={{ color: globalColor }}
          className="flex items-center cursor-pointer"
        >
          <p className="text-xs capitalize">See more detail</p>
          <svg
            className="w-5 h-5 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
