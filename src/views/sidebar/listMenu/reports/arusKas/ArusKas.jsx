import { useState } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { getApiData } from "../../../../../function/Api";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";

export const ArusKas = () => {

  const dataTabel = (data) => {
    return data.map(item => ({
      'account name': item.account_name,
      type: item.type,
      "opening balance": item.opening_balance,
      "total debit": item.total_debit,
      "total credit": item.total_credit,
      "net cash flow": item.net_cash_flow,
    }))
  }

  const {data} = Read({dataTabel, endPoint: 'cashflow-report'})

  const print = () => {
    downloadReport("download/cashflow-report")
  }

  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Cashflow Report",
      eventToggleModal: print,
    },
  ]);

  return (
    <>
      <TabelComponent
        data={data}
        dataHeading={dataHeading}
      />
    </>
  );
};
