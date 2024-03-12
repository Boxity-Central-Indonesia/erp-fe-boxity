import { useState, useEffect } from "react";
import TabelComponent from "../../../../layouts/Tabel";
import IconDownload from "../../../../layouts/icons/IconDownload";
import { getApiData } from "../../../../../function/Api";
import { Read } from "../read";
import { downloadReport } from "../downloadReport";

export const Neraca = () => {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data, status } = await getApiData("balance-sheet-report");
        if (status === 200) {
          // const newData = data.map((item) => ({
          //   assets: item.assets,
          //   liabilities: item.liabilities,
          //   equity: item.equity,
          // }));
          const newData = [
            {
              assets: data.assets,
              liabilities: data.liabilities,
              equity: data.equity
            }
          ]
          setData(() => newData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

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
      <TabelComponent
        data={data}
        dataHeading={dataHeading}
      />
    </>
  );
};
