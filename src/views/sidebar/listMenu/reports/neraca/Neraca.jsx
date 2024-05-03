import { useState, useEffect } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { getApiData } from "../../../../../function/Api";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";
import {Spinner} from "../../../../layouts/Spinner"

export const Neraca = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState()
  
  useEffect(() => {
    document.title = 'Laporan neraca - DHKJ Manufacturer'
    const getData = async () => {
      try {
        const { data, status } = await getApiData("balance-sheet-report");
        if (status === 200) {
          const newData = [
            {
              assets: data.assets,
              liabilities: data.liabilities,
              equity: data.equity
            }
          ]
          setData(() => newData);
          setLoading(true)
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [refresh]);

  const print = () => {
    downloadReport("download/")
  }


  const [dataHeading, setDataHeading] = useState([
    {
      label: "Print report",
      icon: IconDownload(),
      heading: "Balance Sheet Report",
      eventToggleModal: print,
    },
  ]);

  return (
    <>

      <Spinner loading={loading} />
      <TabelComponent
        data={data}
        dataHeading={dataHeading}
        setLoading={setLoading}
        setRefresh={setRefresh}
      />
    </>
  );
};
