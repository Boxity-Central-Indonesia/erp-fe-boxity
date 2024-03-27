import { useState } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";

export const VendorTransaction = () => {
  const dataTabel = (data) => {
    return data.map((item) => ({
      "kode transaksi": item.kode_order,
      "vendor name": item.nama_vendor,
      "nama product": item.nama_product,
      amount: item.amount,
      "harga satuan": item.unit_price,
      "total harga": item.total_price,
    }));
  };

  const { data } = Read({ dataTabel, endPoint: "vendor-report" });

  const print = () => {
    downloadReport("download/vendor-report");
  };

  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Vendor Transaction Report",
      eventToggleModal: downloadReport,
    },
  ]);

  return (
    <>
      <TabelComponent data={data} dataHeading={dataHeading} />
    </>
  );
};
