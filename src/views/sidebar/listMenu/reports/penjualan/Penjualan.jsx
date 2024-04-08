import { useState } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";

export const Penjualan = () => {
  const dataTabel = (data) => {
    return data.map((item) => ({
      "order code": item.kode_order,
      customer: item.vendor_name,
      "Tanggal Penjualan": item.invoice_date,
      status: item.invoice_status,
      "total Tagihan": item.total_price,
      "Tagihan Terbayar": item.paid_amount,
    }));
  };

  const print = () => {
    downloadReport({ endPoint: "download/sales-report" });
  };

  const { data } = Read({
    dataTabel,
    endPoint: "sales-report",
  });

  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Sales Report",
      eventToggleModal: print,
    },
  ]);

  return (
    <>
      <TabelComponent data={data} dataHeading={dataHeading} />
    </>
  );
};
