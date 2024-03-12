import { useState } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { getApiData } from "../../../../../function/Api";
import { Read } from "../read";

export const Penjualan = () => {

  const dataTabel = (data) => {
    return data.map(item => ({
      'order code': item.kode_order,
      customer: item.vendor_name,
      'Invoice date': item.invoice_date,
      'invoice status' : item.invoice_status,
      'total price': item.total_price,
      'paid amount': item.paid_amount,
    }))
  }

  const {
    data
  } = Read({
    dataTabel,
    endPoint: 'sales-report'
  })

  const downloadReport = async () => {
    try {
      const { data, status } = await getApiData("download/sales-report");
      if (status === 200) {
        const pdfUrl = data;

        // Create a hidden link
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.target = "_blank"; // Open in a new tab/window
        link.download = data; // Set the desired file name

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

  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Sales Report",
      eventToggleModal: downloadReport,
    },
  ]);

  return (
    <>
      <TabelComponent
        data={data}
        dataHeading={dataHeading}
        // handleEdit={handleEdit}
      />
    </>
  );
};
