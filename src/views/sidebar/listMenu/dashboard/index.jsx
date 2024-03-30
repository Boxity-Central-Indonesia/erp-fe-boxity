import { getApiData } from "../../../../function/Api";
import { useState, useEffect } from "react";

export const index = () => {
  const [data, setData] = useState([]);
  const [dataOrders, setDataOrders] = useState([]);
  const [dataOrdersNotCompleted, setDataOrdersNotCompleted] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data, status } = await getApiData("dashboard");
        if (status === 200) {
          // Pastikan data tidak kosong sebelum diset
          if (data.length > 0) {
            setData(data); // Set data dengan data yang diperoleh dari API
          }
        }
      } catch (error) {
        console.log(error);
      }
      try {
        const { data, status } = await getApiData("orders");
        if (status === 200) {
          // Pastikan data tidak kosong sebelum diset
          if (data.length > 0) {
            setDataOrders(data); // Set data dengan data yang diperoleh dari API
          }
        }
      } catch (error) {
        console.log(error);
      }
      try {
        const { data, status } = await getApiData("order/not-completed");
        if (status === 200) {
          // Pastikan data tidak kosong sebelum diset
          if (data.length > 0) {
            setDataOrdersNotCompleted(data); // Set data dengan data yang diperoleh dari API
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return {
    data,
    dataOrders,
    dataOrdersNotCompleted,
  };
};
