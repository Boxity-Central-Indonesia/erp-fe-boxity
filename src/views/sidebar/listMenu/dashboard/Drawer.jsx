import { Table } from "flowbite-react";
import { useState, useEffect } from "react";
import { useColor } from "../../../config/GlobalColour";
import IconPrint from "../../../layouts/icons/IconPrint"
import { downloadReport } from "../reports/downloadReport";
import uuid from 'uuid-random'; 

export const Drawer = ({
  openDrawer,
  setOpenDrawer,
  setSelectedCheckbox,
  dataDrawer,
}) => {
  const { globalColor, changeColor } = useColor();

  const uniqueId = uuid(); // Membuat uniqueId untuk setiap instance komponen

  const classOpen =
    "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-[42%] dark:bg-gray-800 transform-none border pt-24";

  const classClosed =
    "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800";

  const dataProducts = dataDrawer?.products
    ? dataDrawer.products.map((item) => ({
        id: item.id,
        name: item.name,
        qty: item.quantity + " pcs",
        "harga satuan": new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(item.price_per_unit),
        "total harga": new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(item.total_price),
      }))
    : []; // Use an empty array if data.departments is null

  const tabelOrder = () => {
    return (
      <>
        <table className={`w-full text-gray-700 text`}>
          <tr className="">
            <td className="py-1.5">Kode Pesanan</td>
            <td>
              {" "}
              : <span className="ml-5">{dataDrawer?.kode_order || "--"}</span>
            </td>
          </tr>
          <tr>
            <td className="py-1.5">Kode Invoice</td>
            <td>
              {" "}
              :{" "}
              <span className="ml-5">
                {dataDrawer?.invoices?.length > 0
                  ? dataDrawer.invoices
                      .map((invoice) => invoice.kode_invoice)
                      .join(", ")
                  : "--"}
              </span>
            </td>
          </tr>
          <tr>
            <td className="py-1.5">
              {dataDrawer?.vendor?.transaction_type === "outbound"
                ? "Customer"
                : "Supplier"}
            </td>
            <td>
              {" "}
              : <span className="ml-5">{dataDrawer?.vendor?.name || "--"}</span>
            </td>
          </tr>
          <tr>
            <td className="py-1.5">
              {dataDrawer?.vendor?.transaction_type === "outbound"
                ? "Gudang Tujuan"
                : "Gudang Asal"}
            </td>
            <td>
              {" "}
              :{" "}
              <span className="ml-5">
                {dataDrawer?.warehouse?.name || "--"}
              </span>
            </td>
          </tr>
          <tr>
            <td className="py-1.5">Order type</td>
            <td>
              {" "}
              : <span className="ml-5">{dataDrawer?.order_type || "--"}</span>
            </td>
          </tr>
          <tr>
            <td className="py-1.5">Order status</td>
            <td>
              {" "}
              : <span className="ml-5">{dataDrawer?.order_status || "--"}</span>
            </td>
          </tr>

          <tr>
            <td className="py-1.5">PPN</td>
            <td>
              {" "}
              : <span className="ml-5">{dataDrawer?.taxes || "Rp. 0"}</span>
            </td>
          </tr>
          <tr>
            <td className="py-1.5">Biaya Pengiriman</td>
            <td>
              {" "}
              :{" "}
              <span className="ml-5">
                {dataDrawer?.shipping_cost || "Rp. 0"}
              </span>
            </td>
          </tr>
          <tr>
            <td className="py-1.5">Total Tagihan</td>
            <td>
              {" "}
              :{" "}
              <span className="ml-5">
                {dataDrawer?.total_price
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(dataDrawer.total_price)
                  : "--"}
              </span>
            </td>
          </tr>
        </table>
      </>
    );
  };

  const tabelProductOrder = () => {
    if (dataProducts.length === 0) {
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
    } else {
      return (
        <>
          <div className="overflow-x-auto">
            <Table>
              <Table.Head className="border-b">
                {dataProducts &&
                  dataProducts[0] &&
                  Object.keys(dataProducts[0]).map(
                    (key) =>
                      key !== "product_id" &&
                      key !== "id" &&
                      dataProducts[0][key] !== null && (
                        <Table.HeadCell key={uniqueId}>{key}</Table.HeadCell>
                      )
                  )}
              </Table.Head>
              <Table.Body className="divide-y">
                {dataProducts &&
                  dataProducts.map((item) => (
                    <Table.Row
                      key={item.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 border-b"
                    >
                      {Object.keys(item)
                        .filter((key) => key !== "id")
                        .filter((key) => key !== "product_id")
                        .map((key) => (
                          <Table.Cell
                            key={uniqueId}
                            className="whitespace-nowrap capitalize font-medium text-gray-900 dark:text-white"
                          >
                            {item[key]}
                          </Table.Cell>
                        ))}
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </>
      );
    }
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
    setSelectedCheckbox(null);
  };

  return (
    <>
      <div
        id="drawer-right-example"
        className={openDrawer ? classOpen : classClosed}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <div className="flex justify-between items-center my-4">
          <h5
            id="drawer-right-label"
            className="inline-flex items-center text-xl font-semibold dark:text-gray-400"
          >
            Order Detail
          </h5>
          <button onClick={() => downloadReport({endPoint: 'download/orders/' + dataDrawer.id})} style={{backgroundColor: globalColor}} className="flex gap-1 border py-2.5 px-4 rounded-md">
            <IconPrint />
            <p className="text-sm text-white">Print</p>
          </button>
        </div>
        <button
          onClick={closeDrawer}
          type="button"
          data-drawer-hide="drawer-right-example"
          aria-controls="drawer-right-example"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-16 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div>{tabelOrder()}</div>
        <div className="mt-6">
          <h2 className="mb-3 text-xl font-medium">Product list</h2>
          {tabelProductOrder()}
        </div>
      </div>
    </>
  );
};
