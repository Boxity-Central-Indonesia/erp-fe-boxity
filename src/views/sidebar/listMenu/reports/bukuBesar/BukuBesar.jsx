import { useState } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";

export const BukuBesar = () => {
  const dataTabel = (data) => {
    return data.map((item) => ({
      akun: item.account_name,
      "tipe akun": item.account_type,
      type: item.type,
    }));
  };

  const { data } = Read({ dataTabel, endPoint: "ledger-report" });

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
      <TabelComponent data={data} dataHeading={dataHeading} />
    </>
  );
};
