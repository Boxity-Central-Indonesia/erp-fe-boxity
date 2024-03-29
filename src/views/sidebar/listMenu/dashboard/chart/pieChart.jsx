import Chart from "react-apexcharts";
import { Component } from "react";

export class PieChart extends Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [44, 55, 13, 43, 22],
        options: {
          chart: {
            width: 400,
            type: 'pie',
          },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        legend: {
            position: 'bottom',
            formatter: function(seriesName, opts) {
                var percentValue = (Math.round(opts.w.globals.seriesPercent[opts.seriesIndex] * 10) / 10).toFixed(1) + "%";
                return [seriesName, " - ", percentValue];
            },
            itemMargin: {
                vertical: 10,
                horizontal: 10
            }
        },        
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      };
    }

  

    render() {
      return (
        <div>
          <div id="chart">
            <Chart options={this.state.options} series={this.state.series} type="pie" width={400} height={400}/>
          </div>
          <div id="html-dist"></div>
        </div>
      );
    }
  }