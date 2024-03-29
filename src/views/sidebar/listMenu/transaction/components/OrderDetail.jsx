import { CRUD } from "./CRUD";
import { useEffect } from "react";
import Button from "../../../../layouts/Button";
import { TabelForDetail } from "../../../../layouts/TabelForDetail";
import { getApiData } from "../../../../../function/Api";
import IconDownload from "../../../../layouts/icons/IconDownload";

export const OrderDetail = ({
  data,
  defaultEdit,
  handleEdit,
  dataHeading,
  setPath,
}) => {
  const dataProducts = data?.products
    ? data.products.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity + " pcs",
        "harga satuan": new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(item.price_per_unit),
        "total price": new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(item.total_price),
      }))
    : []; // Use an empty array if data.departments is null

  const handleBack = () => {
    defaultEdit(true);
    setPath("orders");
  };

  const downloadReport = async () => {
    try {
      const orderId = data?.id;
      console.log(orderId);

      // Ensure the order ID is available before proceeding
      if (!orderId) {
        console.error("Order ID not available");
        return;
      }
      const { data: pdfData, status } = await getApiData(
        `download/orders/${orderId}`
      );
      if (status === 200) {
        const pdfUrl = pdfData;

        // Create a hidden link
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.target = "_blank"; // Open in a new tab/window
        link.download = `order_detail_${orderId}.pdf`; // Set the desired file name

        // Append the link to the document
        document.body.appendChild(link);

        // Simulate a click to trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-2xl my-5 dark:text-white font-semibold">
        Order detail
      </h1>
      <section className="bg-white dark:bg-gray-800 dark:text-white rounded-md shadow-md p-5 mb-16">
        <div className="grid lg:grid-cols-2 text-base">
          <div className="col-span-1">
            <table className={`w-full`}>
              <tr className="">
                <td className="py-3">Kode Transaksi</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.kode_order || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-3">
                  {data?.vendor?.transaction_type == "outbound"
                    ? "Customer"
                    : "Supplier"}
                </td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.vendor?.name || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-3">
                  {data?.vendor?.transaction_type == "outbound"
                    ? "Gudang Tujuan"
                    : "Gudang Asal"}
                </td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">{data?.warehouse?.name || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-3">Kode transaksi invoice</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">
                    {data?.invoices?.length > 0
                      ? data.invoices
                          .map((invoice) => invoice.kode_invoice)
                          .join(", ")
                      : "--"}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3">Order type</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.order_type || "--"}</span>
                </td>
              </tr>
            </table>
          </div>
          <div className="col-span-1">
            <table className="w-full">
              <tr>
                <td className="py-3">Order status</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.order_status || "--"}</span>
                </td>
              </tr>

              <tr>
                <td className="py-3">PPN</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.taxes || "Rp. 0"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-3">Biaya Pengiriman</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">{data?.shipping_cost || "Rp. 0"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-3">Total Tagihan</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">
                    {data?.total_price
                      ? new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(data.total_price)
                      : "--"}
                  </span>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <Button
            bgColour={""}
            label={"Back"}
            paddingX={"4"}
            paddingY={"2.5"}
            event={() => handleBack()}
            icon={
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
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
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
            }
          />
          <Button
            bgColour={"primary"}
            label={"Edit"}
            paddingX={"4"}
            event={() => handleEdit(data.id, "orders")}
            paddingY={"2.5"}
            icon={
              <svg
                className="w-6 h-6 text-white dark:text-white"
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
                />
              </svg>
            }
          />
          <Button
            bgColour={"#040d1d"}
            textColour={"#fff"}
            label={"Print"}
            paddingX={"3"}
            event={downloadReport}
            paddingY={"2"}
            icon={
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="white"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16.4 18H19c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v5c0 .6.4 1 1 1h2.6m9.4-7V5c0-.6-.4-1-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4c0 .6-.4 1-1 1H8a1 1 0 0 1-1-1v-4Z"
                />
              </svg>
            }
          />
        </div>
        <hr className="my-7" />
        <div className="grid grid-cols-1 gap-5">
          <div>
            <h2 className="text-xl font-medium dark:text-white mb-4">
              Daftar Produk
            </h2>
            <TabelForDetail
              data={dataProducts}
              dataHeading={dataHeading}
              handleEdit={handleEdit}
              routes={"products"}
            />
          </div>
        </div>
        <hr className="my-7" />
      </section>
    </>
  );
};
