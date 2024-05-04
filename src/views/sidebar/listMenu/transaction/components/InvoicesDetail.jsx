import Button from "../../../../layouts/Button";
import { numberToCurrency } from "../../../../config/FormatCurrency";
import { TabelForDetail } from "../../../../layouts/TabelForDetail";
import { useEffect, useState } from "react";
import { getApiData } from "../../../../../function/Api";

export const InvoicesDetail = ({
  data,
  defaultEdit,
  handleEdit,
  dataHeading,
  setPath,
  setLoading,
  setRefresh
}) => {
  const handleBack = () => {
    defaultEdit(true);
    setPath("invoices");
  };

  const handleRefresh = () => {
    setRefresh(prevRefresh => !prevRefresh)
    setLoading(false)
  }

  const [dataInvoicesPayments, setDataInvoicesPayments] = useState([]);

  useEffect(() => {
    setDataInvoicesPayments(() =>
      data?.payments
        ? data.payments.map((item) => ({
            id: item.id,
            "kode pembayaran": (
              <a
                href="#"
                onClick={(e) => downloadPayment(e, item.id)}
                className="flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-1 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 30 24"
                >
                  <path
                    stroke="#f95b12"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16.4 18H19c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v5c0 .6.4 1 1 1h2.6m9.4-7V5c0-.6-.4-1-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4c0 .6-.4 1-1 1H8a1 1 0 0 1-1-1v-4Z"
                  />
                </svg>
                {item.kode_payment}
              </a>
            ),

            "metode pembayaran": item.payment_method,
            "tanggal terbayar": item.payment_date,
            "tagihan terbayar": numberToCurrency(item.amount_paid),
          }))
        : []
    );
  }, [data]);

  const downloadPayment = async (e, paymentId) => {
    e.preventDefault();
    try {
      const { data: pdfData, status } = await getApiData(
        `download/payments/${paymentId}`
      );
      if (status === 200) {
        const pdfUrl = pdfData;

        // Create a hidden link
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.target = "_blank"; // Open in a new tab/window
        link.download = `payment_detail_${paymentId}.pdf`; // Set the desired file name

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
      <div className="flex gap-5 items-center my-5">
        <h1 className="text-2xl dark:text-white font-semibold">
          Detail faktur tagihan
        </h1>
        <div onClick={() => handleRefresh()} className="flex gap-1 items-center cursor-pointer">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
            </svg>
            <p>Refresh</p>
          </div>
      </div>
      <section className="p-5 mb-7 bg-white rounded-md shadow-md dark:bg-gray-800 dar00k:text-white">
        <div className="grid text-base lg:grid-cols-2">
          <div className="col-span-1">
            <table className={`w-full`}>
              <tr>
                <td className="py-1">Order</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">
                    {data?.order?.kode_order || "--"}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Invoice code</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.kode_invoice || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Status</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.status || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Invoie date</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.invoice_date || "--"}</span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Due date</td>
                <td>
                  {" "}
                  : <span className="ml-5">{data?.due_date || "--"}</span>
                </td>
              </tr>
            </table>
          </div>
          <div className="col-span-1">
            <table className={`w-full`}>
              <tr>
                <td className="py-1">Total amount</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">
                    {numberToCurrency(data?.total_amount) || "--"}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Tagihan Terbayar</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">
                    {numberToCurrency(data?.paid_amount) || "--"}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-1">Sisa Tagihan</td>
                <td>
                  {" "}
                  :{" "}
                  <span className="ml-5">
                    {numberToCurrency(data?.balance_due) || "--"}
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
                viewBox="0 0 30 24"
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
            event={() => handleEdit(data.id, "invoices")}
            paddingY={"2.5"}
            icon={
              <svg
                className="w-6 h-6 text-white dark:text-white"
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
                />
              </svg>
            }
          />
          <Button
            bgColour={"#040d1d"}
            textColour={"#fff"}
            label={"Print"}
            paddingX={"3"}
            // event={}
            paddingY={"2"}
            icon={
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 30 24"
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
      </section>

        <h2 className="text-xl mb-4 font-medium dark:text-white">
              Riwayat Pembayaran
        </h2>
      
        <div className="bg-white rounded-md border shadow-md mb-16">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <TabelForDetail
                data={dataInvoicesPayments}
                dataHeading={dataHeading}
                handleEdit={handleEdit}
                routes={"invoices-payments"}
              />
            </div>
          </div>
        </div>
    </>
  );
};
