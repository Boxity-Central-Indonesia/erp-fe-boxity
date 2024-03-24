import { LineChart, DropdownForLineChart } from "./chart/lineChart";
import { useColor } from "../../../config/GlobalColour";

export const StatistikOrder = ({ data }) => {
  const { globalColor, changeColor } = useColor();

  const dataXaxis =
    data &&
    data.map((item) => {
      const value = item[4].sales;
    });

  return (
    <div className="bg-white rounded-md p-5 max-h-68 border">
      <h2 className="text-xl font-semibold mb-1">Transaction statistics</h2>
      <h4 className="text-md text-gray-600">Rp. 500.000.000</h4>
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
          <p className="text-medium">See more detail</p>
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
