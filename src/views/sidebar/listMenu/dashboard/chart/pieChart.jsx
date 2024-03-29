import Chart from "react-apexcharts";
import { Component } from "react";
import { getApiData } from "../../../../../function/Api";

export class PieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
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
        labels: [],
        tooltip: {
          enabled: true,
          y: {
            formatter: function (value) {
              // Format nilai dengan memisahkan ribuan dan menambahkan "pcs"
              return (
                value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " pcs"
              );
            },
          },
        },
        legend: {
          position: "bottom",
          formatter: function (seriesName, opts) {
            var percentValue =
              (
                Math.round(
                  opts.w.globals.seriesPercent[opts.seriesIndex] * 10
                ) / 10
              ).toFixed(1) + "%";
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
      },
    };
  }

  async componentDidMount() {
    try {
      const response = await getApiData("dashboard");
      const products = response.data[6].products;
      const seriesData = products.map((product) => product.total_stock);
      const labelsData = products.map((product) => product.name);

      this.setState({
        series: seriesData,
        labels: labelsData,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }

  render() {
    return (
      <div>
        <div id="chart">
          <Chart
            options={{
              ...this.state.options,
              labels: this.state.labels,
            }}
            series={this.state.series}
            type="pie"
            width={430}
            height={430}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}
