import { useState } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";
import {Spinner} from "../../../../layouts/Spinner"

export const Piutang = () => {
  const dataTabel = (data) => {
    return data.map(item => ({
      'vendor name': item.vendor_name,
      'order code': item.kode_order,
      status: item.status,
      'total bill': item.total_tagihan,
      'total payment': item.total_dibayar,
      'rest of the bill': item.sisa_tagihan,
    }))
  }

  const {data, setLoading, setRefresh, loading} = Read({dataTabel, endPoint: 'receivables-report'})

  const print = () => {
    downloadReport("download/receivables-report")
  }
  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Receivables Report",
      eventToggleModal: downloadReport,
    },
  ]);

  return (
    <>
      <Spinner loading={loading}/>
      <TabelComponent
        data={data}
        dataHeading={dataHeading}
        setLoading={setLoading}
        setRefresh={setRefresh}
        useReportCondition={true}
      />
    </>
  );
};
