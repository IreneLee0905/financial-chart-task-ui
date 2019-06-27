import * as React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {Urls} from "../utils/Urls";
import {RequestUtils} from "../utils/RequestUtils";

export class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {stocks: [], buyDate: 0, sellDate: 0};
    this.getHighChart = this.getHighChart.bind(this);
    this.getMaximumProfit = this.getMaximumProfit.bind(this);
  }

  componentDidMount() {
    this.getHighChart();
    this.getMaximumProfit();
  }


  //fetch data from restful api and render chart
  getHighChart() {
    fetch(Urls.STOCK_DATA)
      .then(responsePromise => {

        RequestUtils(responsePromise,(jsonResponse)=>{
          console.log(jsonResponse);
          let stocks = jsonResponse.map((obj) => {
            return ([Date.parse(obj.date), obj.close_price]);
          });
          this.setState({stocks: stocks});
        });

      })


  }

  //get maximum profit line in charts
  getMaximumProfit() {
    fetch(Urls.PROFIT_LINE)
      .then(responsePromise => {
        RequestUtils(responsePromise,(jsonResponse)=>{
          // console.log(jsonResponse);
          let buyDate = Date.parse(jsonResponse.buy_date);
          let sellDate = Date.parse(jsonResponse.sell_date);
          this.setState({buyDate: buyDate, sellDate: sellDate});
        });
      })

  }

  render() {
    //options for HighchartsReact settings
    const options = {
      rangeSelector: {
        selected: 1
      },

      title: {
        text: 'AAPL Stock Price'
      },
      subtitle: {
        text: 'Using data from intrinio.com'
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000,
        labels: {
          format: '{value:%b %Y}'
        },
      },
      series: [{
        name: 'daily close price',
        data: this.state.stocks,
        tooltip: {
          valueDecimals: 2
        },
        zoneAxis: 'x',
        zones: [{
          value: this.state.buyDate
        }, {
          value: this.state.sellDate,
          color: '#FF6833'
        }]
      }],


    };
    return (

      <div>
        <HighchartsReact highcharts={Highcharts} options={options}/>
      </div>
    )
  }

}
