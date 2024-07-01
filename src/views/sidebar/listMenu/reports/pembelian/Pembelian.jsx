import { useState, useEffect } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";
import { Spinner } from "../../../../layouts/Spinner";

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

  const { data, loading, setLoading, setRefresh } = Read({ dataTabel, endPoint: "purchase-report" });

  useEffect(() => {
    document.title = 'Laporan Pembialan - DHKJ Manufacturer'
  }, [])

  const print = () => {
    downloadReport({ endPoint: "download/purchase-report" });
  };

  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Laporan Pembelian",
      eventToggleModal: print,
    },
  ]);

  return (
    <>
      <Spinner loading={loading} />
      <TabelComponent data={data} dataHeading={dataHeading} setRefresh={setRefresh} setLoading={setLoading} useReportCondition={true}/>
    </>
  );
};
