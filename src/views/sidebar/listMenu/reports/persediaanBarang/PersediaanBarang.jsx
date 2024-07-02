import { useState, useEffect } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";
import { Spinner } from "../../../../layouts/Spinner";


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

  
  const print = () => {
    downloadReport({endPoint: 'download/inventory-report'})
  }
  
  const {data, loading, setRefresh, setLoading} = Read({dataTabel, endPoint: 'inventory-report'})

  useEffect(() => {
    document.title = 'Laporan Persediaan Barang - DHKJ Manufacturer'
  }, [])

  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Laporan Persediaan Barang",
      eventToggleModal: print,
    },
  ]);
  return (
    <>
      <Spinner loading={loading} />
      <TabelComponent
        data={data}
        dataHeading={dataHeading}
        setRefresh={setRefresh}
        setLoading={setLoading}
        useReportCondition={true}
      />
    </>
  );
};
