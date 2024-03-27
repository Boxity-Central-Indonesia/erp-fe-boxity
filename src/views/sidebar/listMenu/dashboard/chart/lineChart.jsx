import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Dropdown } from "flowbite-react";
import { getApiData } from "../../../../../function/Api";
import { FormatCurrency } from "../../../../config/FormatCurrency";

export function DropdownForLineChart({ dataXaxis, dataSeries }) {
  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <span className="text-gray-600 text-xs">Last 30 days</span>
      )}
    >
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  );
}

export function LineChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApiData("dashboard");
        const data = response.data[4];
        const { sales_data, purchase_data } = data;
        const defaultPurchaseData = purchase_data.length
          ? purchase_data
          : [{ date: "", total_purchase: 0 }];
        const defaultSalesData = sales_data.length
          ? sales_data
          : [{ date: "", total_sales: 0 }];

        // Menggabungkan tanggal dari sales_data dan purchase_data
        const allDates = [
          ...sales_data.map((data) => data.date),
          ...defaultPurchaseData.map((data) => data.date),
          ...defaultSalesData.map((data) => data.date),
        ].filter((date, index, self) => self.indexOf(date) === index);

        const chartData = {
          options: {
            chart: { id: "basic-bar" },
            stroke: { curve: "smooth" },
            yaxis: {
              labels: {
                formatter: function (value) {
                  return value
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .split(",")[0];
                },
              },
            },
            xaxis: {
              categories: allDates,
            },
            colors: ["#3565d8", "#fdba8c"],
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.1,
                opacityTo: 0.7,
                stops: [0, 95, 100],
              },
            },
            dataLabels: { enabled: false },
          },
          series: [
            {
              name: "Sales",
              data: allDates.map((date) => {
                const sales = sales_data.find((data) => data.date === date);
                return sales ? parseFloat(sales.total_sales) : 0;
              }),
            },
            {
              name: "Purchase",
              data: allDates.map((date) => {
                const purchase = purchase_data.find(
                  (data) => data.date === date
                );
                return purchase ? parseFloat(purchase.total_purchases) : 0;
              }),
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return chartData ? (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="area"
      height={350}
    />
  ) : null;
}
