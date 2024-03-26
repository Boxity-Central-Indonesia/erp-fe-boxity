import { useState } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";

export const Pengeluaran = () => {
  const dataTabel = (data) => {
    return data.map((item) => ({
      "account name": item.account.name,
      "account type": item.account.type,
      "expenses date": item.date,
      "amount of costs": item.amount,
      "account balance": item.account.balance,
    }));
  };

  const { data } = Read({ dataTabel, endPoint: "expenses-report" });

  const print = () => {
    downloadReport({ endPoint: "download/expenses-report" });
  };

  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Expenses Report",
      eventToggleModal: print,
    },
  ]);

  return (
    <>
      <TabelComponent data={data} dataHeading={dataHeading} />
    </>
  );
};
