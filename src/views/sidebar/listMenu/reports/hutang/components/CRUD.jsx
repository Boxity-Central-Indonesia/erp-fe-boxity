import { useState, useEffect, useRef } from "react";
import {
  getApiData,
  postApiData,
  putApiData,
  deleteApiData,
} from "../../../../../../function/Api";

export const CRUD = () => {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);




  const READ = () => {
    const [data, setData] = useState();
    useEffect(() => {
      document.title = 'Laporan hutang - DHKJ Manufacturer'
      const getData = async () => {
        try {
          const { data, status } = await getApiData("payables-report");
          if (status === 200) {
            const newData = data.map((item) => ({
              "vendor name": item.vendor_name,
            }));
            setData(() => newData);
            setLoading(true)
          }
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }, [refresh]);

    return {
      data,
    };
  };


  const { data } = READ();
  
  return {
    data,
    loading,
    setRefresh,
    setLoading
  };
};
