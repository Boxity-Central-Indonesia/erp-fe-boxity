import { useState } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";

export const Penjualan = () => {

  const dataTabel = (data) => {
    return data.map(item => ({
      'order code': item.kode_order,
      customer: item.vendor_name,
      'Invoice date': item.invoice_date,
      'invoice status' : item.invoice_status,
      'total price': item.total_price,
      'paid amount': item.paid_amount,
    }))
  }

  const print = () => {
    downloadReport({endPoint: 'download/sales-report' })
  }

  const {
    data
  } = Read({
    dataTabel,
    endPoint: 'sales-report'
  })


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
      <TabelComponent
        data={data}
        dataHeading={dataHeading}
      />
    </>
  );
};
