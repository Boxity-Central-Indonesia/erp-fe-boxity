import { useState } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";


export const PersediaanBarang = () => {

  const dataTabel = (data) => {
    return data.map(item => ({
      "inventory code": item.code,
      name: item.name,
      description: item.description,
      weight: (item.weight ?? 0.0) + " " + item.unit_of_measure,
      "type of animal": item.animal_type,
      quantity: item.stock + " pcs",
      "unit price": item.price,
      "total price": item.price * item.stock,
    }))
  }

  const {data} = Read({dataTabel, endPoint: 'inventory-report'})

  const print = () => {
    downloadReport('download/inventory-report')
  }

  

  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Inventory Report",
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
