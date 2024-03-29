// Tabel.jsx
import React, { useMemo } from "react";
import { Table, Dropdown, TableCell, TableBody } from "flowbite-react";
import Paginate from "./PaginateTest";
import TabelHeading from "./TabelHeading";
import { useColor } from "../config/GlobalColour";
import { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const TabelComponent = ({
  data,
  dataHeading,
  showHeading,
  handleEdit,
  setOpenModal,
  skeleton,
}) => {
  const { globalColor, changeColor } = useColor();
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  const handleEditClick = (param, param2) => {
    handleEdit(param, param2);
  };

  function formatToRupiah(value) {
    // Check if the value is a number
    if (typeof value === "number") {
      // Format as rupiah with two decimal places
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    } else {
      // Return the original value if it's not a number
      return value;
    }
  }

  const columns = useMemo(() => {
    if (!data || !data[0]) return []; // Pastikan data ada dan tidak kosong

    const keys = Object.keys(data[0]); // Ambil kunci dari objek pertama
    const filteredKeys = keys.filter((key) => data[0][key] !== null); // Filter kunci yang valid

    return filteredKeys.map((key) => {
      return columnHelper.accessor((row) => row[key], {
        id: key,
        cell: (info) => {
          let className = "";
          let icon = "";

          // Definisi objek pemetaan untuk status Active/Inactive
          const statusMap = {
            Active: "bg-green-600",
            Inactive: "bg-red-600",
          };

          // Definisi objek pemetaan untuk status Completed/Incompleted
          const orderStatusMap = {
            completed: "bg-green-600",
            incompleted: "bg-red-600",
          };

          // Definisi objek pemetaan untuk production status/order status
          const productionStatusMap = {
            Completed: "bg-green-600",
            "Pending Confirmation": "bg-yellow-600",
            "In Production": "bg-yellow-600",
            Packaging: "bg-yellow-600",
            Cancelled: "bg-red-600",
            Shipped: "bg-green-600",
          };

          // Definisi objek pemetaan untuk metode pembayaran
          const paymentMethodMap = {
            cash: "bg-green-600",
            credit: "bg-yellow-600",
            Online: "bg-primary-600",
            Other: "bg-red-600",
          };

          // Definisi objek pemetaan untuk status pembayaran
          const paymentStatusMap = {
            paid: "bg-green-600",
            partial: "bg-yellow-600",
            unpaid: "bg-primary-600",
          };
          // Definisi objek pemetaan untuk status transaksi penerimaan barang
          const goodReceiptMap = {
            received: "bg-green-600",
          };

          if (statusMap.hasOwnProperty(info.getValue())) {
            className = `border py-0.5 px-4 rounded ${
              statusMap[info.getValue()]
            } w-fit text-white text-sm`;
          } else if (orderStatusMap.hasOwnProperty(info.getValue())) {
            className = `border py-0.5 px-4 rounded ${
              orderStatusMap[info.getValue()]
            } w-fit text-white text-sm`;
          } else if (productionStatusMap.hasOwnProperty(info.getValue())) {
            className = `border py-0.5 px-4 rounded ${
              productionStatusMap[info.getValue()]
            } w-fit text-white text-sm`;
          } else if (paymentMethodMap.hasOwnProperty(info.getValue())) {
            className = `border py-0.5 px-4 rounded ${
              paymentMethodMap[info.getValue()]
            } w-fit text-white text-sm`;
          } else if (paymentStatusMap.hasOwnProperty(info.getValue())) {
            className = `border py-0.5 px-4 rounded ${
              paymentStatusMap[info.getValue()]
            } w-fit text-white text-sm`;
          } else if (goodReceiptMap.hasOwnProperty(info.getValue())) {
            className = `border py-0.5 px-4 rounded ${
              goodReceiptMap[info.getValue()]
            } w-fit text-white text-sm`;
          }

          if (
            info.getValue() === "purchase" ||
            info.getValue() === "inbound" ||
            info.getValue() === "supplier"
          ) {
            className =
              "border py-0.5 px-2 rounded bg-green-600 w-fit text-white text-sm flex items-center justify-center";
            icon = (
              <svg
                className="w-5 h-5 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19V5m0 14-4-4m4 4 4-4"
                />
              </svg>
            );
          } else if (
            info.getValue() === "sale" ||
            info.getValue() === "outbound" ||
            info.getValue() === "customer"
          ) {
            className =
              "border py-0.5 px-2 rounded bg-red-600 w-fit text-white text-sm flex items-center justify-center";
            icon = (
              <svg
                className="w-5 h-5 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v13m0-13 4 4m-4-4-4 4"
                />
              </svg>
            );
          } else if (info.getValue() === "transfer") {
            className =
              "border py-0.5 px-2 rounded bg-blue-600 w-fit text-white text-sm flex items-center justify-center";
            icon = (
              <svg
                className="w-5 h-5 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"
                />
              </svg>
            );
          }
          // Cek apakah nilai adalah angka desimal atau nominal
          const value = info.getValue();
          let formattedValue;
          if (
            typeof value === "number" &&
            key !== "id" &&
            key !== "stock" &&
            key !== "amount" &&
            key !== "quantity" &&
            key !== "kapasitas" &&
            key !== "tagihan terbayar"
            // key !== "unit_of_measure"
          ) {
            className = "text-right";
            formattedValue = formatToRupiah(value);
          } else if (
            (typeof value === "number" && 
            key === "capacity") ||
            key === "kapasitas"
            // key === "amount"
          ) {
            // Handle capacity with decimal formatting
            className = "text-right";
            const formattedNumber = value.toLocaleString("id-ID", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            formattedValue = `${formattedNumber} ton`;
          } else if(key === 'unit of measure') {
            className = "text-right"
            formattedValue = value
          } else {
            formattedValue = value;
          }

          if(key === 'amount') {
            formattedValue = value.toLocaleString("id-ID")
          }

          // Tambahkan kondisi untuk tidak mengaplikasikan capitalize pada key tertentu
          const shouldCapitalize = ![
            "email",
            "username",
            "no_handphone",
            "number phone",
          ].includes(key);
          const finalClassName = shouldCapitalize
            ? `${className} capitalize`
            : className;

          return (
            <p className={finalClassName}>
              {icon}
              {key === "amount" ? formattedValue + ` kg` : formattedValue}
            </p>
          );
        },
      });
    });
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      globalFilter,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    debugTable: true,
  });

  if (!data) {
    // Tampilkan pesan "Loading..." jika data masih undifined
    return (
      <div
        role="status"
        className="max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-700 w-12"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 dark:bg-gray-900 mb-32">
      <h3 className="text-2xl font-semibold mb-3 dark:text-white">
        {dataHeading && dataHeading[0].heading}
      </h3>
      <p
        className="text-gray-600 dark:text-gray-300 mb-6"
        style={{ paddingRight: "30rem" }}
      >
        {dataHeading && dataHeading[0].information}
      </p>
      <div className="mx-auto">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className={`${showHeading === false ? `hidden` : ``}`}>
            <TabelHeading
              toggleOpenModal={dataHeading && dataHeading[0].eventToggleModal}
              icon={dataHeading && dataHeading[0].icon}
              label={dataHeading && dataHeading[0].label}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              handleClickHeading={dataHeading && dataHeading[0].onclick}
              showNavHeading={dataHeading && dataHeading[0].showNavHeading}
              activeButton={dataHeading && dataHeading[0].activeButton}
              dataNavHeading={dataHeading && dataHeading[0].dataNavHeading}
            />
          </div>
          <div className="overflow-x-auto">
            <table className={`w-full ${skeleton ? `` : `hidden`}`}>
              <tbody>
                <tr className="w-full border-t-[1px]">
                  <td className="flex gap-1">
                    <div
                      role="status"
                      className="max-w-full w-full p-4 space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-600 w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-700 w-12"></div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-600 w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-700 w-12"></div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-600 w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-700 w-12"></div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-600 w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-700 w-12"></div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-600 w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded dark:bg-gray-700 w-12"></div>
                      </div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className={`w-full ${data.length === 0 ? `` : `hidden`}`}>
              <tbody>
                <tr className="w-full flex justify-center border-t-[1px]">
                  <td className="flex gap-1 py-8">
                    <p
                      className="flex items-center text-gray-700 text-sm"
                      onClick={() => setOpenModal(dataHeading[0].activeButton)}
                    >
                      No data found, you should
                    </p>
                    <button
                      onClick={() => setOpenModal(dataHeading[0].activeButton)}
                      className="text-sm"
                      style={{ color: globalColor }}
                    >
                      {" "}
                      add new data here.
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="min-w-full w-max 2xl:w-full">
              <Table
                hoverable
                className={`${
                  skeleton ? `hidden` : ``
                } min-w-full w-max 2xl:w-full`}
              >
                <Table.Head>
                  {table.getHeaderGroups()[0].headers.map((header) => (
                    <Table.HeadCell
                      className={`${header.id === "id" ? `hidden` : ``} 
                    ${
                      header.id === "harga satuan"
                        ? `text-right`
                        : `` || header.id === "shipping cost"
                        ? `text-right`
                        : `` || header.id === "total price"
                        ? `text-right`
                        : `` || header.id === "balance"
                        ? `text-right`
                        : `` || header.id === "account balance"
                        ? `text-right`
                        : `` ||
                          header.id === "book value" ||
                          header.id === "price" ||
                          header.id === "buying price"
                        ? `text-right`
                        : `` || header.id === "selling price"
                        ? `text-right`
                        : `` || header.id === "unit price"
                        ? `text-right`
                        : `` || header.id === "shipping cost"
                        ? `text-right`
                        : `` || header.id === "balance due"
                        ? `text-right`
                        : `` || header.id === "taxes"
                        ? `text-right`
                        : `` || header.id === "biaya"
                        ? `text-right`
                        : `` || header.id === "saldo"
                        ? `text-right`
                        : // : // : `` || header.id === "quantity"
                        // // ? `text-right`
                        // `` || header.id === "weight"
                        // ? `text-right`
                        `` || header.id === "hpp balance"
                        ? `text-right`
                        : `` || header.id === "harga satuan"
                        ? `text-right`
                        : `` || header.id === "kapasitas"
                        ? `text-right`
                        : `` || header.id === "tagihan terbayar"
                        ? `text-right`
                        : `` ||
                          header.id === "total amount" ||
                          header.id === "amount paid"
                        ? `text-right`
                        : `` || header.id === "discount price"
                        ? "text-right"
                        : "" || header.id === "assets"
                        ? "text-right"
                        : "" || header.id === "liabilities"
                        ? "text-right"
                        : "" || header.id === "equity"
                        ? "text-right"
                        : "" || header.id === "opening balance"
                        ? "text-right"
                        : "" || header.id === "total debit"
                        ? "text-right"
                        : "" || header.id === "total credit"
                        ? "text-right"
                        : "" || header.id === "net cash flow"
                        ? "text-right"
                        : "" || header.id === "paid amount"
                        ? "text-right"
                        : "" || header.id === "amount of costs"
                        ? "text-right"
                        : "" || header.id === "rest of the bill"
                        ? "text-right"
                        : "" || header.id === "total harga"
                        ? "text-right"
                        : "" || header.id === "harga pengiriman"
                        ? "text-right"
                        : "" || header.id === 'unit of measure'
                        ? "text-right"
                        : ""
                    }`}
                      key={header.id}
                    >
                      <span className="">
                        {header.id === "Employment Status" ? `` : header.id}
                      </span>
                      {header.column.getCanFilter() &&
                        header.id === "Employment Status" && (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        )}
                    </Table.HeadCell>
                  ))}
                  <Table.HeadCell
                    className={`${data.length === 0 ? `hidden` : ``}`}
                  >
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {table.getRowModel().rows.map((row) => (
                    <Table.Row
                      key={row.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      {row.getVisibleCells().map((cell) => {
                        // Check if the cell's column ID matches the one you want to hide
                        if (cell.column.columnDef.id === "id") {
                          return null; // Skip rendering this cell
                        }
                        return (
                          <Table.Cell
                            key={cell.id}
                            className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Table.Cell>
                        );
                      })}
                      {row.getVisibleCells().map((cell) => {
                        // Check if the cell's column ID matches the one you want to hide
                        if (cell.column.columnDef.id === "id") {
                          return (
                            <Table.Cell className={`text-right`}>
                              <button
                                key={1 + 1}
                                style={{ color: globalColor }}
                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                onClick={(e) => handleEditClick(e.target)} // Pass row.id as
                                parameter
                              >
                                {/* <span className='hidden'>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span> */}
                                <svg
                                  className="w-6 h-6 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
                                  >
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </path>
                                </svg>
                              </button>
                            </Table.Cell>
                          ); // Skip rendering this cell
                        } else {
                          return null;
                        }
                      })}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
          <nav
            className="flex flex-col md:flex-row border-t-[1px] justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <Paginate table={table} />
          </nav>
        </div>
      </div>
    </section>
  );
};

function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={columnFilterValue?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={columnFilterValue?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={columnFilterValue ?? ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 0,
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
    />
  );
}

export default TabelComponent;
