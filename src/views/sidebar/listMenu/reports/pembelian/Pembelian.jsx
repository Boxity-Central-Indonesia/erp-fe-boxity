import { useState } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";

export const Pembelian = () => {
  const dataTabel = (data) => {
    return data.map((item) => ({
      "order code": item.kode_order,
      customer: item.vendor_name,
      "Tanggal Pembelian": item.invoice_date,
      status: item.invoice_status,
      "Total Tagihan": item.total_price,
      "Tagihan Terbayar": item.paid_amount,
    }));
  };

  const { data } = Read({ dataTabel, endPoint: "purchase-report" });

  const print = () => {
    downloadReport({ endPoint: "download/purchase-report" });
  };

  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Purchase Report",
      eventToggleModal: print,
    },
  ]);

  return (
    <>
      <TabelComponent data={data} dataHeading={dataHeading} />
    </>
  );
};
