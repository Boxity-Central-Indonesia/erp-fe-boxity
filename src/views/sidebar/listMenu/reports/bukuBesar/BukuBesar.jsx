import { useEffect, useState } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";
import { Spinner } from "../../../../layouts/Spinner";

export const BukuBesar = () => {
  const dataTabel = (data) => {
    return data.map((item) => ({
      akun: item.account_name,
      "tipe akun": item.account_type,
      type: item.type,
    }));
  };

  const { data, loading, setLoading, setRefresh } = Read({ dataTabel, endPoint: "ledger-report" });


  useEffect(() => {
    document.title = 'Laporan Buku Besar - DHKJ Manufacturer'
  }, [])

  const print = () => {
    downloadReport("download/ledger-report");
  };

  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Ledger Report",
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
