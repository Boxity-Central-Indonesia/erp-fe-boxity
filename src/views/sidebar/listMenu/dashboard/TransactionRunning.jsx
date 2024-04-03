import React from "react";
import { Table } from "flowbite-react";
import { DropdownForLineChart } from "./chart/lineChart";
import { useColor } from "../../../config/GlobalColour";
import { numberToCurrency } from "../../../config/FormatCurrency";

export const TransactionRunning = ({ dataOrdersNotCompleted }) => {
  const data =
    dataOrdersNotCompleted &&
    dataOrdersNotCompleted.map((item) => ({
      "vendor name": item.vendor.name,
      "order status": item.order_status,
      "total price": numberToCurrency(item.total_price),
    }));

  // Menentukan data heading dari array pertama
  const dataHeading = data.length > 0 ? Object.keys(data[0]) : [];

  const { globalColor, changeColor } = useColor();

  return (
    <>
      <div className="bg-white rounded-md border">
        <div className="px-5 pt-5">
          <h1 className="text-xl font-semibold mb-5">Ongoing transactions</h1>
        </div>
        <div className="px-2">
          <Table striped>
            <Table.Head className="text-xs">
              {dataHeading.map((heading, index) => (
                <Table.HeadCell key={index}>{heading}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className="divide-y text-xs">
              {data.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                  {dataHeading.map((heading, columnIndex) => (
                    <Table.Cell key={columnIndex}>
                      <div
                        className={`${
                          row[heading] == "Completed"
                            ? `bg-green-600 px-3 py-1 text-white font-medium w-fit
                    rounded`
                            : row[heading] === "In Production"
                            ? "bg-yellow-400 px-3 py-1 text-white font-small w-fit rounded"
                            : ``
                        }`}
                      >
                        <p>{row[heading]}</p>
                      </div>
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <hr className="my-3" />
        </div>
        <div className="px-5 pb-5">
          <div className="mt-7 mb-3 flex items-center justify-between">
            <DropdownForLineChart />
            <div
              style={{ color: globalColor }}
              className="flex items-center cursor-pointer"
            >
              <p className="text-xs">Full report</p>
              <svg
                className="w-5 h-5 dark:text-white"
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
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
