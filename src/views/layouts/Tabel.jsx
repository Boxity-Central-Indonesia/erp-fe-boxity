// Tabel.jsx
import React, { useMemo } from "react";
import { Table } from "flowbite-react";
import Paginate from "./PaginateTest";
import TabelHeading from "./TabelHeading";
import { useColor } from "../config/GlobalColour";
import { useState, useEffect } from "react";
import { numberToDecimal } from "../config/FormatCurrency";
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
  hiddenButton,
  setRefresh,
  refresh,
  setLoading,
  usePageDetail
}) => {
  const { globalColor, changeColor } = useColor();
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  const handleEditClick = (param, param2) => {
    handleEdit(param, param2);
  };

  const handleRefresh = () => {
    setLoading(false)
    setRefresh(prevRefresh => !prevRefresh)
  }

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
            Active: "bg-green-600 text-center",
            Inactive: "bg-red-600 text-center",
          };

          // Definisi objek pemetaan untuk status Completed/Incompleted
          const orderStatusMap = {
            completed: "bg-green-600 text-center",
            incompleted: "bg-red-600 text-center",
          };

          // Definisi objek pemetaan untuk production status/order status
          const productionStatusMap = {
            Completed: "bg-green-600 text-center",
            "Pending Confirmation": "bg-yellow-600 text-center",
            "In Production": "bg-yellow-600 text-center",
            Packaging: "bg-yellow-600 text-center",
            Cancelled: "bg-red-600 text-center",
            Shipped: "bg-green-600 text-center",
          };

          // Definisi objek pemetaan untuk metode pembayaran
          const paymentMethodMap = {
            cash: "bg-green-600 text-center",
            credit: "bg-yellow-600 text-center",
            debit: "bg-green-600 text-center", 
            online: "bg-primary-600 text-center",
            other: "bg-red-600 text-center",
          };

          // Definisi objek pemetaan untuk status pembayaran
          const paymentStatusMap = {
            paid: "bg-green-600 text-center",
            partial: "bg-yellow-600 text-center",
            unpaid: "bg-primary-600 text-center",
            Lunas: "bg-green-600 text-center",
            Cicilan: "bg-yellow-600 text-center",
            "Belum Lunas": "bg-primary-600 text-center",
          };
          // Definisi objek pemetaan untuk status transaksi penerimaan barang
          const goodReceiptMap = {
            received: "bg-green-600 text-center",
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
              "border py-0.5 px-2 rounded bg-green-600 w-fit text-white text-sm flex items-center justify-center text-center";
            icon = (
              <svg
                className="w-5 h-5 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 24"
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
              "border py-0.5 px-2 rounded bg-red-600 w-fit text-white text-sm flex items-center justify-center text-center";
            icon = (
              <svg
                className="w-5 h-5 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
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
            );
          } else if (info.getValue() === "transfer") {
            className =
              "border py-0.5 px-2 rounded bg-blue-600 w-fit text-white text-sm flex items-center justify-center text-center";
            icon = (
              <svg
                className="w-5 h-5 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 24"
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
          } else if (info.getValue() === "Direct Order") {
            className =
              "border py-0.5 px-2 rounded bg-blue-600 w-fit text-white text-sm flex items-center justify-center text-center";
            icon = (
              <svg
                className="w-5 h-5 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            );
          } else if (info.getValue() === "Production Order") {
            className =
              "border py-0.5 px-2 rounded bg-yellow-600 w-fit text-white text-sm flex items-center justify-center text-center";
            icon = (
              <svg
                className="w-5 h-5 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
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
            (typeof value === "number" && key === "capacity") ||
            key === "kapasitas"
            // key === "amount"
          ) {
            // Handle capacity with decimal formatting
            className = "text-right";
            // const formattedNumber = value.toLocaleString("id-ID", {
            //   minimumFractionDigits: 2,
            //   maximumFractionDigits: 2,
            // });
            formattedValue = numberToDecimal({value: value}) + ' ton';
          } else if (key === "unit of measure") {
            className = "text-right";
            formattedValue = value;
          } else {
            formattedValue = value;
          }

          if (key === "amount") {
            formattedValue = value.toLocaleString("id-ID");
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
    <section className="mb-32 bg-gray-100 dark:bg-gray-900">
     <div className="flex items-center gap-5 mb-3">
        <h3 className="text-2xl font-semibold dark:text-white">
          {dataHeading && dataHeading[0].heading}
        </h3>
        <div onClick={() => handleRefresh()} className="flex gap-1 items-center cursor-pointer">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
          </svg>
          <p>Refresh</p>
        </div>
     </div>
      <p
        className="mb-6 text-gray-600 dark:text-gray-300"
        style={{ paddingRight: "10rem" }}
      >
        {dataHeading && dataHeading[0].information}
      </p>
      <div className="mx-auto">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
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
              hidden={hiddenButton}
            />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            {/* Efek loading ketika data belum selesai di muat */}

            <table className={`w-full ${skeleton ? `` : `hidden`}`}>
              <tbody>
                <tr className="w-full border-t-[1px]">
                  <td className="flex gap-1">
                    <div
                      role="status"
                      className="w-full max-w-full p-4 space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
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

            {/* Ketika tidak ada data di temukan */}

            <table className={`w-full ${data.length === 0 ? `` : `hidden`}`}>
              <tbody>
                <tr className="w-full flex justify-center border-t-[1px]">
                  <td className="flex gap-1 py-8">
                    <p
                      className="flex items-center text-sm text-gray-700"
                      onClick={() => setOpenModal(dataHeading[0].activeButton)}
                    >
                      Tidak ada data ditemukan disini, mungkin kamu bisa
                    </p>
                    <button
                      onClick={() => setOpenModal(dataHeading[0].activeButton)}
                      className="text-sm"
                      style={{ color: globalColor }}
                    >
                      {" "}
                      menambah data disini.
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Tabel body */}

            <div className="min-w-full w-max 2xl:w-full">
              <Table
                hoverable
                striped
                className={`${
                  skeleton ? `hidden` : ``
                } min-w-full w-max 2xl:w-full`}
              >
                {/* Tabel heading */}
                <Table.Head>
                  {table.getHeaderGroups()[0].headers.map((header) => {
                    const headerClassMap = {
                      "harga satuan": "text-right",
                      "hpp balance": "text-right",
                      "shipping cost": "text-right",
                      "total price": "text-right",
                      balance: "text-right",
                      "account balance": "text-right",
                      "book value": "text-right",
                      price: "text-right",
                      "harga beli": "text-right",
                      "harga jual": "text-right",
                      "unit price": "text-right",
                      "balance due": "text-right",
                      taxes: "text-right",
                      biaya: "text-right",
                      saldo: "text-right",
                      "hpp balance": "text-right",
                      kapasitas: "text-right",
                      "tagihan terbayar": "text-right",
                      "total amount": "text-right",
                      "Tagihan Terbayar": "text-right",
                      "sisa tagihan": "text-right",
                      "total tagihan": "text-right",
                      "harga diskon": "text-right",
                      assets: "text-right",
                      liabilities: "text-right",
                      equity: "text-right",
                      "opening balance": "text-right",
                      "total debit": "text-right",
                      "total credit": "text-right",
                      "net cash flow": "text-right",
                      "paid amount": "text-right",
                      "amount of costs": "text-right",
                      "rest of the bill": "text-right",
                      "total harga": "text-right",
                      "harga pengiriman": "text-right",
                      "unit of measure": "text-right",
                      status: "text-left",
                      quantity: "text-right",
                    };

                    return (
                      <Table.HeadCell
                        className={`${
                          header.id === "id" || data.length === 0
                            ? "hidden"
                            : ""
                        } ${headerClassMap[header.id] || ""}`}
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
                    );
                  })}
                  <Table.HeadCell className={`${!usePageDetail ? `hidden` : ``}`}></Table.HeadCell>
                </Table.Head>

                {/* Tabel body */}

                <Table.Body className="divide-y">
                  {table.getRowModel().rows.map((row, rowIndex) => (
                    <Table.Row
                      key={row.id}
                      className={`${
                        rowIndex % 2 === 0 ? "even:bg-gray-50" : "odd:bg-white"
                      } border-b`}
                    >
                      {row.getVisibleCells().map((cell) => {
                        // Check if the cell's column ID matches the one you want to hide
                        if (cell.column.columnDef.id === "id") {
                          return null; // Skip rendering this cell
                        }
                        return (
                          <Table.Cell
                            key={cell.id}
                            className="text-sm text-gray-900 whitespace-nowrap font-small"
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
                            <Table.Cell
                              className={`text-right flex items-center justify-end`}
                            >
                              <button
                                key={1 + 1}
                                style={{ color: globalColor }}
                                className="font-medium text-cyan-600 hover:underline"
                                onClick={(e) => handleEditClick(e.target)}
                              >
                                <svg
                                  className={`w-5 h-5 ${!usePageDetail ? `` : `hidden`}`}
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 30 24"
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
                                <svg className={`w-5 h-5 dark:text-white ${!usePageDetail ? `hidden` : ``}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                  <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"> {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}</path>
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

          {/* Nav tabel */}
          <nav
            className="flex flex-col md:flex-row border-t-[1px] justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <Paginate table={table} itemsPagination={[15, 30, 50]} />
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
          className="w-24 border rounded shadow"
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
          className="w-24 border rounded shadow"
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
        className="border rounded shadow w-36"
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
