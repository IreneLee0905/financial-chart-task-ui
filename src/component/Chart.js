import * as React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {Urls} from "../utils/Urls";

export class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {stocks: [],};
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
        if (200 === responsePromise.status) {
          responsePromise.json().then(promise => {
            return Promise.resolve(promise)
          }).then(jsonResponse => {
            console.log(jsonResponse);
            let stocks = jsonResponse.results.map((obj) => {
              return ([Date.parse(obj.date), obj.data]);
            });
            this.setState({stocks: stocks}, () => {
              console.log(this.state);
            });
          });
        } else {
          responsePromise.json().then(promise => {
            return Promise.reject(promise)
          });

        }
      })


  }

  //get maximum profit line in charts
  getMaximumProfit() {
    fetch(Urls.PROFIT_LINE)
      .then(responsePromise => {
        if (200 === responsePromise.status) {
          responsePromise.json().then(promise => {
            return Promise.resolve(promise)
          }).then(jsonResponse => {
            console.log(jsonResponse);
            let buyDate = Date.parse(jsonResponse.buy_date);
            let sellDate = Date.parse(jsonResponse.sell_date);
            this.setState({buyDate: buyDate, sellDate: sellDate}, () => {
              console.log(this.state);
            });
          });
        } else {
          responsePromise.json().then(promise => {
            return Promise.reject(promise)
          });

        }
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
      xAxis: {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000,
        labels: {
          format: '{value:%e.%b}'
        },
      },
      series: [{
        name: 'AAPL',
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
