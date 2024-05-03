import { useEffect, useState } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";
import { Spinner } from "../../../../layouts/Spinner";

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

  const { data, loading, setLoading, setRefresh } = Read({
    dataTabel,
    endPoint: "sales-report",
  });

  useEffect(() => {
    document.title = 'Laporan Penjualan - DHKJ Manufacturer'
  }, [])

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
      <Spinner loading={loading} />
      <TabelComponent data={data} dataHeading={dataHeading} setLoading={setLoading} setRefresh={setRefresh}/>
    </>
  );
};
