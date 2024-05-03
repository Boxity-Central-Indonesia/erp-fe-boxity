import { useState, useEffect } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { getApiData } from "../../../../../function/Api";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";
import { Spinner } from "../../../../layouts/Spinner";

export const Produksi = () => {
  const dataTabel = (data) => {
    return data.map((item) => ({
      "order code": item.kodeOrder,
      "nama produk": item.product_name,
      "Activity type": item.activities[0].activity_type,
      "production status": item.activities[0].status_production,
      "production date": item.activities[0].tanggal_aktifitas,
    }));
  };

  const { data, setRefresh, setLoading, loading } = Read({ dataTabel, endPoint: "production-report" });

  useEffect(() => {
    document.title = 'Laporan Production - DHKJ Manufacturer'
  }, [])

  const print = () => {
    downloadReport("download/production-report");
  };
  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Production Report",
      eventToggleModal: print,
    },
  ]);

  return (
    <>
      <Spinner loading={loading}/>
      <TabelComponent data={data} dataHeading={dataHeading} setRefresh={setRefresh} setLoading={setLoading}/>
    </>
  );
};
