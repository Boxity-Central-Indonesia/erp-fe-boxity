import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getApiData } from "../../../../../function/Api";

export const PieChart = ({
  data
}) => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const options = {
    chart: {
      width: 400,
      type: "pie",
      dropShadow: {
        enabled: false,
        top: 0,
        left: 0,
        blur: 1,
        color: "#000",
        opacity: 0.1,
      },
    },
    labels: labels,
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          // Format nilai dengan memisahkan ribuan dan menambahkan "pcs"
          return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " pcs";
        },
      },
    },
    legend: {
      position: "bottom",
      formatter: function (seriesName, opts) {
        var percentValue =
          (Math.round(opts.w.globals.seriesPercent[opts.seriesIndex] * 10) / 10).toFixed(1) + "%";
        return [
          opts.w.globals.labels[opts.seriesIndex],
          " - ",
          percentValue,
        ]; // Menggunakan label produk sebagai nama pada legend
      },
      itemMargin: {
        vertical: 10,
        horizontal: 10,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#f95b12", "#fa7b41", "#fb9c70", "#fcbda0", "#fddecf"],
  };

  useEffect(() => {
    if(data && data){
      const seriesData = data && data?.map((product) => product.total_stock);
      const labelsData = data && data?.map((product) => product.name);

      setSeries(seriesData);
      setLabels(labelsData);
    }
  }, [data]);

  return (
    <div>
      <div id="chart">
        <Chart
          options={{ ...options, labels: labels }}
          series={series}
          type="pie"
          width={430}
          height={430}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
