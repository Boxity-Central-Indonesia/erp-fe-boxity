// Tabel.jsx
import React, { useMemo } from "react";
import { Table, Dropdown, TableCell, TableBody } from "flowbite-react";
import Paginate from "./PaginateTest";
import TabelHeading from "./TabelHeading";
import { useColor } from "../conifg/GlobalColour";
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

          // Cek apakah nilai adalah 'Active' atau 'Inactive'
          if (info.getValue() === "Active") {
            className =
              "border py-0.5 px-4 rounded-full bg-green-600 w-fit text-white text-sm";
          } else if (info.getValue() === "Inactive") {
            className =
              "border py-0.5 px-4 rounded-full bg-red-600 w-fit text-white text-sm";
          }
          // cek apakah nilai status pada order sama dengan completed atau tidak
          if (info.getValue() === "completed") {
            className =
              "border py-0.5 px-4 rounded-full bg-green-600 w-fit text-white text-sm";
          } else if (info.getValue() === "incompleted") {
            className =
              "border py-0.5 px-4 rounded-full bg-red-600 w-fit text-white text-sm";
          }
          // cek nilai production status / order status apakah completed atau tidak
          if (info.getValue() === "Completed") {
            className =
              "border py-0.5 px-4 rounded-full bg-green-600 w-fit text-white text-sm";
          } else if (info.getValue() === "Pending Confirmation") {
            className =
              "border py-0.5 px-4 rounded-full bg-yellow-600 w-fit text-white text-sm";
          } else if (info.getValue() === "In Production") {
            className =
              "border py-0.5 px-4 rounded-full bg-yellow-600 w-fit text-white text-sm";
          } else if (info.getValue() === "Packaging") {
            className =
              "border py-0.5 px-4 rounded-full bg-yellow-600 w-fit text-white text-sm";
          } else if (info.getValue() === "Cancelled") {
            className =
              "border py-0.5 px-4 rounded-full bg-red-600 w-fit text-white text-sm";
          } else if (info.getValue() === "Shipped") {
            className =
              "border py-0.5 px-4 rounded-full bg-green-600 w-fit text-white text-sm";
          }

          if (info.getValue() === "purchase" || info.getValue() === "inbound") {
            className =
              "border py-0.5 px-2 rounded-full bg-green-600 w-fit text-white text-sm flex items-center justify-center";
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
            info.getValue() === "outbound"
          ) {
            className =
              "border py-0.5 px-2 rounded-full bg-red-600 w-fit text-white text-sm flex items-center justify-center";
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
              "border py-0.5 px-2 rounded-full bg-blue-600 w-fit text-white text-sm flex items-center justify-center";
            icon = (
              <svg
                class="w-5 h-5 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"
                />
              </svg>
            );
          }
          // Cek apakah nilai adalah angka desimal atau nominal
          const value = info.getValue();
          const formattedValue =
            typeof value === "number" &&
            key != "id" &&
            key != "stock" &&
            key != "amount" &&
            key != "quantity" &&
            key != "capacity"
              ? formatToRupiah(value)
              : value;

          return (
            <p className={`${className} capitalize`}>
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

  // useEffect(() => {
  //   if (table.getState().columnFilters[0]?.id === 'fullName') {
  //     if (table.getState().sorting[0]?.id !== 'fullName') {
  //       table.setSorting([{ id: 'fullName', desc: false }]);
  //     }
  //   }
  // }, [table.getState().columnFilters[0]?.id]);

  if (!data) {
    // Tampilkan pesan "Loading..." jika data masih undifined
    return (
      <div
        role="status"
        className="max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
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
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
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
                      No data found, want to
                    </p>
                    <button
                      onClick={() => setOpenModal(dataHeading[0].activeButton)}
                      className="text-sm"
                      style={{ color: globalColor }}
                    >
                      {" "}
                      add new data
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <Table hoverable className={`${skeleton ? `hidden` : ``}`}>
              <Table.Head>
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <Table.HeadCell
                    className={`${header.id === "id" ? `hidden` : ``}`}
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
