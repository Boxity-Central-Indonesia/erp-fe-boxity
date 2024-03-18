import {Component} from "react";
import Chart from "react-apexcharts";
import { Dropdown } from "flowbite-react";

export function DropdownForLineChart() {
    return (
      <Dropdown label="" dismissOnClick={false} renderTrigger={() => <span className="text-gray-600">Last 30 days</span>}>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
    );
  }


export class LineChart extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        options: {
          chart: {
            id: "basic-bar"
          },
          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          },
          colors:['#f95b12'],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100]
            }
          },
          dataLabels: {
            enabled: false
          },
        },
        series: [
          {
            name: "Penjualan",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          },
          {
            name: "Pembelian",
            data: [20, 60, 25, 20, 43, 10, 50, 11]
          },
        ]
      };
    }
  
    render() {
      return (
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="area"
              height={450}
            />
      );
    }
  }
  